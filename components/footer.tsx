import { cn } from "@/lib/utils"

function SJIcon({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center bg-[#0ab2bd] text-white font-bold rounded-lg", className)}>
      SJ
    </div>
  )
}

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* 品牌信息 */}
          <div>
            <div className="flex items-center gap-2">
              <SJIcon className="w-8 h-8 text-sm" />
              <h3 className="text-xl font-bold text-[#0ab2bd]">商捷 SUNJI</h3>
            </div>
            <p className="mt-3 text-base text-muted-foreground font-medium">
              专业的医保终端解决方案提供商
            </p>
          </div>

          {/* 产品类型 */}
          <div>
            <h3 className="text-lg font-bold text-foreground">产品类型</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a 
                  href="https://www.yuque.com/jiatao-ae47m/knowledgebase/desktop" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-[#0ab2bd] transition-colors"
                >
                  台式/窗口终端
                </a>
              </li>
              <li>
                <a 
                  href="https://www.yuque.com/jiatao-ae47m/knowledgebase/handheld" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-[#0ab2bd] transition-colors"
                >
                  手持终端
                </a>
              </li>
              <li>
                <a 
                  href="https://www.yuque.com/jiatao-ae47m/knowledgebase/kiosk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-[#0ab2bd] transition-colors"
                >
                  自助终端
                </a>
              </li>
              <li>
                <a 
                  href="https://www.yuque.com/jiatao-ae47m/knowledgebase/integrated" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-[#0ab2bd] transition-colors"
                >
                  嵌入式模组
                </a>
              </li>
            </ul>
          </div>

          {/* 服务与支持 */}
          <div>
            <h3 className="text-lg font-bold text-foreground">服务与支持</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a 
                  href="https://www.sunmi.com/zh-CN/sunmi-care/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-[#0ab2bd] transition-colors"
                >
                  SUNMI Care
                </a>
              </li>
              <li>
                <a 
                  href="https://www.yuque.com/jiatao-ae47m/knowledgebase/epblchfvt9tgsyia" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-[#0ab2bd] transition-colors"
                >
                  设备送修方式
                </a>
              </li>
              <li>
                <a 
                  href="https://www.sunmi.com/zh-CN/warranty-inquiry/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-[#0ab2bd] transition-colors"
                >
                  保修查询
                </a>
              </li>
            </ul>
          </div>

          {/* 友情链接 */}
          <div>
            <h3 className="text-lg font-bold text-foreground">友情链接</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a 
                  href="https://www.sunmi.com/zh-CN/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-[#0ab2bd] transition-colors"
                >
                  商米 SUNMI 官网
                </a>
              </li>
              <li>
                <a 
                  href="https://www.sunmi.com/zh-CN/sunji/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-[#0ab2bd] transition-colors"
                >
                  商捷智慧医疗解决方案
                </a>
              </li>
              <li>
                <a 
                  href="https://qrtool.ewill.cn/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-[#0ab2bd] transition-colors"
                >
                  机构绑定二维码生成与设备二维码识别
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2026 商捷SUNJI. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  )
}
