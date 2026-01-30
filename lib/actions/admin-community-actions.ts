'use server';

import { client } from '@/lib/sanity/config';
import { revalidatePath } from 'next/cache';

export async function getAllCommunityPosts() {
  const query = `*[_type == "communityPost"] | order(createdAt desc) {
    _id,
    title,
    slug,
    status,
    createdAt,
    approvedAt,
    author->{
      name,
      image,
      email
    },
    "commentCount": count(*[_type == "communityComment" && post._ref == ^._id && status == "approved"]),
    "reactionCount": count(*[_type == "communityReaction" && post._ref == ^._id])
  }`;
  
  return await client.fetch(query);
}

export async function getCommunityPostById(id: string) {
  const query = `*[_type == "communityPost" && _id == $id][0] {
    _id,
    title,
    slug,
    content,
    images,
    author->{
      _id,
      name,
      email,
      image
    },
    status,
    createdAt,
    approvedAt
  }`;
  
  return await client.fetch(query, { id });
}

export async function updateCommunityPost(id: string, data: any) {
  try {
    const result = await client.patch(id).set(data).commit();
    
    revalidatePath('/admin/dashboard');
    revalidatePath('/community');
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteCommunityPost(id: string) {
  try {
    // Delete associated comments and reactions
    const commentsQuery = `*[_type == "communityComment" && post._ref == $postId]._id`;
    const reactionsQuery = `*[_type == "communityReaction" && post._ref == $postId]._id`;
    
    const [commentIds, reactionIds] = await Promise.all([
      client.fetch(commentsQuery, { postId: id }),
      client.fetch(reactionsQuery, { postId: id }),
    ]);
    
    // Delete all related content
    const deleteOperations = [
      ...commentIds.map((id: string) => client.delete(id)),
      ...reactionIds.map((id: string) => client.delete(id)),
      client.delete(id),
    ];
    
    await Promise.all(deleteOperations);
    
    revalidatePath('/admin/dashboard');
    revalidatePath('/community');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getAllCommunityComments() {
  const query = `*[_type == "communityComment"] | order(createdAt desc) {
    _id,
    content,
    status,
    createdAt,
    approvedAt,
    author->{
      name,
      image,
      email
    },
    post->{
      _id,
      title
    }
  }`;
  
  return await client.fetch(query);
}

export async function updateCommunityComment(id: string, data: any) {
  try {
    const result = await client.patch(id).set(data).commit();
    
    revalidatePath('/admin/dashboard');
    revalidatePath('/community');
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteCommunityComment(id: string) {
  try {
    await client.delete(id);
    
    revalidatePath('/admin/dashboard');
    revalidatePath('/community');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
