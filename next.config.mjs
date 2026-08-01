import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isDev = process.env.NODE_ENV !== 'production';

// Auth tokens are stored in localStorage (see lib/auth.ts), not an HttpOnly
// cookie, so they're readable by any script that runs on the page. A strict
// CSP is the primary compensating control: it stops third-party/injected
// scripts from ever running in the first place, which is what would
// otherwise be needed to read localStorage. See Security Documentation
// Section 3.3/9.1 for the full writeup of this tradeoff.
const apiOrigin = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').origin;
  } catch {
    return 'http://localhost:8000';
  }
})();

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'", // Radix/shadcn components set inline styles
  `script-src 'self'${isDev ? " 'unsafe-eval' 'unsafe-inline'" : ''}`, // dev needs eval for Fast Refresh
  `connect-src 'self' ${apiOrigin}`,
].join('; ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Fix turbopack root directory warning
  turbopack: {
    root: __dirname,
  },
  // Hide the Next.js dev indicator (N logo) in bottom-left during development
  devIndicators: false,
  
  // Production optimizations
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: contentSecurityPolicy
          }
        ]
      }
    ]
  }
}

export default nextConfig
