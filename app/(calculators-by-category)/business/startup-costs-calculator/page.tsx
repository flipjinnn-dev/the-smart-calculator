import StartupCostsCalculatorClient from "./startup-costs-calculator-client"
import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export default async function StartupCostsCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";
  const content = await loadCalculatorUiContent("startup-costs-calculator", language);
  const guideContent = await loadCalculatorGuideContent("startup-costs-calculator", language);
  return <StartupCostsCalculatorClient content={content} guideContent={guideContent} />;
}
