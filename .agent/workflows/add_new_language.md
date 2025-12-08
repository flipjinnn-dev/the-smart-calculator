---
description: How to add a new language to the Smart Calculator project
---

# Adding a New Language

Follow these steps to add a new language (e.g., Spanish `es`) to the project.

## 1. Update Middleware (`middleware.ts`)

1.  Add the new language code to the `urlMappings` object.
    ```typescript
    export const urlMappings = {
      // ... existing languages
      'es': {
        // Add translations for categories and calculator slugs
        // 'calculadora-de-hipoteca': 'mortgage-calculator',
        // 'financeiro': 'financial',
      }
    }
    ```
2.  Update the regex in the `middleware` function to include the new language code.
    ```typescript
    // Look for this line:
    const langMatch = pathname.match(/^\/(br|pl|de|es)(\/.*)?/);
    ```

## 2. Update Metadata

### Calculators (`meta/calculators.ts`)
Add the new language entry for **EVERY** calculator in `calculatorsMeta`.
```typescript
'mortgage-calculator': {
  // ... existing languages
  es: {
    title: "Calculadora de Hipoteca",
    description: "...",
    slug: "/es/financeiro/calculadora-de-hipoteca",
    keywords: "..."
  }
}
```

### Categories (`meta/categories.js`)
Add the new language entry for every category.
```javascript
financial: {
  // ...
  es: {
    title: "Calculadoras Financieras",
    slug: "financeiro", // Localized category slug
    description: "..."
  }
}
```

## 3. Update Components

### Header (`components/header.tsx`)
Add the new language to the `languages` array.
```typescript
const languages = [
  // ...
  { code: "es", name: "Español" },
]
```

### Search Bar (`components/search-bar.tsx`)
Update the placeholder and "no results" text to include the new language.
```typescript
placeholder={
  // ...
  language === 'es' ? "Buscar calculadora..." :
  "Search calculator..."
}
```

### Language Footer (`components/language-footer.tsx`)
Add the new language to the `languages` array to show it in the footer.

## 4. Update Utilities (`lib/url-utils.ts`)

1.  Update `getStaticPageCanonicalUrl` mapping to include the new language paths for static pages (About Us, Contact, etc.).
2.  Update `getCurrentLanguage` regex if it's duplicated there (it is).
3.  Update `getLanguageSwitcherUrl` regex if it's duplicated there (it is).

## 5. Verify

1.  Run the dev server: `npm run dev`
2.  Navigate to `localhost:3000/es/` (or your new language prefix).
3.  Check if the homepage loads with localized content.
4.  Test the search bar.
5.  Test switching languages via the header and footer.
6.  Verify that calculator pages load correctly with the localized URL.
