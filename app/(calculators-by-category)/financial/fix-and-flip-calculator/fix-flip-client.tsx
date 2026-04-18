"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FixAndFlipCalculator from "@/components/fix-and-flip-calculator"
import { Home, Calculator, Info, BookOpen, CheckCircle, AlertTriangle, TrendingUp, DollarSign, HelpCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FixAndFlipCalculatorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
            Fix and Flip Calculator
          </h1>
        </div>

        {/* Main Calculator Card */}
        <div className="mb-12">
          <Card className="border-2 border-blue-200 shadow-xl">
            <CardHeader className="py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                Fix and Flip Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <FixAndFlipCalculator />
            </CardContent>
          </Card>
        </div>

        {/* Quick Answer */}
        <div className="mb-12 p-6 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Info className="w-6 h-6 text-green-600" />
            QUICK ANSWER
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            A fix and flip calculator (property flip or real estate deal calculator) helps investors quickly estimate profit, ROI, and all costs like purchase, rehab, financing, holding, and selling so they can instantly see if a deal is profitable or not.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* What Is Section */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              What Is a Fix and Flip Calculator?
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                A fix and flip calculator, also known as a property flip calculator or real estate deal calculator, is a real estate investment tool that lets you analyze the full financial picture of a property deal in seconds.
              </p>
              <p>
                Instead of guessing whether a house will generate profit after repairs, this house flipping calculator lets you enter your key numbers and instantly shows estimated net profit, total project cost, ROI, and cash-on-cash return.
              </p>
              <p>
                Experienced investors never skip this step. Whether you use a free fix and flip calculator online, a fix and flip calculator Excel template, a fix and flip calculator Google Sheets version, or a dedicated fix and flip calculator app, the goal stays the same know your numbers before you invest.
              </p>
              <p>
                This tool becomes even more important when working with a hard money loan or hard money fix and flip loan, where interest rates and fees can quickly impact your overall profit.
              </p>
            </div>
          </div>

          {/* Why You Need Section */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              Why You Need a Fix and Flip Deal Calculator on Every Single Deal
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Many new investors lose money on their first flip not because of bad execution they lose because they skipped the calculator step. Here is what happens in real deals:
              </p>
              <p>
                You find a distressed property listed at $120,000. You estimate $40,000 in renovation costs. You project an ARV of $220,000. That sounds like $60,000 in profit. But when you factor in loan origination points (2–3%), monthly interest on a hard money loan (9–12% annualized), holding costs for 5 to 7 months, real estate agent commissions (5–6%), closing costs, property taxes, insurance, and utilities your actual net profit might be $18,000 to $24,000. Or it might be a loss.
              </p>
              <p>
                A fix and flip profit calculator surfaces that reality before you sign the purchase agreement. That is why every serious real estate investor from beginners to seasoned flippers on BiggerPockets runs every deal through a calculator first.
              </p>
            </div>
          </div>

          {/* How to Use Section */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use the Fix and Flip Calculator</h2>
            <p className="text-gray-700 mb-6">Follow these steps to get accurate results from any fix and flip real estate calculator:</p>
            
            <div className="space-y-6">
              <div className="p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-600">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Step 1 — Enter the Purchase Price</h3>
                <p className="text-gray-700">This is the price you pay (or plan to offer) for the property. Be realistic. Overpaying on the front end is the number one way to destroy profit margins on a flip.</p>
              </div>

              <div className="p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-600">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Step 2 — Enter the After Repair Value (ARV)</h3>
                <p className="text-gray-700">The After Repair Value is the estimated market value of the property after you complete all renovations. This is the single most important number in a fix and flip ARV calculator. Pull comparable sold properties (comps) within 0.5 miles, same bed/bath count, similar square footage, sold within the last 90 days. If your ARV is inflated, your entire profit projection becomes fiction.</p>
              </div>

              <div className="p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-600">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Step 3 — Enter the Renovation and Rehab Costs</h3>
                <p className="text-gray-700">Use your fix and flip rehab calculator or repair calculator to estimate all renovation costs. Include materials, labor, permits, unexpected overruns (always add a 10–15% contingency buffer), and any contractor bids you have received. Underestimating rehab costs is the second most common reason flips fail.</p>
              </div>

              <div className="p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-600">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Step 4 — Enter Your Financing Details</h3>
                <div className="text-gray-700">
                  <p className="mb-2">If you are using a hard money fix and flip loan, enter:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Loan amount (typically 70–80% of purchase price or 65–70% of ARV)</li>
                    <li>Annual interest rate (commonly 9%–13% for hard money loans)</li>
                    <li>Loan origination points (1–3 points upfront)</li>
                    <li>Other lender fees (underwriting, appraisal, processing)</li>
                    <li>Your down payment percentage</li>
                  </ul>
                  <p className="mt-2">The fix and flip loan calculator or fix and flip mortgage calculator section will compute your total financing cost automatically.</p>
                </div>
              </div>

              <div className="p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-600">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Step 5 — Enter Holding Costs</h3>
                <div className="text-gray-700">
                  <p className="mb-2">Holding costs accumulate every month you own the property before selling it. Enter your monthly figures for:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Property taxes</li>
                    <li>Homeowner's insurance</li>
                    <li>Utilities (electricity, water, gas)</li>
                    <li>HOA fees (if applicable)</li>
                    <li>Any property management fees</li>
                    <li>Your loan interest payment</li>
                  </ul>
                  <p className="mt-2">A fix and flip house calculator will multiply these monthly costs by your projected holding period (typically 4–8 months for most flips).</p>
                </div>
              </div>

              <div className="p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-600">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Step 6 — Enter Selling Costs</h3>
                <p className="text-gray-700">When you sell, you pay real estate agent commissions (typically 5–6% of the sale price), closing costs (1–3%), transfer taxes, and staging costs. Enter this as a percentage of your ARV. Most experienced investors budget 8–10% of ARV total for selling costs.</p>
              </div>

              <div className="p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-600">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Step 7 — Review Your Profit and ROI</h3>
                <div className="text-gray-700">
                  <p className="mb-2">A good fix and flip ROI calculator will show you:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Gross Profit = ARV minus Purchase Price minus Renovation Costs</li>
                    <li>Net Profit = Gross Profit minus Financing Costs minus Holding Costs minus Selling Costs</li>
                    <li>ROI = Net Profit divided by Total Cash Invested × 100</li>
                    <li>Cash-on-Cash Return = Net Profit divided by your actual cash out of pocket × 100</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* ARV Calculator Section */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Fix and Flip ARV Calculator — How to Calculate ARV the Right Way</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                ARV is not a guess. It is a data-driven estimate based on comparable sold properties in the same neighborhood. Here is the professional method real estate investors and appraisers use:
              </p>
              <div className="bg-white p-5 rounded-lg border-2 border-purple-300">
                <h3 className="font-bold text-lg mb-3">Find three to five recently sold homes (within 90 days) that are:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Within half a mile of your subject property</li>
                  <li>Similar in bed count, bath count, and square footage (within 10–15%)</li>
                  <li>In similar or renovated condition</li>
                  <li>On similar lot sizes</li>
                </ul>
              </div>
              <p>
                Calculate the average price per square foot of those comps. Multiply that figure by your subject property's square footage. That is your baseline ARV.
              </p>
              <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-600">
                <p className="font-semibold mb-2">Example:</p>
                <p>If comps average $175 per square foot and your renovated property will be 1,400 square feet, your ARV is $245,000.</p>
              </div>
              <p>
                You then apply the 70% Rule (explained below) to determine the Maximum Allowable Offer (MAO).
              </p>
            </div>
          </div>

          {/* 70% Rule Section */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The 70% Rule — The Wholesaling Fix and Flip Buy Formula Calculator</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                The 70% Rule is the fastest deal-screening formula in fix and flip real estate investing. It tells you the maximum price you should pay for a property. Here is the formula:
              </p>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-2 border-green-300 text-center">
                <p className="text-2xl font-bold text-gray-900 mb-2">Maximum Allowable Offer (MAO) = (ARV × 0.70) − Estimated Renovation Costs</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
                <h3 className="font-bold text-lg mb-3">Example:</h3>
                <div className="space-y-2">
                  <p>ARV = $250,000</p>
                  <p>Renovation Costs = $40,000</p>
                  <p>MAO = ($250,000 × 0.70) − $40,000</p>
                  <p>MAO = $175,000 − $40,000 = <span className="font-bold text-green-600">$135,000</span></p>
                </div>
              </div>
              <p>
                You should not pay more than $135,000 for this property. This formula is popular on BiggerPockets and is the basis for the wholesaling fix and flip buy formula calculator that many investors use when screening dozens of leads quickly.
              </p>
              <p>
                The 70% rule builds in enough margin to cover financing costs, holding costs, selling costs, and still leave a profitable return. Some investors in high-cost markets use 65%, while investors in competitive markets with thin inventory sometimes stretch to 75%.
              </p>
            </div>
          </div>

          {/* ROI Section */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Fix and Flip ROI Calculator — What Is a Good ROI on a Flip?</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                A good fix and flip project targets a minimum net profit of $25,000 to $40,000 or a minimum ROI of 10–20% on total cash invested, depending on your market and experience level.
              </p>
              <div className="bg-white p-6 rounded-lg border-2 border-green-300">
                <h3 className="font-bold text-lg mb-3">Practical benchmark breakdown:</h3>
                <div className="space-y-2">
                  <p><span className="font-semibold">Beginner target:</span> 10–15% ROI per deal</p>
                  <p><span className="font-semibold">Experienced investor target:</span> 20–30% ROI per deal</p>
                  <p><span className="font-semibold">Elite flippers in high-volume markets:</span> 30%+ ROI</p>
                </div>
              </div>
              <p>
                Cash-on-cash return matters more when you use financing. If you invest $50,000 of your own cash on a deal that returns $15,000 net profit, your cash-on-cash return is 30% — even if your total ROI on the full project cost is only 12%.
              </p>
              <p>
                Always run both figures through your fix and flip ROI calculator so you fully understand the performance of your capital.
              </p>
            </div>
          </div>

          {/* Hard Money Loan Section */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Fix and Flip Loan Calculator — Understanding Hard Money and Bridge Loan Costs</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Most fix and flip investors use hard money loans or bridge loans to finance their deals. These short-term loans come from private lenders and carry different cost structures than conventional mortgages. Your fix and flip loan calculator must account for:
              </p>
              
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-lg border-2 border-orange-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Hard Money Loan Terms You Must Know</h3>
                <div className="space-y-3">
                  <p><span className="font-semibold">Loan-to-Value (LTV):</span> Hard money lenders typically lend 65–80% of the ARV or purchase price, whichever is lower.</p>
                  <p><span className="font-semibold">Interest Rate:</span> Rates generally range from 9% to 13% per year, paid monthly as interest-only during the hold period.</p>
                  <p><span className="font-semibold">Origination Points:</span> Lenders charge 1–3 points upfront (1 point = 1% of the loan amount). On a $150,000 loan, 2 points = $3,000 upfront.</p>
                  <p><span className="font-semibold">Loan Term:</span> Most hard money fix and flip loans run 6 to 12 months, with extensions available.</p>
                  <p><span className="font-semibold">Draw Schedule:</span> For renovation funding, lenders often release funds in draws tied to completed construction milestones.</p>
                </div>
              </div>
              <p>
                The hard money loan fix and flip calculator section of your deal analysis should clearly show total financing costs so you do not underestimate your all-in cost.
              </p>
            </div>
          </div>

          {/* Calculator Comparison Section */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Fix and Flip Calculator Excel vs. Google Sheets vs. Online Calculator vs. App</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-lg border-l-4 border-blue-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Fix and Flip Calculator Excel</h3>
                <p className="text-gray-700">
                  A fix and flip calculator Excel template gives you maximum customization. You can build in your own formulas, add scenario tabs, and model best-case, base-case, and worst-case projections. Many free fix and flip calculator Excel downloads are available online, including from communities like BiggerPockets. The downside is that Excel files require manual updates and are harder to share on mobile.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg border-l-4 border-green-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Fix and Flip Calculator Excel Free Download</h3>
                <p className="text-gray-700">
                  Free Excel templates work well for investors who are comfortable with spreadsheets. Look for templates that include ARV calculation, rehab cost estimator, loan cost breakdown, holding cost tracker, and a profit summary tab.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg border-l-4 border-purple-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Fix and Flip Calculator Google Sheets</h3>
                <p className="text-gray-700">
                  A fix and flip calculator Google Sheets version gives you cloud access from any device, easy sharing with business partners, and real-time collaboration. Many investors prefer Google Sheets because their contractor, lender, and partner can all view the same deal model simultaneously.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg border-l-4 border-orange-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Fix and Flip Calculator App</h3>
                <p className="text-gray-700">
                  Dedicated apps like DealCheck, FlipperForce, and others allow you to analyze deals on your phone while you stand in front of a property. These apps connect ARV comps, rehab estimates, and financing inputs in one interface.
                </p>
              </div>

              <div className="bg-white p-5 rounded-lg border-l-4 border-teal-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Best Fix and Flip Calculator Online</h3>
                <p className="text-gray-700">
                  Free online fix and flip calculators like the one on this page give you instant results without downloading anything. They are best for quick deal screening before you commit time to deeper analysis.
                </p>
              </div>
            </div>
          </div>

          {/* Spreadsheet Section */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Fix and Flip Spreadsheet — What Should It Include?</h2>
            <p className="text-gray-700 mb-4">A complete fix and flip calculator spreadsheet covers seven core areas:</p>
            <div className="space-y-3">
              {[
                "Property acquisition costs (purchase price, closing costs, title fees)",
                "After Repair Value (ARV) based on market comps",
                "Renovation and rehab budget (itemized by category — kitchen, bathrooms, roof, HVAC, flooring, etc.)",
                "Financing costs (hard money loan interest, points, fees, down payment)",
                "Holding costs (taxes, insurance, utilities, per month × number of months)",
                "Selling costs (agent commissions, closing costs, transfer taxes)",
                "Net profit, ROI, and cash-on-cash return summary"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-700 mt-4">
              Any fix and flip calculator spreadsheet that skips even one of these areas will give you a distorted profit projection.
            </p>
          </div>

          {/* Common Mistakes Section */}
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              Common Mistakes Investors Make Without a Fix and Flip Calculator
            </h2>
            <p className="text-gray-700 mb-4">Experienced investors who have done 50+ flips share these recurring patterns they see in beginners who skip the calculator:</p>
            <div className="space-y-3">
              {[
                "They underestimate rehab costs by 30–40% because they only get one contractor quote and do not account for hidden damage (mold, foundation issues, outdated electrical systems).",
                "They inflate ARV by comparing renovated homes without adjusting for their specific location, lot size, or neighborhood condition.",
                "They ignore holding costs — carrying costs on a 7-month flip with a 12% hard money loan can easily reach $12,000 to $20,000 alone.",
                "They forget selling costs — a $220,000 sale with 6% commission and 2% closing costs removes $17,600 from profit before you collect a dollar.",
                "They do not stress-test the deal — they only model the best case. Always model what happens if ARV comes in 10% lower or rehab costs run 20% over."
              ].map((mistake, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg border-l-4 border-red-500">
                  <span className="text-red-600 font-bold flex-shrink-0">✗</span>
                  <p className="text-gray-700">{mistake}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Experience-Based Tips */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-yellow-600" />
              Experience-Based Tips From Active Fix and Flip Investors
            </h2>
            <p className="text-gray-700 mb-4">Based on real investor experience across hundreds of deals, here are the practices that consistently protect profit margins:</p>
            <div className="space-y-3">
              {[
                "Always get three contractor bids before finalizing your rehab budget. Bids vary wildly, and the cheapest bid is rarely the best choice it is often the one that generates costly change orders later.",
                "Use the 70% rule as your quick filter but always build a full fix and flip deal calculator analysis before you make an offer. The 70% rule screens out bad deals fast it does not confirm good ones.",
                "Track actual costs vs. projected costs on every deal. After your first three flips, you will know exactly where your estimates tend to run over. That experience makes your future calculations far more accurate.",
                "Know your exit strategy before you close. Are you selling retail to owner-occupant buyers? Selling to another investor? Renting instead of selling? Each exit path affects your target ARV, holding period, and profit calculation differently."
              ].map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg border-l-4 border-yellow-500">
                  <span className="text-yellow-600 font-bold flex-shrink-0">💡</span>
                  <p className="text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-blue-600" />
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  What is the best free fix and flip calculator?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  The best free fix and flip calculator includes all key costs: purchase price, ARV, rehab, financing, holding, and selling costs. It should clearly show net profit and ROI. Excel, Google Sheets, and online tools all work if they are complete.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  What is ARV in a fix and flip calculator?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  ARV (After Repair Value) is the estimated value of a property after renovations. It is based on comparable sales in the area. This is the most important number because all profit calculations depend on it.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How does the 70% rule work in a fix and flip?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  The 70% rule calculates your maximum offer: (ARV × 70%) − renovation costs. It ensures you leave enough margin for profit after all expenses. Investors use it to quickly filter deals.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  What is a good profit on a fix and flip?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Most investors aim for at least $25,000 profit per deal. In competitive markets, $15,000–$20,000 can be acceptable. Experienced flippers often target $40,000 or more.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How do hard money loan costs affect a fix and flip deal?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Hard money loans have high interest (9–13%) and upfront fees (points). These costs can reduce profit significantly if not calculated properly. A fix and flip calculator helps you estimate total financing costs.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Can I use a fix and flip calculator for wholesaling?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Yes, wholesalers use it to estimate the end buyer's profit. They then adjust their offer to leave enough margin for the investor. This is key in wholesaling deal analysis.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  What is the difference between a fix and flip calculator and a fix and flip mortgage calculator?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  A mortgage calculator focuses only on loan costs like interest and payments. A full fix and flip calculator includes rehab, holding, selling costs, and total profit. It gives a complete deal analysis.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
