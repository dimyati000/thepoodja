/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,

  // Allow loading images from Unsplash and Marriott cache
  images: {
    // unoptimized: true, // Gg-g-pindah ke sini (berlaku global untuk semua gambar)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cache.marriott.com",
      },
    ],
  },
};

export default nextConfig;