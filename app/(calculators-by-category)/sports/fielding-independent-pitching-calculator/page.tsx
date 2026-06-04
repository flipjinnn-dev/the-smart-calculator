import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import FieldingIndependentPitchingCalculatorClient from "./fielding-independent-pitching-calculator-client";

export default async function FieldingIndependentPitchingCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("fielding-independent-pitching", language);
  const guideContent = await loadCalculatorGuideContent("fielding-independent-pitching", language);

  return <FieldingIndependentPitchingCalculatorClient content={content} guideContent={guideContent} />;
}
