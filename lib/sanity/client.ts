import { client } from './config';
import { blogPostsQuery, blogPostBySlugQuery, allBlogSlugsQuery } from './queries';

export interface BlogPost {
  _id: string;
  blogId: string;
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
}

export async function getAllBlogPosts(language: string = 'en'): Promise<BlogPost[]> {
  try {
    const posts = await client.fetch(blogPostsQuery(language), { language });
    return posts || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string, language: string = 'en'): Promise<BlogPost | null> {
  try {
    const post = await client.fetch(blogPostBySlugQuery(language), { slug, language });
    return post || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function getAllBlogSlugs(): Promise<Array<{ blogId: string; enSlug?: string; brSlug?: string; plSlug?: string; deSlug?: string; esSlug?: string }>> {
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
