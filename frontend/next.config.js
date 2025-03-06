/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'api-gateway'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_API_BASE_URL
          ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`
          : 'http://localhost:8000/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
