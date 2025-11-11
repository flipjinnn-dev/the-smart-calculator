import categoriesData from "@/meta/categories";

interface CategoryMetaData {
  [language: string]: {
    name: string;
    slug: string;
    description: string;
  };
}

interface CategoriesMeta {
  [categoryId: string]: CategoryMetaData;
}

/**
 * Get category metadata for a specific category and language
 * @param categoryId - The ID of the category (e.g., 'health', 'financial')
 * @param language - The language code (e.g., 'en', 'br', 'pl', 'de')
 * @returns Metadata object with name, slug, and description
 */
export function getCategoryMeta(categoryId: string, language: string = "en") {
  const categoriesTypedData = categoriesData as CategoriesMeta;
  const category = categoriesTypedData[categoryId];
  
  if (!category) {
    console.warn(`No metadata found for category: ${categoryId}`);
    return null;
  }
  
  const meta = category[language] || category["en"];
  
  if (!meta) {
    console.warn(`No metadata found for category: ${categoryId} in language: ${language}`);
    return null;
  }
  
  return meta;
}