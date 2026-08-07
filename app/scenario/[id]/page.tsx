import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { notFound } from "next/navigation"

interface ScenarioPageProps {
  params: Promise<{ id: string }>
}

const scenarios: Record<string, { name: string; description: string }> = {
  "1": { name: "场景 1", description: "业务场景 1 详情" },
  "2": { name: "场景 2", description: "业务场景 2 详情" },
  "3": { name: "场景 3", description: "业务场景 3 详情" },
}

export default async function ScenarioPage({ params }: ScenarioPageProps) {
  const { id } = await params
  const scenario = scenarios[id]

  if (!scenario) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-foreground text-center mb-4">
            {scenario.name}
          </h1>
          <p className="text-muted-foreground text-center mb-8">
            {scenario.description}
          </p>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-muted-foreground">
              此页面正在建设中，敬请期待更多内容。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }]
}
