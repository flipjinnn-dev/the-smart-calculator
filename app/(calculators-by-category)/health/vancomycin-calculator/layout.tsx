import type { Metadata } from "next";
import Script from "next/script";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";
import { loadCalculatorSeo } from "@/lib/calculator-seo";

export const dynamic = "force-dynamic";

const CALCULATOR_ID = "vancomycin-calculator";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(CALCULATOR_ID);
}

export default async function VancomycinCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const seo = await loadCalculatorSeo(CALCULATOR_ID, "en");
  const jsonLdSchema = seo?.schema ?? null;

  return (
    <>
      {children}
      {jsonLdSchema ? (
        <Script
          id={`${CALCULATOR_ID}-json-ld`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
          strategy="afterInteractive"
        />
      ) : null}
    </>
  );
}
