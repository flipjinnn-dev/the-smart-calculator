import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";
import DepopFeeCalculatorClient from "./depop-fee-calculator-client";


export default async function DepopFeeCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  const content = await loadCalculatorUiContent("depop-fee-calculator", language);
  const guideContent = await loadCalculatorGuideContent("depop-fee-calculator", language);

  return (
    <DepopFeeCalculatorClient content={content} guideContent={guideContent} />
  );
}
