import { client } from './config';
import { blogPostsQuery, blogPostBySlugQuery, allBlogSlugsQuery } from './queries';

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  publishedAt: string;
  author?: {
    name: string;
    image?: string;
    bio?: string;
  };
  categories?: Array<{
    title: string;
  }>;
  body?: any;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  schemaMarkup?: {
    language: string;
    code: string;
  };
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await client.fetch(blogPostsQuery());
    return posts || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const post = await client.fetch(blogPostBySlugQuery(), { slug });
    return post || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function getAllBlogSlugs(): Promise<Array<{ _id: string; slug: string }>> {
  try {
    const slugs = await client.fetch(allBlogSlugsQuery);
    return slugs || [];
  } catch (error) {
    console.error('Error fetching blog slugs:', error);
    return [];
  }
}

export async function getAuthorBySlug(slug: string) {
  try {
    const { authorBySlugQuery } = await import('./queries');
    const author = await client.fetch(authorBySlugQuery, { slug });
    return author || null;
  } catch (error) {
    console.error('Error fetching author:', error);
    return null;
  }
}
