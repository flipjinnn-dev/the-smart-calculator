# Sanity CMS Content Best Practices - SEO & Security

## 🎯 Purpose

This document outlines best practices for managing content in Sanity CMS to prevent SEO issues and security vulnerabilities.

---

## ⚠️ Current Issue (Root Cause)

**Problem:** Authors/editors paste full HTML (including `<meta>`, `<title>`, `<script>` tags) into Sanity content fields.

**Impact:**
- Meta tags appear in `<body>` instead of `<head>`
- Duplicate/conflicting SEO metadata
- Potential XSS security risks
- Poor social sharing previews
- Google indexing issues

**Current Workaround:** `stripHeadElements()` function removes dangerous tags before rendering.

**Long-term Solution:** Prevent the issue at the source (Sanity schema level).

---

## ✅ Recommended Sanity Schema Structure

### 1️⃣ Blog Posts Schema

```typescript
// sanity/schemas/blog.ts

export default defineType({
  name: 'blog',
  title: 'Blog Post',
  type: 'document',
  fields: [
    // Basic Content
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Plain text summary (max 200 chars) - used for meta description fallback',
      validation: (Rule) => Rule.required().max(200),
    }),
    
    // ✅ RECOMMENDED: Use Portable Text (NOT raw HTML)
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [{ name: 'href', type: 'url', title: 'URL' }],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        },
      ],
    }),
    
    // ⚠️ LEGACY ONLY: HTML field for migration
    defineField({
      name: 'htmlBody',
      title: 'HTML Body (Legacy)',
      type: 'text',
      description: '⚠️ DEPRECATED: Only use for migrated content. New posts should use "Body Content" above.',
      hidden: ({ document }) => !document?.htmlBody, // Hide if empty
    }),
    
    // ✅ SEPARATE SEO FIELDS (CRITICAL)
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'SEO title (max 60 chars) - appears in <head>',
          validation: (Rule) => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'SEO description (max 160 chars) - appears in <head>',
          validation: (Rule) => Rule.max(160),
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'string',
          description: 'Comma-separated keywords',
        },
        {
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Social sharing image (1200×630px recommended)',
          options: { hotspot: true },
        },
      ],
    }),
    
    // Featured Image
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
    }),
    
    // Author & Categories
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
    }),
    
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
```

### 2️⃣ Community Posts Schema

```typescript
// sanity/schemas/community-post.ts

export default defineType({
  name: 'communityPost',
  title: 'Community Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(10).max(200),
    }),
    
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    
    // ✅ ADD: Plain text excerpt for SEO
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Plain text summary (max 160 chars) - used for meta description',
      validation: (Rule) => Rule.max(160),
    }),
    
    // ✅ RECOMMENDED: Portable Text
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
          },
        },
      ],
    }),
    
    // ⚠️ LEGACY ONLY
    defineField({
      name: 'htmlContent',
      title: 'HTML Content (Legacy)',
      type: 'text',
      description: '⚠️ DEPRECATED: Only for migrated content. Use "Content" field above.',
      hidden: ({ document }) => !document?.htmlContent,
    }),
    
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
    }),
    
    defineField({
      name: 'images',
      title: 'Additional Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
        },
      ],
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
      },
      initialValue: 'pending',
    }),
    
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
});
```

---

## 🛡️ Content Safety Rules

### ✅ DO's

1. **Use Portable Text for all new content**
   - Structured, semantic content
   - No raw HTML injection
   - Safe by default

2. **Separate SEO fields from content**
   - `seo.metaTitle` - NOT in body
   - `seo.metaDescription` - NOT in body
   - `seo.ogImage` - NOT in body

3. **Validate field lengths**
   - Title: max 100 chars
   - Meta title: max 60 chars
   - Meta description: max 160 chars
   - Excerpt: max 200 chars

4. **Use image fields for images**
   - NOT `<img>` tags in HTML
   - Use Sanity's image type with hotspot
   - Automatic optimization & CDN

5. **Add helpful descriptions**
   - Tell editors what each field is for
   - Explain character limits
   - Show examples

### ❌ DON'Ts

1. **Never allow raw HTML paste in main content**
   - No `<meta>` tags
   - No `<script>` tags
   - No `<style>` tags
   - No `<link>` tags

2. **Don't mix SEO metadata with content**
   - Keep them in separate fields
   - Let Next.js handle metadata injection

