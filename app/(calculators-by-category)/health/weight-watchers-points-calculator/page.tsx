import { headers } from "next/headers";
import WeightWatchersPointsCalculatorClient from "./weight-watchers-points-calculator-client";

export default async function WeightWatchersPointsCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/weight-watchers-points-calculator/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/weight-watchers-points-calculator/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/weight-watcher-calculator/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/weight-watcher-calculator/en.json`)).default;
  }

  return <WeightWatchersPointsCalculatorClient content={content} guideContent={guideContent} />;
}
