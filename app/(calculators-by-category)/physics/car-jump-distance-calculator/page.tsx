import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import CarJumpDistanceCalculatorClient from "./car-jump-distance-calculator-client";


export default async function CarJumpDistanceCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("car-jump-distance", language);
  const guideContent = await loadCalculatorGuideContent("car-jump-distance", language);

  return <CarJumpDistanceCalculatorClient content={content} guideContent={guideContent} />;
}
