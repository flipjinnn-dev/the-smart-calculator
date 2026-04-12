# The Smart Calculator - API Reference & Development Guide

## Table of Contents
1. [Server Actions API](#server-actions-api)
2. [API Routes](#api-routes)
3. [Sanity CMS Queries](#sanity-cms-queries)
4. [Utility Functions](#utility-functions)
5. [Custom Hooks](#custom-hooks)
6. [Development Workflow](#development-workflow)
7. [Testing Guide](#testing-guide)
8. [Deployment Guide](#deployment-guide)

---

## Server Actions API

Server Actions are async functions that run on the server and can be called from client components.

### Admin Community Actions

**File:** `lib/actions/admin-community-actions.ts`

#### `getAdminStats()`
Get admin dashboard statistics.

```typescript
export async function getAdminStats(): Promise<AdminStats>

// Returns:
{
  totalUsers: number
  totalPosts: number
  totalComments: number
  totalReactions: number
  recentActivity: Activity[]
}

// Usage:
const stats = await getAdminStats()
```

#### `updateUserRole(userId, newRole)`
Update a user's role (admin only).

```typescript
export async function updateUserRole(
  userId: string,
  newRole: 'user' | 'moderator' | 'admin'
): Promise<{ success: boolean; message: string }>

// Usage:
const result = await updateUserRole('user-123', 'moderator')
```

#### `deleteUser(userId)`
Delete a user and all their content.

```typescript
export async function deleteUser(userId: string): Promise<{
  success: boolean
  message: string
}>

// Usage:
const result = await deleteUser('user-123')
```

#### `moderatePost(postId, action)`
Moderate a community post.

```typescript
export async function moderatePost(
  postId: string,
  action: 'approve' | 'reject' | 'delete'
): Promise<{ success: boolean; message: string }>

// Usage:
const result = await moderatePost('post-123', 'approve')
```

---

### Blog Actions

**File:** `lib/actions/blog-actions.ts`

#### `getAllBlogs()`
Fetch all published blog posts.

```typescript
export async function getAllBlogs(): Promise<BlogPost[]>

// Returns:
[
  {
    _id: string
    title: string
    slug: string
    excerpt: string
    mainImage: SanityImage
    author: Author
    publishedAt: string
    categories: Category[]
  }
]

// Usage:
const blogs = await getAllBlogs()
```

#### `getBlogBySlug(slug)`
Fetch a single blog post by slug.

```typescript
export async function getBlogBySlug(slug: string): Promise<BlogPost | null>

// Usage:
const blog = await getBlogBySlug('how-to-calculate-bmi')
```

#### `getBlogsByCategory(categoryId)`
Fetch blogs by category.

```typescript
export async function getBlogsByCategory(categoryId: string): Promise<BlogPost[]>

// Usage:
const blogs = await getBlogsByCategory('health')
```

#### `getRelatedBlogs(blogId, limit)`
Get related blog posts.

```typescript
export async function getRelatedBlogs(
  blogId: string,
  limit: number = 3
): Promise<BlogPost[]>

// Usage:
const related = await getRelatedBlogs('blog-123', 5)
```

---

### Comment Actions

**File:** `lib/actions/comment-actions.ts`

#### `createComment(data)`
Create a new comment.

```typescript
export async function createComment(data: {
  content: string
  postId: string
  parentCommentId?: string
}): Promise<{ success: boolean; comment?: Comment; message: string }>

// Usage:
const result = await createComment({
  content: 'Great post!',
  postId: 'post-123'
})
```

#### `getCommentsByPost(postId)`
Fetch all comments for a post.

```typescript
export async function getCommentsByPost(postId: string): Promise<Comment[]>

// Returns nested comment structure
// Usage:
const comments = await getCommentsByPost('post-123')
```

#### `updateComment(commentId, content)`
Update a comment (author only).

```typescript
export async function updateComment(
  commentId: string,
  content: string
): Promise<{ success: boolean; message: string }>

// Usage:
const result = await updateComment('comment-123', 'Updated content')
```

#### `deleteComment(commentId)`
Delete a comment (author or admin).

```typescript
export async function deleteComment(commentId: string): Promise<{
  success: boolean
  message: string
}>

// Usage:
const result = await deleteComment('comment-123')
```

#### `likeComment(commentId)`
Like/unlike a comment.

```typescript
export async function likeComment(commentId: string): Promise<{
  success: boolean
  liked: boolean
  likeCount: number
}>

// Usage:
const result = await likeComment('comment-123')
```

---

### Post Actions

**File:** `lib/actions/post-actions.ts`

#### `createPost(data)`
Create a new community post.

```typescript
export async function createPost(data: {
  title: string
  content: any[] // Portable Text blocks
  tags: string[]
}): Promise<{ success: boolean; post?: Post; message: string }>

// Usage:
const result = await createPost({
  title: 'My Calculator Question',
  content: [{ _type: 'block', children: [{ text: 'Content...' }] }],
  tags: ['bmi', 'health']
})
```

#### `getAllPosts()`
Fetch all published posts.

```typescript
export async function getAllPosts(): Promise<Post[]>

// Usage:
const posts = await getAllPosts()
```

#### `getPostById(postId)`
Fetch a single post by ID.

```typescript
export async function getPostById(postId: string): Promise<Post | null>

// Usage:
const post = await getPostById('post-123')
```

#### `updatePost(postId, data)`
Update a post (author only).

```typescript
export async function updatePost(
  postId: string,
  data: Partial<PostData>
): Promise<{ success: boolean; message: string }>

// Usage:
const result = await updatePost('post-123', {
  title: 'Updated Title'
})
```

#### `deletePost(postId)`
Delete a post (author or admin).

```typescript
export async function deletePost(postId: string): Promise<{
  success: boolean
  message: string
}>

// Usage:
const result = await deletePost('post-123')
```

---

### Reaction Actions

**File:** `lib/actions/reaction-actions.ts`

#### `addReaction(postId, reactionType)`
Add a reaction to a post.

```typescript
export async function addReaction(
  postId: string,
  reactionType: 'like' | 'love' | 'celebrate' | 'support' | 'insightful'
): Promise<{ success: boolean; message: string }>

// Usage:
const result = await addReaction('post-123', 'love')
```

#### `removeReaction(postId)`
Remove user's reaction from a post.

```typescript
export async function removeReaction(postId: string): Promise<{
  success: boolean
  message: string
}>

// Usage:
const result = await removeReaction('post-123')
```

#### `getPostReactions(postId)`
Get all reactions for a post.

```typescript
export async function getPostReactions(postId: string): Promise<{
  reactions: Reaction[]
  counts: Record<ReactionType, number>
}>

// Usage:
const { reactions, counts } = await getPostReactions('post-123')
```

---

### User Actions

**File:** `lib/actions/user-actions.ts`

#### `getUserProfile(userId)`
Get user profile data.

```typescript
export async function getUserProfile(userId: string): Promise<UserProfile | null>

// Returns:
{
  _id: string
  name: string
  email: string
  image: string
  role: string
  createdAt: string
  postCount: number
  commentCount: number
}

// Usage:
const profile = await getUserProfile('user-123')
```

#### `updateUserProfile(data)`
Update current user's profile.

```typescript
export async function updateUserProfile(data: {
  name?: string
  bio?: string
  socialLinks?: object
}): Promise<{ success: boolean; message: string }>

// Usage:
const result = await updateUserProfile({
  name: 'John Doe',
  bio: 'Calculator enthusiast'
})
```

---

## API Routes

### Authentication API

**Endpoint:** `/api/auth/[...nextauth]`

NextAuth.js handles all authentication routes:

- `GET /api/auth/signin` - Sign in page
- `POST /api/auth/signin/google` - Google OAuth
- `GET /api/auth/signout` - Sign out
- `GET /api/auth/session` - Get current session
- `GET /api/auth/csrf` - CSRF token

**Usage:**
```typescript
import { signIn, signOut, useSession } from 'next-auth/react'

// Sign in
await signIn('google')

// Sign out
await signOut()

// Get session
const { data: session, status } = useSession()
```

---

### Author API

**Endpoint:** `/api/author/[slug]`

**Method:** GET

**Description:** Fetch author data by slug

**Response:**
```json
{
  "_id": "author-123",
  "name": "John Doe",
  "slug": "john-doe",
  "image": "https://...",
  "bio": [...],
  "socialLinks": {
    "twitter": "...",
    "linkedin": "..."
  },
  "posts": [...]
}
```

**Usage:**
```typescript
const response = await fetch('/api/author/john-doe')
const author = await response.json()
```

---

### Rating API

**Endpoint:** `/api/rating/*`

#### Submit Rating
**Method:** POST  
**Endpoint:** `/api/rating/submit`

**Request Body:**
```json
{
  "calculatorId": "bmi-calculator",
  "rating": 5,
  "comment": "Very helpful!"
}
```

**Response:**
```json
{
  "success": true,
  "averageRating": 4.5,
  "totalRatings": 123
}
```

#### Get Ratings
**Method:** GET  
**Endpoint:** `/api/rating/[calculatorId]`

**Response:**
```json
{
  "averageRating": 4.5,
  "totalRatings": 123,
  "distribution": {
    "5": 80,
    "4": 30,
    "3": 10,
    "2": 2,
    "1": 1
  }
}
```

---

### YouTube API

**Endpoint:** `/api/youtube/*`

Integration for YouTube video embeds and data.

---

## Sanity CMS Queries

### Common GROQ Queries

#### Fetch All Blogs
```groq
*[_type == "blog" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  "author": author->{
    name,
    slug,
    image
  },
  publishedAt,
  "categories": categories[]->{ title, slug }
}
```

#### Fetch Blog by Slug
```groq
*[_type == "blog" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  body,
  excerpt,
  publishedAt,
  "author": author->{
    name,
    slug,
    image,
    bio
  },
  "categories": categories[]->{ title, slug }
}
```

#### Fetch Community Posts
```groq
*[_type == "communityPost" && status == "published"] | order(_createdAt desc) {
  _id,
  title,
  content,
  tags,
  _createdAt,
  "author": author->{
    _id,
    name,
    image,
    role
  },
  "commentCount": count(*[_type == "communityComment" && references(^._id)]),
  "reactionCount": count(*[_type == "communityReaction" && references(^._id)])
}
```

#### Fetch Comments for Post
```groq
*[_type == "communityComment" && post._ref == $postId] | order(_createdAt asc) {
  _id,
  content,
  _createdAt,
  "author": author->{
    _id,
    name,
    image,
    role
  },
  "parentComment": parentComment._ref,
  "likeCount": count(*[_type == "commentLike" && comment._ref == ^._id])
}
```

---

## Utility Functions

### Language Utils

**File:** `lib/language-utils.ts`

#### `getLocalizedCalculatorData(calculatorId, language)`
Get calculator name and description in specified language.

```typescript
export function getLocalizedCalculatorData(
  calculatorId: string,
  language: string
): { name: string; description: string }

// Usage:
const data = getLocalizedCalculatorData('bmi-calculator', 'br')
// Returns: { name: 'Calculadora IMC', description: '...' }
```

#### `getLocalizedCalculatorHref(calculatorId, language)`
Get localized URL for calculator.

```typescript
export function getLocalizedCalculatorHref(
  calculatorId: string,
  language: string
): string

// Usage:
const href = getLocalizedCalculatorHref('bmi-calculator', 'br')
// Returns: '/br/calculadora-imc'
```

---

### URL Utils

**File:** `lib/url-utils.ts`

#### `getLanguageSwitcherUrl(currentPath, targetLanguage)`
Generate URL for language switcher.

```typescript
export function getLanguageSwitcherUrl(
  currentPath: string,
  targetLanguage: string
): string

// Usage:
const url = getLanguageSwitcherUrl('/br/calculadora-imc', 'en')
// Returns: '/bmi-calculator'
```

#### `translateUrl(url, fromLang, toLang)`
Translate URL from one language to another.

```typescript
export function translateUrl(
  url: string,
  fromLang: string,
  toLang: string
): string

// Usage:
const translated = translateUrl('/bmi-calculator', 'en', 'de')
// Returns: '/de/bmi-rechner'
```

---

### Metadata Utils

**File:** `lib/metadata-utils.ts`

#### `generateCalculatorMetadata(calculatorId, language)`
Generate SEO metadata for calculator page.

```typescript
export async function generateCalculatorMetadata(
  calculatorId: string,
  language: string
): Promise<Metadata>

// Usage:
export async function generateMetadata({ params }) {
  return generateCalculatorMetadata(params.slug, params.lang)
}
```

#### `generateCategoryMetadata(category, language)`
Generate SEO metadata for category page.

```typescript
export async function generateCategoryMetadata(
  category: string,
  language: string
): Promise<Metadata>
```

---

## Custom Hooks

### useCalculatorContent

**File:** `hooks/useCalculatorContent.ts`

Load calculator content dynamically.

```typescript
export function useCalculatorContent(
  calculatorId: string,
  language: string
): {
  content: CalculatorContent | null
  loading: boolean
  error: Error | null
}

// Usage:
const { content, loading, error } = useCalculatorContent('bmi-calculator', 'en')

if (loading) return <Loading />
if (error) return <Error />
return <Calculator content={content} />
```

---

### useCategoryContent

**File:** `hooks/useCategoryContent.ts`

Load category content.

```typescript
export function useCategoryContent(
  category: string,
  language: string
): {
  content: CategoryContent | null
  loading: boolean
}

// Usage:
const { content, loading } = useCategoryContent('health', 'en')
```

---

### useLanguage

**File:** `hooks/useLanguage.ts`

Detect current language from URL.

```typescript
export function useLanguage(): string

// Usage:
const language = useLanguage()
// Returns: 'en' | 'br' | 'pl' | 'de' | 'es'
```

---

### useToast

**File:** `hooks/use-toast.ts`

Show toast notifications.

```typescript
export function useToast(): {
  toast: (options: ToastOptions) => void
  dismiss: (toastId?: string) => void
}

// Usage:
const { toast } = useToast()

toast({
  title: 'Success',
  description: 'Calculator saved!',
  variant: 'success'
})

toast({
  title: 'Error',
  description: 'Something went wrong',
  variant: 'destructive'
})
```

---

## Development Workflow

### Setting Up Development Environment

1. **Clone Repository**
```bash
git clone <repository-url>
cd the-smart-calculator
```

2. **Install Dependencies**
```bash
npm install
```

3. **Set Up Environment Variables**
```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

4. **Run Development Server**
```bash
npm run dev
```

5. **Access Application**
```
http://localhost:3000
```

---

### Creating a New Calculator

1. **Create Calculator UI Component**
```tsx
// components/my-calculator.tsx
'use client'

export function MyCalculator() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  
  const calculate = () => {
    // Calculation logic
    setResult(/* result */)
  }
  
  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={calculate}>Calculate</button>
      {result && <div>Result: {result}</div>}
    </div>
  )
}
```

2. **Create Content Files**
```bash
# Create content for each language
app/content/calculator-ui/my-calculator-en.json
app/content/calculator-ui/my-calculator-br.json
app/content/calculator-ui/my-calculator-pl.json
app/content/calculator-ui/my-calculator-de.json
app/content/calculator-ui/my-calculator-es.json
```

3. **Add to Calculator Data**
```typescript
// lib/calculator-data.ts
export const calculators = [
  // ... existing calculators
  {
    id: 'my-calculator',
    name: 'My Calculator',
    description: 'Description...',
    href: '/my-calculator',
    category: 'maths',
    popular: false
  }
]
```

4. **Add URL Mappings**
```typescript
// middleware.ts
export const urlMappings = {
  'br': {
    'minha-calculadora': 'my-calculator',
    // ...
  },
  // ... other languages
}
```

5. **Create Page**
```tsx
// app/(calculators-by-category)/my-calculator/page.tsx
import { MyCalculator } from '@/components/my-calculator'

export default function Page() {
  return <MyCalculator />
}
```

---

### Adding a New Language

1. **Update Middleware**
```typescript
// middleware.ts
export const urlMappings = {
  // ... existing languages
  'fr': {
    'fr-slug': 'en-slug',
    // Add all calculator translations
  }
}
```

2. **Create Content Files**
```bash
# Create French content files
app/content/homepage/fr.json
app/content/footer/fr.json
# ... all other content files
```

3. **Update Layout Metadata**
```typescript
// app/layout.tsx
const homepageMeta = {
  // ... existing languages
  fr: {
    title: "...",
    description: "...",
    keywords: "..."
  }
}
```

4. **Add to Language Switcher**
```tsx
// components/header.tsx
const languages = [
  // ... existing
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
]
```

---

### Creating a Blog Post

1. **Access Sanity Studio**
```
http://localhost:3000/studio
```

2. **Create New Blog Post**
- Click "Blog" in sidebar
- Click "Create new Blog"
- Fill in all fields:
  - Title
  - Slug
  - Author
  - Main Image
  - Categories
  - Body (Portable Text)
  - Excerpt
  - SEO metadata

3. **Publish**
- Click "Publish" button
- Post will appear on /blogs

---

## Testing Guide

### Manual Testing Checklist

**Multi-language Testing:**
- [ ] Test all calculators in all languages
- [ ] Verify URL translations work correctly
- [ ] Check hreflang tags are correct
- [ ] Test language switcher functionality

**Calculator Testing:**
- [ ] Test all input validations
- [ ] Verify calculations are accurate
- [ ] Test edge cases (0, negative, very large numbers)
- [ ] Check error handling

**Authentication Testing:**
- [ ] Test Google OAuth login
- [ ] Verify session persistence
- [ ] Test role-based access
- [ ] Check logout functionality

**Community Features:**
- [ ] Create post
- [ ] Add comment
- [ ] Add nested reply
- [ ] Like comment
- [ ] Add reaction
- [ ] Edit own content
- [ ] Delete own content
- [ ] Test moderation (admin)

**SEO Testing:**
- [ ] Check meta tags on all pages
- [ ] Verify structured data
- [ ] Test canonical URLs
- [ ] Check sitemap generation
- [ ] Verify robots.txt

---

## Deployment Guide

### Pre-Deployment Checklist

- [ ] All environment variables set
- [ ] Build succeeds locally (`npm run build`)
- [ ] No TypeScript errors (`npm run lint`)
- [ ] Test in production mode (`npm run start`)
- [ ] All images optimized
- [ ] Analytics configured
- [ ] Sanity dataset set to production

### Vercel Deployment Steps

1. **Connect Repository**
- Go to Vercel dashboard
- Click "New Project"
- Import Git repository

2. **Configure Build Settings**
```
Framework Preset: Next.js
Build Command: next build
Output Directory: .next
Install Command: npm install
```

3. **Set Environment Variables**
- Add all variables from `.env.local`
- Mark sensitive variables as "Secret"

4. **Deploy**
- Click "Deploy"
- Wait for build to complete
- Verify deployment

5. **Configure Domain**
- Add custom domain
- Configure DNS
- Enable HTTPS

### Post-Deployment Verification

- [ ] Test homepage loads
- [ ] Test calculator functionality
- [ ] Verify authentication works
- [ ] Check analytics tracking
- [ ] Test all language versions
- [ ] Verify sitemap accessible
- [ ] Check robots.txt
- [ ] Test mobile responsiveness
- [ ] Verify performance metrics

---

## Troubleshooting Common Issues

### Build Failures

**Issue:** TypeScript errors during build

**Solution:**
```bash
# Check for errors
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix

# If needed, temporarily ignore build errors (not recommended)
# In next.config.mjs:
typescript: {
  ignoreBuildErrors: true
}
```

---

### Middleware Not Working

**Issue:** Language URLs not translating

**Solution:**
1. Check middleware matcher configuration
2. Verify URL mappings are complete
3. Clear `.next` folder and rebuild
4. Check for typos in slug translations

---

### Sanity Content Not Loading

**Issue:** Content returns null or undefined

**Solution:**
1. Verify Sanity project ID and dataset
2. Check API token has read permissions
3. Validate GROQ query syntax
4. Check document is published (not draft)

---

### Authentication Issues

**Issue:** Google OAuth not working

**Solution:**
1. Verify Google OAuth credentials
2. Check authorized redirect URIs include your domain
3. Ensure NEXTAUTH_URL matches your domain
4. Verify NEXTAUTH_SECRET is set
5. Check cookies are enabled in browser

---

## Best Practices

### Code Style

1. **Use TypeScript strictly**
2. **Follow component naming conventions**
3. **Keep components small and focused**
4. **Use server components by default**
5. **Add proper error handling**
6. **Write descriptive comments**
7. **Use semantic HTML**
8. **Follow accessibility guidelines**

### Performance

1. **Optimize images**
2. **Lazy load below-fold content**
3. **Use dynamic imports for heavy components**
4. **Minimize client-side JavaScript**
5. **Implement proper caching**
6. **Monitor Core Web Vitals**

### Security

1. **Never expose API keys in client code**
2. **Validate all user inputs**
3. **Use server actions for mutations**
4. **Implement proper authorization checks**
5. **Keep dependencies updated**
6. **Use environment variables for secrets**

---

**Last Updated:** April 11, 2026
**Document Version:** 1.0.0
