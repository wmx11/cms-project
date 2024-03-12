/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@cms/packages/ui',
    '@cms/packages/templates',
    '@cms/packages/tiglee-engine',
  ],
};

module.exports = nextConfig;
