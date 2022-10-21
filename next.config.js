/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["dashboard.render.com"]
  }
}

module.exports = nextConfig
