# 🌍 Multilingual Blog System Guide

## Overview

Your blog system now supports **one blog post with different content and slugs for each language**. This works exactly like your calculator system with middleware URL rewriting.

---

## 🎯 How It Works

### **One Blog Post = 5 Language Versions**

When you create a blog in Sanity Studio:
- **One document** in Sanity
- **Different content** for each language (title, excerpt, body, SEO)
- **Different slugs** for each language
- **Middleware rewrites** localized slugs to English slug (like calculators)

---

## 📝 Creating a Blog Post in Sanity Studio

### Step 1: Basic Information

1. **Blog ID (Internal)**: Unique identifier (e.g., `how-to-calculate-mortgage`)
   - This is like the calculator ID
   - Used for middleware mapping
   - Never shown to users

2. **Featured Image**: Shared across all languages

3. **Author**: Shared across all languages

4. **Categories**: Shared across all languages

5. **Published At**: Publication date/time

---

### Step 2: English Content (🇬🇧 Required)

- **Title**: "How to Calculate Mortgage Payments"
- **Slug**: `how-to-calculate-mortgage` (click "Generate")
- **Excerpt**: Short description (max 200 chars)
- **Body**: Full blog content with rich text
- **Meta Title**: SEO title (max 60 chars)
- **Meta Description**: SEO description (max 160 chars)
- **Keywords**: Comma-separated keywords

---

### Step 3: Portuguese Content (🇧🇷 Optional)

- **Title**: "Como Calcular Pagamentos de Hipoteca"
- **Slug**: `como-calcular-pagamentos-hipoteca` (click "Generate")
- **Excerpt**: Descrição curta
- **Body**: Conteúdo completo do blog
- **Meta Title**: Título SEO
- **Meta Description**: Descrição SEO
- **Keywords**: Palavras-chave

---

### Step 4: Polish Content (🇵🇱 Optional)

- **Title**: "Jak Obliczyć Spłaty Kredytu Hipotecznego"
- **Slug**: `jak-obliczyc-splaty-kredytu-hipotecznego`
- **Excerpt**: Krótki opis
- **Body**: Pełna treść bloga
- **Meta Title**: Tytuł SEO
- **Meta Description**: Opis SEO
- **Keywords**: Słowa kluczowe

---

### Step 5: German Content (🇩🇪 Optional)

- **Title**: "So Berechnen Sie Hypothekenzahlungen"
- **Slug**: `so-berechnen-sie-hypothekenzahlungen`
- **Excerpt**: Kurze Beschreibung
- **Body**: Vollständiger Blog-Inhalt
- **Meta Title**: SEO-Titel
- **Meta Description**: SEO-Beschreibung
- **Keywords**: Schlüsselwörter

---

### Step 6: Spanish Content (🇪🇸 Optional)

- **Title**: "Cómo Calcular Pagos de Hipoteca"
- **Slug**: `como-calcular-pagos-hipoteca`
- **Excerpt**: Descripción breve
- **Body**: Contenido completo del blog
- **Meta Title**: Título SEO
- **Meta Description**: Descripción SEO
- **Keywords**: Palabras clave

---

## 🔗 URL Structure

### Blog Listing Pages:
- English: `/blogs`
- Portuguese: `/br/blogs`
- Polish: `/pl/blogs`
- German: `/de/blogs`
- Spanish: `/es/blogs`

### Blog Detail Pages:
- English: `/how-to-calculate-mortgage`
- Portuguese: `/br/como-calcular-pagamentos-hipoteca`
- Polish: `/pl/jak-obliczyc-splaty-kredytu-hipotecznego`
- German: `/de/so-berechnen-sie-hypothekenzahlungen`
- Spanish: `/es/como-calcular-pagos-hipoteca`

---

## ⚙️ Middleware Setup (IMPORTANT!)

After creating a blog post, you need to add URL mappings to `middleware.ts` (just like calculators):

### Location in middleware.ts:

Find the `urlMappings` and `reverseUrlMappings` objects.

### Add Forward Mappings:

```typescript
export const urlMappings = {
  'br': {
    // ... existing mappings
    'como-calcular-pagamentos-hipoteca': 'how-to-calculate-mortgage',
  },
  'pl': {
    // ... existing mappings
    'jak-obliczyc-splaty-kredytu-hipotecznego': 'how-to-calculate-mortgage',
  },
  'de': {
    // ... existing mappings
    'so-berechnen-sie-hypothekenzahlungen': 'how-to-calculate-mortgage',
  },
  'es': {
    // ... existing mappings
    'como-calcular-pagos-hipoteca': 'how-to-calculate-mortgage',
  },
}
```

