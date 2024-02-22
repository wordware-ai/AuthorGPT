/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.mystic.ai",
      },
      {
        protocol: "https",
        hostname: "cdn.wordware.ai",
      },
    ],
  },
};

module.exports = nextConfig;
