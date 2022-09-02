/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
       {
          source: '/info',
          destination: '/about'
       }
    ]
 }
}

module.exports = nextConfig