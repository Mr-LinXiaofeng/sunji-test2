import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DeviceDetail } from "@/components/device-detail"
import { getProductBySlug, products } from "@/lib/products"
import { notFound } from "next/navigation"

interface DevicePageProps {
  params: Promise<{ id: string }>
}

export default async function DevicePage({ params }: DevicePageProps) {
  const { id } = await params
  const device = getProductBySlug(id)

  if (!device) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar basePath="../../../" />
      <main className="flex-1">
        <DeviceDetail device={device} basePath="../../../" />
      </main>
      <Footer />
    </div>
  )
}

export function generateStaticParams() {
  return products.map((p) => ({ id: p.slug }))
}
