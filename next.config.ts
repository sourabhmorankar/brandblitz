/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
    domains: ['firebasestorage.googleapis.com', 'localhost'],
  },
  // Enable SPA-like behavior for static export
  trailingSlash: true,
};

export default nextConfig;