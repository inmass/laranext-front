/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: process.env.IMAGE_DOMAINS ? process.env.IMAGE_DOMAINS.split(',') : [],
    },
};

export default nextConfig;
