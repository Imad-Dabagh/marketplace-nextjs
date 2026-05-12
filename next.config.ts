import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   // add images domain for cloudinary
//   images: {
//     domains: ["res.cloudinary.com", "images.unsplash.com"],
//   },
// };

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default nextConfig;
