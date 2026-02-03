import { defineField, defineType } from 'sanity';
import { ThumbsUpIcon } from 'lucide-react';

export default defineType({
  name: 'commentLike',
  title: 'Comment Like',
  type: 'document',
  icon: ThumbsUpIcon,
  fields: [
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'reference',
      to: [{ type: 'communityComment' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'communityUser' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      user: 'user.name',
      comment: 'comment.content',
    },
    prepare(selection) {
      const { user, comment } = selection;
      return {
        title: `${user || 'Unknown'} liked a comment`,
        subtitle: comment?.substring(0, 50) + (comment?.length > 50 ? '...' : ''),
      };
    },
  },
  orderings: [
    {
      title: 'Created Date, New',
      name: 'createdAtDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
  ],
});
