/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  // Allow loading images from external URLs
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "cache.marriott.com",
      },
    ],
  },
};

export default nextConfig;