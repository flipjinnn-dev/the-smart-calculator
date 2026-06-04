import Script from "next/script";
import { buildDefaultCalculatorSeo } from "@/lib/calculator-seo";

type CalculatorLayoutShellProps = {
  calculatorId: string;
  children: React.ReactNode;
};

/** Sync layout shell — async data fetching here would stream page metadata into `<body>`. */
export function CalculatorLayoutShell({
  calculatorId,
  children,
}: CalculatorLayoutShellProps) {
  const jsonLdSchema = buildDefaultCalculatorSeo(calculatorId)?.schema ?? null;

  return (
    <>
      {jsonLdSchema ? (
        <Script
          id={`${calculatorId}-json-ld`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
          strategy="afterInteractive"
        />
      ) : null}
      {children}
    </>
  );
}
