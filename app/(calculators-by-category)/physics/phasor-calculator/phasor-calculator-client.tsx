"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PhasorCalculator from "@/components/phasor-calculator"
import { Zap, Calculator, Info, BookOpen, TrendingUp, Grid3x3, Lightbulb } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function PhasorCalculatorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Phasor Calculator
          </h1>
        </div>

        <div className="mb-12 p-8 bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-2xl shadow-lg">
          <div className="flex items-start gap-4">
            <div className="bg-purple-600 text-white rounded-full p-3 flex-shrink-0">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-700 leading-relaxed">
                A phasor calculator converts sinusoidal signals into complex numbers and performs AC circuit operations like addition, subtraction, multiplication, impedance calculation, and rectangular-to-polar conversion without manual trigonometry. It simplifies AC steady-state analysis by replacing time-domain equations with basic complex number algebra, widely used in electrical engineering and power systems.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <PhasorCalculator />
        </div>

        <div className="prose prose-lg max-w-none space-y-12">
          <Card className="border-2 border-blue-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-blue-900">
                <Calculator className="w-7 h-7 text-blue-600" />
                Phasor Conversion: Rectangular and Polar Form
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Every phasor exists in two mathematically equivalent forms. Rectangular form writes the phasor as a + jb, where a is the real (in-phase) component and b is the imaginary (quadrature) component. Polar form writes the same phasor as R∠θ, where R is the magnitude and θ is the phase angle measured counterclockwise from the positive real axis.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Engineers use j — not i — to denote √(−1), because the letter i already represents current in circuit equations, following the convention established in IEEE standards. The mathematics is identical to the mathematical imaginary unit; only the label differs.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded mt-4">
                <p className="text-gray-700 leading-relaxed font-semibold mb-2">Conversion Formulas:</p>
                <ul className="space-y-2 text-gray-700 font-mono text-sm">
                  <li>• Rectangular to Polar: R = √(a² + b²) and θ = atan2(b, a)</li>
                  <li>• Polar to Rectangular: a = R·cos(θ) and b = R·sin(θ)</li>
                  <li>• Euler Identity: R∠θ = R·e^(jθ) = R·cos(θ) + jR·sin(θ)</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded mt-4">
                <p className="text-gray-700 leading-relaxed">
                  Plain arctan(b/a) fails when a is zero or negative because it cannot distinguish between opposite quadrants. The atan2(b, a) function returns the correct angle in all four quadrants. Always use atan2.
                </p>
              </div>

              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 mt-4">
                <p className="text-gray-700 leading-relaxed font-semibold mb-2">Example:</p>
                <p className="text-gray-700 font-mono text-sm">Z = 3 + j4 → R = √(9+16) = 5, θ = atan2(4,3) = 53.13°</p>
                <p className="text-gray-700 font-mono text-sm">→ Result: 5∠53.13°</p>
                <p className="text-gray-700 font-mono text-sm mt-2">Reverse check: a = 5·cos(53.13°) = 3.0, b = 5·sin(53.13°) = 4.0 ✓</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-purple-900">
                <Grid3x3 className="w-7 h-7 text-purple-600" />
                Phasor Reference Table
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                The table below shows unit-magnitude phasors (R = 1) at standard angles with their exact rectangular components. These values appear in virtually every AC circuit, three-phase power, and signal processing problem. For any other magnitude, multiply both x and y by R.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border-2 border-purple-200 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-purple-100">
                      <th className="border border-purple-200 p-3 text-left font-bold text-purple-900">Angle</th>
                      <th className="border border-purple-200 p-3 text-left font-bold text-purple-900">Rectangular Form</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-purple-200 p-3 font-semibold">0°</td>
                      <td className="border border-purple-200 p-3 font-mono">1 + j0</td>
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="border border-purple-200 p-3 font-semibold">30°</td>
                      <td className="border border-purple-200 p-3 font-mono">0.8660 + j0.5000</td>
                    </tr>
                    <tr>
                      <td className="border border-purple-200 p-3 font-semibold">45°</td>
                      <td className="border border-purple-200 p-3 font-mono">0.7071 + j0.7071</td>
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="border border-purple-200 p-3 font-semibold">60°</td>
                      <td className="border border-purple-200 p-3 font-mono">0.5000 + j0.8660</td>
                    </tr>
                    <tr>
                      <td className="border border-purple-200 p-3 font-semibold">90°</td>
                      <td className="border border-purple-200 p-3 font-mono">0 + j1</td>
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="border border-purple-200 p-3 font-semibold">120°</td>
                      <td className="border border-purple-200 p-3 font-mono">−0.5000 + j0.8660</td>
                    </tr>
                    <tr>
                      <td className="border border-purple-200 p-3 font-semibold">180°</td>
                      <td className="border border-purple-200 p-3 font-mono">−1 + j0</td>
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="border border-purple-200 p-3 font-semibold">270°</td>
                      <td className="border border-purple-200 p-3 font-mono">0 − j1</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-gray-700 leading-relaxed mt-4">
                In three-phase power systems, the standard phase offsets are 0°, 120°, and 240° (equivalently −120°), which is why 120° is a key reference value.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-green-900">
                <TrendingUp className="w-7 h-7 text-green-600" />
                Four-Step Analysis Flow
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <p className="font-bold text-green-900">Write the time-domain signal</p>
                    <p className="text-gray-700 font-mono text-sm">v(t) = Vm·cos(ωt + φ)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <p className="font-bold text-green-900">Convert to phasor domain</p>
                    <p className="text-gray-700 font-mono text-sm">V = Vm∠φ</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <p className="font-bold text-green-900">Apply complex algebra</p>
                    <p className="text-gray-700 font-mono text-sm">V = I × Z</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <p className="font-bold text-green-900">Convert back to time domain if required</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mt-4">
                This flow eliminates all differential equations. A derivative in the time domain becomes multiplication by jω in the phasor domain, and an integral becomes division by jω. This is the foundation of all AC steady-state analysis taught in Nilsson & Riedel's Electric Circuits and Hayt & Kemmerly's Engineering Circuit Analysis.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-orange-900">
                <Calculator className="w-7 h-7 text-orange-600" />
                Phasor Arithmetic Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Use rectangular form for addition and subtraction — add or subtract real and imaginary parts separately. Use polar form for multiplication and division — multiply or divide magnitudes and add or subtract angles. This single rule eliminates the most common source of phasor arithmetic errors.
              </p>

              <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded">
                <p className="text-gray-700 leading-relaxed font-semibold mb-2">Operations:</p>
                <ul className="space-y-2 text-gray-700 font-mono text-sm">
                  <li>• Addition: (a1+a2) + j(b1+b2)</li>
                  <li>• Subtraction: (a1−a2) + j(b1−b2)</li>
                  <li>• Multiplication: R1·R2 ∠ (θ1+θ2)</li>
                  <li>• Division: (R1/R2) ∠ (θ1−θ2)</li>
                </ul>
              </div>

              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed font-semibold mb-2">Quick Examples:</p>
                <ul className="space-y-1 text-gray-700 font-mono text-sm">
                  <li>• (3+j4) + (1−j2) = 4+j2</li>
                  <li>• (3+j4) − (1−j2) = 2+j6</li>
                  <li>• 5∠30° × 2∠45° = 10∠75°</li>
                  <li>• 10∠75° ÷ 2∠45° = 5∠30°</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-indigo-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-indigo-900">
                <Zap className="w-7 h-7 text-indigo-600" />
                Sinusoid to Phasor Conversion
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                The standard reference in AC phasor analysis is the cosine function. Convert all signals to cosine before extracting the phasor. If your signal uses sine, subtract 90° from the phase angle first — because sin(θ) = cos(θ − 90°).
              </p>

              <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded">
                <p className="text-gray-700 leading-relaxed font-semibold mb-2">Conversion Rules:</p>
                <ul className="space-y-2 text-gray-700 font-mono text-sm">
                  <li>• Cosine: v(t) = Vm·cos(ωt + φ) → V = Vm∠φ</li>
                  <li>• Sine: v(t) = Vm·sin(ωt + φ) → V = Vm∠(φ − 90°)</li>
                  <li>• Reverse: V = Vm∠φ → v(t) = Vm·cos(ωt + φ)</li>
                  <li>• Angular frequency: ω = 2πf (rad/s)</li>
                </ul>
              </div>

              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed font-semibold mb-2">Examples:</p>
                <ul className="space-y-2 text-gray-700 font-mono text-sm">
                  <li>• v(t) = 5·sin(ωt + 45°) → Phase = 45° − 90° = −45° → V = 5∠−45°</li>
                  <li>• v(t) = 10·cos(377t + 30°) → V = 10∠30°</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-red-900">
                <Zap className="w-7 h-7 text-red-600" />
                Impedance and AC Ohm's Law
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Impedance Z = R + jX is the AC generalization of DC resistance. R is resistance (real part) and X is reactance (imaginary part). Inductive reactance XL = ωL is positive. Capacitive reactance XC = −1/(ωC) is negative. Phasor Ohm's law V = I × Z applies to all AC circuit elements — solve for any unknown by multiplying or dividing phasors in polar form.
              </p>

              <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
                <p className="text-gray-700 leading-relaxed font-semibold mb-2">Component Impedances:</p>
                <ul className="space-y-2 text-gray-700 font-mono text-sm">
                  <li>• Resistor: R∠0° — voltage and current in phase</li>
                  <li>• Inductor: ωL∠+90° — current lags voltage by 90°</li>
                  <li>• Capacitor: (1/ωC)∠−90° — current leads voltage by 90°</li>
                  <li>• Series RLC: Z = R + j(ωL − 1/ωC)</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Memory rule — ELI the ICE man:</strong> In an inductor (L), voltage (E) leads current (I). In a capacitor (C), current (I) leads voltage (E).
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                <p className="text-gray-700 leading-relaxed font-semibold mb-2">Key Formulas:</p>
                <ul className="space-y-2 text-gray-700 font-mono text-sm">
                  <li>• V = I × Z (multiply in polar form)</li>
                  <li>• I = V ÷ Z (divide in polar form)</li>
                  <li>• Z = V ÷ I (divide in polar form)</li>
                  <li>• Power Factor = cos(θV − θI)</li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed">
                Apparent power S = V·I* where I* is the complex conjugate of the current phasor. This gives real power P = |V||I|·cos(φ) in watts and reactive power Q = |V||I|·sin(φ) in VAR. A power factor of 1 means the load is purely resistive. Industrial facilities with large inductive loads typically have power factors between 0.7 and 0.85 — utilities penalize this because low power factor increases line current without delivering useful work.
              </p>

              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed font-semibold mb-2">Example:</p>
                <p className="text-gray-700 font-mono text-sm">V = 10∠0° V, Z = 5∠36.87° Ω</p>
                <p className="text-gray-700 font-mono text-sm">→ I = 10∠0° / 5∠36.87° = 2∠−36.87° A</p>
                <p className="text-gray-700 text-sm mt-2">Current lags voltage — load is inductive.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-teal-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-teal-900">
                <Grid3x3 className="w-7 h-7 text-teal-600" />
                Phasor Diagram
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                A phasor diagram plots phasors as arrows on the complex plane. The horizontal axis is the real (in-phase) component and the vertical axis is the imaginary (quadrature) component. Each arrow's length represents magnitude and its angle represents phase.
              </p>

              <p className="text-gray-700 leading-relaxed">
                In a series RLC circuit: VR points along the positive real axis (in phase with current), VL points upward at +90°, VC points downward at −90°, and VS is the vector sum of all three. The angle between VS and the real axis is the circuit's power factor angle. At resonance (ω = 1/√LC), VL and VC cancel completely, leaving VS = VR and power factor = 1.
              </p>

              <p className="text-gray-700 leading-relaxed">
                In a balanced three-phase system, three equal-magnitude phasors are separated by 120° each. If phase A is the reference at 0°, phase B sits at −120° and phase C at +120°. Their vector sum equals zero, which is why the neutral wire in a balanced system carries no current.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-pink-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-pink-900">
                <BookOpen className="w-7 h-7 text-pink-600" />
                Worked Examples
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="bg-pink-50 border-2 border-pink-200 rounded-lg p-4">
                <h3 className="text-lg font-bold text-pink-900 mb-3">Example 1 — Phasor Addition (Kirchhoff's Voltage Law)</h3>
                <p className="text-gray-700 mb-2">Three series voltages: V1 = 10∠0°, V2 = 8∠90°, V3 = 6∠−90°. Find VS.</p>
                <div className="font-mono text-sm text-gray-700 space-y-1 mt-3">
                  <p>Convert to rectangular: V1 = 10+j0, V2 = 0+j8, V3 = 0−j6</p>
                  <p>VS = 10 + j(8−6) = 10+j2</p>
                  <p>Magnitude: |VS| = √(100+4) = 10.20</p>
                  <p>Angle: θ = atan2(2,10) = 11.31°</p>
                  <p className="font-bold text-pink-900">Result: VS = 10.20∠11.31° V</p>
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-bold text-blue-900 mb-3">Example 2 — Series RL Impedance and Current</h3>
                <p className="text-gray-700 mb-2">R = 4 Ω, XL = 3 Ω, V = 10∠0° V. Find Z and I.</p>
                <div className="font-mono text-sm text-gray-700 space-y-1 mt-3">
                  <p>Z = 4+j3 → |Z| = √(16+9) = 5 Ω, θ = atan2(3,4) = 36.87°</p>
                  <p>→ Z = 5∠36.87° Ω</p>
                  <p>I = 10∠0° / 5∠36.87° = 2∠−36.87° A</p>
                  <p className="font-bold text-blue-900">Current lags voltage by 36.87° — load is inductive.</p>
                </div>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-bold text-green-900 mb-3">Example 3 — Phasor Multiplication</h3>
                <p className="text-gray-700 mb-2">I = 2∠−30° A, Z = 5∠45° Ω</p>
                <div className="font-mono text-sm text-gray-700 space-y-1 mt-3">
                  <p>V = I × Z = (2×5)∠(−30°+45°) = 10∠15° V</p>
                </div>
              </div>

              <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
                <h3 className="text-lg font-bold text-purple-900 mb-3">Example 4 — Power Factor Calculation</h3>
                <p className="text-gray-700 mb-2">V = 120∠0° V, I = 10∠−36.87° A</p>
                <div className="font-mono text-sm text-gray-700 space-y-1 mt-3">
                  <p>Power Factor = cos(0° − (−36.87°)) = cos(36.87°) = 0.8 (lagging)</p>
                  <p>Real Power P = 120 × 10 × 0.8 = 960 W</p>
                  <p>Reactive Power Q = 120 × 10 × sin(36.87°) = 720 VAR</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-amber-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-amber-900">
                <Lightbulb className="w-7 h-7 text-amber-600" />
                Exam Cheat Sheet
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="bg-amber-50 border-l-4 border-amber-600 p-4 rounded">
                <p className="text-gray-700 font-semibold mb-2">Conversion Formulas:</p>
                <p className="text-gray-700 font-mono text-sm">R = √(a²+b²) | θ = atan2(b,a) | a = R·cos(θ) | b = R·sin(θ) | Z = R·e^(jθ)</p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                <p className="text-gray-700 font-semibold mb-2">Arithmetic Rules:</p>
                <p className="text-gray-700 font-mono text-sm">Add/Subtract → Rectangular | Multiply → Polar (× magnitudes, + angles) | Divide → Polar (÷ magnitudes, − angles)</p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
                <p className="text-gray-700 font-semibold mb-2">Impedance Reference:</p>
                <p className="text-gray-700 font-mono text-sm">Resistor = R∠0° | Inductor = ωL∠90° | Capacitor = (1/ωC)∠−90°</p>
                <p className="text-gray-700 font-mono text-sm mt-1">V = I × Z | Power Factor = cos(θV − θI) | S = V·I*</p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-600 p-4 rounded">
                <p className="text-gray-700 font-semibold mb-2">Sinusoid Rules:</p>
                <p className="text-gray-700 font-mono text-sm">cos(ωt+φ) → Vm∠φ | sin(ωt+φ) → Vm∠(φ−90°) | ω = 2πf</p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
                <p className="text-gray-700 font-semibold mb-2">Key Rules:</p>
                <p className="text-gray-700 font-mono text-sm">ELI the ICE man | Resonance: VL cancels VC | Always atan2, never arctan | Peak vs RMS: Vrms = Vm/√2</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-rose-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-rose-50 to-red-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-rose-900">
                <Info className="w-7 h-7 text-rose-600" />
                Common Mistakes and Fixes
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-4">
                <div className="bg-rose-50 border-l-4 border-rose-600 p-4 rounded">
                  <p className="text-gray-700 font-semibold mb-1">Using arctan instead of atan2</p>
                  <p className="text-gray-700 text-sm">gives wrong angles in quadrants II, III, and IV.</p>
                  <p className="text-gray-700 text-sm mt-2"><strong>Fix:</strong> always use atan2(b,a) — Casio: Arg(), TI-84: angle() under MATH CPX.</p>
                </div>

                <div className="bg-rose-50 border-l-4 border-rose-600 p-4 rounded">
                  <p className="text-gray-700 font-semibold mb-1">Adding phasors directly in polar form</p>
                  <p className="text-gray-700 text-sm">is incorrect.</p>
                  <p className="text-gray-700 text-sm mt-2"><strong>Fix:</strong> convert to rectangular first, add, then convert back to polar.</p>
                </div>

                <div className="bg-rose-50 border-l-4 border-rose-600 p-4 rounded">
                  <p className="text-gray-700 font-semibold mb-1">Forgetting to convert sine to cosine</p>
                  <p className="text-gray-700 text-sm">before extraction.</p>
                  <p className="text-gray-700 text-sm mt-2"><strong>Fix:</strong> always subtract 90° from the phase angle of any sine signal before writing its phasor — make it a fixed first step.</p>
                </div>

                <div className="bg-rose-50 border-l-4 border-rose-600 p-4 rounded">
                  <p className="text-gray-700 font-semibold mb-1">Mixing peak and RMS values</p>
                  <p className="text-gray-700 text-sm">in the same problem.</p>
                  <p className="text-gray-700 text-sm mt-2"><strong>Fix:</strong> state at the start whether you are using peak or RMS and never mix the two. Power calculations use RMS (Vrms = Vm/√2).</p>
                </div>

                <div className="bg-rose-50 border-l-4 border-rose-600 p-4 rounded">
                  <p className="text-gray-700 font-semibold mb-1">Dropping frequency after phasor conversion</p>
                  <p className="text-gray-700 text-sm"><strong>Fix:</strong> keep ω noted separately and use it to compute XL = ωL and XC = 1/ωC before building impedance.</p>
                </div>

                <div className="bg-rose-50 border-l-4 border-rose-600 p-4 rounded">
                  <p className="text-gray-700 font-semibold mb-1">Mixing degrees and radians</p>
                  <p className="text-gray-700 text-sm">mid-calculation.</p>
                  <p className="text-gray-700 text-sm mt-2"><strong>Fix:</strong> set your calculator angle mode before starting every problem. If a result looks wrong, check mode first.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-cyan-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-cyan-50 to-teal-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-cyan-900">
                <Zap className="w-7 h-7 text-cyan-600" />
                Applications Beyond Power Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Phasors appear in any domain involving sinusoidal steady-state signals. In RF and telecommunications, signal constellations (QPSK, QAM) are plotted on the complex plane as discrete phasor points where angle encodes phase modulation and magnitude encodes amplitude modulation. In control systems, Bode plots and Nyquist plots track how a system's gain and phase shift vary with frequency — which is fundamentally phasor analysis across a frequency sweep.
              </p>

              <p className="text-gray-700 leading-relaxed">
                In mechanical vibration, displacement, velocity, and acceleration phasors are related by successive 90° phase shifts — velocity leads displacement by 90° and acceleration leads velocity by another 90°. The same complex-number framework appears in acoustics, optics, and quantum mechanics.
              </p>

              <p className="text-gray-700 leading-relaxed">
                In modern power grids, phasor measurement units (PMUs) installed at substations sample voltage and current phasors at 30 to 60 times per second, all GPS-timestamped. Comparing phase angles between distant nodes in real time reveals grid stress and instability far faster than traditional SCADA systems, which report data every 2 to 4 seconds.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-slate-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-slate-900">
                <Calculator className="w-7 h-7 text-slate-600" />
                Calculator Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="bg-slate-50 border-l-4 border-slate-600 p-4 rounded">
                <p className="text-gray-700 font-semibold mb-2">Casio fx-991EX / fx-570:</p>
                <p className="text-gray-700 text-sm">Press Mode → 2 for complex mode. Use Pol(a,b) for rectangular to polar, Rec(R,θ) for polar to rectangular. Shift+Abs for magnitude, Shift+Arg for phase angle. Press Shift → Rect or Polar to toggle display format.</p>
              </div>

              <div className="bg-slate-50 border-l-4 border-slate-600 p-4 rounded">
                <p className="text-gray-700 font-semibold mb-2">TI-84 Plus / TI-84 Plus CE:</p>
                <p className="text-gray-700 text-sm">Set angle mode under Mode first. Enter imaginary unit with 2nd → i. Use MATH → CPX for abs() (magnitude), angle() (phase), real(), imag(), and conj(). Type full complex expressions directly (3+4i)/(1−2i) returns results in complex form automatically.</p>
              </div>
            </CardContent>
          </Card>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="faq-1" className="border-2 border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:text-purple-600">
                What is a phasor?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pt-4">
                A phasor is a way to represent a sinusoidal AC signal using a complex number. It shows two important things: the amplitude (size) and the phase (angle) of the signal at a fixed frequency.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-2" className="border-2 border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:text-purple-600">
                Why do engineers use phasors?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pt-4">
                Engineers use phasors because they make AC circuit calculations much easier. Instead of solving difficult differential equations, phasors turn them into simple algebra problems using complex numbers.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-3" className="border-2 border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:text-purple-600">
                When should I use rectangular form and polar form?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pt-4">
                Rectangular form (a + jb) is best for addition and subtraction, because you can directly add real and imaginary parts. Polar form (magnitude ∠ angle) is better for multiplication and division, because you can multiply magnitudes and add angles easily.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-4" className="border-2 border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:text-purple-600">
                How do I convert a sine wave into a phasor?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pt-4">
                To convert a sine wave into a phasor, you subtract 90° from the phase angle. For example: v(t) = Vm·sin(ωt + φ) becomes Vm∠(φ − 90°). This works because sine can be written in terms of cosine.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-5" className="border-2 border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:text-purple-600">
                Why do engineers use "j" instead of "i"?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pt-4">
                In electrical engineering, i already represents current, so using it for imaginary numbers would be confusing. That's why engineers use j instead, which is the standard in all EE work.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-6" className="border-2 border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:text-purple-600">
                What is impedance?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pt-4">
                Impedance is the total opposition to AC current in a circuit. It is written as Z = R + jX, where R is resistance and X is reactance. Inductors and capacitors add reactance depending on frequency.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-7" className="border-2 border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:text-purple-600">
                What is the phasor domain?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pt-4">
                The phasor domain is a method where AC signals are converted from time-based equations into frequency-based equations. In this form, derivatives become multiplication by jω, making circuit analysis much simpler.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-8" className="border-2 border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:text-purple-600">
                What is power factor?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pt-4">
                Power factor is the cosine of the angle between voltage and current phasors (cos φ). It shows how efficiently power is being used. A power factor of 1 means all power is useful; lower values mean some energy is wasted in reactive components.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-9" className="border-2 border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:text-purple-600">
                How do I calculate the correct phasor angle?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pt-4">
                You should use the function atan2(imaginary, real) to find the angle. This is important because it correctly identifies the quadrant of the complex number. Simple arctan can give wrong results.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-10" className="border-2 border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:text-purple-600">
                What is the difference between RMS and peak phasors?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pt-4">
                Peak value is the maximum value of the waveform, while RMS is the effective value used for power calculations. RMS = Vm / √2. You must not mix peak and RMS values in the same calculation.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}
