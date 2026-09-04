"use client"

import { useEffect, useState } from "react"
import { FolderDown, FileText, Wrench, Smartphone, Code2, ChevronRight } from "lucide-react"
import { getCategoryHref, type ResourceCategory } from "@/lib/resource-center-nav"

// 判断当前是否以本地文件方式打开（双击 index.html）
function useIsFileProtocol() {
  const [isFile, setIsFile] = useState(false)
  useEffect(() => {
    setIsFile(window.location.protocol === "file:")
  }, [])
  return isFile
}

const cards: { key: ResourceCategory; title: string; description: string; icon: typeof FileText }[] = [
  {
    key: "brochure",
    title: "产品彩页",
    description: "6 款商捷过检设备的完整产品彩页与使用场景介绍",
    icon: FileText,
  },
  {
    key: "implementation",
    title: "设备实施",
    description: "设备激活绑定前需要填写的进件表格",
    icon: Wrench,
  },
  {
    key: "semi",
    title: "半自助",
    description: "电脑驱动、动态库测试工具及 HIS 改造相关文档",
    icon: Smartphone,
  },
  {
    key: "full",
    title: "全自助（二次开发）",
    description: "标准化接口文档、开放平台操作手册及二开示例代码",
    icon: Code2,
  },
]

// “文档下载中心” 首页：引导入口，点击卡片进入对应子页面
export function ResourceCenterHub() {
  const isFile = useIsFileProtocol()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
        <div className="w-12 h-12 rounded-2xl bg-[#0ab2bd]/10 flex items-center justify-center mb-3 sm:w-16 sm:h-16 sm:mb-4">
          <FolderDown className="w-6 h-6 text-[#0ab2bd] sm:w-8 sm:h-8" />
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4 text-balance">文档下载中心</h1>
        <p className="max-w-2xl text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">
          提供产品彩页与实施相关文档资源，方便您查阅和使用。所有文档均经过安全扫描，请放心下载。
        </p>
      </div>

      <div className="grid max-w-5xl mx-auto grid-cols-1 gap-3 sm:gap-6 sm:grid-cols-2">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <a
              key={card.key}
              href={getCategoryHref(card.key, isFile, "hub")}
              className="group flex items-start gap-3 rounded-2xl border border-border bg-background p-4 shadow-sm transition-all hover:-translate-y-1 hover:border-[#0ab2bd] hover:shadow-lg sm:gap-4 sm:p-6"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#0ab2bd]/10 transition-colors group-hover:bg-[#0ab2bd]/15 sm:h-14 sm:w-14">
                <Icon className="h-5 w-5 text-[#0ab2bd] sm:h-7 sm:w-7" />
              </div>
              <div className="flex-1">
                <h2 className="text-base font-bold text-foreground sm:text-xl">{card.title}</h2>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed sm:mt-2 sm:text-sm">{card.description}</p>
              </div>
              <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-[#0ab2bd] sm:h-5 sm:w-5" />
            </a>
          )
        })}
      </div>
    </div>
  )
}
