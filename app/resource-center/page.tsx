import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DocumentCenter } from "@/components/document-center"

export default function ResourceCenterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar basePath="../" />
      <main className="flex-1">
        <DocumentCenter basePath="../" />
      </main>
      <Footer />
    </div>
  )
}
