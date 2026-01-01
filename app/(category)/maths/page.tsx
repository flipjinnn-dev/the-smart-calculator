import { headers } from "next/headers";
import CategoryClient from "../category-client";
import { loadCategoryContent } from "@/lib/loadCategoryContent";

export default async function MathsCategoryPage() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const { content } = await loadCategoryContent("maths", language);

  return <CategoryClient categoryId="maths" content={content} />;
}
