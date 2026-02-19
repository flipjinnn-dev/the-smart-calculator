'use server';

import { client } from '@/lib/sanity/config';
import { revalidatePath } from 'next/cache';

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
  const query = `*[_type == "category"] {
    _id,
    title,
    description
  }`;
  
  return await client.fetch(query);
}
