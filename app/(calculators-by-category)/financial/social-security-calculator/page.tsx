import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import SocialSecurityCalculatorClient from "./social-security-calculator-client";

export default async function SocialSecurityCalculatorCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const content = await loadCalculatorUiContent("social-security-calculator", language);
  const guideContent = await loadCalculatorGuideContent("social-security-calculator", language);

  return <SocialSecurityCalculatorClient content={content} guideContent={guideContent} />;
}
