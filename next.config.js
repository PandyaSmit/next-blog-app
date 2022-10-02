/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true
  },
  env: {
    MONGO_DB_URL: process.env.MONGO_DB_URL,
  }
}

module.exports = nextConfig
