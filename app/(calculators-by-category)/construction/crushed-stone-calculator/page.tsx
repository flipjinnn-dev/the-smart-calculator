import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";



import CrushedStoneCalculatorClient from "./crushed-stone-calculator-client";


export default async function CrushedStoneCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  const content = await loadCalculatorUiContent("crushed-stone-calculator", language);
  const guideContent = await loadCalculatorGuideContent("crushed-stone-calculator", language);

  return <CrushedStoneCalculatorClient content={content} guideContent={guideContent} />;
}
