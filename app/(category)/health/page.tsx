import { headers } from "next/headers";
import CategoryClient from "../category-client";
import { loadCategoryContent } from "@/lib/loadCategoryContent";

export default async function HealthCategoryPage() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const { content } = await loadCategoryContent("health", language);

  return <CategoryClient categoryId="health" content={content} />;
}
