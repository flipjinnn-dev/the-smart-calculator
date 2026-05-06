import { headers } from "next/headers";
import UfGpaCalculatorClient from "./uf-gpa-calculator-client";

export default async function UfGpaCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  let content: Record<string, unknown> | null = null;
  let guideContent: Record<string, unknown> | null = null;

  try {
    content = (await import(`@/app/content/calculator-ui/uf-gpa-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/uf-gpa-calculator/en.json`)).default;
  }

  try {
    guideContent = (await import(`@/app/content/calculator-guide/uf-gpa-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/uf-gpa-calculator/en.json`)).default;
  }

  return <UfGpaCalculatorClient content={content || {}} guideContent={guideContent || {}} />;
}
