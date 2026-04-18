/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Add localhost for development
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000", // Your backend server port
        pathname: "/uploads/**", // Allow all images from uploads folder
      },
      // Your existing patterns
      {
        protocol: "https",
        hostname: "images.pexels.com"
      },
      {
        protocol: "https",
        hostname: "picsum.photos"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ]
  }
};

export default nextConfig;