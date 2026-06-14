import { headers } from "next/headers";
import Script from "next/script";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";
import { loadCalculatorSeo } from "@/lib/calculator-seo";
import PercentageDecreaseCalculatorClient from "./percentage-decrease-calculator-client";


export default async function PercentageDecreaseCalculatorPage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";
  const seo = language === "en" ? await loadCalculatorSeo(CALCULATOR_ID, "en") : null;

  const content = await loadCalculatorUiContent(CALCULATOR_ID, language);
  const guideContent = await loadCalculatorGuideContent(CALCULATOR_ID, language);

  const jsonLdSchema =
    seo?.schema ??
    ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.thesmartcalculator.com/#breadcrumb",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.thesmartcalculator.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Percentage Decrease Calculator",
              item: "https://www.thesmartcalculator.com/maths/percentage-decrease-calculator",
            },
          ],
        },
      ],
    } as Record<string, unknown>);

  return (
    <>
      <Script
        id="percentage-decrease-calculator-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        strategy="afterInteractive"
      />
      <PercentageDecreaseCalculatorClient
        content={content}
        guideContent={guideContent}
      />
    </>
  );
}
