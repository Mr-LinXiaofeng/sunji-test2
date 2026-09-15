import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BloodPressureIotHero } from "@/components/blood-pressure-iot-hero"

export default function BloodPressureIotPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar basePath="../../" />
      <main className="flex-1">
        <BloodPressureIotHero />
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-lg text-muted-foreground">更多详细内容正在建设中，敬请期待...</p>
        </div>
      </main>
      <Footer basePath="../../" />
    </div>
  )
}
