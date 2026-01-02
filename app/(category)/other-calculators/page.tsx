import { headers } from "next/headers";
import CategoryClient from "../category-client";
import { loadCategoryContent } from "@/lib/loadCategoryContent";
import { getCalculatorsByCategory, getPopularCalculatorsByCategory } from "@/lib/calculator-data";

export default async function OtherCalculatorsCategoryPage() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const { content } = await loadCategoryContent("other-calculators", language);
  const allCalculators = getCalculatorsByCategory("other", language);
  const popularCalculators = getPopularCalculatorsByCategory("other", language);

  return <CategoryClient categoryId="other" content={content} allCalculators={allCalculators} popularCalculators={popularCalculators} />;
}
