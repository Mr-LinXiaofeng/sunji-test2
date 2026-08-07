import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProductSection } from "@/components/product-section"
import { ScenarioSection } from "@/components/scenario-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ProductSection />
        <ScenarioSection />
      </main>
      <Footer />
    </div>
  )
}
