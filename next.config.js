/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  logging: {
    fetches: {
      fullUrl: true
    }
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
