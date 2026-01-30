'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Check, X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { approveComment, rejectComment } from '@/lib/actions/comment-actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface PendingComment {
  _id: string;
  content: string;
  author: {
    name: string;
    email: string;
  };
  post: {
    title: string;
    slug: { current: string };
  };
  createdAt: string;
}

export function PendingCommentsTable({ comments }: { comments: PendingComment[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleApprove = async (commentId: string) => {
    setLoading(commentId);
    const result = await approveComment(commentId);
    
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Comment approved!');
      router.refresh();
    }
    setLoading(null);
  };

  const handleReject = async (commentId: string) => {
    setLoading(commentId);
    const result = await rejectComment(commentId);
    
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Comment rejected');
      router.refresh();
    }
    setLoading(null);
  };

  if (comments.length === 0) {
    return (
      <Card className="border-2 border-dashed border-gray-300 bg-gray-50">
        <CardContent className="py-16 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="p-4 bg-green-100 rounded-full">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-lg font-semibold text-gray-900">All caught up!</p>
            <p className="text-sm text-gray-600">No pending comments to review</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <Card key={comment._id} className="border-2 border-pink-200 bg-gradient-to-br from-pink-50/50 to-white shadow-lg hover:shadow-xl transition-all">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-pink-100 text-pink-700 text-xs font-bold rounded-full border border-pink-200">
                    PENDING REVIEW
                  </span>
                </div>
                <CardTitle className="text-lg mb-3 text-gray-900 flex items-center gap-2 flex-wrap">
                  <span>Comment on:</span>
                  <span className="text-blue-600">{comment.post.title}</span>
                  <Link
                    href={`/community/post/${comment.post.slug.current}`}
                    target="_blank"
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </CardTitle>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Author:</span>
                    <span className="text-gray-600">{comment.author.name}</span>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                      {comment.author.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700">Submitted:</span>
                    <span className="text-gray-600">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {comment.content}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                size="default"
                onClick={() => handleApprove(comment._id)}
                disabled={loading === comment._id}
                className="flex-1 min-w-[140px] bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold shadow-md hover:shadow-lg transition-all"
              >
                <Check className="w-4 h-4 mr-2" />
                Approve Comment
              </Button>
              <Button
                variant="destructive"
                size="default"
                onClick={() => handleReject(comment._id)}
                disabled={loading === comment._id}
                className="flex-1 min-w-[140px] bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 font-semibold shadow-md hover:shadow-lg transition-all"
              >
                <X className="w-4 h-4 mr-2" />
                Reject Comment
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
