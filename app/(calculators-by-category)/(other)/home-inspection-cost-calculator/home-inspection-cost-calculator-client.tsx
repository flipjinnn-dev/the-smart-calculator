"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import HomeInspectionCostCalculator from "@/components/home-inspection-cost-calculator"
import { Home, Calculator, CheckCircle, DollarSign, AlertCircle, Info, Building2, Zap } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function HomeInspectionCostCalculatorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Home Inspection Cost Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Estimate your home inspection cost instantly. Get accurate pricing based on size, age, location, and add-ons. Free calculator, no signup needed.
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className="mb-12 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl shadow-lg">
          <div className="flex items-start gap-4">
            <div className="bg-blue-600 text-white rounded-full p-3 flex-shrink-0">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Quick Answer</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                A typical home inspection cost ranges from <strong>$300 to $500</strong>, with most homeowners paying around <strong>$350 to $420</strong>. Pricing depends on square footage, home age, location, foundation type, and additional services like radon testing, mold inspection, or sewer scope. Use the home inspection cost calculator above to get your personalized estimate instantly — no signup required.
              </p>
            </div>
          </div>
        </div>

        {/* Main Calculator Card */}
        <div className="mb-12">
          <Card className="border-2 border-gray-200 shadow-xl">
            <CardHeader className="py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                Calculate Your Home Inspection Cost
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <HomeInspectionCostCalculator />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="mb-12">
          <div className="space-y-8">
            {/* What Is Section */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Home className="w-8 h-8 text-blue-600" />
                What Is a Home Inspection Cost Calculator?
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  A home inspection cost calculator is a free online tool that estimates your inspection fee before you ever contact an inspector. You enter your property details — square footage, home age, foundation type, number of HVAC systems, and ZIP code — and the calculator returns an accurate cost estimate based on real industry pricing data.
                </p>
                <p>
                  Use the home inspection cost calculator above to estimate your price in under 60 seconds. The result reflects what licensed, ASHI-certified and InterNACHI-certified inspectors in your area typically charge for a standard residential inspection. It is not a guaranteed quote, but it is a reliable number to budget around.
                </p>
                <p>
                  Based on industry data compiled from certified home inspectors and national cost surveys from sources including Angi and the American Society of Home Inspectors (ASHI), our estimator reflects 2025 and 2026 pricing standards across all major U.S. markets.
                </p>
              </div>
            </div>

            {/* How to Use */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use the Home Inspection Cost Calculator</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Using our free home inspection cost estimator takes less than a minute. Follow these steps:
              </p>
              <div className="space-y-4">
                {[
                  "Enter the total square footage of the home. Include the finished basement if applicable — but not unfinished attic space.",
                  "Select the age of the home. Older homes cost more to inspect because they require more time and expertise.",
                  "Choose your foundation type — slab, crawlspace, or basement. Crawlspaces add inspection time and cost.",
                  "Enter the number of HVAC systems. Each additional unit increases your total.",
                  "Select any add-on services you want — radon testing, mold inspection, sewer scope, thermal imaging, or pool inspection.",
                  "Enter your ZIP code so the calculator can apply regional pricing to your estimate.",
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-gray-700 leading-relaxed">
                Once you have entered your details, use the home inspection cost calculator above to see your instant estimate. If the number surprises you in either direction, the sections below explain exactly what drives the price.
              </p>
            </div>

            {/* Average Costs */}
            <div className="bg-white border-2 border-blue-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <DollarSign className="w-8 h-8" />
                  How Much Does a Home Inspection Cost?
                </h2>
              </div>
              <div className="p-8">
                <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                  The national average home inspection cost is <strong>$340 to $420</strong> for a standard single-family home under 2,000 square feet. This figure comes from aggregated pricing data across thousands of inspections completed by ASHI and InterNACHI-certified inspectors in markets across the United States.
                </p>
                <p className="text-gray-900 font-bold mb-4 text-lg">Here is what most homebuyers actually pay by home size:</p>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Home Size</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Typical Cost Range</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-blue-50 transition-all duration-200">
                        <td className="px-6 py-4 text-gray-900 font-medium">Homes under 1,000 sq ft</td>
                        <td className="px-6 py-4 text-blue-600 font-bold text-lg">$250 to $310</td>
                      </tr>
                      <tr className="hover:bg-blue-50 transition-all duration-200">
                        <td className="px-6 py-4 text-gray-900 font-medium">Homes from 1,000 to 1,500 sq ft</td>
                        <td className="px-6 py-4 text-blue-600 font-bold text-lg">$300 to $360</td>
                      </tr>
                      <tr className="hover:bg-blue-50 transition-all duration-200">
                        <td className="px-6 py-4 text-gray-900 font-medium">Homes from 1,500 to 2,000 sq ft</td>
                        <td className="px-6 py-4 text-blue-600 font-bold text-lg">$340 to $400</td>
                      </tr>
                      <tr className="hover:bg-blue-50 transition-all duration-200">
                        <td className="px-6 py-4 text-gray-900 font-medium">Homes from 2,000 to 2,500 sq ft</td>
                        <td className="px-6 py-4 text-blue-600 font-bold text-lg">$390 to $450</td>
                      </tr>
                      <tr className="hover:bg-blue-50 transition-all duration-200">
                        <td className="px-6 py-4 text-gray-900 font-medium">Homes from 2,500 to 3,000 sq ft</td>
                        <td className="px-6 py-4 text-blue-600 font-bold text-lg">$430 to $510</td>
                      </tr>
                      <tr className="hover:bg-blue-50 transition-all duration-200">
                        <td className="px-6 py-4 text-gray-900 font-medium">Homes from 3,000 to 4,000 sq ft</td>
                        <td className="px-6 py-4 text-blue-600 font-bold text-lg">$500 to $620</td>
                      </tr>
                      <tr className="hover:bg-blue-50 transition-all duration-200">
                        <td className="px-6 py-4 text-gray-900 font-medium">Homes from 4,000 to 5,000 sq ft</td>
                        <td className="px-6 py-4 text-blue-600 font-bold text-lg">$600 to $750</td>
                      </tr>
                      <tr className="hover:bg-blue-50 transition-all duration-200">
                        <td className="px-6 py-4 text-gray-900 font-medium">Homes over 5,000 sq ft</td>
                        <td className="px-6 py-4 text-blue-600 font-bold text-lg">$750 and above</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-6 text-gray-600 leading-relaxed">
                  Use the home inspection cost calculator above to get the exact estimate for your home size and location — these ranges are national averages and your local market may vary.
                </p>
              </div>
            </div>

            {/* Cost Per Square Foot */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Home Inspection Cost Per Square Foot — Explained</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  The home inspection cost per square foot typically ranges from <strong>$0.10 to $0.14</strong> for square footage above the inspector's base rate. Inspectors set a flat base fee that covers the first 1,000 to 1,300 square feet of the home. Every additional square foot adds a smaller incremental cost on top.
                </p>
                <p>
                  Smaller homes carry a higher effective cost per square foot because the inspector's fixed costs — travel time, setup, equipment, and report writing — stay the same regardless of home size. As square footage increases, those fixed costs spread across more area and the per-square-foot rate decreases.
                </p>
                <p>
                  This is why a 900-square-foot condo might cost $280 while a 4,500-square-foot home costs $680 — the total rises, but the per-square-foot rate falls. The home inspection cost calculator above automatically applies this tiered pricing formula to give you an accurate total based on your specific square footage.
                </p>
              </div>
            </div>

            {/* 7 Factors */}
            <div className="bg-white border-2 border-purple-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">7 Factors That Determine Your Home Inspection Cost Total</h2>
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">1</span>
                    Square Footage
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Square footage is the single biggest driver of home inspection pricing. Larger homes take more time to walk through, evaluate, and document. A thorough inspection of a 4,000-square-foot home typically takes four to five hours on-site. A 1,200-square-foot condo takes under two hours. More time means higher cost.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">2</span>
                    Age of the Home
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Older homes require more careful and time-consuming inspection. Aging electrical panels, galvanized supply pipes, outdated HVAC equipment, and deteriorating roofing materials all demand closer attention from a qualified inspector. Most inspectors following ASHI and InterNACHI inspection standards add a surcharge of $25 to $100 for homes older than 30, 50, or 70 years. A home built before 1978 also triggers lead paint awareness protocols.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">3</span>
                    Foundation Type
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Crawlspace foundations add to the inspection cost because the inspector must physically enter a confined, often damp, and sometimes pest-affected space to evaluate floor joists, beams, vapor barriers, insulation, and moisture conditions. Most inspectors charge $50 to $100 extra for crawlspace access. Slab-on-grade foundations do not carry this additional charge.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">4</span>
                    Number of HVAC Systems
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    A standard single-family home has one heating and cooling system. Larger homes, zoned climate systems, or multi-unit properties may have two or more. Each additional HVAC unit adds roughly $25 to $50 to the home inspection cost total. The inspector must evaluate every thermostat, air handler, and condenser unit separately.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">5</span>
                    Location and Travel Distance
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Inspectors in high-cost urban markets charge higher base rates than those in rural areas. Local real estate market conditions, state licensing requirements, and inspector certifications also affect pricing. Properties far from the inspector's base location may carry a mileage surcharge — typically $0.75 to $1.80 per mile beyond 20 miles.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">6</span>
                    Additional Dwellings or Structures
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    A guest house, garage apartment, or accessory dwelling unit with its own kitchen, bathroom, and sleeping area counts as a separate dwelling in most inspection pricing models. Inspectors generally charge $50 to $100 per additional dwelling unit. Detached garages without living quarters carry a smaller square-footage-based add-on.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">7</span>
                    Add-On Inspection Services
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    The standard home inspection report produced in accordance with ASHI Standards of Practice and InterNACHI inspection guidelines covers the visible and accessible components of the home. Specialized testing like radon, mold, sewer, or pool inspection requires separate services and adds to the home inspection cost total.
                  </p>
                </div>
              </div>
            </div>

            {/* Add-On Services Price List */}
            <div className="bg-white border-2 border-green-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">Home Inspection Price List — Add-On Services</h2>
              </div>
              <div className="p-8">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  These are the most commonly requested add-on services and what they typically cost nationwide:
                </p>
                <div className="space-y-4">
                  {[
                    { service: "Radon Testing", cost: "$100 to $200", desc: "Radon is the second leading cause of lung cancer. Required by lenders in many states. Strongly recommended in high-prevalence regions." },
                    { service: "Mold Inspection and Air Quality Testing", cost: "$200 to $600", desc: "Essential when visible moisture damage, water stains, or musty odors are present." },
                    { service: "Sewer Scope Inspection", cost: "$100 to $300", desc: "A camera inspection of the sewer lateral line. Critical for homes older than 30 years or with mature trees near the sewer line." },
                    { service: "Water Quality Testing", cost: "$100 to $250", desc: "Checks for lead, bacteria, nitrates, and other contaminants. Required for homes on private wells." },
                    { service: "Pool and Spa Inspection", cost: "$100 to $250", desc: "Evaluates pool equipment, plumbing, electrical connections, and structural condition." },
                    { service: "Thermal Imaging (Infrared Inspection)", cost: "$150 to $300", desc: "Reveals hidden moisture, missing insulation, and electrical hot spots invisible to the naked eye. Often bundled with the main inspection at a discount." },
                    { service: "Chimney Inspection", cost: "$100 to $250", desc: "Level 1 or Level 2 inspection per NFPA 211 standards. Critical for wood-burning fireplaces." },
                    { service: "Septic System Inspection", cost: "$200 to $600", desc: "For homes not connected to municipal sewer. Identifies tank capacity, leach field condition, and system failures." },
                    { service: "Foundation Elevation Survey", cost: "$150 to $350", desc: "Uses precision instruments to measure foundation movement. Recommended in regions with expansive clay soils." },
                    { service: "Reinspection or Follow-Up Visit", cost: "$100 to $150 flat fee", desc: "Verifies that seller-agreed repairs were completed correctly before closing." },
                  ].map((item, index) => (
                    <div key={index} className="p-5 bg-gray-50 border-2 border-gray-200 rounded-xl hover:border-green-400 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{item.service}</h3>
                        <span className="text-green-600 font-bold text-lg whitespace-nowrap ml-4">{item.cost}</span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-gray-600 leading-relaxed">
                  Use the home inspection cost calculator above to add these services to your estimate and see your total home inspection cost in one place.
                </p>
              </div>
            </div>

            {/* Cost by Home Type */}
            <div className="bg-white border-2 border-orange-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <Building2 className="w-8 h-8" />
                  Home Inspection Cost by Home Type
                </h2>
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Single-Family Homes</h3>
                  <p className="text-gray-700 leading-relaxed">
                    A standard 2,000-square-foot single-family home on a slab foundation with one HVAC system costs <strong>$350 to $450</strong> to inspect. This is the most common scenario in the U.S. residential market and the baseline most home inspection cost calculators use as their starting point.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Condos and Townhomes</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Condo and townhome inspections typically cost <strong>$200 to $350</strong>. The inspector evaluates only the interior unit and the systems within the unit boundaries. The roof, building exterior, and common areas are the HOA's responsibility and are not included in the property inspection report.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">New Construction Homes</h3>
                  <p className="text-gray-700 leading-relaxed">
                    New construction inspections cost <strong>$300 to $500</strong>. Many buyers also commission phase inspections during the build — a framing inspection before drywall installation and a pre-drywall electrical inspection. These add $150 to $250 each but catch builder errors while corrections are still free. A final new construction inspection before closing is always recommended, even on properties built by reputable developers.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Older and Historic Homes</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Homes built before 1960 typically cost <strong>$400 to $700 or more</strong> to inspect. These properties require an experienced inspector familiar with period-appropriate construction — balloon framing, knob-and-tube wiring, galvanized plumbing, and original HVAC systems all require more careful evaluation. InterNACHI and ASHI-certified inspectors with specific experience in older homes deliver the most thorough property inspection reports for these properties.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Multi-Family and Investment Properties</h3>
                  <p className="text-gray-700 leading-relaxed">
                    A duplex inspection runs <strong>$400 to $600</strong>. Each additional unit adds $60 to $100. A four-unit residential property may cost $700 to $950 for a complete inspection. Real estate investors who skip inspections on multi-family acquisitions frequently discover plumbing failures, electrical deficiencies, or code violations that eliminate months of projected rental income.
                  </p>
                </div>
              </div>
            </div>

            {/* Regional Costs */}
            <div className="bg-white border-2 border-indigo-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">Home Inspection Cost by Region — Benchmarks</h2>
              </div>
              <div className="p-8">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Home inspection pricing varies significantly across the United States. Here are the typical ranges by region based on current industry data:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-indigo-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Region</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Typical Cost Range</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-indigo-50 transition-all duration-200">
                        <td className="px-6 py-4 text-gray-900 font-medium">Northeast (NY, MA, CT, NJ)</td>
                        <td className="px-6 py-4 text-indigo-600 font-bold text-lg">$400 to $600</td>
                        <td className="px-6 py-4 text-gray-600 text-sm">High labor costs, dense older housing stock, strict licensing requirements</td>
                      </tr>
                      <tr className="hover:bg-indigo-50 transition-all duration-200">
                        <td className="px-6 py-4 text-gray-900 font-medium">Southeast (TX, FL, GA, NC)</td>
                        <td className="px-6 py-4 text-indigo-600 font-bold text-lg">$300 to $450</td>
                        <td className="px-6 py-4 text-gray-600 text-sm">Humidity, wood rot, and hurricane zone considerations</td>
                      </tr>
                      <tr className="hover:bg-indigo-50 transition-all duration-200">
                        <td className="px-6 py-4 text-gray-900 font-medium">Midwest (IL, OH, MI, MN)</td>
                        <td className="px-6 py-4 text-indigo-600 font-bold text-lg">$280 to $420</td>
                        <td className="px-6 py-4 text-gray-600 text-sm">Older homes common, cold climate HVAC evaluation, frequent basement inspections</td>
                      </tr>
                      <tr className="hover:bg-indigo-50 transition-all duration-200">
                        <td className="px-6 py-4 text-gray-900 font-medium">West Coast (CA, WA, OR)</td>
                        <td className="px-6 py-4 text-indigo-600 font-bold text-lg">$400 to $650</td>
                        <td className="px-6 py-4 text-gray-600 text-sm">High cost of living, seismic zone considerations, wildfire area disclosures</td>
                      </tr>
                      <tr className="hover:bg-indigo-50 transition-all duration-200">
                        <td className="px-6 py-4 text-gray-900 font-medium">Mountain West (CO, UT, AZ, NV)</td>
                        <td className="px-6 py-4 text-indigo-600 font-bold text-lg">$320 to $480</td>
                        <td className="px-6 py-4 text-gray-600 text-sm">High radon prevalence, expansive soils, desert HVAC systems</td>
                      </tr>
                      <tr className="hover:bg-indigo-50 transition-all duration-200">
                        <td className="px-6 py-4 text-gray-900 font-medium">Gulf South (LA, MS, AL)</td>
                        <td className="px-6 py-4 text-indigo-600 font-bold text-lg">$280 to $400</td>
                        <td className="px-6 py-4 text-gray-600 text-sm">Moisture concerns, flooding history, termite activity, older construction</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* What Should It Cost */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-yellow-600" />
                What Should a Home Inspection Cost?
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                A fair home inspection price reflects the complexity of the property and the qualifications of the inspector — not the lowest number you can find on a search result. Before you book, verify these things:
              </p>
              <div className="space-y-4">
                {[
                  "Confirm the inspector carries Errors and Omissions (E&O) insurance and general liability coverage. Uninsured inspectors expose you to significant risk if they miss something major.",
                  "Check their certification. ASHI (American Society of Home Inspectors) and InterNACHI (International Association of Certified Home Inspectors) are the two most respected credentialing bodies in the U.S. residential inspection industry. Both require inspectors to follow documented Standards of Practice and complete ongoing education.",
                  "Ask for a sample property inspection report. A professional report includes photos, condition ratings, and clear descriptions of every deficiency found. Vague or one-page reports are a red flag.",
                  "Confirm they allow you to attend the inspection. Walking through the home with the inspector — asking questions in real time — is one of the most valuable parts of the entire process. Any inspector who discourages your attendance is not worth hiring.",
                  "Read Google, Angi, and Yelp reviews — specifically for comments about thoroughness, communication, and report quality — not just star ratings.",
                ].map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white border-2 border-yellow-200 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-gray-700 leading-relaxed">
                Used by homebuyers across the country to estimate real inspection costs, our home inspection cost calculator above takes all of these variables into account and gives you a reliable benchmark before you start contacting inspectors.
              </p>
            </div>

            {/* What's Included */}
            <div className="bg-white border-2 border-teal-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">What Does a Standard Home Inspection Cover?</h2>
              </div>
              <div className="p-8">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  A home inspection completed according to ASHI Standards of Practice and InterNACHI inspection guidelines covers all of the following:
                </p>
                
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-7 h-7 text-green-600" />
                    Included in every standard inspection:
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Roof covering, gutters, downspouts, and flashing condition",
                      "Exterior siding, trim, grading, driveways, and walkways",
                      "Foundation, basement, and all visible structural components",
                      "Electrical panel, wiring, outlets, switches, and fixtures",
                      "Plumbing supply lines, drain lines, water heater, and all fixtures",
                      "HVAC — heating, cooling, and ventilation equipment",
                      "Attic insulation, ventilation, and visible roof sheathing",
                      "Crawlspace framing, insulation, vapor barrier, and moisture conditions",
                      "Interior ceilings, walls, floors, doors, and windows",
                      "Attached garage structure, door, opener, and fire separation wall",
                      "Built-in appliances when present and accessible",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <span className="text-green-600 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-7 h-7 text-red-600" />
                    Not included — require separate add-on services:
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Radon, mold, asbestos, or lead paint testing",
                      "Sewer lateral line or septic system evaluation",
                      "Swimming pools, hot tubs, or spas",
                      "Private water wells and water quality testing",
                      "Termite or pest inspection (often a separate report required by lenders)",
                      "Detached outbuildings beyond the primary structure",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <span className="text-red-600 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* How to Reduce Cost */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Reduce Your Home Inspection Cost Without Cutting Corners</h2>
              <div className="space-y-5">
                {[
                  { title: "Bundle add-on services with your main inspection", desc: "Most inspectors offer a discount when you order radon testing, thermal imaging, or a sewer scope alongside the primary inspection. Ordering them separately from different vendors almost always costs more overall." },
                  { title: "Ask about a prepayment discount", desc: "Many independent inspectors reduce their fee by 5 to 10 percent for buyers who pay in full at the time of booking rather than at the inspection." },
                  { title: "Choose an inspector based near the property", desc: "A locally based inspector does not charge a travel or mileage surcharge, and local inspectors typically have deeper knowledge of regional building practices and common defects in your market." },
                  { title: "Confirm the reinspection fee before you sign", desc: "If repairs are negotiated after your inspection, you will need a reinspection to verify the work. Most professional inspectors charge $100 to $150 for this follow-up visit — not a new full inspection fee." },
                  { title: "Do not waive the inspection to strengthen your offer", desc: "This is the most expensive mistake buyers make in competitive markets. A home inspection contingency protects you from purchasing a property with serious hidden defects. The home inspection cost — $300 to $500 — is always worth the protection it provides." },
                ].map((tip, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">{tip.title}</h3>
                      <p className="text-gray-700 leading-relaxed">{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How much is a typical home inspection cost?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    A typical home inspection cost in the United States ranges from $300 to $500. Most buyers pay $340 to $420 for a standard single-family home under 2,500 square feet. The national average is $340 to $420 based on 2026 industry data from ASHI and Angi cost surveys. Use the home inspection cost calculator above for a location-specific estimate.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is the home inspection cost per square foot?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    The incremental home inspection cost per square foot ranges from $0.10 to $0.14 above the inspector's base rate. Smaller homes carry a higher effective per-square-foot cost because the inspector's fixed costs are spread across fewer square feet. Larger homes benefit from a lower per-square-foot rate as those fixed costs are distributed more broadly.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is a typical home inspection cost for an older home?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    A home built before 1960 typically costs $50 to $100 more to inspect than a comparable newer home. Expect $400 to $600 for a 1,500 to 2,500 square foot home from this era. Homes with original electrical systems, galvanized plumbing, or knob-and-tube wiring require more time and expertise from the inspector.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Is a home inspection worth the cost?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Yes — without question. A home inspection costing $300 to $500 can reveal defects that save you thousands in repair costs after closing, give you strong negotiating leverage with the seller, or in the best cases, give you the confidence to walk away from a bad purchase entirely. Used by homebuyers across all market conditions, the home inspection remains the single most valuable due diligence step in any residential transaction.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Who pays for the home inspection — the buyer or the seller?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    In the vast majority of U.S. real estate transactions, the buyer pays for and arranges their own home inspection. Sellers sometimes commission a pre-listing inspection to identify issues before listing, which helps them price accurately and avoid surprises during buyer negotiations.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How long does a home inspection take?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Most home inspections take two to four hours on-site. A small condo may take 90 minutes. A large older home with a crawlspace, two HVAC systems, and a detached garage can take five hours or more. The written property inspection report typically arrives within 12 to 24 hours after the inspection is completed.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Can I use a free home inspection cost calculator for my budget?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Yes. Our free home inspection cost calculator gives you a reliable estimate before you contact any inspector. It accounts for the factors that matter most — square footage, home age, foundation type, number of systems, and regional pricing. Use it alongside our closing cost calculator to build a complete picture of your home purchase expenses.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is a home inspector cost calculator and how accurate is it?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    A home inspector cost calculator takes your property inputs and returns a price estimate based on regional industry data and standard pricing formulas used by ASHI and InterNACHI-certified inspectors. A well-built calculator is typically accurate within 10 to 15 percent of actual inspector quotes in most U.S. markets. Always confirm your estimate by getting quotes from two or three licensed inspectors in your area.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-9">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How much does a new construction home inspection cost?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    New construction inspections typically cost $300 to $500. Phase inspections during the build — framing inspection, pre-drywall electrical check, and final walkthrough — add $150 to $250 each. These are strongly recommended because they catch builder errors while corrections are still the builder's responsibility.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-10">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is the home inspection cost for a condo?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Condo inspections typically cost $200 to $350 because the inspector evaluates only the interior unit and its internal systems. The building exterior, roof, and common areas are not included in the inspection scope. Use the home inspection cost calculator above and select the condo option for an accurate estimate.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Pricing Guide Summary */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Home Inspection Pricing Guide</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Here is a quick-reference summary of every cost factor covered on this page:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { label: "National average home inspection cost", value: "$340 to $420" },
                  { label: "Typical cost range for most homes", value: "$300 to $500" },
                  { label: "Home inspection cost per square foot (incremental)", value: "$0.10 to $0.14" },
                  { label: "Base rate covers", value: "first 1,000 to 1,300 sq ft" },
                  { label: "Age surcharge (homes over 30 to 90 years)", value: "$25 to $100" },
                  { label: "Crawlspace foundation add-on", value: "$50 to $100" },
                  { label: "Each additional HVAC system", value: "$25 to $50" },
                  { label: "Each additional dwelling unit", value: "$50 to $100" },
                  { label: "Radon testing", value: "$100 to $200" },
                  { label: "Mold inspection", value: "$200 to $600" },
                  { label: "Sewer scope", value: "$100 to $300" },
                  { label: "Thermal imaging", value: "$150 to $300" },
                  { label: "Travel surcharge beyond 20 miles", value: "$0.75 to $1.80 per mile" },
                  { label: "Reinspection fee", value: "$100 to $150" },
                ].map((item, index) => (
                  <div key={index} className="p-4 bg-white border-2 border-blue-200 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">{item.label}</div>
                    <div className="text-lg font-bold text-blue-600">{item.value}</div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-gray-700 leading-relaxed">
                Use the home inspection cost calculator at the top of this page to combine all of these factors and get a personalized estimate for your property. If you want a detailed breakdown of what your inspection will cover, visit our complete home inspection checklist page.
              </p>
              <div className="mt-6 p-6 bg-green-100 border-2 border-green-400 rounded-xl">
                <p className="text-gray-800 font-semibold text-lg leading-relaxed">
                  A home inspection is not optional — it is a fundamental part of responsible homebuying. For $300 to $500, you gain protection, negotiating power, and the peace of mind that comes from knowing exactly what you are buying.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
