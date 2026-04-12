"use client"

import RipRapCalculator from "@/components/rip-rap-calculator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Calculator, Info, FileText, TrendingUp, DollarSign, CheckCircle, Layers, Shield, AlertTriangle } from "lucide-react"

export default function RipRapClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        
        {/* H1 - Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Rip Rap Calculator — Tons, Cubic Yards, Coverage & Cost Estimator
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            To calculate rip rap, multiply the area (length × width in feet) by the layer depth in feet to get cubic feet. Divide by 27 for cubic yards, then multiply by the stone density factor (typically 1.4–1.6) to convert to tons. Always add a 10% waste buffer. Use the free rip rap calculator above to get instant results in tons, cubic yards, and estimated cost for rectangular areas, sloped banks, and circular ponds.
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="mb-16">
          <RipRapCalculator />
        </div>

        {/* What Is Rip Rap Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Info className="w-8 h-8 text-blue-600" />
            What Is Rip Rap and Why Does Accurate Calculation Matter?
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Rip rap (also written as riprap or rip-rap) refers to a layer of large, angular, durable stones placed to protect soil surfaces from erosion caused by flowing water, wave action, or runoff. Engineers, contractors, landscapers, and property owners use it to stabilise stream banks, shorelines, culvert outlets, slope embankments, pond edges, and bridge abutments.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Accurate rip rap calculations matter for three reasons. First, underordering forces expensive secondary deliveries and project delays. Second, overordering wastes money rip rap runs $30 to $100 per ton before delivery. Third, incorrect depth or stone sizing leads to erosion failure, defeating the purpose of the installation entirely.
            </p>
            <p className="text-gray-700 leading-relaxed">
              A rip rap calculator is a specialised construction tool used to estimate the total volume and weight of stones required to line slopes, embankments, culverts, and shorelines. The calculator uses inputs like length, width, and depth of the area to provide accurate estimations in cubic yards, tons, and cubic feet.
            </p>
          </div>
        </section>

        {/* Formula Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Calculator className="w-8 h-8 text-green-600" />
            The Rip Rap Calculation Formulas — Step by Step
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Every rip rap calculation follows the same three-step sequence: calculate volume, convert to cubic yards, then convert to tons.
            </p>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Step 1 — Calculate Volume in Cubic Feet</h3>
                <p className="text-gray-700 mb-3">
                  To estimate rip rap volume: <strong>Volume (cubic feet) = Length (ft) × Width (ft) × Depth (ft)</strong>
                </p>
                <p className="text-gray-700">
                  For a sloped bank, measure the slope face length and width not the horizontal projection. For a circular pond edge, use the formula: Area = π × radius² for the surface area, then multiply by depth.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Step 2 — Convert Cubic Feet to Cubic Yards</h3>
                <p className="text-gray-700">
                  Divide your cubic footage by 27 (since one cubic yard = 27 cubic feet):
                </p>
                <div className="bg-white rounded-lg p-4 mt-3 text-center">
                  <div className="text-xl font-bold text-green-600">
                    Cubic Yards = Volume (cubic feet) ÷ 27
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Step 3 — Convert Cubic Yards to Tons</h3>
                <p className="text-gray-700 mb-3">
                  To convert cubic yards to tons: <strong>Tons = Cubic Yards × (1.5 to 1.7)</strong>. The range in tonnage accounts for variation in stone size and rock density.
                </p>
                <p className="text-gray-700">
                  More precisely, multiply the rip rap's cubic yardage by its density. For example, for 15 cubic yards of material at 2,700 lb/yd³: 15 × 2,700 = 40,500 lb. Divide by 2,000 to get tons: 40,500 ÷ 2,000 = 20.25 tons.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Step 4 — Add Your Waste Buffer</h3>
                <p className="text-gray-700">
                  Add 5–10% extra to your total to account for irregular shapes, spillage, and compaction. For complex slopes, remote sites, or irregular areas, use a 15–20% buffer.
                </p>
              </div>
            </div>

            {/* Example Calculation Table */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-6 mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Complete Example — Rip Rap Tonnage Calculation</h3>
              <p className="text-gray-700 mb-4">
                A drainage channel protection project measures 50 feet long, 6 feet wide, at 12 inches (1 foot) deep:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-indigo-100">
                      <th className="border-2 border-indigo-300 p-3 text-left font-semibold">Calculation Step</th>
                      <th className="border-2 border-indigo-300 p-3 text-left font-semibold">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border-2 border-indigo-200 p-3">Area</td>
                      <td className="border-2 border-indigo-200 p-3 font-semibold">50 × 6 = 300 sq ft</td>
                    </tr>
                    <tr className="bg-indigo-50">
                      <td className="border-2 border-indigo-200 p-3">Volume</td>
                      <td className="border-2 border-indigo-200 p-3 font-semibold">300 × 1 ft = 300 cubic feet</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border-2 border-indigo-200 p-3">Cubic yards</td>
                      <td className="border-2 border-indigo-200 p-3 font-semibold">300 ÷ 27 = 11.11 yd³</td>
                    </tr>
                    <tr className="bg-indigo-50">
                      <td className="border-2 border-indigo-200 p-3">Tons at 2,410 lb/yd³</td>
                      <td className="border-2 border-indigo-200 p-3 font-semibold">11.11 × 2,410 ÷ 2,000 = 13.4 tons</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border-2 border-green-300 p-3 font-bold">With 10% buffer</td>
                      <td className="border-2 border-green-300 p-3 font-bold text-green-600">14.7 tons</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border-2 border-blue-300 p-3 font-bold">Estimated cost at $55/ton</td>
                      <td className="border-2 border-blue-300 p-3 font-bold text-blue-600">~$810</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-700 mt-4">
                A 50 × 3 foot slope at 12 inches deep requires approximately 5.56 cubic yards of rip rap, weighing about 8.33 tons. Always add 10% extra for settling and waste, so plan for about 6.1 cubic yards or 9.2 tons.
              </p>
            </div>
          </div>
        </section>

        {/* Density Section with Table */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Layers className="w-8 h-8 text-purple-600" />
            Rip Rap Density — What Number Should You Use?
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Density is the most misunderstood variable in rip rap calculations. Most suppliers quote density in pounds per cubic yard (lb/yd³). Different rock types carry different densities:
            </p>
            <p className="text-gray-700 leading-relaxed">
              The density of standard rip rap (6–12 inch) is 2,410 lb/yd³, which equals 1.21 tons per cubic yard or 0.8 cubic yards per ton.
            </p>

            <div className="overflow-x-auto mt-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-purple-100">
                    <th className="border-2 border-purple-300 p-3 text-left font-semibold">Stone Type</th>
                    <th className="border-2 border-purple-300 p-3 text-left font-semibold">Density (lb/yd³)</th>
                    <th className="border-2 border-purple-300 p-3 text-left font-semibold">Tons per Cubic Yard</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border-2 border-purple-200 p-3">Granite</td>
                    <td className="border-2 border-purple-200 p-3 font-semibold">2,700</td>
                    <td className="border-2 border-purple-200 p-3 font-semibold">1.35</td>
                  </tr>
                  <tr className="bg-purple-50">
                    <td className="border-2 border-purple-200 p-3">Trap Rock</td>
                    <td className="border-2 border-purple-200 p-3 font-semibold">2,600</td>
                    <td className="border-2 border-purple-200 p-3 font-semibold">1.3</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-purple-200 p-3">Standard / Limestone</td>
                    <td className="border-2 border-purple-200 p-3 font-semibold">2,410</td>
                    <td className="border-2 border-purple-200 p-3 font-semibold">1.21</td>
                  </tr>
                  <tr className="bg-purple-50">
                    <td className="border-2 border-purple-200 p-3">Recycled Concrete</td>
                    <td className="border-2 border-purple-200 p-3 font-semibold">2,200</td>
                    <td className="border-2 border-purple-200 p-3 font-semibold">1.1</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-700 leading-relaxed mt-4">
              Always ask your supplier for their specific material density. The rip rap density calculator built into the tool above lets you select your stone type and applies the correct conversion automatically.
            </p>
          </div>
        </section>

        {/* Stone Size Classes Table */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <FileText className="w-8 h-8 text-orange-600" />
            Rip Rap Stone Size Classes — Which Class Do You Need?
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Selecting the correct stone size is as important as calculating the correct volume. Standard rip rap size is 12–18 inches for most erosion control applications. For high-energy areas with wave action or fast-moving water, use larger rip rap (18–24 inches). Rock size should be 2–3 times the expected flow velocity or wave height.
            </p>

            <div className="overflow-x-auto mt-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-orange-100">
                    <th className="border-2 border-orange-300 p-3 text-left font-semibold">Size Class</th>
                    <th className="border-2 border-orange-300 p-3 text-left font-semibold">Stone Diameter</th>
                    <th className="border-2 border-orange-300 p-3 text-left font-semibold">Typical Application</th>
                    <th className="border-2 border-orange-300 p-3 text-left font-semibold">Layer Depth</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border-2 border-orange-200 p-3">Small</td>
                    <td className="border-2 border-orange-200 p-3 font-semibold">3–6 inches</td>
                    <td className="border-2 border-orange-200 p-3">Drainage swales, gentle slopes</td>
                    <td className="border-2 border-orange-200 p-3 font-semibold">8–12 inches</td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td className="border-2 border-orange-200 p-3">Medium</td>
                    <td className="border-2 border-orange-200 p-3 font-semibold">6–12 inches</td>
                    <td className="border-2 border-orange-200 p-3">Riverbanks, pond edges, ditches</td>
                    <td className="border-2 border-orange-200 p-3 font-semibold">12–18 inches</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-orange-200 p-3">Class I / Large</td>
                    <td className="border-2 border-orange-200 p-3 font-semibold">12–18 inches</td>
                    <td className="border-2 border-orange-200 p-3">Shorelines, stream banks</td>
                    <td className="border-2 border-orange-200 p-3 font-semibold">18–24 inches</td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td className="border-2 border-orange-200 p-3">Class II / XL</td>
                    <td className="border-2 border-orange-200 p-3 font-semibold">18–24 inches</td>
                    <td className="border-2 border-orange-200 p-3">High-energy coastal, spillways</td>
                    <td className="border-2 border-orange-200 p-3 font-semibold">24–36 inches</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-700 leading-relaxed mt-4">
              Engineers often specify a well-graded mixture rather than uniform stone size. The standard principle is that your largest stone should be no more than 1.5 times the D50 size, where D50 is the median stone size (50% of stones are larger, 50% are smaller). This creates a denser, more armoured surface where smaller stones fill the voids between larger ones.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The thickness of the rip rap layer is typically determined by stone size. For stones with a maximum diameter of 12 inches, the layer should be 18–36 inches thick. More severe conditions require thicker layers. The layer should also be thick enough to accommodate at least two stones stacked on top of each other to ensure proper interlocking and stability.
            </p>
          </div>
        </section>

        {/* How to Use Calculator */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Calculator className="w-8 h-8 text-teal-600" />
            How to Use This Rip Rap Calculator
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              The free rip rap calculator at the top of this page handles rectangular areas, sloped banks, and circular ponds. Here is exactly how each input works:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-teal-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold">Project shape</span> — Select the shape that best matches your site. Rectangular covers channels, ditches, and linear shorelines. Slope covers angled embankments where you measure along the face. Circle covers pond perimeters and circular outfall areas.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold">Dimensions</span> — Enter your measured length and width in feet. Use a tape measure or laser distance tool. For slopes, measure along the surface, not horizontally.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold">Stone size class</span> — Choosing a class automatically sets the recommended minimum layer depth. You can override this with a custom depth if your engineer has specified a different thickness.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold">Layer depth</span> — Standard rip rap depth is 12–18 inches for most applications. For high-velocity areas or heavy wave action, use 18–24 inches deep. Deeper rip rap provides better erosion protection but requires more material.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold">Stone type</span> — This selects the correct density for tonnage conversion. Use granite for high-energy or coastal environments; limestone for most standard projects.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-pink-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold">Price per ton</span> — Enter your local supplier's quoted price per ton to get an instant project cost estimate. A typical residential shoreline project requires 10–20 tons of rip rap, making material costs alone range from $400 to $2,000 before delivery and installation.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold">Waste buffer</span> — Always include a buffer. Use 10% for flat, accessible sites. Increase to 15–20% for steep slopes, irregular shapes, or remote locations.
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Coverage Per Ton Table */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-green-600" />
            Rip Rap Coverage Per Ton — Understanding Square Footage
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-6">
            <p className="text-gray-700 leading-relaxed">
              A common question from homeowners and contractors is: how many square feet does one ton of rip rap cover? The answer depends entirely on your layer depth.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Working from a density of 2,410 lb/yd³ (1.21 tons/yd³), one ton equals approximately 0.83 cubic yards or 22.4 cubic feet of material.
            </p>

            <div className="overflow-x-auto mt-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-green-100">
                    <th className="border-2 border-green-300 p-3 text-left font-semibold">Layer Depth</th>
                    <th className="border-2 border-green-300 p-3 text-left font-semibold">Coverage per Ton (sq ft)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border-2 border-green-200 p-3">6 inches</td>
                    <td className="border-2 border-green-200 p-3 font-semibold">~44 sq ft</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border-2 border-green-200 p-3">12 inches</td>
                    <td className="border-2 border-green-200 p-3 font-semibold">~22 sq ft</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-green-200 p-3">18 inches</td>
                    <td className="border-2 border-green-200 p-3 font-semibold">~15 sq ft</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="border-2 border-green-200 p-3">24 inches</td>
                    <td className="border-2 border-green-200 p-3 font-semibold">~11 sq ft</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-700 leading-relaxed mt-4">
              Use these rip rap coverage per ton figures as a quick sanity check after running the full calculator. If your result seems far off these benchmarks, re-check your depth input it is the most common source of errors in rip rap calculations.
            </p>
          </div>
        </section>

        {/* Cost Calculator Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-green-600" />
            Rip Rap Cost Calculator — What Will Your Project Cost?
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Material cost is only part of the picture. A complete rip rap cost calculation includes four components:
            </p>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-5 rounded-r-xl">
                <h3 className="font-semibold text-gray-900 mb-2">1. Material Cost (Stone)</h3>
                <p className="text-gray-700">
                  Planning an erosion control project? You are looking at an average of $30 to $100 per ton for the material alone. Granite typically runs $50–$100 per ton and limestone ranges from $35–$60 per ton.
                </p>
                <p className="text-gray-700 mt-2">
                  Class I rip rap typically costs $30 to $60 per ton, with pricing influenced by material type, geographic location, and order quantity. Premium granite commands higher prices than limestone or recycled concrete alternatives.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-5 rounded-r-xl">
                <h3 className="font-semibold text-gray-900 mb-2">2. Delivery Cost</h3>
                <p className="text-gray-700">
                  Transportation fees can add $20 to $100 or more per ton depending on the mileage. This is why local rip rap cost per ton can vary so much from one region to another. Always request a delivered price, not just a yard price, when getting quotes.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-5 rounded-r-xl">
                <h3 className="font-semibold text-gray-900 mb-2">3. Installation Cost</h3>
                <p className="text-gray-700">
                  Installation costs typically add $20–$40 per ton, depending on project complexity and accessibility. DIY installation is possible for small, accessible projects. Larger or high-energy installations require heavy equipment and experienced contractors.
                </p>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-500 p-5 rounded-r-xl">
                <h3 className="font-semibold text-gray-900 mb-2">4. Geotextile Filter Fabric</h3>
                <p className="text-gray-700">
                  In most applications, a geotextile filter fabric should be installed beneath rip rap. The fabric prevents soil erosion through the gaps between stones while allowing water to pass through. Without filter fabric, fine soil particles can be washed away through the rip rap, eventually leading to undermining and failure of the protection. Geotextile fabric typically costs $1 to $3 per square foot.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-6 mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Total project cost estimate at a glance:</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-indigo-100">
                      <th className="border-2 border-indigo-300 p-3 text-left font-semibold">Project Size</th>
                      <th className="border-2 border-indigo-300 p-3 text-left font-semibold">Tons Required</th>
                      <th className="border-2 border-indigo-300 p-3 text-left font-semibold">Material Only</th>
                      <th className="border-2 border-indigo-300 p-3 text-left font-semibold">Delivered + Installed</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border-2 border-indigo-200 p-3">Small residential (50 linear ft)</td>
                      <td className="border-2 border-indigo-200 p-3 font-semibold">10–15 tons</td>
                      <td className="border-2 border-indigo-200 p-3 font-semibold">$500–$900</td>
                      <td className="border-2 border-indigo-200 p-3 font-semibold text-green-600">$1,200–$2,500</td>
                    </tr>
                    <tr className="bg-indigo-50">
                      <td className="border-2 border-indigo-200 p-3">Medium (100 linear ft)</td>
                      <td className="border-2 border-indigo-200 p-3 font-semibold">20–35 tons</td>
                      <td className="border-2 border-indigo-200 p-3 font-semibold">$1,000–$2,100</td>
                      <td className="border-2 border-indigo-200 p-3 font-semibold text-green-600">$2,500–$6,000</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border-2 border-indigo-200 p-3">Large (200+ linear ft)</td>
                      <td className="border-2 border-indigo-200 p-3 font-semibold">50–100 tons</td>
                      <td className="border-2 border-indigo-200 p-3 font-semibold">$2,500–$6,000</td>
                      <td className="border-2 border-indigo-200 p-3 font-semibold text-green-600">$6,000–$18,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Design Principles Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-600" />
            Rip Rap Design Principles — What Engineers Specify
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Understanding how civil engineers design rip rap systems helps you make better material choices before you ever pick up a calculator.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The standard rip rap erosion control design requires: sizing your stone using the median stone diameter (D50) based on flow velocity and shear stress, specifying a well-graded gradation where the largest stone is no more than 1.5 times the D50, installing a filter layer of geotextile fabric or granular bedding beneath the stone to prevent soil piping, setting layer thickness at a minimum of 350 mm (approximately 14 inches) or 1.5 times the D50, whichever is greater, and protecting the toe by keying the riprap into the bank bottom to prevent undermining.
            </p>
            <div className="bg-amber-100 border-l-4 border-amber-600 p-4 rounded-lg mt-4">
              <p className="text-gray-800">
                <strong className="flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> Critical Rule:</strong> Rip rap revetments should not be used on slopes steeper than 2:1 (two horizontal to one vertical). If your slope is steeper, consult a licensed civil or geotechnical engineer before proceeding.
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mt-4">
              The shape of individual stones also matters significantly. Angular quarry stones have sharp, irregular edges that create interlocking friction they lock into one another like a jigsaw puzzle, creating a unified mass that resists movement. Rounded stones, by contrast, act like marbles. When wave energy hits them, they want to roll and slide.
            </p>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-purple-600" />
            Rip Rap vs Alternative Erosion Control Materials
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-purple-100">
                    <th className="border-2 border-purple-300 p-3 text-left font-semibold">Solution</th>
                    <th className="border-2 border-purple-300 p-3 text-left font-semibold">Best For</th>
                    <th className="border-2 border-purple-300 p-3 text-left font-semibold">Lifespan</th>
                    <th className="border-2 border-purple-300 p-3 text-left font-semibold">Cost Level</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border-2 border-purple-200 p-3 font-semibold">Rip Rap</td>
                    <td className="border-2 border-purple-200 p-3">High-energy water, permanent erosion control</td>
                    <td className="border-2 border-purple-200 p-3">20–50+ years</td>
                    <td className="border-2 border-purple-200 p-3">Medium–High</td>
                  </tr>
                  <tr className="bg-purple-50">
                    <td className="border-2 border-purple-200 p-3 font-semibold">Erosion Control Blankets</td>
                    <td className="border-2 border-purple-200 p-3">Temporary slope seeding</td>
                    <td className="border-2 border-purple-200 p-3">1–5 years</td>
                    <td className="border-2 border-purple-200 p-3">Low</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-purple-200 p-3 font-semibold">Gabion Baskets</td>
                    <td className="border-2 border-purple-200 p-3">Retaining walls, channel lining</td>
                    <td className="border-2 border-purple-200 p-3">20–30 years</td>
                    <td className="border-2 border-purple-200 p-3">Medium</td>
                  </tr>
                  <tr className="bg-purple-50">
                    <td className="border-2 border-purple-200 p-3 font-semibold">Vegetation / Live Stakes</td>
                    <td className="border-2 border-purple-200 p-3">Low-energy, gentle slopes</td>
                    <td className="border-2 border-purple-200 p-3">Permanent</td>
                    <td className="border-2 border-purple-200 p-3">Low</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-purple-200 p-3 font-semibold">Concrete Revetment</td>
                    <td className="border-2 border-purple-200 p-3">Channels, spillways</td>
                    <td className="border-2 border-purple-200 p-3">40+ years</td>
                    <td className="border-2 border-purple-200 p-3">High</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 leading-relaxed mt-4">
              Rip rap offers the best combination of longevity and flexibility for most waterfront and erosion control applications. While initial costs may exceed smaller aggregate options, the reduced need for replacement or repair often results in lower lifecycle costs for permanent installations.
            </p>
          </div>
        </section>

        {/* FAQ Section - COMPLETE with all 9 questions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Info className="w-8 h-8 text-blue-600" />
            FAQs
          </h2>
          <Accordion type="single" collapsible className="bg-white rounded-2xl border-2 border-gray-200">
            <AccordionItem value="item-1" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                How do I calculate rip rap in tons?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                Multiply your area (length × width in feet) by your depth in feet to get cubic feet. Divide by 27 for cubic yards. Multiply by your stone density ÷ 2,000 to convert to tons. A simpler approximation: multiply the volume in cubic yards by 1.5 to determine the number of tons of rip rap you need. Always add a 10% buffer for waste and settling.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                How many cubic yards of rip rap do I need?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                Calculate your volume in cubic feet (length × width × depth), then divide by 27. For a 50 ft × 6 ft area at 12 inches deep, you need 300 cubic feet ÷ 27 = 11.1 cubic yards. Add 10% for a final order of approximately 12.2 cubic yards.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                How many tons per linear foot of rip rap do I need?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                Most residential erosion control projects require 1.5–2 tons of rip rap per linear foot of shoreline protection, depending on the desired width and depth of coverage. The calculator above shows your tons-per-linear-foot figure automatically based on your project dimensions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                What is the density of rip rap for calculations?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                The standard density of rip rap (6–12 inch stone) is 2,410 lb/yd³ or 1.21 tons per cubic yard. Granite runs slightly higher at 2,700 lb/yd³. Recycled concrete is lower at approximately 2,200 lb/yd³. Always confirm with your supplier.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                How deep should rip rap be installed?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                Standard rip rap depth is 12–18 inches for most applications. For high-velocity areas or heavy wave action, use 18–24 inches deep. The minimum rule is that the layer must be deep enough to accommodate at least two stones stacked on top of each other.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                Do I need filter fabric under rip rap?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                Yes, in virtually all applications. Rip rap is installed in layers 12–18 inches thick over geotextile fabric. The fabric separates soil from stone, preventing the rock from punching into soft subgrades and stopping fines from migrating upward. Skipping the filter layer is one of the most common causes of rip rap failure.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                What is the rip rap coverage per ton in square feet?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                At 12 inches depth, one ton of standard rip rap covers approximately 22 square feet. At 6 inches depth it covers roughly 44 square feet, and at 18 inches depth approximately 15 square feet. Coverage decreases as layer depth increases.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                How much does rip rap cost per ton in 2025–2026?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                You are looking at an average of $30 to $100 per ton for the material alone, with granite typically running $50–$100 per ton and limestone ranging from $35–$60 per ton. When you factor in delivery and installation, your total project cost can easily reach $80–$300 per ton depending on your location and project requirements.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                What slope is too steep for rip rap?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                Rip rap revetments should not be used on slopes steeper than 2:1 (two horizontal to one vertical). Steeper slopes require engineered retaining walls or mechanically stabilised earth systems instead.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
        
      </div>
    </div>
  )
}

