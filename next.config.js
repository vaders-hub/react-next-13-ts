/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  // distDir: 'dist',
  skipTrailingSlashRedirect: true,
  productionBrowserSourceMaps: false,
  reactStrictMode: false,
  images: {
    loader: 'custom',
    loaderFile: './src/util/image-loader.ts',
    path: '/',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.roastandbrew.coffee',
        port: '',
        pathname: '/storage/**',
      },
    ],
  },
  devIndicators: {
    buildActivityPosition: 'bottom-right',
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
