/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only static-export on production builds
  // `next dev` will skip this so dynamic routes work locally
  ...(process.env.NODE_ENV === "production" && { output: "export" }),

  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

module.exports = nextConfig;