/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@cms/packages/ui', '@cms/packages/templates'],
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
