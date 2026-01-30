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
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
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
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  transpilePackages: ['next-sanity'],
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'react-icons', '@radix-ui/react-accordion', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  devIndicators: {
    buildActivityPosition: 'bottom-right',
  },
  productionBrowserSourceMaps: false,
}

export default nextConfig
