import { Construction, ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const solutionNames: Record<string, string> = {
  "1": "解决方案1",
  "2": "解决方案2",
  "3": "解决方案3",
}

export function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
  ]
}

export default async function SolutionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const solutionName = solutionNames[id] || `解决方案${id}`

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar basePath="../../" />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#0ab2bd]/10 flex items-center justify-center">
              <Construction className="w-10 h-10 text-[#0ab2bd]" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">{solutionName}</h1>
            <p className="text-lg text-muted-foreground mb-8">
              页面正在建设中，敬请期待...
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              我们正在努力完善此页面的内容，请稍后再来查看。
            </p>
            <a 
              href="../../index.html"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0ab2bd] text-white font-medium rounded-lg hover:bg-[#099aa3] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              返回首页
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
