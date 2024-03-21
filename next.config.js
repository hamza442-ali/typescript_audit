/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@uniswap/widgets', '@uniswap/conedison'],
  images: {
    unoptimized: false,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      '**.edns.domains',
      'ipfs.io',
    ],
    remotePatterns: [{
      protocol: 'https',
      hostname: '**.coindesk.com',
    }, {
      protocol: 'https',
      hostname: '**storage.googleapis.com'
    },
    {
      protocol: 'https',
      hostname: '**'
    }
    ]
  }
}

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
