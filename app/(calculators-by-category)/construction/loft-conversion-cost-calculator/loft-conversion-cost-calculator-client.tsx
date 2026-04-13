"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import LoftConversionCostCalculator from "@/components/loft-conversion-cost-calculator"
import { Home, Calculator, Info, BookOpen, CheckCircle, AlertTriangle, TrendingUp, Ruler } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function LoftConversionCostCalculatorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Loft Conversion Cost Calculator
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            The average loft conversion cost in the UK sits between £40,000 and £55,000 for a typical 30 m² project. A basic Velux loft conversion starts from £25,000, while a dormer loft conversion averages £50,000. London and the South East add 20-30% more. Use this loft conversion cost calculator (or the cost of loft conversion UK calculator below) to see your exact figure instantly. Most homeowners recover 20-24% of the investment through increased property value.
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="mb-12">
          <Card className="border-2 border-gray-200 shadow-xl">
            <CardHeader className="py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                Loft Conversion Cost Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <LoftConversionCostCalculator />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="mb-12">
          <div className="space-y-8">
            {/* How to Use */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-blue-600" />
                How to Use Our Loft Conversion Cost Calculator Online
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                You control the numbers. Our loft conversion calculator online works like this:
              </p>
              <ol className="space-y-3 text-gray-700 text-lg ml-6 mb-6">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">1.</span>
                  <span><strong>Choose your conversion type</strong> – Velux (rooflight), dormer, hip-to-gable, mansard or L-shaped dormer.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">2.</span>
                  <span><strong>Enter your loft dimensions</strong> – floor area in m² (or length × width).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">3.</span>
                  <span><strong>Select your UK location</strong> – England (non-London), London/South East, Midlands, North, Scotland or Wales.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">4.</span>
                  <span><strong>Add extras</strong> – en-suite bathroom, high-end finishes, new staircase position.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600">5.</span>
                  <span><strong>Hit Calculate</strong> – you receive a low, mid and high estimate plus a full cost breakdown.</span>
                </li>
              </ol>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Example results from the calculator (30 m² mid-range finish):</h3>
              <ul className="space-y-2 text-gray-700 text-lg ml-6 mb-4">
                <li>• Velux: £27,500 – £35,000</li>
                <li>• Dormer: £45,000 – £60,000</li>
                <li>• Hip-to-gable: £55,000 – £70,000</li>
                <li>• Mansard: £60,000 – £80,000</li>
              </ul>

              <p className="text-gray-700 leading-relaxed text-lg">
                You adjust any variable and watch the price update live. This loft conversion price calculator uses 2026 UK data from Checkatrade, MyJobQuote and real builder quotes, so you plan with confidence.
              </p>
            </div>

            {/* Average Cost Table */}
            <div className="bg-white border-2 border-purple-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <Home className="w-8 h-8" />
                  Average Loft Conversion Cost Calculator 2026 – What Homeowners Actually Pay
                </h2>
              </div>
              <div className="p-8">
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  You gain clarity fast. The average loft conversion cost calculator shows UK-wide figures for 2026:
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-purple-100">
                        <th className="border-2 border-purple-300 p-3 text-left font-bold text-gray-900">Conversion Type</th>
                        <th className="border-2 border-purple-300 p-3 text-left font-bold text-gray-900">Average Cost (30 m²)</th>
                        <th className="border-2 border-purple-300 p-3 text-left font-bold text-gray-900">Cost per m²</th>
                        <th className="border-2 border-purple-300 p-3 text-left font-bold text-gray-900">Build Time</th>
                        <th className="border-2 border-purple-300 p-3 text-left font-bold text-gray-900">Typical Use Case</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white hover:bg-purple-50">
                        <td className="border-2 border-purple-200 p-3 font-semibold">Velux (rooflight)</td>
                        <td className="border-2 border-purple-200 p-3">£27,500 – £35,000</td>
                        <td className="border-2 border-purple-200 p-3">£920 – £1,600</td>
                        <td className="border-2 border-purple-200 p-3">4–6 weeks</td>
                        <td className="border-2 border-purple-200 p-3">Extra bedroom, minimal change</td>
                      </tr>
                      <tr className="bg-purple-50 hover:bg-purple-100">
                        <td className="border-2 border-purple-200 p-3 font-semibold">Dormer</td>
                        <td className="border-2 border-purple-200 p-3">£45,000 – £60,000</td>
                        <td className="border-2 border-purple-200 p-3">£1,500 – £2,000</td>
                        <td className="border-2 border-purple-200 p-3">8–12 weeks</td>
                        <td className="border-2 border-purple-200 p-3">Full-height room + bathroom</td>
                      </tr>
                      <tr className="bg-white hover:bg-purple-50">
                        <td className="border-2 border-purple-200 p-3 font-semibold">Hip-to-gable</td>
                        <td className="border-2 border-purple-200 p-3">£55,000 – £70,000</td>
                        <td className="border-2 border-purple-200 p-3">£1,800 – £2,200</td>
                        <td className="border-2 border-purple-200 p-3">10–14 weeks</td>
                        <td className="border-2 border-purple-200 p-3">Side extension on end-of-terrace</td>
                      </tr>
                      <tr className="bg-purple-50 hover:bg-purple-100">
                        <td className="border-2 border-purple-200 p-3 font-semibold">Mansard</td>
                        <td className="border-2 border-purple-200 p-3">£60,000 – £80,000+</td>
                        <td className="border-2 border-purple-200 p-3">£1,900 – £2,600</td>
                        <td className="border-2 border-purple-200 p-3">10–14 weeks</td>
                        <td className="border-2 border-purple-200 p-3">Maximum space, listed buildings</td>
                      </tr>
                      <tr className="bg-white hover:bg-purple-50">
                        <td className="border-2 border-purple-200 p-3 font-semibold">L-shaped dormer</td>
                        <td className="border-2 border-purple-200 p-3">£55,000 – £75,000</td>
                        <td className="border-2 border-purple-200 p-3">£1,700 – £2,300</td>
                        <td className="border-2 border-purple-200 p-3">10–14 weeks</td>
                        <td className="border-2 border-purple-200 p-3">Large family homes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-gray-700 leading-relaxed text-lg mt-6">
                  Basic loft conversion cost (shell only, no finishes) starts at £15,000–£25,000. You add £10,000–£20,000 for full fit-out including electrics, plumbing and decoration. These numbers reflect real 2026 projects across the UK and help you benchmark quotes.
                </p>
              </div>
            </div>

            {/* Key Factors */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Ruler className="w-8 h-8 text-orange-600" />
                Cost of Loft Conversion UK Calculator – Key Factors That Shape Your Price
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                You avoid nasty surprises. Several variables drive the final figure in our cost of loft conversion UK calculator. Here they are, explained clearly:
              </p>

              <div className="space-y-6">
                <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">1. Loft Size and Head Height</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Larger lofts cost more per project but less per square metre because of economies of scale. You need at least 2.2 m head height at the ridge for a comfortable room. If your loft falls short, you lower the ceiling below or raise the roof – both add £5,000–£12,000.
                  </p>
                </div>

                <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">2. Conversion Type</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Velux keeps costs lowest because you install rooflights without altering the roof structure. Dormer and hip-to-gable add vertical walls and extra volume, so you pay more for scaffolding, roofing and structural steel. Mansard demands a completely new roof slope, pushing prices higher.
                  </p>
                </div>

                <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">3. Location</h3>
                  <p className="text-gray-700 leading-relaxed">
                    London and the South East command 20-30% premiums due to higher labour and material costs. A dormer that costs £50,000 in Manchester may reach £65,000 in London. Northern regions often sit 10-15% below the UK average.
                  </p>
                </div>

                <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">4. Structural Work</h3>
                  <p className="text-gray-700 leading-relaxed">
                    You reinforce floors, install steel beams and sometimes move water tanks or chimneys. Trussed roofs need more engineering than traditional cut roofs. Expect £6,000–£10,000 for structural elements in a standard dormer.
                  </p>
                </div>

                <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">5. Finishes and Extras</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Basic paint and carpet keep costs down. You add £4,000–£8,000 for an en-suite, premium flooring, built-in storage or smart lighting. High-spec kitchens or Juliet balconies push the total into six figures.
                  </p>
                </div>

                <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">6. Access and Staircase</h3>
                  <p className="text-gray-700 leading-relaxed">
                    You create safe access. Straight staircases cost less than spiral or relocated ones. External scaffolding and temporary roofs add £4,000–£7,000.
                  </p>
                </div>

                <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">7. Planning Permission and Building Regulations</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Most loft conversions fall under permitted development – no planning application needed. You always require building regulations approval (£450–£1,500). Party-wall agreements for terraced or semi-detached homes add £700–£2,000 per neighbour. Full planning permission (if required) costs £258 plus architect drawings (£1,500–£4,000).
                  </p>
                </div>

                <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">8. VAT and Contingency</h3>
                  <p className="text-gray-700 leading-relaxed">
                    VAT sits at 20% on most work. You build in 10-15% contingency for unexpected issues such as asbestos or rotten timbers.
                  </p>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed text-lg mt-6">
                Our loft conversion cost calculator automatically factors these in so you receive realistic figures.
              </p>
            </div>

            {/* Dormer Conversion */}
            <div className="bg-white border-2 border-blue-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Dormer Loft Conversion Cost Calculator – Most Popular Choice Explained</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                You choose dormer more than any other type. Our dormer loft conversion cost calculator estimates £45,000–£60,000 for a standard rear dormer on a 30 m² space.
              </p>
              <h3 className="text-xl font-bold text-gray-900 mb-3">What you get:</h3>
              <ul className="space-y-2 text-gray-700 text-lg ml-6 mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>Vertical walls for full head height</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>Flat or pitched roof on the dormer</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>One or two large windows</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>Extra floor space (up to 40 m³ under permitted development)</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                <strong>Pros:</strong> More usable room than Velux, good natural light, proven ROI.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                <strong>Cons:</strong> Longer build time, visible from the rear.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                <strong>Real example:</strong> A Birmingham terraced homeowner converted a 28 m² dormer with en-suite for £56,000 in early 2026. The project added a double bedroom and boosted property value by £85,000.
              </p>
            </div>

            {/* Velux Conversion */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Velux Loft Conversion Cost Calculator – Cheapest and Fastest Option</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                You want speed and value. The Velux loft conversion cost calculator shows £25,000–£35,000 for a typical rooflight project.
              </p>
              <h3 className="text-xl font-bold text-gray-900 mb-3">What you get:</h3>
              <ul className="space-y-2 text-gray-700 text-lg ml-6 mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>Two to four Velux roof windows</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>Insulated walls and ceiling</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>New staircase</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>Electrics and basic finishes</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                <strong>Pros:</strong> Minimal structural change, 4–6 week build, least disruption.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                <strong>Cons:</strong> Sloping ceilings limit furniture placement.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                Homeowners in the Midlands regularly complete Velux conversions for under £30,000 and report excellent results for home offices or guest bedrooms.
              </p>
            </div>

            {/* Basic vs Full Fit-Out */}
            <div className="bg-white border-2 border-indigo-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Loft Conversion Cost Basic vs Full Fit-Out</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                You decide the spec. A loft conversion cost basic (shell only – floor, insulation, staircase, rooflights) runs £15,000–£25,000. Full fit-out adds:
              </p>
              <ul className="space-y-2 text-gray-700 text-lg ml-6 mb-4">
                <li>• Electrics & lighting: £2,000–£3,500</li>
                <li>• Plumbing & heating: £1,500–£4,000</li>
                <li>• Bathroom: £4,000–£8,000</li>
                <li>• Decoration & flooring: £2,000–£4,000</li>
              </ul>
              <p className="text-gray-700 leading-relaxed text-lg">
                You save money by supplying your own bathroom suite or decorating yourself.
              </p>
            </div>

            {/* Step-by-Step Process */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Step-by-Step Process – From Calculator to Completion</h2>
              <ol className="space-y-3 text-gray-700 text-lg ml-6">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-pink-600">1.</span>
                  <span>Use the calculator – get your estimate.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-pink-600">2.</span>
                  <span>Book a free site survey – local specialists measure head height and roof structure.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-pink-600">3.</span>
                  <span>Engage an architect or designer – produce plans and structural calculations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-pink-600">4.</span>
                  <span>Submit building regulations – or permitted development notice.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-pink-600">5.</span>
                  <span>Choose your builder – compare three detailed quotes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-pink-600">6.</span>
                  <span>Sign contract and start – scaffolding goes up, work begins.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-pink-600">7.</span>
                  <span>Monitor progress – weekly updates keep you informed.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-pink-600">8.</span>
                  <span>Final inspection – building control signs off.</span>
                </li>
              </ol>
              <p className="text-gray-700 leading-relaxed text-lg mt-6">
                The entire journey takes 3–6 months from first click to finished room.
              </p>
            </div>

            {/* ROI Section */}
            <div className="bg-white border-2 border-green-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-green-600" />
                How Much Value Does a Loft Conversion Add? Real ROI
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                You invest wisely. Nationwide research shows a loft conversion with a double bedroom and bathroom adds up to 24% to a three-bedroom house. Even a simple Velux project typically returns 60-80% of your outlay on sale. In high-demand areas you often achieve 100% ROI or more.
              </p>
            </div>

            {/* Tips to Reduce Costs */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Tips to Reduce Your Loft Conversion Costs Without Cutting Quality</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                You keep the project affordable:
              </p>
              <div className="space-y-3">
                {[
                  "Stick to permitted development to avoid planning fees.",
                  "Choose Velux if head height allows.",
                  "Source materials yourself for finishes.",
                  "Schedule work outside peak summer months.",
                  "Use local builders to cut travel costs.",
                  "Build a 10% contingency instead of over-specifying.",
                ].map((tip, index) => (
                  <div key={index} className="p-4 bg-white border-2 border-teal-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                      <p className="text-gray-700">{tip}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mt-6">
                Our calculator lets you test "what-if" scenarios instantly.
              </p>
            </div>

            {/* FAQ Section */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">FAQs</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How accurate is the loft conversion cost calculator?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Extremely accurate when you enter real measurements. It draws on 2026 builder data and adjusts for your exact location and spec.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is the cheapest loft conversion?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    A Velux rooflight conversion at £25,000–£35,000.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Do I need planning permission for a loft conversion?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Usually not, provided you stay within permitted development limits. All projects require building regulations approval.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How long does a loft conversion take?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    4–6 weeks for Velux, 8–14 weeks for dormer or more complex types.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Can I live in the house during the work?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Yes. Most families stay put, though you lose access to the loft and may experience some noise for the first few weeks.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Is VAT included in the quotes?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Yes – 20% is added to the final price unless the work qualifies for any zero-rating (rare for standard conversions).
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is the average loft conversion cost per m²?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    £1,200–£2,500 depending on type and region. London reaches £2,500–£4,100 per m² for high-spec projects.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Will a loft conversion increase my council tax?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Usually yes, by one band if you add a bedroom and bathroom. Check with your local authority.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-9">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How do I get the most accurate quote?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Use our calculator first, then request three site surveys from reputable local companies. Compare like-for-like quotes.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-10">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Can I finance a loft conversion?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Yes many homeowners use savings, remortgaging, or government-backed green loans if the project improves energy efficiency.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
