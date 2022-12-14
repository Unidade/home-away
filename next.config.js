/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({})
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'images.unsplash.com',
      'izkohedcagagpmxongyf.supabase.in',
      'lh3.googleusercontent.com',
    ],
  },
}

module.exports = withBundleAnalyzer(nextConfig)
