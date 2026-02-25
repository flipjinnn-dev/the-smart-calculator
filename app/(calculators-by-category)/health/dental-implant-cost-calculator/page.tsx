import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/url-utils";
import Script from "next/script";
import DentalImplantCostCalculatorClient from "./dental-implant-cost-calculator-client";
import Image from "next/image";

const dentalImplantCostCalculatorMeta = {
  en: {
    title: "Dental Implant Cost Calculator & Price Guide",
    description: "Use our dental implant cost calculator to estimate per tooth, 6 teeth, 7 implants, or full mouth dental implant costs fast.",
    keywords: "dental implant cost calculator, dental implant calculator, dental implant cost estimator, average cost of a dental implant per tooth, how much is dental implant, full mouth dental implants cost, dental implant cost 6 teeth, how much would 7 dental implants cost, ClearChoice dental implants cost, tooth implant cost estimate, dental implant price, implant cost breakdown, All-on-4 cost, dental implant surgery cost"
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const meta = dentalImplantCostCalculatorMeta.en;
  const canonicalUrl = getCanonicalUrl('dental-implant-cost-calculator', 'en');

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': canonicalUrl,
        'en': canonicalUrl,
      }
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: canonicalUrl,
      siteName: "Smart Calculator",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/og-image.png"],
    },
  };
}

