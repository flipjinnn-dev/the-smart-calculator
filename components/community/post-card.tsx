'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Calendar, MessageSquare, Eye, Share2, Check } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { urlFor } from '@/lib/sanity/config';
import { createUsernameSlug } from '@/lib/utils/username-slug';
import { PortableText } from '@portabletext/react';
import { ReactionButton } from './reaction-button';
import { CommentSection } from './comment-section';
import Link from 'next/link';
import { toast } from 'sonner';

interface PostCardProps {
  post: {
    _id: string;
    title: string;
    slug: { current: string };
    content?: any[];
    htmlContent?: string;
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
  const [showComments, setShowComments] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  
  // Generate consistent random view count based on post ID
  const getViewCount = (postId: string) => {
    let hash = 0;
    for (let i = 0; i < postId.length; i++) {
      hash = ((hash << 5) - hash) + postId.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash % 800) + 100; // Random between 100-900
  };
  const mockViewCount = getViewCount(post._id);

  // Helper to extract HTML from PortableText if it contains HTML strings
  const getHtmlFromPortableText = (content: any[]): string | null => {
    if (!Array.isArray(content) || content.length === 0) return null;
    
    // Check if the first block contains HTML tags
    const firstBlock = content[0];
    if (firstBlock?.children?.[0]?.text) {
      const text = firstBlock.children[0].text;
      // Check if text contains HTML tags
      if (text.includes('<') && text.includes('>')) {
        // Extract all text from all blocks and join
        return content
          .map(block => block.children?.map((child: any) => child.text).join('') || '')
          .join('\n');
      }
    }
    return null;
  };

  // Helper to strip head-only elements from HTML content
  const stripHeadElements = (html: string): string => {
    if (!html) return html;
    
    // Remove all head-only elements that should never appear in body content:
    // - meta tags (including Open Graph, Twitter cards, charset, viewport, etc.)
    // - link tags (canonical, alternate, preload, dns-prefetch, etc.)
    // - title tags
    // - script tags (especially JSON-LD schema markup)
    // - style tags in head
    // - base tags
    // - noscript tags
    return html
      // Remove meta tags (all variations including self-closing and non-self-closing)
      .replace(/<meta\s+[^>]*\/?>/gi, '')
      .replace(/<meta\s+[^>]*>.*?<\/meta>/gi, '')
      // Remove link tags (canonical, alternate, stylesheet, preload, etc.)
      .replace(/<link\s+[^>]*\/?>/gi, '')
      .replace(/<link\s+[^>]*>.*?<\/link>/gi, '')
      // Remove title tags
      .replace(/<title\s*[^>]*>[\s\S]*?<\/title>/gi, '')
      // Remove script tags (including JSON-LD schema markup)
      .replace(/<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<script\s+[^>]*>[\s\S]*?<\/script>/gi, '')
      // Remove style tags
      .replace(/<style\s+[^>]*>[\s\S]*?<\/style>/gi, '')
      // Remove base tags
      .replace(/<base\s+[^>]*\/?>/gi, '')
      // Remove noscript tags
      .replace(/<noscript\s+[^>]*>[\s\S]*?<\/noscript>/gi, '')
      // Remove any remaining head tags if they somehow got into content
      .replace(/<head\s*[^>]*>[\s\S]*?<\/head>/gi, '')
      // Remove html and body opening/closing tags if present
      .replace(/<\/?html[^>]*>/gi, '')
      .replace(/<\/?body[^>]*>/gi, '')
      // Clean up multiple consecutive whitespace/newlines
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      .trim();
  };

  const handleShare = async () => {
    const postUrl = `${window.location.origin}/community/post/${post.slug.current}`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: `Check out this post: ${post.title}`,
          url: postUrl,
        });
        toast.success('Post shared successfully!');
      } else {
        await navigator.clipboard.writeText(postUrl);
        setIsSharing(true);
        toast.success('Link copied to clipboard!');
        setTimeout(() => setIsSharing(false), 2000);
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        toast.error('Failed to share post');
      }
    }
  };
  
  return (
    <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 bg-white overflow-hidden rounded-3xl hover:-translate-y-1 group">
      
      <CardHeader className="bg-gradient-to-br from-white to-gray-50/50 p-6 border-b-2 border-gray-100">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex items-center gap-3">
            <Link href={`/profile/${createUsernameSlug(post.author.name)}`} className="group/avatar">
              <Avatar className="w-14 h-14 border-2 border-white shadow-lg ring-2 ring-gray-100 group-hover/avatar:ring-blue-400 transition-all">
                <AvatarImage src={post.author.image} alt={post.author.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-lg">
                  {post.author.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <Link href={`/profile/${createUsernameSlug(post.author.name)}`} className="font-bold text-base text-gray-900 hover:text-blue-600 transition-colors">
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
            {post.htmlContent ? (
              <div dangerouslySetInnerHTML={{ __html: stripHeadElements(post.htmlContent) }} />
            ) : post.content ? (
              Array.isArray(post.content) ? (
                (() => {
                  const htmlContent = getHtmlFromPortableText(post.content);
                  return htmlContent ? (
                    <div dangerouslySetInnerHTML={{ __html: stripHeadElements(htmlContent) }} />
                  ) : (
                    <PortableText value={post.content} />
                  );
                })()
              ) : (
                <div dangerouslySetInnerHTML={{ __html: stripHeadElements(post.content) }} />
              )
            ) : null}
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
              <Button 
                variant="outline" 
                size="default" 
                onClick={() => setShowComments(!showComments)}
                className={`gap-2 h-10 px-5 rounded-lg border-2 transition-all ${
                  showComments 
                    ? 'border-purple-500 bg-purple-50 text-purple-600' 
                    : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50 hover:text-purple-600'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span className="font-semibold">{post.commentCount}</span>
                <span className="hidden sm:inline">{showComments ? 'Hide' : 'View'} Comments</span>
              </Button>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-sm text-gray-500 bg-gray-100 px-3 py-2 rounded-lg">
                <Eye className="w-4 h-4" />
                <span className="font-medium">{mockViewCount}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleShare}
                className={`gap-2 rounded-lg transition-all ${
                  isSharing 
                    ? 'bg-green-100 text-green-600' 
                    : 'hover:bg-green-50 hover:text-green-600'
                }`}
              >
                {isSharing ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
                <span className="hidden sm:inline text-sm font-medium">
                  {isSharing ? 'Copied!' : 'Share'}
                </span>
              </Button>
            </div>
          </div>
        </div>

        {showComments && (
          <div className="px-6 py-6 border-t-2 border-gray-100 bg-white">
            <CommentSection
              postId={post._id}
              comments={post.comments || []}
              isAuthenticated={isAuthenticated}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
