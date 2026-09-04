import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ResourceCenterHub } from "@/components/resource-center-hub"

export default function ResourceCenterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar basePath="../" />
      <main className="flex-1">
        <ResourceCenterHub />
      </main>
      <Footer />
    </div>
  )
}
