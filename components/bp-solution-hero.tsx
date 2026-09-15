"use client"

import { useEffect, useState } from "react"
import {
  ScanFace,
  HeartPulse,
  Database,
  Send,
  ShieldCheck,
  UserCheck,
  Link2,
  AlertTriangle,
  History,
  ArrowRight,
} from "lucide-react"

interface BpSolutionHeroProps {
  // 本地文件方式打开时回到根目录的相对前缀，例如 "../../"
  basePath?: string
}

const processSteps = [
  { title: "身份核验", desc: "实名实人认证", icon: ScanFace },
  { title: "血压采集", desc: "医疗级设备测量", icon: HeartPulse },
  { title: "数据归档", desc: "健康数据结构化", icon: Database },
  { title: "监管上报", desc: "异常信息实时上报", icon: Send },
] as const

const features = [
  { label: "实名实人认证", icon: UserCheck, accent: "border-[#0ab2bd]/30 bg-[#0ab2bd]/10 text-[#078089]" },
  { label: "医保身份关联", icon: Link2, accent: "border-blue-200 bg-blue-50 text-blue-700" },
  { label: "健康数据归档", icon: Database, accent: "border-emerald-200 bg-emerald-50 text-emerald-700" },
  { label: "异常信息上报", icon: AlertTriangle, accent: "border-amber-200 bg-amber-50 text-amber-700" },
  { label: "服务记录可追溯", icon: History, accent: "border-purple-200 bg-purple-50 text-purple-700" },
] as const

function useIsFileProtocol() {
  const [isFile, setIsFile] = useState(false)
  useEffect(() => {
    setIsFile(window.location.protocol === "file:")
  }, [])
  return isFile
}

export function BpSolutionHero({ basePath = "../../" }: BpSolutionHeroProps) {
  const isFile = useIsFileProtocol()
  const deviceImg = isFile
    ? `${basePath}images/solutions/bp-medicare-device.png`
    : "/images/solutions/bp-medicare-device.png"

  return (
    <section className="relative overflow-hidden py-14 md:py-20">
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f0fafb] via-white to-[#e8f7f8]" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full border border-[#0ab2bd]/10" />
        <div className="absolute -bottom-32 -left-32 h-[28rem] w-[28rem] rounded-full border border-[#0ab2bd]/5" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* 标题区 + 设备图 */}
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-12">
          <div className="order-2 text-center md:order-1 md:text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0ab2bd]/30 bg-[#0ab2bd]/10 px-3.5 py-1.5 text-xs font-semibold text-[#078089]">
              <ShieldCheck className="h-3.5 w-3.5" />
              中国医疗保障 · IoT认证终端
            </span>
            <h1 className="mt-5 text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-[2.6rem]">
              医保刷脸 <span className="text-[#0ab2bd]">+</span> 血压测量
              <br />
              <span className="text-[#0ab2bd]">一站式合规服务</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base md:mx-0">
              身份核验、血压采集、数据归档、监管上报，全流程闭环。
              以「实名实人认证 + 医保身份关联」保障采集数据真实有效，
              让基层健康服务全过程合规、可信、可追溯。
            </p>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative mx-auto max-w-sm md:max-w-md">
              <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-[#0ab2bd]/15 to-transparent blur-2xl" />
              <img
                src={deviceImg || "/placeholder.svg"}
                alt="血压计+医保IoT一体化终端，左侧为医保刷脸认证屏，右侧为血压测量臂托"
                className="w-full drop-shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* 全流程闭环 */}
        <div className="mt-14 md:mt-16">
          <p className="mb-7 text-center text-sm font-semibold tracking-wide text-[#0ab2bd]">全流程闭环</p>
          <div className="mx-auto flex max-w-4xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {processSteps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={step.title} className="contents">
                  <div className="flex items-center gap-3 sm:flex-1 sm:flex-col sm:gap-2 sm:text-center">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white text-[#0ab2bd] shadow-md ring-1 ring-[#0ab2bd]/20 sm:h-14 sm:w-14">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground sm:text-base">{step.title}</p>
                      <p className="text-xs text-muted-foreground sm:text-sm">{step.desc}</p>
                    </div>
                  </div>
                  {i < processSteps.length - 1 && (
                    <ArrowRight className="mx-1 hidden h-5 w-5 flex-shrink-0 text-[#0ab2bd]/40 sm:block" />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* 核心能力标签 */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 md:mt-12">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <span
                key={f.label}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium ${f.accent}`}
              >
                <Icon className="h-4 w-4" />
                {f.label}
              </span>
            )
          })}
        </div>
      </div>
    </section>
  )
}
