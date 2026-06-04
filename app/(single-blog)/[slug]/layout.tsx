import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildBlogPostMetadata } from "@/lib/blog-post-seo";
import { getAllBlogSlugs } from "@/lib/sanity/client";

export const revalidate = 300;
export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const slugs = await getAllBlogSlugs();
    return slugs.map((entry) => ({ slug: entry.slug }));
  } catch {
    return [];
  }
}

interface BlogPostLayoutProps {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: Pick<BlogPostLayoutProps, "params">): Promise<Metadata> {
  const { slug } = await params;
  return buildBlogPostMetadata(slug);
}

export default function BlogPostLayout({ children }: BlogPostLayoutProps) {
  return children;
}
