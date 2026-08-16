"""
Chroma-key still-life details → transparent WebP.

Run: python scripts/process-details.py
"""
from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src" / "assets" / "details"
DRESS = ROOT / "src" / "assets" / "dress"
BRANDS = ROOT / "src" / "assets" / "brands"

JOBS = [
    (SRC / "_belt-paint.jpg", "belt", 640, SRC),
    (SRC / "_book-paint.jpg", "book", 640, SRC),
    (SRC / "_tech-paint.jpg", "tech", 640, SRC),
    (DRESS / "_party-hat-paint.jpg", "party-hat", 384, DRESS),
    (DRESS / "_bunny-paint.jpg", "bunny", 384, DRESS),
    (DRESS / "_crown-paint.jpg", "crown", 384, DRESS),
    (DRESS / "_rose-paint.jpg", "rose", 384, DRESS),
    (DRESS / "_star-paint.jpg", "star", 384, DRESS),
    (DRESS / "_spark-paint.jpg", "spark", 384, DRESS),
    (DRESS / "_sun-paint.jpg", "sun", 384, DRESS),
    (DRESS / "_heart-paint.jpg", "heart", 384, DRESS),
    (DRESS / "_senyera-paint.jpg", "senyera", 384, DRESS),
    (DRESS / "_cockade-paint.jpg", "cockade", 384, DRESS),
    (DRESS / "_chestnut-paint.jpg", "chestnut", 384, DRESS),
    (DRESS / "_candle-paint.jpg", "candle", 384, DRESS),
    (DRESS / "_cava-paint.jpg", "cava", 384, DRESS),
    (DRESS / "_ribbon-paint.jpg", "ribbon", 384, DRESS),
]


def rgb_to_hsv(rgb: np.ndarray) -> np.ndarray:
    r, g, b = (rgb[..., 0] / 255.0, rgb[..., 1] / 255.0, rgb[..., 2] / 255.0)
    maxc = np.maximum(np.maximum(r, g), b)
    minc = np.minimum(np.minimum(r, g), b)
    v = maxc
    s = np.where(maxc == 0, 0, (maxc - minc) / np.maximum(maxc, 1e-8))
    rc = (maxc - r) / np.maximum(maxc - minc, 1e-8)
    gc = (maxc - g) / np.maximum(maxc - minc, 1e-8)
    bc = (maxc - b) / np.maximum(maxc - minc, 1e-8)
    h = np.zeros_like(maxc)
    h = np.where((maxc == r) & (maxc != minc), (bc - gc) % 6, h)
    h = np.where((maxc == g) & (maxc != minc), 2.0 + rc - bc, h)
    h = np.where((maxc == b) & (maxc != minc), 4.0 + gc - rc, h)
    h = (h / 6.0) % 1.0
    return np.stack([h, s, v], axis=-1)


def key_green(im: Image.Image) -> Image.Image:
    rgb = np.asarray(im.convert("RGB"), dtype=np.float32)
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    hsv = rgb_to_hsv(rgb)
    h, s, _v = hsv[..., 0], hsv[..., 1], hsv[..., 2]

    hue_green = (h > 0.18) & (h < 0.47)
    sat_ok = s > 0.22
    g_dom = (g > r + 22) & (g > b + 8)
    screen = hue_green & sat_ok & g_dom

    key = np.array([4.0, 160.0, 18.0], dtype=np.float32)
    dist = np.linalg.norm(rgb - key, axis=-1)
    soft = np.clip((dist - 48.0) / 80.0, 0.0, 1.0)
    alpha = np.where(screen, 0.0, 1.0)
    alpha = np.minimum(alpha, soft)
    alpha = np.where(screen & (dist < 85), 0.0, alpha)

    spill = hue_green & (s > 0.18) & (alpha > 0.12) & (alpha < 0.97)
    rgb = rgb.copy()
    rgb[..., 1] = np.where(spill, np.minimum(g, (r + b) * 0.52), g)

    matte = Image.fromarray((alpha * 255.0).astype(np.uint8), mode="L")
    matte = matte.point(lambda p: 0 if p < 16 else (255 if p > 232 else p))
    mixed = Image.blend(matte, matte.filter(ImageFilter.MinFilter(3)), 0.3)
    rgba = np.dstack([rgb.clip(0, 255).astype(np.uint8), np.asarray(mixed)])
    return crop_to_subject(Image.fromarray(rgba, mode="RGBA"))


def crop_to_subject(im: Image.Image, pad_ratio: float = 0.06) -> Image.Image:
    alpha = np.asarray(im.getchannel("A"))
    ys, xs = np.where(alpha > 14)
    if len(xs) == 0:
        return im
    pad = int(max(im.size) * pad_ratio)
    x0 = max(0, int(xs.min()) - pad)
    y0 = max(0, int(ys.min()) - pad)
    x1 = min(im.size[0] - 1, int(xs.max()) + pad)
    y1 = min(im.size[1] - 1, int(ys.max()) + pad)
    cropped = im.crop((x0, y0, x1 + 1, y1 + 1))
    side = max(cropped.size)
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.paste(
        cropped,
        ((side - cropped.size[0]) // 2, (side - cropped.size[1]) // 2),
        cropped,
    )
    return canvas


def main() -> None:
    SRC.mkdir(parents=True, exist_ok=True)
    DRESS.mkdir(parents=True, exist_ok=True)
    for src, slug, size, dest in JOBS:
        if not src.exists():
            raise SystemExit(f"missing {src}")
        keyed = key_green(Image.open(src)).resize((size, size), Image.Resampling.LANCZOS)
        dest.mkdir(parents=True, exist_ok=True)
        webp = dest / f"{slug}.webp"
        keyed.save(webp, "WEBP", quality=88, method=6)
        print(f"{src.name} → {webp.relative_to(ROOT)} ({size}px)")


if __name__ == "__main__":
    main()
