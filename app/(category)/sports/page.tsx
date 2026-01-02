import { headers } from "next/headers";
import CategoryClient from "../category-client";
import { loadCategoryContent } from "@/lib/loadCategoryContent";
import { getCalculatorsByCategory, getPopularCalculatorsByCategory } from "@/lib/calculator-data";

export default async function SportsCategoryPage() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const { content } = await loadCategoryContent("sports", language);
  const allCalculators = getCalculatorsByCategory("sports", language);
  const popularCalculators = getPopularCalculatorsByCategory("sports", language);

  return <CategoryClient categoryId="sports" content={content} allCalculators={allCalculators} popularCalculators={popularCalculators} />;
}
