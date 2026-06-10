import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";
import OVRCalculatorClient from "./OVRCalculatorClient";

export default async function OVRCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";
  const content = await loadCalculatorUiContent("ovr-calculator", language);
  const guideContent = await loadCalculatorGuideContent(
    "ovr-calculator",
    language
  );

  return (
    <OVRCalculatorClient content={content} guideContent={guideContent} />
  );
}