export default function DentalImplantCostCalculator() {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.thesmartcalculator.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Health Calculators",
            "item": "https://www.thesmartcalculator.com/health"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Dental Implant Cost Calculator",
            "item": "https://www.thesmartcalculator.com/health/dental-implant-cost-calculator"
          }
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://www.thesmartcalculator.com/#organization",
        "name": "Smart Calculator",
        "url": "https://www.thesmartcalculator.com",
        "logo": "https://www.thesmartcalculator.com/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1 614-596-2581",
          "contactType": "technical support",
          "contactOption": "TollFree",
          "areaServed": ["US","GB","DE","ES","PL","PT"],
          "availableLanguage": ["en","es","German","Polish","Portuguese"]
        },
        "sameAs": [
          "https://x.com/SmartCalculat0r",
          "https://www.instagram.com/thesmartcalculators/",
          "https://www.youtube.com/@TheSmartCalculators",
          "https://www.linkedin.com/company/smart-calculator/",
          "https://www.pinterest.com/thesmartcalculators/_saved/",
          "https://www.thesmartcalculator.com/"
        ]
      },
      {
        "@type": "SoftwareApplication",
        "name": "Dental Implant Cost Calculator",
        "description": "Calculate dental implant costs for single tooth, multiple teeth, or full mouth implants. Estimate prices for American/Korean and Premium Straumann implants.",
        "operatingSystem": "All",
        "applicationCategory": "HealthApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "ratingCount": "1250"
        }
      },
      {
        "@type": "HowTo",
        "name": "How to Calculate Dental Implant Cost",
        "description": "Follow these steps to estimate your dental implant treatment cost.",
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Select Implant Type",
            "text": "Choose between American/Korean Implants or Premium Straumann Implants based on your preference and budget."
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Enter Number of Implants",
            "text": "Input the number of dental implants you need (1-32 teeth)."
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Select Currency",
            "text": "Choose your preferred display currency (USD or EGP)."
          },
          {
            "@type": "HowToStep",
            "position": 4,
            "name": "Calculate Total Cost",
            "text": "Click the Calculate button to see your total cost estimate and international price comparison."
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the average cost of a dental implant per tooth?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "$3,000 to $6,000 including implant, abutment, and crown."
            }
          },
          {
            "@type": "Question",
            "name": "How much is dental implant surgery without a crown?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Usually $1,500 to $3,000 for the implant post alone."
            }
          },
          {
            "@type": "Question",
            "name": "How much does a molar extraction cost before implant placement?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Between $150 and $800 depending on complexity."
            }
          },
          {
            "@type": "Question",
            "name": "How much is a full mouth of dental implants?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Typically $20,000 to $60,000+ per arch."
            }
          },
          {
            "@type": "Question",
            "name": "Dental implant cost 6 teeth what should I expect?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "$10,000 to $30,000 depending on whether implants are individual or bridge-supported."
            }
          },
          {
            "@type": "Question",
            "name": "How much would 7 dental implants cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Approximately $21,000 to $42,000."
            }
          },
          {
            "@type": "Question",
            "name": "Is a dental implant cost estimator accurate?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It provides a close range but cannot replace a personalized treatment plan."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <DentalImplantCostCalculatorClient />
      
      {/* SEO Content Sections */}
      <div className="container mx-auto p-4 max-w-7xl">
        <div className="max-w-5xl mx-auto space-y-12 mt-16">
          {/* Introduction Section */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Dental Implant Cost Calculator: Accurate Estimates, Real-World Pricing & Expert Breakdown (2026)</h2>
            <p className="text-gray-700 leading-relaxed">
              The average cost of a dental implant per tooth in the U.S. ranges from <strong>$3,000 to $6,000</strong> including the implant, abutment, and crown. A full mouth of dental implants typically costs <strong>$20,000 to $60,000+</strong> per arch, depending on materials, bone grafting, sedation, and whether you choose implant-supported bridges or All-on-4 style systems. A reliable dental implant cost calculator helps estimate your total by factoring in extractions, bone grafts, imaging, and prosthetic type.
            </p>
          </section>

          {/* What Is Section */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What Is a Dental Implant Cost Calculator?</h2>
            <p className="text-gray-700 mb-4">
              A <strong>dental implant cost calculator</strong> (also called a <strong>dental implant calculator</strong>, <strong>dental implant cost estimator</strong>, or <strong>dental implant cost estimate tool</strong>) is an online tool that estimates your treatment cost based on:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Number of implants needed</li>
              <li>Type of restoration (single crown, bridge, full arch)</li>
              <li>Imaging (CBCT scans, X-rays)</li>
              <li>Tooth extraction needs</li>
              <li>Bone grafting or sinus lift</li>
              <li>Sedation or anesthesia</li>
              <li>Geographic location</li>
            </ul>
            <p className="text-gray-600 mt-4">
              Because every patient's bone density, gum health, and treatment plan differ, calculators provide estimates not final quotes.
            </p>
          </section>

          {/* Average Cost Section */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What Is the Average Cost of a Dental Implant Per Tooth?</h2>
            <p className="text-gray-700 mb-6">
              If you're asking, <strong>"how much is dental implant treatment?"</strong>, here's a transparent breakdown:
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Component</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Average Cost (U.S.)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3">Implant Post (Titanium screw)</td>
                    <td className="border border-gray-300 px-4 py-3">$1,500 – $3,000</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">Abutment</td>
                    <td className="border border-gray-300 px-4 py-3">$300 – $500</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3">Crown</td>
                    <td className="border border-gray-300 px-4 py-3">$1,000 – $2,000</td>
                  </tr>
                  <tr className="bg-blue-50 font-semibold">
                    <td className="border border-gray-300 px-4 py-3">Total Per Tooth</td>
                    <td className="border border-gray-300 px-4 py-3">$3,000 – $6,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 mb-4">
              This is your typical <strong>tooth implant cost estimate</strong> for one missing tooth.
            </p>
            <p className="text-gray-700">
              Costs may vary depending on whether your provider uses premium systems like those from Nobel Biocare or Straumann.
            </p>
          </section>

          {/* Detailed Breakdown Section */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Dental Implant Cost Breakdown (What You're Really Paying For)</h2>
            <p className="text-gray-700 mb-6">A detailed <strong>dental implant cost breakdown</strong> includes:</p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">1. Consultation & Diagnostics</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Exam: $100–$300</li>
                  <li>3D CBCT Scan: $250–$600</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">2. Tooth Extraction</h3>
                <p className="text-gray-700 mb-2">If needed, you may wonder: <strong>how much does a molar extraction cost?</strong></p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Simple extraction: $150–$400</li>
                  <li>Surgical extraction: $300–$800</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">3. Bone Grafting (If Required)</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Minor graft: $300–$800</li>
                  <li>Major graft: $1,000–$3,000</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">4. Implant Placement</h3>
                <p className="text-gray-700">$1,500–$3,000 per implant</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">5. Abutment + Crown</h3>
                <p className="text-gray-700">$1,300–$2,500</p>
              </div>
            </div>
          </section>

          {/* Full Mouth Section */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How Much Is a Full Mouth of Dental Implants?</h2>
            <p className="text-gray-700 mb-4">
              One of the most searched questions is: <strong>"how much is a full mouth of dental implants?"</strong>
            </p>
            <p className="text-gray-700 mb-6">Here's a realistic range:</p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-purple-100">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Type of Full Mouth Treatment</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Cost Per Arch</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3">Implant-Supported Dentures</td>
                    <td className="border border-gray-300 px-4 py-3">$15,000–$30,000</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">All-on-4 / All-on-6</td>
                    <td className="border border-gray-300 px-4 py-3">$20,000–$35,000</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3">Individual Implants (10–14 teeth)</td>
                    <td className="border border-gray-300 px-4 py-3">$30,000–$60,000+</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 mb-6">
              A full upper and lower restoration can exceed <strong>$60,000–$90,000</strong> depending on complexity.
            </p>
            <div className="mb-6">
              <Image
                src="/images/implant-types.png"
                alt="Different Types of Dental Implants"
                width={800}
                height={500}
                className="rounded-lg shadow-md w-full"
                priority={false}
              />
            </div>
            <p className="text-gray-700">
              Popular branded full-arch systems include All-on-4®, originally developed by Nobel Biocare.
            </p>
          </section>

          {/* Multiple Teeth Section */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Dental Implant Cost for Multiple Teeth</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Dental Implant Cost 6 Teeth</h3>
                <p className="text-gray-700 mb-2"><strong>Replacing 6 teeth individually:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mb-4">
                  <li>6 × $3,500–$5,000</li>
                  <li>Estimated total: <strong>$21,000–$30,000</strong></li>
                </ul>
                <p className="text-gray-700 mb-2"><strong>If using an implant-supported bridge (2–3 implants):</strong></p>
                <p className="text-gray-700"><strong>$10,000–$18,000</strong></p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">How Much Would 7 Dental Implants Cost?</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mb-4">
                  <li>7 × $3,000–$6,000</li>
                  <li>Estimated total: <strong>$21,000–$42,000</strong></li>
                </ul>
                <p className="text-gray-700">
                  A smart <strong>dental implant cost estimator</strong> will compare individual implants vs. bridge-supported options.
                </p>
              </div>
            </div>
          </section>

          {/* ClearChoice Section */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How Much Do ClearChoice Dental Implants Cost?</h2>
            <p className="text-gray-700 mb-4">
              Many patients ask: <strong>"how much do ClearChoice dental implants cost?"</strong>
            </p>
            <p className="text-gray-700 mb-4">
              ClearChoice Dental Implant Centers typically focuses on full-arch solutions. Reported averages:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>One arch (All-on-4 style): <strong>$25,000–$40,000</strong></li>
              <li>Full mouth: <strong>$50,000–$80,000</strong></li>
            </ul>
            <p className="text-gray-600 mt-4">
              Prices vary by location and included services (imaging, temporary prosthetics, anesthesia).
            </p>
          </section>

          {/* Factors Section */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Factors That Influence Dental Implant Costs</h2>
            <p className="text-gray-700 mb-6">A good <strong>dental implant calculator</strong> considers:</p>
            
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">1. Geographic Location</h3>
                <p className="text-gray-700">Major metro areas cost more.</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">2. Dentist Expertise</h3>
                <p className="text-gray-700">Board-certified oral surgeons or prosthodontists may charge higher fees.</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">3. Materials Used</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Titanium vs. zirconia implants</li>
                  <li>Porcelain-fused-to-metal vs. full zirconia crowns</li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">4. Bone Health</h3>
                <p className="text-gray-700">Low density increases need for grafting.</p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">5. Sedation Type</h3>
                <p className="text-gray-700">IV sedation adds $500–$1,500.</p>
              </div>
            </div>
          </section>

          {/* Insurance Section */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Insurance & Financing</h2>
            <p className="text-gray-700 mb-4"><strong>Most dental insurance plans:</strong></p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-6">
              <li>Cover extractions</li>
              <li>Partially cover crowns</li>
              <li>Rarely cover full implant cost</li>
            </ul>
            <p className="text-gray-700 mb-4"><strong>Many providers offer:</strong></p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>CareCredit financing</li>
              <li>In-house payment plans</li>
              <li>HSA/FSA eligibility</li>
            </ul>
          </section>

          {/* Worth It Section */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Are Dental Implants Worth the Cost?</h2>
            <p className="text-gray-700 mb-6">Compared to bridges or dentures:</p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-green-100">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Option</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Lifespan</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Bone Preservation</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Stability</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-gray-300 px-4 py-3">Dentures</td>
                    <td className="border border-gray-300 px-4 py-3">5–10 years</td>
                    <td className="border border-gray-300 px-4 py-3">No</td>
                    <td className="border border-gray-300 px-4 py-3">Moderate</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">Bridge</td>
                    <td className="border border-gray-300 px-4 py-3">10–15 years</td>
                    <td className="border border-gray-300 px-4 py-3">No</td>
                    <td className="border border-gray-300 px-4 py-3">Good</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Implant</td>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">20+ years</td>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Yes</td>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">Excellent</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700">
              Implants prevent jawbone shrinkage and offer the most natural function.
            </p>
          </section>

          {/* How to Use Section */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use a Dental Implant Cost Calculator Effectively</h2>
            <p className="text-gray-700 mb-4">To get the most accurate <strong>dental implant cost estimate</strong>:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Know how many teeth are missing</li>
              <li>Confirm if extractions are needed</li>
              <li>Ask if bone grafting is required</li>
              <li>Choose crown material</li>
              <li>Check insurance benefits</li>
            </ul>
            <p className="text-gray-600 mt-4 italic">
              Remember: calculators provide ranges. A clinical exam determines final pricing.
            </p>
          </section>

          {/* FAQs Section */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions (FAQs)</h2>
            
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">What is the average cost of a dental implant per tooth?</h3>
                <p className="text-gray-700">$3,000 to $6,000 including implant, abutment, and crown.</p>
              </div>

              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">How much is dental implant surgery without a crown?</h3>
                <p className="text-gray-700">Usually $1,500 to $3,000 for the implant post alone.</p>
              </div>

              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">How much does a molar extraction cost before implant placement?</h3>
                <p className="text-gray-700">Between $150 and $800 depending on complexity.</p>
              </div>

              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">How much is a full mouth of dental implants?</h3>
                <p className="text-gray-700">Typically $20,000 to $60,000+ per arch.</p>
              </div>

              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Dental implant cost 6 teeth what should I expect?</h3>
                <p className="text-gray-700">$10,000 to $30,000 depending on whether implants are individual or bridge-supported.</p>
              </div>

              <div className="border-b pb-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">How much would 7 dental implants cost?</h3>
                <p className="text-gray-700">Approximately $21,000 to $42,000.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Is a dental implant cost estimator accurate?</h3>
                <p className="text-gray-700">It provides a close range but cannot replace a personalized treatment plan.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      
      <Script
        id="dental-implant-cost-calculator-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        strategy="afterInteractive"
      />
    </>
  );
}
