import { Cloud, ScanFace, Link2, Database, ShieldAlert, History } from "lucide-react"

const tags = [
  { label: "实名实人认证", icon: ScanFace },
  { label: "医保身份关联", icon: Link2 },
  { label: "健康数据归档", icon: Database },
  { label: "异常信息上报", icon: ShieldAlert },
  { label: "服务记录可追溯", icon: History },
] as const

export function BloodPressureIotHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#082a7a] via-[#0e4fc9] to-[#1a6fe8] py-16 sm:py-20 md:py-28">
      {/* 装饰光晕 */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-white/5 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* 左侧文字 */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <h1 className="text-3xl font-bold leading-tight text-balance text-white sm:text-4xl md:text-5xl">
              医保刷脸+血压测量
              <br className="hidden sm:block" />
              一站式合规服务
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg lg:mx-0">
              身份核验、血压采集、数据归档、监管上报全流程闭环
            </p>
          </div>

          {/* 右侧展台+设备 */}
          <div className="relative order-1 flex justify-center lg:order-2">
            <div className="relative flex w-full max-w-sm items-end justify-center pt-8 sm:max-w-md">
              {/* 圆形展台 */}
              <div className="absolute bottom-4 h-16 w-[80%] rounded-full bg-white shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:h-20" />

              {/* 设备图片 */}
              <img
                src="/images/solutions/blood-pressure-iot-device.png"
                alt="血压计+医保IoT一体终端"
                crossOrigin="anonymous"
                className="relative z-10 w-[92%] pb-6 drop-shadow-2xl sm:w-[88%]"
              />

              {/* 悬浮云图标 */}
              <div className="absolute right-2 top-2 z-20 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-xl sm:right-0 sm:top-6 sm:h-14 sm:w-14">
                <Cloud className="h-6 w-6 text-[#0e4fc9] sm:h-7 sm:w-7" />
              </div>

              {/* 后台数据大屏 */}
              <div className="absolute right-0 top-16 z-20 w-32 rounded-xl bg-white p-3 shadow-xl sm:right-[-2.5rem] sm:top-24 sm:w-40">
                <div className="mb-2 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </div>
                <div className="flex h-10 items-end gap-1 sm:h-12">
                  {[40, 65, 50, 80, 60, 95, 45].map((h, i) => (
                    <span key={i} className="flex-1 rounded-sm bg-[#0e4fc9]/70" style={{ height: `${h}%` }} />
                  ))}
                </div>
                <p className="mt-2 text-[10px] font-medium text-slate-500 sm:text-xs">数据监管大屏</p>
              </div>
            </div>
          </div>
        </div>

        {/* 底部标签卡片 */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {tags.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 rounded-2xl bg-white/95 px-3 py-4 shadow-lg backdrop-blur-sm sm:flex-row sm:justify-center sm:gap-3"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0e4fc9]/10">
                <Icon className="h-5 w-5 text-[#0e4fc9]" />
              </div>
              <span className="text-center text-xs font-medium text-pretty text-slate-700 sm:text-left sm:text-sm">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
