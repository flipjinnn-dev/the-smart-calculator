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

type SanityCategory = {
  _id: string;
  title: string;
  description?: string;
  slug?: { current?: string };
};

function canonicalCategoryKey(title: string, slug?: string): string {
  const titleKey = title.toLowerCase().trim();
  const slugKey = (slug || "").toLowerCase().trim();

  for (const cat of DEFAULT_BLOG_CATEGORIES) {
    const defaultTitle = cat.title.toLowerCase();
    if (titleKey === defaultTitle || slugKey === cat.slug) {
      return cat.slug;
    }
  }

  return slugKey || titleKey.replace(/\s+/g, "-");
}

function categoryAlreadyExists(
  existing: SanityCategory[],
  cat: (typeof DEFAULT_BLOG_CATEGORIES)[number]
): boolean {
  return existing.some((item) => {
    const key = canonicalCategoryKey(item.title, item.slug?.current);
    return key === cat.slug || item.title.toLowerCase().trim() === cat.title.toLowerCase();
  });
}

function dedupeCategories(categories: SanityCategory[]): SanityCategory[] {
  const seen = new Set<string>();
  const deduped: SanityCategory[] = [];

  for (const category of categories) {
    const key = canonicalCategoryKey(category.title, category.slug?.current);
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(category);
  }

  const order = new Map(
    DEFAULT_BLOG_CATEGORIES.map((cat, index) => [cat.slug, index])
  );

  return deduped.sort((a, b) => {
    const aOrder = order.get(canonicalCategoryKey(a.title, a.slug?.current)) ?? 999;
    const bOrder = order.get(canonicalCategoryKey(b.title, b.slug?.current)) ?? 999;
    if (aOrder !== bOrder) return aOrder - bOrder;
    return a.title.localeCompare(b.title);
  });
}

async function ensureDefaultBlogCategories() {
  const existing = await client.fetch<SanityCategory[]>(
    `*[_type == "category"] { _id, title, slug }`
  );

  for (const cat of DEFAULT_BLOG_CATEGORIES) {
    if (categoryAlreadyExists(existing, cat)) continue;
    try {
      const created = await client.create({
        _type: "category",
        title: cat.title,
        slug: { _type: "slug", current: cat.slug },
      });
      existing.push({
        _id: created._id,
        title: cat.title,
        slug: { current: cat.slug },
      });
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

  const query = `*[_type == "category"] {
    _id,
    title,
    description,
    slug
  }`;

  const categories = await client.fetch<SanityCategory[]>(query);
  return dedupeCategories(categories);
}
