"use client"

import { useEffect, useState } from "react"
import { BookOpen, FolderOpen } from "lucide-react"

export function HeroSection() {
  const [isFile, setIsFile] = useState(false)
  useEffect(() => {
    setIsFile(window.location.protocol === "file:")
  }, [])
  const resourceCenterHref = isFile ? "./resource-center/index.html" : "/resource-center"

  return (
    <section className="relative py-14 md:py-16 overflow-hidden">
      {/* 背景纹理层 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f0fafb] via-white to-[#e8f7f8]" />
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230ab2bd' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      {/* 几何装饰线条 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-[#0ab2bd]/10" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full border border-[#0ab2bd]/5" />
      </div>
      
      <div className="container relative mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#0ab2bd] mb-6">
          商捷SUNJI知识库
        </h1>
        <a
          href="https://www.yuque.com/jiatao-ae47m/knowledgebase"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-3 rounded-xl bg-[#0ab2bd] px-20 py-6 text-2xl font-bold text-white shadow-[0_8px_30px_rgba(10,178,189,0.4)] transition-all duration-300 hover:bg-[#099aa3] hover:shadow-[0_12px_40px_rgba(10,178,189,0.5)] animate-breathe"
        >
          <BookOpen className="w-8 h-8" />
          访问完整知识库
          <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
        <div className="mt-7">
          <a
            href={resourceCenterHref}
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#0ab2bd]/30 bg-white/60 px-5 py-2 text-sm font-medium text-[#0ab2bd] shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[#0ab2bd]/60 hover:bg-[#0ab2bd]/5 hover:shadow-md"
          >
            <FolderOpen className="w-4 h-4" />
            资料中心
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </a>
        </div>
        <p className="mt-8 text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          专业的医保终端解决方案，为您提供设备手册、故障排查、技术文档等全方位支持
        </p>
      </div>
    </section>
  )
}
