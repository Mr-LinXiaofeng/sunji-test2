"""把 T6711 四张图的背景转为透明，只保留设备本体。
思路：从边缘洪泛填充，用不会出现在设备上的品红标记背景，
再把标记像素的 alpha 置 0；设备上被白色边框包围的黑屏不会被触及。
"""
from PIL import Image, ImageDraw

MARK = (255, 0, 255)  # 品红标记色


def edge_seeds(w, h, steps=60):
    seeds = []
    for i in range(steps + 1):
        x = min(max(int(w * i / steps), 0), w - 1)
        y = min(max(int(h * i / steps), 0), h - 1)
        seeds += [(x, 0), (x, h - 1), (0, y), (w - 1, y)]
    return seeds


def to_transparent(src, dst, thresh=90, extra_seeds=None):
    im = Image.open(src).convert("RGB")
    w, h = im.size
    for s in edge_seeds(w, h):
        ImageDraw.floodfill(im, s, MARK, thresh=thresh)
    if extra_seeds:
        for fx, fy in extra_seeds:
            ImageDraw.floodfill(im, (int(w * fx), int(h * fy)), MARK, thresh=thresh)
    # 构建 alpha：标记像素透明，其余保留
    im = im.convert("RGBA")
    px = im.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if (r, g, b) == MARK:
                px[x, y] = (0, 0, 0, 0)
    im.save(dst, "PNG")
    print("done", dst, im.size)


base = "public/images/products/"
# 正侧面、正面：黑底 + 黑屏（被白框包围，安全）
to_transparent(base + "t6711-fs-raw.jpg", base + "t6711-front-side.png")
to_transparent(base + "t6711-front-raw.jpg", base + "t6711-front.png")
# 背面：黑底 + 支架镂空洞（补种子）
to_transparent(base + "t6711-back-raw.jpg", base + "t6711-back.png",
               extra_seeds=[(0.505, 0.70), (0.50, 0.66), (0.51, 0.73)])
# 侧面：深灰渐变底，无黑屏
to_transparent(base + "t6711-side.png", base + "t6711-side-t.png", thresh=95)
