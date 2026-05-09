import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
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

function decodeBasicHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

/** If the CMS body pasted `<meta name="description" content="...">`, use that for `<head>` and strip from body. */
function extractEmbeddedMetaDescription(html: string): string | null {
  if (!html) return null;
  let m = html.match(
    /<meta\b[^>]*\bname\s*=\s*["']description["'][^>]*\bcontent\s*=\s*["']([^"']*)["'][^>]*\/?>/i,
  );
  if (m?.[1]) return decodeBasicHtmlEntities(m[1]).trim();
  m = html.match(
    /<meta\b[^>]*\bcontent\s*=\s*["']([^"']*)["'][^>]*\bname\s*=\s*["']description["'][^>]*\/?>/i,
  );
  if (m?.[1]) return decodeBasicHtmlEntities(m[1]).trim();
  return null;
}

function plainTextFromHtml(html: string, maxLen: number): string {
  if (!html) return '';
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > maxLen ? text.slice(0, maxLen).trimEnd() : text;
}

function resolvePostMetaDescription(post: {
  excerpt?: string | null;
  content?: any;
  htmlContent?: string | null;
}): string {
  const excerpt = post.excerpt?.trim();
  if (excerpt) return excerpt.slice(0, 160);

  const fromPortable =
    post.content
      ?.flatMap((block: any) => block.children ?? [])
      .map((child: any) => child.text)
      .filter(Boolean)
      .join(' ')
      .trim()
      .slice(0, 160) || '';

  const embedded = post.htmlContent
    ? extractEmbeddedMetaDescription(post.htmlContent)
    : null;
  if (embedded) return embedded.slice(0, 160);

  const cleanedHtml = post.htmlContent ? stripHeadElements(post.htmlContent) : '';
  const fromBody = cleanedHtml ? plainTextFromHtml(cleanedHtml, 160) : '';

  if (fromPortable) return fromPortable;
  if (fromBody.length >= 20) return fromBody;

  return 'Read this post on our community platform.';
}

const SITE_ORIGIN = 'https://www.thesmartcalculator.com';

function communityPostHreflangLanguages(slug: string): Record<string, string> {
  const enUrl = `${SITE_ORIGIN}/community/post/${slug}`;
  return {
    'x-default': enUrl,
    en: enUrl,
    de: `${SITE_ORIGIN}/de/community/post/${slug}`,
    pl: `${SITE_ORIGIN}/pl/community/post/${slug}`,
    'pt-BR': `${SITE_ORIGIN}/br/community/post/${slug}`,
    es: `${SITE_ORIGIN}/es/community/post/${slug}`,
  };
}

export async function generateMetadata({ params }: PostPageProps) {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    
    if (!post) {
      return {
        title: {
          absolute: 'Post Not Found | Smart Calculator',
        },
        description: 'The requested post could not be found.',
      };
    }

    const headersList = await headers();
    const pathname =
      headersList.get('x-pathname') || `/community/post/${slug}`;
    const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
    const canonicalUrl = `${SITE_ORIGIN}${path}`;
    const description = resolvePostMetaDescription(post);
    
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
      title: {
        absolute: `${post.title} | Community · Smart Calculator`,
      },
      description: description,
      alternates: {
        canonical: canonicalUrl,
        languages: communityPostHreflangLanguages(slug),
      },
      openGraph: {
        title: post.title,
        description: description,
        type: 'article',
        url: canonicalUrl,
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
      title: {
        absolute: 'Community Post | Smart Calculator',
      },
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
