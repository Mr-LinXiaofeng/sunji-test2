import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ResourceCenterTabs } from "@/components/resource-center-tabs"
import { DocumentListSection } from "@/components/document-list-section"

export default function FullDocsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar basePath="../../" />
      <main className="flex-1">
        <ResourceCenterTabs active="full" />
        <DocumentListSection category="full" basePath="../../" />
      </main>
      <Footer />
    </div>
  )
}
