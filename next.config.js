/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  publicRuntimeConfig: {
    NEXT_PUBLIC_STRIPE_API_KEY: process.env.NEXT_PUBLIC_STRIPE_API_KEY,
  },
};

module.exports = nextConfig;
