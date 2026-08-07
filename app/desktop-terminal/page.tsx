import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function DesktopTerminalPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-foreground text-center mb-4">
            台式/窗口终端
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            医保台式/窗口终端产品详情页面
          </p>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-muted-foreground">
              此页面正在建设中，请访问首页查看完整产品信息。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
