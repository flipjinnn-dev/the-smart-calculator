import { formatDistanceToNow } from 'date-fns';
import { Calendar, MessageSquare, Eye, Share2, Bookmark } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { urlFor } from '@/lib/sanity/config';
import { PortableText } from '@portabletext/react';
import { ReactionButton } from './reaction-button';
import { CommentSection } from './comment-section';
import Link from 'next/link';

interface PostCardProps {
  post: {
    _id: string;
    title: string;
    slug: { current: string };
    content: any[];
    author: {
      name: string;
      image?: string;
    };
    createdAt: string;
    commentCount: number;
    reactionCount: number;
    images?: any[];
    comments?: any[];
  };
  hasReacted: boolean;
  isAuthenticated: boolean;
}

export function PostCard({ post, hasReacted, isAuthenticated }: PostCardProps) {
  const mockViewCount = 245;
  
  return (
    <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 bg-white overflow-hidden rounded-3xl hover:-translate-y-1 group">
      
      <CardHeader className="bg-gradient-to-br from-white to-gray-50/50 p-6 border-b-2 border-gray-100">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <Link href={`/profile/${post.author.name}`} className="group/avatar">
              <Avatar className="w-14 h-14 border-2 border-white shadow-lg ring-2 ring-gray-100 group-hover/avatar:ring-blue-400 transition-all">
                <AvatarImage src={post.author.image} alt={post.author.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-lg">
                  {post.author.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <Link href={`/profile/${post.author.name}`} className="font-bold text-base text-gray-900 hover:text-blue-600 transition-colors">
                {post.author.name}
              </Link>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                <Calendar className="w-3.5 h-3.5" />
                <span className="font-medium">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="rounded-lg hover:bg-blue-50 hover:text-blue-600">
            <Bookmark className="w-4 h-4" />
          </Button>
        </div>
        
        <Link href={`/community/post/${post.slug.current}`}>
          <h2 className="text-2xl font-bold leading-tight text-gray-900 mb-3 hover:text-blue-600 transition-colors cursor-pointer">
            {post.title}
          </h2>
        </Link>
      </CardHeader>

      <CardContent className="p-0">
        {post.images && post.images.length > 0 && (
          <div className="space-y-6 px-8 pt-6">
            {post.images.map((image: any, index: number) => (
              <div key={index} className="relative w-full rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                <img
                  src={urlFor(image).width(1400).url()}
                  alt={image.alt || `Post image ${index + 1}`}
                  className="w-full h-auto object-cover"
                  style={{ maxHeight: '700px' }}
                />
              </div>
            ))}
          </div>
        )}

        <div className="px-8 py-6">
          <div className="prose prose-base max-w-none text-gray-700 leading-relaxed">
            <PortableText value={post.content} />
          </div>
        </div>

        <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-white border-t-2 border-gray-100">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <ReactionButton
                postId={post._id}
                initialCount={post.reactionCount}
                hasReacted={hasReacted}
                isAuthenticated={isAuthenticated}
              />
              <Link href={`/community/post/${post.slug.current}#comments`}>
                <Button variant="outline" size="default" className="gap-2 h-10 px-5 rounded-lg border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 hover:text-purple-600 transition-all">
                  <MessageSquare className="w-4 h-4" />
                  <span className="font-semibold">{post.commentCount}</span>
                  <span className="hidden sm:inline">Comments</span>
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-lg">
                <Eye className="w-4 h-4" />
                <span className="font-medium">{mockViewCount}</span>
              </div>
              <Button variant="ghost" size="sm" className="gap-2 rounded-lg hover:bg-green-50 hover:text-green-600">
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-medium">Share</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 border-t-2 border-gray-100 bg-white">
          <CommentSection
            postId={post._id}
            comments={post.comments || []}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </CardContent>
    </Card>
  );
}
