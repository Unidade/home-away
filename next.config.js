/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'images.unsplash.com',
      'izkohedcagagpmxongyf.supabase.in',
      'lh3.googleusercontent.com',
    ],
    minimumCacheTTL: 60 * 60 * 24,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}
module.exports = nextConfig
