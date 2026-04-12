# The Smart Calculator

> A comprehensive multi-language calculator platform built with Next.js 16, featuring 500+ calculators across 11 categories with full internationalization support.

[![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.9-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red)](LICENSE)

## 🌟 Features

- **500+ Calculators** - Finance, Health, Math, Physics, Construction, Food, Sports, and more
- **Multi-Language Support** - English, Portuguese (BR), Polish, German, Spanish
- **SEO Optimized** - Server-side rendering, dynamic metadata, structured data
- **Content Management** - Sanity CMS integration for blogs and dynamic content
- **Community Features** - User authentication, posts, comments, reactions
- **Interactive Games** - Wordle, wheel spinners, money management games
- **Modern UI** - Responsive design with Radix UI components and Framer Motion animations
- **Performance Focused** - Optimized for Core Web Vitals, lazy loading, code splitting

## 📚 Documentation

Comprehensive documentation is available in the following files:

1. **[PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md)** - Complete project overview, architecture, and features
2. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Technical architecture, data flow, and system design
3. **[API_REFERENCE.md](./API_REFERENCE.md)** - API documentation, server actions, and development guide

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Sanity account (for CMS)
- Google OAuth credentials (for authentication)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd the-smart-calculator
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
```

4. **Run development server**
```bash
npm run dev
```

5. **Open your browser**
```
http://localhost:3000
```

## 🏗️ Project Structure

```
the-smart-calculator/
├── app/                      # Next.js App Router
│   ├── (calculators-by-category)/
│   ├── (category)/
│   ├── (games-other-pages)/
│   ├── api/                  # API routes
│   ├── content/              # Static content (1181 items)
│   └── layout.tsx
├── components/               # React components
│   ├── ui/                   # UI components (51 items)
│   ├── games/                # Game components (17 items)
│   └── community/            # Community features (8 items)
├── lib/                      # Utilities and libraries
│   ├── actions/              # Server actions (6 files)
│   ├── sanity/               # Sanity CMS client
│   └── utils/                # Helper functions
├── hooks/                    # Custom React hooks (9 files)
├── sanity/                   # Sanity schemas (11 schemas)
├── scripts/                  # Build scripts (25 files)
├── middleware.ts             # Next.js middleware (1145 lines)
└── next.config.mjs           # Next.js configuration
```

## 🌐 Supported Languages

| Language | Code | URL Prefix | Example |
|----------|------|------------|---------|
| English | en | / | `/bmi-calculator` |
| Portuguese (Brazil) | br | /br | `/br/calculadora-imc` |
| Polish | pl | /pl | `/pl/kalkulator-bmi` |
| German | de | /de | `/de/bmi-rechner` |
| Spanish | es | /es | `/es/calculadora-imc` |

## 📊 Calculator Categories

1. **Financial** - Mortgage, loan, investment, retirement calculators
2. **Health** - BMI, calorie, pregnancy, fitness calculators
3. **Mathematics** - Scientific, percentage, algebra calculators
4. **Physics** - Velocity, momentum, energy calculators
5. **Construction** - Material, measurement, cost calculators
6. **Food** - Recipe conversion, nutrition calculators
7. **Sports** - Pace, statistics, performance calculators
8. **Business** - ROI, break-even, cost calculators
9. **Software** - IP subnet, encoding calculators
10. **Games** - Wordle, wheel spinners, money games
11. **Other** - Age, time, GPA calculators

## 🔧 Tech Stack

### Core
- **Next.js 16.0.7** - React framework with App Router
- **React 19.2.1** - UI library
- **TypeScript 5** - Type safety

### Styling
- **Tailwind CSS 4.1.9** - Utility-first CSS
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library

### Content & Data
- **Sanity 5.0.1** - Headless CMS
- **Zustand** - State management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Authentication
- **NextAuth.js** - Authentication
- **Google OAuth** - Social login

### Analytics
- **Google Analytics** - User analytics
- **Microsoft Clarity** - Session recording
- **Vercel Analytics** - Performance monitoring

## 🎯 Key Features Explained

### Multi-Language Routing

The middleware handles automatic URL translation:

```
Request: /br/calculadora-imc
    ↓
Middleware translates: calculadora-imc → bmi-calculator
    ↓
Rewrites to: /bmi-calculator
    ↓
Sets header: x-language=br
    ↓
Page renders with Portuguese content
```

### Server Components by Default

Most pages use React Server Components for better performance:
- Faster initial page loads
- Reduced JavaScript bundle size
- Better SEO with server-rendered content

### Content Management

Content is managed through two systems:
1. **Sanity CMS** - Dynamic content (blogs, authors, community)
2. **Static JSON** - Calculator content (563 guides, 578 UIs)

### Community Features

- User authentication via Google OAuth
- Create and manage posts
- Comment with nested replies
- React to posts (like, love, celebrate, support, insightful)
- Role-based access (user, moderator, admin)

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start development server

# Production
npm run build            # Build for production
npm run start            # Start production server

# Linting
npm run lint             # Run ESLint

# Custom Scripts
npm run add-spanish-meta # Add Spanish metadata
npm run test-spanish-meta # Test Spanish metadata
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub/GitLab
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 🔒 Environment Variables

Required environment variables:

```env
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
```

## 📖 API Documentation

### Server Actions

```typescript
// Create a community post
import { createPost } from '@/lib/actions/post-actions'

const result = await createPost({
  title: 'My Post',
  content: [...],
  tags: ['bmi', 'health']
})
```

### API Routes

```typescript
// Fetch author data
const response = await fetch('/api/author/john-doe')
const author = await response.json()
```

See [API_REFERENCE.md](./API_REFERENCE.md) for complete API documentation.

## 🎨 Component Usage

### Using UI Components

```tsx
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function MyComponent() {
  return (
    <Card>
      <Button variant="default">Click me</Button>
    </Card>
  )
}
```

### Using Custom Hooks

```tsx
import { useCalculatorContent } from '@/hooks/useCalculatorContent'

export function Calculator() {
  const { content, loading } = useCalculatorContent('bmi-calculator', 'en')
  
  if (loading) return <Loading />
  return <div>{content.title}</div>
}
```

## 🧪 Testing

### Manual Testing

Run through the testing checklist in [API_REFERENCE.md](./API_REFERENCE.md#testing-guide)

### Browser Testing

Test on:
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Common Issues

**Build fails with TypeScript errors:**
```bash
npm run lint
npm run lint -- --fix
```

**Middleware not working:**
- Clear `.next` folder: `rm -rf .next`
- Rebuild: `npm run build`

**Sanity content not loading:**
- Verify project ID and dataset
- Check API token permissions

See [API_REFERENCE.md](./API_REFERENCE.md#troubleshooting-common-issues) for more solutions.

## 📊 Performance

Target metrics:
- First Contentful Paint (FCP): < 1.8s
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1

## 🤝 Contributing

This is a proprietary project. For contribution guidelines, please contact the team.

## 📄 License

Proprietary - All rights reserved by Smart Calculator sp. z o.o.

## 📞 Support

- **Email:** thesmartcalculators@gmail.com
- **Website:** https://www.thesmartcalculator.com
- **Twitter:** @SmartCalculat0r

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Sanity for the CMS platform
- All open-source contributors

---

**Built with ❤️ by The Smart Calculator Team**

**Last Updated:** April 11, 2026
