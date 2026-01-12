import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'wordle',
    title: 'Wordle Game',
    type: 'document',
    fields: [
        defineField({
            name: 'wordleNumber',
            title: 'Wordle Number',
            type: 'number',
            description: 'The official Wordle puzzle number (e.g., 1668)',
            validation: (Rule) => Rule.required().positive().integer(),
        }),
        defineField({
            name: 'date',
            title: 'Puzzle Date',
            type: 'date',
            description: 'The date this Wordle puzzle is for',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'solution',
            title: 'Solution Word',
            type: 'string',
            description: 'The 5-letter answer for this puzzle (lowercase)',
            validation: (Rule) =>
                Rule.required()
                    .length(5)
                    .lowercase()
                    .regex(/^[a-z]{5}$/, { name: 'lowercase-letters-only' }),
        }),
        defineField({
            name: 'difficulty',
            title: 'Difficulty Level',
            type: 'string',
            options: {
                list: [
                    { title: 'Easy', value: 'easy' },
                    { title: 'Medium', value: 'medium' },
                    { title: 'Hard', value: 'hard' },
                ],
                layout: 'radio',
            },
        }),
        defineField({
            name: 'hints',
            title: 'Hints',
            type: 'array',
            description: 'Optional hints for players (not shown by default)',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'gamePageMetadata',
            title: 'Game Page Metadata (/games/wordle)',
            type: 'object',
            description: 'SEO metadata for the Wordle game page',
            fields: [
                {
                    name: 'metaTitle',
                    title: 'Meta Title',
                    type: 'string',
                    description: 'Page title for SEO (max 60 characters)',
                    validation: (Rule) => Rule.max(60),
                },
                {
                    name: 'metaDescription',
                    title: 'Meta Description',
                    type: 'text',
                    description: 'Page description for SEO (max 160 characters)',
                    validation: (Rule) => Rule.max(160),
                },
                {
                    name: 'keywords',
                    title: 'Keywords',
                    type: 'array',
                    of: [{ type: 'string' }],
                    description: 'SEO keywords for the game page',
                },
                {
                    name: 'ogImage',
                    title: 'Open Graph Image',
                    type: 'url',
                    description: 'Social media share image URL',
                },
            ],
        }),
        defineField({
            name: 'archivePageMetadata',
            title: 'Archive Page Metadata (/games/what-is-the-wordle-today)',
            type: 'object',
            description: 'SEO metadata for the Wordle archive/history page',
            fields: [
                {
                    name: 'metaTitle',
                    title: 'Meta Title',
                    type: 'string',
                    description: 'Page title for SEO (max 60 characters)',
                    validation: (Rule) => Rule.max(60),
                },
                {
                    name: 'metaDescription',
                    title: 'Meta Description',
                    type: 'text',
                    description: 'Page description for SEO (max 160 characters)',
                    validation: (Rule) => Rule.max(160),
                },
                {
                    name: 'keywords',
                    title: 'Keywords',
                    type: 'array',
                    of: [{ type: 'string' }],
                    description: 'SEO keywords for the archive page',
                },
                {
                    name: 'ogImage',
                    title: 'Open Graph Image',
                    type: 'url',
                    description: 'Social media share image URL',
                },
            ],
        }),
        defineField({
            name: 'statisticsData',
            title: 'Statistics & Analytics',
            type: 'object',
            description: 'Data about player performance on this puzzle',
            fields: [
                {
                    name: 'totalAttempts',
                    title: 'Total Attempts',
                    type: 'number',
                    description: 'How many people played this puzzle',
                },
                {
                    name: 'averageGuesses',
                    title: 'Average Guesses',
                    type: 'number',
                    description: 'Average number of guesses to solve',
                },
                {
                    name: 'winRate',
                    title: 'Win Rate',
                    type: 'number',
                    description: 'Percentage of players who solved it',
                },
            ],
        }),
        defineField({
            name: 'isActive',
            title: 'Is Active',
            type: 'boolean',
            description: 'Show this puzzle on the site',
            initialValue: true,
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            description: 'When this puzzle becomes available',
        }),
    ],
    preview: {
        select: {
            title: 'solution',
            subtitle: 'date',
            number: 'wordleNumber',
        },
        prepare({ title, subtitle, number }) {
            return {
                title: `#${number} - ${title?.toUpperCase() || 'No solution'}`,
                subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : 'No date',
            };
        },
    },
    orderings: [
        {
            title: 'Newest First',
            name: 'newestFirst',
            by: [{ field: 'wordleNumber', direction: 'desc' }],
        },
        {
            title: 'Oldest First',
            name: 'oldestFirst',
            by: [{ field: 'wordleNumber', direction: 'asc' }],
        },
    ],
});
