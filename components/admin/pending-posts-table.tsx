'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Check, X, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { approvePost, rejectPost } from '@/lib/actions/post-actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/sanity/config';
import Image from 'next/image';

interface PendingPost {
  _id: string;
  title: string;
  content: any[];
  author: {
    name: string;
    email: string;
  };
  createdAt: string;
  images?: any[];
}

export function PendingPostsTable({ posts }: { posts: PendingPost[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleApprove = async (postId: string) => {
    setLoading(postId);
    const result = await approvePost(postId);
    
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Post approved!');
      router.refresh();
    }
    setLoading(null);
  };

  const handleReject = async (postId: string) => {
    setLoading(postId);
    const result = await rejectPost(postId);
    
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Post rejected');
      router.refresh();
    }
    setLoading(null);
  };

  if (posts.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">No pending posts to review</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post._id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium">Author:</span> {post.author.name} ({post.author.email})
                  </p>
                  <p>
                    <span className="font-medium">Submitted:</span>{' '}
                    {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white/95 backdrop-blur-xl border-2 border-gray-200 shadow-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">{post.title}</DialogTitle>
                      <DialogDescription className="text-base">
                        By {post.author.name} • {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="prose dark:prose-invert max-w-none mt-4">
                      <PortableText value={post.content} />
                    </div>
                    {post.images && post.images.length > 0 && (
                      <div className="mt-6 space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Attached Images ({post.images.length})</h3>
                        <div className="grid grid-cols-1 gap-4">
                          {post.images.map((image: any, index: number) => (
                            <div key={index} className="relative w-full rounded-xl overflow-hidden border-2 border-gray-200 shadow-md bg-gray-50">
                              <img
                                src={urlFor(image).width(800).url()}
                                alt={`Post image ${index + 1}`}
                                className="w-full h-auto object-contain max-h-[400px]"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleApprove(post._id)}
                  disabled={loading === post._id}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleReject(post._id)}
                  disabled={loading === post._id}
                >
                  <X className="w-4 h-4 mr-2" />
                  Reject
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {post.content?.[0]?.children?.[0]?.text || 'No content preview'}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
