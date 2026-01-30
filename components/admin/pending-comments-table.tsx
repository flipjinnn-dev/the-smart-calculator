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
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">No pending comments to review</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <Card key={comment._id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-base mb-2 flex items-center gap-2">
                  Comment on: {comment.post.title}
                  <Link
                    href={`/community/post/${comment.post.slug.current}`}
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </CardTitle>
                <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium">Author:</span> {comment.author.name} ({comment.author.email})
                  </p>
                  <p>
                    <span className="font-medium">Submitted:</span>{' '}
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleApprove(comment._id)}
                  disabled={loading === comment._id}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleReject(comment._id)}
                  disabled={loading === comment._id}
                >
                  <X className="w-4 h-4 mr-2" />
                  Reject
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm whitespace-pre-wrap bg-muted/50 p-3 rounded-lg">
              {comment.content}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
