import subcategoriesData from "@/meta/subcategories";

interface SubcategoryMetaData {
  [language: string]: {
    name: string;
    slug: string;
    description: string;
  };
}

interface SubcategoriesMeta {
  [subcategoryId: string]: SubcategoryMetaData;
}

/**
 * Get subcategory metadata for a specific subcategory and language
 * @param subcategoryId - The ID of the subcategory (e.g., 'software', 'web-it')
 * @param language - The language code (e.g., 'en', 'br', 'pl', 'de', 'es')
 * @returns Metadata object with name, slug, and description
 */
export function getSubcategoryMeta(subcategoryId: string, language: string = "en") {
  const subcategoriesTypedData = subcategoriesData as SubcategoriesMeta;
  const subcategory = subcategoriesTypedData[subcategoryId];
  
  if (!subcategory) {
    console.warn(`No metadata found for subcategory: ${subcategoryId}`);
    return null;
  }
  
  const meta = subcategory[language] || subcategory["en"];
  
  if (!meta) {
    console.warn(`No metadata found for subcategory: ${subcategoryId} in language: ${language}`);
    return null;
  }
  
  return meta;
}
