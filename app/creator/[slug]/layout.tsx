import { notFound } from 'next/navigation';
import { getAuthorBySlug } from '@/lib/sanity/client';
import type { Metadata } from 'next';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  
  const author = await getAuthorBySlug(slug);
  
  if (!author) {
    return {
      title: 'Creator Not Found',
      description: 'The requested creator profile could not be found.',
    };
  }

  const baseUrl = 'https://www.thesmartcalculator.com';
  const canonicalUrl = `${baseUrl}/creator/${slug}`;
  
  const bioText = Array.isArray(author.bio) 
    ? 'Expert contributor creating high-quality calculators and content.'
    : typeof author.bio === 'string' 
    ? author.bio 
    : 'Expert contributor creating high-quality calculators and content.';

  return {
    title: `${author.name} - Creator Profile | Smart Calculator`,
    description: author.tagline || bioText,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${author.name} - Creator Profile`,
      description: author.tagline || bioText,
      url: canonicalUrl,
      siteName: 'Smart Calculator',
      images: author.image ? [
        {
          url: author.image,
          width: 800,
          height: 800,
          alt: author.name,
        },
      ] : [],
      locale: 'en_US',
      type: 'profile',
    },
    twitter: {
      card: 'summary',
      title: `${author.name} - Creator Profile`,
      description: author.tagline || bioText,
      images: author.image ? [author.image] : [],
    },
  };
}

export default async function CreatorLayout({ children, params }: LayoutProps) {
  return <>{children}</>;
}
