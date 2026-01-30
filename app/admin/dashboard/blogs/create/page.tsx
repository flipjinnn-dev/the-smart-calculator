import { requireAdmin } from '@/lib/auth-utils';
import { getAllAuthors, getAllCategories } from '@/lib/actions/blog-actions';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BlogForm } from '@/components/admin/blog-form';

export const metadata = {
  title: 'Create Blog Post - Admin Dashboard',
  description: 'Create a new blog post',
};

export default async function CreateBlogPage() {
  await requireAdmin();

  const [authors, categories] = await Promise.all([
    getAllAuthors(),
    getAllCategories(),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </Button>
          
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-gray-200 shadow-xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Blog Post</h1>
            <p className="text-gray-600">Fill in the details below to create a new blog post</p>
          </div>
        </div>

        <BlogForm authors={authors} categories={categories} />
      </div>
    </div>
  );
}
