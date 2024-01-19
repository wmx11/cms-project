const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@cms/ui',
    // You would update this to @cms/templates similar to @cms/ui
    // once it is turned into a proper workspace.
    '@cms/packages/templates',
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