### Add Reverse Mappings:

```typescript
export const reverseUrlMappings = {
  'br': {
    // ... existing mappings
    'how-to-calculate-mortgage': 'como-calcular-pagamentos-hipoteca',
  },
  'pl': {
    // ... existing mappings
    'how-to-calculate-mortgage': 'jak-obliczyc-splaty-kredytu-hipotecznego',
  },
  'de': {
    // ... existing mappings
    'how-to-calculate-mortgage': 'so-berechnen-sie-hypothekenzahlungen',
  },
  'es': {
    // ... existing mappings
    'how-to-calculate-mortgage': 'como-calcular-pagos-hipoteca',
  },
}
```

---

## 🔄 How Middleware Works

1. User visits `/br/como-calcular-pagamentos-hipoteca`
2. Middleware detects language: `br`
3. Middleware translates slug: `como-calcular-pagamentos-hipoteca` → `how-to-calculate-mortgage`
4. Middleware rewrites to: `/how-to-calculate-mortgage`
5. Page fetches blog with slug `how-to-calculate-mortgage` and language `br`
6. Sanity returns Portuguese content from that blog post

---

## ✅ Workflow Summary

1. **Create blog post in Sanity Studio**
   - Set Blog ID (internal identifier)
   - Add English content (required)
   - Add other language content (optional)
   - Each language has its own slug

2. **Add middleware mappings**
   - Forward mappings: localized slug → English slug
   - Reverse mappings: English slug → localized slug
   - Do this for all 4 non-English languages

3. **Publish and test**
   - Visit `/blogs` to see listing
   - Click on blog to view detail page
   - Change language to see different content with different URL

---

## 🎨 Benefits of This System

✅ **One blog post** - Manage all languages in one place
✅ **Different slugs** - SEO-friendly URLs in each language
✅ **Different content** - Fully localized title, excerpt, body, meta
✅ **Middleware rewriting** - Clean URLs with proper routing
✅ **Language switcher** - Users can switch languages and see the same blog in different language

---

## 📋 Checklist for Each Blog Post

- [ ] Create blog post in Sanity Studio
- [ ] Set unique Blog ID
- [ ] Add English content (title, slug, excerpt, body, SEO)
- [ ] Add Portuguese content (if needed)
- [ ] Add Polish content (if needed)
- [ ] Add German content (if needed)
- [ ] Add Spanish content (if needed)
- [ ] Add forward URL mappings to `middleware.ts` for all languages
- [ ] Add reverse URL mappings to `middleware.ts` for all languages
- [ ] Test blog in all languages
- [ ] Verify language switcher works

---

## 🐛 Troubleshooting

### Blog not showing in listing:
- Make sure English content has title filled
- Check if blog is published (not draft)
- Verify `publishedAt` date is set

### Blog detail page shows 404:
- Check if slug matches exactly in URL
- Verify middleware mappings are added
- Make sure that language's content exists in Sanity

### Wrong language content showing:
- Check middleware mappings (forward and reverse)
- Verify language detection is working
- Clear browser cache and restart dev server

---

## 💡 Example: Complete Blog Post

**Blog ID**: `mortgage-calculator-guide`

**English**:
- Title: "Complete Guide to Mortgage Calculators"
- Slug: `mortgage-calculator-guide`
- Excerpt: "Learn how to use mortgage calculators effectively..."

**Portuguese**:
- Title: "Guia Completo para Calculadoras de Hipoteca"
- Slug: `guia-completo-calculadoras-hipoteca`
- Excerpt: "Aprenda a usar calculadoras de hipoteca de forma eficaz..."

**Middleware**:
```typescript
// Forward
'br': { 'guia-completo-calculadoras-hipoteca': 'mortgage-calculator-guide' }

// Reverse
'br': { 'mortgage-calculator-guide': 'guia-completo-calculadoras-hipoteca' }
```

**URLs**:
- English: `/mortgage-calculator-guide`
- Portuguese: `/br/guia-completo-calculadoras-hipoteca`

---

## 🎉 You're All Set!

Your multilingual blog system is now ready. Create your first blog post in Sanity Studio, add the middleware mappings, and watch it work across all 5 languages!
