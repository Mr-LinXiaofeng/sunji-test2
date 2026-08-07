// 构建后处理：为"离线双击版"做资源修补。
// 静态导出后，每个嵌套页面（solution/x、resource-center）目录下的 HTML
// 使用相对路径 ./_next 引用资源，但这些资源实际只存在于 out/_next。
// 因此这里把顶层 _next 复制到每个含 index.html 的子目录，保证 file:// 双击打开时样式正常。

import { promises as fs } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, "..", "out")
const sourceNext = path.join(outDir, "_next")

async function exists(p) {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}

// 递归查找所有包含 index.html 的子目录（排除 out 根目录本身）
async function findHtmlDirs(dir, results = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name === "_next") continue
      const full = path.join(dir, entry.name)
      if (await exists(path.join(full, "index.html"))) {
        results.push(full)
      }
      await findHtmlDirs(full, results)
    }
  }
  return results
}

async function main() {
  if (!(await exists(sourceNext))) {
    console.error("[post-build] 未找到 out/_next，跳过资源复制。")
    return
  }

  const dirs = await findHtmlDirs(outDir)
  for (const dir of dirs) {
    const target = path.join(dir, "_next")
    await fs.cp(sourceNext, target, { recursive: true })
    console.log(`[post-build] 已复制 _next 到 ${path.relative(outDir, dir)}/`)
  }

  console.log(`[post-build] 完成，共处理 ${dirs.length} 个子页面目录。`)
}

main().catch((err) => {
  console.error("[post-build] 出错：", err)
  process.exit(1)
})
