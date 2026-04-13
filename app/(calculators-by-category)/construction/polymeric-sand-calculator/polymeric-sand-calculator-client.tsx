"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PolymericSandCalculator from "@/components/polymeric-sand-calculator"
import { Package, Calculator, Info, BookOpen, CheckCircle, AlertTriangle, TrendingUp, Ruler, Layers } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function PolymericSandCalculatorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
            Polymeric Sand Calculator — How Much Polymeric Sand Do I Need?
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Use this free paver sand estimator to instantly find how many bags of polymeric jointing sand your project needs. Enter your area, joint width, and paver thickness and get an accurate result in seconds. Works for all major brands: Dominator, Techniseal, Alliance Gator, Gator Maxx, EZ Sand, and Unilock.
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className="mb-12 p-8 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl shadow-lg">
          <div className="flex items-start gap-4">
            <div className="bg-blue-600 text-white rounded-full p-3 flex-shrink-0">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Answer</h3>
              <ul className="space-y-2 text-gray-700 text-lg">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span><strong>Tight joints (⅛" wide):</strong> one 50 lb bag covers 75–100 sq ft</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span><strong>Standard joints (¼"–⅜"):</strong> one 50 lb bag covers 30–60 sq ft</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span><strong>Wide / flagstone joints (½"–1"+):</strong> one 50 lb bag covers 8–15 sq ft</span>
                </li>
              </ul>
              <p className="text-gray-700 mt-4 text-lg">
                <strong>Formula:</strong> Total Bags = Total Area (sq ft) ÷ Coverage per Bag, then add 10–15% buffer
              </p>
            </div>
          </div>
        </div>

        {/* Main Calculator Card */}
        <div className="mb-12">
          <Card className="border-2 border-gray-200 shadow-xl">
            <CardHeader className="py-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                Polymeric Sand Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <PolymericSandCalculator />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="mb-12">
          <div className="space-y-8">
            {/* What Is Polymeric Sand */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Package className="w-8 h-8 text-purple-600" />
                What Is Polymeric Sand?
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                Polymeric sand — also called polymeric jointing sand or paver joint sand — is a fine sand blended with silica polymers and binding additives. You sweep it into the gaps between pavers, then activate it with water.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                When the water hits the polymers, they bond together and the sand hardens into a firm, durable filler. Regular sand simply cannot do this.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                Polymeric sand does four things regular sand cannot:
              </p>
              <ul className="space-y-2 text-gray-700 text-lg ml-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                  <span>Locks pavers in place and prevents shifting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                  <span>Resists washout from rain and pressure washing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                  <span>Blocks weed growth and ant infestation in joints</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                  <span>Allows slight movement without cracking paver edges</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed text-lg mt-4">
                Brands like Alliance Gator, Techniseal, Dominator, Unilock, and EZ Sand each produce polymeric sand with slightly different polymer concentrations and coverage rates. Always check your bag label — it overrides any general estimate.
              </p>
            </div>

            {/* How to Use This Joint Sand Estimator */}
            <div className="bg-white border-2 border-green-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <BookOpen className="w-8 h-8" />
                  How to Use This Joint Sand Estimator
                </h2>
              </div>
              <div className="p-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-5 bg-green-50 border-2 border-green-200 rounded-lg">
                    <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-lg">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Step 1 — Measure your project area</h4>
                      <p className="text-gray-700">Measure the total length and width of your patio, walkway, or driveway in feet. Multiply them together to get square footage. For L-shaped or irregular areas, split into rectangles, calculate each section, then add totals.</p>
                      <p className="text-gray-600 mt-2"><strong>Example:</strong> 20 ft × 15 ft = 300 sq ft</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-green-50 border-2 border-green-200 rounded-lg">
                    <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-lg">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Step 2 — Identify your joint width</h4>
                      <p className="text-gray-700 mb-2">Slide a ruler into a typical joint. Do not guess. Joint width is the single biggest factor in sand quantity — a ½" joint needs roughly double the sand of a ¼" joint on the same area.</p>
                      <ul className="text-gray-700 ml-4 space-y-1">
                        <li>• Straight-edge concrete pavers: ⅛"–¼"</li>
                        <li>• Tumbled concrete pavers: ¼"–⅜"</li>
                        <li>• Natural flagstone with irregular cuts: ½"–1.5"</li>
                        <li>• Large-format pavers (24"×24" and above): ⅛"–¼"</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-green-50 border-2 border-green-200 rounded-lg">
                    <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-lg">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Step 3 — Note your paver thickness</h4>
                      <p className="text-gray-700">Most concrete pavers are 2⅜" thick (60 mm). Thicker pavers create deeper joints that hold more sand. This directly changes your quantity per square foot.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-green-50 border-2 border-green-200 rounded-lg">
                    <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-lg">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Step 4 — Divide area by coverage rate</h4>
                      <p className="text-gray-700">Use the coverage table below. Round up to the nearest whole bag, then add 10–15% for waste.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-green-50 border-2 border-green-200 rounded-lg">
                    <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-lg">
                      5
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Step 5 — Add buffer stock</h4>
                      <p className="text-gray-700">Polymeric sand is shelf-stable when stored dry, so a few extra bags cost far less than a second trip mid-project.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Coverage Table */}
            <div className="bg-white border-2 border-blue-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">Polymeric Sand Coverage Table — By Joint Width</h2>
              </div>
              <div className="p-8">
                <div className="overflow-x-auto">
                  <table className="w-full border-2 border-gray-300">
                    <thead className="bg-blue-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Joint Width</th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Paver Thickness</th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Coverage per 50 lb Bag</th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Common Use</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-blue-50">
                        <td className="px-6 py-4 text-gray-900 font-semibold">⅛" (3 mm)</td>
                        <td className="px-6 py-4 text-gray-700">2"–3"</td>
                        <td className="px-6 py-4 text-gray-700 font-bold">75–100 sq ft</td>
                        <td className="px-6 py-4 text-gray-700">Tight concrete pavers, large-format slabs</td>
                      </tr>
                      <tr className="hover:bg-blue-50">
                        <td className="px-6 py-4 text-gray-900 font-semibold">¼" (6 mm)</td>
                        <td className="px-6 py-4 text-gray-700">2"–3"</td>
                        <td className="px-6 py-4 text-gray-700 font-bold">60–75 sq ft</td>
                        <td className="px-6 py-4 text-gray-700">Standard residential concrete pavers</td>
                      </tr>
                      <tr className="hover:bg-blue-50">
                        <td className="px-6 py-4 text-gray-900 font-semibold">⅜" (10 mm)</td>
                        <td className="px-6 py-4 text-gray-700">2"–3"</td>
                        <td className="px-6 py-4 text-gray-700 font-bold">30–60 sq ft</td>
                        <td className="px-6 py-4 text-gray-700">Tumbled concrete pavers</td>
                      </tr>
                      <tr className="hover:bg-blue-50">
                        <td className="px-6 py-4 text-gray-900 font-semibold">½" (12 mm)</td>
                        <td className="px-6 py-4 text-gray-700">2"–3"</td>
                        <td className="px-6 py-4 text-gray-700 font-bold">15–30 sq ft</td>
                        <td className="px-6 py-4 text-gray-700">Wide joints, rustic pavers</td>
                      </tr>
                      <tr className="hover:bg-blue-50">
                        <td className="px-6 py-4 text-gray-900 font-semibold">¾"–1"</td>
                        <td className="px-6 py-4 text-gray-700">1"–2"</td>
                        <td className="px-6 py-4 text-gray-700 font-bold">8–15 sq ft</td>
                        <td className="px-6 py-4 text-gray-700">Natural flagstone, irregular stone</td>
                      </tr>
                      <tr className="hover:bg-blue-50">
                        <td className="px-6 py-4 text-gray-900 font-semibold">1"+</td>
                        <td className="px-6 py-4 text-gray-700">1"–2"</td>
                        <td className="px-6 py-4 text-gray-700 font-bold">5–8 sq ft</td>
                        <td className="px-6 py-4 text-gray-700">Very wide flagstone gaps</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-600 mt-4 italic">
                  These are general industry estimates. Your specific product label is the most accurate source — always verify before purchasing.
                </p>
              </div>
            </div>

            {/* Manual Calculation Formula */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-orange-600" />
                Manual Calculation Formula
              </h2>
              <div className="bg-white border-2 border-orange-300 rounded-xl p-6 mb-6">
                <p className="text-2xl font-bold text-center text-orange-600">
                  Bags Needed = Total Area (sq ft) ÷ Coverage per Bag × Buffer (1.10–1.20)
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-orange-600 mb-3">Example 1 — Standard Paver Patio</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Patio size: 25 ft × 20 ft = 500 sq ft</li>
                    <li>• Joint width: ¼" | Coverage: 75 sq ft per bag</li>
                    <li>• Base bags: 500 ÷ 75 = 6.67 → round up to 7</li>
                    <li className="font-bold text-orange-600">• Add 10% buffer: 7 × 1.10 = 8 bags total</li>
                  </ul>
                </div>

                <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-orange-600 mb-3">Example 2 — Flagstone Patio</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Area: 150 sq ft</li>
                    <li>• Joint width: ¾" | Coverage: 10 sq ft per bag</li>
                    <li>• Base bags: 150 ÷ 10 = 15</li>
                    <li className="font-bold text-orange-600">• Add 20% buffer: 15 × 1.20 = 18 bags total</li>
                  </ul>
                </div>

                <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-orange-600 mb-3">Example 3 — Tumbled Paver Driveway</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Driveway: 40 ft × 18 ft = 720 sq ft</li>
                    <li>• Joint width: ⅜" | Coverage: 45 sq ft per bag</li>
                    <li>• Base bags: 720 ÷ 45 = 16</li>
                    <li className="font-bold text-orange-600">• Add 15% buffer: 16 × 1.15 = 19 bags total</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Polymeric Sand Calculator for Flagstone */}
            <div className="bg-white border-2 border-teal-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Layers className="w-8 h-8 text-teal-600" />
                Polymeric Sand Calculator for Flagstone
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                Flagstone projects need a different approach because joint widths vary widely across the same patio, stone thickness varies (1"–3"), and irregular shapes create more total joint area per square foot.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                Follow these steps for flagstone:
              </p>
              <ul className="space-y-2 text-gray-700 text-lg ml-6 mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                  <span>Measure your total area in square feet</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                  <span>Walk the area and measure 10–15 joints — then calculate the average width</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                  <span>Use the wide-joint coverage rates from the table above</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                  <span>Add 20% buffer instead of 10% — flagstone projects are more variable</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed text-lg">
                <strong>Rule of thumb:</strong> plan for one 50 lb bag per 8–15 sq ft of natural flagstone surface. Use a wide-joint rated product like Dominator for gaps over ½" — standard narrow-joint polymeric sand will not perform well in large flagstone gaps.
              </p>
            </div>

            {/* 5 Factors That Change Your Sand Quantity */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">5 Factors That Change Your Sand Quantity</h2>
              
              <div className="space-y-4">
                <div className="bg-white border-2 border-indigo-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-indigo-600 mb-2">1. Joint Width — Most Important Factor</h3>
                  <p className="text-gray-700">Doubling the joint width more than doubles the sand needed, because volume increases in three dimensions. Always measure with a ruler — do not estimate by eye.</p>
                </div>

                <div className="bg-white border-2 border-indigo-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-indigo-600 mb-2">2. Paver Thickness</h3>
                  <p className="text-gray-700">Thicker pavers create deeper joints. A 3" thick paver needs about 50% more sand per linear foot of joint than a 2" paver at the same joint width.</p>
                </div>

                <div className="bg-white border-2 border-indigo-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-indigo-600 mb-2">3. Paver Size</h3>
                  <p className="text-gray-700">Small brick pavers (4"×8") have far more joints per square foot than large-format slabs (24"×24"). More joints means more sand per surface square foot, even at the same joint width.</p>
                </div>

                <div className="bg-white border-2 border-indigo-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-indigo-600 mb-2">4. Edge Type — Straight vs. Tumbled</h3>
                  <p className="text-gray-700">Tumbled pavers have rounded, irregular edges that create wider effective joints than their nominal measurement. Add 15–20% extra when using tumbled pavers.</p>
                </div>

                <div className="bg-white border-2 border-indigo-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-indigo-600 mb-2">5. New Installation vs. Top-Up</h3>
                  <p className="text-gray-700">Refilling existing joints on an older project needs far less sand than a brand-new installation with completely empty joints. For top-ups, estimate 25–50% of the new-installation quantity.</p>
                </div>
              </div>
            </div>

            {/* Brand-Specific Coverage Estimates */}
            <div className="bg-white border-2 border-purple-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">Brand-Specific Coverage Estimates</h2>
              </div>
              <div className="p-8">
                <div className="overflow-x-auto">
                  <table className="w-full border-2 border-gray-300">
                    <thead className="bg-purple-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Brand</th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Joint Range</th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Coverage (50 lb bag)</th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Best For</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-purple-50">
                        <td className="px-6 py-4 text-gray-900 font-semibold">Alliance Gator / Gator Maxx Nitro</td>
                        <td className="px-6 py-4 text-gray-700">⅛"–1.5"</td>
                        <td className="px-6 py-4 text-gray-700 font-bold">30–100 sq ft</td>
                        <td className="px-6 py-4 text-gray-700">Most residential paver types</td>
                      </tr>
                      <tr className="hover:bg-purple-50">
                        <td className="px-6 py-4 text-gray-900 font-semibold">Techniseal</td>
                        <td className="px-6 py-4 text-gray-700">⅛"–⅝"</td>
                        <td className="px-6 py-4 text-gray-700 font-bold">40–80 sq ft</td>
                        <td className="px-6 py-4 text-gray-700">Standard and tumbled pavers</td>
                      </tr>
                      <tr className="hover:bg-purple-50">
                        <td className="px-6 py-4 text-gray-900 font-semibold">Dominator Polymeric Sand</td>
                        <td className="px-6 py-4 text-gray-700">¼"–3"</td>
                        <td className="px-6 py-4 text-gray-700 font-bold">10–75 sq ft</td>
                        <td className="px-6 py-4 text-gray-700">Flagstone, wide joints, large-format</td>
                      </tr>
                      <tr className="hover:bg-purple-50">
                        <td className="px-6 py-4 text-gray-900 font-semibold">EZ Sand</td>
                        <td className="px-6 py-4 text-gray-700">⅛"–¼"</td>
                        <td className="px-6 py-4 text-gray-700 font-bold">75–100 sq ft</td>
                        <td className="px-6 py-4 text-gray-700">Narrow joints on standard pavers</td>
                      </tr>
                      <tr className="hover:bg-purple-50">
                        <td className="px-6 py-4 text-gray-900 font-semibold">Unilock</td>
                        <td className="px-6 py-4 text-gray-700">⅛"–¼"</td>
                        <td className="px-6 py-4 text-gray-700 font-bold">75–100 sq ft</td>
                        <td className="px-6 py-4 text-gray-700">Unilock paver systems</td>
                      </tr>
                      <tr className="hover:bg-purple-50">
                        <td className="px-6 py-4 text-gray-900 font-semibold">Generic / store brand</td>
                        <td className="px-6 py-4 text-gray-700">¼"–½"</td>
                        <td className="px-6 py-4 text-gray-700 font-bold">30–60 sq ft</td>
                        <td className="px-6 py-4 text-gray-700">Budget residential projects</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-600 mt-4 italic">
                  Brand coverage rates may change between product generations. Always verify on the bag label before purchasing.
                </p>
              </div>
            </div>

            {/* How to Apply Polymeric Sand */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-green-600" />
                How to Apply Polymeric Sand After Calculating
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                Getting the quantity right is step one. Correct application ensures the sand bonds properly.
              </p>

              <div className="space-y-3">
                {[
                  { title: "Dry the surface fully", desc: "pavers must be completely dry before application or sand will clump on the surface" },
                  { title: "Pour and spread", desc: "sweep sand into all joints using a push broom" },
                  { title: "Fill joints completely", desc: "fill to within ¼\" of the paver surface, not flush to the top" },
                  { title: "Compact the sand", desc: "run a plate compactor over the surface twice to settle sand deep into joints" },
                  { title: "Clear the surface", desc: "use a leaf blower on low to remove surface sand before wetting; leftover sand on paver faces leaves a haze" },
                  { title: "Activate with water", desc: "mist gently for 30 seconds, wait 5 minutes, repeat 2–3 times; avoid a heavy stream" },
                  { title: "Allow curing", desc: "no foot traffic for 24 hours; no vehicles for 48–72 hours" },
                  { title: "Check the forecast", desc: "do not apply if rain is expected within 24 hours" },
                ].map((step, index) => (
                  <div key={index} className="p-4 bg-white border-2 border-green-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-gray-900">{step.title}</h4>
                        <p className="text-gray-700"> — {step.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="bg-white border-2 border-red-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                Common Mistakes When Estimating Paver Joint Sand
              </h2>
              
              <div className="space-y-3">
                {[
                  { title: "Guessing joint width", desc: "even a small error here causes large quantity mistakes. Always use a ruler." },
                  { title: "Skipping the buffer", desc: "running short mid-project is costly and dye lots can vary between batches. Always buy 10–15% extra." },
                  { title: "Using the wrong product for your joint width", desc: "fine polymeric sand for narrow joints will not fill wide flagstone gaps. Always match the product to your joint width." },
                  { title: "Ignoring the bag label coverage rate", desc: "this guide gives industry-standard estimates. Your specific product may state 65 or 80 sq ft per bag. Use whatever your label states." },
                  { title: "Applying on wet pavers or before rain", desc: "moisture before activation prevents proper bonding and causes permanent surface haze." },
                ].map((mistake, index) => (
                  <div key={index} className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-gray-900">{mistake.title}</h4>
                        <p className="text-gray-700"> — {mistake.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Unit Conversions */}
            <div className="bg-white border-2 border-cyan-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-cyan-600 to-teal-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">Unit Conversions for Square Footage</h2>
              </div>
              <div className="p-8">
                <div className="overflow-x-auto">
                  <table className="w-full border-2 border-gray-300">
                    <thead className="bg-cyan-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Your Unit</th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Convert to Sq Ft</th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Example</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-cyan-50">
                        <td className="px-6 py-4 text-gray-900 font-semibold">Square yards</td>
                        <td className="px-6 py-4 text-gray-700">Multiply by 9</td>
                        <td className="px-6 py-4 text-gray-700">50 yd² × 9 = 450 sq ft</td>
                      </tr>
                      <tr className="hover:bg-cyan-50">
                        <td className="px-6 py-4 text-gray-900 font-semibold">Square inches</td>
                        <td className="px-6 py-4 text-gray-700">Divide by 144</td>
                        <td className="px-6 py-4 text-gray-700">7,200 in² ÷ 144 = 50 sq ft</td>
                      </tr>
                      <tr className="hover:bg-cyan-50">
                        <td className="px-6 py-4 text-gray-900 font-semibold">Square meters</td>
                        <td className="px-6 py-4 text-gray-700">Multiply by 10.764</td>
                        <td className="px-6 py-4 text-gray-700">30 m² × 10.764 = 323 sq ft</td>
                      </tr>
                      <tr className="hover:bg-cyan-50">
                        <td className="px-6 py-4 text-gray-900 font-semibold">Circular patio</td>
                        <td className="px-6 py-4 text-gray-700">π × radius²</td>
                        <td className="px-6 py-4 text-gray-700">10 ft radius → 3.14 × 100 = 314 sq ft</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* How Many Pounds Do I Need */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How Many Pounds Do I Need?</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                Most polymeric sand sells in 50 lb bags. Some brands offer 40 lb or 80 lb options.
              </p>
              <div className="bg-white border-2 border-yellow-300 rounded-xl p-6 mb-4">
                <p className="text-2xl font-bold text-center text-yellow-600">
                  Total pounds = Bags needed × Bag weight
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-2">
                <strong>Example:</strong> 8 bags × 50 lb = 400 lbs of polymeric sand
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                If your supplier sells by weight in bulk, use this number directly for your order.
              </p>
            </div>

            {/* Polymeric Sand vs. Regular Sand */}
            <div className="bg-white border-2 border-indigo-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">Polymeric Sand vs. Regular Sand</h2>
              </div>
              <div className="p-8">
                <div className="overflow-x-auto">
                  <table className="w-full border-2 border-gray-300">
                    <thead className="bg-indigo-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Feature</th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Polymeric Sand</th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Regular / Dry Sand</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-indigo-50">
                        <td className="px-6 py-4 text-gray-900 font-semibold">Hardens after wetting</td>
                        <td className="px-6 py-4 text-green-600 font-bold">Yes</td>
                        <td className="px-6 py-4 text-red-600 font-bold">No</td>
                      </tr>
                      <tr className="hover:bg-indigo-50">
                        <td className="px-6 py-4 text-gray-900 font-semibold">Weed resistance</td>
                        <td className="px-6 py-4 text-green-600 font-bold">High</td>
                        <td className="px-6 py-4 text-red-600 font-bold">Low</td>
                      </tr>
                      <tr className="hover:bg-indigo-50">
                        <td className="px-6 py-4 text-gray-900 font-semibold">Ant infestation resistance</td>
                        <td className="px-6 py-4 text-green-600 font-bold">High</td>
                        <td className="px-6 py-4 text-red-600 font-bold">Low</td>
                      </tr>
                      <tr className="hover:bg-indigo-50">
                        <td className="px-6 py-4 text-gray-900 font-semibold">Washout resistance</td>
                        <td className="px-6 py-4 text-green-600 font-bold">High</td>
                        <td className="px-6 py-4 text-red-600 font-bold">Low</td>
                      </tr>
                      <tr className="hover:bg-indigo-50">
                        <td className="px-6 py-4 text-gray-900 font-semibold">Drainage</td>
                        <td className="px-6 py-4 text-gray-700">Limited</td>
                        <td className="px-6 py-4 text-green-600 font-bold">Good</td>
                      </tr>
                      <tr className="hover:bg-indigo-50">
                        <td className="px-6 py-4 text-gray-900 font-semibold">Lifespan</td>
                        <td className="px-6 py-4 text-gray-700 font-bold">10–15 years</td>
                        <td className="px-6 py-4 text-gray-700">1–5 years</td>
                      </tr>
                      <tr className="hover:bg-indigo-50">
                        <td className="px-6 py-4 text-gray-900 font-semibold">Cost</td>
                        <td className="px-6 py-4 text-gray-700">Higher</td>
                        <td className="px-6 py-4 text-green-600 font-bold">Lower</td>
                      </tr>
                      <tr className="hover:bg-indigo-50">
                        <td className="px-6 py-4 text-gray-900 font-semibold">Best for</td>
                        <td className="px-6 py-4 text-gray-700">Patios, driveways, walkways</td>
                        <td className="px-6 py-4 text-gray-700">Garden stepping paths, casual use</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 shadow-2xl">
              <h2 className="text-3xl font-bold mb-6">Summary</h2>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                  <span><strong>Step 1:</strong> Measure total area in square feet (length × width)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                  <span><strong>Step 2:</strong> Find coverage per bag from the table using your joint width</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                  <span><strong>Step 3:</strong> Divide area by coverage → round up → add 10–15% buffer</span>
                </li>
              </ul>
              <p className="text-xl mt-6 leading-relaxed">
                Whether you are using the Dominator calculator, the Techniseal calculator, the Alliance Gator calculator, or estimating manually — the formula stays the same. The only variable is the coverage rate your specific product provides.
              </p>
              <p className="text-xl mt-4 leading-relaxed">
                Measure accurately, match your product to your joint width, add buffer stock, and you will have exactly the right amount of jointing sand to finish your paver project correctly the first time.
              </p>
            </div>

            {/* FAQ Section */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How do I calculate how much polymeric sand I need for pavers?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Measure your area in square feet (length × width). Find your joint width and match it to the coverage table. Divide area by coverage per bag, round up, then add 10% for waste. Example: 300 sq ft patio with ¼" joints at 75 sq ft per bag → 300 ÷ 75 = 4 bags → add 10% = 5 bags.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How much does a 50 lb bag of polymeric sand cover?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Between 8 sq ft (very wide flagstone joints) and 100 sq ft (tight ⅛" joints on standard pavers). For most residential concrete paver patios with ¼" joints, plan on one 50 lb bag per 60–75 sq ft.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How many bags do I need for 200 square feet?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    For a standard 200 sq ft patio with ¼" joints: 200 ÷ 75 = 2.67 → round up to 3 bags → with 10% buffer = 3–4 bags (150–200 lbs).
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Can I use polymeric sand for flagstone?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Yes — but use a product rated for wide joints. Standard narrow-joint sand will not perform well in 1" flagstone gaps. Use Dominator or a wide-joint rated product. Expect one 50 lb bag per 8–15 sq ft.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Does joint depth affect quantity?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Yes. A 3" paver creates a joint about 50% deeper than a 2" paver at the same width, requiring 50% more sand per linear foot of joint.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How often does polymeric sand need to be replaced?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Quality polymeric sand lasts 10–15 years. Signs it needs replacement include crumbling joints, returning weed growth, and shifting pavers. Always clean out old sand before applying fresh product on an existing installation.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is the Dominator polymeric sand calculator?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Dominator is formulated for joint widths from ¼" up to 3", making it popular for flagstone and large-format pavers. Their official website offers a project-specific estimator. The coverage table above gives compatible estimates for Dominator products.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is the Techniseal polymeric sand calculator?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Techniseal is a widely used North American brand for joints from ⅛"–⅝". Their calculator is available on techniseal.com. For most standard joints, a 50 lb bag covers approximately 40–80 sq ft depending on joint width.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-9">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is the Alliance Gator polymeric sand calculator?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Alliance Gator makes several lines including Gator Maxx and Nitro Sand, formulated for joints from ⅛" to 1.5". Their estimator is available on alliancegator.com.
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
