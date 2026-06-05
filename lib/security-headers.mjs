/**
 * Response security headers for all HTML/API routes.
 * CSP allows known third parties (AdSense, GA, Clarity, Vercel, Sanity CDN, etc.).
 *
 * IMPORTANT: Do NOT attach CSP via vercel.json or middleware. A global CSP breaks
 * Vercel's "Security Checkpoint" challenge page (infinite "We're verifying your browser").
 * CSP is applied only through next.config.mjs for app routes.
 *
 * After editing edge headers, run: node scripts/sync-vercel-headers.mjs
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
    "https://vercel.com",
    "https://*.vercel.com",
    "https://googleads.g.doubleclick.net",
    "https://www.googletagservices.com",
    "https://partner.googleadservices.com",
    "https://www.googleadservices.com",
    "https://adservice.google.com",
    "https://static.doubleclick.net",
    "https://securepubads.g.doubleclick.net",
    "https://fundingchoicesmessages.google.com",
    "https://*.googlesyndication.com",
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
    "https://*.googlesyndication.com",
    "https://securepubads.g.doubleclick.net",
    "https://fundingchoicesmessages.google.com",
    "https://www.google.com",
    "https://www.youtube.com",
    "https://vercel.com",
    "https://*.vercel.com",
  ].join(" "),
  "media-src 'self' https: blob:",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://vercel.com https://*.vercel.com",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
];

export const REFERRER_POLICY = "strict-origin-when-cross-origin";

/** Safe on every response — used in vercel.json and middleware (no CSP). */
export const EDGE_SECURITY_HEADERS = [
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

/** Full set including CSP — use in next.config.mjs only. */
export const SECURITY_HEADERS = [
  {
    key: "Content-Security-Policy",
    value: CSP_DIRECTIVES.join("; "),
  },
  ...EDGE_SECURITY_HEADERS,
];

/** Attach edge-safe headers (no CSP) to middleware/route responses. */
export function applySecurityHeaders(response) {
  for (const { key, value } of EDGE_SECURITY_HEADERS) {
    response.headers.set(key, value);
  }
  return response;
}
