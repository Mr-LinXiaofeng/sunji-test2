type IconProps = { className?: string }

// Word：带 W 标识的单页文档轮廓图标
export function WordIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <text x="12" y="17.5" fontSize="6.5" fontWeight="700" textAnchor="middle" fill="currentColor" stroke="none">
        W
      </text>
    </svg>
  )
}

// Excel：带表格横线的表格文档轮廓图标
export function ExcelIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M8 12.5h8" />
      <path d="M8 15.5h8" />
      <path d="M8 18h8" />
      <path d="M12 12v6.5" />
    </svg>
  )
}

// PDF：双层书页，中间印有 PDF 字样轮廓图标
export function PdfIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* 后层书页 */}
      <path d="M6 6H4.5A1.5 1.5 0 0 0 3 7.5v11A1.5 1.5 0 0 0 4.5 20H14a1.5 1.5 0 0 0 1.5-1.5V17" />
      {/* 前层书页 */}
      <path d="M15 3H8.5A1.5 1.5 0 0 0 7 4.5v11A1.5 1.5 0 0 0 8.5 17H18a1.5 1.5 0 0 0 1.5-1.5V7.5z" />
      <path d="M15 3v4.5h4.5" />
      <text x="12.5" y="13.5" fontSize="4.2" fontWeight="700" textAnchor="middle" fill="currentColor" stroke="none">
        PDF
      </text>
    </svg>
  )
}

// ZIP：简约文档线条图标（带拉链）
export function ZipIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      {/* 拉链 */}
      <path d="M12 8.5v8" strokeDasharray="1.5 1.5" />
      <rect x="10.75" y="16" width="2.5" height="3" rx="0.5" />
    </svg>
  )
}

export type FileType = "word" | "excel" | "pdf" | "zip"

export const typeConfig: Record<
  FileType,
  { label: string; icon: (props: IconProps) => JSX.Element; color: string; tagBg: string; iconBg: string }
> = {
  // 淡灰蓝
  word: {
    label: "DOCX",
    icon: WordIcon,
    color: "text-[#6b7f99]",
    tagBg: "bg-[#eef1f5] text-[#6b7f99]",
    iconBg: "bg-[#eef1f5]",
  },
  // 灰绿
  excel: {
    label: "XLSX",
    icon: ExcelIcon,
    color: "text-[#6f8f6b]",
    tagBg: "bg-[#eef3ed] text-[#6f8f6b]",
    iconBg: "bg-[#eef3ed]",
  },
  // 砖棕
  pdf: {
    label: "PDF",
    icon: PdfIcon,
    color: "text-[#9c6b5a]",
    tagBg: "bg-[#f4ece9] text-[#9c6b5a]",
    iconBg: "bg-[#f4ece9]",
  },
  // 土橙
  zip: {
    label: "ZIP",
    icon: ZipIcon,
    color: "text-[#b78a53]",
    tagBg: "bg-[#f6f0e6] text-[#b78a53]",
    iconBg: "bg-[#f6f0e6]",
  },
}
