import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '128.199.150.9',
        pathname: '/storage/**',
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
