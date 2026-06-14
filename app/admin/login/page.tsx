import { Suspense } from "react";
import { redirect } from "next/navigation";
import { isDashboardAdminAuthenticated } from "@/lib/admin-dashboard-auth-server";
import { AdminLoginForm } from "@/components/admin/admin-login-form";

export const metadata = {  
  title: "Admin Login",
  robots: { index: false, follow: false },
};

type PageProps = { 
  searchParams: Promise<{ from?: string }>;
};

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const from = params.from || "/admin/dashboard";

  if (await isDashboardAdminAuthenticated()) {
    redirect(from.startsWith("/admin") ? from : "/admin/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 p-4">
      <Suspense fallback={<div className="text-gray-500">Loading…</div>}>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}  
