"""
Chroma-key green-screen portraits → transparent WebP/PNG.

Run: python scripts/process-portraits.py
"""
from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src" / "assets" / "portraits"
PNG_DIR = ROOT / "scripts" / "og" / "portraits"
OUT_SIZE = 768

JOBS = {
    "_cut-raw.jpg": "default",
    "_party-hat-raw.jpg": "party-hat",
    "_bunny-raw.jpg": "bunny",
    "_crown-raw.jpg": "crown",
    "_rose-raw.jpg": "rose",
    "_star-raw.jpg": "star",
    "_spark-raw.jpg": "spark",
    "_sun-raw.jpg": "sun",
    "_heart-raw.jpg": "heart",
    "_senyera-raw.jpg": "senyera",
    "_cockade-raw.jpg": "cockade",
}


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
    h, s, v = hsv[..., 0], hsv[..., 1], hsv[..., 2]

    # Green screen: hue ~120°, high sat, G dominates R/B.
    hue_green = (h > 0.18) & (h < 0.47)
    sat_ok = s > 0.28
    g_dom = (g > r + 28) & (g > b + 12)
    screen = hue_green & sat_ok & g_dom

    # Distance from a typical screen green, used for soft edges.
    key = np.array([2.0, 160.0, 14.0], dtype=np.float32)
    dist = np.linalg.norm(rgb - key, axis=-1)
    soft = np.clip((dist - 55.0) / 70.0, 0.0, 1.0)

    alpha = np.where(screen, 0.0, 1.0)
    alpha = np.minimum(alpha, soft)

    # Tighten obvious background, keep subject.
    alpha = np.where(screen & (dist < 90), 0.0, alpha)

    # Despill: pull green out of edge pixels.
    spill = ((g > r) & (g > b) & (alpha > 0.05) & (alpha < 0.92)) | (
        hue_green & (s > 0.22) & (alpha > 0.2) & (alpha < 1.0)
    )
    g2 = np.minimum(g, (r + b) * 0.5)
    rgb = rgb.copy()
    rgb[..., 1] = np.where(spill, g2, g)

    # Slightly contract the matte so leftover halo disappears.
    a = (alpha * 255.0).astype(np.uint8)
    matte = Image.fromarray(a, mode="L")
    matte = matte.point(lambda p: 0 if p < 18 else (255 if p > 230 else p))
    # 1px erode via min filter
    from PIL import ImageFilter

    eroded = matte.filter(ImageFilter.MinFilter(3))
    mixed = Image.blend(matte, eroded, 0.35)
    alpha_u8 = np.asarray(mixed, dtype=np.uint8)

    rgba = np.dstack([rgb.clip(0, 255).astype(np.uint8), alpha_u8])
    out = Image.fromarray(rgba, mode="RGBA")
    return crop_to_subject(out)


def crop_to_subject(im: Image.Image, pad_ratio: float = 0.045) -> Image.Image:
    alpha = np.asarray(im.getchannel("A"))
    ys, xs = np.where(alpha > 12)
    if len(xs) == 0:
        return im
    x0, x1 = int(xs.min()), int(xs.max())
    y0, y1 = int(ys.min()), int(ys.max())
    pad = int(max(im.size) * pad_ratio)
    x0 = max(0, x0 - pad)
    y0 = max(0, y0 - pad)
    x1 = min(im.size[0] - 1, x1 + pad)
    y1 = min(im.size[1] - 1, y1 + pad)
    cropped = im.crop((x0, y0, x1 + 1, y1 + 1))

    # Square canvas, subject optically a bit high so hats have room.
    side = max(cropped.size)
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    x = (side - cropped.size[0]) // 2
    y = int((side - cropped.size[1]) * 0.62)
    canvas.paste(cropped, (x, y), cropped)
    return canvas


def main() -> None:
    SRC.mkdir(parents=True, exist_ok=True)
    for raw_name, slug in JOBS.items():
        src = SRC / raw_name
        if not src.exists():
            raise SystemExit(f"missing {src}")
        keyed = key_green(Image.open(src))
        keyed = keyed.resize((OUT_SIZE, OUT_SIZE), Image.Resampling.LANCZOS)
        PNG_DIR.mkdir(parents=True, exist_ok=True)
        png = PNG_DIR / f"{slug}.png"
        webp = SRC / f"{slug}.webp"
        keyed.save(png, "PNG", optimize=True)
        keyed.save(webp, "WEBP", quality=88, method=6)
        print(f"{raw_name} → {slug}.webp ({keyed.size[0]}px)")


if __name__ == "__main__":
    main()
