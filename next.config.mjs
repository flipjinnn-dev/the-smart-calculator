/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        // non-WWW to WWW
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'thesmartcalculator.com',
          },
        ],
        destination: 'https://www.thesmartcalculator.com/:path*',
        permanent: true,
      },
      {
        // force https (optional, but recommended)
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://www.thesmartcalculator.com/:path*',
        permanent: true,
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  transpilePackages: ['next-sanity'],
}

export default nextConfig
