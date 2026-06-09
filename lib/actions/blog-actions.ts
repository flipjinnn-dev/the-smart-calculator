'use server';

import { client } from '@/lib/sanity/config';
import { revalidatePath } from 'next/cache';

/** Blog categories aligned with site calculator sections. Missing ones are created in Sanity on fetch. */
const DEFAULT_BLOG_CATEGORIES = [
  { title: 'Financial', slug: 'financial' },
  { title: 'Health & Fitness', slug: 'health' },
  { title: 'Math', slug: 'math' },
  { title: 'Physics', slug: 'physics' },
  { title: 'Construction', slug: 'construction' },
  { title: 'Food', slug: 'food' },
  { title: 'Sports', slug: 'sports' },
  { title: 'Games', slug: 'games' },
  { title: 'Business', slug: 'business' },
  { title: 'Software', slug: 'software' },
  { title: 'Other', slug: 'other' },
] as const;

async function ensureDefaultBlogCategories() {
  const existing = await client.fetch<
    { _id: string; title: string; slug?: { current?: string } }[]
  >(`*[_type == "category"] { _id, title, slug }`);

  const existingSlugs = new Set(
    existing.map((c) => (c.slug?.current || c.title).toLowerCase())
  );

  for (const cat of DEFAULT_BLOG_CATEGORIES) {
    if (existingSlugs.has(cat.slug)) continue;
    try {
      await client.create({
        _type: 'category',
        title: cat.title,
        slug: { _type: 'slug', current: cat.slug },
      });
      existingSlugs.add(cat.slug);
    } catch (error) {
      console.error(`Failed to create blog category "${cat.title}":`, error);
    }
  }
}

export async function getAllBlogs() {
  const query = `*[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    author->{name, image},
    categories[]->{title},
    featuredImage
  }`;
  
  return await client.fetch(query);
}

export async function getBlogById(id: string) {
  const query = `*[_type == "blog" && _id == $id][0] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    author->{_id, name},
    categories[]->{_id, title},
    publishedAt,
    body,
    htmlBody,
    metaTitle,
    metaDescription,
    keywords,
    schemaMarkup
  }`;
  
  return await client.fetch(query, { id });
}

export async function createBlog(data: any) {
  try {
    const result = await client.create({
      _type: 'blog',
      ...data,
      publishedAt: data.publishedAt || new Date().toISOString(),
    });
    
    revalidatePath('/admin/dashboard');
    revalidatePath('/blogs');
    if (data.slug?.current) {
      revalidatePath(`/${data.slug.current}`);
    }
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateBlog(id: string, data: any) {
  try {
    const result = await client.patch(id).set(data).commit();
    
    revalidatePath('/admin/dashboard');
    revalidatePath('/blogs');
    if (data.slug?.current) {
      revalidatePath(`/${data.slug.current}`);
    }
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteBlog(id: string) {
  try {
    await client.delete(id);
    
    revalidatePath('/admin/dashboard');
    revalidatePath('/blogs');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getAllAuthors() {
  const query = `*[_type == "author"] {
    _id,
    name,
    image
  }`;
  
  return await client.fetch(query);
}

export async function getAllCategories() {
  await ensureDefaultBlogCategories();

  const query = `*[_type == "category"] | order(title asc) {
    _id,
    title,
    description
  }`;

  return await client.fetch(query);
}
