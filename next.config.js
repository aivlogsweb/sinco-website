/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for universal deployment compatibility
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  images: {
    unoptimized: true
  },
  // Remove asset prefix and base path - deploy to root domain
  // assetPrefix: '',
  // basePath: '',
  // Remove experimental CSS optimization to prevent deployment errors
  // experimental: {
  //   optimizeCss: true,
  // },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Remove rewrites for static export
  // Static export doesn't support rewrites
}

module.exports = nextConfig