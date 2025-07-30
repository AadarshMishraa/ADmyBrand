/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // adjust as needed for external image domains
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
