"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const deviceNavItems = [
  { name: "平板终端", slug: "t671a" },
  { name: "碰一碰终端", slug: "t3b0b" },
  { name: "桌面/窗口终端", slug: "t6711" },
  { name: "融合终端", slug: "t3b0a" },
  { name: "手持终端", slug: "t6f01" },
  { name: "自助终端", slug: "f4e0m" },
] as const

const navItems = [
  { name: "首页", isHome: true },
  ...deviceNavItems.map((d) => ({ name: d.name, isDevice: true, slug: d.slug })),
] as const

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

// 计算某个导航项在当前环境（http 干净路由 / 本地文件双击）下的目标地址
function useHrefResolver(basePath: string, isFile: boolean) {
  const homeHref = isFile ? `${basePath}index.html` : "/"
  const resourceCenterHref = isFile ? `${basePath}resource-center/index.html` : "/resource-center"

  const getHref = (item: (typeof navItems)[number]) => {
    if ("isHome" in item && item.isHome) return homeHref
    if ("isDevice" in item && item.isDevice) {
      return isFile
        ? `${basePath}resource-center/brochure/${item.slug}/index.html`
        : `/resource-center/brochure/${item.slug}`
    }
    return homeHref
  }

  return { homeHref, resourceCenterHref, getHref }
}

export function Navbar({ basePath = "./" }: NavbarProps) {
  const pathname = usePathname()
  const isFile = useIsFileProtocol()
  const { homeHref, resourceCenterHref, getHref } = useHrefResolver(basePath, isFile)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-18 items-center justify-between px-4">
        <a href={homeHref} className="flex items-center gap-3 text-2xl font-bold text-[#0ab2bd]">
          <SJIcon className="w-10 h-10 text-base" />
          商捷SUNJI知识库
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive =
              ("isHome" in item && item.isHome && pathname === "/") ||
              ("isDevice" in item && item.isDevice && pathname === `/resource-center/brochure/${item.slug}`)
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
      {/* 导航栏下方工具条：右侧提供资料中心入口 */}
      <div className="border-t border-border/40">
        <div className="container mx-auto flex h-12 items-center justify-end px-4">
          <a
            href={resourceCenterHref}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
              pathname.startsWith("/resource-center")
                ? "bg-[#0ab2bd] text-white"
                : "bg-[#0ab2bd]/10 text-[#0ab2bd] hover:bg-[#0ab2bd]/20"
            )}
          >
            资料中心
          </a>
        </div>
      </div>
    </header>
  )
}

function MobileNav({ pathname, basePath, isFile }: { pathname: string; basePath: string; isFile: boolean }) {
  const { homeHref, getHref } = useHrefResolver(basePath, isFile)

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
            const isActive =
              ("isHome" in item && item.isHome && pathname === "/") ||
              ("isDevice" in item && item.isDevice && pathname === `/resource-center/brochure/${item.slug}`)
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
