import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'portal.motionview.com.bd',
        pathname: '/storage/**',
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
