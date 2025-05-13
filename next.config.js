/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
    domains: ['*'],
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
}

module.exports = nextConfig 