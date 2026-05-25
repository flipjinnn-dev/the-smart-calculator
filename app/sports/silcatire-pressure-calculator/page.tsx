import { headers } from "next/headers";
import type { Metadata } from "next";
import Script from "next/script";
import {
  generateCalculatorMetadata,
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";
import { loadCalculatorSeo } from "@/lib/calculator-seo";
import SilcaTirePressureCalculatorClient from "./silcatire-pressure-calculator-client";

export const dynamic = "force-dynamic";

const CALCULATOR_ID = "silcatire-pressure-calculator";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(CALCULATOR_ID);
}

export default async function SilcaTirePressurePage() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";
  const seo = language === "en" ? await loadCalculatorSeo(CALCULATOR_ID, "en") : null;

  const content = await loadCalculatorUiContent(CALCULATOR_ID, language);
  const guideContent = await loadCalculatorGuideContent(CALCULATOR_ID, language);

  const jsonLdSchema = seo?.schema ?? null;

  return (
    <>
      {jsonLdSchema ? (
        <Script
          id="silca-tire-pressure-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
          strategy="afterInteractive"
        />
      ) : null}
      <SilcaTirePressureCalculatorClient
        content={content}
        guideContent={guideContent}
      />
    </>
  );
}
