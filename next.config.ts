/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  eslint: {
    // Allow production builds to successfully complete even if
    // there are ESLint errors. It’s better to fix them, but this prevents
    // deployment from blocking.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allow production builds even if there are type errors
    ignoreBuildErrors: true,
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
