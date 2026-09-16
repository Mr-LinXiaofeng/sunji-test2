"use client"

import { Building2, HeartHandshake } from "lucide-react"

interface DeviceUsageScenariosProps {
  basePath?: string
  isFile?: boolean
}

const scenarios = [
  {
    title: "医院导诊台",
    desc: "患者在导诊台完成刷脸认证与血压测量，数据即时归档，缩短候诊流程，提升就诊体验。",
    icon: Building2,
    image: "scenario-hospital.png",
    alt: "患者在医院导诊台使用医保IoT一体化终端进行刷脸认证与血压测量",
  },
  {
    title: "基层社区卫生服务中心",
    desc: "老年患者在社区卫生服务中心由医护人员协助完成身份核验与血压采集，助力基层慢病管理。",
    icon: HeartHandshake,
    image: "scenario-community.png",
    alt: "老年患者在基层社区卫生服务中心使用医保IoT一体化终端进行刷脸认证与血压测量",
  },
] as const

export function DeviceUsageScenarios({ basePath = "../../", isFile = false }: DeviceUsageScenariosProps) {
  const getImg = (name: string) =>
    isFile ? `${basePath}images/solutions/${name}` : `/images/solutions/${name}`

  return (
    <div className="mt-16 md:mt-20">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <p className="text-base font-semibold tracking-wide text-[#0ab2bd] sm:text-lg">设备使用场景</p>
        <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
          覆盖多层级医疗健康服务场景
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          从三甲医院导诊台到基层社区卫生服务中心，一体化终端灵活适配不同人群与场景需求。
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        {scenarios.map((s) => {
          const Icon = s.icon
          return (
            <div
              key={s.title}
              className="group overflow-hidden rounded-2xl border border-[#0ab2bd]/15 bg-white/70 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-[#e8f7f8]">
                <img
                  src={getImg(s.image) || "/placeholder.svg"}
                  alt={s.alt}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex items-start gap-3 p-5">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#0ab2bd]/10 text-[#0ab2bd]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground sm:text-base">{s.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                    {s.desc}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
