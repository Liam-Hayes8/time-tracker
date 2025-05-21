// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // → turn off ESLint during `next build`
  eslint: {
    ignoreDuringBuilds: true,
  },
  // → allow TS type‑errors to not block the build
  typescript: {
    ignoreBuildErrors: true,
  },
  // your other flags…
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cross-Origin-Opener-Policy',
          value: 'same-origin-allow-popups',
        },
      ],
    },
  ],
};

module.exports = nextConfig;
