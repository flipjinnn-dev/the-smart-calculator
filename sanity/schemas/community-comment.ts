import { defineField, defineType } from 'sanity';
import { MessageSquareIcon } from 'lucide-react';

export default defineType({
  name: 'communityComment',
  title: 'Community Comment',
  type: 'document',
  icon: MessageSquareIcon,
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      validation: (Rule) => Rule.required().min(1).max(1000),
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'communityPost' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'communityUser' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Approved', value: 'approved' },
          { title: 'Rejected', value: 'rejected' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: 'approvedAt',
      title: 'Approved At',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      content: 'content',
      author: 'author.name',
      status: 'status',
      post: 'post.title',
    },
    prepare(selection) {
      const { content, author, status, post } = selection;
      return {
        title: content.substring(0, 50) + (content.length > 50 ? '...' : ''),
        subtitle: `${author || 'Unknown'} on "${post}" - ${status}`,
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
