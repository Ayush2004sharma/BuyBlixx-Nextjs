/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["fakestoreapi.com"], // ✅ Allow external images
  },
  eslint :{
  ignoreDuringBuilds:true,
  },
};

export default nextConfig;
