/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  // distDir: 'dist',

  skipTrailingSlashRedirect: true,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: {
      ssr: true,
      displayName: true,
    },
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    loader: 'custom',
    loaderFile: './src/util/image-loader.ts',
    unoptimized: true,
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
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
    ];
  },
  devIndicators: {
    buildActivityPosition: 'bottom-right',
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    /*
    if (process.env.NEXT_OUTPUT_MODE !== 'export' || !config.module) {
      return config;
    }
    */
    /*
    config.module.rules?.push({
      test: /src\/app\/news/,
      loader: 'ignore-loader',
    });
    */

    // config.module.rules.push({
    //   test: [/\.(js|jsx|ts|tsx)$/],
    //   exclude: [path.resolve(__dirname, 'src/app/news')],
    // });
    return config;
  },
};

module.exports = nextConfig;
