import { headers } from "next/headers";
import CategoryClient from "../category-client";
import { loadCategoryContent } from "@/lib/loadCategoryContent";

export default async function FoodCategoryPage() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const { content } = await loadCategoryContent("food", language);

  return <CategoryClient categoryId="food" content={content} />;
}
