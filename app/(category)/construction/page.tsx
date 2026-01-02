import { headers } from "next/headers";
import CategoryClient from "../category-client";
import { loadCategoryContent } from "@/lib/loadCategoryContent";
import { getCalculatorsByCategory, getPopularCalculatorsByCategory } from "@/lib/calculator-data";

export default async function ConstructionCategoryPage() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const { content } = await loadCategoryContent("construction", language);
  const allCalculators = getCalculatorsByCategory("construction", language);
  const popularCalculators = getPopularCalculatorsByCategory("construction", language);

  return <CategoryClient categoryId="construction" content={content} allCalculators={allCalculators} popularCalculators={popularCalculators} />;
}
