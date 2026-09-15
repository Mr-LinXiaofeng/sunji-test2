import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BackToHomeButton } from "@/components/back-to-home-button"
import { BpSolutionHero } from "@/components/bp-solution-hero"

export default function IotBloodPressurePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar basePath="../" />
      <main className="flex-1">
        <BpSolutionHero basePath="../" />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-sm text-muted-foreground">
            更多方案详情持续完善中，敬请期待...
          </p>
          <div className="mt-6">
            <BackToHomeButton basePath="../" />
          </div>
        </div>
      </main>
      <Footer basePath="../" />
    </div>
  )
}
