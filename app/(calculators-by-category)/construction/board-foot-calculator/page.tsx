import { headers } from "next/headers";
import BoardFootCalculatorClient from "./board-foot-calculator-client";

export default async function BoardFootCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/board-foot-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/board-foot-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/board-foot-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/board-foot-calculator/en.json`)).default;
  }

  return <BoardFootCalculatorClient content={content} guideContent={guideContent} />;
}
