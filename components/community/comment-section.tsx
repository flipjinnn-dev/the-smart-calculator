'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { User, Send, MessageSquare, ThumbsUp, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { createComment } from '@/lib/actions/comment-actions';
import { toast } from 'sonner';
import { createUsernameSlug } from '@/lib/utils/username-slug';

interface Comment {
  _id: string;
  content: string;
  author: {
    name: string;
    image?: string;
  };
  createdAt: string;
}

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  isAuthenticated: boolean;
}

export function CommentSection({ postId, comments, isAuthenticated }: CommentSectionProps) {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsLoading(true);
    const result = await createComment(postId, content);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Comment submitted for review!');
      setContent('');
      router.refresh();
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b-2 border-gray-200">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-md">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Comments</h3>
        <span className="px-3 py-1 text-sm font-semibold text-purple-700 bg-purple-100 rounded-full">{comments.length}</span>
      </div>
      
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-gradient-to-br from-blue-50/50 to-purple-50/30 rounded-2xl border-2 border-gray-200 shadow-md">
          <Textarea
            placeholder="Share your thoughts and join the discussion..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={1000}
            rows={4}
            className="resize-none text-sm border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all bg-white rounded-xl placeholder:text-gray-400 p-4 leading-relaxed shadow-sm"
          />
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-200">
              {content.length}/1000 characters
            </span>
            <Button type="submit" disabled={isLoading || !content.trim()} className="gap-2 h-11 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
              <Send className="w-4 h-4" />
              {isLoading ? 'Posting...' : 'Post Comment'}
            </Button>
          </div>
        </form>
      ) : (
        <div className="text-center py-10 px-6 bg-gradient-to-br from-blue-50/50 to-purple-50/30 rounded-2xl border-2 border-dashed border-blue-300 shadow-md">
          <div className="p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-900 font-bold text-lg mb-2">Join the conversation</p>
          <p className="text-gray-600 text-sm mb-6">
            Sign in to share your thoughts and connect with the community
          </p>
          <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all rounded-xl px-6 h-11">
            <Link href="/auth/signin">
              Sign In to Comment
            </Link>
          </Button>
        </div>
      )}

      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="p-5 bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 group">
              <div className="flex gap-4">
                <Link href={`/profile/${createUsernameSlug(comment.author.name)}`}>
                  <Avatar className="w-11 h-11 border-2 border-white shadow-md ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all cursor-pointer">
                    <AvatarImage src={comment.author.image} alt={comment.author.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-sm font-bold">
                      {comment.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <Link href={`/profile/${createUsernameSlug(comment.author.name)}`} className="font-bold text-sm text-gray-900 hover:text-blue-600 transition-colors">
                        {comment.author.name}
                      </Link>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                        <span className="font-medium">
                          {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity rounded-lg h-8 w-8 p-0">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </Button>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap break-words mb-3">
                    {comment.content}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="gap-1.5 h-8 px-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 text-xs font-medium text-gray-600">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      Like
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1.5 h-8 px-3 rounded-lg hover:bg-purple-50 hover:text-purple-600 text-xs font-medium text-gray-600">
                      <MessageSquare className="w-3.5 h-3.5" />
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 px-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-dashed border-gray-300">
            <div className="p-4 bg-gray-100 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-700 text-base font-bold mb-1">No comments yet</p>
            <p className="text-gray-500 text-sm">
              Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
