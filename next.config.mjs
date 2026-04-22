import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Calculator redirects - redirect root-level calculator URLs to category paths
      {
        source: '/crochet-calculator',
        destination: '/other/crochet-calculator',
        permanent: true,
      },
      {
        source: '/era-calculator',
        destination: '/sports/era-calculator',
        permanent: true,
      },
      {
        source: '/extrapolation-calculator',
        destination: '/maths/extrapolation-calculator',
        permanent: true,
      },
      {
        source: '/chaturbate-token-calculator',
        destination: '/other/chaturbate-token-calculator',
        permanent: true,
      },
      {
        source: '/kite-size-calculator',
        destination: '/sports/kite-size-calculator',
        permanent: true,
      },
      {
        source: '/fix-and-flip-calculator',
        destination: '/financial/fix-and-flip-calculator',
        permanent: true,
      },
      {
        source: '/phasor-calculator',
        destination: '/physics/phasor-calculator',
        permanent: true,
      },
      {
        source: '/evony-troop-calculator',
        destination: '/games/evony-troop-calculator',
        permanent: true,
      },
      {
        source: '/peth-test-calculator',
        destination: '/health/peth-test-calculator',
        permanent: true,
      },
      {
        source: '/aquarium-substrate-calculator',
        destination: '/other/aquarium-substrate-calculator',
        permanent: true,
      },
      {
        source: '/garage-conversion-cost-calculator',
        destination: '/construction/garage-conversion-cost-calculator',
        permanent: true,
      },
      {
        source: '/newborn-weight-loss-calculator',
        destination: '/health/newborn-weight-loss-calculator',
        permanent: true,
      },
      {
        source: '/sourdough-calculator',
        destination: '/food/sourdough-calculator',
        permanent: true,
      },
      {
        source: '/lmtd-calculator',
        destination: '/physics/lmtd-calculator',
        permanent: true,
      },
      {
        source: '/combination-sum-calculator',
        destination: '/maths/combination-sum-calculator',
        permanent: true,
      },
      {
        source: '/blox-fruits-wheel',
        destination: '/games/blox-fruits-wheel',
        permanent: true,
      },
      {
        source: '/celebrity-wheel',
        destination: '/games/celebrity-wheel',
        permanent: true,
      },
      {
        source: '/candy-wheel',
        destination: '/games/candy-wheel',
        permanent: true,
      },
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
  transpilePackages: [
    'next-sanity',
    '@tiptap/react',
    '@tiptap/starter-kit',
    '@tiptap/extension-underline',
    '@tiptap/extension-link',
    '@tiptap/extension-image',
    '@tiptap/extension-table',
    '@tiptap/extension-table-row',
    '@tiptap/extension-table-header',
    '@tiptap/extension-table-cell'
  ],
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'lucide-react', 
      'react-icons', 
      '@radix-ui/react-accordion', 
      '@radix-ui/react-dialog', 
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-avatar',
      '@radix-ui/react-select',
      '@radix-ui/react-label',
      'sonner',
      'react-latex-next'
    ],
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
  turbopack: {
    rules: {
      '*.node': {
        loaders: ['ignore-loader'],
      },
    },
    resolveAlias: {
      canvas: './canvas-mock.js',
    },
  },
  webpack: (config, { isServer, webpack }) => {
    // Handle canvas for both server and client
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
    };
    
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        stream: false,
        crypto: false,
      };
    }
    
    // Replace canvas module with mock for both environments
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /^canvas$/,
        resolve(__dirname, './canvas-mock.js')
      )
    );
    
    return config;
  },
}

export default nextConfig
