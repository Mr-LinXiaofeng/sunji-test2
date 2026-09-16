import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BpSolutionHero } from "@/components/bp-solution-hero"

export default function IotBloodPressurePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar basePath="../" />
      <main className="flex-1">
        <BpSolutionHero basePath="../" />
      </main>
      <Footer basePath="../" />
    </div>
  )
}
