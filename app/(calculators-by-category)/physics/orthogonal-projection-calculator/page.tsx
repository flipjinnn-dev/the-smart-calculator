import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import OrthogonalProjectionCalculatorClient from "./orthogonal-projection-calculator-client";


export default async function OrthogonalProjectionCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("orthogonal-projection-calculator", language);
  const guideContent = await loadCalculatorGuideContent("orthogonal-projection-calculator", language);

  return <OrthogonalProjectionCalculatorClient content={content} guideContent={guideContent} />;
}
