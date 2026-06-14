import UfGpaCalculatorClient from "./uf-gpa-calculator-client"
import { headers } from "next/headers";
import {loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";



export default async function UfGpaCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";
  const content = await loadCalculatorUiContent("uf-gpa-calculator", language);
  const guideContent = await loadCalculatorGuideContent("uf-gpa-calculator", language);
  return <UfGpaCalculatorClient content={content} guideContent={guideContent} />;
}
