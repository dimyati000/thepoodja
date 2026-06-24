/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,

  // Allow loading images from Unsplash
  images: {
    // unoptimized: true, // Gg-g-pindah ke sini (berlaku global untuk semua gambar)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;