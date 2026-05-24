/** Shared constants — safe to import from middleware (no next/headers). */

export const ADMIN_DASHBOARD_USERNAME = "admin";
export const ADMIN_DASHBOARD_PASSWORD = "password123";
export const ADMIN_DASHBOARD_COOKIE = "admin_dashboard_session";

/** sha256(admin:password123:smart-calc-admin-v1) */
export const ADMIN_DASHBOARD_SESSION_VALUE =
  "0aa36138134aed0659f0aa2af5619415dc73e7409a204a228451ea76375b0a5f";

export function verifyAdminDashboardCredentials(
  username: string,
  password: string
): boolean {
  return (
    username === ADMIN_DASHBOARD_USERNAME &&
    password === ADMIN_DASHBOARD_PASSWORD
  );
}

export const adminDashboardCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};
