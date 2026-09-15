import { ScanFace, Link2, Database, ShieldAlert, History, Server } from "lucide-react"

const tags = [
  { label: "实名实人认证", icon: ScanFace },
  { label: "医保身份关联", icon: Link2 },
  { label: "健康数据归档", icon: Database },
  { label: "异常信息上报", icon: ShieldAlert },
  { label: "服务记录可追溯", icon: History },
] as const

const metrics = [
  { label: "实名核验率", value: "99.8%" },
  { label: "日采集量", value: "12,406" },
  { label: "在线终端", value: "3,281" },
  { label: "上报及时率", value: "100%" },
  { label: "异常拦截", value: "156" },
  { label: "数据归档量", value: "8.6万" },
] as const

export function BloodPressureIotHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#07262c] via-[#0a4a52] to-[#0d6b74] py-10 sm:py-12 md:py-16">
      {/* 装饰光晕 */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#0ab2bd]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-[#0ab2bd]/10 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
          {/* 左侧文字 */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <h1 className="text-2xl font-bold leading-tight text-balance text-white sm:text-3xl md:text-4xl lg:text-5xl">
              医保刷脸+血压测量
              <br className="hidden sm:block" />
              一站式合规服务
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-white/75 sm:text-base lg:mx-0 lg:text-lg">
              身份核验、血压采集、数据归档、监管上报全流程闭环
            </p>
          </div>

          {/* 右侧展台+设备 */}
          <div className="relative order-1 lg:order-2">
            <div className="relative mx-auto h-72 w-full max-w-2xl sm:h-96 md:h-[28rem] lg:h-[30rem]">
              {/* 圆形展台：放大并向两侧自然延伸淡出 */}
              <div
                className="absolute bottom-4 left-1/2 h-24 w-[170%] -translate-x-1/2 rounded-full bg-gradient-to-b from-white to-white/70 shadow-[0_25px_70px_rgba(0,0,0,0.4)] sm:bottom-6 sm:h-28 md:h-32"
                style={{
                  maskImage: "linear-gradient(to right, transparent, white 10%, white 90%, transparent)",
                  WebkitMaskImage: "linear-gradient(to right, transparent, white 10%, white 90%, transparent)",
                }}
              />

              {/* 数据大屏：透明玻璃质感，置于设备右后方，不遮挡设备 */}
              <div className="absolute right-[-6%] top-0 z-0 w-[58%] rounded-2xl border border-white/25 bg-white/10 p-2.5 shadow-2xl backdrop-blur-md sm:top-1 sm:p-3.5 md:p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[9px] font-semibold text-white/90 sm:text-xs md:text-sm">
                    医保数据监管大屏
                  </span>
                  <span className="flex items-center gap-1 text-[8px] text-emerald-300 sm:text-[10px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    实时在线
                  </span>
                </div>

                <div className="mb-2 grid grid-cols-3 gap-1.5 sm:gap-2">
                  {metrics.map((m) => (
                    <div key={m.label} className="rounded-lg bg-white/10 px-1 py-1 sm:px-1.5 sm:py-1.5">
                      <p className="text-[9px] font-bold text-white sm:text-xs md:text-sm">{m.value}</p>
                      <p className="text-[6px] text-white/60 sm:text-[8px] md:text-[9px]">{m.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mb-2 flex h-10 items-end gap-1 rounded-lg bg-white/5 p-1.5 sm:h-14 sm:p-2 md:h-16">
                  {[35, 55, 40, 70, 50, 85, 60, 45, 75, 30, 65, 48].map((h, i) => (
                    <span key={i} className="flex-1 rounded-sm bg-[#5fe0e8]/70" style={{ height: `${h}%` }} />
                  ))}
                </div>

                <svg viewBox="0 0 100 24" className="h-6 w-full sm:h-8 md:h-9" preserveAspectRatio="none">
                  <polyline
                    points="0,18 10,10 20,14 30,4 40,12 50,6 60,16 70,8 80,13 90,5 100,10"
                    fill="none"
                    stroke="#a7f3ec"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>

              {/* 悬浮云服务器：位于数据大屏左侧，不遮挡设备与大屏内容 */}
              <div className="absolute right-[42%] top-0 z-[5] flex flex-col items-center sm:right-[40%]">
                <div className="relative flex h-10 w-14 items-center justify-center rounded-full bg-gradient-to-b from-white to-white/85 shadow-xl sm:h-12 sm:w-16 md:h-14 md:w-20">
                  <div className="absolute -left-2 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-gradient-to-b from-white to-white/85 sm:h-7 sm:w-7 md:h-8 md:w-8" />
                  <div className="absolute -right-2 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-gradient-to-b from-white to-white/85 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                  <Server className="relative z-10 h-3.5 w-3.5 text-[#0a6b74] sm:h-4 sm:w-4 md:h-5 md:w-5" />
                </div>
                <div className="mt-1 h-1.5 w-7 rounded-full bg-black/15 blur-[2px] sm:w-9" />
              </div>

              {/* 设备图片：朝向左侧 */}
              <img
                src="/images/solutions/blood-pressure-iot-device.png"
                alt="血压计+医保IoT一体终端"
                crossOrigin="anonymous"
                className="absolute bottom-10 left-0 z-10 w-[42%] -scale-x-100 drop-shadow-2xl sm:bottom-14 md:bottom-16"
              />
            </div>
          </div>
        </div>

        {/* 底部标签卡片 */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {tags.map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 rounded-2xl bg-white/95 px-3 py-4 shadow-lg backdrop-blur-sm sm:flex-row sm:justify-center sm:gap-3"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0a6b74]/10">
                <Icon className="h-5 w-5 text-[#0a6b74]" />
              </div>
              <span className="text-center text-xs font-bold text-pretty text-slate-800 sm:text-left sm:text-sm">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
