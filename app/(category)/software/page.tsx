import { headers } from "next/headers";
import CategoryClient from "../category-client";
import { loadCategoryContent } from "@/lib/loadCategoryContent";
import { getCalculatorsByCategory, getPopularCalculatorsByCategory } from "@/lib/calculator-data";

export default async function SoftwareCategoryPage() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const { content } = await loadCategoryContent("software", language);
  const allCalculators = getCalculatorsByCategory("software", language);
  const popularCalculators = getPopularCalculatorsByCategory("software", language);

  return <CategoryClient categoryId="software" content={content} allCalculators={allCalculators} popularCalculators={popularCalculators} />;
}
