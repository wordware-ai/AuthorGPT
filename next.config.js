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
        hostname: "cdn.run.wrdwr.xyz",
      },
    ],
  },
};

module.exports = nextConfig;
