import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";

import BankStatementConverterClient from "./bank-statement-converter-client";




export default async function BankStatementConverterPage() {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Bank Statement Converter',
    description: 'Convert bank statements from PDF, Excel, or text to CSV format. Supports all banks and countries with automatic date and currency detection.',
    url: 'https://www.thesmartcalculator.com/financial/bank-statement-converter',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'PDF to CSV conversion',
      'Automatic date format detection',
      'Currency detection',
      'All banks supported',
      'Secure and private',
      'No registration required'
    ],
  };
  
  const content = await loadCalculatorUiContent("bank-statement-converter", language);
  const guideContent = await loadCalculatorGuideContent("bank-statement-converter", language);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BankStatementConverterClient content={content} guideContent={guideContent} />
    </>
  );
}
