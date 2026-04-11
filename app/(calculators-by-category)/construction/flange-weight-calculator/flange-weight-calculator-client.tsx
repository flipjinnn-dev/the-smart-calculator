"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FlangeWeightCalculator from "@/components/flange-weight-calculator"
import { Weight, Calculator, Info, AlertCircle, BookOpen, TrendingUp, Settings, CheckCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FlangeWeightCalculatorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
            Flange Weight Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Accurate, Fast & Easy Online Tool
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className="mb-12 p-8 bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl shadow-lg">
          <div className="flex items-start gap-4">
            <div className="bg-orange-600 text-white rounded-full p-3 flex-shrink-0">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Quick Answer</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                A flange weight calculator helps you determine the weight of a flange in kilograms (kg) or pounds by using standard formulas based on outer diameter, inner diameter, thickness, and material density. It is widely used in piping, fabrication, and engineering industries to estimate load, cost, and transport requirements.
              </p>
            </div>
          </div>
        </div>

        {/* Main Calculator Card */}
        <div className="mb-12">
          <Card className="border-2 border-gray-200 shadow-xl">
            <CardHeader className="py-6 bg-gradient-to-r from-orange-600 to-red-600 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                Flange Weight Calculator (Online, Formula, Charts & Excel)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <FlangeWeightCalculator />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="mb-12">
          <div className="space-y-8">
            {/* Introduction */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Weight className="w-8 h-8 text-orange-600" />
                Flange Weight Calculator (Online, Formula, Charts & Excel)
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  A flange weight calculator is an essential tool for engineers, fabricators, and procurement professionals. Whether you are working with carbon steel, stainless steel, or mild steel flanges, knowing the exact weight helps in planning, costing, and structural design.
                </p>
                <p className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                  <strong>Real-World Insight:</strong> In real-world industrial projects, I have seen that even a small miscalculation in flange weight can impact transportation cost, crane load capacity, and even project timelines. That's why using a precise and reliable flange weight calculator online is not just helpful—it is critical.
                </p>
              </div>
            </div>

            {/* What Is Section */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What is a Flange Weight Calculator?</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                A flange weight calculator is a digital or manual tool used to calculate the weight of different types of flanges such as:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Blind flange",
                  "Weld neck flange",
                  "Slip-on flange",
                  "Raised face flange",
                  "Ring type flange",
                  "Reducing flange",
                ].map((type, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-white border-2 border-blue-200 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700 font-semibold">{type}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-gray-700 leading-relaxed">
                It calculates weight based on dimensions and material density. The output is usually given in kilograms (kg), making it suitable for global industrial standards.
              </p>
            </div>

            {/* Why Important */}
            <div className="bg-white border-2 border-orange-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">Why Flange Weight Calculation is Important</h2>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: "1. Cost Estimation", desc: "Accurate flange weights help estimate raw material costs and total project budgets." },
                    { title: "2. Load Handling & Safety", desc: "In heavy industries, incorrect weight assumptions can lead to equipment failure or safety hazards." },
                    { title: "3. Transportation Planning", desc: "Knowing flange weights ensures proper vehicle selection and logistics planning." },
                    { title: "4. Structural Engineering Accuracy", desc: "Weight impacts pipe support systems, stress analysis, and overall structural integrity." },
                  ].map((item, index) => (
                    <div key={index} className="p-5 bg-orange-50 border-2 border-orange-200 rounded-xl">
                      <h3 className="text-xl font-bold text-orange-600 mb-2">{item.title}</h3>
                      <p className="text-gray-700">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Formula Section */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Flange Weight Calculator Formula</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                The standard formula used in most flange weight calculators is:
              </p>

              <div className="bg-white border-2 border-purple-300 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Basic Formula</h3>
                <div className="bg-purple-100 border-2 border-purple-400 rounded-lg p-4 font-mono text-lg mb-4">
                  <p className="text-gray-900"><strong>Weight = Volume × Density</strong></p>
                </div>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Where:</strong></p>
                  <p>• Volume is calculated using flange dimensions</p>
                  <p>• Density depends on material type</p>
                </div>
              </div>

              <div className="bg-white border-2 border-purple-300 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">General Flange Weight Formula</h3>
                <div className="bg-purple-100 border-2 border-purple-400 rounded-lg p-4 font-mono text-base mb-4">
                  <p className="text-gray-900"><strong>Weight (kg) = π × (OD² − ID²) / 4 × Thickness × Density</strong></p>
                </div>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Where:</strong></p>
                  <p>• <strong>OD</strong> = Outer Diameter</p>
                  <p>• <strong>ID</strong> = Inner Diameter</p>
                  <p>• <strong>Thickness</strong> = Flange thickness</p>
                  <p>• <strong>Density</strong> = Material density (e.g., steel ≈ 7850 kg/m³)</p>
                </div>
              </div>

              <div className="mt-6 p-5 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  <strong>⚠️ Pro Tip:</strong> From my practical experience, always double-check units before calculation. Many errors occur due to mixing mm and meters.
                </p>
              </div>
            </div>

            {/* Flange Weight in KG */}
            <div className="bg-white border-2 border-green-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">Flange Weight Calculator in KG</h2>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  Most industries use kilograms as the standard unit. A flange weight calculator in kg ensures consistency with international engineering practices.
                </p>

                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Common Material Densities:</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-green-100">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Material</th>
                          <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Density (kg/m³)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        <tr className="hover:bg-green-50">
                          <td className="px-6 py-4 text-gray-700 font-semibold">Carbon Steel</td>
                          <td className="px-6 py-4 text-green-600 font-bold text-lg">7850</td>
                        </tr>
                        <tr className="hover:bg-green-50">
                          <td className="px-6 py-4 text-gray-700 font-semibold">Stainless Steel</td>
                          <td className="px-6 py-4 text-green-600 font-bold text-lg">8000</td>
                        </tr>
                        <tr className="hover:bg-green-50">
                          <td className="px-6 py-4 text-gray-700 font-semibold">Mild Steel (MS)</td>
                          <td className="px-6 py-4 text-green-600 font-bold text-lg">7850</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Types of Calculators */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Types of Flange Weight Calculators</h2>
              <div className="space-y-6">
                {[
                  { title: "Blind Flange Weight Calculator", desc: "Used for solid flanges without a bore. These are heavier due to their solid structure." },
                  { title: "Weld Neck Flange Weight Calculator", desc: "Ideal for high-pressure systems. Requires precise dimension inputs." },
                  { title: "Slip-On Flange Weight Calculator", desc: "Common in low-pressure applications. Easier to calculate due to simple geometry." },
                  { title: "Raised Face Flange Weight Calculator", desc: "Includes additional raised surface, slightly increasing total weight." },
                  { title: "Ring Flange Weight Calculator", desc: "Used in specialized sealing applications." },
                  { title: "Reducing Flange Weight Calculator", desc: "Used when pipe size changes; calculation becomes slightly complex." },
                ].map((type, index) => (
                  <div key={index} className="p-5 bg-white border-2 border-indigo-200 rounded-xl">
                    <h3 className="text-xl font-bold text-indigo-600 mb-2">{type.title}</h3>
                    <p className="text-gray-700">{type.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Material-Based Calculators */}
            <div className="bg-white border-2 border-blue-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">Material-Based Flange Weight Calculators</h2>
              </div>
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: "Carbon Steel Flange Weight Calculator", desc: "Widely used due to strength and affordability." },
                    { title: "Stainless Steel Flange Weight Calculator", desc: "Used in corrosive environments. Slightly heavier than carbon steel." },
                    { title: "MS Flange Weight Calculator", desc: "Common in construction and general fabrication." },
                    { title: "SS Flange Weight Calculator", desc: "Preferred in food, chemical, and pharmaceutical industries." },
                  ].map((item, index) => (
                    <div key={index} className="p-5 bg-blue-50 border-2 border-blue-200 rounded-xl">
                      <h3 className="text-lg font-bold text-blue-600 mb-2">{item.title}</h3>
                      <p className="text-gray-700">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pipe Flange Weight */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Pipe Flange Weight Calculator</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                A pipe flange weight calculator considers both pipe size and flange dimensions. It is commonly used in:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  "Oil & gas pipelines",
                  "Chemical plants",
                  "Water treatment systems",
                ].map((use, index) => (
                  <div key={index} className="p-4 bg-white border-2 border-teal-200 rounded-lg text-center">
                    <p className="text-gray-700 font-semibold">{use}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Flange Weight Chart */}
            <div className="bg-white border-2 border-purple-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">Flange Weight Chart</h2>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  Flange weight charts provide quick reference values for standard sizes.
                </p>

                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Benefits of Using a Flange Weight Chart:</h3>
                  <ul className="space-y-2 ml-6">
                    {[
                      "Saves calculation time",
                      "Reduces human error",
                      "Useful for quick estimations",
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <span className="text-purple-600 font-bold">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-gray-700">
                    Many professionals also prefer downloading a <strong>flange weight chart PDF</strong> for offline use.
                  </p>
                </div>
              </div>
            </div>

            {/* ASME Flange */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">ASME Flange Weight Calculator</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                ASME standards define dimensions and tolerances for flanges. An ASME flange weight calculator ensures compliance with:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                  "ASME B16.5",
                  "ASME B16.47",
                ].map((standard, index) => (
                  <div key={index} className="p-4 bg-white border-2 border-red-200 rounded-lg">
                    <p className="text-gray-900 font-bold text-lg text-center">{standard}</p>
                  </div>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed">
                Using standard-compliant calculators ensures accuracy and global acceptance.
              </p>
            </div>

            {/* Excel Calculator */}
            <div className="bg-white border-2 border-green-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-green-600 to-teal-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">Flange Weight Calculator Excel</h2>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  Many engineers use Excel-based calculators for batch calculations.
                </p>

                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Advantages:</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      "Custom formulas",
                      "Bulk calculations",
                      "Easy data management",
                    ].map((advantage, index) => (
                      <div key={index} className="p-4 bg-white border-2 border-green-300 rounded-lg text-center">
                        <p className="text-gray-700 font-semibold">{advantage}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg text-gray-700">
                  <strong>Experience Note:</strong> In my experience, Excel calculators are extremely useful for large projects involving hundreds of flanges.
                </p>
              </div>
            </div>

            {/* Dimensions */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Flange Weight and Dimensions</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Understanding flange dimensions is critical for accurate weight calculation.
              </p>

              <div className="bg-white border-2 border-orange-300 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Dimensions:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Outer Diameter (OD)",
                    "Inner Diameter (ID)",
                    "Bolt Circle Diameter (BCD)",
                    "Thickness",
                  ].map((dimension, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-orange-50 border-2 border-orange-200 rounded-lg">
                      <Settings className="w-5 h-5 text-orange-600 flex-shrink-0" />
                      <span className="text-gray-700 font-semibold">{dimension}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg text-gray-700">
                  <strong>⚠️ Warning:</strong> Incorrect dimensions lead to wrong weight calculations.
                </p>
              </div>
            </div>

            {/* Step-by-Step */}
            <div className="bg-white border-2 border-indigo-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <BookOpen className="w-8 h-8" />
                  How to Calculate Flange Weight (Step-by-Step)
                </h2>
              </div>
              <div className="p-8">
                <div className="space-y-4">
                  {[
                    { step: "Step 1: Measure Dimensions", desc: "Take OD, ID, and thickness in millimeters." },
                    { step: "Step 2: Convert Units", desc: "Convert mm to meters for volume calculation." },
                    { step: "Step 3: Calculate Volume", desc: "Use the formula: Volume = π × (OD² − ID²) / 4 × Thickness" },
                    { step: "Step 4: Multiply by Density", desc: "Choose the correct material density." },
                    { step: "Step 5: Get Weight in KG", desc: "Final result will be in kilograms." },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-5 bg-indigo-50 border-2 border-indigo-200 rounded-lg">
                      <div className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-lg">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{item.step}</h4>
                        <p className="text-gray-700">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Online vs Manual */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Online vs Manual Flange Weight Calculator</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-blue-300 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-blue-600 mb-4">Online Calculator</h3>
                  <ul className="space-y-2 ml-6">
                    {[
                      "Fast and accurate",
                      "User-friendly",
                      "No manual errors",
                    ].map((pro, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border-2 border-blue-300 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-blue-600 mb-4">Manual Calculation</h3>
                  <ul className="space-y-2 ml-6">
                    {[
                      "Requires formulas",
                      "Time-consuming",
                      "Higher chance of mistakes",
                    ].map((con, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-6 p-5 bg-blue-100 border-2 border-blue-300 rounded-lg text-gray-700 font-semibold">
                💡 For best results, I always recommend using an online flange weight calculator.
              </p>
            </div>

            {/* Common Mistakes */}
            <div className="bg-white border-2 border-red-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-red-600 to-pink-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <AlertCircle className="w-8 h-8" />
                  Common Mistakes in Flange Weight Calculation
                </h2>
              </div>
              <div className="p-8">
                <div className="space-y-4">
                  {[
                    "Using incorrect density values",
                    "Mixing units (mm vs meters)",
                    "Ignoring raised face thickness",
                    "Not following ASME standards",
                  ].map((mistake, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                      <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 font-semibold">{mistake}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-gray-700 leading-relaxed">
                  Avoiding these mistakes ensures precise results.
                </p>
              </div>
            </div>

            {/* Real-World Experience */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-yellow-600" />
                Real-World Experience & Insights
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  In industrial projects, flange weight calculation is not just theoretical—it directly affects operations. I have worked on projects where incorrect flange weights caused delays due to crane overload issues.
                </p>
                <div className="p-5 bg-white border-2 border-yellow-300 rounded-xl">
                  <p className="font-bold text-gray-900 mb-2">One key lesson:</p>
                  <p>Always verify calculations with standard charts or software tools.</p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">FAQs</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is the formula for flange weight calculation?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    The formula is: <strong>Weight = π × (OD² − ID²) / 4 × Thickness × Density</strong>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How do I calculate flange weight in kg?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Use the standard formula and multiply by material density (usually 7850 kg/m³ for steel).
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is a blind flange weight calculator?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    It calculates the weight of solid flanges without an inner bore.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Is there an Excel flange weight calculator?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Yes, Excel-based calculators are widely used for bulk calculations.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is the difference between MS and SS flange weight?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    MS (Mild Steel) and SS (Stainless Steel) have slightly different densities, affecting weight.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Final Thoughts */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Final Thoughts</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  A flange weight calculator is an essential engineering tool that improves accuracy, saves time, and reduces costs. Whether you are using an online tool, Excel sheet, or manual formula, understanding the calculation process ensures better results.
                </p>
                <p>
                  For professionals working in piping, construction, and manufacturing, mastering flange weight calculation is a must-have skill.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
