"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import GarageConversionCalculator from "@/components/garage-conversion-calculator"
import { Calculator, Info, BookOpen, Home, HelpCircle, TrendingUp } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function GarageConversionCostCalculatorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Garage Conversion Cost Calculator
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            A garage conversion in the UK typically costs between £6,000 and £30,000, depending on the size, type of conversion, and finish quality. The average cost for a standard single garage conversion sits around £10,000–£15,000. Use the breakdown below to estimate your specific project cost.
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="mb-12">
          <Card className="border-2 border-blue-200 shadow-xl">
            <CardHeader className="py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                Garage Conversion Cost Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <GarageConversionCalculator />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* What Is Section */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              What Is a Garage Conversion Cost Calculator?
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                A garage conversion cost calculator helps homeowners estimate how much they will spend turning an unused garage into a liveable space whether that is a bedroom, home office, gym, annexe, or kitchen extension.
              </p>
              <p>
                Rather than guessing, you can use cost-per-square-metre figures, regional pricing data, and project-specific variables to get a realistic budget before speaking to a builder.
              </p>
              <p>
                This guide works as your complete calculator and cost reference. It breaks down every cost factor so you can build your own accurate estimate from scratch.
              </p>
            </div>
          </div>

          {/* Average Cost Table */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Average Cost of Garage Conversion in the UK (2026)</h2>
            <p className="text-gray-700 mb-6">
              Current market data from 2026 shows clear price bands that help you budget with confidence:
            </p>

            {/* Cost Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border-2 border-gray-300 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="border border-gray-300 p-3 text-left">Garage Type</th>
                    <th className="border border-gray-300 p-3 text-left">Size (m²)</th>
                    <th className="border border-gray-300 p-3 text-left">Average Cost</th>
                    <th className="border border-gray-300 p-3 text-left">Cost Per m²</th>
                    <th className="border border-gray-300 p-3 text-left">Cost Per Sq Ft (approx.)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3 font-semibold">Single Integral</td>
                    <td className="border border-gray-300 p-3">15–16</td>
                    <td className="border border-gray-300 p-3">£10,000–£15,000</td>
                    <td className="border border-gray-300 p-3">£625–£950</td>
                    <td className="border border-gray-300 p-3">£58–£88</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-gray-300 p-3 font-semibold">Single Attached</td>
                    <td className="border border-gray-300 p-3">15–16</td>
                    <td className="border border-gray-300 p-3">£12,000–£18,000</td>
                    <td className="border border-gray-300 p-3">£800–£1,125</td>
                    <td className="border border-gray-300 p-3">£74–£105</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3 font-semibold">Single Detached</td>
                    <td className="border border-gray-300 p-3">15–16</td>
                    <td className="border border-gray-300 p-3">£14,000–£20,000</td>
                    <td className="border border-gray-300 p-3">£875–£1,250</td>
                    <td className="border border-gray-300 p-3">£81–£116</td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="border border-gray-300 p-3 font-semibold">Double Integral</td>
                    <td className="border border-gray-300 p-3">25–30</td>
                    <td className="border border-gray-300 p-3">£16,000–£25,000</td>
                    <td className="border border-gray-300 p-3">£650–£950</td>
                    <td className="border border-gray-300 p-3">£60–£88</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3 font-semibold">Double Detached</td>
                    <td className="border border-gray-300 p-3">25–30</td>
                    <td className="border border-gray-300 p-3">£20,000–£32,000</td>
                    <td className="border border-gray-300 p-3">£800–£1,200</td>
                    <td className="border border-gray-300 p-3">£74–£111</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-700 mt-6">
              These figures include labour, materials, insulation, electrics, heating, flooring, and basic decoration. Premium finishes with underfloor heating, bifold doors, or en-suite bathrooms push the upper end higher. In our experience helping UK homeowners, most projects land comfortably in the middle range when you plan carefully.
            </p>
          </div>

          {/* Cost Per M² */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Garage Conversion Cost Per M² in the UK</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>If you want a straightforward cost-per-square-metre estimate, here is what you should expect in 2025:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Basic conversion:</strong> £400–£600 per m²</li>
                <li><strong>Mid-range conversion:</strong> £600–£900 per m²</li>
                <li><strong>High-specification conversion:</strong> £900–£1,500 per m²</li>
              </ul>
              <p className="mt-4">So if your garage is 18 m² and you want a mid-range finish, your estimated cost would be:</p>
              <div className="bg-blue-50 p-4 rounded-lg my-4 font-mono text-lg border-l-4 border-blue-600">
                18 × £700 = £12,600 (approximately)
              </div>
              <p>
                This garage conversion cost per m² calculator method gives you a reliable ballpark before you get quotes from local tradespeople.
              </p>
            </div>
          </div>

          {/* Step by Step Guide */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Calculate Your Garage Conversion Cost: Step by Step</h2>
            <p className="text-gray-700 mb-6">Follow these steps to build your own garage conversion cost estimate:</p>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border-l-4 border-green-600">
                <h3 className="font-bold text-gray-900 mb-2">Step 1 — Measure Your Garage Floor Area</h3>
                <p className="text-gray-700">Measure the internal length and width in metres and multiply them together. A typical single UK garage is around 4.8 m × 2.4 m = 11.5 m² to 5.5 m × 3.0 m = 16.5 m².</p>
              </div>

              <div className="bg-white p-4 rounded-lg border-l-4 border-blue-600">
                <h3 className="font-bold text-gray-900 mb-2">Step 2 — Choose Your Conversion Type</h3>
                <p className="text-gray-700">Decide what the space will become. A simple home office costs far less than a bathroom or annexe because plumbing, electrical upgrades, and compliance requirements add significant cost.</p>
              </div>

              <div className="bg-white p-4 rounded-lg border-l-4 border-purple-600">
                <h3 className="font-bold text-gray-900 mb-2">Step 3 — Apply the Cost Per M² Rate</h3>
                <p className="text-gray-700">Multiply your floor area by the appropriate rate for your specification level (basic, mid-range, or high-spec).</p>
              </div>

              <div className="bg-white p-4 rounded-lg border-l-4 border-orange-600">
                <h3 className="font-bold text-gray-900 mb-2">Step 4 — Add Fixed Costs</h3>
                <p className="text-gray-700 mb-2">Some costs remain roughly fixed regardless of size. These include:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
                  <li>Planning permission application (if required): £206 in England</li>
                  <li>Building regulations application (full plans): £200–£400</li>
                  <li>Structural engineer assessment: £300–£600</li>
                  <li>Party wall agreement (if applicable): £700–£1,000 per neighbour</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border-l-4 border-pink-600">
                <h3 className="font-bold text-gray-900 mb-2">Step 5 — Add Room-Specific Costs</h3>
                <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
                  <li>If converting to a bathroom: add £3,000–£7,000 for plumbing and sanitaryware</li>
                  <li>If adding a kitchen: add £5,000–£15,000 depending on units and appliances</li>
                  <li>If installing underfloor heating: add £500–£1,500</li>
                  <li>If adding a new window or door: add £800–£2,500 each</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border-l-4 border-indigo-600">
                <h3 className="font-bold text-gray-900 mb-2">Step 6 — Apply a Regional Multiplier</h3>
                <p className="text-gray-700">Labour costs vary significantly across the UK. Prices in London and the South East can be 20–40% higher than the Midlands or North of England. If you are based in London, multiply your estimate by 1.25–1.40.</p>
              </div>

              <div className="bg-white p-4 rounded-lg border-l-4 border-red-600">
                <h3 className="font-bold text-gray-900 mb-2">Step 7 — Add a Contingency</h3>
                <p className="text-gray-700">Always add 10–15% of your total budget as a contingency for unexpected structural issues, damp problems, or design changes.</p>
              </div>
            </div>
          </div>

          {/* Detailed Cost Breakdown */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Detailed Cost Breakdown: What Are You Actually Paying For?</h2>
            <p className="text-gray-700 mb-6">
              Understanding where your money goes helps you make smarter decisions and spot overpriced quotes. Here is an honest, experience-based breakdown:
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Insulation</h3>
                <p className="text-gray-700 mb-2">This is non-negotiable for any liveable space. Garages are not built to residential thermal standards, so you will need insulation in the floor, walls, and ceiling/roof.</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
                  <li>Floor insulation: £800–£1,500</li>
                  <li>Wall insulation (internal dry-lining): £1,000–£2,000</li>
                  <li>Roof/ceiling insulation: £500–£1,200</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Flooring</h3>
                <p className="text-gray-700 mb-2">The concrete garage floor usually needs levelling and a damp-proof membrane before any finish goes down.</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
                  <li>Screed or floor levelling: £300–£800</li>
                  <li>Vinyl or laminate flooring: £500–£1,500</li>
                  <li>Tiled flooring: £800–£2,500</li>
                  <li>Engineered wood: £1,000–£3,000</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Plastering</h3>
                <p className="text-gray-700">Once walls are dry-lined, they need skimming for a smooth finish.</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
                  <li>Full room plastering: £600–£1,200</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Electrics</h3>
                <p className="text-gray-700 mb-2">A new consumer unit spur or full rewire of the space, plus sockets, lighting, and potentially an EV charger if converting a garage attached to the home.</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
                  <li>Basic electrical work: £800–£1,500</li>
                  <li>Full electrical upgrade (annexe): £2,000–£4,000</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Windows and Doors</h3>
                <p className="text-gray-700 mb-2">Most garages have a large metal or wooden door that needs replacing with a window and wall infill, or a glazed partition.</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
                  <li>Brick infill with window: £1,200–£2,500</li>
                  <li>New UPVC door: £600–£1,200</li>
                  <li>Bi-fold or aluminium glazed door: £2,000–£5,000</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Heating</h3>
                <p className="text-gray-700 mb-2">You need to extend the home's central heating or install a standalone solution.</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
                  <li>Extending central heating (1–2 radiators): £800–£1,500</li>
                  <li>Electric underfloor heating: £400–£900</li>
                  <li>Air source heat pump unit (premium option): £5,000–£10,000</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Garage Door Removal and Wall Build</h3>
                <p className="text-gray-700 mb-2">If you are replacing the garage door opening with a solid wall or glazed section, this is one of the most visible and structural elements.</p>
                <ul className="list-disc list-inside space-y-1 ml-4 text-gray-700">
                  <li>Typical cost: £1,500–£3,500</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Factors That Affect Cost */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Factors That Affect Your Garage Conversion Cost</h2>
            <p className="text-gray-700 mb-6">
              Several variables push your final cost up or down. Being aware of them helps you control your budget.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">1. Type of Garage (Integral vs Detached)</h3>
                <p className="text-gray-700">
                  An integral garage shares at least one wall with the house, which makes connecting to the home's heating, electrics, and plumbing much easier and cheaper. A detached garage requires separate utility connections and often full planning permission, which adds cost.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">2. Current Condition of the Garage</h3>
                <p className="text-gray-700">
                  A well-maintained, dry garage with a solid roof and level floor costs less to convert. A garage with damp penetration, roof damage, or a cracked floor requires remedial work before the conversion can begin. Always have a builder inspect the structure before accepting any quote.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">3. Conversion Purpose</h3>
                <p className="text-gray-700">
                  Converting to a bedroom or office is relatively straightforward. Converting to a bathroom, kitchen, or self-contained annexe involves significantly more trades  plumbers, gas engineers, electricians  all of which push the cost up.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">4. Specification and Finish Level</h3>
                <p className="text-gray-700">
                  There is a huge difference between a basic conversion with standard fittings and a high-spec conversion with underfloor heating, skylights, bespoke storage, and premium surfaces. Be honest with yourself about what level of finish you need.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">5. Location in the UK</h3>
                <p className="text-gray-700">
                  Labour rates vary enormously. A mid-range single garage conversion that costs £12,000 in Manchester might cost £16,000–£18,000 in London. Always get at least three local quotes.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">6. Party Walls and Structural Changes</h3>
                <p className="text-gray-700">
                  If your garage shares a wall with a neighbour, you may need a party wall agreement before work starts. This adds legal fees of £700–£2,000 but is a legal requirement under the Party Wall Act 1996.
                </p>
              </div>
            </div>
          </div>

          {/* Planning Permission */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Do You Need Planning Permission for a Garage Conversion?</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                In most cases, converting an integral garage into a living space falls under permitted development rights in England, meaning you do not need full planning permission. However, you will almost always need building regulations approval, which is a separate process.
              </p>
              <p><strong>You will likely need planning permission if:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your property is in a conservation area or is a listed building</li>
                <li>Your garage is detached from the house</li>
                <li>Your local authority has removed permitted development rights (Article 4 direction)</li>
                <li>The conversion would create a separate dwelling or annexe</li>
              </ul>
              <p>
                Always check with your local planning authority before work starts. Getting this wrong can cost you significantly more in retrospective applications or enforcement action.
              </p>
              <p>
                Building regulations approval is required for virtually all garage conversions. It ensures the work meets standards for insulation, structural integrity, fire safety, ventilation, and electrical safety. The fee for a building regulations application ranges from £200 to £500 depending on the local authority.
              </p>
            </div>
          </div>

          {/* ADU Conversion */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How Much Does It Cost to Convert a Garage Into an ADU?</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                An ADU accessory dwelling unit is a fully self-contained living space with its own kitchen, bathroom, and entrance. In the UK this is often called an annexe or granny flat.
              </p>
              <p>
                Converting a garage into an ADU is one of the more complex and expensive garage conversion types. You should budget:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Single garage ADU:</strong> £25,000–£45,000</li>
                <li><strong>Double garage ADU:</strong> £40,000–£80,000</li>
              </ul>
              <p>
                The higher cost reflects the need for a full kitchen installation, bathroom with all plumbing, separate electrical meter (sometimes), compliance with habitation standards, planning permission (almost always required), and separate access.
              </p>
              <p>
                If you plan to rent the ADU out as a separate tenancy, you will also need to ensure the property meets landlord licensing requirements and fire safety regulations in your local authority area.
              </p>
            </div>
          </div>

          {/* Regional Price Guide */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Garage Conversion Cost UK: Regional Price Guide</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                <p className="font-semibold text-gray-900">London and South East:</p>
                <p className="text-gray-700">£900–£1,500 per m²</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                <p className="font-semibold text-gray-900">East of England:</p>
                <p className="text-gray-700">£700–£1,100 per m²</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                <p className="font-semibold text-gray-900">South West:</p>
                <p className="text-gray-700">£650–£1,000 per m²</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-600">
                <p className="font-semibold text-gray-900">East Midlands:</p>
                <p className="text-gray-700">£600–£950 per m²</p>
              </div>
              <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-600">
                <p className="font-semibold text-gray-900">West Midlands:</p>
                <p className="text-gray-700">£600–£950 per m²</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-600">
                <p className="font-semibold text-gray-900">Yorkshire and Humber:</p>
                <p className="text-gray-700">£550–£900 per m²</p>
              </div>
              <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-600">
                <p className="font-semibold text-gray-900">North West:</p>
                <p className="text-gray-700">£550–£900 per m²</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-600">
                <p className="font-semibold text-gray-900">North East:</p>
                <p className="text-gray-700">£500–£850 per m²</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-600">
                <p className="font-semibold text-gray-900">Scotland:</p>
                <p className="text-gray-700">£550–£900 per m²</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-600">
                <p className="font-semibold text-gray-900">Wales:</p>
                <p className="text-gray-700">£500–£850 per m²</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg border-l-4 border-blue-800">
                <p className="font-semibold text-gray-900">Northern Ireland:</p>
                <p className="text-gray-700">£450–£800 per m²</p>
              </div>
            </div>
            <p className="text-gray-700 mt-6">
              These figures are based on 2025 market data and reflect mid-range specification conversions including materials and labour.
            </p>
          </div>

          {/* Is It Worth It */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-600" />
              Is a Garage Conversion Worth the Money?
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                From an investment standpoint, a well-executed garage conversion typically adds 10–20% to a property's value in the UK. On a £350,000 home, that could mean £35,000–£70,000 in added value.
              </p>
              <p>
                Even at a mid-range project cost of £15,000, the return on investment is strong — especially compared to building a new extension, which typically costs £30,000–£60,000 for a similar floor area.
              </p>
              <p>
                Beyond financial value, a garage conversion gives you usable living space without reducing your garden size, disrupting neighbours significantly, or waiting through a lengthy planning process in most cases.
              </p>
              <p>
                The best value conversions tend to be bedroom additions in family homes, home offices in suburban properties, and annexes in areas with high rental demand.
              </p>
            </div>
          </div>

          {/* Getting Quotes */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Get Accurate Garage Conversion Quotes</h2>
            <p className="text-gray-700 mb-6">
              Getting accurate quotes from tradespeople takes a little preparation. Here is what experienced homeowners recommend:
            </p>
            <ul className="list-disc list-inside space-y-3 ml-4 text-gray-700">
              <li>Get at least three quotes from different contractors. Never accept just one.</li>
              <li>Ask for itemised quotes, not lump sums. You want to see what each element costs separately so you can compare properly.</li>
              <li>Check that the contractor is registered with a relevant body Federation of Master Builders (FMB), TrustMark, or NAPIT for electrical work.</li>
              <li>Ask to see recent examples of completed garage conversions. A contractor with a portfolio of similar jobs is a strong indicator of relevant experience.</li>
              <li>Confirm who handles building regulations approval. Some builders include this in their quote; others leave it to you.</li>
              <li>Do not automatically go with the cheapest quote. If one quote is significantly lower than the others, ask why. Missing scope items or undercutting on insulation and structural work leads to expensive problems later.</li>
            </ul>
          </div>

          {/* FAQ Section */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-blue-600" />
              FAQs
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How much does a basic garage conversion cost in the UK?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  A basic garage conversion with standard insulation, dry-lining, electrics, and flooring typically costs between £6,000 and £10,000 for a single garage of around 15–18 m².
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  What is the average cost per m² for a garage conversion?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  The average garage conversion cost per m² in the UK is between £500 and £900 for a mid-range specification. High-end conversions in London can reach £1,200–£1,500 per m².
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Is a garage conversion cheaper than an extension?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Yes. A garage conversion is generally 50–70% cheaper than a comparable ground floor extension because the structure already exists. You pay for fit-out rather than building from scratch.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Do I need an architect for a garage conversion?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Not always. For straightforward conversions, a builder experienced in garage projects can handle everything. For complex conversions, ADUs, or projects requiring planning permission, hiring an architect or architectural technologist is advisable. Budget £500–£2,000 for architectural drawings if needed.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How long does a garage conversion take?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  A standard single garage conversion takes 2–4 weeks from start to finish. More complex projects involving plumbing, structural changes, or planning permission can take 8–16 weeks in total.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Does a garage conversion add value to my home?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Yes, in most cases. Research consistently shows that converting a garage into usable living space adds between 10% and 20% to a home's market value, depending on location and quality of finish.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Can I convert a garage myself to save money?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Some elements such as decorating and basic flooring are DIY-friendly. However, structural work, electrics, plumbing, and insulation must meet building regulations standards and should be handled by qualified tradespeople. Cutting corners on compliance can cause problems when you come to sell the property.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  What is the cheapest type of garage conversion?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  A simple home office or hobby room conversion is typically the cheapest option because it requires no plumbing, minimal electrical work, and standard insulation. You can achieve a functional result for £6,000–£9,000 in most parts of the UK.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Do I need building regulations for a garage conversion?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Yes. Building regulations approval is required for virtually all garage conversions in the UK. Your builder should submit the necessary applications to your local authority's building control department, or you can use an approved inspector.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  What happens if I convert my garage without building regulations?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  You will receive an enforcement notice from your local authority and may be required to remove or redo the work. More practically, it will cause serious problems when you sell your home because solicitors and mortgage lenders check for building regulations completion certificates as standard.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
