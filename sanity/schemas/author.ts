import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline (Short Bio)',
      type: 'text',
      rows: 2,
      description: 'A short description displayed on calculator cards (max 150 chars).',
      validation: (Rule: any) => Rule.max(150),
    }),
    defineField({
      name: 'bio',
      title: 'About (Long Bio)',
      type: 'array', 
      of: [{type: 'block'}],
      description: 'Full biography displayed on the creator profile page.',
    }),
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
        { name: 'twitter', title: 'Twitter/X URL', type: 'url' },
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'website', title: 'Personal Website', type: 'url' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
});
