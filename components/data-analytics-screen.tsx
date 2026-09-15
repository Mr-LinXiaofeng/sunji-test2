"use client"

import { Activity, ShieldCheck, Users, AlertTriangle } from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const bpTrendData = [
  { time: "06:00", systolic: 118, diastolic: 76 },
  { time: "09:00", systolic: 124, diastolic: 80 },
  { time: "12:00", systolic: 121, diastolic: 78 },
  { time: "15:00", systolic: 129, diastolic: 83 },
  { time: "18:00", systolic: 126, diastolic: 81 },
  { time: "21:00", systolic: 120, diastolic: 77 },
]

const regionData = [
  { region: "社区A", count: 186 },
  { region: "社区B", count: 142 },
  { region: "社区C", count: 168 },
  { region: "社区D", count: 121 },
  { region: "社区E", count: 154 },
]

const verifyData = [
  { name: "认证通过", value: 96.8, fill: "var(--color-pass)" },
  { name: "待复核", value: 3.2, fill: "var(--color-pending)" },
]

const bpChartConfig = {
  systolic: { label: "收缩压", color: "#0ab2bd" },
  diastolic: { label: "舒张压", color: "#7dd8de" },
} satisfies ChartConfig

const regionChartConfig = {
  count: { label: "采集人次", color: "#0ab2bd" },
} satisfies ChartConfig

const verifyChartConfig = {
  value: { label: "占比" },
  pass: { label: "认证通过", color: "#0ab2bd" },
  pending: { label: "待复核", color: "#f59e0b" },
} satisfies ChartConfig

const statCards = [
  { label: "今日采集人次", value: "1,286", icon: Activity, suffix: "人" },
  { label: "身份认证通过率", value: "96.8", icon: ShieldCheck, suffix: "%" },
  { label: "医保关联用户", value: "9,742", icon: Users, suffix: "人" },
  { label: "异常上报", value: "12", icon: AlertTriangle, suffix: "条" },
]

export function DataAnalyticsScreen() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#0ab2bd]/30 bg-[#04181a] p-4 shadow-2xl shadow-[#0ab2bd]/20 sm:p-6">
      {/* 网格纹理背景 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,178,189,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(10,178,189,0.5) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#2be8c8]" />
            <h3 className="text-sm font-bold tracking-wide text-white sm:text-base">
              健康数据监管分析大屏
            </h3>
          </div>
          <span className="rounded-full border border-[#0ab2bd]/40 bg-[#0ab2bd]/10 px-3 py-1 text-xs text-[#7dd8de]">
            实时同步 · 数据已加密
          </span>
        </div>

        {/* 顶部指标卡 */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {statCards.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.label}
                className="rounded-xl border border-[#0ab2bd]/20 bg-white/5 p-3 backdrop-blur-sm"
              >
                <div className="flex items-center gap-1.5 text-[#7dd8de]">
                  <Icon className="h-3.5 w-3.5" />
                  <span className="text-[11px] text-[#a9d8dc] sm:text-xs">{s.label}</span>
                </div>
                <p className="mt-1.5 text-lg font-bold text-white sm:text-xl">
                  {s.value}
                  <span className="ml-0.5 text-xs font-normal text-[#7dd8de]">{s.suffix}</span>
                </p>
              </div>
            )
          })}
        </div>

        {/* 图表区 */}
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          {/* 血压趋势 */}
          <div className="col-span-1 rounded-xl border border-[#0ab2bd]/20 bg-white/5 p-3 md:col-span-2">
            <p className="mb-2 text-xs font-semibold text-[#a9d8dc]">区域血压均值趋势（mmHg）</p>
            <ChartContainer config={bpChartConfig} className="h-[160px] w-full">
              <AreaChart data={bpTrendData} margin={{ left: -20, right: 8, top: 4, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="rgba(125,216,222,0.15)" />
                <XAxis
                  dataKey="time"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#a9d8dc", fontSize: 11 }}
                />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#a9d8dc", fontSize: 11 }} width={30} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <defs>
                  <linearGradient id="fillSystolic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ab2bd" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#0ab2bd" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="fillDiastolic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7dd8de" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#7dd8de" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="systolic"
                  type="monotone"
                  fill="url(#fillSystolic)"
                  stroke="#0ab2bd"
                  strokeWidth={2}
                />
                <Area
                  dataKey="diastolic"
                  type="monotone"
                  fill="url(#fillDiastolic)"
                  stroke="#7dd8de"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </div>

          {/* 身份认证通过率 */}
          <div className="col-span-1 rounded-xl border border-[#0ab2bd]/20 bg-white/5 p-3">
            <p className="mb-2 text-xs font-semibold text-[#a9d8dc]">实名实人认证通过率</p>
            <ChartContainer config={verifyChartConfig} className="mx-auto h-[160px] w-full max-w-[160px]">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={verifyData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={40}
                  outerRadius={62}
                  strokeWidth={2}
                  stroke="#04181a"
                >
                  {verifyData.map((entry) => (
                    <Cell key={entry.name} fill={entry.name === "认证通过" ? "#0ab2bd" : "#f59e0b"} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <p className="-mt-4 text-center text-lg font-bold text-white">
              96.8<span className="text-xs font-normal text-[#7dd8de]">%</span>
            </p>
          </div>

          {/* 社区采集人次 */}
          <div className="col-span-1 rounded-xl border border-[#0ab2bd]/20 bg-white/5 p-3 md:col-span-3">
            <p className="mb-2 text-xs font-semibold text-[#a9d8dc]">各社区采集人次分布</p>
            <ChartContainer config={regionChartConfig} className="h-[140px] w-full">
              <BarChart data={regionData} margin={{ left: -20, right: 8, top: 4, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="rgba(125,216,222,0.15)" />
                <XAxis
                  dataKey="region"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#a9d8dc", fontSize: 11 }}
                />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#a9d8dc", fontSize: 11 }} width={30} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="#0ab2bd" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
