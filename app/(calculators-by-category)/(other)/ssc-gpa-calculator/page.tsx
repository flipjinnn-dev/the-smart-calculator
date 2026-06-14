import { headers } from "next/headers";
import {loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";
import SscGpaCalculatorClient from "./ssc-gpa-calculator-client";


export default async function SscGpaCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";
  const content = await loadCalculatorUiContent("ssc-gpa-calculator", language);
  const guideContent = await loadCalculatorGuideContent(
    "ssc-gpa-calculator",
    language
  );

  return (
    <SscGpaCalculatorClient content={content} guideContent={guideContent} />
  );
}
