import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/play', destination: '/', permanent: true },
      { source: '/studio', destination: '/clubs', permanent: true },
      { source: '/about', destination: '/', permanent: true },
      { source: '/login', destination: 'https://app.backbeatgolf.com/login', permanent: false },
      { source: '/privacy', destination: 'https://app.backbeatgolf.com/privacy', permanent: false },
      { source: '/terms', destination: '/support', permanent: false },
      { source: '/help', destination: '/support', permanent: false },
    ];
  },
};

export default nextConfig;
