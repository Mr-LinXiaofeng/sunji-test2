"use client"

import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

// 把 "29.1 MB" / "271 KB" 这类文本解析为字节数，作为无 Content-Length 时的进度分母
export function parseSizeToBytes(size: string): number {
  const match = size.trim().match(/^([\d.]+)\s*(KB|MB|GB|B)$/i)
  if (!match) return 0
  const value = Number.parseFloat(match[1])
  const unit = match[2].toUpperCase()
  const factor = unit === "GB" ? 1024 ** 3 : unit === "MB" ? 1024 ** 2 : unit === "KB" ? 1024 : 1
  return Math.round(value * factor)
}

// 把字节数格式化为可读文本，如 34482014 → "32.9 MB"
export function formatBytes(bytes: number): string {
  if (!bytes || bytes <= 0) return "—"
  const units = ["B", "KB", "MB", "GB"]
  let value = bytes
  let i = 0
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024
    i++
  }
  return `${i === 0 ? Math.round(value) : value.toFixed(1)} ${units[i]}`
}

// 通过网络请求获取文件真实大小（字节），优先 HEAD，回退到 Range 请求
export async function fetchFileSize(url: string): Promise<number> {
  try {
    const head = await fetch(url, { method: "HEAD" })
    const len = Number(head.headers.get("Content-Length"))
    if (len > 0) return len
  } catch {
    // 忽略，继续尝试 Range 请求
  }
  try {
    const res = await fetch(url, { headers: { Range: "bytes=0-0" } })
    const contentRange = res.headers.get("Content-Range") // 形如 "bytes 0-0/34482014"
    if (contentRange && contentRange.includes("/")) {
      const total = Number(contentRange.split("/")[1])
      if (total > 0) return total
    }
    const len = Number(res.headers.get("Content-Length"))
    if (len > 0) return len
  } catch {
    // 忽略
  }
  return 0
}

// 下载中的 toast，带转圈图标和进度条
function DownloadToast({ name, percent }: { name: string; percent: number | null }) {
  const showBar = percent !== null
  return (
    <div className="flex w-[356px] flex-col gap-2 rounded-lg border border-border bg-background p-4 shadow-lg">
      <div className="flex items-center gap-2.5">
        <Loader2 className="h-4 w-4 shrink-0 animate-spin text-[#0ab2bd]" />
        <span className="flex-1 truncate text-sm font-medium text-foreground">正在下载：{name}</span>
        {showBar && <span className="shrink-0 text-xs font-semibold text-[#0ab2bd]">{percent}%</span>}
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full bg-[#0ab2bd] transition-all duration-200",
            !showBar && "w-1/3 animate-pulse",
          )}
          style={showBar ? { width: `${percent}%` } : undefined}
        />
      </div>
    </div>
  )
}

export interface DownloadDoc {
  id: string
  name: string
  file: string
  downloadName: string
  size?: string
}

// 用 fetch 把文件抓成 blob 并触发下载，全程展示进度条 toast，避免页面在 iframe 中跳转
export async function downloadFileWithProgress(doc: DownloadDoc) {
  const toastId = `download-${doc.id}`

  const renderProgress = (percent: number | null) =>
    toast.custom(() => <DownloadToast name={doc.name} percent={percent} />, {
      id: toastId,
      duration: Number.POSITIVE_INFINITY,
    })

  renderProgress(0)

  try {
    const res = await fetch(doc.file)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    // 优先用响应头的 Content-Length，缺失时回退到已知兜底大小，保证能算出真实百分比
    const total = Number(res.headers.get("Content-Length")) || parseSizeToBytes(doc.size ?? "")
    let blob: Blob

    if (res.body) {
      const reader = res.body.getReader()
      const chunks: Uint8Array[] = []
      let received = 0

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        if (value) {
          chunks.push(value)
          received += value.length
          if (total > 0) {
            // 下载中最多显示到 99%，完成后再置 100%，避免提前满格
            renderProgress(Math.min(99, Math.floor((received / total) * 100)))
          } else {
            renderProgress(null)
          }
        }
      }
      blob = new Blob(chunks as BlobPart[])
      renderProgress(100)
    } else {
      // 极少数环境不支持流式读取时，退化为整体读取
      renderProgress(null)
      blob = await res.blob()
    }

    const blobUrl = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = blobUrl
    link.download = doc.downloadName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(blobUrl)

    // 先关闭进度条 toast，再弹出成功提示，确保成功提示可靠显示
    toast.dismiss(toastId)
    toast.success("下载成功！", { duration: 3000 })
  } catch (err) {
    console.log("[v0] download error:", err)
    toast.dismiss(toastId)
    toast.error("下载失败，请稍后重试", { duration: 3000 })
  }
}
