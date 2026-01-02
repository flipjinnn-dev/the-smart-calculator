import { headers } from "next/headers";
import CategoryClient from "../category-client";
import { loadCategoryContent } from "@/lib/loadCategoryContent";
import { getCalculatorsByCategory, getPopularCalculatorsByCategory } from "@/lib/calculator-data";

export default async function FoodCategoryPage() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const { content } = await loadCategoryContent("food", language);
  const allCalculators = getCalculatorsByCategory("food", language);
  const popularCalculators = getPopularCalculatorsByCategory("food", language);

  return <CategoryClient categoryId="food" content={content} allCalculators={allCalculators} popularCalculators={popularCalculators} />;
}
