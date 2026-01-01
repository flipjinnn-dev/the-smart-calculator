import { headers } from "next/headers";
import CategoryClient from "../category-client";
import { loadCategoryContent } from "@/lib/loadCategoryContent";

export default async function ConstructionCategoryPage() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const { content } = await loadCategoryContent("construction", language);

  return <CategoryClient categoryId="construction" content={content} />;
}
