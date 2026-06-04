import { requireDashboardAdmin } from "@/lib/admin-dashboard-auth-server";
import { getAllBlogs } from "@/lib/actions/blog-actions";
import { BlogManagementTable } from "@/components/admin/blog-management-table";
import { normalizeBlogs, type BlogListItem } from "@/lib/admin-blog-types";
import { isSanityConfigured } from "@/lib/sanity/config";
import { Shield, Settings, FileText, Plus, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin tools for The Smart Calculator",
  robots: { index: false, follow: false },
};

export default async function AdminDashboard() {
  await requireDashboardAdmin();

  let blogs: BlogListItem[] = [];
  if (isSanityConfigured) {
    try {
      blogs = normalizeBlogs(await getAllBlogs());
    } catch (e) {
      console.error("Failed to load blogs for admin dashboard:", e);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl space-y-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-gray-200 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -z-10" />

          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 text-base mt-1">
                Manage calculator SEO, blog posts, and site content
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/admin/calculators/seo"
            className="group flex items-start gap-4 rounded-2xl border-2 border-gray-200 bg-white/80 p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md"
          >
            <div className="rounded-xl bg-blue-100 p-3 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Calculator SEO</h2>
              <p className="mt-1 text-sm text-gray-600">
                Edit meta title, description, and on-page content for all calculators.
              </p>
            </div>
          </Link>

          <Link
            href="/admin/dashboard/blogs/create"
            className="group flex items-start gap-4 rounded-2xl border-2 border-gray-200 bg-white/80 p-6 shadow-sm transition hover:border-purple-300 hover:shadow-md"
          >
            <div className="rounded-xl bg-purple-100 p-3 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Create Blog Post</h2>
              <p className="mt-1 text-sm text-gray-600">
                Write and publish a new blog post to the site.
              </p>
            </div>
          </Link>
        </div>

        {!isSanityConfigured && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Blog posts need Sanity CMS. Add{" "}
            <code className="rounded bg-amber-100 px-1">NEXT_PUBLIC_SANITY_PROJECT_ID</code>,{" "}
            <code className="rounded bg-amber-100 px-1">NEXT_PUBLIC_SANITY_DATASET</code>, and{" "}
            <code className="rounded bg-amber-100 px-1">SANITY_API_TOKEN</code> to your{" "}
            <code className="rounded bg-amber-100 px-1">.env.local</code> file, then restart the dev server.
          </div>
        )}

        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/studio" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Sanity Studio
                </Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Link href="/admin/dashboard/blogs/create">
                  <Plus className="w-4 h-4 mr-2" />
                  New Blog Post
                </Link>
              </Button>
            </div>
          </div>

          <BlogManagementTable blogs={blogs} />
        </div>
      </div>
    </div>
  );
}
