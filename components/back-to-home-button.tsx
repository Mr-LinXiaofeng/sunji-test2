"use client"

import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"

interface BackToHomeButtonProps {
  // 本地文件方式打开时，回到首页 index.html 的相对前缀，例如 "../../"
  basePath?: string
}

export function BackToHomeButton({ basePath = "./" }: BackToHomeButtonProps) {
  const [isFile, setIsFile] = useState(false)
  useEffect(() => {
    setIsFile(window.location.protocol === "file:")
  }, [])

  // 本地文件方式打开时用相对 .html 路径，http 环境（预览/部署）用干净路由
  const href = isFile ? `${basePath}index.html` : "/"

  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 px-6 py-3 bg-[#0ab2bd] text-white font-medium rounded-lg hover:bg-[#099aa3] transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      返回首页
    </a>
  )
}
