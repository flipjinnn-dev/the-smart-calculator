# 🎨 Sanity Studio Setup Guide

## Important: Sanity Studio is a Separate Application

**Sanity Studio is NOT part of your Next.js app.** It's a separate React application that you need to set up independently.

Your Next.js app (Smart Calculator) only uses the Sanity **client** to fetch blog data. The Studio is where you manage/create content.

---

## 🚀 Quick Setup (Two Options)

### Option 1: Separate Studio Directory (Recommended)

1. **Create a new directory for your studio:**
   ```bash
   cd ..
   mkdir smart-calculator-studio
   cd smart-calculator-studio
   ```

2. **Initialize Sanity Studio:**
   ```bash
   npm create sanity@latest
   ```

3. **Follow the prompts:**
   - Login with your Sanity account
   - Select your existing project
   - Choose dataset: `production`
   - Output path: `.` (current directory)
   - Template: Clean project with no predefined schemas

4. **Copy your schemas:**
   Copy the files from `smart-calculator/sanity/schemas/` to `smart-calculator-studio/schemas/`
   - `blog.ts`
   - `author.ts`
   - `category.ts`
   - `index.ts`

5. **Update `sanity.config.ts`:**
   ```typescript
   import {defineConfig} from 'sanity'
   import {deskTool} from 'sanity/desk'
   import {visionTool} from '@sanity/vision'
   import {schemaTypes} from './schemas'

   export default defineConfig({
     name: 'default',
     title: 'Smart Calculator Blog',

     projectId: 'your_project_id_here',
     dataset: 'production',

     plugins: [deskTool(), visionTool()],

     schema: {
       types: schemaTypes,
     },
   })
   ```

6. **Start the Studio:**
   ```bash
   npm run dev
   ```
   
   Studio will be available at: `http://localhost:3333`

7. **Deploy Studio (Optional):**
   ```bash
   npm run build
   npx sanity deploy
   ```
   
   Your studio will be hosted at: `https://your-project.sanity.studio`

---

### Option 2: Studio Inside Next.js Project (Advanced)

If you want `/studio` route in your Next.js app:

1. **Install Sanity Studio package:**
   ```bash
   npm install sanity @sanity/vision
   ```

2. **Create studio directory:**
   ```bash
   mkdir -p app/studio
   ```

3. **Create `app/studio/[[...index]]/page.tsx`:**
   ```typescript
   'use client'

   import { NextStudio } from 'next-sanity/studio'
   import config from '@/sanity.config'

   export default function StudioPage() {
     return <NextStudio config={config} />
   }
   ```

4. **Create `sanity.config.ts` in root:**
   ```typescript
   import {defineConfig} from 'sanity'
   import {deskTool} from 'sanity/desk'
   import {visionTool} from '@sanity/vision'
   import {schemaTypes} from './sanity/schemas'

   export default defineConfig({
     name: 'default',
     title: 'Smart Calculator Blog',
     projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
     dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
     basePath: '/studio',
     plugins: [deskTool(), visionTool()],
     schema: {
       types: schemaTypes,
     },
   })
   ```

5. **Update `next.config.mjs`:**
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     // ... existing config
     transpilePackages: ['next-sanity'],
   }

   export default nextConfig
   ```

6. **Access Studio:**
   Visit `http://localhost:3000/studio` in your Next.js app

---

## 📝 Current Status

Your Next.js app already has:
- ✅ Sanity client configuration (`lib/sanity/config.ts`)
- ✅ Data fetching functions (`lib/sanity/client.ts`)
- ✅ GROQ queries (`lib/sanity/queries.ts`)
- ✅ Blog listing page (`/blogs`)
- ✅ Blog detail page (`/blogs/[slug]`)
- ✅ Multilingual routing (en, br, pl, de, es)

What you need:
- ❌ Sanity Studio (to create/manage blog posts)

---

## 🎯 Recommended Approach

**Use Option 1 (Separate Studio)** because:
- Cleaner separation of concerns
- Easier to deploy independently
- Better performance (Studio doesn't affect Next.js bundle)
- Simpler to manage and update

**Use Option 2 (Embedded Studio)** only if:
- You want everything in one codebase
- You need custom Studio UI integrated with your app
- You're comfortable with the added complexity

---

## 🔑 Environment Variables

Make sure these are set in your `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

Find your project ID at: https://www.sanity.io/manage

---

## 📚 Next Steps

1. Choose Option 1 or Option 2 above
2. Set up Sanity Studio
3. Create your first blog post
4. Visit `/blogs` in your Next.js app to see it!

---

## 🐛 Troubleshooting

### TypeScript Errors in `sanity/schemas/`
These are now fixed - the `sanity/` directory is excluded from TypeScript compilation in your Next.js project. These schemas are only used by Sanity Studio.

### Can't access `/studio` in Next.js
This is expected if you haven't set up Option 2. By default, Studio is a separate app.

### Blog posts not showing
1. Make sure Studio is running and you've published posts
2. Check environment variables are set correctly
3. Verify the `language` field matches (en, br, pl, de, es)

---

## 📞 Need Help?

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/guides/nextjs-app-router-live-preview)
- [Sanity Studio Documentation](https://www.sanity.io/docs/sanity-studio)
