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
      <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
        <CardContent className="py-16 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="p-4 bg-green-100 rounded-full">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-lg font-semibold text-gray-900">All caught up!</p>
            <p className="text-sm text-gray-600">No pending posts to review</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post._id} className="border-2 border-orange-200 bg-gradient-to-br from-orange-50/50 to-white shadow-lg hover:shadow-xl transition-all">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full border border-orange-200">
                    PENDING REVIEW
                  </span>
                </div>
                <CardTitle className="text-2xl mb-3 text-gray-900 leading-tight">{post.title}</CardTitle>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Author:</span>
                    <span className="text-gray-600">{post.author.name}</span>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                      {post.author.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Submitted:</span>
                    <span className="text-gray-600">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed">
                {post.content?.[0]?.children?.[0]?.text || 'No content preview'}
              </p>
            </div>
            
            {post.images && post.images.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Eye className="w-4 h-4" />
                <span className="font-medium">{post.images.length} image{post.images.length > 1 ? 's' : ''} attached</span>
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="default" className="flex-1 min-w-[120px] border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 font-semibold">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Full Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white border-2 border-gray-200 shadow-2xl">
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
                size="default"
                onClick={() => handleApprove(post._id)}
                disabled={loading === post._id}
                className="flex-1 min-w-[120px] bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold shadow-md hover:shadow-lg transition-all"
              >
                <Check className="w-4 h-4 mr-2" />
                Approve Post
              </Button>
              <Button
                variant="destructive"
                size="default"
                onClick={() => handleReject(post._id)}
                disabled={loading === post._id}
                className="flex-1 min-w-[120px] bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 font-semibold shadow-md hover:shadow-lg transition-all"
              >
                <X className="w-4 h-4 mr-2" />
                Reject Post
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
