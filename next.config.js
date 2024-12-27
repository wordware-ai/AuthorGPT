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
      {
        protocol: "https",
        hostname: "uvdxvgggjphy9pqb.public.blob.vercel-storage.com",
      },
    ],
  },
};

module.exports = nextConfig;
