"use client"

import { useEffect, useState } from "react"
import { Toaster } from "sonner"
import { Download, FileText, ChevronRight } from "lucide-react"
import { products } from "@/lib/products"
import { downloadFileWithProgress } from "@/lib/file-download"

// 判断当前是否以本地文件方式打开（双击 index.html）
function useIsFileProtocol() {
  const [isFile, setIsFile] = useState(false)
  useEffect(() => {
    setIsFile(window.location.protocol === "file:")
  }, [])
  return isFile
}

interface ProductBrochureSectionProps {
  basePath?: string
}

// “产品彩页” 子页面：下载全部彩页 + 6 台设备卡片网格
export function ProductBrochureSection({ basePath = "./" }: ProductBrochureSectionProps) {
  const isFile = useIsFileProtocol()

  // 本地文件方式打开时用相对路径，http 环境（预览/部署）用绝对路径
  const docPath = (name: string) => (isFile ? `${basePath}docs/${name}` : `/docs/${name}`)
  const imgPath = (name: string) => (isFile ? `${basePath}images/products/${name}` : `/images/products/${name}`)
  // 设备详情页路由：http 环境用干净路由，本地文件方式用相对 index.html
  const devicePath = (slug: string) => (isFile ? `${basePath}device/${slug}/index.html` : `/device/${slug}`)

  // 下载全部产品彩页
  const handleDownloadAll = () =>
    downloadFileWithProgress({
      id: "all-products-brochure",
      name: "所有产品彩页",
      file: docPath("all-products-brochure.pdf"),
      downloadName: "所有产品彩页.pdf",
      size: "18.9 MB",
    })

  return (
    <div className="container mx-auto px-4 pb-16">
      <div className="max-w-6xl mx-auto">
        {/* 汇总下载大卡片：左中右三栏，中间标题绝对居中 */}
        <div className="relative mb-8 flex flex-col gap-6 rounded-2xl border border-border bg-background p-6 shadow-sm md:flex-row md:items-end md:justify-between md:gap-8 md:px-8 md:pb-6 md:pt-16">
          {/* 左栏：图标 + 标题 + 说明 */}
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#0ab2bd]/10">
              <FileText className="h-9 w-9 text-[#0ab2bd]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground md:text-2xl">下载完整资料</h2>
              <p className="mt-2 max-w-md text-base font-medium text-foreground/70 leading-relaxed">
                包含 6 款商捷过检设备的完整产品彩页与使用场景等信息
              </p>
            </div>
          </div>

          {/* 中间：产品彩页——与标题同行，水平居中于整张卡片 */}
          <span className="text-3xl font-extrabold tracking-wide text-[#0ab2bd] md:absolute md:left-1/2 md:top-6 md:-translate-x-1/2 md:text-4xl">
            产品彩页
          </span>

          {/* 右栏：主按钮 */}
          <button
            onClick={handleDownloadAll}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0ab2bd] px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#089aa3]"
          >
            <Download className="h-5 w-5" />
            下载全部彩页
          </button>
        </div>

        {/* 6 台设备卡片网格：每行 2 个 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {products.map((device) => (
            <div
              key={device.slug}
              className="grid grid-cols-2 overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              {/* 左半边：产品图，铺满整个左半区 */}
              <div className="flex items-center justify-center bg-muted/40 p-3">
                <img
                  src={imgPath(device.image) || "/placeholder.svg"}
                  alt={`${device.name} 产品图`}
                  className="h-full max-h-56 w-full object-contain"
                />
              </div>

              {/* 右半边：名称 + 横线 + 4 行参数 + 按钮 */}
              <div className="flex flex-col p-4">
                <h3 className="text-lg font-bold text-foreground md:text-xl">{device.name}</h3>

                {/* 名称与参数之间的分隔横线 */}
                <hr className="my-3 border-t-2 border-border" />

                <dl className="space-y-2 text-base">
                  <div className="flex">
                    <dt className="w-[5rem] shrink-0 text-muted-foreground">认证型号：</dt>
                    <dd className="flex-1 whitespace-nowrap pl-2 text-foreground/80">{device.model}</dd>
                  </div>
                  <div className="flex">
                    <dt className="w-[5rem] shrink-0 text-muted-foreground">操作系统：</dt>
                    <dd className="flex-1 whitespace-nowrap pl-2 text-foreground/80">{device.os}</dd>
                  </div>
                  <div className="flex">
                    <dt className="w-[5rem] shrink-0 text-muted-foreground">存储器：</dt>
                    <dd className="flex-1 whitespace-nowrap pl-2 text-foreground/80">{device.storage}</dd>
                  </div>
                  <div className="flex">
                    <dt className="w-[5rem] shrink-0 text-muted-foreground">业务模式：</dt>
                    <dd className="flex-1 whitespace-nowrap pl-2 text-foreground/80">{device.businessMode}</dd>
                  </div>
                </dl>

                {/* 查看详情按钮：与参数区等宽、主色实心、加大 */}
                <a
                  href={devicePath(device.slug)}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0ab2bd] px-8 py-2.5 text-base font-semibold text-white transition-colors hover:bg-[#089aa3]"
                >
                  查看详情
                  <ChevronRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Toaster position="bottom-right" richColors />
    </div>
  )
}
