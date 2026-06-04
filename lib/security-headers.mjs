/**
 * Response security headers for all HTML/API routes.
 * CSP allows known third parties (AdSense, GA, Clarity, Vercel, Sanity CDN, etc.).
 * After editing, run: node scripts/sync-vercel-headers.mjs
 */
const CSP_DIRECTIVES = [
  "default-src 'self'",
  [
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "https://pagead2.googlesyndication.com",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://scripts.scriptwrapper.com",
    "https://www.clarity.ms",
    "https://images.dmca.com",
    "https://va.vercel-scripts.com",
    "https://vercel.live",
    "https://googleads.g.doubleclick.net",
    "https://www.googletagservices.com",
    "https://partner.googleadservices.com",
    "https://www.gstatic.com",
    "https://ep1.adtrafficquality.google",
    "https://ep2.adtrafficquality.google",
  ].join(" "),
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https: wss:",
  [
    "frame-src 'self'",
    "https://googleads.g.doubleclick.net",
    "https://tpc.googlesyndication.com",
    "https://www.google.com",
    "https://www.youtube.com",
  ].join(" "),
  "media-src 'self' https: blob:",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
];

export const REFERRER_POLICY = "strict-origin-when-cross-origin";

export const SECURITY_HEADERS = [
  {
    key: "Content-Security-Policy",
    value: CSP_DIRECTIVES.join("; "),
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: REFERRER_POLICY,
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

/** Attach security headers to any Next.js middleware/route response. */
export function applySecurityHeaders(response) {
  for (const { key, value } of SECURITY_HEADERS) {
    response.headers.set(key, value);
  }
  return response;
}
