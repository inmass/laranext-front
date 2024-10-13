/** @type {import('next').NextConfig} */
const imageDomains = process.env.IMAGE_DOMAINS
  ? process.env.IMAGE_DOMAINS.split(',')
  : [];
const remotePatterns = imageDomains.map((domain) => {
  return {
    hostname: domain,
  };
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: remotePatterns,
  },
};

export default nextConfig;
