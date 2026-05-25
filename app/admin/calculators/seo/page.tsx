import Link from "next/link";
import { requireDashboardAdmin } from "@/lib/admin-dashboard-auth-server";
import {
  getCalculatorSeoListItems,
  getCalculatorAdminCategories,
} from "@/lib/calculator-seo";
import { CalculatorSeoList } from "@/components/admin/calculator-seo-list";
import { ArrowLeft, Search } from "lucide-react";

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

  const onVercel = Boolean(process.env.VERCEL);

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
                Saves go straight into JSON files under{" "}
                <code className="text-xs bg-gray-100 px-1 rounded">
                  app/content/calculator-seo/
                </code>{" "}
                and{" "}
                <code className="text-xs bg-gray-100 px-1 rounded">
                  calculator-ui/
                </code>
                . Run admin on your computer with{" "}
                <code className="text-xs bg-gray-100 px-1 rounded">npm run dev</code>
                , then commit and deploy.
              </p>
            </div>
          </div>
        </div>

        {onVercel ? (
          <div className="mb-6 rounded-xl border-2 border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-950">
            <p className="font-semibold">Use local admin to edit files</p>
            <p className="mt-2 leading-relaxed">
              The live server cannot write to disk. Edit SEO on localhost, then push
              to git so production picks up the JSON files.
            </p>
          </div>
        ) : (
          <p className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
            Saves write directly to project JSON files on this machine.
          </p>
        )}

        <CalculatorSeoList items={items} categories={categories} />
      </div>
    </div>
  );
}
