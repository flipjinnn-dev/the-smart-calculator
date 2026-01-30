'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createBlog, updateBlog } from '@/lib/actions/blog-actions';
import { toast } from 'sonner';
import { Loader2, Save } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Author {
  _id: string;
  name: string;
}

interface Category {
  _id: string;
  title: string;
}

interface Blog {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  author?: { _id: string };
  categories?: { _id: string }[];
  publishedAt?: string;
}

interface BlogFormProps {
  blog?: Blog;
  authors: Author[];
  categories: Category[];
}

export function BlogForm({ blog, authors, categories }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: blog?.title || '',
    slug: blog?.slug?.current || '',
    excerpt: blog?.excerpt || '',
    metaTitle: blog?.metaTitle || '',
    metaDescription: blog?.metaDescription || '',
    keywords: blog?.keywords || '',
    authorId: blog?.author?._id || '',
    categoryIds: blog?.categories?.map((c) => c._id) || [],
    publishedAt: blog?.publishedAt ? new Date(blog.publishedAt).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      title: formData.title,
      slug: { current: formData.slug, _type: 'slug' },
      excerpt: formData.excerpt,
      metaTitle: formData.metaTitle,
      metaDescription: formData.metaDescription,
      keywords: formData.keywords,
      author: { _type: 'reference', _ref: formData.authorId },
      categories: formData.categoryIds.map((id) => ({ _type: 'reference', _ref: id })),
      publishedAt: new Date(formData.publishedAt).toISOString(),
    };

    const result = blog
      ? await updateBlog(blog._id, data)
      : await createBlog(data);

    if (result.success) {
      toast.success(blog ? 'Blog updated successfully!' : 'Blog created successfully!');
      router.push('/admin/dashboard');
      router.refresh();
    } else {
      toast.error(result.error || 'Something went wrong');
    }
    setLoading(false);
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    setFormData({ ...formData, slug });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-2 border-gray-200 shadow-xl bg-white">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900">Blog Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
              Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              onBlur={generateSlug}
              required
              placeholder="Enter blog title"
              className="border-2 border-gray-300 focus:border-blue-500"
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug" className="text-sm font-semibold text-gray-700">
              Slug *
            </Label>
            <div className="flex gap-2">
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
                placeholder="blog-url-slug"
                className="border-2 border-gray-300 focus:border-blue-500"
              />
              <Button type="button" variant="outline" onClick={generateSlug}>
                Generate
              </Button>
            </div>
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <Label htmlFor="excerpt" className="text-sm font-semibold text-gray-700">
              Excerpt *
            </Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              required
              rows={3}
              placeholder="Brief description of the blog post"
              className="border-2 border-gray-300 focus:border-blue-500"
            />
          </div>

          {/* Author */}
          <div className="space-y-2">
            <Label htmlFor="author" className="text-sm font-semibold text-gray-700">
              Author *
            </Label>
            <Select
              value={formData.authorId}
              onValueChange={(value) => setFormData({ ...formData, authorId: value })}
              required
            >
              <SelectTrigger className="border-2 border-gray-300 focus:border-blue-500">
                <SelectValue placeholder="Select an author" />
              </SelectTrigger>
              <SelectContent>
                {authors.map((author) => (
                  <SelectItem key={author._id} value={author._id}>
                    {author.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Categories</Label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <label
                  key={category._id}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={formData.categoryIds.includes(category._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({
                          ...formData,
                          categoryIds: [...formData.categoryIds, category._id],
                        });
                      } else {
                        setFormData({
                          ...formData,
                          categoryIds: formData.categoryIds.filter((id) => id !== category._id),
                        });
                      }
                    }}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm font-medium">{category.title}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Published Date */}
          <div className="space-y-2">
            <Label htmlFor="publishedAt" className="text-sm font-semibold text-gray-700">
              Published Date *
            </Label>
            <Input
              id="publishedAt"
              type="datetime-local"
              value={formData.publishedAt}
              onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
              required
              className="border-2 border-gray-300 focus:border-blue-500"
            />
          </div>

          <div className="border-t-2 border-gray-200 pt-6 mt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">SEO Settings</h3>

            {/* Meta Title */}
            <div className="space-y-2 mb-4">
              <Label htmlFor="metaTitle" className="text-sm font-semibold text-gray-700">
                Meta Title (60 chars max)
              </Label>
              <Input
                id="metaTitle"
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                maxLength={60}
                placeholder="SEO optimized title"
                className="border-2 border-gray-300 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500">{formData.metaTitle.length}/60 characters</p>
            </div>

            {/* Meta Description */}
            <div className="space-y-2 mb-4">
              <Label htmlFor="metaDescription" className="text-sm font-semibold text-gray-700">
                Meta Description (160 chars max)
              </Label>
              <Textarea
                id="metaDescription"
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                maxLength={160}
                rows={3}
                placeholder="SEO optimized description"
                className="border-2 border-gray-300 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500">{formData.metaDescription.length}/160 characters</p>
            </div>

            {/* Keywords */}
            <div className="space-y-2">
              <Label htmlFor="keywords" className="text-sm font-semibold text-gray-700">
                Keywords (comma separated)
              </Label>
              <Input
                id="keywords"
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                placeholder="keyword1, keyword2, keyword3"
                className="border-2 border-gray-300 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg h-12"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {blog ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {blog ? 'Update Blog' : 'Create Blog'}
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/dashboard')}
              className="px-8 h-12 border-2 border-gray-300"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
        <p className="text-sm text-gray-700">
          <strong>Note:</strong> The blog body content can be edited in the Sanity Studio. This form handles metadata and basic information only.
        </p>
      </div>
    </form>
  );
}
