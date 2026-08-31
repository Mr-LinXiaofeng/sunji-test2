import os
from rembg import remove, new_session
from PIL import Image

SRC = "public/images/products"
# (源文件, 目标文件)
JOBS = [
    ("t6711-front-side-raw.jpg", "t6711-front-side.png"),
    ("t6711-front-raw.jpg",      "t6711-front.png"),
    ("t6711-side.png",           "t6711-side-t.png"),
    ("t6711-back-raw.jpg",       "t6711-back.png"),
]

session = new_session("u2net")

for src, dst in JOBS:
    ip = os.path.join(SRC, src)
    op = os.path.join(SRC, dst)
    img = Image.open(ip).convert("RGBA")
    out = remove(
        img,
        session=session,
        alpha_matting=True,
        alpha_matting_foreground_threshold=240,
        alpha_matting_background_threshold=15,
        alpha_matting_erode_size=10,
    )
    out.save(op, "PNG")
    print("done", dst, out.size)
