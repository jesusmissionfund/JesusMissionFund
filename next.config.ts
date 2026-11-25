import type { NextConfig } from "next";

const securityHeaders = [
  // No includeSubDomains: other subdomains of the production domain may not serve HTTPS.
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Both, because older browsers only honour X-Frame-Options. A full CSP is left out until the scripts and
  // inline styles the pages use (analytics, framer-motion) have been listed.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

const noIndex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Backs up the noindex metadata in the dashboard and admin layouts; also covers redirects and non-HTML responses.
      { source: "/dashboard/:path*", headers: noIndex },
      { source: "/admin/:path*", headers: noIndex },
    ];
  },
};

export default nextConfig;
