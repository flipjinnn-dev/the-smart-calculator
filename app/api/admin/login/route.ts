import { NextResponse } from "next/server";
import {
  verifyAdminDashboardCredentials,
  ADMIN_DASHBOARD_COOKIE,
  ADMIN_DASHBOARD_SESSION_VALUE,
  adminDashboardCookieOptions,
} from "@/lib/admin-dashboard-auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = String(body.username ?? "").trim();
    const password = String(body.password ?? "");

    if (!verifyAdminDashboardCredentials(username, password)) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(
      ADMIN_DASHBOARD_COOKIE,
      ADMIN_DASHBOARD_SESSION_VALUE,
      adminDashboardCookieOptions
    );
    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
