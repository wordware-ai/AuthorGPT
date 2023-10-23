/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.mystic.ai",
      },
    ],
  },
};

module.exports = nextConfig;
