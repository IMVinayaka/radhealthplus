/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const repoName = 'radhealth';
const basePath = isProd ? `/${repoName}` : '';

const nextConfig = {
  // Only enable output: 'export' in production
  ...(isProd ? { output: 'export' } : {}),
  ...(isProd ? { basePath } : {}),
  ...(isProd ? { assetPrefix: `${basePath}/` } : {}),
  reactStrictMode: true,
  images: {
    unoptimized: isProd, // Only unoptimize in production
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 't3.ftcdn.net',
      },
      {
        protocol: 'https',
        hostname: 't4.ftcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'admin.radiants.com',
      },
      {
        protocol: 'https',
        hostname: 'radhealthplus.com',
      },
    ],
  },
  trailingSlash: true,
  distDir: 'out',
  optimizeFonts: false,
  experimental: {
    // Disable optimizeCss as it's causing issues
    // optimizeCss: true,
  },
};

// Only add headers in development
if (!isProd) {
  nextConfig.headers = async () => {
    return [
      {
        source: '/:all*(woff|woff2|eot|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  };
}

module.exports = nextConfig;