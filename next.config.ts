/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Or specify your exact domain
      },
      {
        protocol: "http",
        hostname: "**", // Or specify your exact domain
      },
    ],
  },
};

module.exports = nextConfig;
