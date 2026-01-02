import { headers } from "next/headers";
import CategoryClient from "../category-client";
import { loadCategoryContent } from "@/lib/loadCategoryContent";
import { getCalculatorsByCategory, getPopularCalculatorsByCategory } from "@/lib/calculator-data";

export default async function PhysicsCategoryPage() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const { content } = await loadCategoryContent("physics", language);
  const allCalculators = getCalculatorsByCategory("physics", language);
  const popularCalculators = getPopularCalculatorsByCategory("physics", language);

  return <CategoryClient categoryId="physics" content={content} allCalculators={allCalculators} popularCalculators={popularCalculators} />;
}
