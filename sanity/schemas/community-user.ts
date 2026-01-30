import { defineField, defineType } from 'sanity';
import { UserIcon } from 'lucide-react';

export default defineType({
  name: 'communityUser',
  title: 'Community User',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'url',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          { title: 'User', value: 'user' },
          { title: 'Admin', value: 'admin' },
        ],
        layout: 'radio',
      },
      initialValue: 'user',
      validation: (Rule) => Rule.required(),
      readOnly: ({ currentUser }) => {
        return !currentUser?.roles?.find((role) => role.name === 'administrator');
      },
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
      title: 'name',
      subtitle: 'email',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle,
      };
    },
  },
});
