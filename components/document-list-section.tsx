"use client"

import { useEffect, useState } from "react"
import { Toaster } from "sonner"
import { Download, HardDrive } from "lucide-react"
import { cn } from "@/lib/utils"
import { typeConfig } from "@/components/document-icons"
import { documents, type DocCategory } from "@/lib/documents"
import { downloadFileWithProgress, fetchFileSize, formatBytes } from "@/lib/file-download"

// 判断当前是否以本地文件方式打开（双击 index.html）
function useIsFileProtocol() {
  const [isFile, setIsFile] = useState(false)
  useEffect(() => {
    setIsFile(window.location.protocol === "file:")
  }, [])
  return isFile
}

interface DocumentListSectionProps {
  category: DocCategory
  basePath?: string
}

// “设备实施 / 半自助 / 全自助（二次开发）” 三个子页面共用的文档卡片网格
export function DocumentListSection({ category, basePath = "./" }: DocumentListSectionProps) {
  const isFile = useIsFileProtocol()
  const [sizes, setSizes] = useState<Record<string, string>>({})

  // 本地文件方式打开时用相对路径，http 环境（预览/部署）用绝对路径
  const docPath = (name: string) => (isFile ? `${basePath}docs/${name}` : `/docs/${name}`)

  const visibleDocs = documents.filter((d) => d.category === category)

  useEffect(() => {
    let cancelled = false
    Promise.all(
      visibleDocs.map(async (doc) => {
        const bytes = await fetchFileSize(docPath(doc.fileName))
        return [doc.id, bytes > 0 ? formatBytes(bytes) : doc.size] as const
      }),
    ).then((entries) => {
      if (!cancelled) setSizes(Object.fromEntries(entries))
    })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFile, category])

  const handleDownload = (doc: (typeof documents)[number]) =>
    downloadFileWithProgress({
      id: doc.id,
      name: doc.name,
      file: docPath(doc.fileName),
      downloadName: doc.downloadName,
      size: sizes[doc.id] ?? doc.size,
    })

  return (
    <div className="container mx-auto px-4 pb-16">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-6xl mx-auto">
        {visibleDocs.map((doc) => {
          const config = typeConfig[doc.type]
          const Icon = config.icon
          return (
            <div
              key={doc.id}
              className="flex flex-col rounded-xl border border-border bg-background p-4 transition-all hover:shadow-lg"
            >
              {/* 右上角类型小标签 */}
              <div className="flex justify-end mb-3">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                    config.tagBg,
                  )}
                >
                  {config.label}
                </span>
              </div>

              {/* 文档类型图标 */}
              <div className={cn("flex h-20 w-20 items-center justify-center rounded-xl mb-3", config.iconBg)}>
                <Icon className={cn("h-11 w-11", config.color)} />
              </div>

              {/* 文档名 */}
              <h3 className="text-base font-bold text-foreground mb-1.5 break-words leading-snug">{doc.name}</h3>

              {/* 文档简介 */}
              <p className="text-xs text-muted-foreground leading-relaxed mb-3 flex-1">{doc.description}</p>

              {/* 文件大小（前端实时获取，服务器替换文件后自动更新） */}
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                <HardDrive className="w-3.5 h-3.5" />
                <span>{sizes[doc.id] ?? "获取中…"}</span>
              </div>

              {/* 下载按钮 */}
              <button
                onClick={() => handleDownload(doc)}
                className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white bg-[#0ab2bd] hover:bg-[#089aa3] transition-colors"
              >
                <Download className="w-4 h-4" />
                下载文档
              </button>
            </div>
          )
        })}
      </div>

      <Toaster position="bottom-right" richColors />
    </div>
  )
}
