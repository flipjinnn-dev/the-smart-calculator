import { defineField, defineType } from 'sanity';
import { HeartIcon } from 'lucide-react';

export default defineType({
  name: 'communityReaction',
  title: 'Community Reaction',
  type: 'document',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'communityPost' }],
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
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [{ title: 'Like', value: 'like' }],
      },
      initialValue: 'like',
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
      post: 'post.title',
      type: 'type',
    },
    prepare(selection) {
      const { user, post, type } = selection;
      return {
        title: `${user || 'Unknown'} ${type}d`,
        subtitle: post,
      };
    },
  },
});
