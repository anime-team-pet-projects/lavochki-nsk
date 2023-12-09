const { join } = require('path')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone',
  experimental: {
    forceSwcTransforms: true,
  },
  sassOptions: {
    includePaths: [join(__dirname, '@/styles')],
    prependData: `
            @use "@/styles/additionals/variables/index.scss" as *;
            @use "@/styles/additionals/mixins/index.scss" as *;
          `,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
      },
      {
        hostname: 'gas-kvas.com',
      },
    ],
  },
  env: {
    BOT_USERNAME: process.env.BOT_USERNAME,
    BASE_URL: process.env.BASE_URL,
    YANDEX_KEY: process.env.YANDEX_KEY,
    BOT_ID: process.env.BOT_ID,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      loader: 'svg-sprite-loader',
    })

    config.plugins.push(new SpriteLoaderPlugin())
    config.resolve.alias['@'] = join(__dirname, 'src')

    return config
  },
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${process.env.BASE_URL}/api/v1/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
