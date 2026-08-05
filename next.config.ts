import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // Only needed in dev — safe to keep
  allowedDevOrigins: ['*.ngrok-free.dev', '*.ngrok-free.app', 'localhost:3000', 'localhost:3001'],

  // Turbopack for dev speed
  turbopack: {},

  // Required for file-based image tracing on Vercel/Node
  outputFileTracingRoot: path.resolve(__dirname),

  // Image optimization
  images: {
    qualities: [100, 75],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.prismic.io',
      },
      {
        protocol: 'https',
        hostname: '**.googleapis.com',
      },
    ],
  },

  // Production security & caching headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Cache public images for 30 days
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' },
        ],
      },
    ];
  },

  // Compress output
  compress: true,

  // Enable strict mode for React best practices
  reactStrictMode: true,

  // Reduce bundle size — exclude source maps in production
  productionBrowserSourceMaps: false,

  // Trailing slash config (consistent URLs)
  trailingSlash: false,
};

export default nextConfig;

