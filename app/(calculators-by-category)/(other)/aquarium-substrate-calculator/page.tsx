import AquariumClient from "./aquarium-client";
import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

export default async function AquariumSubstrateCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";
  const content = await loadCalculatorUiContent(
    "aquarium-substrate-calculator",
    language
  );
  const guideContent = await loadCalculatorGuideContent(
    "aquarium-substrate-calculator",
    language
  );

  return (
    <AquariumClient content={content} guideContent={guideContent} />
  );
}
