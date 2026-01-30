'use server';

import { revalidatePath } from 'next/cache';
import { client as sanityClient } from '@/lib/sanity/config';
import { requireAuth, requireAdmin } from '@/lib/auth-utils';

export async function createPost(formData: FormData) {
  const session = await requireAuth();
  
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const images = formData.getAll('images') as File[];

  if (!title || !content) {
    return { error: 'Title and content are required' };
  }

  if (title.length < 10 || title.length > 200) {
    return { error: 'Title must be between 10 and 200 characters' };
  }

  try {
    const uploadedImages = [];
    
    for (const image of images) {
      if (image.size > 0) {
        const imageAsset = await sanityClient.assets.upload('image', image, {
          filename: image.name,
        });
        uploadedImages.push({
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id,
          },
        });
      }
    }

    const contentBlocks = content.split('\n').map(paragraph => ({
      _type: 'block',
      _key: Math.random().toString(36).substring(7),
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: Math.random().toString(36).substring(7),
          text: paragraph,
          marks: [],
        },
      ],
      markDefs: [],
    }));

    const post = await sanityClient.create({
      _type: 'communityPost',
      title,
      slug: {
        _type: 'slug',
        current: title
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .substring(0, 96),
      },
      content: contentBlocks,
      images: uploadedImages,
      author: {
        _type: 'reference',
        _ref: session.user.userId,
      },
      status: 'pending',
      createdAt: new Date().toISOString(),
    });

    revalidatePath('/community');
    return { success: true, postId: post._id };
  } catch (error) {
    console.error('Error creating post:', error);
    return { error: 'Failed to create post' };
  }
}

export async function getApprovedPosts(limit = 20, offset = 0) {
  try {
    const posts = await sanityClient.fetch(
      `*[_type == "communityPost" && status == "approved"] | order(createdAt desc) [$offset...$end] {
        _id,
        title,
        slug,
        content,
        images,
        "author": author->{name, image},
        createdAt,
        "comments": *[_type == "communityComment" && post._ref == ^._id && status == "approved"] | order(createdAt asc) {
          _id,
          content,
          "author": author->{name, image},
          createdAt
        },
        "commentCount": count(*[_type == "communityComment" && post._ref == ^._id && status == "approved"]),
        "reactionCount": count(*[_type == "communityReaction" && post._ref == ^._id])
      }`,
      { offset, end: offset + limit }
    );
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string, includeUnapproved = false) {
  try {
    const statusFilter = includeUnapproved ? '' : '&& status == "approved"';
    
    const query = `*[_type == "communityPost" && slug.current == $slug ${statusFilter}][0] {
      _id,
      title,
      slug,
      content,
      images,
      featuredImage,
      "author": author->{_id, name, image},
      status,
      createdAt,
      "comments": *[_type == "communityComment" && post._ref == ^._id && status == "approved"] | order(createdAt asc) {
        _id,
        content,
        "author": author->{name, image},
        createdAt
      },
      "reactionCount": count(*[_type == "communityReaction" && post._ref == ^._id])
    }`;
    
    const post = await sanityClient.fetch(query, { slug });
    
    return post;
  } catch (error) {
    return null;
  }
}

export async function getPendingPosts() {
  await requireAdmin();
  
  try {
    const posts = await sanityClient.fetch(
      `*[_type == "communityPost" && status == "pending"] | order(createdAt desc) {
        _id,
        title,
        "author": author->{name, email},
        createdAt,
        content,
        images
      }`
    );
    return posts;
  } catch (error) {
    console.error('Error fetching pending posts:', error);
    return [];
  }
}

export async function approvePost(postId: string) {
  await requireAdmin();
  
  try {
    await sanityClient.patch(postId).set({
      status: 'approved',
      approvedAt: new Date().toISOString(),
    }).commit();
    
    revalidatePath('/community');
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error approving post:', error);
    return { error: 'Failed to approve post' };
  }
}

export async function rejectPost(postId: string) {
  await requireAdmin();
  
  try {
    await sanityClient.patch(postId).set({
      status: 'rejected',
    }).commit();
    
    revalidatePath('/admin/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error rejecting post:', error);
    return { error: 'Failed to reject post' };
  }
}

export async function getUserReaction(postId: string, userId: string) {
  try {
    const reaction = await sanityClient.fetch(
      `*[_type == "communityReaction" && post._ref == $postId && user._ref == $userId][0]`,
      { postId, userId }
    );
    return reaction;
  } catch (error) {
    return null;
  }
}
