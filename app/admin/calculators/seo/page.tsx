import Link from "next/link";
import { requireDashboardAdmin } from "@/lib/admin-dashboard-auth-server";
import {
  getCalculatorSeoListItems,
  getCalculatorAdminCategories,
} from "@/lib/calculator-seo";
import { CalculatorSeoList } from "@/components/admin/calculator-seo-list";
import { ArrowLeft, Search } from "lucide-react";
import {
  blobStorageEnabled,
  isLocalDev,
} from "@/lib/calculator-seo-storage";

export const metadata = {
  title: "Calculator SEO Admin",
  robots: { index: false, follow: false },
};

export default async function CalculatorSeoAdminPage() {
  await requireDashboardAdmin();

  const [items, categories] = await Promise.all([
    getCalculatorSeoListItems(),
    Promise.resolve(getCalculatorAdminCategories()),
  ]);

  const local = isLocalDev();
  const blob = blobStorageEnabled();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden />
          Admin dashboard
        </Link>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border-2 border-gray-200 shadow-xl p-6 sm:p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-purple-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg shrink-0">
              <Search className="w-7 h-7 text-white" aria-hidden />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Calculator SEO
              </h1>
              <p className="text-gray-600 mt-2 text-sm sm:text-base max-w-2xl leading-relaxed">
                {local
                  ? "Saves write directly to app/content/ JSON files on your computer."
                  : "Live saves use Vercel Blob (same text JSON as local files)."}
              </p>
            </div>
          </div>
        </div>

        {local ? (
          <p className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
            Local mode: files update in the project folder.
          </p>
        ) : blob ? (
          <p className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
            Live save enabled (Vercel Blob connected).
          </p>
        ) : (
          <div className="mb-6 rounded-xl border-2 border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-950">
            <p className="font-semibold">Connect Vercel Blob for live Save</p>
            <ol className="mt-2 list-decimal pl-5 space-y-1 leading-relaxed">
              <li>Vercel → Project → Storage → Create → Blob</li>
              <li>Connect store to this project</li>
              <li>Redeploy (adds BLOB_READ_WRITE_TOKEN automatically)</li>
            </ol>
          </div>
        )}

        <CalculatorSeoList items={items} categories={categories} />
      </div>
    </div>
  );
}
