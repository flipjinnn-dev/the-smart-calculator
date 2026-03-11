import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ArrowLeft, User, Calendar } from 'lucide-react';
import { getPostBySlug } from '@/lib/actions/post-actions';
import { hasUserReacted } from '@/lib/actions/reaction-actions';
import { getCurrentUser } from '@/lib/auth-utils';
import { hasUserLikedComment } from '@/lib/actions/comment-actions';
import { CommentSection } from '@/components/community/comment-section';
import { ReactionButton } from '@/components/community/reaction-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/sanity/config';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PostPageProps) {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    
    if (!post) {
      return {
        title: 'Post Not Found - Community',
        description: 'The requested post could not be found.',
      };
    }

    const postUrl = `https://www.thesmartcalculator.com/community/post/${slug}`;
    
    // Extract description safely from content blocks
    const description = post.excerpt || 
      post.content?.flatMap((block: any) => block.children ?? [])
        .map((child: any) => child.text)
        .filter(Boolean)
        .join(' ')
        .slice(0, 160) || 
      'Read this post on our community platform.';
    
    // Use featured image if available, otherwise use default
    let ogImage = '/og-image.png';
    try {
      if (post.featuredImage && post.featuredImage.asset) {
        ogImage = urlFor(post.featuredImage).width(1200).height(630).url();
      }
    } catch (e) {
      // Fallback to default if image processing fails
    }

    return {
      title: `${post.title} - Community`,
      description: description,
      alternates: {
        canonical: postUrl,
      },
      openGraph: {
        title: post.title,
        description: description,
        type: 'article',
        url: postUrl,
        siteName: 'Smart Calculator',
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: description,
        images: [ogImage],
      },
    };
  } catch (error) {
    return {
      title: 'Community Post',
      description: 'Community discussion platform',
    };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }
  
  const user = await getCurrentUser();
  const hasReacted = user ? await hasUserReacted(post._id, user.userId!) : false;
  const isAuthenticated = !!user;

  // Add hasUserLiked status to each comment
  const commentsWithLikeStatus = user ? await Promise.all(
    (post.comments || []).map(async (comment: any) => ({
      ...comment,
      hasUserLiked: await hasUserLikedComment(comment._id, user.userId!),
    }))
  ) : post.comments || [];

  // Helper to extract HTML from PortableText if it contains HTML strings
  const getHtmlFromPortableText = (content: any[]): string | null => {
    if (!Array.isArray(content) || content.length === 0) return null;
    
    const firstBlock = content[0];
    if (firstBlock?.children?.[0]?.text) {
      const text = firstBlock.children[0].text;
      if (text.includes('<') && text.includes('>')) {
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

  const renderContent = () => {
    if (post.htmlContent) {
      const cleanHtml = stripHeadElements(post.htmlContent);
      return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
    }
    
    if (post.content) {
      if (Array.isArray(post.content)) {
        const htmlContent = getHtmlFromPortableText(post.content);
        if (htmlContent) {
          const cleanHtml = stripHeadElements(htmlContent);
          return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
        }
        return <PortableText value={post.content} />;
      }
      const cleanHtml = stripHeadElements(post.content);
      return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
    }
    
    return null;
  };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/community" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Community
            </Link>
          </Button>

          {/* Post Content */}
          <article className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border-2 border-gray-200 shadow-xl mb-8">
            {/* Featured Image */}
            {post.featuredImage && post.featuredImage.asset && (
              <div className="relative w-full h-64 md:h-96 mb-6 rounded-2xl overflow-hidden">
                <Image
                  src={urlFor(post.featuredImage).url()}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          {/* Author & Date */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b">
            <Avatar>
              <AvatarImage src={post.author?.image || undefined} />
              <AvatarFallback>
                <User className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-gray-900">{post.author?.name || 'Anonymous'}</p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-3 h-3" />
                <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {renderContent()}
          </div>

          {/* Reaction Button */}
          <div className="mt-8 pt-6 border-t">
            <ReactionButton
              postId={post._id}
              hasReacted={hasReacted}
              initialCount={post.reactionCount || 0}
              isAuthenticated={isAuthenticated}
            />
          </div>
        </article>

        {/* Comments Section */}
        <CommentSection 
          postId={post._id}
          comments={commentsWithLikeStatus}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </div>
  );
}
