import { headers } from "next/headers";
import CategoryClient from "../category-client";
import { loadCategoryContent } from "@/lib/loadCategoryContent";

export default async function FinancialCategoryPage() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const { content } = await loadCategoryContent("financial", language);

  return <CategoryClient categoryId="financial" content={content} />;
}