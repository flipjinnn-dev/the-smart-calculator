import { headers } from "next/headers";
import CategoryClient from "../category-client";
import { loadCategoryContent } from "@/lib/loadCategoryContent";
import { getCalculatorsByCategory, getPopularCalculatorsByCategory } from "@/lib/calculator-data";

export default async function MathsCategoryPage() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const { content } = await loadCategoryContent("maths", language);
  const allCalculators = getCalculatorsByCategory("maths", language);
  const popularCalculators = getPopularCalculatorsByCategory("maths", language);

  return <CategoryClient categoryId="maths" content={content} allCalculators={allCalculators} popularCalculators={popularCalculators} />;
}
