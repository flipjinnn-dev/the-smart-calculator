import { headers } from "next/headers";
import CategoryClient from "../category-client";
import { loadCategoryContent } from "@/lib/loadCategoryContent";
import { getCalculatorsByCategory, getPopularCalculatorsByCategory } from "@/lib/calculator-data";

export default async function BusinessCategoryPage() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const { content } = await loadCategoryContent("business", language);
  const allCalculators = getCalculatorsByCategory("business", language);
  const popularCalculators = getPopularCalculatorsByCategory("business", language);

  return <CategoryClient categoryId="business" content={content} allCalculators={allCalculators} popularCalculators={popularCalculators} />;
}
