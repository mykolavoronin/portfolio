"""
Chroma-key daily-look cutouts → transparent WebP.

Run: python scripts/process-looks.py
"""
from __future__ import annotations

import importlib.util
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
LOOKS = ROOT / "src" / "assets" / "looks"
SIZE = 384

spec = importlib.util.spec_from_file_location(
    "process_details",
    ROOT / "scripts" / "process-details.py",
)
if spec is None or spec.loader is None:
    raise SystemExit("cannot load process-details.py")
details = importlib.util.module_from_spec(spec)
spec.loader.exec_module(details)
key_green = details.key_green


def main() -> None:
    LOOKS.mkdir(parents=True, exist_ok=True)
    paints = sorted(LOOKS.glob("_*-paint.jpg"))
    if not paints:
        raise SystemExit(f"no paint files in {LOOKS}")
    for src in paints:
        slug = src.name.removeprefix("_").removesuffix("-paint.jpg")
        keyed = key_green(Image.open(src)).resize((SIZE, SIZE), Image.Resampling.LANCZOS)
        webp = LOOKS / f"{slug}.webp"
        keyed.save(webp, "WEBP", quality=88, method=6)
        print(f"{src.name} → {webp.relative_to(ROOT)}")
    print(f"{len(paints)} looks")


if __name__ == "__main__":
    main()
