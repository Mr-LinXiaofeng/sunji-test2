"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Wifi, Link2, Monitor, Smartphone, ShieldOff, AlertTriangle, Bug, Globe, Zap, KeyRound } from "lucide-react"

interface FAQItem {
  id: number
  title: string
  subtitle?: string
  subtitleLink?: { prefix?: string; label: string; url: string } // 副标题内可单独跳转的链接（prefix 为普通文字，label 为带下划线的链接）
  href: string
  icon: React.ReactNode
  accentColor: string
}

const faqItems: FAQItem[] = [
  {
    id: 1,
  title: "自动激活绑定",
  subtitle: "适用机型：T3B0A、T3B0B、T6F01",
  subtitleLink: {
    prefix: "自动激活绑定二维码生成网址：",
    label: "http://8.154.41.111/bindQr/",
    url: "http://8.154.41.111/bindQr/",
  },
    href: "https://www.yuque.com/jiatao-ae47m/knowledgebase/ozxswr5x8vmu99y3",
    icon: <Zap className="w-6 h-6" />,
    accentColor: "from-[#0ab2bd]/10 to-[#0ab2bd]/5 border-[#0ab2bd]/30 hover:border-[#0ab2bd]",
  },
  {
    id: 2,
    title: "进件、手动激活绑定",
    href: "https://www.yuque.com/jiatao-ae47m/knowledgebase/eeeovfqpgfg5a0w7",
    icon: <KeyRound className="w-6 h-6" />,
    accentColor: "from-amber-100/80 to-amber-50/50 border-amber-300/50 hover:border-amber-400",
  },
  {
    id: 3,
    title: "医保刷脸网络故障排查方案",
    href: "https://www.yuque.com/jiatao-ae47m/knowledgebase/gzkyvccmgz4rbzv0",
    icon: <Wifi className="w-6 h-6" />,
    accentColor: "from-blue-100/80 to-blue-50/50 border-blue-300/50 hover:border-blue-400",
  },
  {
    id: 4,
    title: "设备连接失败",
    subtitle: "适用机型：T6711、T3B0A、T3B0B",
    href: "https://www.yuque.com/jiatao-ae47m/knowledgebase/hgcoqgr58cb9ol94",
    icon: <Link2 className="w-6 h-6" />,
    accentColor: "from-rose-100/80 to-rose-50/50 border-rose-300/50 hover:border-rose-400",
  },
  {
    id: 5,
    title: "半自助方案",
    subtitle: "电脑/自助机调起设备刷脸，适用机型：T6711、T3B0A、T3B0B、T6F01",
    href: "https://www.yuque.com/jiatao-ae47m/knowledgebase/rqiy8qk8yqgtl7g6",
    icon: <Monitor className="w-6 h-6" />,
    accentColor: "from-purple-100/80 to-purple-50/50 border-purple-300/50 hover:border-purple-400",
  },
  {
    id: 6,
    title: "全自助方案",
    subtitle: "二次开发全流程，适用机型：T6F01、F4E0M",
    href: "https://www.yuque.com/jiatao-ae47m/knowledgebase/laan6mn3uoy8ag9x",
    icon: <Smartphone className="w-6 h-6" />,
    accentColor: "from-indigo-100/80 to-indigo-50/50 border-indigo-300/50 hover:border-indigo-400",
  },
  {
    id: 7,
    title: "受攻击解除",
    href: "https://www.yuque.com/jiatao-ae47m/knowledgebase/dv9641vdienggosg",
    icon: <ShieldOff className="w-6 h-6" />,
    accentColor: "from-red-100/80 to-red-50/50 border-red-300/50 hover:border-red-400",
  },
  {
    id: 8,
    title: "Z1065设备未授权",
    href: "https://www.yuque.com/jiatao-ae47m/knowledgebase/uvrbwi7peuqmoqqf",
    icon: <AlertTriangle className="w-6 h-6" />,
    accentColor: "from-orange-100/80 to-orange-50/50 border-orange-300/50 hover:border-orange-400",
  },
  {
    id: 9,
    title: "刷脸报错bpaas init fail",
    href: "https://www.yuque.com/jiatao-ae47m/knowledgebase/genkzl5g3dz1lvbh",
    icon: <Bug className="w-6 h-6" />,
    accentColor: "from-pink-100/80 to-pink-50/50 border-pink-300/50 hover:border-pink-400",
  },
  {
    id: 10,
    title: "各省市DNS/APN快速查询",
    href: "https://www.yuque.com/jiatao-ae47m/knowledgebase/dqu4kge4u1c1scpc",
    icon: <Globe className="w-6 h-6" />,
    accentColor: "from-emerald-100/80 to-emerald-50/50 border-emerald-300/50 hover:border-emerald-400",
  },
]

function FAQCard({ item }: { item: FAQItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <Card className={`h-full transition-all duration-300 border-2 bg-gradient-to-br ${item.accentColor} hover:shadow-lg hover:-translate-y-1`}>
        <CardContent className="p-3.5 sm:p-5">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex-shrink-0 w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-white/80 shadow-sm flex items-center justify-center text-[#0ab2bd] group-hover:scale-110 transition-transform duration-300 [&_svg]:w-4 [&_svg]:h-4 sm:[&_svg]:w-6 sm:[&_svg]:h-6">
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-lg font-bold text-foreground group-hover:text-[#0ab2bd] transition-colors leading-snug line-clamp-2">
                {item.title}
              </h3>
              {item.subtitle && (
                <p className="mt-1 whitespace-pre-line break-words text-xs sm:text-sm text-muted-foreground line-clamp-3">
                  {item.subtitle}
                </p>
              )}
              {item.subtitleLink && (
                <p className="mt-1 break-words text-xs sm:text-sm text-muted-foreground">
                  {item.subtitleLink.prefix}
                  <span
                    role="link"
                    tabIndex={0}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      window.open(item.subtitleLink!.url, "_blank", "noopener,noreferrer")
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        e.stopPropagation()
                        window.open(item.subtitleLink!.url, "_blank", "noopener,noreferrer")
                      }
                    }}
                    className="cursor-pointer text-[#0ab2bd] underline underline-offset-2 hover:text-[#089aa3]"
                  >
                    {item.subtitleLink.label}
                  </span>
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </a>
  )
}

export function ProductSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-muted/20 to-muted/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">商捷产品常用功能/常见问题</h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-lg">
            点击链接可查看设备常用功能和常见问题
          </p>
        </div>
        
        {/* 桌面端: 两列五行布局 */}
        <div className="hidden md:grid grid-cols-2 gap-5 max-w-5xl mx-auto">
          {faqItems.map((item) => (
            <FAQCard key={item.id} item={item} />
          ))}
        </div>
        
        {/* 移动端: 单列布局 */}
        <div className="md:hidden space-y-3">
          {faqItems.map((item) => (
            <FAQCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
