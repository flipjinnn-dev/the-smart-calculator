import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'calculator',
  title: 'Calculator',
  type: 'document',
  fields: [
    defineField({
      name: 'calculatorId',
      title: 'Calculator ID (Internal)',
      type: 'string',
      description: 'Unique identifier for this calculator across all languages',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title (Shared/Internal)',
      type: 'string',
    }),
    defineField({
      name: 'author',
      title: 'Creator/Author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'ratingTotal',
      title: 'Total Rating Score',
      type: 'number',
      initialValue: 0,
      readOnly: true, // Should only be updated via API
      description: 'Sum of all ratings',
    }),
    defineField({
      name: 'ratingCount',
      title: 'Number of Ratings',
      type: 'number',
      initialValue: 0,
      readOnly: true, // Should only be updated via API
      description: 'Total number of users who rated',
    }),
    // Categories or other metadata can go here
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'calculatorId',
    },
  },
});
