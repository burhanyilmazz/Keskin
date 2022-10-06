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
            source: '/tr/kariyer',
            destination: '/tr/career'
         },
         {
            source: '/tr/iletisim',
            destination: '/tr/contact'
         },
         {
            source: '/tr/bayilikler',
            destination: '/tr/dealership'
         },
         {
            source: '/tr/ihracat',
            destination: '/tr/export'
         },
      ]
   }
}

module.exports = nextConfig