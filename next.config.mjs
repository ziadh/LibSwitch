import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["react-daisyui"],
  reactStrictMode: true,
  env: {
    NEXT_OPENAI_API_KEY: process.env.NEXT_OPENAI_API_KEY,
  },
};

const pwaConfig = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

export default pwaConfig(nextConfig);