import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Fix turbopack root directory warning
  turbopack: {
    root: __dirname,
  },
  // Hide the Next.js dev indicator (N logo) in bottom-left during development
  devIndicators: false,
}

export default nextConfig
