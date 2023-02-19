/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  pageExtensions: ['page.tsx', 'api.ts', 'api.tsx'],

  images: {
    domains: [
      'https://localhost:3333'
    ]
  }
}

module.exports = nextConfig
