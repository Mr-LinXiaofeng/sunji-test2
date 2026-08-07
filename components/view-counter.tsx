"use client"

import { useEffect, useState, useRef } from "react"
import { Eye } from "lucide-react"

export function ViewCounter() {
  const [count, setCount] = useState<number | null>(null)
  const hasRecorded = useRef(false)

  useEffect(() => {
    // 使用 ref 确保只记录一次访问
    if (hasRecorded.current) return
    hasRecorded.current = true

    // 记录访问并获取计数
    fetch("/api/view-count", { method: "POST" })
      .then((res) => res.json())
      .then((data) => setCount(data.count))
      .catch(() => setCount(0))
  }, [])

  return (
    <p className="flex items-center gap-2 text-sm text-muted-foreground">
      <Eye className="w-4 h-4" />
      本站浏览次数：{count !== null ? `${count} 次` : "加载中..."}
    </p>
  )
}
