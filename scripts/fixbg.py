from PIL import Image, ImageDraw

def fix(src, dst):
    im = Image.open(src).convert("RGB")
    w, h = im.size
    # 沿四条边密集布置种子点，对与边缘相连的黑色背景洪泛填充为白色。
    # 熄屏黑屏被白色边框完全包围，与边缘不连通，因此不受影响。
    seeds = []
    steps = 40
    for i in range(steps + 1):
        x = int(w * i / steps)
        y = int(h * i / steps)
        x = min(max(x, 0), w - 1)
        y = min(max(y, 0), h - 1)
        seeds += [(x, 0), (x, h - 1), (0, y), (w - 1, y)]
    for s in seeds:
        ImageDraw.floodfill(im, s, (255, 255, 255), thresh=90)
    im.save(dst, "JPEG", quality=92)
    print("saved", dst, im.size)

base = "/vercel/share/v0-project/public/images/products/"
fix(base + "t6711-fs-raw.jpg", base + "t6711-front-side.jpg")
fix(base + "t6711-front-raw.jpg", base + "t6711-front.jpg")
fix(base + "t6711-back-raw.jpg", base + "t6711-back.jpg")
