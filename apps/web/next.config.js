/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui.shadcn.com',
        pathname: '/avatars/**',
      },
    ],
  },
};

export default nextConfig;
