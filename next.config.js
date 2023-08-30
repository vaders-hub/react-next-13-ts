/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  skipTrailingSlashRedirect: true,
  distDir: 'dist',
  reactStrictMode: false,
  images: {
    loader: 'custom',
    loaderFile: './src/util/image-loader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.roastandbrew.coffee',
        port: '',
        pathname: '/storage/**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
