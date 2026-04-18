"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ExtrapolationCalculator from "@/components/extrapolation-calculator"
import { Calculator, Info, BookOpen, TrendingUp, HelpCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function ExtrapolationCalculatorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Extrapolation Calculator
          </h1>
        </div>

        {/* Main Calculator Card */}
        <div className="mb-12">
          <Card className="border-2 border-purple-200 shadow-xl">
            <CardHeader className="py-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                Extrapolation Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <ExtrapolationCalculator />
            </CardContent>
          </Card>
        </div>

        {/* Quick Answer */}
        <div className="mb-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Info className="w-6 h-6 text-blue-600" />
            Quick Answer
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            An extrapolation calculator predicts a value outside a known data range by extending the existing trend. You enter two known points (X1, Y1) and (X2, Y2), and it quickly calculates the missing value using a formula.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* What Is Extrapolation Calculator */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-purple-600" />
              What Is an Extrapolation Calculator?
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                An extrapolation calculator is an online mathematical tool that predicts values beyond a known dataset by extending an existing trend line or curve. Unlike interpolation, which estimates values between two known data points, extrapolation works outside the known range forward into the future or backward into the past.
              </p>
              <p>
                You use this tool whenever you need to project a data trend beyond what has already been measured or observed. Scientists, engineers, financial analysts, medical researchers, and statisticians all rely on extrapolation calculations to forecast outcomes, validate models, and fill in unknown data points with confidence.
              </p>
              <p>
                This online extrapolation calculator supports linear extrapolation, the most widely used method, and it returns results with full step-by-step working so you understand exactly how the extrapolated value was reached.
              </p>
            </div>
          </div>

          {/* Extrapolation Formula */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Extrapolation Formula — The Core Equation</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>The standard linear extrapolation formula uses two known coordinate pairs to project a third unknown point. The formula is:</p>

              <div className="bg-white p-6 rounded-lg border-2 border-purple-300 my-4">
                <p className="text-2xl font-bold text-center text-purple-600 mb-4">
                  Y3 = Y1 + [(X3 - X1) / (X2 - X1)] × (Y2 - Y1)
                </p>
              </div>

              <p>Each variable plays a specific role in the extrapolation calculation:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>X1 and Y1</strong> represent the first known data point on the trend line.</li>
                <li><strong>X2 and Y2</strong> represent the second known data point that confirms the direction of the trend.</li>
                <li><strong>X3</strong> is the target value outside the known range for which you want to find the corresponding Y3.</li>
                <li>The slope between the two known points, calculated as (Y2 - Y1) / (X2 - X1), is assumed to remain constant as the line extends beyond the measured range.</li>
              </ul>

              <p className="mt-4">
                To solve for X3 when Y3 is known instead, you rearrange the formula: <strong>X3 = X1 + [(Y3 - Y1) / slope]</strong>
              </p>

              <p>
                This extrapolation equation calculator applies these formulas automatically. You input your known values, and the tool computes the extrapolated value along with every intermediate calculation step.
              </p>
            </div>
          </div>

          {/* How to Use */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use the Extrapolation Calculator with Steps</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>Using this extrapolation calculator online is straightforward. Follow these steps to get accurate results every time.</p>

              <div className="space-y-4 mt-6">
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                  <h3 className="font-bold text-gray-900 mb-2">Step 1 — Enter Your First Known Data Point</h3>
                  <p>Type the X1 and Y1 values from your dataset into the designated input fields. These two values form the first anchor point of your trend line.</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                  <h3 className="font-bold text-gray-900 mb-2">Step 2 — Enter Your Second Known Data Point</h3>
                  <p>Type the X2 and Y2 values. These confirm the slope and direction of the trend you want to extend.</p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                  <h3 className="font-bold text-gray-900 mb-2">Step 3 — Enter the Target X3 or Y3 Value</h3>
                  <p>Input the X value for which you want to find the extrapolated Y, or input the Y value for which you want to find the extrapolated X. The calculator accepts both directions.</p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-600">
                  <h3 className="font-bold text-gray-900 mb-2">Step 4 — Read Your Extrapolated Value</h3>
                  <p>The calculator instantly applies the linear extrapolation formula, displays the extrapolated value, and shows the step-by-step solution so you can verify the working and use the same method manually or in Excel.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Linear Extrapolation Calculator — Extrapolation Formula Example</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>Understanding a worked example makes the extrapolation formula much clearer. Here is a practical extrapolation formula example that demonstrates how the calculation works from start to finish.</p>

              <p className="font-semibold mt-4">Suppose a company records monthly sales revenue over two months:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Month 1 (X1 = 1): Revenue Y1 = $20,000</li>
                <li>Month 2 (X2 = 2): Revenue Y2 = $26,000</li>
                <li>Target Month (X3 = 5): What will revenue Y3 be?</li>
              </ul>

              <p className="font-semibold mt-4">Apply the linear extrapolation formula:</p>
              <div className="bg-white p-4 rounded-lg my-4 font-mono text-sm border-2 border-green-300">
                <p>Y3 = 20,000 + [(5 - 1) / (2 - 1)] × (26,000 - 20,000)</p>
                <p>Y3 = 20,000 + [4 / 1] × 6,000</p>
                <p>Y3 = 20,000 + 24,000</p>
                <p className="text-xl font-bold text-green-600 mt-2">Y3 = $44,000</p>
              </div>

              <p>
                This linear extrapolation calculator performs this exact sequence of calculations for any dataset you enter. The step-by-step output shows the slope computation, the multiplier, and the final extrapolated value making it a reliable extrapolation calculator with steps for students, analysts, and professionals alike.
              </p>
            </div>
          </div>

          {/* Types of Extrapolation */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Types of Extrapolation Methods</h2>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>Different datasets require different extrapolation approaches. This section covers the three main types and explains when each method produces the most reliable extrapolated values.</p>

              <div className="space-y-6 mt-6">
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Linear Extrapolation</h3>
                  <p>
                    Linear extrapolation extends a straight line beyond two known data points using a constant slope. It works best when data shows a consistent, proportional rate of change with no signs of acceleration or deceleration. This is the method behind every linear extrapolation calculator online, including this one. It requires only two known points and produces clean, easy-to-interpret results.
                  </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Polynomial Extrapolation</h3>
                  <p>
                    Polynomial extrapolation fits a curved polynomial function through three or more known data points and extends that curve beyond the measured range. It handles nonlinear trends more accurately than a straight line when the data accelerates or decelerates. However, polynomial curves can become unstable far from the known data range a phenomenon known as Runge's phenomenon which makes this a non-linear extrapolation method that demands careful validation.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Exponential Extrapolation</h3>
                  <p>
                    Exponential extrapolation applies when data grows or decays at a rate proportional to its current value, such as population growth, compound interest, radioactive decay, and viral spread. An exponential extrapolation calculator fits an exponential function through the known data and projects values along that curve. The formula involves natural logarithms and the base of the natural exponent (e), making it distinct from linear extrapolation in both approach and result.
                  </p>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-600">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Richardson Extrapolation</h3>
                  <p>
                    Richardson extrapolation is a numerical analysis technique that combines estimates computed at different step sizes to eliminate leading error terms and produce a significantly more accurate result. Engineers and mathematicians use a Richardson extrapolation calculator when working with finite difference methods, numerical integration, and convergence acceleration. It does not predict future real-world values it improves the precision of mathematical approximations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Extrapolation vs Interpolation */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Extrapolation vs. Interpolation</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                The interpolation and extrapolation calculator serves two related but distinct purposes, and understanding the difference helps you choose the right method for your dataset.
              </p>
              <p>
                <strong>Interpolation</strong> estimates a value that falls between two known data points within the measured range. Because known values exist on both sides of the estimate, interpolation is inherently more reliable and carries lower uncertainty. You use an interpolation extrapolation calculator for gap-filling within a dataset for example, estimating a temperature reading at 2:30 PM when you have readings at 2:00 PM and 3:00 PM.
              </p>
              <p>
                <strong>Extrapolation</strong>, by contrast, estimates a value that falls outside the known range entirely. The estimate has no boundary data on the far side to constrain it, which means prediction error grows the further you move from the measured data. Extrapolation works best for short-range projections generally within 10 to 20 percent of the span of your known x-range. Beyond 50 percent of that span, you should validate the underlying trend assumption with additional data or domain knowledge before relying on the extrapolated value.
              </p>
            </div>
          </div>

          {/* Retrograde Extrapolation */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Retrograde Extrapolation Calculator — BAC Back Extrapolation</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Retrograde extrapolation is a specialized application of extrapolation used primarily in forensic toxicology, pharmacology, and legal contexts involving blood alcohol concentration (BAC). A retrograde extrapolation calculator also called a BAC retrograde extrapolation calculator or blood alcohol retrograde extrapolation calculator works backward in time from a known BAC measurement to estimate what the BAC was at an earlier point, such as the time of driving or the time of an incident.
              </p>
              <p>
                This type of calculation relies on the known elimination rate of alcohol from the bloodstream, which averages approximately 0.015% to 0.020% BAC per hour in most adults, though individual metabolism rates vary based on weight, sex, liver function, and drinking pattern. A BAC back extrapolation calculator applies the elimination rate over the elapsed time to project the earlier BAC value.
              </p>
              <p>
                For example, if a breathalyzer measures a BAC of 0.06% two hours after driving, and the individual's elimination rate is 0.018% per hour, the retrograde extrapolation calculation estimates the BAC at the time of driving as: <strong>0.06 + (2 × 0.018) = 0.096%</strong>.
              </p>
              <p>
                This bac retrograde extrapolation calculator approach is used in DUI defense and prosecution, accident reconstruction, workplace safety investigations, and insurance liability cases. Courts and toxicologists treat retrograde extrapolated BAC values as estimates rather than exact measurements because elimination rates vary between individuals and across drinking episodes.
              </p>
            </div>
          </div>

          {/* Vancomycin */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Vancomycin Extrapolated Trough Calculator</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                The vancomycin extrapolated trough calculator applies pharmacokinetic extrapolation to clinical antibiotic dosing. Vancomycin is a glycopeptide antibiotic used to treat serious infections caused by gram-positive bacteria, including MRSA. Clinical pharmacists use a vancomycin extrapolated trough calculator to estimate the trough concentration the lowest drug level before the next dose — when a measured trough sample is drawn at a time other than the standard pre-dose window.
              </p>
              <p>
                The calculation uses the drug's elimination rate constant (Ke), derived from two measured drug levels at known times, to extrapolate backward or forward to the true trough time. This ensures that dosing adjustments reflect the actual pharmacokinetic behavior of the drug in that specific patient rather than relying on population averages. The vancomycin extrapolated trough calculator is an essential clinical tool in hospital pharmacies and intensive care units where precise antibiotic dosing directly affects patient outcomes.
              </p>
            </div>
          </div>

          {/* Excel */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Calculate Extrapolation in Excel</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>You can perform a linear extrapolation calculation in Excel without an online calculator. Here is how to calculate extrapolation in Excel using two methods.</p>

              <div className="space-y-6 mt-6">
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Method 1 — Manual Formula Entry</h3>
                  <p>Enter your two known data points in cells A1:B2 (X1, Y1 in row 1 and X2, Y2 in row 2). Enter your target X3 value in cell A3. In cell B3, type this extrapolation calculator Excel formula:</p>
                  <div className="bg-white p-3 rounded mt-2 font-mono text-sm border border-blue-300">
                    =B1 + ((A3 - A1) / (A2 - A1)) * (B2 - B1)
                  </div>
                  <p className="mt-2">Excel returns the extrapolated Y3 value immediately. This approach mirrors the manual linear extrapolation formula exactly and works for any pair of known data points.</p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Method 2 — FORECAST or FORECAST.LINEAR Function</h3>
                  <p>Excel's built-in FORECAST.LINEAR function performs linear extrapolation across a full dataset. The syntax is:</p>
                  <div className="bg-white p-3 rounded mt-2 font-mono text-sm border border-green-300">
                    =FORECAST.LINEAR(x, known_ys, known_xs)
                  </div>
                  <p className="mt-2">You supply the target X value, the array of known Y values, and the array of known X values. Excel fits a least-squares regression line through all known points and returns the extrapolated value at your target X. This is the preferred linear extrapolation calculator Excel method when you have more than two known data points.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Applications */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Applications of Extrapolation Across Industries</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>Extrapolation calculation serves critical real-world functions across a wide range of professional fields. Below are the most significant application areas where accurate extrapolated values drive important decisions.</p>

              <div className="space-y-4 mt-6">
                <div className="bg-white p-4 rounded-lg border-l-4 border-blue-600">
                  <h3 className="font-bold text-gray-900 mb-2">Finance and Economics</h3>
                  <p>Financial analysts use linear extrapolation to extend yield curves beyond the last available maturity, project revenue growth into future quarters, and estimate forward interest rates. Economists extrapolate GDP growth trends and inflation rates from current data to model future economic conditions. The extrapolation formula calculator supports these calculations when only two anchor data points define the trend.</p>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-green-600">
                  <h3 className="font-bold text-gray-900 mb-2">Climate Science and Environmental Research</h3>
                  <p>Climate scientists extrapolate historical temperature anomaly data to project future warming trajectories. Sea level rise models, glacial retreat timelines, and Arctic ice coverage projections all rely on extrapolation calculations grounded in decades of measured data. These projections carry wide confidence intervals because the extrapolated range spans decades, illustrating precisely why accuracy decreases with distance from the known data range.</p>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-purple-600">
                  <h3 className="font-bold text-gray-900 mb-2">Demographics and Population Studies</h3>
                  <p>Demographers extrapolate census data to estimate population size between official count years and to project future population figures for urban planning, infrastructure investment, and resource allocation. A data extrapolation calculator applied to census figures allows city planners to determine how many schools, hospitals, and transport links a growing population will require in ten or twenty years.</p>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-orange-600">
                  <h3 className="font-bold text-gray-900 mb-2">Engineering and Materials Science</h3>
                  <p>Engineers extrapolate laboratory stress-test results beyond the tested range to predict material fatigue life, structural load limits, and equipment failure thresholds. Because physical testing has practical limits, extrapolation data calculators allow engineers to make evidence-based predictions about performance under conditions that have not been directly measured.</p>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-pink-600">
                  <h3 className="font-bold text-gray-900 mb-2">Medicine and Pharmacology</h3>
                  <p>Beyond vancomycin dosing, pharmacokinetic extrapolation applies to every drug that follows predictable absorption and elimination kinetics. Clinicians use extrapolation equation calculators to estimate drug plasma concentrations outside the sampling window, determine washout periods, assess overdose timelines, and predict when a drug's concentration will fall below therapeutic threshold. An extrapolate data calculator in this context can directly influence treatment decisions.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Accuracy and Limitations */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Accuracy, Limitations, and Best Practices</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>Every extrapolation calculation carries inherent uncertainty. Understanding how accuracy degrades helps you apply the results responsibly.</p>

              <p>
                Prediction error in linear extrapolation scales with the squared distance from the center of the known x-range. If you double the distance beyond your data, prediction error variance roughly quadruples. This means that a short-range extrapolation projecting 10 percent beyond the known range is dramatically more reliable than projecting 100 percent beyond it.
              </p>

              <p>
                The most common source of extrapolation failure is a structural change in the underlying trend. A historically famous example: in 1894, a London newspaper extrapolated the city's horse population at a constant linear rate and concluded the streets would lie under nine feet of manure by 1950. The automobile arrived within a decade, invalidating the entire assumed trend. This case illustrates why every extrapolated value is only as valid as the assumption that the trend continues in the same form beyond the measured range.
              </p>

              <p>
                Best practices for reliable extrapolation include limiting projections to within 20 percent of the known data span, using residual analysis to confirm that the chosen model (linear, polynomial, exponential) actually fits the data well, cross-validating results against domain knowledge or alternative models, and reporting confidence intervals alongside point estimates rather than presenting a single extrapolated figure as certain.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-purple-600" />
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  What is an extrapolation calculator used for?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  It predicts values outside a known dataset by extending existing trends to estimate future outcomes in finance, science, and engineering.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  What is the linear extrapolation formula?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  It uses two known points to calculate a straight-line trend and extend it: Y3 = Y1 + [(X3 - X1) / (X2 - X1)] × (Y2 - Y1)
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How is extrapolation different from interpolation?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Interpolation predicts values within known data, while extrapolation predicts values outside the known range with higher uncertainty.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  What is retrograde extrapolation in BAC calculations?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  It estimates past blood alcohol levels by working backward from a known BAC using the alcohol elimination rate and time.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How do I perform extrapolation in Excel?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Use formulas like FORECAST.LINEAR or simple coordinate formulas to predict values based on existing data points.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Difference between exponential and linear extrapolation?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Linear uses a constant change rate, while exponential uses percentage-based growth or decay over time.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  What is Richardson extrapolation?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  It is a numerical method used in mathematics to improve accuracy by combining multiple approximations, not for real-world forecasting.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How accurate is extrapolation?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Accuracy depends on data quality and distance of prediction short-range forecasts are more reliable than long-range ones.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
