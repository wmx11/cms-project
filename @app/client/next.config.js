/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@cms/packages/ui',
    '@cms/packages/tiglee-components',
    '@cms/packages/tiglee-engine',
  ],
};

module.exports = nextConfig;
