"use client"

import { useState, useEffect } from "react"
import { Toaster } from "sonner"
import { FolderDown, Download, HardDrive, FileText, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { products } from "@/lib/products"
import { downloadFileWithProgress, fetchFileSize, formatBytes } from "@/lib/file-download"

type IconProps = { className?: string }

// Word：带 W 标识的单页文档轮廓图标
function WordIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <text x="12" y="17.5" fontSize="6.5" fontWeight="700" textAnchor="middle" fill="currentColor" stroke="none">
        W
      </text>
    </svg>
  )
}

// Excel：带表格横线的表格文档轮廓图标
function ExcelIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M8 12.5h8" />
      <path d="M8 15.5h8" />
      <path d="M8 18h8" />
      <path d="M12 12v6.5" />
    </svg>
  )
}

// PDF：双层书页，中间印有 PDF 字样轮廓图标
function PdfIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* 后层书页 */}
      <path d="M6 6H4.5A1.5 1.5 0 0 0 3 7.5v11A1.5 1.5 0 0 0 4.5 20H14a1.5 1.5 0 0 0 1.5-1.5V17" />
      {/* 前层书页 */}
      <path d="M15 3H8.5A1.5 1.5 0 0 0 7 4.5v11A1.5 1.5 0 0 0 8.5 17H18a1.5 1.5 0 0 0 1.5-1.5V7.5z" />
      <path d="M15 3v4.5h4.5" />
      <text x="12.5" y="13.5" fontSize="4.2" fontWeight="700" textAnchor="middle" fill="currentColor" stroke="none">
        PDF
      </text>
    </svg>
  )
}

// ZIP：简约文档线条图标（带拉链）
function ZipIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      {/* 拉链 */}
      <path d="M12 8.5v8" strokeDasharray="1.5 1.5" />
      <rect x="10.75" y="16" width="2.5" height="3" rx="0.5" />
    </svg>
  )
}

type FileType = "word" | "excel" | "pdf" | "zip"

interface DocItem {
  id: string
  type: FileType
  name: string
  description: string
  size: string
  file: string
  downloadName: string
  category: "device" | "semi" | "full"
}

const typeConfig: Record<
  FileType,
  { label: string; icon: (props: IconProps) => JSX.Element; color: string; tagBg: string; iconBg: string }
> = {
  // 淡灰蓝
  word: {
    label: "DOCX",
    icon: WordIcon,
    color: "text-[#6b7f99]",
    tagBg: "bg-[#eef1f5] text-[#6b7f99]",
    iconBg: "bg-[#eef1f5]",
  },
  // 灰绿
  excel: {
    label: "XLSX",
    icon: ExcelIcon,
    color: "text-[#6f8f6b]",
    tagBg: "bg-[#eef3ed] text-[#6f8f6b]",
    iconBg: "bg-[#eef3ed]",
  },
  // 砖棕
  pdf: {
    label: "PDF",
    icon: PdfIcon,
    color: "text-[#9c6b5a]",
    tagBg: "bg-[#f4ece9] text-[#9c6b5a]",
    iconBg: "bg-[#f4ece9]",
  },
  // 土橙
  zip: {
    label: "ZIP",
    icon: ZipIcon,
    color: "text-[#b78a53]",
    tagBg: "bg-[#f6f0e6] text-[#b78a53]",
    iconBg: "bg-[#f6f0e6]",
  },
}

// 判断当前是否以本地文件方式打开（双击 index.html）
function useIsFileProtocol() {
  const [isFile, setIsFile] = useState(false)
  useEffect(() => {
    setIsFile(window.location.protocol === "file:")
  }, [])
  return isFile
}

interface DocumentCenterProps {
  basePath?: string
}

