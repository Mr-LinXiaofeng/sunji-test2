"use client"

import { useEffect, useState } from "react"
import { ArrowLeft } from "lucide-react"

interface BackToHomeButtonProps {
  // 本地文件方式打开时，回到目标页面 index.html 的相对前缀，例如 "../../"
  basePath?: string
  // 按钮文案，默认"返回首页"
  label?: string
  // 跳转目标相对于站点根目录的路径片段（不含前后斜杠），例如 "resource-center"，留空表示首页
  targetPath?: string
}

export function BackToHomeButton({ basePath = "./", label = "返回首页", targetPath = "" }: BackToHomeButtonProps) {
  const [isFile, setIsFile] = useState(false)
  useEffect(() => {
    setIsFile(window.location.protocol === "file:")
  }, [])

  // 本地文件方式打开时用相对 .html 路径，http 环境（预览/部署）用干净路由
  const href = isFile ? `${basePath}${targetPath ? `${targetPath}/` : ""}index.html` : `/${targetPath}`

  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 px-6 py-3 bg-[#0ab2bd] text-white font-medium rounded-lg hover:bg-[#099aa3] transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      {label}
    </a>
  )
}
