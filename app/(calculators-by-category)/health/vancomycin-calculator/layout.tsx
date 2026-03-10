import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vancomycin Calculator | AUC, Dose & Trough",
  description: "Use our vancomycin calculator to estimate AUC, dose, trough levels, and dosing for pediatrics, renal impairment, and hemodialysis patients.",
  keywords: [
    "vancomycin calculator",
    "vancomycin dosing calculator",
    "vancomycin auc calculator",
    "vancomycin calculator trough",
    "vancomycin dose calculator",
    "vancomycin calculator loading dose",
    "vancomycin calculator pediatric",
    "vancomycin calculator for hemodialysis",
    "vancomycin dosing calculator hemodialysis",
    "vancomycin calculator renal impairment",
    "vancomycin clinical calculator",
    "vancomycin calculator with trough"
  ],
  alternates: {
    canonical: "/vancomycin-calculator"
  },
  openGraph: {
    title: "Vancomycin Calculator | AUC, Dose & Trough",
    description: "Use our vancomycin calculator to estimate AUC, dose, trough levels, and dosing for pediatrics, renal impairment, and hemodialysis patients.",
    type: "website",
    url: "/vancomycin-calculator"
  },
  twitter: {
    card: "summary_large_image",
    title: "Vancomycin Calculator | AUC, Dose & Trough",
    description: "Use our vancomycin calculator to estimate AUC, dose, trough levels, and dosing for pediatrics, renal impairment, and hemodialysis patients."
  }
};

export default function VancomycinCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is a vancomycin calculator?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A vancomycin calculator is a clinical tool used to determine the correct vancomycin dose, dosing interval, and therapeutic monitoring targets based on patient-specific data."
                }
              },
              {
                "@type": "Question",
                "name": "What does a vancomycin AUC calculator do?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A vancomycin auc calculator estimates total drug exposure over 24 hours and helps clinicians maintain the recommended AUC/MIC ratio of 400–600."
                }
              },
              {
                "@type": "Question",
                "name": "What trough level is recommended for vancomycin?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Typical vancomycin dosing trough level targets are: 10–15 mg/L for mild infections and 15–20 mg/L for serious MRSA infections."
                }
              },
              {
                "@type": "Question",
                "name": "How is vancomycin dosed in renal impairment?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Vancomycin dosing renal impairment requires longer dosing intervals or reduced doses based on creatinine clearance."
                }
              },
              {
                "@type": "Question",
                "name": "How is vancomycin dosed in hemodialysis patients?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Vancomycin dosing in hemodialysis usually includes: Loading dose: 20–25 mg/kg and Maintenance dose: 10–15 mg/kg after dialysis."
                }
              },
              {
                "@type": "Question",
                "name": "Can vancomycin calculators be used for children?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. A vancomycin calculator pediatric estimates dosing based on body weight and age, typically 10–15 mg/kg per dose."
                }
              }
            ]
          })
        }}
      />
    </>
  );
}
