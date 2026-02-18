import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '', // Support for custom domain or subpath if needed, but usually empty for user.github.io
  /* config options here */
};

export default nextConfig;
