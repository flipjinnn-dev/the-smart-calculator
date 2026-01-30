'use client';

import Link from 'next/link';
import { TrendingUp, MessageSquare, ThumbsUp, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface TrendingPost {
  _id: string;
  title: string;
  slug: { current: string };
  reactionCount: number;
  commentCount: number;
  viewCount?: number;
}

interface TrendingPostsSidebarProps {
  posts: TrendingPost[];
}

export function TrendingPostsSidebar({ posts }: TrendingPostsSidebarProps) {
  if (posts.length === 0) return null;

  return (
    <Card className="p-6 bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
        <div className="p-2.5 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl shadow-lg">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <h3 className="font-bold text-xl text-gray-900">Trending Posts</h3>
      </div>
      
      <div className="space-y-4">
        {posts.map((post, index) => (
          <Link 
            key={post._id} 
            href={`/community/post/${post.slug.current}`}
            className="block group"
          >
            <div className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug mb-2">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1.5 bg-blue-50 px-2 py-1 rounded-full">
                      <ThumbsUp className="w-3 h-3 text-blue-600" />
                      <span className="font-medium text-blue-700">{post.reactionCount}</span>
                    </span>
                    <span className="flex items-center gap-1.5 bg-purple-50 px-2 py-1 rounded-full">
                      <MessageSquare className="w-3 h-3 text-purple-600" />
                      <span className="font-medium text-purple-700">{post.commentCount}</span>
                    </span>
                    {post.viewCount !== undefined && (
                      <span className="flex items-center gap-1.5 bg-green-50 px-2 py-1 rounded-full">
                        <Eye className="w-3 h-3 text-green-600" />
                        <span className="font-medium text-green-700">{post.viewCount}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
}
