'use server';

import { revalidatePath } from 'next/cache';
import { client as sanityClient } from '@/lib/sanity/config';
import { requireAuth, requireAdmin } from '@/lib/auth-utils';

export async function createComment(postId: string, content: string) {
  const session = await requireAuth();

  if (!content || content.length < 1 || content.length > 1000) {
    return { error: 'Comment must be between 1 and 1000 characters' };
  }

  try {
    const comment = await sanityClient.create({
      _type: 'communityComment',
      content,
      post: {
        _type: 'reference',
        _ref: postId,
      },
      author: {
        _type: 'reference',
        _ref: session.user.userId,
      },
      status: 'pending',
      createdAt: new Date().toISOString(),
    });

    return { success: true, commentId: comment._id };
  } catch (error) {
    console.error('Error creating comment:', error);
    return { error: 'Failed to create comment' };
  }
}

export async function getApprovedComments(postId: string) {
  try {
    const comments = await sanityClient.fetch(
      `*[_type == "communityComment" && post._ref == $postId && status == "approved"] | order(createdAt asc) {
        _id,
        content,
        "author": author->{name, image},
        createdAt
      }`,
      { postId }
    );
    return comments;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
}

export async function getPendingComments() {
  await requireAdmin();
  
  try {
    const comments = await sanityClient.fetch(
      `*[_type == "communityComment" && status == "pending"] | order(createdAt desc) {
        _id,
        content,
        "author": author->{name, email},
        "post": post->{title, slug},
        createdAt
      }`
    );
    return comments;
  } catch (error) {
    console.error('Error fetching pending comments:', error);
    return [];
  }
}

export async function approveComment(commentId: string) {
  await requireAdmin();
  
  try {
    await sanityClient.patch(commentId).set({
      status: 'approved',
      approvedAt: new Date().toISOString(),
    }).commit();
    
    revalidatePath('/community');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error approving comment:', error);
    return { error: 'Failed to approve comment' };
  }
}

export async function rejectComment(commentId: string) {
  await requireAdmin();
  
  try {
    await sanityClient.patch(commentId).set({
      status: 'rejected',
    }).commit();
    
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error rejecting comment:', error);
    return { error: 'Failed to reject comment' };
  }
}

export async function likeComment(commentId: string) {
  const session = await requireAuth();

  try {
    const existingLike = await sanityClient.fetch(
      `*[_type == "commentLike" && comment._ref == $commentId && user._ref == $userId][0]`,
      { commentId, userId: session.user.userId }
    );

    if (existingLike) {
      await sanityClient.delete(existingLike._id);
      revalidatePath('/community');
      return { success: true, liked: false };
    }

    await sanityClient.create({
      _type: 'commentLike',
      comment: {
        _type: 'reference',
        _ref: commentId,
      },
      user: {
        _type: 'reference',
        _ref: session.user.userId,
      },
      createdAt: new Date().toISOString(),
    });

    revalidatePath('/community');
    return { success: true, liked: true };
  } catch (error) {
    console.error('Error liking comment:', error);
    return { error: 'Failed to like comment' };
  }
}

export async function replyToComment(commentId: string, content: string) {
  const session = await requireAuth();

  if (!content || content.length < 1 || content.length > 500) {
    return { error: 'Reply must be between 1 and 500 characters' };
  }

  try {
    const comment = await sanityClient.fetch(
      `*[_type == "communityComment" && _id == $commentId][0]{post}`,
      { commentId }
    );

    if (!comment) {
      return { error: 'Comment not found' };
    }

    const reply = await sanityClient.create({
      _type: 'communityComment',
      content,
      post: comment.post,
      author: {
        _type: 'reference',
        _ref: session.user.userId,
      },
      parentComment: {
        _type: 'reference',
        _ref: commentId,
      },
      status: 'pending',
      createdAt: new Date().toISOString(),
    });

    return { success: true, replyId: reply._id };
  } catch (error) {
    console.error('Error replying to comment:', error);
    return { error: 'Failed to reply to comment' };
  }
}

export async function getCommentLikes(commentId: string) {
  try {
    const likes = await sanityClient.fetch(
      `count(*[_type == "commentLike" && comment._ref == $commentId])`,
      { commentId }
    );
    return likes || 0;
  } catch (error) {
    console.error('Error fetching comment likes:', error);
    return 0;
  }
}

export async function hasUserLikedComment(commentId: string, userId: string) {
  try {
    const like = await sanityClient.fetch(
      `*[_type == "commentLike" && comment._ref == $commentId && user._ref == $userId][0]`,
      { commentId, userId }
    );
    return !!like;
  } catch (error) {
    console.error('Error checking comment like:', error);
    return false;
  }
}
