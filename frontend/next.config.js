/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [
      'https://localhost:3333'
    ]
  }
}

module.exports = nextConfig
