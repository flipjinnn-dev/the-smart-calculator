import type { Metadata } from "next";
import { getCachedCommunityPostMeta } from "@/lib/community-post-meta";
import { urlFor } from "@/lib/sanity/config";

const SITE_ORIGIN = "https://www.thesmartcalculator.com";
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;

function stripHeadElements(html: string): string {
  if (!html) return html;
  return html
    .replace(/<meta\s+[^>]*\/?>/gi, "")
    .replace(/<meta\s+[^>]*>.*?<\/meta>/gi, "")
    .replace(/<link\b[\s\S]*?>/gi, "")
    .replace(/<\/link>/gi, "")
    .replace(/<title\s*[^>]*>[\s\S]*?<\/title>/gi, "")
    .replace(/<script\s+[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\s+[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<head\s*[^>]*>[\s\S]*?<\/head>/gi, "")
    .trim();
}

function decodeBasicHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function extractEmbeddedMetaDescription(html: string): string | null {
  if (!html) return null;
  let m = html.match(
    /<meta\b[^>]*\bname\s*=\s*["']description["'][^>]*\bcontent\s*=\s*["']([^"']*)["'][^>]*\/?>/i
  );
  if (m?.[1]) return decodeBasicHtmlEntities(m[1]).trim();
  m = html.match(
    /<meta\b[^>]*\bcontent\s*=\s*["']([^"']*)["'][^>]*\bname\s*=\s*["']description["'][^>]*\/?>/i
  );
  if (m?.[1]) return decodeBasicHtmlEntities(m[1]).trim();
  return null;
}

function plainTextFromHtml(html: string, maxLen: number): string {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > maxLen ? text.slice(0, maxLen).trimEnd() : text;
}

function resolvePostMetaDescription(post: {
  excerpt?: string | null;
  content?: unknown;
  htmlContent?: string | null;
}): string {
  const excerpt = post.excerpt?.trim();
  if (excerpt) return excerpt.slice(0, 160);

  const content = post.content as
    | { children?: { text?: string }[] }[]
    | undefined;
  const fromPortable =
    content
      ?.flatMap((block) => block.children ?? [])
      .map((child) => child.text)
      .filter(Boolean)
      .join(" ")
      .trim()
      .slice(0, 160) || "";

  const embedded = post.htmlContent
    ? extractEmbeddedMetaDescription(post.htmlContent)
    : null;
  if (embedded) return embedded.slice(0, 160);

  const cleanedHtml = post.htmlContent ? stripHeadElements(post.htmlContent) : "";
  const fromBody = cleanedHtml ? plainTextFromHtml(cleanedHtml, 160) : "";

  if (fromPortable) return fromPortable;
  if (fromBody.length >= 20) return fromBody;

  return "Read this post on our community platform.";
}

function communityPostHreflangLanguages(slug: string): Record<string, string> {
  const enUrl = `${SITE_ORIGIN}/community/post/${slug}`;
  return {
    "x-default": enUrl,
    en: enUrl,
    de: `${SITE_ORIGIN}/de/community/post/${slug}`,
    pl: `${SITE_ORIGIN}/pl/community/post/${slug}`,
    "pt-BR": `${SITE_ORIGIN}/br/community/post/${slug}`,
    es: `${SITE_ORIGIN}/es/community/post/${slug}`,
  };
}

export async function buildCommunityPostMetadata(
  slug: string
): Promise<Metadata> {
  try {
    const post = await getCachedCommunityPostMeta(slug);

    if (!post) {
      return {
        title: { absolute: "Post Not Found | Smart Calculator" },
        description: "The requested post could not be found.",
      };
    }

    const canonicalUrl = `${SITE_ORIGIN}/community/post/${slug}`;
    const description = resolvePostMetaDescription(post);

    let ogImage = DEFAULT_OG_IMAGE;
    try {
      if (post.featuredImage?.asset) {
        ogImage = urlFor(post.featuredImage).width(1200).height(630).url();
      }
    } catch {
      // default og image
    }

    return {
      metadataBase: new URL(SITE_ORIGIN),
      title: { absolute: `${post.title} | Community · Smart Calculator` },
      description,
      alternates: {
        canonical: canonicalUrl,
        languages: communityPostHreflangLanguages(slug),
      },
      openGraph: {
        title: post.title,
        description,
        type: "article",
        url: canonicalUrl,
        siteName: "Smart Calculator",
        locale: "en_US",
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
        card: "summary_large_image",
        title: post.title,
        description,
        images: [ogImage],
      },
    };
  } catch {
    return {
      title: { absolute: "Community Post | Smart Calculator" },
      description: "Community discussion platform",
    };
  }
}
