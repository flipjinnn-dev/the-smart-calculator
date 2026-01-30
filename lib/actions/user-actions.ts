'use server';

import { client as sanityClient } from '@/lib/sanity/config';

export async function getUserByName(name: string) {
  try {
    console.log('[DEBUG] Looking for user with name:', name);
    
    const user = await sanityClient.fetch(
      `*[_type == "communityUser" && lower(name) == lower($name)][0] {
        _id,
        name,
        email,
        image,
        role,
        createdAt
      }`,
      { name }
    );
    
    if (user) {
      console.log('[DEBUG] User found:', user.name, user._id);
    } else {
      console.log('[DEBUG] User not found. Searching for similar names...');
      const allUsers = await sanityClient.fetch(`*[_type == "communityUser"][0...5] { name }`);
      console.log('[DEBUG] Sample users in database:', allUsers.map((u: any) => u.name));
    }
    
    return user;
  } catch (error) {
    console.error('[ERROR] getUserByName failed:', error);
    return null;
  }
}

export async function getUserPosts(userId: string, limit = 20) {
  try {
    const posts = await sanityClient.fetch(
      `*[_type == "communityPost" && author._ref == $userId && status == "approved"] | order(createdAt desc) [0...$limit] {
        _id,
        title,
        slug,
        content,
        featuredImage,
        createdAt,
        "commentCount": count(*[_type == "communityComment" && post._ref == ^._id && status == "approved"]),
        "reactionCount": count(*[_type == "communityReaction" && post._ref == ^._id])
      }`,
      { userId, limit }
    );
    return posts;
  } catch (error) {
    console.error('Error fetching user posts:', error);
    return [];
  }
}

export async function getUserStats(userId: string) {
  try {
    const stats = await sanityClient.fetch(
      `{
        "totalPosts": count(*[_type == "communityPost" && author._ref == $userId && status == "approved"]),
        "totalComments": count(*[_type == "communityComment" && author._ref == $userId && status == "approved"]),
        "totalReactions": count(*[_type == "communityReaction" && user._ref == $userId])
      }`,
      { userId }
    );
    return stats;
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return { totalPosts: 0, totalComments: 0, totalReactions: 0 };
  }
}
