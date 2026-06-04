import "server-only";
import { unstable_cache } from "next/cache";
import { client as sanityClient } from "@/lib/sanity/config";
import { getPostBySlug } from "@/lib/actions/post-actions";

export type CommunityPostMeta = {
  title: string;
  excerpt?: string | null;
  content?: unknown;
  htmlContent?: string | null;
  featuredImage?: {
    asset?: unknown;
  } | null;
};

async function fetchCommunityPostMeta(
  slug: string
): Promise<CommunityPostMeta | null> {
  try {
    const query = `*[_type == "communityPost" && slug.current == $slug && status == "approved"][0] {
    title,
    excerpt,
    content,
    htmlContent,
    featuredImage
  }`;
    return await sanityClient.fetch(query, { slug });
  } catch {
    return null;
  }
}

/** Cached meta fetch so generateMetadata resolves before <head> is sent. */
export function getCachedCommunityPostMeta(slug: string) {
  return unstable_cache(
    () => fetchCommunityPostMeta(slug),
    ["community-post-meta", slug],
    { revalidate: 300, tags: [`community-post-${slug}`] }
  )();
}

export function getCachedCommunityPostFull(slug: string) {
  return unstable_cache(
    async () => {
      try {
        return await getPostBySlug(slug);
      } catch {
        return null;
      }
    },
    ["community-post-full", slug],
    { revalidate: 300, tags: [`community-post-${slug}`] }
  )();
}
