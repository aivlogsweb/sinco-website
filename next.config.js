/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/sinco-website' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/sinco-website' : '',
  // experimental: {
  //   optimizeCss: true,
  // },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig