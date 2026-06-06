import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";
import InvisalignCostCalculatorClient from "./invisalign-cost-calculator-client";

export default async function InvisalignCostCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  const content = await loadCalculatorUiContent("invisalign-cost-calculator", language);
  const guideContent = await loadCalculatorGuideContent(
    "invisalign-cost-calculator",
    language
  );

  return (
    <InvisalignCostCalculatorClient content={content} guideContent={guideContent} />
  );
}
