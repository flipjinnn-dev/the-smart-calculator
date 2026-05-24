import { requireDashboardAdmin } from '@/lib/admin-dashboard-auth-server';
import { Shield, Settings } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Admin tools for The Smart Calculator',
  robots: { index: false, follow: false },
};

export default async function AdminDashboard() {
  await requireDashboardAdmin();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-gray-200 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -z-10" />

          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 text-base mt-1">
                Manage all site content and moderate community submissions
              </p>
              <Link
                href="/admin/calculators/seo"
                className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                <Settings className="w-4 h-4" />
                Calculator SEO (all calculators)
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
