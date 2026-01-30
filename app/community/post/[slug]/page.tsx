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
    const post = await getPostBySlug(params.slug);
    
    if (!post) {
      return {
        title: 'Post Not Found - Community',
        description: 'The requested post could not be found.',
      };
    }

    return {
      title: `${post.title} - Community`,
      description: post.content?.[0]?.children?.[0]?.text?.substring(0, 160) || 'Read this post on our community platform.',
    };
  } catch (error) {
    return {
      title: 'Community Post',
      description: 'Community discussion platform',
    };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  // Redirect to community page - all posts are now displayed inline
  const { redirect } = await import('next/navigation');
  redirect('/community');
}
