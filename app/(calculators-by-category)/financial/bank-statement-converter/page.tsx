import { headers } from "next/headers";
import { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import BankStatementConverterClient from "./bank-statement-converter-client";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const language = headersList.get('x-language') || 'en';
  
  const canonicalUrl = getCanonicalUrl('bank-statement-converter', language);
  const baseUrl = 'https://www.thesmartcalculator.com';
  
  return {
    title: {
      absolute: 'Bank Statement Converter – Convert PDF/Excel to CSV Instantly',
    },
    description: 'Easily convert your bank statements from PDF, Excel, or text into clean, structured CSV format. Free, secure, and runs directly in your browser.',
    keywords: 'bank statement converter, PDF to CSV, bank statement to CSV, convert bank statement, bank statement parser, financial data converter, transaction converter, statement to excel, bank data extraction',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': getCanonicalUrl('bank-statement-converter', 'en'),
        'en': getCanonicalUrl('bank-statement-converter', 'en'),
      }
    },
    openGraph: {
      title: 'Bank Statement Converter – Convert PDF/Excel to CSV Instantly',
      description: 'Easily convert your bank statements from PDF, Excel, or text into clean, structured CSV format. Free, secure, and runs directly in your browser.',
      url: canonicalUrl,
      siteName: 'Smart Calculator',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/logo.png`,
          width: 1200,
          height: 630,
          alt: 'Bank Statement Converter - Convert PDF to CSV',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Bank Statement Converter - Convert PDF to CSV Online Free',
      description: 'Transform any bank statement into clean CSV format. Upload PDF, Excel, or paste text. Supports all banks worldwide.',
      images: [`${baseUrl}/logo.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

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
  
  let content = null;
  let guideContent = null;
  
  try {
    content = (await import(`@/app/content/calculator-ui/bank-statement-converter/${language}.json`)).default;
  } catch {
    content = (await import(`@/app/content/calculator-ui/bank-statement-converter/en.json`)).default;
  }
  
  try {
    guideContent = (await import(`@/app/content/calculator-guide/bank-statement-converter/${language}.json`)).default;
  } catch {
    guideContent = (await import(`@/app/content/calculator-guide/bank-statement-converter/en.json`)).default;
  }

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
