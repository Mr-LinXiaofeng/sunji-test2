import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ResourceCenterTabs } from "@/components/resource-center-tabs"
import { DocumentListSection } from "@/components/document-list-section"

export default function SemiDocsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar basePath="../../" />
      <main className="flex-1">
        <ResourceCenterTabs active="semi" />
        <DocumentListSection category="semi" basePath="../../" />
      </main>
      <Footer />
    </div>
  )
}
