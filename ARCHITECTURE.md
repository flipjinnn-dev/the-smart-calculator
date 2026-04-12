# The Smart Calculator - Technical Architecture

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                             │
├─────────────────────────────────────────────────────────────────┤
│  Browser (Multi-language support: en, br, pl, de, es)           │
│  ├─ React 19 Components                                         │
│  ├─ Tailwind CSS Styling                                        │
│  ├─ Framer Motion Animations                                    │
│  └─ Client-side State (Zustand)                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓↑
┌─────────────────────────────────────────────────────────────────┐
│                      MIDDLEWARE LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│  Next.js Middleware (middleware.ts)                             │
│  ├─ URL Translation & Rewriting                                 │
│  ├─ Language Detection                                          │
│  ├─ URL Normalization (lowercase)                               │
│  ├─ Static Page Redirects                                       │
│  └─ Header Injection (x-language, x-pathname)                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓↑
┌─────────────────────────────────────────────────────────────────┐
│                      APPLICATION LAYER                           │
├─────────────────────────────────────────────────────────────────┤
│  Next.js App Router (Server & Client Components)                │
│  ├─ Server Components (Default)                                 │
│  │   ├─ Page Rendering                                          │
│  │   ├─ Metadata Generation                                     │
│  │   ├─ Data Fetching                                           │
│  │   └─ SEO Optimization                                        │
│  │                                                               │
│  ├─ Client Components                                           │
│  │   ├─ Interactive Calculators                                 │
│  │   ├─ Forms & User Input                                      │
│  │   ├─ Authentication UI                                       │
│  │   └─ Real-time Features                                      │
│  │                                                               │
│  └─ API Routes                                                  │
│      ├─ /api/auth/[...nextauth] - Authentication                │
│      ├─ /api/author/[slug] - Author data                        │
│      ├─ /api/rating/* - Rating system                           │
│      └─ /api/youtube/* - YouTube integration                    │
└─────────────────────────────────────────────────────────────────┘
                              ↓↑
┌─────────────────────────────────────────────────────────────────┐
│                      SERVICE LAYER                               │
├─────────────────────────────────────────────────────────────────┤
│  Server Actions (lib/actions/)                                  │
│  ├─ admin-community-actions.ts - Admin operations               │
│  ├─ blog-actions.ts - Blog CRUD                                 │
│  ├─ comment-actions.ts - Comment management                     │
│  ├─ post-actions.ts - Post management                           │
│  ├─ reaction-actions.ts - Reaction handling                     │
│  └─ user-actions.ts - User operations                           │
└─────────────────────────────────────────────────────────────────┘
                              ↓↑
┌─────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                  │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐  ┌──────────────────┐                 │
│  │   Sanity CMS        │  │  Static Content  │                 │
│  ├─────────────────────┤  ├──────────────────┤                 │
│  │ - Blog Posts        │  │ - Calculator UI  │                 │
│  │ - Authors           │  │ - Guides         │                 │
│  │ - Calculators       │  │ - Homepage       │                 │
│  │ - Categories        │  │ - Footer         │                 │
│  │ - Community Users   │  │ - Pages          │                 │
│  │ - Posts             │  └──────────────────┘                 │
│  │ - Comments          │                                        │
│  │ - Reactions         │                                        │
│  └─────────────────────┘                                        │
└─────────────────────────────────────────────────────────────────┘
                              ↓↑
┌─────────────────────────────────────────────────────────────────┐
│                   EXTERNAL SERVICES                              │
├─────────────────────────────────────────────────────────────────┤
│  ├─ Google OAuth (Authentication)                               │
│  ├─ Google Analytics (Analytics)                                │
│  ├─ Microsoft Clarity (Session Recording)                       │
│  ├─ Vercel Analytics (Performance)                              │
│  ├─ Vercel Speed Insights (Core Web Vitals)                     │
│  ├─ Google AdSense (Monetization)                               │
│  └─ Sanity CDN (Images)                                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Request Flow Diagrams

### 1. Calculator Page Request Flow

```
User Request: /br/calculadora-imc
         ↓
┌────────────────────────────────────┐
│  Next.js Middleware                │
│  - Detects language: 'br'          │
│  - Translates slug: calculadora-   │
│    imc → bmi-calculator            │
│  - Sets headers: x-language=br     │
│  - Rewrites to: /bmi-calculator    │
└────────────────────────────────────┘
         ↓
┌────────────────────────────────────┐
│  Server Component                  │
│  - Reads x-language header         │
│  - Generates metadata (Portuguese) │
│  - Fetches content from:           │
│    /content/calculator-ui/         │
│    bmi-calculator-br.json          │
└────────────────────────────────────┘
         ↓
┌────────────────────────────────────┐
│  Client Component                  │
│  - Renders calculator UI           │
│  - Handles user interactions       │
│  - Performs calculations           │
│  - Updates state                   │
└────────────────────────────────────┘
         ↓
┌────────────────────────────────────┐
│  Response to User                  │
│  - HTML with Portuguese content    │
│  - Proper hreflang tags            │
│  - Canonical URL                   │
│  - Structured data                 │
└────────────────────────────────────┘
```

### 2. Blog Post Request Flow

```
User Request: /blogs/how-to-calculate-bmi
         ↓
┌────────────────────────────────────┐
│  Server Component                  │
│  - Extracts slug from URL          │
│  - Queries Sanity CMS              │
└────────────────────────────────────┘
         ↓
┌────────────────────────────────────┐
│  Sanity CMS                        │
│  - GROQ Query:                     │
│    *[_type == "blog" &&            │
│      slug.current == $slug][0]     │
│  - Returns blog data               │
└────────────────────────────────────┘
         ↓
┌────────────────────────────────────┐
│  Server Component                  │
│  - Generates metadata              │
│  - Renders Portable Text           │
│  - Fetches author data             │
│  - Fetches related posts           │
└────────────────────────────────────┘
         ↓
┌────────────────────────────────────┐
│  Response to User                  │
│  - Rendered blog post              │
│  - Author information              │
│  - Related posts                   │
│  - SEO metadata                    │
└────────────────────────────────────┘
```

### 3. Authentication Flow

```
User clicks "Sign In with Google"
         ↓
┌────────────────────────────────────┐
│  NextAuth.js                       │
│  - Redirects to Google OAuth       │
└────────────────────────────────────┘
         ↓
┌────────────────────────────────────┐
│  Google OAuth                      │
│  - User authenticates              │
│  - Returns user data               │
└────────────────────────────────────┘
         ↓
┌────────────────────────────────────┐
│  NextAuth Callback: signIn         │
│  - Checks if user exists in Sanity │
│  - Creates user if new             │
└────────────────────────────────────┘
         ↓
┌────────────────────────────────────┐
│  Sanity CMS                        │
│  - Stores/updates user data        │
│  - Returns user with role          │
└────────────────────────────────────┘
         ↓
┌────────────────────────────────────┐
│  NextAuth Callback: jwt            │
│  - Fetches user role from Sanity   │
│  - Creates JWT token               │
└────────────────────────────────────┘
         ↓
┌────────────────────────────────────┐
│  NextAuth Callback: session        │
│  - Attaches role to session        │
│  - Returns session to client       │
└────────────────────────────────────┘
         ↓
┌────────────────────────────────────┐
│  Client                            │
│  - User logged in                  │
│  - Session available via useSession│
│  - Role-based UI rendering         │
└────────────────────────────────────┘
```

### 4. Community Post Creation Flow

```
User creates post in /community
         ↓
┌────────────────────────────────────┐
│  Client Component (Form)           │
│  - User fills form                 │
│  - Validates with Zod              │
│  - Submits data                    │
└────────────────────────────────────┘
         ↓
┌────────────────────────────────────┐
│  Server Action                     │
│  - post-actions.ts                 │
│  - Validates session               │
│  - Checks permissions              │
└────────────────────────────────────┘
         ↓
┌────────────────────────────────────┐
│  Sanity CMS                        │
│  - Creates new post document       │
│  - Links to author                 │
│  - Sets status: 'published'        │
└────────────────────────────────────┘
         ↓
┌────────────────────────────────────┐
│  Response                          │
│  - Success message                 │
│  - Redirect to post page           │
│  - Toast notification              │
└────────────────────────────────────┘
```

---

## Data Flow Architecture

### Content Loading Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    CONTENT SOURCES                          │
└─────────────────────────────────────────────────────────────┘
                    ↓                    ↓
        ┌───────────────────┐  ┌──────────────────┐
        │   Sanity CMS      │  │  Static JSON     │
        │   (Dynamic)       │  │  (Build-time)    │
        └───────────────────┘  └──────────────────┘
                    ↓                    ↓
        ┌───────────────────────────────────────┐
        │       Content Aggregation             │
        │  - Server Components                  │
        │  - Custom Hooks                       │
        │  - Utility Functions                  │
        └───────────────────────────────────────┘
                    ↓
        ┌───────────────────────────────────────┐
        │       Content Rendering               │
        │  - Portable Text (Sanity)             │
        │  - JSON Data (Static)                 │
        │  - Markdown (if applicable)           │
        └───────────────────────────────────────┘
                    ↓
        ┌───────────────────────────────────────┐
        │       Client Display                  │
        │  - React Components                   │
        │  - Styled with Tailwind               │
        │  - Interactive Elements               │
        └───────────────────────────────────────┘
```

### State Management Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    STATE LAYERS                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  1. Server State (Next.js)                                  │
│     - URL parameters                                        │
│     - Search params                                         │
│     - Cookies                                               │
│     - Headers                                               │
└─────────────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────────┐
│  2. Global State (Zustand)                                  │
│     - User preferences                                      │
│     - Theme settings                                        │
│     - Calculator history                                    │
│     - Search state                                          │
└─────────────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────────┐
│  3. Component State (React)                                 │
│     - Form inputs                                           │
│     - UI toggles                                            │
│     - Loading states                                        │
│     - Error states                                          │
└─────────────────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────────────────┐
│  4. Session State (NextAuth)                                │
│     - User authentication                                   │
│     - User role                                             │
│     - User profile                                          │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Architecture

### Component Hierarchy

```
RootLayout (app/layout.tsx)
│
├─ SessionProvider
│  │
│  ├─ Header
│  │  ├─ Logo
│  │  ├─ Navigation Menu
│  │  ├─ Language Switcher
│  │  ├─ Search Bar
│  │  └─ User Menu (Auth)
│  │
│  ├─ Main Content (children)
│  │  │
│  │  ├─ HomePage
│  │  │  ├─ Hero Section
│  │  │  ├─ Category Grid
│  │  │  ├─ Popular Calculators
│  │  │  ├─ Scientific Calculator
│  │  │  └─ Authors Section
│  │  │
│  │  ├─ Calculator Page
│  │  │  ├─ Breadcrumb
│  │  │  ├─ Calculator UI (Client)
│  │  │  ├─ Calculator Guide
│  │  │  ├─ Similar Calculators
│  │  │  └─ Rating Section
│  │  │
│  │  ├─ Category Page
│  │  │  ├─ Category Header
│  │  │  ├─ Calculator Grid
│  │  │  └─ Category Content
│  │  │
│  │  ├─ Blog Post
│  │  │  ├─ Post Header
│  │  │  ├─ Author Info
│  │  │  ├─ Portable Text Content
│  │  │  └─ Related Posts
│  │  │
│  │  └─ Community
│  │     ├─ Post List
│  │     ├─ Post Detail
│  │     │  ├─ Post Content
│  │     │  ├─ Reactions
│  │     │  └─ Comments
│  │     │     ├─ Comment Thread
│  │     │     └─ Comment Form
│  │     └─ Create Post Form
│  │
│  ├─ Internal Links Section
│  ├─ Language Footer
│  ├─ Footer
│  ├─ Back to Top Button
│  └─ Toast Notifications
│
└─ Analytics Scripts
   ├─ Google Analytics
   ├─ Microsoft Clarity
   ├─ Google AdSense
   ├─ Vercel Analytics
   └─ Speed Insights
```

### Component Communication Patterns

**1. Props Down, Events Up**
```tsx
// Parent Component
<CalculatorForm 
  initialValue={value}
  onCalculate={handleCalculate}
/>

// Child Component
function CalculatorForm({ initialValue, onCalculate }) {
  const [input, setInput] = useState(initialValue)
  
  const handleSubmit = () => {
    onCalculate(input) // Event up
  }
}
```

**2. Context for Cross-Cutting Concerns**
```tsx
// Session Context (NextAuth)
<SessionProvider>
  <App />
</SessionProvider>

// Usage
const { data: session } = useSession()
```

**3. Server Actions for Mutations**
```tsx
// Server Action
'use server'
export async function createPost(data: PostData) {
  // Validate
  // Create in Sanity
  // Return result
}

// Client Component
async function handleSubmit() {
  const result = await createPost(formData)
}
```

**4. Zustand for Global State**
```tsx
// Store
const useStore = create((set) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme })
}))

// Component
const { theme, setTheme } = useStore()
```

---

## Database Schema (Sanity)

### Entity Relationship Diagram

```
┌─────────────┐
│   Author    │
├─────────────┤
│ _id         │
│ name        │
│ slug        │
│ image       │
│ bio         │
│ socialLinks │
└─────────────┘
       │
       │ 1:N
       ↓
┌─────────────┐
│    Blog     │
├─────────────┤
│ _id         │
│ title       │
│ slug        │
│ author      │──→ Author
│ mainImage   │
│ categories  │──→ Category (N:M)
│ publishedAt │
│ body        │
│ excerpt     │
│ seo         │
└─────────────┘

┌─────────────┐
│  Category   │
├─────────────┤
│ _id         │
│ title       │
│ description │
└─────────────┘

┌─────────────┐
│ Calculator  │
├─────────────┤
│ _id         │
│ name        │
│ slug        │
│ category    │──→ Category
│ description │
│ featured    │
└─────────────┘

┌──────────────────┐
│ Community User   │
├──────────────────┤
│ _id              │
│ name             │
│ email            │
│ image            │
│ role             │
│ createdAt        │
└──────────────────┘
       │
       │ 1:N
       ↓
┌──────────────────┐
│ Community Post   │
├──────────────────┤
│ _id              │
│ title            │
│ content          │
│ author           │──→ Community User
│ tags             │
│ status           │
│ createdAt        │
└──────────────────┘
       │
       │ 1:N
       ├──────────────────┐
       ↓                  ↓
┌──────────────────┐ ┌──────────────────┐
│ Comment          │ │ Reaction         │
├──────────────────┤ ├──────────────────┤
│ _id              │ │ _id              │
│ content          │ │ type             │
│ author           │ │ user             │──→ Community User
│ post             │ │ post             │──→ Community Post
│ parentComment    │ │ createdAt        │
│ createdAt        │ └──────────────────┘
└──────────────────┘
       │
       │ 1:N
       ↓
┌──────────────────┐
│ Comment Like     │
├──────────────────┤
│ _id              │
│ user             │──→ Community User
│ comment          │──→ Comment
│ createdAt        │
└──────────────────┘
```

---

## Security Architecture

### Authentication & Authorization

```
┌─────────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                          │
└─────────────────────────────────────────────────────────────┘

1. Authentication Layer (NextAuth.js)
   ├─ Google OAuth 2.0
   ├─ JWT Token Generation
   ├─ Secure Cookie Storage
   └─ Session Management

2. Authorization Layer
   ├─ Role-Based Access Control (RBAC)
   │  ├─ User (default)
   │  ├─ Moderator
   │  └─ Admin
   │
   ├─ Route Protection
   │  ├─ /admin/* → Admin only
   │  ├─ /creator/* → Authenticated users
   │  └─ /profile/* → Own profile only
   │
   └─ Server Action Validation
      ├─ Session check
      ├─ Role verification
      └─ Data ownership validation

3. Data Validation Layer
   ├─ Zod Schema Validation
   ├─ Server-side Validation
   └─ Client-side Validation

4. API Security
   ├─ CORS Configuration
   ├─ Rate Limiting (Vercel)
   ├─ CSRF Protection (NextAuth)
   └─ XSS Prevention (React)

5. Environment Security
   ├─ Environment Variables
   ├─ Secret Management
   └─ API Key Protection
```

### Security Best Practices Implemented

1. **No Sensitive Data in Client**
   - API keys in server-side only
   - Sanity token server-side only

2. **HTTPS Enforcement**
   - Automatic redirect to HTTPS
   - Secure cookie flags

3. **Input Sanitization**
   - Zod validation
   - React XSS protection
   - Sanity content sanitization

4. **Authentication Security**
   - JWT tokens
   - HTTP-only cookies
   - Secure session storage

5. **Authorization Checks**
   - Server-side role verification
   - Protected API routes
   - Conditional UI rendering

---

## Performance Architecture

### Optimization Strategies

```
┌─────────────────────────────────────────────────────────────┐
│                PERFORMANCE OPTIMIZATIONS                    │
└─────────────────────────────────────────────────────────────┘

1. Rendering Optimizations
   ├─ Server Components (default)
   ├─ Static Generation where possible
   ├─ Dynamic imports for heavy components
   └─ Code splitting by route

2. Asset Optimizations
   ├─ Next.js Image Optimization
   ├─ Font optimization (Inter with swap)
   ├─ SVG optimization
   └─ Lazy loading images

3. JavaScript Optimizations
   ├─ Package import optimization
   │  ├─ lucide-react
   │  ├─ react-icons
   │  └─ @radix-ui/*
   ├─ Tree shaking
   ├─ Minification
   └─ Compression (gzip/brotli)

4. CSS Optimizations
   ├─ Tailwind CSS purging
   ├─ CSS optimization (experimental)
   └─ Critical CSS inlining

5. Caching Strategy
   ├─ Static assets: 1 year cache
   ├─ Images: CDN caching
   ├─ API responses: Appropriate cache headers
   └─ Browser caching

6. Loading Strategy
   ├─ Analytics: lazyOnload
   ├─ Third-party scripts: deferred
   ├─ Below-fold content: lazy
   └─ Critical path: prioritized

7. Network Optimizations
   ├─ HTTP/2
   ├─ Compression enabled
   ├─ CDN (Vercel Edge Network)
   └─ Prefetching (Next.js Link)
```

### Performance Metrics Targets

| Metric | Target | Current |
|--------|--------|---------|
| First Contentful Paint (FCP) | < 1.8s | Monitor |
| Largest Contentful Paint (LCP) | < 2.5s | Monitor |
| First Input Delay (FID) | < 100ms | Monitor |
| Cumulative Layout Shift (CLS) | < 0.1 | Monitor |
| Time to Interactive (TTI) | < 3.8s | Monitor |
| Total Blocking Time (TBT) | < 200ms | Monitor |

---

## Deployment Architecture

### Vercel Deployment

```
┌─────────────────────────────────────────────────────────────┐
│                    DEPLOYMENT FLOW                          │
└─────────────────────────────────────────────────────────────┘

Git Repository (GitHub/GitLab)
         ↓
    Git Push/Merge
         ↓
┌────────────────────────────────┐
│  Vercel Build Process          │
│  1. Install dependencies       │
│  2. Run build command          │
│  3. Generate static pages      │
│  4. Optimize assets            │
│  5. Create serverless functions│
└────────────────────────────────┘
         ↓
┌────────────────────────────────┐
│  Vercel Edge Network           │
│  - Global CDN                  │
│  - Edge Functions              │
│  - Automatic SSL               │
│  - DDoS Protection             │
└────────────────────────────────┘
         ↓
┌────────────────────────────────┐
│  Production Deployment         │
│  - www.thesmartcalculator.com  │
│  - Automatic HTTPS             │
│  - Custom domain               │
└────────────────────────────────┘
```

### Environment Configuration

**Development:**
```bash
NODE_ENV=development
NEXT_PUBLIC_SANITY_DATASET=development
```

**Production:**
```bash
NODE_ENV=production
NEXT_PUBLIC_SANITY_DATASET=production
```

---

## Monitoring & Analytics Architecture

### Analytics Stack

```
┌─────────────────────────────────────────────────────────────┐
│                    ANALYTICS PIPELINE                       │
└─────────────────────────────────────────────────────────────┘

User Interactions
         ↓
┌────────────────────────────────┐
│  Client-side Tracking          │
│  - Page views                  │
│  - Calculator usage            │
│  - Button clicks               │
│  - Form submissions            │
└────────────────────────────────┘
         ↓
    ┌────┴────┬────────┬────────┐
    ↓         ↓        ↓        ↓
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│ Google │ │Clarity │ │ Vercel │ │ Custom │
│Analytics│ │        │ │Analytics│ │ Events │
└────────┘ └────────┘ └────────┘ └────────┘
    ↓         ↓        ↓        ↓
┌─────────────────────────────────────┐
│  Analytics Dashboards               │
│  - User behavior                    │
│  - Performance metrics              │
│  - Conversion tracking              │
│  - Error monitoring                 │
└─────────────────────────────────────┘
```

---

**Last Updated:** April 11, 2026
**Document Version:** 1.0.0
