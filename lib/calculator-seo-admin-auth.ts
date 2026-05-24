import { isDashboardAdminAuthenticated } from "@/lib/admin-dashboard-auth-server";

export async function getAdminSession() {
  if (await isDashboardAdminAuthenticated()) {
    return {
      user: { name: "admin", role: "admin" as const },
    };
  }
  return null;
}
