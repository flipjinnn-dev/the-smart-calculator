"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PethTestCalculator from "@/components/peth-test-calculator"
import { Droplet, Calculator, Info, AlertCircle, BookOpen, TrendingDown, Clock, CheckCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function PethTestCalculatorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            PEth Test Calculator — Check PEth Level & Alcohol Clearance Date
          </h1>
        </div>

        <div className="mb-12 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl shadow-lg">
          <div className="flex items-start gap-4">
            <div className="bg-blue-600 text-white rounded-full p-3 flex-shrink-0">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-blue-900 mb-2">Quick Answer</h2>
              <p className="text-gray-700 leading-relaxed">
                A PEth test calculator estimates when your PEth level will drop below 20 ng/mL (negative cutoff) using your drinking history and ~4.5-day half-life. The PEth blood test detects alcohol for up to 28 days (~99% accuracy), and only time + abstinence can clear it.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <PethTestCalculator />
        </div>

        <div className="prose prose-lg max-w-none space-y-12">
          <Card className="border-2 border-blue-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-blue-900">
                <Droplet className="w-7 h-7 text-blue-600" />
                What Is a PEth Test?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                If you are preparing for an alcohol screening whether for a court order, medical program, or personal monitoring the PEth blood test is one of the most important tests you will face.
              </p>
              <p className="text-gray-700 leading-relaxed">
                So what exactly is it?
              </p>
              <p className="text-gray-700 leading-relaxed">
                PEth stands for <strong>Phosphatidylethanol</strong> a direct alcohol biomarker that forms inside your red blood cells only when ethanol enters your body. Your body cannot produce PEth from food, medication, mouthwash, or any other source. One cause only: you consumed alcohol.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This is exactly why doctors, courts, and transplant committees trust it over every other alcohol test available today.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Other blood markers like Gamma-GT or AST can rise from liver disease or medication. PEth cannot. It is specific, direct, and nearly impossible to fake.
              </p>
              
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                <h3 className="font-bold text-blue-900 mb-2">Key facts about the PEth blood test:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Detects alcohol consumption for up to 28 days after the last drink</li>
                  <li>• Approximately 99% sensitivity for heavy alcohol use</li>
                  <li>• Near-zero false positives from incidental exposure</li>
                  <li>• Blood sample only cannot be detected in urine, breath, or saliva</li>
                  <li>• Reports an exact concentration in ng/mL, not just positive or negative</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-indigo-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-indigo-900">
                <Calculator className="w-7 h-7 text-indigo-600" />
                What Is a PEth Test Calculator and Why Do You Need One?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                If you have a PEth test coming up for court, probation, a transplant program, or a workplace evaluation you need to know one thing above everything else:
              </p>
              <p className="text-xl font-semibold text-indigo-900 text-center my-4">
                Will I pass on my test date?
              </p>
              <p className="text-gray-700 leading-relaxed">
                That is exactly what a PEth test calculator answers.
              </p>
              <p className="text-gray-700 leading-relaxed">
                A peth calculator takes two key inputs your drinking intensity and the days since your last drink and applies the biological half-life formula to estimate your current PEth blood level and the date it falls below the negative threshold.
              </p>
              
              <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded">
                <h3 className="font-bold text-indigo-900 mb-2">Who uses a peth test calculator online:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• People preparing for court-ordered alcohol screening</li>
                  <li>• Individuals in probation or monitoring programs</li>
                  <li>• Patients in addiction treatment or transplant evaluation</li>
                  <li>• Anyone tracking their own sobriety with objective data</li>
                </ul>
              </div>

              <p className="text-gray-700 leading-relaxed">
                The calculator gives you a realistic timeline so you plan ahead instead of guessing and hoping. Think of it as your personal preparation tool — not a guarantee, but a reliable roadmap.
              </p>

              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Real talk:</strong> Many people assume they will pass a PEth test after 10 to 12 days of not drinking. The calculator shows them they are still positive — and that buffer time saves them from a serious mistake.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-purple-900">
                <TrendingDown className="w-7 h-7 text-purple-600" />
                PEth Level Calculator — What Your Results Actually Mean
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Before you run any numbers through a peth level calculator, you need to understand what each concentration means to a clinician. These are the interpretation thresholds used by SAMHSA, WHO, and major certified toxicology labs worldwide.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border-2 border-purple-200 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-purple-100">
                      <th className="border border-purple-200 p-3 text-left font-bold text-purple-900">PEth Level (ng/mL)</th>
                      <th className="border border-purple-200 p-3 text-left font-bold text-purple-900">Clinical Interpretation</th>
                      <th className="border border-purple-200 p-3 text-left font-bold text-purple-900">Test Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-green-50">
                      <td className="border border-purple-200 p-3">Less than 20 ng/mL</td>
                      <td className="border border-purple-200 p-3">Negative — consistent with abstinence</td>
                      <td className="border border-purple-200 p-3 font-bold text-green-600">CLEAN / NEGATIVE</td>
                    </tr>
                    <tr className="bg-yellow-50">
                      <td className="border border-purple-200 p-3">20 – 35 ng/mL</td>
                      <td className="border border-purple-200 p-3">Gray zone — very low or distant consumption</td>
                      <td className="border border-purple-200 p-3 font-bold text-yellow-600">BORDERLINE</td>
                    </tr>
                    <tr className="bg-orange-50">
                      <td className="border border-purple-200 p-3">35 – 200 ng/mL</td>
                      <td className="border border-purple-200 p-3">Moderate to social drinking in past 2–3 weeks</td>
                      <td className="border border-purple-200 p-3 font-bold text-orange-600">POSITIVE</td>
                    </tr>
                    <tr className="bg-red-50">
                      <td className="border border-purple-200 p-3">Above 200 ng/mL</td>
                      <td className="border border-purple-200 p-3">Heavy or chronic alcohol use</td>
                      <td className="border border-purple-200 p-3 font-bold text-red-600">HIGH POSITIVE</td>
                    </tr>
                    <tr className="bg-red-100">
                      <td className="border border-purple-200 p-3">Above 1,000 ng/mL</td>
                      <td className="border border-purple-200 p-3">Extreme chronic daily drinking</td>
                      <td className="border border-purple-200 p-3 font-bold text-red-700">CRITICAL</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-600 p-4 rounded">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Units note:</strong> Some labs report in ng/mL, others in µg/L. They are numerically identical — no conversion needed.
                </p>
              </div>

              <p className="text-gray-700 leading-relaxed">
                <strong>Real-world insight:</strong> Even occasional drinkers people who only drink on weekends regularly land between 20 and 80 ng/mL. The PEth blood test peth level calculator catches drinking patterns that patients consistently underestimate when talking to their doctors.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Most programs set the negative cutoff at 20 ng/mL. Stricter programs such as pre-liver transplant evaluations — use 10 ng/mL. Always confirm your exact threshold before drawing any conclusions from a calculator result.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-green-900">
                <Clock className="w-7 h-7 text-green-600" />
                PEth Half-Life Calculator — How Fast Does PEth Leave Your Body?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                This is the core science behind every peth half life calculator and peth elimination calculator tool available online.
              </p>
              <p className="text-gray-700 leading-relaxed">
                PEth elimination follows first-order kinetics it drops by a consistent percentage each day, not a fixed amount. Think of it like compound interest working in reverse.
              </p>
              
              <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
                <h3 className="font-bold text-green-900 mb-2">The formula every PEth calculator uses:</h3>
                <p className="text-lg font-mono bg-white p-3 rounded border border-green-200">
                  Current Level = Starting Level × (0.5) ^ (Days Elapsed ÷ Half-Life)
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  <strong>Average half-life:</strong> 4.5 days with a real-world range of 3 to 10 days depending on your age, red blood cell health, and individual metabolism.
                </p>
              </div>

              <h3 className="text-xl font-bold text-green-900 mt-6">PEth Elimination Calculator — Heavy Drinker at 200 ng/mL</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border-2 border-green-200 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-green-100">
                      <th className="border border-green-200 p-3 text-left font-bold text-green-900">Day</th>
                      <th className="border border-green-200 p-3 text-left font-bold text-green-900">Estimated PEth Level</th>
                      <th className="border border-green-200 p-3 text-left font-bold text-green-900">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-green-200 p-3">Day 0 — Last drink</td>
                      <td className="border border-green-200 p-3 font-semibold">200 ng/mL</td>
                      <td className="border border-green-200 p-3 text-red-600 font-semibold">Strongly positive</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-green-200 p-3">Day 4.5</td>
                      <td className="border border-green-200 p-3 font-semibold">100 ng/mL</td>
                      <td className="border border-green-200 p-3 text-orange-600 font-semibold">Still clearly positive</td>
                    </tr>
                    <tr>
                      <td className="border border-green-200 p-3">Day 9</td>
                      <td className="border border-green-200 p-3 font-semibold">50 ng/mL</td>
                      <td className="border border-green-200 p-3 text-yellow-600 font-semibold">Positive — moderate range</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-green-200 p-3">Day 13.5</td>
                      <td className="border border-green-200 p-3 font-semibold">25 ng/mL</td>
                      <td className="border border-green-200 p-3 text-yellow-700 font-semibold">Still positive — close to cutoff</td>
                    </tr>
                    <tr className="bg-green-100">
                      <td className="border border-green-200 p-3">Day 18</td>
                      <td className="border border-green-200 p-3 font-semibold">~12.5 ng/mL</td>
                      <td className="border border-green-200 p-3 text-green-600 font-bold">NEGATIVE — below 20 ng/mL</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-gray-700 leading-relaxed">
                For moderate or social drinkers starting between 40 and 80 ng/mL, clearance happens faster typically 7 to 12 days.
              </p>

              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Important experience-based note:</strong> In real clinical settings, individual half-life variation is significant. Some people clear faster; others take the full 10-day half-life. Always add a 3 to 5 day personal buffer beyond the calculator's projected clean date especially when a court date, custody hearing, or transplant evaluation is at stake.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-orange-900">
                <TrendingDown className="w-7 h-7 text-orange-600" />
                PEth Test Time Frame — How Far Back Can a PEth Test Detect Alcohol?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                The peth test time frame is not one fixed number for everyone. It depends entirely on how much you drank, how often, and for how long.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border-2 border-orange-200 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-orange-100">
                      <th className="border border-orange-200 p-3 text-left font-bold text-orange-900">Drinking Pattern</th>
                      <th className="border border-orange-200 p-3 text-left font-bold text-orange-900">Estimated Peak PEth Level</th>
                      <th className="border border-orange-200 p-3 text-left font-bold text-orange-900">Detection Window</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-orange-200 p-3">Single binge — 5+ drinks in one session</td>
                      <td className="border border-orange-200 p-3">20 – 80 ng/mL</td>
                      <td className="border border-orange-200 p-3 font-semibold">Up to 12 days</td>
                    </tr>
                    <tr className="bg-orange-50">
                      <td className="border border-orange-200 p-3">Light/occasional — 1 to 2 drinks, infrequent</td>
                      <td className="border border-orange-200 p-3">15 – 35 ng/mL</td>
                      <td className="border border-orange-200 p-3 font-semibold">5 – 10 days</td>
                    </tr>
                    <tr>
                      <td className="border border-orange-200 p-3">Moderate/social — few drinks, 2 to 3 times per week</td>
                      <td className="border border-orange-200 p-3">35 – 100 ng/mL</td>
                      <td className="border border-orange-200 p-3 font-semibold">7 – 14 days</td>
                    </tr>
                    <tr className="bg-orange-50">
                      <td className="border border-orange-200 p-3">Regular heavy — 4 to 6 drinks daily</td>
                      <td className="border border-orange-200 p-3">100 – 300 ng/mL</td>
                      <td className="border border-orange-200 p-3 font-semibold">14 – 21 days</td>
                    </tr>
                    <tr>
                      <td className="border border-orange-200 p-3">Chronic daily heavy drinking</td>
                      <td className="border border-orange-200 p-3">200 – 1,000+ ng/mL</td>
                      <td className="border border-orange-200 p-3 font-semibold text-red-600">Up to 28 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Why detox products do not work:</strong> PEth lives inside the membrane of red blood cells not dissolved in plasma or filtered through kidneys. Red blood cells survive 90 to 120 days naturally. PEth only clears as those cells die off and replace themselves. No water flush, supplement, or detox drink touches that process.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-red-900">
                <AlertCircle className="w-7 h-7 text-red-600" />
                Can a PEth Test Detect One Drink?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                This is one of the most searched questions about PEth testing and it deserves a straight, honest answer.
              </p>
              <p className="text-xl font-semibold text-red-900">
                Short answer: Yes, sometimes — but not always.
              </p>
              <p className="text-gray-700 leading-relaxed">
                PEth starts forming in red blood cells within 1 to 2 hours of your first drink. A single binge of 5 or more drinks reliably pushes PEth above the 20 ng/mL positive threshold within 8 to 24 hours and keeps it elevated for up to 12 days.
              </p>
              <p className="text-gray-700 leading-relaxed">
                One or two light drinks in a genuinely abstinent person may stay below the 20 ng/mL cutoff but three variables determine whether that is actually true for you:
              </p>
              
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-1">•</span>
                  <span><strong>Your baseline PEth level:</strong> If you were drinking recently and your level is already sitting at 15 ng/mL, one drink tips you over. If you have been fully abstinent for weeks and your true baseline is 3 to 5 ng/mL, one light drink likely clears within a few days without crossing the threshold.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-1">•</span>
                  <span><strong>Your body size and RBC metabolism:</strong> Smaller individuals with slower red blood cell turnover produce and retain more PEth per gram of alcohol than larger individuals.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-1">•</span>
                  <span><strong>Timing of your test:</strong> Testing 24 to 48 hours after one drink captures the peak. Testing 7 days later after a single light drink may show nothing.</span>
                </li>
              </ul>

              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  <strong>The bottom line for anyone in a formal testing program:</strong> Do not treat any single drink as safe. Zero alcohol is the only strategy that guarantees a clean result when a scheduled test is approaching.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-blue-900">
                <CheckCircle className="w-7 h-7 text-blue-600" />
                How Accurate Is a PEth Test?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                The PEth blood test consistently outperforms every other commonly used alcohol biomarker — and the numbers make it clear why.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border-2 border-blue-200 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="border border-blue-200 p-3 text-left font-bold text-blue-900">Test Type</th>
                      <th className="border border-blue-200 p-3 text-left font-bold text-blue-900">Sample</th>
                      <th className="border border-blue-200 p-3 text-left font-bold text-blue-900">Detection Window</th>
                      <th className="border border-blue-200 p-3 text-left font-bold text-blue-900">Sensitivity</th>
                      <th className="border border-blue-200 p-3 text-left font-bold text-blue-900">False Positive Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-blue-200 p-3">Breathalyzer</td>
                      <td className="border border-blue-200 p-3">Breath</td>
                      <td className="border border-blue-200 p-3">12 – 24 hours</td>
                      <td className="border border-blue-200 p-3">High (real-time only)</td>
                      <td className="border border-blue-200 p-3">Low</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border border-blue-200 p-3">ETG — Ethyl Glucuronide</td>
                      <td className="border border-blue-200 p-3">Urine</td>
                      <td className="border border-blue-200 p-3">72 – 80 hours</td>
                      <td className="border border-blue-200 p-3">High</td>
                      <td className="border border-blue-200 p-3">Moderate — mouthwash, sanitizer can trigger</td>
                    </tr>
                    <tr>
                      <td className="border border-blue-200 p-3">CDT — Carbohydrate-Deficient Transferrin</td>
                      <td className="border border-blue-200 p-3">Blood</td>
                      <td className="border border-blue-200 p-3">Weeks — chronic only</td>
                      <td className="border border-blue-200 p-3">Moderate</td>
                      <td className="border border-blue-200 p-3">Low</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-blue-200 p-3 font-bold">PEth — Phosphatidylethanol</td>
                      <td className="border border-blue-200 p-3 font-bold">Blood</td>
                      <td className="border border-blue-200 p-3 font-bold">Up to 28 days</td>
                      <td className="border border-blue-200 p-3 font-bold text-green-600">~99%</td>
                      <td className="border border-blue-200 p-3 font-bold text-green-600">Very Low</td>
                    </tr>
                    <tr>
                      <td className="border border-blue-200 p-3">EtG in Hair</td>
                      <td className="border border-blue-200 p-3">Hair</td>
                      <td className="border border-blue-200 p-3">Up to 90 days</td>
                      <td className="border border-blue-200 p-3">High</td>
                      <td className="border border-blue-200 p-3">Very Low</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-gray-700 leading-relaxed">
                PEth achieves ~99% sensitivity because your body produces it exclusively when ethanol is present. No food, medication, or accidental exposure creates a false positive.
              </p>

              <p className="text-gray-700 leading-relaxed">
                <strong>How sensitive is a PEth test for low-level drinking?</strong> Sensitive enough to detect moderate weekend drinking that CDT panels and liver enzyme tests miss entirely. Even people who considered themselves light social drinkers have tested positive in ranges that surprised their doctors and legal teams.
              </p>
            </CardContent>
          </Card>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="faq-1" className="border-2 border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:text-blue-600">
                What is a PEth test used for?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pt-4">
                The PEth blood test detects alcohol consumption over the past 2 to 4 weeks. Courts, doctors, transplant programs, and probation officers use it when they need reliable, long-window alcohol documentation that a breathalyzer or urine test cannot provide.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-2" className="border-2 border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:text-blue-600">
                How accurate is a PEth test?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pt-4">
                Approximately 99% sensitivity for heavy alcohol use with near-zero false positives. It is the most reliable multi-week alcohol biomarker test currently available in clinical practice.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-3" className="border-2 border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:text-blue-600">
                How far back can a PEth test detect alcohol?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pt-4">
                Up to 28 days for chronic heavy drinkers. Moderate drinkers typically clear in 7 to 14 days. A single binge episode clears in 5 to 12 days depending on individual half-life variation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-4" className="border-2 border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:text-blue-600">
                How long does a PEth test take to get results?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pt-4">
                Blood draw takes 5 minutes. Results return in 3 to 7 business days for standard processing, or 1 to 2 business days for expedited testing.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-5" className="border-2 border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:text-blue-600">
                Can a PEth test detect one drink?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pt-4">
                Sometimes a binge of 5 or more drinks reliably triggers a positive within 24 hours. One or two drinks in a truly abstinent person may stay below 20 ng/mL, but this depends on baseline level, body size, and test timing.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-6" className="border-2 border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:text-blue-600">
                Can I speed up PEth clearance?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pt-4">
                No. PEth is bound to red blood cell membranes. Water, exercise, supplements, and commercial detox products have zero effect. Complete abstinence and time are the only factors that reduce your level.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}
