'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Pencil, Trash2, Eye, CheckCircle, XCircle } from 'lucide-react';
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
import { deleteCommunityPost, updateCommunityPost } from '@/lib/actions/admin-community-actions';
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

interface CommunityPost {
  _id: string;
  title: string;
  slug: { current: string };
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  approvedAt?: string;
  author: { name: string; email: string };
  commentCount: number;
  reactionCount: number;
}

export function CommunityPostsManagementTable({ posts }: { posts: CommunityPost[] }) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    const result = await deleteCommunityPost(id);
    
    if (result.success) {
      toast.success('Post deleted successfully');
    } else {
      toast.error(result.error || 'Failed to delete post');
    }
    setIsDeleting(null);
  };

  const handleStatusChange = async (id: string, status: 'approved' | 'rejected') => {
    setIsUpdating(id);
    const updateData: any = { status };
    
    if (status === 'approved') {
      updateData.approvedAt = new Date().toISOString();
    }
    
    const result = await updateCommunityPost(id, updateData);
    
    if (result.success) {
      toast.success(`Post ${status} successfully`);
    } else {
      toast.error(result.error || 'Failed to update post');
    }
    setIsUpdating(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-700 border-red-200">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Pending</Badge>;
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Community Posts</h3>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Engagement</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post._id}>
                <TableCell className="font-medium max-w-md">
                  <p className="font-semibold text-gray-900 line-clamp-2">{post.title}</p>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-sm">{post.author?.name}</p>
                    <p className="text-xs text-gray-500">{post.author?.email}</p>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(post.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-2 text-xs">
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full font-medium">
                      👍 {post.reactionCount}
                    </span>
                    <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded-full font-medium">
                      💬 {post.commentCount}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {post.status === 'approved' && (
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/community/post/${post.slug.current}`} target="_blank">
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                    )}
                    {post.status === 'pending' && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStatusChange(post._id, 'approved')}
                          disabled={isUpdating === post._id}
                          className="hover:bg-green-50"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStatusChange(post._id, 'rejected')}
                          disabled={isUpdating === post._id}
                          className="hover:bg-red-50"
                        >
                          <XCircle className="w-4 h-4 text-red-600" />
                        </Button>
                      </>
                    )}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={isDeleting === post._id}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-white border-2 border-gray-200 shadow-2xl">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Community Post</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{post.title}"? This will also delete all comments and reactions. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(post._id)}
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
