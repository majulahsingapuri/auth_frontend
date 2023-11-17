/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flowbite.com",
        port: "",
        pathname: "/docs/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
