'use server';

import { revalidatePath } from 'next/cache';
import { client as sanityClient } from '@/lib/sanity/config';
import { requireAuth } from '@/lib/auth-utils';

export async function toggleReaction(postId: string) {
  const session = await requireAuth();
  const userId = session.user.userId;

  try {
    const existingReaction = await sanityClient.fetch(
      `*[_type == "communityReaction" && post._ref == $postId && user._ref == $userId][0]`,
      { postId, userId }
    );

    if (existingReaction) {
      await sanityClient.delete(existingReaction._id);
      revalidatePath('/community');
      return { success: true, action: 'removed' };
    } else {
      await sanityClient.create({
        _type: 'communityReaction',
        post: {
          _type: 'reference',
          _ref: postId,
        },
        user: {
          _type: 'reference',
          _ref: userId,
        },
        type: 'like',
        createdAt: new Date().toISOString(),
      });
      revalidatePath('/community');
      return { success: true, action: 'added' };
    }
  } catch (error) {
    console.error('Error toggling reaction:', error);
    return { error: 'Failed to toggle reaction' };
  }
}

export async function getReactionCount(postId: string) {
  try {
    const count = await sanityClient.fetch(
      `count(*[_type == "communityReaction" && post._ref == $postId])`,
      { postId }
    );
    return count;
  } catch (error) {
    console.error('Error fetching reaction count:', error);
    return 0;
  }
}

export async function hasUserReacted(postId: string, userId: string) {
  try {
    const reaction = await sanityClient.fetch(
      `*[_type == "communityReaction" && post._ref == $postId && user._ref == $userId][0]`,
      { postId, userId }
    );
    return !!reaction;
  } catch (error) {
    return false;
  }
}
