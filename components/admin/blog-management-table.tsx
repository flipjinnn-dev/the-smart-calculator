'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Pencil, Trash2, Eye, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { deleteBlog } from '@/lib/actions/blog-actions';
import { toast } from 'sonner';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Blog {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  author: { name: string };
  categories: { title: string }[];
}

export function BlogManagementTable({ blogs }: { blogs: Blog[] }) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    const result = await deleteBlog(id);
    
    if (result.success) {
      toast.success('Blog deleted successfully');
    } else {
      toast.error(result.error || 'Failed to delete blog');
    }
    setIsDeleting(null);
  };

  if (blogs.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-gray-100 rounded-full">
            <Eye className="w-8 h-8 text-gray-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No blogs yet</h3>
            <p className="text-sm text-gray-500 mb-4">Create your first blog post to get started</p>
            <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
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
        <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
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
                    <p className="font-semibold text-gray-900 line-clamp-1">{blog.title}</p>
                    <p className="text-xs text-gray-500 line-clamp-1">{blog.excerpt}</p>
                  </div>
                </TableCell>
                <TableCell>{blog.author?.name || 'Unknown'}</TableCell>
                <TableCell>
                  <div className="flex gap-1 flex-wrap">
                    {blog.categories?.map((cat, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {cat.title}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {formatDistanceToNow(new Date(blog.publishedAt), { addSuffix: true })}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                    >
                      <Link href={`/${blog.slug.current}`} target="_blank">
                        <Eye className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                    >
                      <Link href={`/admin/dashboard/blogs/edit/${blog._id}`}>
                        <Pencil className="w-4 h-4" />
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={isDeleting === blog._id}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-white border-2 border-gray-200 shadow-2xl">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{blog.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(blog._id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
