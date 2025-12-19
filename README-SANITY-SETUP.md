# Sanity CMS Blog Integration - Setup Guide

This document provides instructions for setting up and using the Sanity CMS blog system integrated into your Smart Calculator project.

## 📋 Overview

The blog system is fully integrated with your existing multilingual architecture, supporting all 5 languages (English, Portuguese, Polish, German, Spanish).

## 🔧 Environment Variables

Add the following environment variables to your `.env.local` file:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

You can find these values in your Sanity Studio dashboard.

## 📁 Project Structure

```
├── app/
│   └── (other-pages)/
│       └── blogs/
│           ├── page.tsx              # Blog listing page
│           └── [slug]/
│               └── page.tsx          # Dynamic blog detail page
├── components/
│   └── portable-text.tsx             # PortableText renderer for blog content
├── lib/
│   └── sanity/
│       ├── config.ts                 # Sanity client configuration
│       ├── client.ts                 # Data fetching functions
│       └── queries.ts                # GROQ queries
└── sanity/
    └── schemas/
        ├── blog.ts                   # Blog post schema
        ├── author.ts                 # Author schema
        ├── category.ts               # Category schema
        └── index.ts                  # Schema exports
```

## 🎨 Sanity Studio Setup

### 1. Install Sanity CLI (if not already installed)

```bash
npm install -g @sanity/cli
```

### 2. Initialize Sanity Studio

In a separate directory (or within your project), run:

```bash
npx sanity init
```

Follow the prompts:
- Select your existing project
- Choose a dataset name (e.g., "production")
- Output path: `./studio` (or your preferred location)

### 3. Configure Sanity Studio

In your Sanity Studio directory, update `sanity.config.ts`:

```typescript
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Smart Calculator Blog',

  projectId: 'your_project_id',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
```

### 4. Copy Schemas

Copy the schema files from `sanity/schemas/` in your Next.js project to your Sanity Studio's schema directory.

### 5. Start Sanity Studio

```bash
cd studio
npm run dev
```

Your Sanity Studio will be available at `http://localhost:3333`

## ✍️ Creating Blog Posts

### In Sanity Studio:

1. **Navigate to Blog Posts** in the sidebar
2. **Click "Create new Blog Post"**
3. **Fill in the required fields:**
   - **Language**: Select the language (en, br, pl, de, es)
   - **Title**: Blog post title
   - **Slug**: Auto-generated from title (can be customized)
   - **Excerpt**: Short description (max 200 characters)
   - **Featured Image**: Upload an image with alt text
   - **Body Content**: Rich text editor with support for:
     - Headings (H1-H4)
     - Paragraphs
     - Lists (bullet/numbered)
     - Images with captions
     - Code blocks
     - Links
     - Text formatting (bold, italic, underline, strikethrough)
   - **Author**: Select or create an author
   - **Categories**: Add relevant categories
   - **Published At**: Set publication date/time
   - **SEO Settings**: (Optional but recommended)
     - Meta Title (max 60 characters)
     - Meta Description (max 160 characters)
     - Keywords
     - Open Graph Title
     - Open Graph Description
     - Open Graph Image

4. **Click "Publish"** to make the post live

### Creating the Same Blog in Multiple Languages:

To create multilingual versions of the same blog:

1. Create the blog post in English (or your primary language)
2. Note the slug you used
3. Create a new blog post for each additional language
4. Use the **same slug** for all language versions (this helps with URL consistency)
5. Translate all content fields:
   - Title
   - Excerpt
   - Body content
   - SEO metadata
6. Keep the same featured image or upload localized versions

## 🌐 URL Structure

### Blog Listing Pages:
- English: `/blogs`
- Portuguese: `/br/blogs`
- Polish: `/pl/blogs`
- German: `/de/blogs`
- Spanish: `/es/blogs`

### Blog Detail Pages:
- English: `/blogs/[slug]`
- Portuguese: `/br/blogs/[slug]`
- Polish: `/pl/blogs/[slug]`
- German: `/de/blogs/[slug]`
- Spanish: `/es/blogs/[slug]`

## 🔍 SEO Features

Each blog post includes:

- **Meta Tags**: Title, description, keywords
- **Open Graph**: Social media sharing optimization
- **JSON-LD Schema**: Structured data for search engines
- **Canonical URLs**: Proper language-specific URLs
- **Image Optimization**: Next.js Image component with lazy loading

## 🎨 Styling

The blog pages follow your existing design system:
- Purple/blue gradient theme
- Consistent card layouts
- Responsive design (mobile, tablet, desktop)
- Hover effects and transitions
- Lucide React icons

## 📝 Content Management Best Practices

1. **Consistent Slugs**: Use the same slug across all language versions
2. **SEO Optimization**: Always fill in SEO metadata
3. **Image Alt Text**: Provide descriptive alt text for accessibility
4. **Categories**: Use consistent categories across languages
5. **Publication Dates**: Set appropriate publication dates for scheduling
6. **Author Profiles**: Create author profiles with bios and images

## 🔧 Customization

### Modifying Blog Queries

Edit `lib/sanity/queries.ts` to customize what data is fetched:

```typescript
export const blogPostsQuery = (language: string = 'en') => `
  *[_type == "blog" && language == $language] | order(publishedAt desc) {
    // Add or remove fields as needed
  }
`;
```

### Styling Blog Pages

Blog pages use Tailwind CSS classes. Modify:
- `app/(other-pages)/blogs/page.tsx` - Listing page
- `app/(other-pages)/blogs/[slug]/page.tsx` - Detail page
- `components/portable-text.tsx` - Content rendering

### Adding New Content Types

To add new schemas (e.g., tags, series):

1. Create schema file in `sanity/schemas/`
2. Export from `sanity/schemas/index.ts`
3. Update queries in `lib/sanity/queries.ts`
4. Update TypeScript interfaces in `lib/sanity/client.ts`

## 🚀 Deployment

### Deploying Sanity Studio

```bash
cd studio
npm run build
npx sanity deploy
```

Your studio will be available at `https://your-project.sanity.studio`

### Deploying Next.js App

Ensure environment variables are set in your deployment platform (Vercel, Netlify, etc.):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

## 🐛 Troubleshooting

### "Cannot find module 'sanity'" errors in schema files

These errors are expected in your Next.js project. The schema files are meant to be used in your Sanity Studio, not in the Next.js app. You can safely ignore these TypeScript errors or exclude the `sanity/` directory from your `tsconfig.json`.

### Blog posts not showing up

1. Check that posts are published (not drafts)
2. Verify the language field matches the current page language
3. Check Sanity Studio for any validation errors
4. Verify environment variables are set correctly

### Images not loading

1. Ensure images are uploaded to Sanity
2. Check that `urlFor` function is working in `lib/sanity/config.ts`
3. Verify Sanity project ID is correct

## 📚 Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Portable Text](https://www.sanity.io/docs/presenting-block-text)
- [Next.js Integration](https://www.sanity.io/plugins/next-sanity)

## ✅ Verification Checklist

- [ ] Environment variables configured
- [ ] Sanity Studio running and accessible
- [ ] Blog schema imported to Sanity Studio
- [ ] Author and Category schemas set up
- [ ] Test blog post created in all languages
- [ ] Blog listing page accessible at `/blogs`
- [ ] Blog detail pages loading correctly
- [ ] SEO metadata appearing in page source
- [ ] Images loading and optimized
- [ ] Multilingual routing working correctly
- [ ] Mobile responsive design verified

---

**Need Help?** Refer to the Sanity documentation or check the implementation in the codebase for examples.
