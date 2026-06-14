import YouTubeMoneyCalculatorClient from "./youtube-money-calculator-client"
import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";



export default async function YouTubeMoneyCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";
  const content = await loadCalculatorUiContent("youtube-money-calculator", language);
  const guideContent = await loadCalculatorGuideContent("youtube-money-calculator", language);
  return <YouTubeMoneyCalculatorClient content={content} guideContent={guideContent} />;
}
