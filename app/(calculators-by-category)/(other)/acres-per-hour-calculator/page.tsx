import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";
import AcresPerHourCalculatorClient from "./acres-per-hour-calculator-client";


export default async function AcresPerHourCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";
  const content = await loadCalculatorUiContent(
    "acres-per-hour-calculator",
    language
  );
  const guideContent = await loadCalculatorGuideContent(
    "acres-per-hour-calculator",
    language
  );

  return (
    <AcresPerHourCalculatorClient
      content={content}
      guideContent={guideContent}
    />
  );
}
