/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   swcMinify: true,
   experimental: {
      images: {
         unoptimized: true,
      },
   },
   experimental: {
      styledComponents: true
    }
}

module.exports = nextConfig