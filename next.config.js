/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   swcMinify: true,
   experimental: {
      images: {
         unoptimized: true,
      },
      styledComponents: true
   },
   async rewrites() {
      return [
         {
            source: '/tr/hakkimizda',
            destination: '/tr/about'
         },
         {
            source: '/en/about',
            destination: '/en/about'
         },
         {
            source: '/tr/kariyer',
            destination: '/tr/career'
         },
         {
            source: '/en/career',
            destination: '/en/career'
         }
      ]
   }
}

module.exports = nextConfig