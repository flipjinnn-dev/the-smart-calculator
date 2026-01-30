import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ArrowLeft, User, Calendar } from 'lucide-react';
import { getPostBySlug } from '@/lib/actions/post-actions';
import { hasUserReacted } from '@/lib/actions/reaction-actions';
import { getCurrentUser } from '@/lib/auth-utils';
import { CommentSection } from '@/components/community/comment-section';
import { ReactionButton } from '@/components/community/reaction-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/sanity/config';

interface PostPageProps {
  params: {
    slug: string;
  };
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
    const description = post.content?.[0]?.children?.[0]?.text?.substring(0, 160) || 'Read this post on our community platform.';
    
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
        languages: {
          'x-default': postUrl,
          'en': postUrl,
        }
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
            <PortableText value={post.content} />
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
          comments={post.comments || []}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </div>
  );
}
