export type ResourceCategory = "brochure" | "implementation" | "semi" | "full"

export const resourceCenterTabs: { key: ResourceCategory; label: string }[] = [
  { key: "brochure", label: "产品彩页" },
  { key: "implementation", label: "设备实施" },
  { key: "semi", label: "半自助" },
  { key: "full", label: "全自助（二次开发）" },
]

// location 表示当前页面所处位置：
// "hub"：/resource-center/ 首页（导航入口）
// "sub"：/resource-center/xxx/ 子页面
export function getCategoryHref(category: ResourceCategory, isFile: boolean, location: "hub" | "sub"): string {
  if (isFile) {
    return location === "hub" ? `${category}/index.html` : `../${category}/index.html`
  }
  return `/resource-center/${category}`
}

export function getHubHref(isFile: boolean, location: "hub" | "sub"): string {
  if (isFile) {
    return location === "hub" ? "index.html" : "../index.html"
  }
  return "/resource-center"
}
