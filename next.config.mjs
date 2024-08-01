/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['sprint-fe-project.s3.ap-northeast-2.amazonaws.com'],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
