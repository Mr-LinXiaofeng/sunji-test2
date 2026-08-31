"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"

interface ProductImageCarouselProps {
  images: string[] // 图片完整路径数组
  alt: string
}

export function ProductImageCarousel({ images, alt }: ProductImageCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const total = images.length

  const goPrev = () => setCurrent((i) => (i - 1 + total) % total)
  const goNext = () => setCurrent((i) => (i + 1) % total)

  // 仅一张图时不显示切换控件
  const showControls = total > 1

  // 弹窗打开时锁定滚动，并支持 Esc 关闭 / 方向键切换
  useEffect(() => {
    if (!zoomed) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false)
      else if (e.key === "ArrowLeft" && showControls) goPrev()
      else if (e.key === "ArrowRight" && showControls) goNext()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener("keydown", onKey)
    }
  }, [zoomed, showControls])

  return (
    <>
      <div className="relative flex items-center justify-center rounded-xl border border-border bg-muted/50 p-8">
        <button
          type="button"
          onClick={() => setZoomed(true)}
          aria-label="点击查看大图"
          className="flex w-full cursor-zoom-in items-center justify-center"
        >
          <img
            src={images[current] || "/placeholder.svg"}
            alt={`${alt}（第 ${current + 1} / ${total} 张）`}
            className="max-h-80 w-full object-contain"
          />
        </button>

        {/* 角落提示 */}
        <div className="pointer-events-none absolute right-3 top-3 flex items-center gap-1 rounded-full bg-foreground/60 px-2.5 py-1 text-xs font-medium text-white">
          <ZoomIn className="h-3.5 w-3.5" />
          点击图片查看大图
        </div>

        {showControls && (
          <>
            {/* 左右箭头 */}
            <button
              type="button"
              onClick={goPrev}
              aria-label="上一张图片"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm transition-colors hover:bg-[#0ab2bd] hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="下一张图片"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm transition-colors hover:bg-[#0ab2bd] hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* 底部圆点 */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  aria-label={`查看第 ${i + 1} 张图片`}
                  aria-current={i === current}
                  className={`h-2.5 rounded-full transition-all ${
                    i === current ? "w-6 bg-[#0ab2bd]" : "w-2.5 bg-muted-foreground/40 hover:bg-muted-foreground/70"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* 大图弹窗 */}
      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="产品大图预览"
          onClick={() => setZoomed(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-10"
        >
          {/* 关闭按钮 */}
          <button
            type="button"
            onClick={() => setZoomed(false)}
            aria-label="关闭大图"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
          >
            <X className="h-6 w-6" />
          </button>

          <img
            src={images[current] || "/placeholder.svg"}
            alt={`${alt}（第 ${current + 1} / ${total} 张）`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full cursor-default object-contain"
          />

          {showControls && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  goPrev()
                }}
                aria-label="上一张图片"
                className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#0ab2bd]"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  goNext()
                }}
                aria-label="下一张图片"
                className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#0ab2bd]"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrent(i)
                    }}
                    aria-label={`查看第 ${i + 1} 张图片`}
                    aria-current={i === current}
                    className={`h-2.5 rounded-full transition-all ${
                      i === current ? "w-6 bg-[#0ab2bd]" : "w-2.5 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
