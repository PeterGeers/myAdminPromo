import type { NextConfig } from "next";
import path from "path";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Required for AWS Amplify WEB_COMPUTE (SSR) deployment
  output: "standalone",

  // Explicitly set workspace root to frontend dir to avoid monorepo lockfile confusion
  outputFileTracingRoot: path.join(__dirname),

  // Image optimization — use default loader, Amplify handles CDN caching
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default withNextIntl(nextConfig);
