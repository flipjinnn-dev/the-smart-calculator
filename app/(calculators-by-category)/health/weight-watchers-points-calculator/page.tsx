import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import WeightWatchersPointsCalculatorClient from "./weight-watchers-points-calculator-client";


export default async function WeightWatchersPointsCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("weight-watchers-points-calculator", language);
  const guideContent = await loadCalculatorGuideContent("weight-watchers-points-calculator", language);

  return <WeightWatchersPointsCalculatorClient content={content} guideContent={guideContent} />;
}
