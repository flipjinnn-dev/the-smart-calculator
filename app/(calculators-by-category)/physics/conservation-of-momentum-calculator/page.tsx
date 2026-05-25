import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";
import ConservationOfMomentumCalculatorClient from "./conservation-of-momentum-calculator-client";

export default async function ConservationOfMomentumCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("conservation-of-momentum", language);
  const guideContent = await loadCalculatorGuideContent("conservation-of-momentum", language);

  return <ConservationOfMomentumCalculatorClient content={content} guideContent={guideContent} />;
}
