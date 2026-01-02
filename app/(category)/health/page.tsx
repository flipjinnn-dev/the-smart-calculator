import { headers } from "next/headers";
import CategoryClient from "../category-client";
import { loadCategoryContent } from "@/lib/loadCategoryContent";
import { getCalculatorsByCategory, getPopularCalculatorsByCategory } from "@/lib/calculator-data";

export default async function HealthCategoryPage() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const { content } = await loadCategoryContent("health", language);
  const allCalculators = getCalculatorsByCategory("health", language);
  const popularCalculators = getPopularCalculatorsByCategory("health", language);

  return <CategoryClient categoryId="health" content={content} allCalculators={allCalculators} popularCalculators={popularCalculators} />;
}
