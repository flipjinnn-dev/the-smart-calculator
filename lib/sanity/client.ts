import { client } from './config';
import { blogPostsQuery, blogPostBySlugQuery, allBlogSlugsQuery, allAuthorsQuery } from './queries';

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  htmlBody?: string;
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

export interface Author {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  tagline?: string;
  social?: {
    email?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    website?: string;
  };
  postCount?: number;
  calculatorCount?: number;
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

export async function getAllAuthors(): Promise<Author[]> {
  try {
    const authors = await client.fetch(allAuthorsQuery);
    return authors || [];
  } catch (error) {
    console.error('Error fetching authors:', error);
    return [];
  }
}
