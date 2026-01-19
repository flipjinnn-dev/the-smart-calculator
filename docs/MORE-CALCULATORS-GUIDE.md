# More Calculators Category - Implementation Guide

## Overview
The "More Calculators" category is a special category that uses **tabbed subcategories** to organize calculators by specialized domains (Software, Web & IT, Business & Startups, etc.). This guide explains how the system works and how to add new subcategories or calculators.

## Architecture

### Key Features
- ✅ **Scalable subcategory system** - Easy to add new tabs/subcategories
- ✅ **Multilingual support** - All 5 languages (en, br, de, es, pl)
- ✅ **Beautiful tabbed UI** - Modern glassmorphism design with smooth animations
- ✅ **Dynamic content loading** - Subcategories and calculators load dynamically
- ✅ **No hardcoding** - Everything is data-driven

### File Structure

```
meta/
├── categories.js              # Category metadata (includes more-calculators)
└── subcategories.js           # NEW: Subcategory metadata for tabs

lib/
├── calculator-data.ts         # Calculator registry (updated with subcategory field)
├── getSubcategoryMeta.ts      # NEW: Helper to get subcategory metadata
└── getCategoryMeta.ts         # Existing category metadata helper

app/(category)/more-calculators/
├── page.tsx                   # Server component - loads data
├── more-calculators-client.tsx # Client component - tabbed UI
└── layout.tsx                 # Metadata and layout
```

## How to Add a New Subcategory

### Step 1: Add Subcategory Metadata
Edit `meta/subcategories.js`:

```javascript
'your-subcategory-id': {
  en: {
    name: "Your Subcategory Name",
    slug: "your-subcategory",
    description: "Description in English"
  },
  br: {
    name: "Nome da Subcategoria",
    slug: "sua-subcategoria",
    description: "Descrição em português"
  },
  // Add pl, de, es translations...
}
```

### Step 2: Add Icon Mapping (Optional)
Edit `app/(category)/more-calculators/more-calculators-client.tsx`:

```typescript
const getIcon = (subcategoryId: string) => {
  switch (subcategoryId) {
    case 'your-subcategory-id':
      return YourIcon  // Import from lucide-react
    // ... existing cases
  }
}
```

### Step 3: Add Calculators to Subcategory
Edit `lib/calculator-data.ts`:

```typescript
{
  id: "your-calculator-id",
  name: "Calculator Name",
  description: "Brief description",
  href: "/more-calculators/your-calculator-slug",
  category: "more-calculators",
  subcategory: "your-subcategory-id",  // Link to subcategory
}
```

That's it! The tab will automatically appear with your calculators.

## How to Add a Calculator to Existing Subcategory

Simply add the calculator to `lib/calculator-data.ts` with the appropriate `subcategory` field:

```typescript
{
  id: "new-calculator",
  name: "New Calculator",
  description: "Description",
  href: "/more-calculators/new-calculator",
  category: "more-calculators",
  subcategory: "software",  // Use existing subcategory ID
}
```

## Current Subcategories

1. **software** - Software Development
   - Icon: Code
   - For: Development tools, code calculators, etc.

2. **web-it** - Web & IT
   - Icon: Globe
   - For: Web development, IT infrastructure, networking tools

3. **business-startups** - Business & Startups
   - Icon: Briefcase
   - For: Business metrics, startup valuations, ROI calculators

## Multilingual Support

### Category Translations
Located in `meta/categories.js` under `'more-calculators'`:
- English: "More Calculators"
- Portuguese: "Mais Calculadoras"
- Polish: "Więcej Kalkulatorów"
- German: "Weitere Rechner"
- Spanish: "Más Calculadoras"

### Subcategory Translations
Located in `meta/subcategories.js` - each subcategory has translations for all 5 languages.

### Homepage Integration
The category appears on the homepage in `app/content/homepage/{lang}.json` under the `categories` section.

## UI/UX Features

### Tabbed Interface
- **Responsive grid**: 1 column on mobile, 3 columns on desktop
- **Active tab styling**: Gradient background (blue to purple)
- **Smooth transitions**: Tab changes animate smoothly
- **Icon integration**: Each tab shows its icon

### Calculator Cards
- **Glassmorphism design**: Semi-transparent backgrounds with blur
- **Hover effects**: Lift animation and gradient color bar
- **Gradient accents**: Blue → Purple → Pink
- **Call-to-action**: "Calculate Now →" with hover animation

### Empty State
When a subcategory has no calculators, it shows a friendly "Coming Soon" message.

## Helper Functions

### `getCalculatorsBySubcategory(category, subcategory, language)`
Returns all calculators for a specific subcategory with localized data.

```typescript
const calculators = getCalculatorsBySubcategory("more-calculators", "software", "en");
```

### `getSubcategoriesByCategory(category)`
Returns array of subcategory IDs for a category.

```typescript
const subcategoryIds = getSubcategoriesByCategory("more-calculators");
// Returns: ["software", "web-it", "business-startups"]
```

### `getSubcategoryMeta(subcategoryId, language)`
Returns localized metadata for a subcategory.

```typescript
const meta = getSubcategoryMeta("software", "en");
// Returns: { name: "Software Development", slug: "software", description: "..." }
```

## Best Practices

1. **Consistent Naming**: Use kebab-case for IDs (e.g., `web-it`, `business-startups`)
2. **Icon Selection**: Choose relevant Lucide icons that represent the subcategory
3. **Descriptions**: Keep descriptions concise (under 100 characters)
4. **Translations**: Always provide all 5 language translations
5. **Testing**: Test on mobile and desktop to ensure responsive design works

## Future Enhancements

Potential improvements:
- Add subcategory-specific colors/themes
- Implement subcategory filtering/search
- Add calculator count badges to tabs
- Create subcategory landing pages
- Add analytics tracking per subcategory

## Example: Adding "AI & Machine Learning" Subcategory

```javascript
// 1. Add to meta/subcategories.js
'ai-ml': {
  en: {
    name: "AI & Machine Learning",
    slug: "ai-ml",
    description: "AI model calculators and ML metrics"
  },
  // ... other languages
}

// 2. Update icon mapping in more-calculators-client.tsx
case 'ai-ml':
  return Brain  // Import Brain from lucide-react

// 3. Add calculators to lib/calculator-data.ts
{
  id: "model-accuracy-calculator",
  name: "Model Accuracy Calculator",
  description: "Calculate ML model accuracy metrics",
  href: "/more-calculators/model-accuracy-calculator",
  category: "more-calculators",
  subcategory: "ai-ml",
}
```

## Troubleshooting

**Tab not showing?**
- Check that subcategory ID matches in `subcategories.js` and calculator `subcategory` field
- Ensure at least one calculator exists for the subcategory (or it will show "Coming Soon")

**Translations missing?**
- Verify all 5 languages are defined in `meta/subcategories.js`
- Check that `getSubcategoryMeta()` is being called with correct language code

**Icon not displaying?**
- Ensure icon is imported from `lucide-react` in `more-calculators-client.tsx`
- Add case to `getIcon()` function with correct subcategory ID

## Summary

The More Calculators category provides a scalable, maintainable way to organize specialized calculators into logical subcategories. The tabbed interface provides excellent UX while keeping the codebase clean and data-driven. Simply add metadata and calculators - the UI updates automatically!
