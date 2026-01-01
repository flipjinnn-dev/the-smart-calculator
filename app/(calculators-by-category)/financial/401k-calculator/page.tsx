import { headers } from "next/headers";
import FourOhOneKCalculatorClient from "./401k-calculator-client";

export default async function FourOhOneKCalculator() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/401k-calculator/${language}.json`)).default;
  } catch {
    try {
      content = (await import(`@/app/content/calculator-ui/401k-calculator/en.json`)).default;
    } catch {
      content = {};
    }
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/401k-calculator/${language}.json`)).default;
  } catch {
    try {
      guideContent = (await import(`@/app/content/calculator-guide/401k-calculator/en.json`)).default;
    } catch {
      guideContent = { color: 'blue', sections: [], faq: [] };
    }
  }

  return <FourOhOneKCalculatorClient content={content} guideContent={guideContent} />;
}
