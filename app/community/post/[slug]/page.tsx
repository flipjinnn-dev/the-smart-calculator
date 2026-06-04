import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ArrowLeft, User, Calendar } from 'lucide-react';
import { getCachedCommunityPostFull } from '@/lib/community-post-meta';
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

/** Strip head-only tags from pasted HTML so meta/title/scripts do not render in the article body. */
function stripHeadElements(html: string): string {
  if (!html) return html;

  return html
    .replace(/<meta\s+[^>]*\/?>/gi, '')
    .replace(/<meta\s+[^>]*>.*?<\/meta>/gi, '')
    // `<link>` (hreflang, canonical, etc.) must live in <head> only — match multiline tags
    .replace(/<link\b[\s\S]*?>/gi, '')
    .replace(/<\/link>/gi, '')
    .replace(/<title\s*[^>]*>[\s\S]*?<\/title>/gi, '')
    .replace(/<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<script\s+[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\s+[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<base\s+[^>]*\/?>/gi, '')
    .replace(/<noscript\s+[^>]*>[\s\S]*?<\/noscript>/gi, '')
    .replace(/<head\s*[^>]*>[\s\S]*?<\/head>/gi, '')
    .replace(/<\/?html[^>]*>/gi, '')
    .replace(/<\/?body[^>]*>/gi, '')
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getCachedCommunityPostFull(slug);
  
  if (!post) {
    notFound();
  }

  const comments = post.comments || [];

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

  /** Remove a leading <h1> that duplicates the post title (title belongs in <head> via metadata). */
  const stripDuplicateLeadingH1 = (html: string, title: string): string => {
    if (!html || !title) return html;
    const normalizedTitle = title.trim().replace(/\s+/g, ' ');
    const m = html.match(/^\s*<h1\b[^>]*>([\s\S]*?)<\/h1>\s*/i);
    if (!m) return html;
    const inner = m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (inner.toLowerCase() === normalizedTitle.toLowerCase()) {
      return html.slice(m[0].length);
    }
    return html;
  };

  const renderContent = () => {
    if (post.htmlContent) {
      let cleanHtml = stripHeadElements(post.htmlContent);
      cleanHtml = stripDuplicateLeadingH1(cleanHtml, post.title);
      return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
    }
    
    if (post.content) {
      if (Array.isArray(post.content)) {
        const htmlContent = getHtmlFromPortableText(post.content);
        if (htmlContent) {
          let cleanHtml = stripHeadElements(htmlContent);
          cleanHtml = stripDuplicateLeadingH1(cleanHtml, post.title);
          return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
        }
        return <PortableText value={post.content} />;
      }
      let cleanHtml = stripHeadElements(post.content);
      cleanHtml = stripDuplicateLeadingH1(cleanHtml, post.title);
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
              initialCount={post.reactionCount || 0}
            />
          </div>
        </article>

        {/* Comments Section */}
        <CommentSection 
          postId={post._id}
          comments={comments}
        />
      </div>
    </div>
  );
}