export function DocumentCenter({ basePath = "./" }: DocumentCenterProps) {
  const [activeTab, setActiveTab] = useState<"brochure" | "device" | "semi" | "full">("brochure")
  const isFile = useIsFileProtocol()
  // 前端实时获取的文件大小（服务器替换文件后会自动跟随变化）
  const [sizes, setSizes] = useState<Record<string, string>>({})

  // 本地文件方式打开时用相对路径，http 环境（预览/部署）用绝对路径
  const docPath = (name: string) => (isFile ? `${basePath}docs/${name}` : `/docs/${name}`)
  const imgPath = (name: string) => (isFile ? `${basePath}images/products/${name}` : `/images/products/${name}`)
  // 设备详情页路由：http 环境用干净路由，本地文件方式用相对 index.html
  const devicePath = (slug: string) => (isFile ? `${basePath}device/${slug}/index.html` : `/device/${slug}`)

  const documents: DocItem[] = [
    {
      id: "excel",
      type: "excel",
      name: "商捷进件表-x台-20xx年xx月xx日",
      description: "设备在进行激活绑定前需要填写的表格，填写并修改文件名后提交给销售处理",
      size: "11.3 KB",
      file: docPath("jianjian-form.xlsx"),
      downloadName: "商捷进件表-x台-20xx年xx月xx日.xlsx",
      category: "device",
    },
    {
      id: "driver",
      type: "zip",
      name: "电脑驱动",
      description: "下载后在电脑上安装，需根据不同数据线安装不同的驱动，详细见“驱动安装说明”",
      size: "13.9 MB",
      file: docPath("driver.zip"),
      downloadName: "电脑驱动.zip",
      category: "semi",
    },
    {
      id: "dll-test-tool",
      type: "zip",
      name: "动态库测试工具",
      description: "下载后用电脑测试是否能唤起设备刷脸，能唤起设备刷脸说明连接成功",
      size: "8.3 MB",
      file: docPath("dll-test-tool.zip"),
      downloadName: "动态库测试工具.zip",
      category: "semi",
    },
    {
      id: "dll-32",
      type: "zip",
      name: "动态库-32位",
      description: "用于替换医院现有HIS系统（32位）中的动态库文件，动态库版本1.1.9",
      size: "32.9 MB",
      file: docPath("dll-32.zip"),
      downloadName: "动态库-32位.zip",
      category: "semi",
    },
    {
      id: "dll-64",
      type: "zip",
      name: "动态库-64位",
      description: "用于替换医院现有HIS系统（64位）中的动态库文件，动态库版本1.1.9",
      size: "10.1 MB",
      file: docPath("dll-64.zip"),
      downloadName: "动态库-64位.zip",
      category: "semi",
    },
    {
      id: "dll-runtime",
      type: "zip",
      name: "动态库运行环境（可选）",
      description: "VC环境和串口驱动选装",
      size: "17.4 MB",
      file: docPath("dll-runtime.zip"),
      downloadName: "动态库运行环境（可选）.zip",
      category: "semi",
    },
    {
      id: "his-dll-doc",
      type: "zip",
      name: "HIS改造和动态库相关文档",
      description: "正式环境下的HIS调用，标准化HIS改造和动态库部署文档",
      size: "2.7 MB",
      file: docPath("his-dll-doc.zip"),
      downloadName: "HIS改造和动态库相关文档.zip",
      category: "semi",
    },
    {
      id: "terminal3-api",
      type: "pdf",
      name: "终端3.0标准化接口文档_20250403",
      description: "以H5方式接入主应用的SDK标准化接口文档，提供刷脸激活电子凭证等基础功能",
      size: "2.2 MB",
      file: docPath("terminal3-api.pdf"),
      downloadName: "终端3.0标准化接口文档_20250403.pdf",
      category: "full",
    },
    {
      id: "alipay-iot-manual",
      type: "pdf",
      name: "支付宝医疗IOT开放平台操作手册",
      description: "服务商（ISV）注册、项目备案、H5链接挂载的标准操作教程",
      size: "6.0 MB",
      file: docPath("alipay-iot-manual.pdf"),
      downloadName: "支付宝医疗IOT开放平台操作手册.pdf",
      category: "full",
    },
    {
      id: "h5-demo",
      type: "zip",
      name: "二开H5示例",
      description: "二开H5示例代码包，其中init方法中的ISV信息需要替换为已注册的ISV信息",
      size: "276.5 KB",
      file: docPath("h5-demo.zip"),
      downloadName: "二开H5示例.zip",
      category: "full",
    },
    {
      id: "menu-mount-template",
      type: "excel",
      name: "二开菜单申请挂载模板",
      description: "挂载H5链接需要下载该表格并填写信息，最后提交到支付宝开放平台",
      size: "10.6 KB",
      file: docPath("menu-mount-template.xlsx"),
      downloadName: "二开菜单申请挂载模板.xlsx",
      category: "full",
    },
  ]

  // 挂载后（及协议变化后）实时获取每个文件的真实大小
  useEffect(() => {
    let cancelled = false
    Promise.all(
      documents.map(async (doc) => {
        const bytes = await fetchFileSize(doc.file)
        return [doc.id, bytes > 0 ? formatBytes(bytes) : doc.size] as const
      }),
    ).then((entries) => {
      if (!cancelled) setSizes(Object.fromEntries(entries))
    })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFile])

  const tabs = [
    { key: "brochure" as const, label: "产品彩页" },
    { key: "device" as const, label: "设备实施" },
    { key: "semi" as const, label: "半自助" },
    { key: "full" as const, label: "全自助（二次开发）" },
  ]

  const visibleDocs = activeTab === "brochure" ? [] : documents.filter((d) => d.category === activeTab)

  const handleDownload = (doc: DocItem) =>
    downloadFileWithProgress({
      id: doc.id,
      name: doc.name,
      file: doc.file,
      downloadName: doc.downloadName,
      size: sizes[doc.id] ?? doc.size,
    })

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
    <div className="container mx-auto px-4 py-12">
      {/* 顶部标题区 */}
      <div className="flex flex-col items-center text-center mb-10">
        <div className="w-16 h-16 rounded-2xl bg-[#0ab2bd]/10 flex items-center justify-center mb-4">
          <FolderDown className="w-8 h-8 text-[#0ab2bd]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">文档下载中心</h1>
        <p className="max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">
          提供产品彩页与实施相关文档资源，方便您查阅和使用。所有文档均经过安全扫描，请放心下载。
        </p>
      </div>

      {/* 分类按钮 */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "rounded-full px-8 py-2.5 text-base font-medium transition-all border",
              activeTab === tab.key
                ? "bg-[#0ab2bd] text-white border-[#0ab2bd] shadow-md"
                : "bg-background text-foreground/70 border-border hover:border-[#0ab2bd] hover:text-[#0ab2bd]",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "brochure" ? (
        <div className="max-w-6xl mx-auto">
          {/* 汇总下载大卡片：左中右三栏，中间标题绝对居中 */}
          <div className="relative mb-8 flex flex-col gap-6 rounded-2xl border border-border bg-background p-6 shadow-sm md:flex-row md:items-center md:justify-between md:gap-8 md:p-8">
            {/* 左栏：图标 + 标题 + 说明 */}
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0ab2bd]/10">
                <FileText className="h-7 w-7 text-[#0ab2bd]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground md:text-2xl">下载完整资料</h2>
                <p className="mt-2 max-w-md text-base font-medium text-foreground/70 leading-relaxed">
                  包含 6 款商捷过检设备的完整产品彩页与使用场景等信息
                </p>
              </div>
            </div>

            {/* 中间：产品彩页——与标题同行，水平居中于整张卡片 */}
            <span className="text-2xl font-extrabold tracking-wide text-[#0ab2bd] md:absolute md:left-1/2 md:top-8 md:-translate-x-1/2 md:text-3xl">
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

                  <dl className="space-y-2 text-sm">
                    <div className="flex">
                      <dt className="w-[4.5rem] shrink-0 text-muted-foreground">认证型号</dt>
                      <dd className="flex-1 whitespace-nowrap text-foreground/80">{device.model}</dd>
                    </div>
                    <div className="flex">
                      <dt className="w-[4.5rem] shrink-0 text-muted-foreground">操作系统</dt>
                      <dd className="flex-1 whitespace-nowrap text-foreground/80">{device.os}</dd>
                    </div>
                    <div className="flex">
                      <dt className="w-[4.5rem] shrink-0 text-muted-foreground">存储器</dt>
                      <dd className="flex-1 whitespace-nowrap text-foreground/80">{device.storage}</dd>
                    </div>
                    <div className="flex">
                      <dt className="w-[4.5rem] shrink-0 text-muted-foreground">业务模式</dt>
                      <dd className="flex-1 whitespace-nowrap text-foreground/80">{device.businessMode}</dd>
                    </div>
                  </dl>

                  {/* 查看详情按钮：与参数区等宽、主色实心、加大 */}
                  <a
                    href={devicePath(device.slug)}
                    className="mt-4 inline-flex w-full items-center justify-center gap-1 rounded-lg bg-[#0ab2bd] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#089aa3]"
                  >
                    查看详情
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* 文档卡片网格 */
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
      )}

      <Toaster position="bottom-right" richColors />
    </div>
  )
}
