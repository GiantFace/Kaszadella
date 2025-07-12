/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hostinger optimalizációk
  output: 'standalone', // Optimalizált build
  compress: true,       // Gzip tömörítés
  poweredByHeader: false,
  
  // Képoptimalizálás
  images: {
    domains: ['yourdomain.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Cache headers
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' }
        ],
      },
    ];
  },
};

module.exports = nextConfig;
