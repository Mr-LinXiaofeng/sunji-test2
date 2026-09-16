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
  Cloud,
  Server,
  Wifi,
  Landmark,
} from "lucide-react"
import { DataAnalyticsScreen } from "@/components/data-analytics-screen"
import { ProductImageCarousel } from "@/components/product-image-carousel"
import { DeviceUsageScenarios } from "@/components/device-usage-scenarios"

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
  const bgImg = isFile
    ? `${basePath}images/solutions/bp-hero-bg.png`
    : "/images/solutions/bp-hero-bg.png"

  return (
    <section className="relative overflow-hidden py-14 md:py-20">
      {/* 背景图 + 渐变遮罩 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/85 to-[#e8f7f8]/90" />
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
              <ProductImageCarousel
                images={[deviceImg]}
                alt="血压计+医保IoT一体化终端，左侧为医保刷脸认证屏，右侧为血压测量臂托"
              />
            </div>
          </div>
        </div>

        {/* 政策导向 */}
        <div className="mx-auto mt-10 max-w-4xl md:mt-12">
          <div className="flex flex-col items-start gap-4 rounded-2xl border border-[#0ab2bd]/20 bg-white/80 p-5 shadow-sm backdrop-blur-sm sm:flex-row sm:items-center sm:gap-5 sm:p-6">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#0ab2bd]/10 text-[#0ab2bd]">
              <Landmark className="h-6 w-6" />
            </div>
            <div>
              <p className="text-base font-semibold tracking-wide text-[#0ab2bd] sm:text-lg">政策导向</p>
              <p className="mt-1 text-sm leading-relaxed text-foreground sm:text-[0.95rem]">
                国家医疗保障局重点推动开展<span className="font-bold text-[#078089]">个人医保云</span>建设工作，
                本方案积极响应政策号召，以医保身份认证为入口、健康数据云端归集为支撑，
                助力个人医保云基础设施落地，服务基层医保治理与健康监管数字化升级。
              </p>
            </div>
          </div>
        </div>

        {/* 全流程闭环 */}
        <div className="mt-14 md:mt-16">
          <p className="mb-7 text-center text-base font-semibold tracking-wide text-[#0ab2bd] sm:text-lg">全流程闭环</p>
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

        {/* 数据同步与多维度分析大屏 */}
        <div className="mt-16 md:mt-20">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <p className="text-base font-semibold tracking-wide text-[#0ab2bd] sm:text-lg">数据同步 · 云端存证</p>
            <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
              血压数据与身份信息实时同步上云
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              终端采集的血压数据与核验后的医保身份信息，通过加密通道同步上传至云端，
              汇聚成多维度健康监管分析大屏，支撑异常预警与监管上报。
            </p>
          </div>

          <div className="mx-auto flex max-w-5xl flex-col items-stretch gap-4 md:flex-row md:items-center md:gap-3">
            {/* 终端 */}
            <div className="flex flex-1 flex-col items-center gap-3 rounded-2xl border border-[#0ab2bd]/15 bg-white/70 p-5 text-center shadow-sm backdrop-blur-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0ab2bd]/10 text-[#0ab2bd]">
                <HeartPulse className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">终端采集</p>
                <p className="mt-1 text-xs text-muted-foreground">身份核验 + 血压数据</p>
              </div>
            </div>

            <div className="flex flex-shrink-0 items-center justify-center md:rotate-0">
              <ArrowRight className="h-5 w-5 rotate-90 text-[#0ab2bd]/50 md:rotate-0" />
            </div>

            {/* 云服务器 */}
            <div className="flex flex-1 flex-col items-center gap-3 rounded-2xl border border-[#0ab2bd]/25 bg-gradient-to-b from-[#0ab2bd]/10 to-white/70 p-5 text-center shadow-md backdrop-blur-sm">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0ab2bd] text-white shadow-lg shadow-[#0ab2bd]/30">
                <Server className="h-7 w-7" />
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#0ab2bd] shadow ring-1 ring-[#0ab2bd]/20">
                  <Wifi className="h-3 w-3" />
                </span>
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">云端加密同步</p>
                <p className="mt-1 text-xs text-muted-foreground">数据加密传输 · 云端存证</p>
              </div>
            </div>

            <div className="flex flex-shrink-0 items-center justify-center">
              <ArrowRight className="h-5 w-5 rotate-90 text-[#0ab2bd]/50 md:rotate-0" />
            </div>

            {/* 分析大屏 */}
            <div className="flex flex-1 flex-col items-center gap-3 rounded-2xl border border-[#0ab2bd]/15 bg-white/70 p-5 text-center shadow-sm backdrop-blur-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0ab2bd]/10 text-[#0ab2bd]">
                <Cloud className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">多维分析大屏</p>
                <p className="mt-1 text-xs text-muted-foreground">监管上报 · 异常预警</p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-5xl">
            <DataAnalyticsScreen />
          </div>
        </div>

        <DeviceUsageScenarios basePath={basePath} isFile={isFile} />
      </div>
    </section>
  )
}
