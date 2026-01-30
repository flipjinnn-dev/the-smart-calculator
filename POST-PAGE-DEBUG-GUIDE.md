# Community Post Pages - Debug Guide

## Issues Reported:
1. Post URLs like `/community/post/final-testing-for-admin-dash` are 404ing
2. Pages redirect to homepage
3. Source map error still appearing

## Fixes Applied:

### 1. Added Detailed Logging
**Files Modified:**
- `lib/actions/post-actions.ts` - Added console logs to track Sanity queries
- `app/community/post/[slug]/page.tsx` - Added logs to track post fetching

### 2. Cleared Next.js Cache
✅ Deleted `.next` folder to clear build cache

---

## Next Steps to Debug:

### 1. Restart Dev Server
```bash
# Stop current dev server (Ctrl+C)
npm run dev
```

### 2. Open Community Page
Visit: http://localhost:3000/community

### 3. Click on a Post
Try clicking on "final-testing-for-admin-dash" or any other post

### 4. Check Terminal Console
You should see logs like:
```
getPostBySlug called with slug: final-testing-for-admin-dash
Executing Sanity query for slug: final-testing-for-admin-dash
Post found: [Post Title] Status: approved
```

OR if post doesn't exist:
```
No post found with slug: final-testing-for-admin-dash
```

---

## Possible Causes:

### A. Post Doesn't Exist in Sanity
**Check:**
1. Go to your Sanity Studio
2. Look for posts with slug "final-testing-for-admin-dash"
3. Check if post status is "approved"

**Fix:**
- If post exists but status is "pending", approve it in admin dashboard
- If post doesn't exist, it was deleted - remove links to it

### B. Slug Mismatch
**Check:**
- In Sanity, the slug field should be `slug.current`
- Links use `post.slug.current` in the code

**Verify in community-content.tsx:**
```typescript
href={`/community/post/${post.slug.current}`}
```

### C. Sanity Schema Issue
**Check if `communityPost` schema has:**
- `slug` field of type `slug`
- `status` field with "approved" value
- `featuredImage` field (optional)

---

## Quick Test:

### 1. Check What Posts Exist
Add this temporarily to `app/community/page.tsx`:

```typescript
console.log('Available posts:', posts.map(p => ({
  slug: p.slug.current,
  title: p.title,
  status: p.status
})));
```

### 2. Verify Sanity Connection
Run in terminal:
```bash
# Check if Sanity env variables are set
echo $NEXT_PUBLIC_SANITY_PROJECT_ID
echo $NEXT_PUBLIC_SANITY_DATASET
```

---

## If Posts Still 404:

### Option 1: Create Test Post
1. Go to Sanity Studio
2. Create new Community Post
3. Set slug: "test-post"
4. Set status: "approved"
5. Publish
6. Try visiting: http://localhost:3000/community/post/test-post

### Option 2: Check Sanity Schema
File: `sanity/schemas/community-post.ts`

Ensure it has:
```typescript
{
  name: 'slug',
  title: 'Slug',
  type: 'slug',
  options: {
    source: 'title',
    maxLength: 96,
  },
  validation: (Rule) => Rule.required(),
}
```

---

## Expected Console Output (Success):

```
getPostBySlug called with slug: final-testing-for-admin-dash includeUnapproved: false
Executing Sanity query for slug: final-testing-for-admin-dash
Post found: Final Testing For Admin Dash Status: approved
Attempting to fetch post with slug: final-testing-for-admin-dash
Post fetched successfully: Final Testing For Admin Dash
```

## Expected Console Output (Post Not Found):

```
getPostBySlug called with slug: final-testing-for-admin-dash includeUnapproved: false
Executing Sanity query for slug: final-testing-for-admin-dash
No post found with slug: final-testing-for-admin-dash
Post not found for slug: final-testing-for-admin-dash
Error: NEXT_NOT_FOUND
```

---

## Share With Me:

After restarting dev server and clicking a post, please share:
1. **Console logs** from terminal
2. **Which post** you clicked on
3. **What URL** it tried to navigate to
4. **What happened** (404, redirect, error, etc.)

This will help me identify the exact issue!
