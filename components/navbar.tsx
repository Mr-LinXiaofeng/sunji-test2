"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "首页", external: false, isHome: true },
  { name: "台式/窗口终端", href: "https://www.yuque.com/jiatao-ae47m/knowledgebase/desktop", external: true },
  { name: "手持终端", href: "https://www.yuque.com/jiatao-ae47m/knowledgebase/handheld", external: true },
  { name: "自助终端", href: "https://www.yuque.com/jiatao-ae47m/knowledgebase/kiosk", external: true },
  { name: "嵌入式模组", href: "https://www.yuque.com/jiatao-ae47m/knowledgebase/integrated", external: true },
  { name: "资料中心", external: false, isResource: true, route: "/resource-center", file: "resource-center/index.html" },
]

// 判断当前是否以本地文件方式打开（双击 index.html）
function useIsFileProtocol() {
  const [isFile, setIsFile] = useState(false)
  useEffect(() => {
    setIsFile(window.location.protocol === "file:")
  }, [])
  return isFile
}

function SJIcon({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center bg-[#0ab2bd] text-white font-bold rounded-lg", className)}>
      SJ
    </div>
  )
}

interface NavbarProps {
  basePath?: string
}

export function Navbar({ basePath = "./" }: NavbarProps) {
  const pathname = usePathname()
  const isFile = useIsFileProtocol()
  // 本地文件方式打开时用相对 .html 路径，http 环境（预览/部署）用干净路由
  const homeHref = isFile ? `${basePath}index.html` : "/"

  const getHref = (item: (typeof navItems)[number]) => {
    if (item.isHome) return homeHref
    if (isFile) return `${basePath}${item.file}`
    return item.route ?? "/"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-18 items-center justify-between px-4">
        <a href={homeHref} className="flex items-center gap-3 text-2xl font-bold text-[#0ab2bd]">
          <SJIcon className="w-10 h-10 text-base" />
          商捷SUNJI知识库
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            if (item.external) {
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium transition-colors hover:text-[#0ab2bd] text-foreground/80"
                >
                  {item.name}
                </a>
              )
            }
            const isActive =
              (item.isHome && pathname === "/") ||
              (item.isResource && pathname.startsWith("/resource-center"))
            return (
              <a
                key={item.name}
                href={getHref(item)}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-[#0ab2bd]",
                  isActive ? "text-[#0ab2bd]" : "text-foreground/80"
                )}
              >
                {item.name}
              </a>
            )
          })}
        </nav>
        <MobileNav pathname={pathname} basePath={basePath} isFile={isFile} />
      </div>
    </header>
  )
}

function MobileNav({ pathname, basePath, isFile }: { pathname: string; basePath: string; isFile: boolean }) {
  const homeHref = isFile ? `${basePath}index.html` : "/"

  const getHref = (item: (typeof navItems)[number]) => {
    if (item.isHome) return homeHref
    if (isFile) return `${basePath}${item.file}`
    return item.route ?? "/"
  }

  return (
    <div className="md:hidden">
      <details className="group relative">
        <summary className="flex cursor-pointer list-none items-center gap-1 rounded-md px-3 py-2 text-base font-medium hover:bg-accent">
          <span>菜单</span>
          <svg
            className="h-4 w-4 transition-transform group-open:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div className="absolute right-0 top-full mt-2 w-48 rounded-md border bg-background p-2 shadow-lg">
          {navItems.map((item) => {
            if (item.external) {
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md px-3 py-2 text-base transition-colors hover:bg-accent text-foreground/80"
                >
                  {item.name}
                </a>
              )
            }
            const isActive =
              (item.isHome && pathname === "/") ||
              (item.isResource && pathname.startsWith("/resource-center"))
            return (
              <a
                key={item.name}
                href={getHref(item)}
                className={cn(
                  "block rounded-md px-3 py-2 text-base transition-colors hover:bg-accent",
                  isActive ? "text-[#0ab2bd] font-medium" : "text-foreground/80"
                )}
              >
                {item.name}
              </a>
            )
          })}
        </div>
      </details>
    </div>
  )
}
