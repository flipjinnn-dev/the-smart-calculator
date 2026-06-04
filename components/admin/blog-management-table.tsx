"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format, formatDistanceToNow } from "date-fns";
import { Pencil, Trash2, Eye, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

import type { BlogListItem } from "@/lib/admin-blog-types";

function PublishedAt({ date }: { date: string }) {
  const [relative, setRelative] = useState<string | null>(null);

  useEffect(() => {
    setRelative(formatDistanceToNow(new Date(date), { addSuffix: true }));
  }, [date]);

  return (
    <span suppressHydrationWarning>
      {relative ?? format(new Date(date), "MMM d, yyyy")}
    </span>
  );
}

export function BlogManagementTable({ blogs }: { blogs: BlogListItem[] }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) {
      return;
    }

    setIsDeleting(id);
    try {
      const res = await fetch(`/api/admin/blogs/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete blog");
      }
      toast.success("Blog deleted successfully");
      router.refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to delete blog");
    } finally {
      setIsDeleting(null);
    }
  };

  if (blogs.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-gray-100 rounded-full">
            <Eye className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              No blogs yet
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Create your first blog post to get started
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <Link href="/admin/dashboard/blogs/create">
                <Plus className="w-4 h-4 mr-2" />
                Create Blog
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">Blog Posts</h3>
        <Button
          asChild
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          <Link href="/admin/dashboard/blogs/create">
            <Plus className="w-4 h-4 mr-2" />
            Create Blog
          </Link>
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Categories</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog._id}>
                <TableCell className="font-medium max-w-md">
                  <div>
                    <p className="font-semibold text-gray-900 line-clamp-1">
                      {blog.title}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {blog.excerpt}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{blog.authorName}</TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {blog.categoryTitles.map((title) => (
                      <Badge key={title} variant="secondary" className="text-xs">
                        {title}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  <PublishedAt date={blog.publishedAt} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/${blog.slug}`} target="_blank">
                        <Eye className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/dashboard/blogs/edit/${blog._id}`}>
                        <Pencil className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={isDeleting === blog._id}
                      onClick={() => handleDelete(blog._id, blog.title)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
