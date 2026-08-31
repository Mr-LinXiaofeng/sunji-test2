from PIL import Image, ImageDraw

def fix(src, dst):
    im = Image.open(src).convert("RGB")
    w, h = im.size
    # 从四角与四边中点洪泛填充：把与边缘相连的黑色背景替换为白色
    # 熄屏黑屏被白色边框包围，与边缘不连通，故不受影响
    seeds = [
        (0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1),
        (w // 2, 0), (w // 2, h - 1), (0, h // 2), (w - 1, h // 2),
        (2, 2), (w - 3, 2), (2, h - 3), (w - 3, h - 3),
    ]
    for s in seeds:
        ImageDraw.floodfill(im, s, (255, 255, 255), thresh=70)
    im.save(dst, "JPEG", quality=92)
    print("saved", dst, im.size)

base = "/vercel/share/v0-project/public/images/products/"
fix(base + "t6711-front-side-raw.jpg", base + "t6711-front-side.jpg")
fix(base + "t6711-front.jpg", base + "t6711-front.jpg")
fix(base + "t6711-back.jpg", base + "t6711-back.jpg")
