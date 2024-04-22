const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@cms/packages/ui',
    '@cms/packages/tiglee-components',
    '@cms/packages/tiglee-engine',
  ],
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@admin': path.join(__dirname, 'src'),
    };
    return config;
  },
};

module.exports = nextConfig;
