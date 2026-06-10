import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";
import NoticePeriodCalculatorClient from "./notice-period-calculator-client";

export default async function NoticePeriodCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";
  const content = await loadCalculatorUiContent(
    "notice-period-calculator",
    language
  );
  const guideContent = await loadCalculatorGuideContent(
    "notice-period-calculator",
    language
  );

  return (
    <NoticePeriodCalculatorClient
      content={content}
      guideContent={guideContent}
    />
  );
}
