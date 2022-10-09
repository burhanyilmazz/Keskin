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
  /*  async rewrites() {
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
         {
            source: '/tr/urunler/:slug*',
            destination: '/tr/products/:slug*'
         },
         {
            source: '/tr/marka/:slug*',
            destination: '/tr/brands/:slug*'
         },
         {
            source: '/tr/urun-detay/:slug*',
            destination: '/tr/product-detail/:slug*'
         },
         {
            source: '/tr/blog-detay/:slug*',
            destination: '/tr/blog-detail/:slug*'
         },
      ]
   } */
}

module.exports = nextConfig