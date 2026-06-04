import "server-only";
import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { getBlogPostBySlug, type BlogPost } from "@/lib/sanity/client";
import { SITE_ORIGIN } from "@/lib/seo-hreflang";

const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;

function getCachedBlogPostMeta(slug: string) {
  return unstable_cache(
    () => getBlogPostBySlug(slug),
    ["blog-post-meta", slug],
    { revalidate: 300, tags: [`blog-post-${slug}`] }
  )();
}

export async function buildBlogPostMetadata(slug: string): Promise<Metadata> {
  let post: BlogPost | null = null;
  try {
    post = await getCachedBlogPostMeta(slug);
  } catch (error) {
    console.error(`Error fetching blog post metadata for slug "${slug}":`, error);
  }

  if (!post) {
    return {
      title: { absolute: "Blog Post Not Found | Smart Calculator" },
      description: "The requested blog post could not be found.",
    };
  }

  const metaTitle = (post.metaTitle || post.title).trim();
  const metaDescription =
    (post.metaDescription || post.excerpt || "").trim() ||
    "Read this article on Smart Calculator.";
  const canonicalUrl = `${SITE_ORIGIN}/${slug}`;
  const ogImage = post.featuredImage?.trim() || DEFAULT_OG_IMAGE;
  const ogImageAlt = post.featuredImageAlt?.trim() || metaTitle;

  return {
    metadataBase: new URL(SITE_ORIGIN),
    title: { absolute: metaTitle },
    description: metaDescription,
    ...(post.keywords?.trim() ? { keywords: post.keywords.trim() } : {}),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "x-default": canonicalUrl,
        en: canonicalUrl,
      },
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "article",
      url: canonicalUrl,
      siteName: "Smart Calculator",
      locale: "en_US",
      publishedTime: post.publishedAt,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [ogImage],
    },
  };
}
