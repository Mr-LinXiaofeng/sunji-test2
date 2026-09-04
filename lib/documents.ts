import type { FileType } from "@/components/document-icons"

export type DocCategory = "implementation" | "semi" | "full"

export interface DocItem {
  id: string
  type: FileType
  name: string
  description: string
  size: string
  fileName: string
  downloadName: string
  category: DocCategory
}

export const categoryLabels: Record<DocCategory, string> = {
  implementation: "设备实施",
  semi: "半自助",
  full: "全自助（二次开发）",
}

export const documents: DocItem[] = [
  {
    id: "excel",
    type: "excel",
    name: "xx省-xx市-x台-20xx年xx月xx日",
    description: "设备在进行激活绑定前需要填写的表格，填写并修改文件名后提交给销售处理",
    size: "11.3 KB",
    fileName: "jianjian-form.xlsx",
    downloadName: "xx省-xx市-x台-20xx年xx月xx日.xlsx",
    category: "implementation",
  },
  {
    id: "driver",
    type: "zip",
    name: "电脑驱动",
    description: "下载后在电脑上安装，需根据不同数据线安装不同的驱动，详细见“驱动安装说明”",
    size: "13.9 MB",
    fileName: "driver.zip",
    downloadName: "电脑驱动.zip",
    category: "semi",
  },
  {
    id: "dll-test-tool",
    type: "zip",
    name: "动态库测试工具",
    description: "下载后用电脑测试是否能唤起设备刷脸，能唤起设备刷脸说明连接成功",
    size: "8.3 MB",
    fileName: "dll-test-tool.zip",
    downloadName: "动态库测试工具.zip",
    category: "semi",
  },
  {
    id: "dll-32",
    type: "zip",
    name: "动态库-32位",
    description: "用于替换医院现有HIS系统（32位）中的动态库文件，动态库版本1.1.9",
    size: "32.9 MB",
    fileName: "dll-32.zip",
    downloadName: "动态库-32位.zip",
    category: "semi",
  },
  {
    id: "dll-64",
    type: "zip",
    name: "动态库-64位",
    description: "用于替换医院现有HIS系统（64位）中的动态库文件，动态库版本1.1.9",
    size: "10.1 MB",
    fileName: "dll-64.zip",
    downloadName: "动态库-64位.zip",
    category: "semi",
  },
  {
    id: "dll-runtime",
    type: "zip",
    name: "动态库运行环境（可选）",
    description: "VC环境和串口驱动选装",
    size: "17.4 MB",
    fileName: "dll-runtime.zip",
    downloadName: "动态库运行环境（可选）.zip",
    category: "semi",
  },
  {
    id: "his-dll-doc",
    type: "zip",
    name: "HIS改造和动态库相关文档",
    description: "正式环境下的HIS调用，标准化HIS改造和动态库部署文档",
    size: "2.7 MB",
    fileName: "his-dll-doc.zip",
    downloadName: "HIS改造和动态库相关文档.zip",
    category: "semi",
  },
  {
    id: "terminal3-api",
    type: "pdf",
    name: "终端3.0标准化接口文档_20250403",
    description: "以H5方式接入主应用的SDK标准化接口文档，提供刷脸激活电子凭证等基础功能",
    size: "2.2 MB",
    fileName: "terminal3-api.pdf",
    downloadName: "终端3.0标准化接口文档_20250403.pdf",
    category: "full",
  },
  {
    id: "alipay-iot-manual",
    type: "pdf",
    name: "支付宝医疗IOT开放平台操作手册",
    description: "服务商（ISV）注册、项目备案、H5链接挂载的标准操作教程",
    size: "6.0 MB",
    fileName: "alipay-iot-manual.pdf",
    downloadName: "支付宝医疗IOT开放平台操作手册.pdf",
    category: "full",
  },
  {
    id: "h5-demo",
    type: "zip",
    name: "二开H5示例",
    description: "二开H5示例代码包，其中init方法中的ISV信息需要替换为已注册的ISV信息",
    size: "276.5 KB",
    fileName: "h5-demo.zip",
    downloadName: "二开H5示例.zip",
    category: "full",
  },
  {
    id: "menu-mount-template",
    type: "excel",
    name: "二开菜单申请挂载模板",
    description: "挂载H5链接需要下载该表格并填写信息，最后提交到支付宝开放平台",
    size: "10.6 KB",
    fileName: "menu-mount-template.xlsx",
    downloadName: "二开菜单申请挂载模板.xlsx",
    category: "full",
  },
]
