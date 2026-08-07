import { Card, CardContent } from "@/components/ui/card"

const scenarios = [
  { id: 1, name: "解决方案1", href: "./solution/1/index.html" },
  { id: 2, name: "解决方案2", href: "./solution/2/index.html" },
  { id: 3, name: "解决方案3", href: "./solution/3/index.html" },
]

export function ScenarioSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">商捷场景解决方案</h2>
          <p className="mt-2 text-muted-foreground text-lg">
            选择您感兴趣的业务场景，点击查看
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {scenarios.map((scenario) => (
            <a key={scenario.id} href={scenario.href}>
              <Card 
                className="h-full transition-all duration-300 hover:shadow-xl hover:border-[#0ab2bd] hover:bg-[#0ab2bd]/5 cursor-pointer border-2"
              >
                <CardContent className="flex items-center justify-center min-h-32">
                  <span className="text-xl font-semibold text-foreground">
                    {scenario.name}
                  </span>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
