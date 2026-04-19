"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import LMTDCalculator from "@/components/lmtd-calculator"
import { Calculator, Info, BookOpen, Thermometer, HelpCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function LMTDCalculatorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
            LMTD Calculator – Log Mean Temperature Difference Calculator
          </h1>
          <div className="max-w-4xl mx-auto bg-blue-50 border-2 border-blue-300 rounded-lg p-6 mb-6">
            <p className="text-lg text-gray-800 leading-relaxed">
              <strong>LMTD (Log Mean Temperature Difference)</strong> is the effective average temperature difference between hot and cold fluids in a heat exchanger. You calculate it using the formula:
            </p>
            <p className="text-xl font-mono text-center my-4 text-gray-900">
              LMTD = (ΔT₁ – ΔT₂) / ln(ΔT₁ / ΔT₂)
            </p>
            <p className="text-gray-700 leading-relaxed">
              Where ΔT₁ and ΔT₂ are the temperature differences at each end of the heat exchanger. For flow configurations other than pure counterflow, you multiply LMTD by a correction factor F to get the <strong>Corrected LMTD = F × LMTD</strong>.
            </p>
          </div>
        </div>

        {/* Main Calculator Card */}
        <div className="mb-12">
          <Card className="border-2 border-red-200 shadow-xl">
            <CardHeader className="py-6 bg-gradient-to-r from-red-600 to-orange-600 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                LMTD Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <LMTDCalculator />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* What Is LMTD */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-red-600" />
              What Is Log Mean Temperature Difference Explained
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                LMTD stands for Log Mean Temperature Difference. It represents the logarithmic average of the temperature differences between the hot fluid and the cold fluid at both ends of a heat exchanger. Engineers use LMTD because the temperature difference between the two streams does not stay constant along the length of the exchanger it changes continuously as heat transfers from the hot side to the cold side.
              </p>
              <p>
                A simple arithmetic average would overestimate or underestimate the driving force for heat transfer. The logarithmic mean corrects for this non-linearity, giving you a single representative temperature difference you can use directly in the fundamental heat transfer equation:
              </p>
              <div className="bg-orange-50 p-6 rounded-lg my-4 border-l-4 border-orange-600">
                <p className="font-mono text-lg text-center mb-4">Q = U × A × LMTD</p>
                <div className="space-y-2 text-sm">
                  <p><strong>Where:</strong></p>
                  <p>Q = heat duty (W or BTU/hr)</p>
                  <p>U = overall heat transfer coefficient (W/m²·K or BTU/hr·ft²·°F)</p>
                  <p>A = heat transfer area (m² or ft²)</p>
                  <p>LMTD = log mean temperature difference (°C or °F)</p>
                </div>
              </div>
              <p>
                This equation is the backbone of heat exchanger design and rating. Every process engineer, chemical engineer, and HVAC engineer works with this relationship daily.
              </p>
            </div>
          </div>

          {/* LMTD Formula */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">LMTD Formula – The Core Equation You Need</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Standard LMTD Equation</h3>
                <p className="text-gray-700 mb-4">The LMTD calculation formula is:</p>
                <div className="bg-white p-6 rounded-lg border-2 border-blue-400 mb-4">
                  <p className="font-mono text-2xl text-center text-gray-900">LMTD = (ΔT₁ – ΔT₂) / ln(ΔT₁ / ΔT₂)</p>
                </div>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Where:</strong></p>
                  <p>ΔT₁ = temperature difference between hot and cold fluid at End 1 of the exchanger</p>
                  <p>ΔT₂ = temperature difference between hot and cold fluid at End 2 of the exchanger</p>
                  <p>ln = natural logarithm</p>
                </div>
              </div>

              <div>
                <p className="text-gray-700 mb-3">You assign ΔT₁ and ΔT₂ based on the flow configuration:</p>
                
                <div className="bg-red-50 p-4 rounded-lg mb-4">
                  <h4 className="font-bold text-gray-900 mb-2">For counterflow (counter-current) arrangement:</h4>
                  <p className="font-mono text-gray-800">ΔT₁ = T_hot,in – T_cold,out</p>
                  <p className="font-mono text-gray-800">ΔT₂ = T_hot,out – T_cold,in</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-2">For parallel flow (co-current) arrangement:</h4>
                  <p className="font-mono text-gray-800">ΔT₁ = T_hot,in – T_cold,in</p>
                  <p className="font-mono text-gray-800">ΔT₂ = T_hot,out – T_cold,out</p>
                </div>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-600">
                <h4 className="font-bold text-gray-900 mb-2">Special Case When ΔT₁ = ΔT₂</h4>
                <p className="text-gray-700">
                  When both terminal temperature differences are equal, the logarithm becomes undefined (ln(1) = 0 in the denominator). In this special case, LMTD simply equals ΔT₁ = ΔT₂. This situation rarely occurs in practice but you must handle it in your spreadsheet or calculator to avoid a division-by-zero error.
                </p>
              </div>
            </div>
          </div>

          {/* How to Use Calculator */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use This LMTD Calculator</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Using this online LMTD calculator is straightforward. Enter the four terminal temperatures and select your flow configuration. The calculator instantly returns:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>ΔT₁ and ΔT₂ (terminal temperature differences)</li>
                <li>Raw LMTD value</li>
                <li>Correction factor F (for multi-pass or cross-flow configurations)</li>
                <li>Corrected LMTD (F × LMTD)</li>
              </ul>
              
              <div className="bg-green-50 p-6 rounded-lg mt-6 border-l-4 border-green-600">
                <p className="font-bold text-gray-900 mb-3">Inputs you need:</p>
                <ul className="space-y-2">
                  <li>• Hot fluid inlet temperature (T_h,in)</li>
                  <li>• Hot fluid outlet temperature (T_h,out)</li>
                  <li>• Cold fluid inlet temperature (T_c,in)</li>
                  <li>• Cold fluid outlet temperature (T_c,out)</li>
                  <li>• Flow arrangement (counterflow, parallel flow, cross flow, 1-2 shell-and-tube, etc.)</li>
                </ul>
              </div>

              <p className="mt-4">
                The calculator checks automatically whether your temperature cross condition is violated meaning it warns you if your cold fluid outlet temperature exceeds your hot fluid outlet temperature in a parallel flow arrangement, which is thermodynamically impossible.
              </p>
            </div>
          </div>

          {/* Step-by-Step Method */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Calculate LMTD – Step-by-Step Method</h2>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border-l-4 border-purple-600">
                <h3 className="font-bold text-gray-900 mb-2">Step 1 – Identify Your Terminal Temperatures</h3>
                <p className="text-gray-700">Write down all four temperatures clearly. Label them:</p>
                <ul className="mt-2 space-y-1 text-gray-700 ml-4">
                  <li>• T_h,in = hot fluid inlet</li>
                  <li>• T_h,out = hot fluid outlet</li>
                  <li>• T_c,in = cold fluid inlet</li>
                  <li>• T_c,out = cold fluid outlet</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border-l-4 border-blue-600">
                <h3 className="font-bold text-gray-900 mb-2">Step 2 – Determine Your Flow Configuration</h3>
                <p className="text-gray-700">
                  Counterflow gives you the highest LMTD and the best thermal efficiency. Parallel flow gives a lower LMTD. Cross flow and multi-pass shell-and-tube arrangements fall somewhere in between and require a correction factor.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border-l-4 border-green-600">
                <h3 className="font-bold text-gray-900 mb-2">Step 3 – Calculate ΔT₁ and ΔT₂</h3>
                <p className="text-gray-700">Apply the correct terminal difference definitions for your flow arrangement (shown above).</p>
              </div>

              <div className="bg-white p-4 rounded-lg border-l-4 border-orange-600">
                <h3 className="font-bold text-gray-900 mb-2">Step 4 – Apply the LMTD Formula</h3>
                <p className="text-gray-700 mb-2">Plug ΔT₁ and ΔT₂ into the formula:</p>
                <p className="font-mono text-center text-gray-900">LMTD = (ΔT₁ – ΔT₂) / ln(ΔT₁ / ΔT₂)</p>
              </div>

              <div className="bg-white p-4 rounded-lg border-l-4 border-red-600">
                <h3 className="font-bold text-gray-900 mb-2">Step 5 – Apply the Correction Factor (If Needed)</h3>
                <p className="text-gray-700 mb-2">
                  For anything other than a pure single-pass counterflow or parallel flow exchanger, multiply your LMTD by the correction factor F:
                </p>
                <p className="font-mono text-center text-gray-900">Corrected LMTD = F × LMTD</p>
              </div>
            </div>
          </div>

          {/* Calculation Example */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">LMTD Calculation Example – Worked Problem</h2>
            <p className="text-gray-700 mb-6">Let's walk through a real calculation so you can see exactly how this works.</p>
            
            <div className="bg-blue-50 p-6 rounded-lg mb-6 border-2 border-blue-300">
              <p className="font-bold text-gray-900 mb-3">Problem: A shell-and-tube heat exchanger (1 shell pass, 2 tube passes) cools hot oil using cooling water.</p>
              <ul className="space-y-2 text-gray-800">
                <li>• Hot oil inlet: 120°C</li>
                <li>• Hot oil outlet: 60°C</li>
                <li>• Cooling water inlet: 25°C</li>
                <li>• Cooling water outlet: 45°C</li>
                <li>• Flow arrangement: counterflow basis (for LMTD calculation)</li>
              </ul>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Step 1: Assign terminal differences (counterflow basis)</h4>
                <p className="font-mono text-gray-800">ΔT₁ = T_h,in – T_c,out = 120 – 45 = 75°C</p>
                <p className="font-mono text-gray-800">ΔT₂ = T_h,out – T_c,in = 60 – 25 = 35°C</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Step 2: Apply the LMTD formula</h4>
                <p className="font-mono text-gray-800">LMTD = (75 – 35) / ln(75 / 35)</p>
                <p className="font-mono text-gray-800">LMTD = 40 / ln(2.143)</p>
                <p className="font-mono text-gray-800">LMTD = 40 / 0.7635</p>
                <p className="font-mono text-gray-800 font-bold">LMTD = 52.4°C</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Step 3: Find the correction factor F</h4>
                <p className="text-gray-700 mb-2">For a 1-2 shell-and-tube exchanger, calculate the P and R parameters:</p>
                <p className="font-mono text-gray-800">R = (T_h,in – T_h,out) / (T_c,out – T_c,in) = (120 – 60) / (45 – 25) = 60 / 20 = 3.0</p>
                <p className="font-mono text-gray-800">P = (T_c,out – T_c,in) / (T_h,in – T_c,in) = (45 – 25) / (120 – 25) = 20 / 95 = 0.211</p>
                <p className="text-gray-700 mt-2">Using the TEMA correction factor chart or formula for a 1-2 exchanger, <strong>F ≈ 0.97</strong></p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border-2 border-green-400">
                <h4 className="font-bold text-gray-900 mb-2">Step 4: Calculate corrected LMTD</h4>
                <p className="font-mono text-gray-800">Corrected LMTD = 0.97 × 52.4 = 50.8°C</p>
                <p className="text-gray-700 mt-2">This corrected LMTD is what you use in the Q = U × A × LMTD equation to size your heat exchanger area.</p>
              </div>
            </div>
          </div>

          {/* Correction Factor */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">LMTD Correction Factor Calculator – What Is F and Why Does It Matter?</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">What Is the LMTD Correction Factor?</h3>
                <p className="text-gray-700 leading-relaxed">
                  The LMTD correction factor F accounts for the fact that real heat exchangers rarely operate in pure counterflow or pure parallel flow. In a 1-2 shell-and-tube exchanger, one shell-side fluid flows in one direction while the tube-side fluid makes two passes once in each direction. This mixed arrangement reduces the effective temperature driving force compared to pure counterflow.
                </p>
                <p className="text-gray-700 mt-4">
                  F is always between 0 and 1. The closer F is to 1, the closer the exchanger performs to pure counterflow. When F drops below 0.75, most engineers treat this as a warning sign the exchanger design becomes thermally inefficient and sensitive to small changes in operating conditions.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border-l-4 border-orange-600">
                <h3 className="text-xl font-bold text-gray-900 mb-4">How to Calculate LMTD Correction Factor</h3>
                <p className="text-gray-700 mb-4">You calculate F using two dimensionless parameters:</p>
                <div className="space-y-3 font-mono text-gray-800">
                  <p>R = (hot fluid temperature change) / (cold fluid temperature change)</p>
                  <p>R = (T_h,in – T_h,out) / (T_c,out – T_c,in)</p>
                  <p className="mt-4">P = (cold fluid temperature change) / (maximum possible temperature difference)</p>
                  <p>P = (T_c,out – T_c,in) / (T_h,in – T_c,in)</p>
                </div>
                <p className="text-gray-700 mt-4">
                  You then read F from a correction factor chart (published in TEMA standards and most heat transfer textbooks) or calculate it using the analytical formula specific to your exchanger configuration (1-2, 2-4, cross-flow with both fluids mixed, cross-flow with one fluid mixed, etc.).
                </p>
                <p className="text-gray-700 mt-2">
                  This corrected LMTD calculator handles the F calculation automatically once you select your exchanger type.
                </p>
              </div>
            </div>
          </div>

          {/* Different Heat Exchanger Types */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">LMTD Calculation for Different Heat Exchanger Types</h2>
            
            <div className="space-y-6">
              <div className="bg-red-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Counter Current LMTD Calculator</h3>
                <p className="text-gray-700 mb-3">
                  Counterflow (counter-current) is the most thermally efficient flow arrangement. The hot fluid and cold fluid flow in opposite directions. This maximizes the temperature difference at both ends and gives the highest possible LMTD for a given set of inlet and outlet temperatures.
                </p>
                <div className="font-mono text-gray-800 bg-white p-3 rounded">
                  <p>For counterflow:</p>
                  <p>ΔT₁ = T_h,in – T_c,out</p>
                  <p>ΔT₂ = T_h,out – T_c,in</p>
                </div>
                <p className="text-gray-700 mt-3">
                  Counterflow also allows temperature cross the cold fluid outlet can actually exceed the hot fluid outlet temperature, which is impossible in parallel flow.
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">LMTD Calculation for Cross Flow Heat Exchangers</h3>
                <p className="text-gray-700">
                  Cross flow heat exchangers common in air coolers, automotive radiators, and HVAC coils have the two fluids flowing perpendicular to each other. You still calculate the raw LMTD on a counterflow basis, then apply the cross-flow correction factor F.
                </p>
                <p className="text-gray-700 mt-3">
                  For cross-flow exchangers, F depends on whether each fluid is mixed or unmixed across its cross-section. An unmixed fluid (like air flowing through discrete tube rows) has a different F than a mixed fluid (like a single-pass shell-side fluid). The correction factor for cross-flow configurations typically ranges from 0.80 to 0.97 for well-designed exchangers.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">LMTD Calculation for Plate Heat Exchangers</h3>
                <p className="text-gray-700">
                  Plate heat exchangers are almost always configured in counterflow arrangement between the plates. This means F = 1.0 for a single-pass plate heat exchanger in pure counterflow, and you use the raw LMTD directly.
                </p>
                <p className="text-gray-700 mt-3">
                  Multi-pass plate heat exchangers require correction factors, but these are usually provided by the equipment manufacturer rather than calculated from standard TEMA charts. When you use this LMTD calculator for a plate heat exchanger, select "counterflow" for a standard single-pass gasketed plate heat exchanger.
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">LMTD Calculation for Condensers (Steam Condenser and Phase Change)</h3>
                <p className="text-gray-700 mb-3">
                  Phase change processes condensation and evaporation occur at constant temperature on the phase-change side. This dramatically simplifies the LMTD calculation.
                </p>
                <p className="text-gray-700 mb-3">For a steam condenser:</p>
                <ul className="space-y-2 text-gray-700 ml-4">
                  <li>• Hot side (steam): T_h,in = T_h,out = T_sat (saturation temperature at operating pressure)</li>
                  <li>• Cold side (cooling water): T_c,in and T_c,out are your inlet and outlet water temperatures</li>
                </ul>
                <div className="font-mono text-gray-800 bg-white p-3 rounded mt-3">
                  <p>ΔT₁ = T_sat – T_c,out</p>
                  <p>ΔT₂ = T_sat – T_c,in</p>
                </div>
                <p className="text-gray-700 mt-3">
                  Since one fluid is at constant temperature, the correction factor F = 1.0 regardless of the number of tube passes. The LMTD formula applies directly without any correction.
                </p>
                <div className="bg-white p-4 rounded mt-4">
                  <p className="font-bold text-gray-900 mb-2">Example for a steam condenser at 100°C steam, cooling water 25°C to 40°C:</p>
                  <div className="font-mono text-gray-800 space-y-1">
                    <p>ΔT₁ = 100 – 40 = 60°C</p>
                    <p>ΔT₂ = 100 – 25 = 75°C</p>
                    <p>LMTD = (60 – 75) / ln(60/75) = –15 / ln(0.8) = –15 / (–0.2231) = 67.2°C</p>
                  </div>
                  <p className="text-gray-700 mt-2 text-sm">Note that the sign is positive because you take the absolute value of the numerator when ΔT₁ &lt; ΔT₂.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Excel Calculator */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">LMTD Calculator in Excel – How to Build Your Own</h2>
            <p className="text-gray-700 mb-6">
              Many engineers prefer to work in Excel for documentation and record-keeping. Here is how to set up an LMTD calculator in Excel:
            </p>
            
            <div className="bg-white p-6 rounded-lg border-2 border-green-400">
              <h4 className="font-bold text-gray-900 mb-4">Cell layout:</h4>
              <div className="space-y-2 font-mono text-sm text-gray-800">
                <p>B2: T_h,in (enter your value)</p>
                <p>B3: T_h,out</p>
                <p>B4: T_c,in</p>
                <p>B5: T_c,out</p>
                <p className="mt-4">B7: =B2-B5 (this gives ΔT₁ for counterflow)</p>
                <p>B8: =B3-B4 (this gives ΔT₂ for counterflow)</p>
                <p className="mt-4">B10: =IF(B7=B8, B7, (B7-B8)/LN(B7/B8))</p>
                <p className="text-xs text-gray-600 mt-2">(this is your LMTD with the special case handled)</p>
              </div>
              <p className="text-gray-700 mt-6">
                The IF statement handles the case where ΔT₁ = ΔT₂ and avoids the #DIV/0! error. Add a separate cell for F and a final cell for Corrected LMTD = F × LMTD.
              </p>
              <p className="text-gray-700 mt-4">
                For the correction factor, you can build a lookup table based on R and P values, or use the explicit analytical formulas from TEMA for each exchanger configuration. Engineering references like Kern's Process Heat Transfer or the HEDH (Heat Exchanger Design Handbook) publish these formulas in closed-form equations suitable for Excel implementation.
              </p>
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Mistakes Engineers Make When Calculating LMTD</h2>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Mistake 1 – Mixing up the terminal ends</h3>
                <p className="text-gray-700">
                  Always be consistent. If ΔT₁ uses the hot fluid inlet, then ΔT₂ must use the hot fluid outlet. Swapping ends gives you the same LMTD mathematically, but it causes confusion when pairing with the correction factor calculation.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Mistake 2 – Forgetting the correction factor</h3>
                <p className="text-gray-700">
                  Many engineers calculate LMTD correctly but forget to apply F for multi-pass shell-and-tube exchangers. Using uncorrected LMTD in Q = U × A × LMTD will overestimate your available driving force and under-size your exchanger.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Mistake 3 – Using parallel flow LMTD when the exchanger is counterflow</h3>
                <p className="text-gray-700">
                  Always identify your actual flow arrangement before calculating. A counterflow exchanger has a higher LMTD than the same exchanger in parallel flow. Mixing these up leads to significant sizing errors.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Mistake 4 – Ignoring the temperature cross warning</h3>
                <p className="text-gray-700">
                  If your corrected LMTD correction factor F falls below 0.75 or if your P and R values fall outside the chart boundaries, you have a temperature cross situation that a single shell cannot handle. You need to add more shells in series.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">Mistake 5 – Applying phase-change LMTD incorrectly</h3>
                <p className="text-gray-700">
                  For condensers and evaporators, the phase-change fluid is always at saturation temperature. F = 1.0 always applies, and you do not use the standard two-temperature-change approach for that fluid.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-red-600" />
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  What is LMTD in heat exchanger design?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  LMTD is the logarithmic mean temperature difference the mathematically correct average temperature driving force for heat transfer across a heat exchanger. Engineers use it in the equation Q = U × A × LMTD to relate heat duty, heat transfer area, and the overall heat transfer coefficient.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Why do we use LMTD instead of arithmetic mean temperature difference?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  The arithmetic mean temperature difference assumes the temperature profile is linear, which it is not in a real heat exchanger. The actual temperature difference changes exponentially along the exchanger length. The logarithmic mean correctly captures this exponential behavior and gives an accurate single driving force value.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  What is the LMTD correction factor and when do I need it?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  The correction factor F adjusts the pure counterflow LMTD for configurations where the flow is not in pure counterflow or parallel flow. You need F for shell-and-tube exchangers with multiple tube passes, cross-flow exchangers, and any configuration where the fluids change direction mid-exchanger. F = 1.0 for pure counterflow, pure parallel flow, and all phase-change applications.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Can LMTD be negative?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  No, LMTD is always a positive value when your heat exchanger operates correctly (hot fluid is always hotter than cold fluid at every point). If your calculation gives a negative LMTD, you have made an error in assigning terminal temperatures check your ΔT₁ and ΔT₂ assignments.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  What is the difference between LMTD and the NTU method?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Both LMTD and the Number of Transfer Units (NTU) method calculate heat exchanger performance. You use the LMTD method when you know all four terminal temperatures (rating or checking an existing exchanger). You use the NTU-effectiveness method when you know the inlet temperatures but not the outlet temperatures (designing a new exchanger where you need to find what area gives a target effectiveness).
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How does LMTD change in counterflow vs parallel flow?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  For the same inlet and outlet temperatures, counterflow always gives a higher LMTD than parallel flow. This is why engineers almost always prefer counterflow arrangements a higher LMTD means you need less heat transfer area to achieve the same duty, which directly reduces equipment cost.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  What happens when ΔT₁ equals ΔT₂?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  When both terminal temperature differences are identical, the LMTD equals that temperature difference directly (LMTD = ΔT₁ = ΔT₂). This is the mathematical limit of the formula as the ratio approaches 1, and it is consistent with L'Hôpital's rule applied to the standard LMTD equation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How do I calculate LMTD for a multi-effect evaporator?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  In multi-effect evaporation, each effect operates as a condenser-evaporator combination. You calculate the LMTD for each effect separately using the steam temperature on the heating side and the boiling point of the liquid on the evaporating side. Each effect has its own heat transfer area requirement based on its own LMTD and duty.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
