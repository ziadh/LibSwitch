/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["react-daisyui"],
  reactStrictMode: true,
  env: {
    NEXT_OPENAI_API_KEY: process.env.NEXT_OPENAI_API_KEY,
  },
};

export default nextConfig;
