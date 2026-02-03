'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { User, Send, MessageSquare, ThumbsUp, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { createComment, likeComment, replyToComment } from '@/lib/actions/comment-actions';
import { toast } from 'sonner';
import { createUsernameSlug } from '@/lib/utils/username-slug';
import { RichTextEditor } from '@/components/ui/rich-text-editor';

interface Comment {
  _id: string;
  content: string;
  author: {
    name: string;
    image?: string;
  };
  createdAt: string;
  likeCount?: number;
  hasUserLiked?: boolean;
  replies?: Comment[];
}

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  isAuthenticated: boolean;
}

export function CommentSection({ postId, comments, isAuthenticated }: CommentSectionProps) {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [likingComment, setLikingComment] = useState<string | null>(null);
  const [likeStates, setLikeStates] = useState<Record<string, { liked: boolean; count: number }>>({});
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

  const handleLike = async (commentId: string, currentLiked: boolean, currentCount: number) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to like comments');
      return;
    }

    // Optimistic update
    const newLiked = !currentLiked;
    const newCount = newLiked ? currentCount + 1 : Math.max(0, currentCount - 1);
    
    setLikeStates(prev => ({
      ...prev,
      [commentId]: { liked: newLiked, count: newCount }
    }));

    setLikingComment(commentId);
    const result = await likeComment(commentId);

    if (result.error) {
      // Revert on error
      setLikeStates(prev => ({
        ...prev,
        [commentId]: { liked: currentLiked, count: currentCount }
      }));
      toast.error(result.error);
    } else {
      toast.success(result.liked ? 'Comment liked!' : 'Like removed');
      router.refresh();
    }
    setLikingComment(null);
  };

  const handleReply = async (commentId: string) => {
    if (!replyContent.trim()) return;

    setIsLoading(true);
    const result = await replyToComment(commentId, replyContent);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Reply submitted for review!');
      setReplyContent('');
      setReplyingTo(null);
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
          <RichTextEditor
            content={content}
            onChange={setContent}
            placeholder="Share your thoughts and join the discussion..."
            className="bg-white"
          />
          <div className="flex justify-end items-center">
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
                  <div className="text-gray-700 text-sm leading-relaxed break-words mb-3 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: comment.content }} />
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        const currentLiked = likeStates[comment._id]?.liked ?? comment.hasUserLiked ?? false;
                        const currentCount = likeStates[comment._id]?.count ?? comment.likeCount ?? 0;
                        handleLike(comment._id, currentLiked, currentCount);
                      }}
                      disabled={likingComment === comment._id}
                      className={`gap-1.5 h-8 px-3 rounded-lg text-xs font-medium transition-all ${
                        (likeStates[comment._id]?.liked ?? comment.hasUserLiked)
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg hover:from-blue-600 hover:to-blue-700' 
                          : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${(likeStates[comment._id]?.liked ?? comment.hasUserLiked) ? 'fill-current' : ''}`} />
                      {(likeStates[comment._id]?.liked ?? comment.hasUserLiked) ? 'Liked' : 'Like'} {(likeStates[comment._id]?.count ?? comment.likeCount ?? 0) > 0 ? `(${likeStates[comment._id]?.count ?? comment.likeCount})` : ''}
                    </Button>
                    {isAuthenticated && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
                        className="gap-1.5 h-8 px-3 rounded-lg hover:bg-purple-50 hover:text-purple-600 text-xs font-medium text-gray-600"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Reply
                      </Button>
                    )}
                  </div>
                  {replyingTo === comment._id && (
                    <div className="mt-4 space-y-3 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                      <RichTextEditor
                        content={replyContent}
                        onChange={setReplyContent}
                        placeholder="Write your reply..."
                        className="bg-white"
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyContent('');
                          }}
                          className="h-9 px-4"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => handleReply(comment._id)}
                          disabled={isLoading || !replyContent.trim()}
                          className="h-9 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                        >
                          <Send className="w-3.5 h-3.5 mr-1.5" />
                          {isLoading ? 'Sending...' : 'Send Reply'}
                        </Button>
                      </div>
                    </div>
                  )}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 ml-8 space-y-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-px flex-1 bg-gradient-to-r from-purple-200 to-transparent" />
                        <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                          {comment.replies.length} {comment.replies.length === 1 ? 'Reply' : 'Replies'}
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-l from-purple-200 to-transparent" />
                      </div>
                      {comment.replies.map((reply) => (
                        <div key={reply._id} className="relative">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full" />
                          <div className="ml-4 p-4 bg-gradient-to-br from-purple-50/50 to-pink-50/30 rounded-xl border-2 border-purple-200 shadow-sm hover:shadow-md transition-all">
                            <div className="flex gap-3">
                              <Link href={`/profile/${createUsernameSlug(reply.author.name)}`}>
                                <Avatar className="w-9 h-9 border-2 border-white shadow-md ring-2 ring-purple-200">
                                  <AvatarImage src={reply.author.image} alt={reply.author.name} />
                                  <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white text-sm font-bold">
                                    {reply.author.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                              </Link>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <Link href={`/profile/${createUsernameSlug(reply.author.name)}`} className="font-bold text-sm text-gray-900 hover:text-purple-600 transition-colors">
                                    {reply.author.name}
                                  </Link>
                                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                                    Replied
                                  </span>
                                  <span className="text-xs text-gray-500">{formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}</span>
                                </div>
                                <div className="text-gray-700 text-sm leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: reply.content }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
