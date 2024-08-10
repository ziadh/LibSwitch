import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["react-daisyui"],
  reactStrictMode: true,
  env: {
    NEXT_OPENAI_API_KEY: process.env.NEXT_OPENAI_API_KEY,
  },
  images: {
    domains: ["api.producthunt.com"],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

const pwaConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

export default pwaConfig(nextConfig);
