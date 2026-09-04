import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ResourceCenterTabs } from "@/components/resource-center-tabs"
import { ProductBrochureSection } from "@/components/product-brochure-section"

export default function BrochurePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar basePath="../../" />
      <main className="flex-1">
        <ResourceCenterTabs active="brochure" />
        <ProductBrochureSection basePath="../../" />
      </main>
      <Footer />
    </div>
  )
}
