import { headers } from "next/headers";
import {loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";
import RoofingCalculatorClient from "./roofing-calculator-client";

const CALCULATOR_ID = "roofing-calculator";

export default async function RoofingCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  const content = await loadCalculatorUiContent(CALCULATOR_ID, language);
  const guideContent = await loadCalculatorGuideContent(CALCULATOR_ID, language);

  return <RoofingCalculatorClient content={content} guideContent={guideContent} />;
}
