import { headers } from "next/headers";
import type { Metadata } from "next";
import Script from "next/script";
import { getAllBlogSlugs } from "@/lib/sanity/client";
import { reverseUrlMappings } from "@/middleware";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  // Fetch blog post to get metadata (English only)
  const { getBlogPostBySlug } = await import("@/lib/sanity/client");
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const metaTitle = post.metaTitle || post.title;
  const metaDescription = post.metaDescription || post.excerpt;
  const keywords = post.keywords || "";

  const baseUrl = 'https://www.thesmartcalculator.com';
  const canonicalUrl = `${baseUrl}/${slug}`;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': canonicalUrl,
        'x-default': canonicalUrl,
      },
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "article",
      url: canonicalUrl,
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
      publishedTime: post.publishedAt,
      locale: 'en_US',
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch blog post for JSON-LD (English only)
  const { getBlogPostBySlug } = await import("@/lib/sanity/client");
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return <>{children}</>;
  }

  const baseUrl = 'https://www.thesmartcalculator.com';
  const blogUrl = `${baseUrl}/${slug}`;

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.featuredImage || "",
    "datePublished": post.publishedAt,
    "inLanguage": "en-US",
    "author": {
      "@type": "Person",
      "name": post.author?.name || "Smart Calculator Team",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Smart Calculator",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": blogUrl,
    },
  };

  return (
    <>
      {children}
      <Script
        id="blog-post-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        strategy="afterInteractive"
      />
    </>
  );
}
