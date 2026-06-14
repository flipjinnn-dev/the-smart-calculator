import { headers } from "next/headers";
import {loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";
import MortgageRecastCalculatorClient from "./mortgage-recast-calculator-client";


export default async function MortgageRecastCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  const content = await loadCalculatorUiContent("mortgage-recast-calculator", language);
  const guideContent = await loadCalculatorGuideContent(
    "mortgage-recast-calculator",
    language
  );

  return (
    <MortgageRecastCalculatorClient content={content} guideContent={guideContent} />
  );
}
