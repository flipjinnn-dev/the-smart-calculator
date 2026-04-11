"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import WaterPotentialCalculator from "@/components/water-potential-calculator"
import { Droplet, Calculator, Info, AlertCircle, BookOpen, TrendingUp, Beaker, CheckCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function WaterPotentialCalculatorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
            Water Potential Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Calculate ψ (psi) instantly — osmotic potential, pressure potential, and total water potential.
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className="mb-12 p-8 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl shadow-lg">
          <div className="flex items-start gap-4">
            <div className="bg-blue-600 text-white rounded-full p-3 flex-shrink-0">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Quick answer</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                Water potential (ψ) = Osmotic potential (ψs) + Pressure potential (ψp). For a solution, ψs = −iCRT, where i is the ionisation constant, C is molar concentration, R = 0.00831 L·MPa/mol·K, and T is temperature in Kelvin. Pure water has a water potential of 0 MPa.
              </p>
            </div>
          </div>
        </div>

        {/* Main Calculator Card */}
        <div className="mb-12">
          <Card className="border-2 border-gray-200 shadow-xl">
            <CardHeader className="py-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                Water Potential Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <WaterPotentialCalculator />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="mb-12">
          <div className="space-y-8">
            {/* Water Potential Formula */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Beaker className="w-8 h-8 text-blue-600" />
                Water potential formula
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                The standard water potential formula (AP Bio & A-Level) is:
              </p>

              <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 mb-6">
                <div className="text-center text-2xl font-bold text-gray-900 mb-4">
                  ψ = ψs + ψp
                </div>
                <p className="text-gray-700 text-center">
                  Where the osmotic potential formula (also called solute potential) is:
                </p>
                <div className="text-center text-xl font-bold text-gray-900 mt-3">
                  ψs = −iCRT
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-2 border-gray-300">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Symbol</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Meaning</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Unit</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Value / note</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { symbol: "ψ", meaning: "Total water potential", unit: "MPa", note: "Negative for solutions" },
                      { symbol: "ψs", meaning: "Osmotic (solute) potential", unit: "MPa", note: "Always ≤ 0" },
                      { symbol: "ψp", meaning: "Pressure potential (turgor)", unit: "MPa", note: "+ve (turgor), −ve (tension)" },
                      { symbol: "i", meaning: "Ionisation constant", unit: "—", note: "Sucrose = 1, NaCl ≈ 2" },
                      { symbol: "C", meaning: "Molar concentration", unit: "mol/L", note: "From experiment or given" },
                      { symbol: "R", meaning: "Gas constant (pressure form)", unit: "L·MPa/mol·K", note: "0.00831" },
                      { symbol: "T", meaning: "Absolute temperature", unit: "K", note: "°C + 273" },
                    ].map((row, index) => (
                      <tr key={index} className="hover:bg-blue-50">
                        <td className="px-6 py-4 text-gray-900 font-bold">{row.symbol}</td>
                        <td className="px-6 py-4 text-gray-700">{row.meaning}</td>
                        <td className="px-6 py-4 text-gray-700">{row.unit}</td>
                        <td className="px-6 py-4 text-gray-700">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Water Potential Components */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Water potential components explained</h2>
              <div className="space-y-6">
                {[
                  { title: "Osmotic potential (ψs) always ≤ 0", desc: "Caused by dissolved solutes. More solutes = more negative ψs. Drives water into cells." },
                  { title: "Pressure potential (ψp) can be + or −", desc: "Turgor pressure pushes water out (+). Tension in xylem creates negative values." },
                  { title: "Matric potential (ψm) always ≤ 0", desc: "Adhesion of water to soil particles or cell walls. Important in soil water potential." },
                  { title: "Gravitational potential (ψg) + or −", desc: "Height above a reference point. Matters in tall trees (up to +1 MPa difference)." },
                  { title: "Pure water reference = 0 MPa", desc: "Pure water at standard conditions = 0 MPa. All solutions are negative relative to this." },
                ].map((item, index) => (
                  <div key={index} className="p-5 bg-white border-2 border-purple-200 rounded-xl">
                    <h3 className="text-xl font-bold text-purple-600 mb-2">{item.title}</h3>
                    <p className="text-gray-700">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Examples */}
            <div className="bg-white border-2 border-green-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <BookOpen className="w-8 h-8" />
                  How to calculate water potential — step-by-step
                </h2>
              </div>
              <div className="p-8 space-y-8">
                {/* Example 1 */}
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Example 1 — sucrose concentration to water potential (AP Bio classic)</h3>
                  <p className="text-gray-700 mb-4"><strong>Problem:</strong> Calculate the water potential of a 0.15 M sucrose solution at 25 °C in an open container.</p>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>1.</strong> Write the formula: ψ = ψs + ψp</p>
                    <p><strong>2.</strong> Identify values: i = 1 (sucrose does not ionise), C = 0.15 mol/L, R = 0.00831, T = 25 + 273 = 298 K, ψp = 0 (open system)</p>
                    <p><strong>3.</strong> Calculate ψs = −(1)(0.15)(0.00831)(298) = −0.37 MPa</p>
                    <p><strong>4.</strong> Calculate ψ = −0.37 + 0 = −0.37 MPa</p>
                    <p className="p-3 bg-green-100 border-2 border-green-300 rounded-lg"><strong>Interpretation:</strong> water moves from a region with ψ &gt; −0.37 MPa into this solution.</p>
                  </div>
                </div>

                {/* Example 2 */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Example 2 — water potential of potato cells</h3>
                  <p className="text-gray-700 mb-4"><strong>Problem:</strong> Potato cells placed in a 0.3 M sucrose solution reach equilibrium. Find the water potential of the potato cells.</p>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>1.</strong> At equilibrium, ψcell = ψsolution</p>
                    <p><strong>2.</strong> Calculate ψsolution: ψs = −(1)(0.3)(0.00831)(298) = −0.74 MPa</p>
                    <p><strong>3.</strong> ψp of solution = 0 (open beaker), so ψsolution = −0.74 MPa</p>
                    <p className="p-3 bg-blue-100 border-2 border-blue-300 rounded-lg"><strong>Therefore,</strong> ψpotato cells = −0.74 MPa at equilibrium.</p>
                  </div>
                </div>

                {/* Example 3 */}
                <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Example 3 — water potential calculation with temperature (water potential calculator with temperature)</h3>
                  <p className="text-gray-700 mb-4"><strong>Problem:</strong> How does temperature affect the water potential of a 0.2 M NaCl solution?</p>
                  <div className="space-y-3 text-gray-700">
                    <p><strong>At 20 °C:</strong> ψs = −(2)(0.2)(0.00831)(293) = −0.975 MPa</p>
                    <p><strong>At 37 °C:</strong> ψs = −(2)(0.2)(0.00831)(310) = −1.031 MPa</p>
                    <p className="p-3 bg-orange-100 border-2 border-orange-300 rounded-lg">Higher temperature → more negative osmotic potential → stronger driving force for water entry.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Experimental Data */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Calculation of water potential from experimental data</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                In AP Biology and A-Level labs, you calculate water potential experimentally by placing tissue (like potato or zucchini cores) in sucrose solutions and observing mass changes.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-2 border-gray-300">
                  <thead className="bg-indigo-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Sucrose concentration (M)</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">% change in mass</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Interpretation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { conc: "0.0 (pure water)", change: "+8%", interp: "Water enters cells — solution ψ > cell ψ" },
                      { conc: "0.2", change: "+3%", interp: "Net water entry — still gaining mass" },
                      { conc: "0.4", change: "0%", interp: "Equilibrium — ψcell = ψsolution" },
                      { conc: "0.6", change: "−4%", interp: "Water leaves cells — solution ψ < cell ψ" },
                      { conc: "0.8", change: "−9%", interp: "Strong plasmolysis — large water loss" },
                    ].map((row, index) => (
                      <tr key={index} className="hover:bg-indigo-50">
                        <td className="px-6 py-4 text-gray-900 font-semibold">{row.conc}</td>
                        <td className="px-6 py-4 text-gray-700">{row.change}</td>
                        <td className="px-6 py-4 text-gray-700">{row.interp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-6 p-4 bg-indigo-100 border-2 border-indigo-300 rounded-lg text-gray-700">
                At the equilibrium point (0.4 M, 0% change), you calculate the cell's water potential using ψs = −iCRT with C = 0.4 M, giving ψcell ≈ −0.99 MPa at 25 °C.
              </p>
            </div>

            {/* Biological Contexts */}
            <div className="bg-white border-2 border-teal-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">Water potential in cells — key biological contexts</h2>
              </div>
              <div className="p-8 space-y-6">
                <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-teal-600 mb-3">Water potential of plant cells (turgor pressure)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    A fully turgid plant cell has a high positive ψp (turgor pressure) that partially offsets the negative ψs. A flaccid cell has ψp ≈ 0. A plasmolysed cell can have negative ψp. This is why plants wilt when water is scarce — ψp drops and turgor is lost.
                  </p>
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-blue-600 mb-3">Water potential in soil</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Soil water potential includes matric potential (ψm), which comes from water adhesion to soil particles. Dry soil has a very negative matric potential (−1 MPa to −10 MPa). Roots absorb water because their osmotic potential is more negative than the surrounding soil water potential.
                  </p>
                </div>

                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-green-600 mb-3">Water movement across membranes</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Water always moves by osmosis from a region of higher (less negative) water potential to a region of lower (more negative) water potential. This simple rule governs absorption in roots, transport in xylem, and exchange in leaf cells.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently asked questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is the water potential formula in AP Biology?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    In AP Biology, the water potential formula is ψ = ψs + ψp. The osmotic potential component is ψs = −iCRT, where i is the ionisation constant, C is molar concentration (mol/L), R is 0.00831 L·MPa/mol·K, and T is temperature in Kelvin (°C + 273). Pure water has a water potential of 0 MPa.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How do you calculate the water potential of a 0.15 M sucrose solution?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    For 0.15 M sucrose at 25 °C: ψs = −(1)(0.15)(0.00831)(298) = −0.37 MPa. Since sucrose does not ionise (i = 1) and the system is open (ψp = 0), the total water potential = −0.37 MPa.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How is water potential calculated for potato cells?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    You place potato cores in sucrose solutions of different concentrations and record mass changes. The concentration at which mass does not change (0% change) is the equilibrium point. At this point, the water potential of the cell equals the water potential of the external solution, which you then calculate using ψs = −iCRT.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is the difference between osmotic potential and water potential?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Osmotic potential (ψs) is only one component of total water potential. It represents the effect of dissolved solutes and is always ≤ 0. Water potential (ψ) is the total, combining osmotic potential and pressure potential (and other components in advanced scenarios). Water potential is the complete measure used to predict the direction of water movement.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Why is water potential always negative in solutions?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Pure water is the reference point at 0 MPa. When you add solutes, they reduce the free energy of water molecules, making the osmotic potential negative. Since you cannot exceed the free energy of pure water in normal conditions, water potential of solutions is always ≤ 0 MPa (unless positive pressure is applied).
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How does temperature affect water potential?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Temperature (T in Kelvin) appears directly in the formula ψs = −iCRT. Higher temperature produces a more negative osmotic potential. For example, a 0.1 M sucrose solution has ψs = −0.24 MPa at 25 °C but −0.27 MPa at 55 °C. This is why our water potential calculator with temperature uses the Kelvin scale.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How do you calculate water potential at equilibrium?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    At equilibrium, ψinside = ψoutside. If a cell is placed in a solution and reaches equilibrium with no net water movement, calculate ψ of the external solution using −iCRT. That value equals the cell's water potential at that moment.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is the water potential of zucchini cores in sucrose solutions?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    You determine this experimentally. Place zucchini cores in a range of sucrose concentrations (e.g. 0 M to 0.8 M) and record mass changes. Plot % change in mass vs. concentration. The concentration at which the line crosses zero (0% change) gives the equilibrium sucrose molarity. Insert that value into ψs = −iCRT to find the water potential of the zucchini solutes within the cores.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-9">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What unit is water potential measured in?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Water potential is measured in pressure units — most commonly megapascals (MPa) in biology and pascals (Pa) in physics. Bars are sometimes used (1 MPa = 10 bar). AP Biology standardly uses MPa. The units arise because water potential is energy per unit volume (J/m³ = Pa).
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* A-Level vs AP Biology */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Water potential formula — A-Level vs AP Biology</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-2 border-gray-300">
                  <thead className="bg-yellow-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Curriculum</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Formula used</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Notation</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { curr: "AP Biology", formula: "ψ = ψs + ψp", notation: "ψs for solute, ψp for pressure", notes: "R = 0.00831 L·MPa/mol·K" },
                      { curr: "A-Level Biology", formula: "ψ = ψs + ψp", notation: "Same notation", notes: "Usually measured in kPa; same principle" },
                      { curr: "Advanced / Soil Science", formula: "ψ = ψs + ψp + ψm + ψg", notation: "Adds matric and gravitational", notes: "Used for soil water potential analysis" },
                    ].map((row, index) => (
                      <tr key={index} className="hover:bg-yellow-50">
                        <td className="px-6 py-4 text-gray-900 font-semibold">{row.curr}</td>
                        <td className="px-6 py-4 text-gray-700">{row.formula}</td>
                        <td className="px-6 py-4 text-gray-700">{row.notation}</td>
                        <td className="px-6 py-4 text-gray-700">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="bg-white border-2 border-red-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-red-600 to-pink-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <AlertCircle className="w-8 h-8" />
                  Common mistakes when calculating water potential
                </h2>
              </div>
              <div className="p-8">
                <div className="space-y-4">
                  {[
                    { mistake: "Using °C instead of Kelvin", fix: "Always convert T = °C + 273 before plugging into the formula." },
                    { mistake: "Forgetting the ionisation constant (i)", fix: "Sucrose = 1, NaCl = 2, CaCl₂ = 3. Forgetting this under-estimates the osmotic effect of ionic solutes." },
                    { mistake: "Ignoring pressure potential", fix: "In a closed or pressurised cell, ψp ≠ 0. An open beaker has ψp = 0." },
                    { mistake: "Sign errors", fix: "Osmotic potential is always negative. If you calculate a positive ψs, you missed the negative sign in −iCRT." },
                    { mistake: "Comparing wrong potentials", fix: "Water moves from higher (less negative) to lower (more negative) ψ, not from lower solute to higher solute concentration." },
                  ].map((item, index) => (
                    <div key={index} className="p-5 bg-red-50 border-2 border-red-200 rounded-xl">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">{item.mistake}</h4>
                          <p className="text-gray-700">{item.fix}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
