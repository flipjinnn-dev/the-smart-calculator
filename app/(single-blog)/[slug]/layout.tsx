import { headers } from "next/headers";
import type { Metadata } from "next";
import Script from "next/script";
import { getAllBlogSlugs } from "@/lib/sanity/client";
import { reverseUrlMappings } from "@/middleware";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const validLanguages = ['br', 'pl', 'de', 'es'];
  const language = langHeader || 'en';

  // Fetch blog post to get metadata
  const { getBlogPostBySlug } = await import("@/lib/sanity/client");
  const post = await getBlogPostBySlug(slug, language);

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const metaTitle = post.metaTitle || post.title;
  const metaDescription = post.metaDescription || post.excerpt;
  const keywords = post.keywords || "";

  // Get all slugs for this blog post to generate hreflang tags
  const allBlogSlugs = await getAllBlogSlugs();
  const currentBlog = allBlogSlugs.find((blog) => 
    blog.enSlug === slug || 
    blog.brSlug === slug || 
    blog.plSlug === slug || 
    blog.deSlug === slug || 
    blog.esSlug === slug
  );

  const baseUrl = 'https://www.thesmartcalculator.com';
  
  // Generate canonical URL based on current language
  let canonicalUrl = `${baseUrl}/${slug}`;
  if (language !== 'en') {
    canonicalUrl = `${baseUrl}/${language}/${slug}`;
  }

  // Generate hreflang alternate URLs
  const alternateLanguages: Record<string, string> = {};
  
  if (currentBlog) {
    if (currentBlog.enSlug) {
      alternateLanguages['en'] = `${baseUrl}/${currentBlog.enSlug}`;
    }
    if (currentBlog.brSlug) {
      alternateLanguages['pt-BR'] = `${baseUrl}/br/${currentBlog.brSlug}`;
    }
    if (currentBlog.plSlug) {
      alternateLanguages['pl'] = `${baseUrl}/pl/${currentBlog.plSlug}`;
    }
    if (currentBlog.deSlug) {
      alternateLanguages['de'] = `${baseUrl}/de/${currentBlog.deSlug}`;
    }
    if (currentBlog.esSlug) {
      alternateLanguages['es'] = `${baseUrl}/es/${currentBlog.esSlug}`;
    }
  }

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLanguages,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "article",
      url: canonicalUrl,
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
      publishedTime: post.publishedAt,
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
  const headerList = await headers();
  const langHeader = headerList.get('x-language');
  const validLanguages = ['br', 'pl', 'de', 'es'];
  const language = langHeader || 'en';

  // Fetch blog post for JSON-LD
  const { getBlogPostBySlug } = await import("@/lib/sanity/client");
  const post = await getBlogPostBySlug(slug, language);

  if (!post) {
    return <>{children}</>;
  }

  const baseUrl = 'https://www.thesmartcalculator.com';
  let blogUrl = `${baseUrl}/${slug}`;
  if (language !== 'en') {
    blogUrl = `${baseUrl}/${language}/${slug}`;
  }

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.featuredImage || "",
    "datePublished": post.publishedAt,
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
