# The Smart Calculator - Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Architecture](#architecture)
5. [Key Features](#key-features)
6. [Middleware & Routing](#middleware--routing)
7. [Content Management](#content-management)
8. [Authentication & Authorization](#authentication--authorization)
9. [API Routes](#api-routes)
10. [Components](#components)
11. [State Management](#state-management)
12. [Internationalization (i18n)](#internationalization-i18n)
13. [SEO & Performance](#seo--performance)
14. [Scripts & Utilities](#scripts--utilities)
15. [Deployment](#deployment)

---

## Project Overview

**The Smart Calculator** is a comprehensive Next.js-based web application providing hundreds of free online calculators across multiple categories including finance, health, mathematics, physics, construction, food, sports, and more.

### Key Characteristics:
- **Multi-language Support**: English (en), Portuguese (br), Polish (pl), German (de), Spanish (es)
- **SEO-Optimized**: Server-side rendering, dynamic metadata, structured data
- **Content-Driven**: Sanity CMS integration for blogs, calculators, and community content
- **Community Features**: User authentication, posts, comments, reactions
- **Performance-Focused**: Code splitting, lazy loading, optimized images

---

## Technology Stack

### Core Framework
- **Next.js 16.0.7** - React framework with App Router
- **React 19.2.1** - UI library
- **TypeScript 5** - Type safety

### Styling & UI
- **Tailwind CSS 4.1.9** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion 12.26.2** - Animation library
- **Lucide React** - Icon library
- **Geist Font** - Typography

### Content Management
- **Sanity 5.0.1** - Headless CMS
- **Next Sanity 12.0.5** - Sanity integration for Next.js
- **Portable Text** - Rich text rendering

### Authentication
- **NextAuth.js 4.24.13** - Authentication solution
- **Google OAuth** - Social login provider

### Mathematics & Calculations
- **MathJS 14.8.0** - Math library
- **Nerdamer 1.1.13** - Symbolic math
- **KaTeX 0.16.27** - Math rendering

### Data Handling
- **Zustand 5.0.2** - State management
- **React Hook Form 7.60.0** - Form handling
- **Zod 3.25.67** - Schema validation
- **XLSX 0.18.5** - Excel file handling

### Analytics & Monitoring
- **Vercel Analytics** - Performance monitoring
- **Vercel Speed Insights** - Core Web Vitals
- **Google Analytics** - User analytics
- **Microsoft Clarity** - Session recording

### Development Tools
- **ESLint** - Code linting
- **TSX** - TypeScript execution
- **Babel** - Code transformation

---

## Project Structure

```
the-smart-calculator/
├── app/                                    # Next.js App Router
│   ├── (calculators-by-category)/        # Calculator category pages
│   ├── (category)/                        # Category pages
│   ├── (games-other-pages)/              # Games and other pages
│   ├── (other-pages)/                    # Static pages
│   ├── (single-blog)/                    # Blog post pages
│   ├── admin/                            # Admin dashboard
│   ├── api/                              # API routes
│   │   ├── auth/                         # NextAuth endpoints
│   │   ├── author/                       # Author API
│   │   ├── rating/                       # Rating system
│   │   └── youtube/                      # YouTube integration
│   ├── auth/                             # Authentication pages
│   ├── community/                        # Community features
│   ├── content/                          # Content files (1181 items)
│   │   ├── calculator-guide/             # Calculator guides (563 items)
│   │   ├── calculator-ui/                # Calculator UI components (578 items)
│   │   ├── footer/                       # Footer content (5 languages)
│   │   ├── homepage/                     # Homepage content (5 languages)
│   │   └── pages/                        # Static page content (30 items)
│   ├── creator/                          # Creator pages
│   ├── profile/                          # User profile
│   ├── studio/                           # Sanity Studio
│   ├── sitemap-[lang].xml/              # Language-specific sitemaps
│   ├── globals.css                       # Global styles
│   ├── layout.tsx                        # Root layout
│   ├── page.tsx                          # Homepage
│   └── not-found.tsx                     # 404 page
│
├── components/                            # React components
│   ├── admin/                            # Admin components (5 items)
│   ├── community/                        # Community components (8 items)
│   ├── games/                            # Game components (17 items)
│   ├── providers/                        # Context providers
│   ├── ui/                               # UI components (51 items)
│   ├── header.tsx                        # Site header
│   ├── footer.tsx                        # Site footer
│   ├── search-bar.tsx                    # Search functionality
│   ├── dynamic-breadcrumb.tsx            # Breadcrumb navigation
│   └── [various calculators].tsx         # Standalone calculator components
│
├── lib/                                   # Utility libraries
│   ├── actions/                          # Server actions
│   │   ├── admin-community-actions.ts    # Admin operations
│   │   ├── blog-actions.ts               # Blog operations
│   │   ├── comment-actions.ts            # Comment operations
│   │   ├── post-actions.ts               # Post operations
│   │   ├── reaction-actions.ts           # Reaction operations
│   │   └── user-actions.ts               # User operations
│   ├── games/                            # Game logic (7 items)
│   ├── internal-links/                   # Internal linking (6 items)
│   ├── n8n-workflows/                    # Automation workflows (25 items)
│   ├── sanity/                           # Sanity client & queries (4 items)
│   ├── stores/                           # Zustand stores
│   ├── utils/                            # Utility functions (2 items)
│   ├── auth.ts                           # NextAuth configuration
│   ├── calculator-data.ts                # Calculator metadata
│   ├── language-utils.ts                 # i18n utilities
│   ├── metadata-utils.ts                 # SEO metadata
│   ├── routes.ts                         # Route definitions
│   ├── seo.tsx                           # SEO components
│   ├── similar-calculators.ts            # Related calculators
│   └── url-utils.ts                      # URL manipulation
│
├── hooks/                                 # Custom React hooks
│   ├── use-mobile.ts                     # Mobile detection
│   ├── use-toast.ts                      # Toast notifications
│   ├── useCalculatorContent.ts           # Calculator content hook
│   ├── useCategoryContent.ts             # Category content hook
│   ├── useFooterContent.ts               # Footer content hook
│   ├── useHomepageContent.ts             # Homepage content hook
│   ├── useLanguage.ts                    # Language detection
│   ├── useMobileScroll.ts                # Mobile scroll behavior
│   └── useWordle.ts                      # Wordle game logic
│
├── sanity/                                # Sanity CMS configuration
│   └── schemas/                          # Content schemas
│       ├── author.ts                     # Author schema
│       ├── blog.ts                       # Blog post schema
│       ├── calculator.ts                 # Calculator schema
│       ├── category.ts                   # Category schema
│       ├── comment-like.ts               # Comment like schema
│       ├── community-comment.ts          # Comment schema
│       ├── community-post.ts             # Post schema
│       ├── community-reaction.ts         # Reaction schema
│       ├── community-user.ts             # User schema
│       ├── wordle.ts                     # Wordle game schema
│       └── index.ts                      # Schema exports
│
├── scripts/                               # Build & migration scripts (25 items)
│   ├── add-spanish-metadata.ts           # Spanish metadata migration
│   ├── fix-all-seo-issues.js            # SEO fixes
│   ├── migrate-calculator-*.js          # Calculator migrations
│   └── [various scripts]                 # Utility scripts
│
├── types/                                 # TypeScript definitions
│   ├── next-auth.d.ts                    # NextAuth types
│   ├── nerdamer.d.ts                     # Nerdamer types
│   ├── pdfjs-dist.d.ts                   # PDF.js types
│   ├── similar-calculators.ts            # Calculator types
│   └── wheel-spinner.ts                  # Game types
│
├── public/                                # Static assets (7 items)
├── styles/                                # Additional styles
├── meta/                                  # Metadata files (3 items)
├── docs/                                  # Documentation (14 items)
│
├── middleware.ts                          # Next.js middleware (1145 lines)
├── next.config.mjs                        # Next.js configuration
├── sanity.config.ts                       # Sanity Studio config
├── tsconfig.json                          # TypeScript config
├── tailwind.config.js                     # Tailwind config
├── postcss.config.mjs                     # PostCSS config
├── package.json                           # Dependencies
├── .eslintrc.json                         # ESLint config
├── .gitignore                             # Git ignore rules
├── .env.local                             # Environment variables (gitignored)
│
├── calculator-content.txt                 # Seatime calculator content
├── calculator-analysis.json               # Calculator analysis data
└── [language]-internal-linking.csv        # Internal linking data
```

---

## Architecture

### App Router Structure

The project uses Next.js 14+ App Router with route groups for organization:

#### Route Groups (Parentheses)
- `(calculators-by-category)` - Calculator pages organized by category
- `(category)` - Category landing pages
- `(games-other-pages)` - Game pages and miscellaneous
- `(other-pages)` - Static pages (About, Contact, etc.)
- `(single-blog)` - Individual blog post pages

#### Special Routes
- `/api/*` - API endpoints
- `/auth/*` - Authentication pages
- `/admin/*` - Admin dashboard
- `/community/*` - Community features
- `/creator/*` - Creator pages
- `/profile/*` - User profiles
- `/studio/*` - Sanity Studio CMS

### Rendering Strategy

**Server Components (Default)**
- All pages render on the server by default
- Metadata generation happens server-side
- Content fetching from Sanity CMS on server

**Client Components**
- Interactive calculators
- Forms and user input
- Authentication UI
- Real-time features (comments, reactions)
- Animations and transitions

---

## Key Features

### 1. **Multi-Language Calculator Platform**
- 500+ calculators across 11 categories
- Support for 5 languages (en, br, pl, de, es)
- Dynamic URL translation via middleware
- Language-specific metadata and content

### 2. **Content Management System**
- Sanity CMS integration
- Blog posts with rich text
- Calculator metadata management
- Author profiles
- Category management

### 3. **Community Features**
- User authentication (Google OAuth)
- Community posts and discussions
- Comments with nested replies
- Reactions (like, love, celebrate, etc.)
- User profiles and roles

### 4. **SEO Optimization**
- Server-side rendering
- Dynamic metadata generation
- Structured data (JSON-LD)
- Canonical URLs
- Hreflang tags for multilingual
- Sitemaps for each language
- Open Graph and Twitter cards

### 5. **Games & Interactive Tools**
- Wordle game
- Wheel spinners (animal, aesthetic, age, anime)
- Money management games
- Cashier simulators
- Mental math challenges

### 6. **Analytics & Monitoring**
- Google Analytics integration
- Microsoft Clarity session recording
- Vercel Analytics
- Speed Insights
- Custom event tracking

---

## Middleware & Routing

### Middleware (`middleware.ts`)

The middleware handles critical routing logic:

#### 1. **Language Detection & URL Rewriting**
```typescript
// Pattern: /{lang}/{calculator-slug}
// Example: /br/calculadora-imc → rewrites to /bmi-calculator
```

**URL Mapping System:**
- `urlMappings`: Translates localized slugs to English
- `reverseUrlMappings`: Generates hreflang alternate URLs
- Supports 500+ calculator translations per language

#### 2. **Static Page Handling**
```typescript
const staticPages = [
  'about-us', 'contact-us', 'privacy-policy', 
  'terms-and-conditions', 'blogs', 'sitemap'
]
```
- Static pages always use English URLs
- Localized static page URLs redirect to English (301)

#### 3. **URL Normalization**
- Converts uppercase URLs to lowercase (301 redirect)
- Ensures SEO consistency

#### 4. **Header Injection**
```typescript
response.headers.set('x-language', lang);
response.headers.set('x-pathname', pathname);
```
- Language information passed to components
- Used for content fetching and metadata

### Routing Flow

```
Request: /br/calculadora-imc
    ↓
Middleware intercepts
    ↓
Extracts language: 'br'
    ↓
Translates slug: calculadora-imc → bmi-calculator
    ↓
Rewrites to: /bmi-calculator
    ↓
Sets headers: x-language=br
    ↓
Page renders with Portuguese content
```

---

## Content Management

### Sanity CMS Integration

#### Schemas

**1. Blog Posts (`blog.ts`)**
```typescript
{
  title: string
  slug: string
  author: reference
  mainImage: image
  categories: array<reference>
  publishedAt: datetime
  body: blockContent
  excerpt: text
  seo: object
}
```

**2. Authors (`author.ts`)**
```typescript
{
  name: string
  slug: string
  image: image
  bio: array<block>
  socialLinks: object
}
```

**3. Calculators (`calculator.ts`)**
```typescript
{
  name: string
  slug: string
  category: reference
  description: text
  featured: boolean
}
```

**4. Community Users (`community-user.ts`)**
```typescript
{
  name: string
  email: string
  image: string
  role: 'user' | 'moderator' | 'admin'
  createdAt: datetime
}
```

**5. Community Posts (`community-post.ts`)**
```typescript
{
  title: string
  content: blockContent
  author: reference
  tags: array<string>
  status: 'draft' | 'published'
  createdAt: datetime
}
```

**6. Comments (`community-comment.ts`)**
```typescript
{
  content: text
  author: reference
  post: reference
  parentComment: reference (for nested replies)
  createdAt: datetime
}
```

**7. Reactions (`community-reaction.ts`)**
```typescript
{
  type: 'like' | 'love' | 'celebrate' | 'support' | 'insightful'
  user: reference
  post: reference
  createdAt: datetime
}
```

### Content Loading

**Server-Side Content Fetching:**
```typescript
// lib/loadHomepageContent.ts
export async function loadHomepageContent(language: string) {
  const content = await import(`@/app/content/homepage/${language}.json`)
  return { content: content.default }
}

// lib/loadCategoryContent.ts
export async function loadCategoryContent(category: string, language: string) {
  const content = await import(`@/app/content/pages/${category}-${language}.json`)
  return content.default
}
```

**Client-Side Hooks:**
```typescript
// hooks/useCalculatorContent.ts
export function useCalculatorContent(calculatorId: string, language: string) {
  const [content, setContent] = useState(null)
  
  useEffect(() => {
    import(`@/app/content/calculator-guide/${calculatorId}-${language}.json`)
      .then(module => setContent(module.default))
  }, [calculatorId, language])
  
  return content
}
```

---

## Authentication & Authorization

### NextAuth Configuration (`lib/auth.ts`)

**Provider:**
- Google OAuth 2.0

**Session Strategy:**
- JWT-based sessions

**User Flow:**
1. User clicks "Sign In with Google"
2. Google OAuth authentication
3. User data synced to Sanity CMS
4. JWT token created with user role
5. Session established

**Role-Based Access:**
```typescript
session.user.role: 'user' | 'moderator' | 'admin'
```

**Callbacks:**
- `signIn`: Creates/updates user in Sanity
- `jwt`: Fetches user role from Sanity
- `session`: Attaches role to session

**Protected Routes:**
- `/admin/*` - Admin only
- `/creator/*` - Authenticated users
- `/profile/*` - Own profile only

### Session Provider

```tsx
// components/providers/session-provider.tsx
<SessionProvider>
  {children}
</SessionProvider>
```

---

## API Routes

### `/api/auth/[...nextauth]`
NextAuth.js authentication endpoints

### `/api/author/[slug]`
Fetch author data by slug

### `/api/rating/*`
Calculator rating system
- POST: Submit rating
- GET: Fetch ratings

### `/api/youtube/*`
YouTube integration (likely for video embeds)

---

## Components

### Core Components

**1. Header (`components/header.tsx`)**
- Navigation menu
- Language switcher
- User authentication UI
- Mobile responsive menu
- Breadcrumb integration

**2. Footer (`components/footer.tsx`, `components/footer-client.tsx`)**
- Multi-language support
- Category links
- Social media links
- Newsletter signup
- Legal links

**3. Search Bar (`components/search-bar.tsx`)**
- Real-time calculator search
- Multi-language search
- Keyboard navigation
- Mobile optimized

**4. Dynamic Breadcrumb (`components/dynamic-breadcrumb.tsx`)**
- Auto-generated from URL
- Language-aware
- Schema.org markup

### Calculator Components

**Standalone Calculators:**
- `depop-fee-calculator.tsx`
- `end-of-service-calculator.tsx`
- `ethnicity-calculator.tsx`
- `flange-weight-calculator.tsx`
- `home-inspection-cost-calculator.tsx`
- `homepage-scientific-calculator.tsx`
- `msi-calculator.tsx`
- `pressure-washing-estimate-calculator.tsx`
- `song-length-calculator.tsx`
- `venmo-fee-calculator.tsx`
- `wall-panelling-calculator.tsx`
- `water-potential-calculator.tsx`
- `whatnot-fee-calculator.tsx`

### UI Components (`components/ui/`)

51 Radix UI-based components:
- Accordion, Alert Dialog, Avatar
- Button, Card, Checkbox
- Dialog, Dropdown Menu, Form
- Input, Label, Popover
- Select, Separator, Sheet
- Slider, Switch, Tabs
- Toast, Tooltip, etc.

### Community Components (`components/community/`)

8 components for community features:
- Post creation/editing
- Comment threads
- Reaction buttons
- User profiles
- Moderation tools

### Admin Components (`components/admin/`)

5 components for admin dashboard:
- User management
- Content moderation
- Analytics dashboard
- Settings panel

### Game Components (`components/games/`)

17 game components:
- Wordle game
- Wheel spinners
- Money management games
- Cashier simulators
- Math challenges

---

## State Management

### Zustand Stores (`lib/stores/`)

**Global State:**
- User preferences
- Theme settings
- Calculator history
- Search state

**Example Store:**
```typescript
import { create } from 'zustand'

interface CalculatorStore {
  history: Calculation[]
  addCalculation: (calc: Calculation) => void
  clearHistory: () => void
}

export const useCalculatorStore = create<CalculatorStore>((set) => ({
  history: [],
  addCalculation: (calc) => set((state) => ({
    history: [...state.history, calc]
  })),
  clearHistory: () => set({ history: [] })
}))
```

---

## Internationalization (i18n)

### Supported Languages

| Code | Language | Locale |
|------|----------|--------|
| en | English | en-US |
| br | Portuguese (Brazil) | pt-BR |
| pl | Polish | pl-PL |
| de | German | de-DE |
| es | Spanish | es-ES |

### Language Detection

**Priority Order:**
1. URL prefix (`/br/`, `/pl/`, etc.)
2. `x-language` header (set by middleware)
3. Default to English

### URL Structure

**English (Default):**
```
/bmi-calculator
/financial/loan-calculator
```

**Localized:**
```
/br/calculadora-imc
/br/financeiro/calculadora-de-emprestimo

/de/bmi-rechner
/de/finanziell/kreditrechner
```

### Translation System

**URL Mappings:**
- 500+ calculator slugs per language
- Category translations
- Subcategory translations

**Content Files:**
```
app/content/
  calculator-guide/
    bmi-calculator-en.json
    bmi-calculator-br.json
    bmi-calculator-pl.json
    bmi-calculator-de.json
    bmi-calculator-es.json
```

**Metadata Translation:**
```typescript
const homepageMeta = {
  en: { title: "...", description: "..." },
  br: { title: "...", description: "..." },
  pl: { title: "...", description: "..." },
  de: { title: "...", description: "..." },
  es: { title: "...", description: "..." }
}
```

### Hreflang Implementation

```tsx
<link rel="alternate" hreflang="en" href="https://www.thesmartcalculator.com/bmi-calculator" />
<link rel="alternate" hreflang="pt-BR" href="https://www.thesmartcalculator.com/br/calculadora-imc" />
<link rel="alternate" hreflang="pl" href="https://www.thesmartcalculator.com/pl/kalkulator-bmi" />
<link rel="alternate" hreflang="de" href="https://www.thesmartcalculator.com/de/bmi-rechner" />
<link rel="alternate" hreflang="es" href="https://www.thesmartcalculator.com/es/calculadora-imc" />
<link rel="alternate" hreflang="x-default" href="https://www.thesmartcalculator.com/bmi-calculator" />
```

---

## SEO & Performance

### SEO Features

**1. Metadata Generation**
```typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "...",
    description: "...",
    keywords: "...",
    openGraph: { ... },
    twitter: { ... },
    alternates: {
      canonical: "...",
      languages: { ... }
    }
  }
}
```

**2. Structured Data (JSON-LD)**
```typescript
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "the smart calculator",
  "applicationCategory": "Calculators",
  // ... more schema data
}
```

**3. Sitemaps**
- `/sitemap.xml` - Main sitemap
- `/sitemap-en.xml` - English
- `/sitemap-br.xml` - Portuguese
- `/sitemap-pl.xml` - Polish
- `/sitemap-de.xml` - German
- `/sitemap-es.xml` - Spanish

**4. Robots.txt**
```
User-agent: *
Allow: /
Sitemap: https://www.thesmartcalculator.com/sitemap.xml
```

### Performance Optimizations

**1. Next.js Configuration (`next.config.mjs`)**
```javascript
{
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'lucide-react',
      'react-icons',
      '@radix-ui/*'
    ]
  }
}
```

**2. Image Optimization**
```javascript
images: {
  unoptimized: true,
  remotePatterns: [
    { protocol: 'https', hostname: 'cdn.sanity.io' },
    { protocol: 'https', hostname: 'lh3.googleusercontent.com' }
  ]
}
```

**3. Caching Headers**
```javascript
headers: [
  {
    source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp)',
    headers: [
      { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
    ]
  }
]
```

**4. Code Splitting**
- Automatic route-based splitting
- Dynamic imports for heavy components
- Lazy loading for below-fold content

**5. Font Optimization**
```typescript
const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})
```

**6. Script Loading Strategy**
```tsx
<Script src="..." strategy="lazyOnload" />
```

### Analytics Integration

**Google Analytics:**
```tsx
<Script src="https://www.googletagmanager.com/gtag/js?id=G-18W2MEF31Q" strategy="lazyOnload" />
```

**Microsoft Clarity:**
```tsx
<Script id="microsoft-clarity" strategy="lazyOnload">
  {`(function(c,l,a,r,i,t,y){ ... })`}
</Script>
```

**Vercel Analytics:**
```tsx
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

<Analytics />
<SpeedInsights />
```

---

## Scripts & Utilities

### Migration Scripts (`scripts/`)

**Calculator Migration:**
- `migrate-calculator-to-server.js` - Convert to server components
- `migrate-to-server-client.js` - Hybrid migration
- `migrate-simple.js` - Simple migrations

**SEO Scripts:**
- `fix-all-seo-issues.js` - Batch SEO fixes
- `fix-calculator-metadata.ts` - Metadata updates
- `fix-category-metadata.ts` - Category SEO
- `verify-seo-fixes.ts` - Validation

**Content Scripts:**
- `add-spanish-metadata.ts` - Spanish translations
- `test-spanish-meta.ts` - Translation testing
- `add-rating-profile-section.ts` - Rating features

**Data Conversion:**
- `convert-workflows-csv-to-json.mjs` - CSV to JSON
- `convert-internal-links.cjs` - Link conversion

### Utility Libraries

**Language Utils (`lib/language-utils.ts`):**
- `getLocalizedCalculatorData()`
- `getLocalizedCalculatorHref()`
- `getLanguageFromPath()`

**URL Utils (`lib/url-utils.ts`):**
- `getLanguageSwitcherUrl()`
- `translateUrl()`
- `getCanonicalUrl()`

**Metadata Utils (`lib/metadata-utils.ts`):**
- `generateCalculatorMetadata()`
- `generateCategoryMetadata()`
- `generateBlogMetadata()`

---

## Deployment

### Environment Variables

Required variables (in `.env.local`):
```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# NextAuth
NEXTAUTH_URL=https://www.thesmartcalculator.com
NEXTAUTH_SECRET=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Analytics
NEXT_PUBLIC_GA_ID=G-18W2MEF31Q
```

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Linting
npm run lint

# Custom scripts
npm run add-spanish-meta
npm run test-spanish-meta
```

### Deployment Platform

**Vercel (Recommended):**
- Automatic deployments from Git
- Edge network CDN
- Analytics integration
- Environment variable management

**Build Configuration:**
```json
{
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "framework": "nextjs"
}
```

### Domain Configuration

**Primary Domain:**
- `www.thesmartcalculator.com`

**Redirects:**
- `thesmartcalculator.com` → `www.thesmartcalculator.com` (301)
- HTTP → HTTPS (301)

---

## Key Technical Decisions

### 1. **App Router over Pages Router**
- Better performance with React Server Components
- Improved data fetching patterns
- Simplified routing with file-system based routing

### 2. **Middleware for i18n**
- URL rewriting for SEO-friendly localized URLs
- No client-side language detection overhead
- Proper canonical URL management

### 3. **Sanity CMS**
- Flexible content modeling
- Real-time collaboration
- Portable text for rich content
- Image CDN integration

### 4. **Server Components by Default**
- Reduced JavaScript bundle size
- Faster initial page loads
- Better SEO with server-rendered content

### 5. **Zustand for State Management**
- Lightweight compared to Redux
- Simple API
- TypeScript support
- No boilerplate

### 6. **Radix UI Primitives**
- Accessibility built-in
- Unstyled components
- Full keyboard navigation
- ARIA attributes

---

## Development Guidelines

### Code Organization

**Component Structure:**
```tsx
// 1. Imports
import { useState } from 'react'
import { Button } from '@/components/ui/button'

// 2. Types
interface Props { ... }

// 3. Component
export function MyComponent({ prop }: Props) {
  // 4. Hooks
  const [state, setState] = useState()
  
  // 5. Handlers
  const handleClick = () => { ... }
  
  // 6. Render
  return <div>...</div>
}
```

**File Naming:**
- Components: `PascalCase.tsx` or `kebab-case.tsx`
- Utilities: `camelCase.ts`
- Types: `PascalCase.ts`
- Hooks: `useCamelCase.ts`

### Best Practices

1. **Use Server Components when possible**
2. **Implement proper error boundaries**
3. **Add loading states for async operations**
4. **Use TypeScript strictly**
5. **Follow accessibility guidelines**
6. **Optimize images and assets**
7. **Implement proper SEO metadata**
8. **Test across multiple languages**

---

## Troubleshooting

### Common Issues

**1. Build Errors:**
- Check TypeScript errors: `npm run lint`
- Verify environment variables
- Clear `.next` folder: `rm -rf .next`

**2. Middleware Not Working:**
- Check middleware matcher configuration
- Verify URL mapping completeness
- Test with different language prefixes

**3. Sanity Content Not Loading:**
- Verify Sanity project ID and dataset
- Check API token permissions
- Validate GROQ queries

**4. Authentication Issues:**
- Verify Google OAuth credentials
- Check NEXTAUTH_URL matches domain
- Ensure NEXTAUTH_SECRET is set

---

## Future Enhancements

### Planned Features
1. More calculator types
2. Additional language support
3. Mobile app (React Native)
4. API for third-party integrations
5. Advanced analytics dashboard
6. User calculator history
7. Social sharing features
8. Calculator embedding widget

### Performance Improvements
1. Implement ISR for static calculators
2. Add service worker for offline support
3. Optimize bundle size further
4. Implement edge caching
5. Add image lazy loading

---

## Support & Resources

### Documentation
- Next.js: https://nextjs.org/docs
- Sanity: https://www.sanity.io/docs
- NextAuth: https://next-auth.js.org
- Tailwind CSS: https://tailwindcss.com/docs

### Contact
- Email: thesmartcalculators@gmail.com
- Website: https://www.thesmartcalculator.com
- Social: @SmartCalculat0r (Twitter/X)

---

**Last Updated:** April 11, 2026
**Version:** 1.0.0
**Maintained by:** The Smart Calculator Team
