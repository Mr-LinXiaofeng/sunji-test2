"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

const scenarios = [
  { id: 1, name: "解决方案1" },
  { id: 2, name: "解决方案2" },
  { id: 3, name: "解决方案3" },
]

// 判断当前是否以本地文件方式打开（双击 index.html）
function useIsFileProtocol() {
  const [isFile, setIsFile] = useState(false)
  useEffect(() => {
    setIsFile(window.location.protocol === "file:")
  }, [])
  return isFile
}

export function ScenarioSection() {
  const isFile = useIsFileProtocol()
  // 本地文件方式打开时用相对 .html 路径，http 环境（预览/部署）用干净路由
  const getHref = (id: number) => (isFile ? `./solution/${id}/index.html` : `/solution/${id}`)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">商捷场景解决方案</h2>
          <p className="mt-2 text-muted-foreground text-sm sm:text-lg">
            选择您感兴趣的业务场景，点击查看
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:gap-6 md:grid-cols-3">
          {scenarios.map((scenario) => (
            <a key={scenario.id} href={getHref(scenario.id)}>
              <Card 
                className="h-full transition-all duration-300 hover:shadow-xl hover:border-[#0ab2bd] hover:bg-[#0ab2bd]/5 cursor-pointer border-2"
              >
                <CardContent className="flex items-center justify-center min-h-16 py-4 sm:min-h-32">
                  <span className="text-base sm:text-xl font-semibold text-foreground">
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
