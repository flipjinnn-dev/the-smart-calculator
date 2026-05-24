import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_DASHBOARD_COOKIE,
  ADMIN_DASHBOARD_SESSION_VALUE,
} from "@/lib/admin-dashboard-auth";

export async function isDashboardAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return (
    cookieStore.get(ADMIN_DASHBOARD_COOKIE)?.value ===
    ADMIN_DASHBOARD_SESSION_VALUE
  );
}

export async function requireDashboardAdmin(): Promise<void> {
  if (!(await isDashboardAdminAuthenticated())) {
    redirect("/admin/login");
  }
}
