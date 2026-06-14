import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import BoardFootCalculatorClient from "./board-foot-calculator-client";


export default async function BoardFootCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("board-foot", language);
  const guideContent = await loadCalculatorGuideContent("board-foot", language);

  return <BoardFootCalculatorClient content={content} guideContent={guideContent} />;
}
