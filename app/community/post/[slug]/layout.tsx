import type { ReactNode } from "react";
import type { Metadata } from "next";
import { buildCommunityPostMetadata } from "@/lib/community-post-seo";

export const revalidate = 300;

interface PostLayoutProps {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: Pick<PostLayoutProps, "params">): Promise<Metadata> {
  const { slug } = await params;
  return buildCommunityPostMetadata(slug);
}

export default function PostLayout({ children }: PostLayoutProps) {
  return children;
}
