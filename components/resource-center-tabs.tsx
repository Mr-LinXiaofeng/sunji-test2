"use client"

import { useEffect, useState } from "react"
import { FolderDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { resourceCenterTabs, getCategoryHref, type ResourceCategory } from "@/lib/resource-center-nav"

// 判断当前是否以本地文件方式打开（双击 index.html）
function useIsFileProtocol() {
  const [isFile, setIsFile] = useState(false)
  useEffect(() => {
    setIsFile(window.location.protocol === "file:")
  }, [])
  return isFile
}

interface ResourceCenterTabsProps {
  active: ResourceCategory
}

// 子页面顶部共用的标题区 + 分类切换导航（真实路由跳转，替代原先的 Tab 切换）
export function ResourceCenterTabs({ active }: ResourceCenterTabsProps) {
  const isFile = useIsFileProtocol()

  return (
    <div className="container mx-auto px-4 pt-8 sm:pt-12">
      <div className="flex flex-col items-center text-center mb-6 sm:mb-10">
        <div className="w-10 h-10 rounded-2xl bg-[#0ab2bd]/10 flex items-center justify-center mb-2.5 sm:w-16 sm:h-16 sm:mb-4">
          <FolderDown className="w-5 h-5 text-[#0ab2bd] sm:w-8 sm:h-8" />
        </div>
        <h1 className="text-xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2 sm:mb-4 text-balance">文档下载中心</h1>
        <p className="max-w-2xl text-xs sm:text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">
          提供产品彩页与实施相关文档资源，方便您查阅和使用。所有文档均经过安全扫描，请放心下载。
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 mb-6 sm:gap-3 sm:mb-10">
        {resourceCenterTabs.map((tab) => (
          <a
            key={tab.key}
            href={getCategoryHref(tab.key, isFile, "sub")}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-medium transition-all border sm:px-8 sm:py-2.5 sm:text-base",
              active === tab.key
                ? "bg-[#0ab2bd] text-white border-[#0ab2bd] shadow-md"
                : "bg-background text-foreground/70 border-border hover:border-[#0ab2bd] hover:text-[#0ab2bd]",
            )}
          >
            {tab.label}
          </a>
        ))}
      </div>
    </div>
  )
}
