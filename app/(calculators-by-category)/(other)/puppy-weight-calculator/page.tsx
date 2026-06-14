import { headers } from "next/headers";
import {loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";
import PuppyWeightCalculatorClient from "./puppy-weight-calculator-client";


export default async function PuppyWeightCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";

  const content = await loadCalculatorUiContent("puppy-weight-calculator", language);
  const guideContent = await loadCalculatorGuideContent("puppy-weight-calculator", language);

  return <PuppyWeightCalculatorClient content={content} guideContent={guideContent} />;
}
