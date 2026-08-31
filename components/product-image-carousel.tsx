"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProductImageCarouselProps {
  images: string[] // 图片完整路径数组
  alt: string
}

export function ProductImageCarousel({ images, alt }: ProductImageCarouselProps) {
  const [current, setCurrent] = useState(0)
  const total = images.length

  const goPrev = () => setCurrent((i) => (i - 1 + total) % total)
  const goNext = () => setCurrent((i) => (i + 1) % total)

  // 仅一张图时不显示切换控件
  const showControls = total > 1

  return (
    <div className="relative flex items-center justify-center rounded-3xl border border-border bg-muted/30 p-8">
      <img
        src={images[current] || "/placeholder.svg"}
        alt={`${alt}（第 ${current + 1} / ${total} 张）`}
        className="max-h-80 w-full object-contain"
      />

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
  )
}
