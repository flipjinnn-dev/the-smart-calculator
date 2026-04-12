"use client"

import SoffitCalculator from "@/components/soffit-calculator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Calculator, Info, FileText, TrendingUp, DollarSign, CheckCircle, Layers, Wind, AlertTriangle, Home } from "lucide-react"

export default function SoffitClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        
        {/* H1 - Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Soffit Calculator – Calculate Soffit Area, Vents, Fascia & Cost Free
          </h1>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6 max-w-4xl mx-auto mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Quick Answer</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              To calculate soffit area, multiply your total eave length (ft) by overhang width (ft). Add a 10–15% waste factor, then divide by panel coverage to get the number of panels needed.
            </p>
            <div className="bg-white rounded-lg p-4 mt-4">
              <p className="text-xl font-bold text-blue-600 mb-2">Formula:</p>
              <p className="text-lg text-gray-900">Soffit Area (sq ft) = Eave Length (ft) × Overhang Width (ft)</p>
            </div>
            <div className="mt-4 text-sm text-gray-700">
              <p><strong>Inputs:</strong> Eave Length · Overhang Width · Panel Size · Waste Factor · Material Type · Vent Type</p>
              <p className="mt-1"><strong>Outputs:</strong> Soffit Area (sq ft) · Panels Needed · Vent NFA · Fascia Length · Total Cost</p>
            </div>
          </div>
        </div>

        {/* Main Calculator Card */}
        <div className="mb-16">
          <SoffitCalculator />
        </div>

        {/* What Is Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Info className="w-8 h-8 text-blue-600" />
            What Is a Soffit Calculator?
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              A soffit calculator is a free online tool that helps homeowners and contractors calculate soffit material quantity, ventilation requirements, and total installation cost before starting any roofing project. It automatically converts your eave measurements into a complete material list — no manual math needed.
            </p>
            <p className="text-gray-700 leading-relaxed font-semibold">
              You can use it for:
            </p>
            <ul className="space-y-2 text-gray-700 ml-6">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>New soffit installation</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Full soffit replacement</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span>Roof ventilation upgrades</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <span>Combined soffit and fascia projects</span>
              </li>
            </ul>
          </div>
        </section>

        {/* How to Calculate Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Calculator className="w-8 h-8 text-green-600" />
            How to Calculate Soffit — Step-by-Step
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-6">
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Step 1 — Measure Total Eave Length</h3>
                <p className="text-gray-700">
                  Walk around your home and measure every roof edge where soffit will be installed. Add all sections together to get one total number in linear feet.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Step 2 — Measure Overhang Width</h3>
                <p className="text-gray-700 mb-3">
                  Measure the horizontal distance from the exterior wall to the fascia board edge. Record in inches, then convert to feet.
                </p>
                <div className="bg-white rounded-lg p-4 mt-3">
                  <p className="text-lg font-semibold text-green-600">Overhang (ft) = Overhang Inches ÷ 12</p>
                  <p className="text-gray-700 mt-2">Example: 18 inches ÷ 12 = 1.5 ft</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Step 3 — Calculate Soffit Area</h3>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-xl font-bold text-purple-600 mb-2">Soffit Area = Eave Length × Overhang Width</p>
                  <p className="text-gray-700">Example: 180 ft × 1.5 ft = 270 sq ft</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Step 4 — Apply Waste Factor</h3>
                <div className="overflow-x-auto mt-4">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-orange-100">
                        <th className="border-2 border-orange-300 p-3 text-left font-semibold">Roof Type</th>
                        <th className="border-2 border-orange-300 p-3 text-left font-semibold">Waste Factor</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white">
                        <td className="border-2 border-orange-200 p-3">Simple straight runs</td>
                        <td className="border-2 border-orange-200 p-3 font-semibold">5%</td>
                      </tr>
                      <tr className="bg-orange-50">
                        <td className="border-2 border-orange-200 p-3">Standard installation</td>
                        <td className="border-2 border-orange-200 p-3 font-semibold">10%</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="border-2 border-orange-200 p-3">Complex with many corners</td>
                        <td className="border-2 border-orange-200 p-3 font-semibold">15–20%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-white rounded-lg p-4 mt-4">
                  <p className="text-lg font-semibold text-orange-600 mb-2">Adjusted Area = Soffit Area × (1 + Waste %)</p>
                  <p className="text-gray-700">Example: 270 × 1.10 = 297 sq ft</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Step 5 — Calculate Panels Needed</h3>
                <div className="overflow-x-auto mt-4">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-indigo-100">
                        <th className="border-2 border-indigo-300 p-3 text-left font-semibold">Panel Size</th>
                        <th className="border-2 border-indigo-300 p-3 text-left font-semibold">Coverage Per Panel</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white">
                        <td className="border-2 border-indigo-200 p-3">12-inch wide (Triple 3)</td>
                        <td className="border-2 border-indigo-200 p-3 font-semibold">12 sq ft</td>
                      </tr>
                      <tr className="bg-indigo-50">
                        <td className="border-2 border-indigo-200 p-3">16-inch wide (Quad 4)</td>
                        <td className="border-2 border-indigo-200 p-3 font-semibold">16 sq ft</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-white rounded-lg p-4 mt-4">
                  <p className="text-lg font-semibold text-indigo-600 mb-2">Panels Needed = Adjusted Area ÷ Panel Coverage</p>
                  <p className="text-gray-700">Example: 297 ÷ 12 = 24.75 → Order 25 panels</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Step 6 — Calculate J-Channel & Fascia</h3>
                <div className="bg-white rounded-lg p-4 space-y-2">
                  <p className="text-lg font-semibold text-teal-600">J-Channel = (Eave Length × 2) + (Hip Corners × 4)</p>
                  <p className="text-lg font-semibold text-teal-600">Fascia Length = Total Eave Length (linear ft)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Soffit Vent Calculator Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Wind className="w-8 h-8 text-purple-600" />
            Soffit Vent Calculator — Ventilation Requirements
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Correct soffit ventilation prevents mold, ice dams, heat buildup, and early shingle failure. Building codes in the U.S. and Canada require a minimum net free area (NFA) based on attic floor size.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">1/150 Rule — Standard Ventilation</h3>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-lg font-semibold text-blue-600">Required NFA (sq ft) = Attic Floor Area ÷ 150</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">1/300 Rule — With Vapor Barrier</h3>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-lg font-semibold text-green-600">Required NFA (sq ft) = Attic Floor Area ÷ 300</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How Many Soffit Vents Do You Need?</h3>
              <div className="bg-white rounded-lg p-4 mb-4">
                <p className="text-xl font-bold text-purple-600">Number of Vents = Required NFA ÷ NFA Per Vent</p>
              </div>
              <p className="text-gray-700">
                Most standard round soffit vents provide 50–75 sq inches of NFA each. Always check the manufacturer label.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-6 mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Full Example:</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-indigo-100">
                      <th className="border-2 border-indigo-300 p-3 text-left font-semibold">Step</th>
                      <th className="border-2 border-indigo-300 p-3 text-left font-semibold">Calculation</th>
                      <th className="border-2 border-indigo-300 p-3 text-left font-semibold">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border-2 border-indigo-200 p-3">Attic Floor Area</td>
                      <td className="border-2 border-indigo-200 p-3">1,200 sq ft</td>
                      <td className="border-2 border-indigo-200 p-3 font-semibold">—</td>
                    </tr>
                    <tr className="bg-indigo-50">
                      <td className="border-2 border-indigo-200 p-3">Required NFA (÷150)</td>
                      <td className="border-2 border-indigo-200 p-3">1,200 ÷ 150</td>
                      <td className="border-2 border-indigo-200 p-3 font-semibold">8 sq ft = 1,152 sq in</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border-2 border-indigo-200 p-3">Vents Needed (÷50 NFA/vent)</td>
                      <td className="border-2 border-indigo-200 p-3">1,152 ÷ 50</td>
                      <td className="border-2 border-indigo-200 p-3 font-semibold">24 vents</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border-2 border-green-300 p-3 font-bold">Vent Spacing</td>
                      <td className="border-2 border-green-300 p-3 font-bold">120 ft ÷ 24</td>
                      <td className="border-2 border-green-300 p-3 font-bold text-green-600">1 vent every 5 ft</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-white rounded-lg p-4 mt-4">
                <p className="text-lg font-semibold text-indigo-600">Vent Spacing Formula = Total Eave Length ÷ Number of Vents</p>
              </div>
            </div>

            <div className="bg-amber-100 border-l-4 border-amber-600 p-4 rounded-lg mt-4">
              <p className="text-gray-800">
                <strong>Pro Tip:</strong> Always balance soffit vents (intake) with ridge vents (exhaust) at a 50/50 ratio for optimal attic airflow.
              </p>
            </div>
          </div>
        </section>

        {/* Soffit & Fascia Calculator Table */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Layers className="w-8 h-8 text-teal-600" />
            Soffit & Fascia Calculator
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
            <p className="text-gray-700 leading-relaxed mb-6">
              A combined soffit and fascia calculator gives you every material line item in one place.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-teal-100">
                    <th className="border-2 border-teal-300 p-3 text-left font-semibold">Material</th>
                    <th className="border-2 border-teal-300 p-3 text-left font-semibold">Calculation Method</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border-2 border-teal-200 p-3 font-semibold">Soffit Panels</td>
                    <td className="border-2 border-teal-200 p-3">(Area + Waste) ÷ Panel Coverage</td>
                  </tr>
                  <tr className="bg-teal-50">
                    <td className="border-2 border-teal-200 p-3 font-semibold">Fascia Board</td>
                    <td className="border-2 border-teal-200 p-3">Total Eave Length (linear ft)</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-teal-200 p-3 font-semibold">J-Channel</td>
                    <td className="border-2 border-teal-200 p-3">(Eave Length × 2) + (Corners × 4)</td>
                  </tr>
                  <tr className="bg-teal-50">
                    <td className="border-2 border-teal-200 p-3 font-semibold">Starter Strip</td>
                    <td className="border-2 border-teal-200 p-3">Equal to Fascia Length</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-teal-200 p-3 font-semibold">Soffit Vents</td>
                    <td className="border-2 border-teal-200 p-3">Required NFA ÷ NFA Per Vent</td>
                  </tr>
                  <tr className="bg-teal-50">
                    <td className="border-2 border-teal-200 p-3 font-semibold">Nails / Screws</td>
                    <td className="border-2 border-teal-200 p-3">~1 lb per 100 sq ft</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Soffit Cost Calculator Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-green-600" />
            Soffit Cost Calculator — Price Breakdown
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-6">
            
            {/* Material Cost Table */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Material Cost Per Square Foot</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-green-100">
                      <th className="border-2 border-green-300 p-3 text-left font-semibold">Soffit Type</th>
                      <th className="border-2 border-green-300 p-3 text-left font-semibold">Material Cost (per sq ft)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border-2 border-green-200 p-3">Vinyl Soffit</td>
                      <td className="border-2 border-green-200 p-3 font-semibold">$1.00 – $3.00</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border-2 border-green-200 p-3">Aluminum Soffit</td>
                      <td className="border-2 border-green-200 p-3 font-semibold">$2.00 – $5.00</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border-2 border-green-200 p-3">Metal / Steel Soffit</td>
                      <td className="border-2 border-green-200 p-3 font-semibold">$3.00 – $7.00</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border-2 border-green-200 p-3">Wood Soffit</td>
                      <td className="border-2 border-green-200 p-3 font-semibold">$2.50 – $6.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Labor & Installation Cost Table */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Labor & Installation Cost</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="border-2 border-blue-300 p-3 text-left font-semibold">Task</th>
                      <th className="border-2 border-blue-300 p-3 text-left font-semibold">Estimated Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border-2 border-blue-200 p-3">Soffit installation (per sq ft)</td>
                      <td className="border-2 border-blue-200 p-3 font-semibold">$4 – $12</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border-2 border-blue-200 p-3">Soffit + Fascia (per linear ft)</td>
                      <td className="border-2 border-blue-200 p-3 font-semibold">$8 – $22</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border-2 border-blue-200 p-3">Soffit vent installation (per vent)</td>
                      <td className="border-2 border-blue-200 p-3 font-semibold">$20 – $50</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border-2 border-blue-200 p-3">Old soffit removal (per sq ft)</td>
                      <td className="border-2 border-blue-200 p-3 font-semibold">$1 – $3</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Total Cost Formula */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Total Cost Formula</h3>
              <div className="bg-white rounded-lg p-4">
                <p className="text-xl font-bold text-purple-600">Total Project Cost = (Soffit Area × Material Cost/sq ft) + (Labor Rate × sq ft)</p>
              </div>
            </div>

            {/* Real-World Example Table */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-6 mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Real-World Example — Single Story Home (180 Linear Ft Eave)</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-indigo-100">
                      <th className="border-2 border-indigo-300 p-3 text-left font-semibold">Item</th>
                      <th className="border-2 border-indigo-300 p-3 text-left font-semibold">Qty</th>
                      <th className="border-2 border-indigo-300 p-3 text-left font-semibold">Unit Cost</th>
                      <th className="border-2 border-indigo-300 p-3 text-left font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border-2 border-indigo-200 p-3">Vinyl Soffit Panels</td>
                      <td className="border-2 border-indigo-200 p-3">25 panels</td>
                      <td className="border-2 border-indigo-200 p-3">$18 each</td>
                      <td className="border-2 border-indigo-200 p-3 font-semibold">$450</td>
                    </tr>
                    <tr className="bg-indigo-50">
                      <td className="border-2 border-indigo-200 p-3">Fascia Board</td>
                      <td className="border-2 border-indigo-200 p-3">180 lin ft</td>
                      <td className="border-2 border-indigo-200 p-3">$2.50/ft</td>
                      <td className="border-2 border-indigo-200 p-3 font-semibold">$450</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border-2 border-indigo-200 p-3">J-Channel</td>
                      <td className="border-2 border-indigo-200 p-3">400 lin ft</td>
                      <td className="border-2 border-indigo-200 p-3">$1.00/ft</td>
                      <td className="border-2 border-indigo-200 p-3 font-semibold">$400</td>
                    </tr>
                    <tr className="bg-indigo-50">
                      <td className="border-2 border-indigo-200 p-3">Soffit Vents (16 vents)</td>
                      <td className="border-2 border-indigo-200 p-3">16</td>
                      <td className="border-2 border-indigo-200 p-3">$6 each</td>
                      <td className="border-2 border-indigo-200 p-3 font-semibold">$96</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border-2 border-indigo-200 p-3">Labor (removal + install)</td>
                      <td className="border-2 border-indigo-200 p-3">270 sq ft</td>
                      <td className="border-2 border-indigo-200 p-3">$7/sq ft</td>
                      <td className="border-2 border-indigo-200 p-3 font-semibold">$1,890</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border-2 border-green-300 p-3 font-bold" colSpan={3}>Total Estimated Cost</td>
                      <td className="border-2 border-green-300 p-3 font-bold text-green-600 text-xl">$3,286</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Vinyl vs Aluminum vs Metal Comparison Table */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-purple-600" />
            Vinyl vs Aluminum vs Metal Soffit Calculator
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-purple-100">
                    <th className="border-2 border-purple-300 p-3 text-left font-semibold">Feature</th>
                    <th className="border-2 border-purple-300 p-3 text-left font-semibold">Vinyl</th>
                    <th className="border-2 border-purple-300 p-3 text-left font-semibold">Aluminum</th>
                    <th className="border-2 border-purple-300 p-3 text-left font-semibold">Metal/Steel</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border-2 border-purple-200 p-3 font-semibold">Cost per sq ft</td>
                    <td className="border-2 border-purple-200 p-3">$1–$3</td>
                    <td className="border-2 border-purple-200 p-3">$2–$5</td>
                    <td className="border-2 border-purple-200 p-3">$3–$7</td>
                  </tr>
                  <tr className="bg-purple-50">
                    <td className="border-2 border-purple-200 p-3 font-semibold">Durability</td>
                    <td className="border-2 border-purple-200 p-3">Good</td>
                    <td className="border-2 border-purple-200 p-3">Very Good</td>
                    <td className="border-2 border-purple-200 p-3">Excellent</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-purple-200 p-3 font-semibold">Best Climate</td>
                    <td className="border-2 border-purple-200 p-3">Warm & dry</td>
                    <td className="border-2 border-purple-200 p-3">All climates</td>
                    <td className="border-2 border-purple-200 p-3">All climates</td>
                  </tr>
                  <tr className="bg-purple-50">
                    <td className="border-2 border-purple-200 p-3 font-semibold">Popular Region</td>
                    <td className="border-2 border-purple-200 p-3">Southern USA</td>
                    <td className="border-2 border-purple-200 p-3">Canada & Northern USA</td>
                    <td className="border-2 border-purple-200 p-3">Commercial</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-purple-200 p-3 font-semibold">Waste Factor</td>
                    <td className="border-2 border-purple-200 p-3">+15% (cold cuts)</td>
                    <td className="border-2 border-purple-200 p-3">+10%</td>
                    <td className="border-2 border-purple-200 p-3">+10%</td>
                  </tr>
                  <tr className="bg-purple-50">
                    <td className="border-2 border-purple-200 p-3 font-semibold">DIY Friendly</td>
                    <td className="border-2 border-purple-200 p-3">Yes</td>
                    <td className="border-2 border-purple-200 p-3">Yes</td>
                    <td className="border-2 border-purple-200 p-3">No</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 space-y-3">
              <div className="bg-blue-100 border-l-4 border-blue-600 p-4 rounded-lg">
                <p className="text-gray-800">
                  <strong>Aluminum soffit calculator tip:</strong> Aluminum is the top choice in Canada and northern states because it resists moisture and holds paint without warping.
                </p>
              </div>
              <div className="bg-amber-100 border-l-4 border-amber-600 p-4 rounded-lg">
                <p className="text-gray-800">
                  <strong>Vinyl soffit calculator tip:</strong> Add 15% waste when cutting vinyl in cold temperatures because the material becomes brittle and cracks easily at corners.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Soffit Replacement Cost Calculator */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Home className="w-8 h-8 text-orange-600" />
            Soffit Replacement Cost Calculator
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-orange-100">
                    <th className="border-2 border-orange-300 p-3 text-left font-semibold">Home Size</th>
                    <th className="border-2 border-orange-300 p-3 text-left font-semibold">Estimated Full Replacement Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border-2 border-orange-200 p-3">Small home (up to 1,200 sq ft)</td>
                    <td className="border-2 border-orange-200 p-3 font-semibold">$1,500 – $3,000</td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td className="border-2 border-orange-200 p-3">Medium home (1,200 – 2,500 sq ft)</td>
                    <td className="border-2 border-orange-200 p-3 font-semibold">$3,000 – $6,000</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-orange-200 p-3">Large home (2,500 sq ft+)</td>
                    <td className="border-2 border-orange-200 p-3 font-semibold">$6,000 – $12,000+</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6">
              <p className="text-gray-700 font-semibold mb-3">Factors that increase replacement cost:</p>
              <ul className="space-y-2 text-gray-700 ml-6">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>Hip roof with many angled corners</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span>Rotten or damaged fascia requiring full replacement</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>Second-story or hard-to-reach eaves</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Upgrading from solid to vented soffit panels</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Expert Tips */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-teal-600" />
            Expert Tips for Accurate Soffit Calculation
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-teal-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold">Measure at the lowest point of the overhang.</span> Overhangs are not always level the lowest point gives you the maximum width and prevents material shortfall.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold">Measure gable ends separately.</span> Triangular gable soffits use the triangle area formula: (Base × Height) ÷ 2. Add this to your main soffit area.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold">Order in full carton quantities.</span> Most suppliers sell soffit panels in cartons of 2–5 pieces. Round up to the nearest full carton to avoid return trips.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold">Do not mix vented and solid panels randomly.</span> Plan your vent layout before ordering so you buy the correct ratio of vented to solid panels.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold">Always calculate ventilation before buying materials.</span> Your vent requirement determines how many vented panels versus solid panels you need.
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Summary Table */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <FileText className="w-8 h-8 text-indigo-600" />
            Summary
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-indigo-100">
                    <th className="border-2 border-indigo-300 p-3 text-left font-semibold">What to Calculate</th>
                    <th className="border-2 border-indigo-300 p-3 text-left font-semibold">Formula</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border-2 border-indigo-200 p-3 font-semibold">Soffit Area</td>
                    <td className="border-2 border-indigo-200 p-3">Eave Length × Overhang Width (ft)</td>
                  </tr>
                  <tr className="bg-indigo-50">
                    <td className="border-2 border-indigo-200 p-3 font-semibold">Adjusted Area (with waste)</td>
                    <td className="border-2 border-indigo-200 p-3">Soffit Area × (1 + Waste %)</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-indigo-200 p-3 font-semibold">Panels Needed</td>
                    <td className="border-2 border-indigo-200 p-3">Adjusted Area ÷ Panel Coverage</td>
                  </tr>
                  <tr className="bg-indigo-50">
                    <td className="border-2 border-indigo-200 p-3 font-semibold">Required Vent NFA</td>
                    <td className="border-2 border-indigo-200 p-3">Attic Floor Area ÷ 150</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-indigo-200 p-3 font-semibold">Number of Vents</td>
                    <td className="border-2 border-indigo-200 p-3">Required NFA ÷ NFA Per Vent</td>
                  </tr>
                  <tr className="bg-indigo-50">
                    <td className="border-2 border-indigo-200 p-3 font-semibold">Vent Spacing</td>
                    <td className="border-2 border-indigo-200 p-3">Eave Length ÷ Number of Vents</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border-2 border-indigo-200 p-3 font-semibold">J-Channel Length</td>
                    <td className="border-2 border-indigo-200 p-3">(Eave Length × 2) + (Corners × 4)</td>
                  </tr>
                  <tr className="bg-indigo-50">
                    <td className="border-2 border-indigo-200 p-3 font-semibold">Total Project Cost</td>
                    <td className="border-2 border-indigo-200 p-3">Material Cost + Labor Cost</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section - COMPLETE with all 8 questions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Info className="w-8 h-8 text-blue-600" />
            FAQs
          </h2>
          <Accordion type="single" collapsible className="bg-white rounded-2xl border-2 border-gray-200">
            <AccordionItem value="item-1" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                How do I calculate how much soffit I need?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                Multiply your total eave length (ft) by your overhang width (ft) to get the area in square feet. Add 10–15% for waste, then divide by the panel coverage area to find the number of panels to order.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                How many soffit vents do I need?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                Divide your attic floor area by 150 to get the required net free area (NFA). Then divide that by the NFA rating of each vent (usually 50–75 sq inches) to get the number of vents needed.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                What is the soffit cost per square foot?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                Vinyl soffit costs $1–$3/sq ft for materials. Aluminum soffit costs $2–$5/sq ft. Installed cost including labor is typically $4–$12/sq ft.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                Is this soffit calculator free?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                Yes this soffit calculator is completely free to use with no signup required.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                How do I calculate linear feet of soffit?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                Measure each section of eave around your home and add all lengths together. This gives your total linear footage used to calculate J-channel, fascia, and vent spacing.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                What is the difference between vented and solid soffit panels?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                Solid panels provide no airflow. Center-vented panels provide ~10% NFA. Fully vented panels provide ~25% NFA. Your soffit vent calculator result tells you how many vented panels you need.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                How do I calculate soffit for a hip roof?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                Measure each hip section separately, calculate each triangular area (Base × Height ÷ 2), and add them to your main total. Use a 15–20% waste factor for hip roofs due to angled cuts.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                What is the difference between vented and solid soffit panels?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                Solid panels provide no airflow. Center-vented panels provide ~10% NFA. Fully vented panels provide ~25% NFA. Your soffit vent calculator result tells you how many vented panels you need.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
        
      </div>
    </div>
  )
}

