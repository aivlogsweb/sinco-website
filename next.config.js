/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export for better deployment compatibility
  trailingSlash: false,
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
  // Add better static file handling
  async rewrites() {
    return [
      {
        source: '/videos/:path*',
        destination: '/videos/:path*',
      },
      {
        source: '/images/:path*', 
        destination: '/images/:path*',
      },
    ]
  },
}

module.exports = nextConfig