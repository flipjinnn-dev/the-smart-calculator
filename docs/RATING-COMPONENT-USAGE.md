# RatingProfileSection Component Usage Guide

This component is designed to be a drop-in solution for both Calculators and Blog posts.

## 1. Prerequisites

### Environment Variables
Ensure you have added the write-token to your `.env.local`:
```bash
SANITY_API_TOKEN=your_generated_sanity_token_with_editor_permissions
```

### Sanity Schema
Ensure the `calculator` and `blog` schemas have the `ratingTotal` and `ratingCount` fields deployed.

## 2. Data Fetching (GROQ)

Fetch the necessary data in your page component (e.g., `page.tsx`).

### For Calculators
```groq
*[_type == "calculator" && calculatorId == $id][0] {
  _id,
  "ratingTotal": coalesce(ratingTotal, 0),
  "ratingCount": coalesce(ratingCount, 0),
  author->{
    name,
    "slug": slug.current,
    "image": image.asset->url,
    bio
  }
}
```

### For Blog Posts
```groq
*[_type == "blog" && blogId == $id][0] {
  _id,
  "ratingTotal": coalesce(ratingTotal, 0),
  "ratingCount": coalesce(ratingCount, 0),
  author->{
    name,
    "slug": slug.current,
    "image": image.asset->url,
    bio
  }
}
```

## 3. Component Implementation

```tsx
import { RatingProfileSection } from '@/components/rating-profile-section';

// Inside your page component
export default function CalculatorPage({ data }) {
  return (
    <div className="container mx-auto px-4">
      {/* ... Calculator Content ... */}

      <RatingProfileSection
        entityId={data._id}
        entityType="calculator" // or "blog"
        initialRatingTotal={data.ratingTotal}
        initialRatingCount={data.ratingCount}
        creatorProfile={{
          name: data.author.name,
          slug: data.author.slug,
          image: data.author.image,
          bio: data.author.bio
        }}
      />
    </div>
  );
}
```

## 4. Features
- **Optimistic Updates**: UI updates instantly before the API call finishes.
- **Cookie Persistence**: Prevents users from rating the same content multiple times.
- **Secure API**: Ratings are processed server-side via Next.js API Routes.
- **Responsive**: Stacks vertically on mobile, side-by-side on desktop.
