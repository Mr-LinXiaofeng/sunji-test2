// 仅在打包"离线双击版"时开启静态导出相关配置。
// 普通开发 / v0 预览 / 部署环境不启用，避免相对路径与 trailingSlash 造成的重定向循环和样式丢失。
const isStaticExport = process.env.STATIC_EXPORT === 'true'

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isStaticExport
    ? {
        output: 'export',
        trailingSlash: true,
        basePath: '',
        assetPrefix: './',
      }
    : {}),
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
