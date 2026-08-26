"use client"

import { useState, useEffect } from "react"
import { Toaster } from "sonner"
import { Download, HardDrive } from "lucide-react"
import type { ProductDevice } from "@/lib/products"
import { downloadFileWithProgress, fetchFileSize, formatBytes } from "@/lib/file-download"
import { BackToHomeButton } from "@/components/back-to-home-button"

interface DeviceDetailProps {
  device: ProductDevice
  // 相对根目录的前缀，设备详情页位于 /device/[slug]，本地文件方式需回退两级
  basePath?: string
}

export function DeviceDetail({ device, basePath = "../../" }: DeviceDetailProps) {
  const [isFile, setIsFile] = useState(false)
  const [size, setSize] = useState<string>(device.brochureSize)

  useEffect(() => {
    setIsFile(window.location.protocol === "file:")
  }, [])

  const filePath = isFile ? `${basePath}docs/${device.brochureFile}` : `/docs/${device.brochureFile}`
  const imagePath = isFile ? `${basePath}images/products/${device.image}` : `/images/products/${device.image}`

  // 实时探测彩页真实大小
  useEffect(() => {
    let cancelled = false
    fetchFileSize(filePath).then((bytes) => {
      if (!cancelled && bytes > 0) setSize(formatBytes(bytes))
    })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFile])

  const handleDownload = () =>
    downloadFileWithProgress({
      id: device.slug,
      name: device.downloadName.replace(/\.pdf$/i, ""),
      file: filePath,
      downloadName: device.downloadName,
      size,
    })

  return (
    <div className="container mx-auto px-4 py-12">
      {/* 顶部：产品图 + 概要 + 下载 */}
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
          {/* 产品图 */}
          <div className="flex items-center justify-center rounded-3xl border border-border bg-muted/30 p-8">
            <img
              src={imagePath || "/placeholder.svg"}
              alt={`${device.name} 产品图`}
              className="max-h-80 w-full object-contain"
            />
          </div>

          {/* 概要信息 */}
          <div>
            <p className="mb-2 text-sm font-medium text-[#0ab2bd]">{device.series}</p>
            <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">{device.name}</h1>

            <dl className="mb-6 grid grid-cols-2 gap-x-4 gap-y-3">
              {[
                { label: "认证型号", value: device.model },
                { label: "操作系统", value: device.os },
                { label: "存储器", value: device.storage },
                { label: "业务模式", value: device.businessMode },
              ].map((item) => (
                <div key={item.label} className="rounded-xl border border-border bg-background p-3">
                  <dt className="text-xs text-muted-foreground">{item.label}</dt>
                  <dd className="mt-0.5 text-sm font-semibold text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
              <HardDrive className="h-4 w-4" />
              <span>产品彩页 PDF · {size}</span>
            </div>

            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0ab2bd] px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#089aa3]"
            >
              <Download className="h-5 w-5" />
              下载产品彩页
            </button>
          </div>
        </div>

        {/* 详细技术参数 */}
        <div className="mt-12">
          <h2 className="mb-5 text-xl font-bold text-foreground">详细技术参数</h2>
          <div className="overflow-hidden rounded-2xl border border-border">
            <dl className="divide-y divide-border">
              {device.specs.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`flex gap-4 px-5 py-3.5 ${i % 2 === 1 ? "bg-muted/30" : "bg-background"}`}
                >
                  <dt className="w-32 shrink-0 text-sm text-muted-foreground">{spec.label}</dt>
                  <dd className="text-sm font-medium text-foreground">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* 返回首页 */}
        <div className="mt-10 flex justify-center">
          <BackToHomeButton basePath={basePath} />
        </div>
      </div>

      <Toaster position="bottom-right" richColors />
    </div>
  )
}