3. **Don't use HTML for formatting**
   - Use Portable Text styles instead
   - Safer and more maintainable

4. **Don't allow unlimited text fields**
   - Always set max length validations
   - Prevents SEO issues (too long titles/descriptions)

---

## 📋 Migration Strategy

If you have existing content with HTML:

### Step 1: Add excerpt field to existing posts
```typescript
// Add to schema
defineField({
  name: 'excerpt',
  title: 'Excerpt',
  type: 'text',
  description: 'Plain text summary for SEO',
  validation: (Rule) => Rule.max(160),
}),
```

### Step 2: Extract excerpts from existing HTML content
```typescript
// Migration script (run once)
import { client } from '@/lib/sanity/config';

async function migrateExcerpts() {
  const posts = await client.fetch(`*[_type == "communityPost" && !defined(excerpt)]`);
  
  for (const post of posts) {
    // Extract plain text from HTML or Portable Text
    let excerpt = '';
    
    if (post.htmlContent) {
      // Strip HTML tags and get first 160 chars
      excerpt = post.htmlContent
        .replace(/<[^>]*>/g, '')
        .trim()
        .slice(0, 160);
    } else if (post.content?.[0]?.children?.[0]?.text) {
      excerpt = post.content
        .flatMap(block => block.children ?? [])
        .map(child => child.text)
        .join(' ')
        .slice(0, 160);
    }
    
    if (excerpt) {
      await client.patch(post._id).set({ excerpt }).commit();
      console.log(`Updated excerpt for: ${post.title}`);
    }
  }
}
```

### Step 3: Update queries to fetch excerpt
```typescript
// lib/actions/post-actions.ts
const query = `*[_type == "communityPost" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,  // ✅ Add this
  content,
  htmlContent,
  // ... rest of fields
}`;
```

### Step 4: Update metadata generation
```typescript
// Already implemented ✅
const description = post.excerpt || 
  post.content?.flatMap((block: any) => block.children ?? [])
    .map((child: any) => child.text)
    .filter(Boolean)
    .join(' ')
    .slice(0, 160) || 
  'Read this post on our community platform.';
```

---

## 🔒 Security Considerations

### XSS Prevention

**Current protection:**
```typescript
// stripHeadElements() removes dangerous tags
.replace(/<script\s+[^>]*>[\s\S]*?<\/script>/gi, '')
.replace(/<meta\s+[^>]*\/?>/gi, '')
// etc.
```

**Better approach:**
- Use Portable Text (no HTML injection possible)
- Sanity's built-in XSS protection
- Content Security Policy headers

### Content Validation

Add Sanity validation rules:
```typescript
validation: (Rule) => Rule.custom((value) => {
  if (typeof value === 'string' && value.includes('<script')) {
    return 'Script tags are not allowed';
  }
  if (typeof value === 'string' && value.includes('<meta')) {
    return 'Meta tags should be in SEO settings, not content';
  }
  return true;
}),
```

---

## 📊 SEO Checklist

Before publishing any post, verify:

- [ ] Title is 50-60 characters
- [ ] Meta description is 150-160 characters
- [ ] Featured image is set (1200×630px)
- [ ] Excerpt is plain text (no HTML)
- [ ] Content uses Portable Text (not raw HTML)
- [ ] No `<meta>`, `<script>`, or `<style>` tags in content
- [ ] Author is assigned
- [ ] Categories/tags are set
- [ ] Slug is SEO-friendly (lowercase, hyphens)

---

## 🎯 Next Steps

### Immediate Actions

1. ✅ **Current workaround is working** - `stripHeadElements()` prevents issues
2. ✅ **Description extraction improved** - Now uses `excerpt` field first
3. ⚠️ **Add excerpt field to Sanity schema** (if not already present)
4. ⚠️ **Run migration script** to populate excerpts for existing posts

### Long-term Improvements

1. **Update Sanity schemas** to follow best practices above
2. **Hide/deprecate HTML fields** for new content
3. **Add validation rules** to prevent HTML injection
4. **Train content editors** on proper content structure
5. **Set up content review process** before publishing

---

## 📚 Resources

- [Sanity Portable Text](https://www.sanity.io/docs/presenting-block-text)
- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Google SEO Guidelines](https://developers.google.com/search/docs)
- [Open Graph Protocol](https://ogp.me/)

---

**Last Updated:** Feb 22, 2026  
**Status:** ✅ Workaround Active, Schema Improvements Recommended
