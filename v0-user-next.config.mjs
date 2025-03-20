/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure compatibility with Node.js 20
  experimental: {
    serverActions: true,
  },
  // Add public directory configuration to serve JSON files
  publicRuntimeConfig: {
    staticFolder: '/dogs',
  },
};

export default nextConfig;

