import Script from "next/script"
import ShippingCostCalculatorClient from "./shipping-cost-calculator-client"
import { Globe, Info, Package, Plane, Ship, ShieldCheck, Truck } from "lucide-react"

const CANONICAL_URL = "https://www.thesmartcalculator.com/shipping-cost-calculator"

export default function ShippingCostCalculatorPage() {
  const calculatorJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Shipping Cost Calculator",
    description:
      "Estimate shipping charges by weight, dimensions, route, service level, and carrier fees. Compare options and understand what drives the total.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "windows, Macos",
    softwareVersion: "5.2.0",
    url: CANONICAL_URL,
    downloadUrl: CANONICAL_URL,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      ratingCount: "4600",
      bestRating: "5",
      worstRating: "1",
    },
    author: {
      "@type": "Organization",
      name: "Felix Yacoub",
    },
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How is shipping cost calculated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Shipping cost is typically based on chargeable weight (max of actual weight and dimensional/volumetric weight), route, service level, and fees like fuel surcharge, residential delivery, insurance, and customs/taxes.",
        },
      },
      {
        "@type": "Question",
        name: "What is dimensional (DIM) or volumetric weight?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dimensional/volumetric weight estimates billable weight from package volume. A common simplified formula is (Length × Width × Height) ÷ DIM divisor.",
        },
      },
      {
        "@type": "Question",
        name: "What is billable or chargeable weight?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Billable (chargeable) weight is the weight carriers use to price the shipment. It is usually the larger of actual weight and DIM/volumetric weight.",
        },
      },
      {
        "@type": "Question",
        name: "Which shipping method is cheapest?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sea freight is usually cheapest for heavy or bulky international shipments. For small parcels, economy services may be cheaper. Compare options for your exact shipment.",
        },
      },
      {
        "@type": "Question",
        name: "Which shipping method is fastest?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Air express is typically the fastest for international parcels and documents. Transit time depends on lane, customs, and service level.",
        },
      },
      {
        "@type": "Question",
        name: "Why does shipping cost change after I buy the label?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Carriers can reweigh and remeasure packages. If billed (DIM) weight or surcharges differ from what was entered, the final invoice can change.",
        },
      },
      {
        "@type": "Question",
        name: "Can customs duties be calculated exactly?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Exact duties depend on HS code, declared value, trade agreements, Incoterms, and local tax rules. Many calculators provide a budgeting estimate rather than an exact number.",
        },
      },
      {
        "@type": "Question",
        name: "Which is cheaper: UPS or USPS?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It depends on weight, destination zone, delivery speed, and surcharges. USPS often wins on lightweight parcels; UPS can be competitive for heavier parcels and business delivery. Compare both for your shipment.",
        },
      },
    ],
  }

  return (
    <>
      <Script id="shipping-calculator-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(calculatorJsonLd)}
      </Script>
      <Script id="shipping-faq-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqJsonLd)}
      </Script>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-sky-500 to-teal-500 bg-clip-text text-transparent">
              Shipping Cost Calculator
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Estimate shipping charges by weight, dimensions, route, service level, and carrier fees. Compare options and understand what drives the total.
            </p>
          </div>

          <div className="mb-14">
            <ShippingCostCalculatorClient />
          </div>

          <div className="space-y-12">
            <div className="p-6 bg-gradient-to-r from-sky-50 to-blue-50 border-2 border-blue-200 rounded-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Info className="w-6 h-6 text-blue-600" />
                QUICK ANSWER
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                A shipping price calculator (also called a shipping cost calculator or shipping rate calculator) estimates your total shipping charges by combining (1)
                package or freight details (weight, dimensions, freight class), (2) route (origin, destination, zones), (3) service level (economy vs express), and (4)
                carrier fees (fuel surcharge, residential delivery, insurance, customs/taxes).
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Shipping Price Calculator / Shipping Cost Calculator (2026 Guide)</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
        
                <p>
                  Whether you’re a Shopify seller shipping daily parcels, a manufacturer moving pallets, or an importer planning a container, a reliable package shipping
                  calculator helps you:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Forecast costs before you price products (reduce margin surprises)</li>
                  <li>Pick the best service level (ground vs air, economy vs express)</li>
                  <li>Compare carriers (e.g., UPS shipping calculator vs USPS shipping cost calculator)</li>
                  <li>Build transparent checkout pricing (flat-rate, carrier-calculated, or free shipping thresholds)</li>
                  <li>Produce a better freight shipping estimate for B2B quotes</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Shipping Price Calculator: What You Need to Enter (Inputs)</h2>
              <div className="space-y-5 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                   
                    1) Shipment type (parcel vs freight)
                  </h3>
                  <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                    <li>Parcel: cartons, envelopes, small boxes (UPS/USPS/FedEx/DHL)</li>
                    <li>Freight: pallets, crates, oversize, B2B shipments (LTL/FTL, air freight, ocean freight)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    
                    2) Origin & destination
                  </h3>
                  <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                    <li>Country, city, postal code (or ZIP code)</li>
                    <li>For domestic shipping, carriers use zones/regions</li>
                    <li>For international shipping, lane, customs clearance, and surcharges play a bigger role</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    
                    3) Weight & dimensions (actual vs dimensional)
                  </h3>
                  <p className="mt-2">
                    Carriers typically bill by actual weight or dimensional (DIM) weight. Billable weight is usually the maximum of the two.
                  </p>
                  <div className="mt-3 p-4 bg-white rounded-lg border-l-4 border-blue-600">
                    <div className="font-semibold text-gray-900">Dimensional weight (simplified)</div>
                    <div className="mt-2 text-gray-800">DIM weight = (Length × Width × Height) ÷ DIM divisor</div>
                    <div className="mt-1 text-gray-800">Billable weight = max(Actual weight, DIM weight)</div>
                    <div className="mt-2 text-sm text-gray-600">Divisors vary by carrier and service, so always verify with carrier rules.</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900">4) Service level (speed & handling)</h3>
                  <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                    <li>Economy / standard</li>
                    <li>Expedited</li>
                    <li>Next-day / express</li>
                    <li>Temperature-controlled / hazmat (freight)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900">5) Pickup & delivery conditions</h3>
                  <p className="mt-2">This is where hidden costs appear:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                    <li>Residential vs commercial delivery</li>
                    <li>Liftgate requirement (freight)</li>
                    <li>Inside delivery, limited access (freight)</li>
                    <li>Remote area surcharge (international)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  
                    6) Declared value & insurance
                  </h3>
                  <p className="mt-2">Insurance is often optional but critical for high-value shipments.</p>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Entities & Concepts Your Calculator Should Understand</h2>
              <p className="text-gray-700 leading-relaxed">
                Shipping rates depend on real logistics concepts. If a tool ignores these, an “estimate” can be misleading.
              </p>
              <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                <li>Carriers: UPS, USPS, FedEx, DHL, local couriers</li>
                <li>Freight modes: LTL, FTL, air freight, sea freight, rail, multimodal</li>
                <li>Incoterms® 2020: EXW, FOB, CIF, DAP, DDP (who pays shipping, insurance, duties)</li>
                <li>HS Code (Harmonized System): impacts duties/taxes and customs checks</li>
                <li>NMFC / Freight Class (LTL): pricing depends on more than just weight</li>
                <li>Fuel surcharge: percentage add-on that can change regularly</li>
                <li>Accessorial charges: liftgate, re-delivery, appointment, residential, oversize</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Shipping Rate Calculator: Cost Components (What You’re Really Paying For)</h2>
              <p className="text-gray-700 leading-relaxed">
                Shipping costs are rarely “just the rate”. A solid shipping cost calculator should present a breakdown.
              </p>

              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Truck className="w-6 h-6 text-blue-600" />
                    Typical parcel cost components
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Base transportation charge (zone + weight + service)</li>
                    <li>Surcharges (fuel, residential, peak season, oversize)</li>
                    <li>Optional add-ons (signature, insurance)</li>
                    <li>Taxes (country-specific)</li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Ship className="w-6 h-6 text-teal-600" />
                    Typical freight cost components
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Linehaul (main transport)</li>
                    <li>Fuel surcharge</li>
                    <li>Accessorials (liftgate, inside delivery, limited access)</li>
                    <li>Detention / demurrage (ports/containers)</li>
                    <li>Customs brokerage (international)</li>
                    <li>Terminal handling charges (THC) for ocean freight</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-sky-50 to-white border-2 border-sky-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">ShippingEasy / Platform Rates vs Carrier Direct: Which Is Better?</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Platforms (Shopify Shipping, ShipStation, ShippingEasy) may show discounted rates due to negotiated pricing. Carrier-direct calculators are best for
                  official service rules and published pricing logic.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Carrier-direct calculators: best for official rules and service promises</li>
                  <li>Platform rates: can be cheaper, especially for parcels</li>
                  <li>Best practice: compare carrier direct + platform rates + brokers/forwarders (freight)</li>
                </ul>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">UPS Shipping Calculator vs USPS Shipping Cost Calculator (Practical Guidance)</h2>
              <p className="text-gray-700 leading-relaxed">
                Instead of arguing “which is cheaper,” compare based on your shipment’s weight band, delivery promise, and surcharges.
              </p>
              <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
                <li>Delivery promise: time-definite vs best-effort</li>
                <li>Weight band: USPS often shines on lightweight parcels; UPS may be stronger on heavier parcels</li>
                <li>Tracking & claims: reliability, insurance, and documentation</li>
                <li>Residential surcharges: can change the outcome significantly</li>
              </ul>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Tables: Factors That Change Shipping Prices (Fast Reference)</h2>

              <div className="overflow-x-auto my-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Table 1 — Inputs that impact quotes the most</h3>
                <table className="w-full border-collapse border-2 border-gray-300 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-700 text-white">
                      <th className="border border-gray-300 p-3 text-left">Factor</th>
                      <th className="border border-gray-300 p-3 text-left">Parcel impact</th>
                      <th className="border border-gray-300 p-3 text-left">Freight impact</th>
                      <th className="border border-gray-300 p-3 text-left">Why it matters</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Weight (actual/billable)", "High", "High", "Direct driver of base rate"],
                      ["Dimensions / DIM weight", "Very High", "Medium", "Bulky packages get billed heavier"],
                      ["Distance / zone", "High", "High", "Longer lanes cost more"],
                      ["Speed (express vs economy)", "Very High", "High", "Faster service costs more"],
                      ["Residential delivery", "High", "Medium", "Surcharge for home delivery"],
                      ["Liftgate / inside delivery", "N/A", "Very High", "Labor/equipment cost"],
                      ["Freight class (NMFC)", "N/A", "Very High", "Density/handling/ liability changes price"],
                      ["Fuel surcharge", "Medium", "High", "Variable % on transportation"],
                      ["Customs & duties", "International only", "International only", "Depends on HS code and Incoterms"],
                    ].map((row, idx) => (
                      <tr key={row[0]} className={idx % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                        <td className="border border-gray-300 p-3 font-semibold">{row[0]}</td>
                        <td className="border border-gray-300 p-3">{row[1]}</td>
                        <td className="border border-gray-300 p-3">{row[2]}</td>
                        <td className="border border-gray-300 p-3">{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="overflow-x-auto my-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Table 2 — Quick comparison by mode (useful for planning)</h3>
                <table className="w-full border-collapse border-2 border-gray-300 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-700 text-white">
                      <th className="border border-gray-300 p-3 text-left">Mode</th>
                      <th className="border border-gray-300 p-3 text-left">Best for</th>
                      <th className="border border-gray-300 p-3 text-left">Typical transit</th>
                      <th className="border border-gray-300 p-3 text-left">Typical pricing basis</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Parcel (UPS/USPS)", "Boxes, ecom orders", "1–7 days", "Zone + billable weight"],
                      ["LTL freight", "1–6 pallets", "2–10 days", "Class + weight + lane"],
                      ["FTL freight", "Full truck loads", "1–7 days", "Per truck / per mile"],
                      ["Air freight", "Urgent B2B", "1–5 days", "Chargeable weight + surcharges"],
                      ["Sea freight (LCL/FCL)", "Heavy/bulky intl", "2–8+ weeks", "Container or volume + port fees"],
                    ].map((row, idx) => (
                      <tr key={row[0]} className={idx % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                        <td className="border border-gray-300 p-3 font-semibold">{row[0]}</td>
                        <td className="border border-gray-300 p-3">{row[1]}</td>
                        <td className="border border-gray-300 p-3">{row[2]}</td>
                        <td className="border border-gray-300 p-3">{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use a Shipping Price Calculator (Step-by-Step UX Flow)</h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 leading-relaxed">
                <li>Choose shipment type: Parcel vs Freight</li>
                <li>Select route: Origin and destination (postal/ZIP codes)</li>
                <li>Enter weight & dimensions (and number of boxes/pallets)</li>
                <li>Select service level: economy/standard/express</li>
                <li>Add handling needs: residential, liftgate, signature, insurance</li>
                <li>Review the breakdown: base rate + surcharges + optional add-ons</li>
                <li>Compare: carriers + platform discounted rates + brokers/forwarders (freight)</li>
              </ol>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Parcel vs Freight: Which Shipping Calculator Do You Need?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Truck className="w-6 h-6 text-blue-600" />
                    Parcel calculators
                  </h3>
                  <p className="text-gray-700 mb-3">Use a postage or parcel rate calculator if you ship:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Under typical parcel size/weight limits</li>
                    <li>Mostly cartons/envelopes</li>
                    <li>High volume, small order value</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-teal-50 to-white border-2 border-teal-200 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Ship className="w-6 h-6 text-teal-600" />
                    Freight calculators
                  </h3>
                  <p className="text-gray-700 mb-3">Use a freight shipping calculator for:</p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Pallets (LTL/FTL)</li>
                    <li>Oversize/heavy shipments</li>
                    <li>B2B lanes with dock-to-dock pricing</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Mini “Calculate International Shipping” Checklist</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>HS code and product description (customs)</li>
                <li>Declared value and currency</li>
                <li>Incoterms (DAP vs DDP changes who pays duties)</li>
                <li>Import taxes/VAT/GST</li>
                <li>Restricted items/batteries/hazmat rules</li>
                <li>Address format & phone number (many carriers require it)</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-sky-50 to-white border-2 border-sky-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Plane className="w-7 h-7 text-sky-600" />
                Air Freight Cost Calculator: When Speed Justifies Cost
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Stockouts are more expensive than shipping</li>
                <li>Goods are high value, low volume</li>
                <li>You need predictable transit times</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-white border-2 border-teal-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Ship className="w-7 h-7 text-teal-600" />
                Sea Freight / Container Shipping: LCL vs FCL
              </h2>
              <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                <div className="bg-white border border-teal-200 rounded-xl p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">LCL (Less-than-Container Load)</h3>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Volume (CBM) and/or weight</li>
                    <li>Origin/destination charges</li>
                    <li>Consolidation and deconsolidation</li>
                  </ul>
                </div>
                <div className="bg-white border border-teal-200 rounded-xl p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">FCL (Full Container Load)</h3>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Container type (20GP, 40GP, 40HC, reefer)</li>
                    <li>Ocean line rate</li>
                    <li>Port charges (THC) and drayage</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Practical Examples (Realistic Estimation Scenarios)</h2>
              <div className="grid lg:grid-cols-3 gap-6 text-gray-700">
                <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Example A — Parcel (domestic)</h3>
                  <ul className="list-disc list-inside space-y-1 ml-1">
                    <li>Box: 16 × 12 × 8 in</li>
                    <li>Actual weight: 8 lb</li>
                    <li>Route: local vs cross-country</li>
                    <li>Service: ground (economy)</li>
                  </ul>
                  <p className="mt-3 text-sm text-gray-600">
                    Biggest drivers: zone distance, whether DIM weight exceeds 8 lb, and residential delivery surcharge.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-white border-2 border-teal-200 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Example B — LTL freight (pallet)</h3>
                  <ul className="list-disc list-inside space-y-1 ml-1">
                    <li>1 pallet: 48 × 40 × 60 in</li>
                    <li>Weight: 600 lb</li>
                    <li>Pickup/delivery: commercial dock</li>
                  </ul>
                  <p className="mt-3 text-sm text-gray-600">
                    Biggest drivers: freight class/density and accessorials like liftgate or appointment delivery.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-sky-50 to-white border-2 border-sky-200 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Example C — Sea container (FCL)</h3>
                  <ul className="list-disc list-inside space-y-1 ml-1">
                    <li>1 × 40HC container</li>
                    <li>Port-to-port lane + inland drayage</li>
                    <li>Incoterms: FOB vs DDP</li>
                  </ul>
                  <p className="mt-3 text-sm text-gray-600">
                    Biggest drivers: port congestion seasonality, detention/demurrage risk, and inland drayage distance.
                  </p>
                </div>
              </div>
            </div>


            <div className="p-6 bg-gradient-to-r from-blue-600 to-sky-500 rounded-2xl text-white shadow-lg">
              <h2 className="text-2xl font-bold mb-2">Final Takeaway</h2>
              <p className="text-white/95 leading-relaxed">
                A modern shipping rate calculator should do more than show one number. It should explain the “why” (billable weight, zones, surcharges, and accessorials)
                so you can pick the best option and avoid invoice surprises.
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {[
                  {
                    q: "Why does my shipping cost change after I buy the label?",
                    a: "Because carriers re-measure and reweigh packages. If dimensions/weight are off, they bill based on billable (DIM) weight, and surcharges may be applied.",
                  },
                  {
                    q: "What’s the difference between a shipping price calculator and a postage calculator?",
                    a: "A postage calculator is usually parcel-mail focused. A shipping price calculator may include multiple carriers, services, surcharges, and freight modes.",
                  },
                  {
                    q: "Can a freight shipping calculator give an exact price?",
                    a: "Freight tools provide an estimate unless connected to real-time broker/carrier rates. Accessorials, capacity, and freight class changes can move the final number.",
                  },
                  {
                    q: "How do I calculate freight cost for pallets?",
                    a: "To calculate freight cost, you typically need: pallet dimensions, weight, freight class (or density + commodity), pickup/delivery type, and accessorials (liftgate, appointment, etc.).",
                  },
                  {
                    q: "Which is cheaper: UPS or USPS?",
                    a: "It depends on weight, destination zone, delivery speed, and surcharges. USPS often shines on lightweight parcels; UPS may be strong for heavier parcels and commercial delivery.",
                  },
                  {
                    q: "What is a sea freight quote calculator?",
                    a: "A sea freight quote calculator estimates ocean shipping costs (LCL/FCL) including port/handling charges and is often used for budgeting.",
                  },
                  {
                    q: "How do I estimate international shipping costs?",
                    a: "Include destination country, weight/dimensions, service level, customs value, HS code, and Incoterms (DAP/DDP). Duties/taxes can be a major part of the landed cost.",
                  },
                  {
                    q: "What is the most important number in shipping calculations?",
                    a: "Chargeable weight is often the key driver for parcel pricing. For freight, class/density and accessorials can be equally important.",
                  },
                ].map((item) => (
                  <details key={item.q} className="group rounded-xl border border-gray-200 bg-white px-4 py-3">
                    <summary className="cursor-pointer list-none font-semibold text-gray-900 flex items-center justify-between">
                      <span>{item.q}</span>
                      <span className="text-gray-500 group-open:rotate-180 transition-transform">▾</span>
                    </summary>
                    <div className="pt-2 text-sm text-gray-700">{item.a}</div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
