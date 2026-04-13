"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import GrailedFeeCalculator from "@/components/grailed-fee-calculator"
import { DollarSign, Calculator, Info, BookOpen, CheckCircle, AlertTriangle, TrendingUp, Package } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function GrailedFeeCalculatorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Grailed Fee Calculator
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Calculate Grailed fees instantly and know your exact payout before you list or accept an offer. Enter your sale price, choose domestic or international, and see your Grailed commission, payment processing fees, and net earnings in seconds.
          </p>
        </div>

        {/* Introduction */}
        <div className="mb-12 p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl shadow-lg">
          <p className="text-gray-700 leading-relaxed text-lg">
            Grailed fees consist of a flat <strong>9% commission</strong> on the item price plus a separate <strong>payment processing fee</strong> (typically 3.49%–5.49% + a small fixed amount). Most sellers see total fees between <strong>12% and 14%</strong>, depending on their Stripe onboarding status and buyer location. Use this Grailed fee calculator to avoid surprises, price items profitably, and maximize your take-home pay on every sale. Whether you sell streetwear, designer pieces, or luxury sneakers, knowing your numbers upfront helps you list smarter and sell faster.
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="mb-12">
          <Card className="border-2 border-gray-200 shadow-xl">
            <CardHeader className="py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                Grailed Fee Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <GrailedFeeCalculator />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="mb-12">
          <div className="space-y-8">
            {/* What is Grailed Fee */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Info className="w-8 h-8 text-green-600" />
                What is Grailed Fee?
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                Grailed operates a straightforward fee system designed to keep the platform curated and seller-friendly. <strong>What is Grailed fee?</strong> It's the cost sellers pay when an item sells — no monthly subscriptions, no listing fees, and no hidden charges until the sale closes.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                Sellers pay two main components:
              </p>
              <ul className="space-y-2 text-gray-700 text-lg ml-6 mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>Grailed commission:</strong> A flat 9% applied to the item sale price (not shipping).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span><strong>Payment processing fee:</strong> Handled through Stripe, this covers credit card and bank transfer costs and varies by your seller status and buyer location.</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                <strong>Buyers pay nothing extra to Grailed.</strong> The platform stays completely free for buyers, which is one reason Grailed remains popular for fashion resale. Buyers only cover the listed item price, shipping (if not free), and any applicable taxes or duties.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                This structure makes selling fees on Grailed some of the lowest among major resale marketplaces. You keep more of your money compared to platforms that charge 15–20% flat commissions. As a longtime seller who has moved hundreds of items, I've seen how understanding these fees turns good listings into consistent profits.
              </p>
            </div>

            {/* Grailed Fee Calculator (How It Works) */}
            <div className="bg-white border-2 border-purple-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <Calculator className="w-8 h-8" />
                  Grailed Fee Calculator (How It Works)
                </h2>
              </div>
              <div className="p-8">
                <p className="text-gray-700 leading-relaxed text-lg mb-4">
                  The Grailed fee calculator removes all the guesswork. Here's exactly how it works:
                </p>
                <ol className="space-y-3 text-gray-700 text-lg ml-6 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-purple-600">1.</span>
                    <span>Input your item sale price (the amount the buyer pays for the product itself).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-purple-600">2.</span>
                    <span>Select your seller status (Stripe onboarded, eligible but not onboarded, or non-eligible country).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-purple-600">3.</span>
                    <span>Choose transaction type (domestic US or international).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-purple-600">4.</span>
                    <span>Add shipping cost (optional, but realistic for accurate totals).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-purple-600">5.</span>
                    <span>Hit calculate — the tool instantly breaks down:</span>
                  </li>
                </ol>
                <ul className="space-y-2 text-gray-700 text-lg ml-12 mb-6">
                  <li>• Grailed 9% commission</li>
                  <li>• Stripe payment processing fee</li>
                  <li>• Total fees</li>
                  <li>• Your estimated payout</li>
                </ul>

                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-bold text-purple-600 mb-3">Formula breakdown (simple and transparent):</h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Grailed Commission</strong> = Sale Price × 0.09</p>
                    <p><strong>Payment Processing Fee</strong> = (Transaction Amount × Percentage Rate) + Fixed Fee</p>
                    <p><strong>Total Fees</strong> = Commission + Processing Fee</p>
                    <p><strong>Your Payout</strong> = Sale Price + Shipping Collected – Total Fees</p>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed text-lg">
                  You will receive your payout directly to your linked bank account (via Stripe) — usually within <strong>3 calendar days</strong> after delivery confirmation. The Grailed fee cal updates in real time, so you can test different price points and shipping strategies before listing.
                </p>
              </div>
            </div>

            {/* Calculate Grailed Fees (Step-by-Step Guide) */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-orange-600" />
                Calculate Grailed Fees (Step-by-Step Guide)
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                Ready to calculate Grailed fees yourself? Follow these steps for perfect accuracy every time:
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-4 p-5 bg-white border-2 border-orange-200 rounded-lg">
                  <div className="bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-lg">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Decide your final accepted sale price.</h4>
                    <p className="text-gray-700">Example: You list a pair of sneakers for $250 and the buyer accepts at $230.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-white border-2 border-orange-200 rounded-lg">
                  <div className="bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-lg">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Determine if you're charging shipping.</h4>
                    <p className="text-gray-700">Let's say $18 (common for US domestic).</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-white border-2 border-orange-200 rounded-lg">
                  <div className="bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-lg">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Check your Stripe status in your Grailed account settings.</h4>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-white border-2 border-orange-200 rounded-lg">
                  <div className="bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-lg">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Apply the correct rates (current as of 2026):</h4>
                    <ul className="text-gray-700 mt-2 space-y-1">
                      <li>• Domestic (US) – Onboarded: 3.49% + $0.49</li>
                      <li>• International – Onboarded: 4.99% + $0.49</li>
                    </ul>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-life example calculations:</h3>

              <div className="space-y-4">
                <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-orange-600 mb-3">Example 1 – $150 Domestic Sale (Onboarded Seller)</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Item price: $150</li>
                    <li>• Shipping charged: $12</li>
                    <li>• Grailed commission: $150 × 9% = $13.50</li>
                    <li>• Processing fee (on ~$162 total): ~$6.15 (3.49% + $0.49)</li>
                    <li>• Total fees: ~$19.65</li>
                    <li className="font-bold text-orange-600">• You receive: $142.35</li>
                  </ul>
                </div>

                <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-orange-600 mb-3">Example 2 – $400 International Sale</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Item price: $400</li>
                    <li>• Shipping: $35</li>
                    <li>• Grailed commission: $36.00</li>
                    <li>• Processing fee (higher international rate): ~$24.45</li>
                    <li>• Total fees: ~$60.45</li>
                    <li className="font-bold text-orange-600">• You receive: $374.55</li>
                  </ul>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed text-lg mt-6">
                These examples show why the Grailed payout calculator is essential — you see the real number hitting your account, not just the headline 9% figure.
              </p>
            </div>

            {/* Grailed Seller Fee Calculator Explained */}
            <div className="bg-white border-2 border-blue-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-blue-600" />
                Grailed Seller Fee Calculator Explained
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                The Grailed seller fee calculator focuses entirely on your earnings. Sellers love it because it answers the most important question: <strong>"How much money will I actually receive?"</strong>
              </p>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Key seller insights:</h3>
              <ul className="space-y-2 text-gray-700 text-lg ml-6 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>Commission always hits the item price only.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>Processing fees scale with transaction size but include that annoying fixed dollar amount — making very low-price sales less profitable.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>You keep 100% of any shipping profit if you charge more than your actual cost.</span>
                </li>
              </ul>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Payout calculation examples:</h3>
              <ul className="space-y-2 text-gray-700 text-lg ml-6 mb-4">
                <li>• $80 hoodie → After ~$11–$13 total fees → You keep ~$67–$69</li>
                <li>• $600 jacket → After ~$75–$85 total fees → You keep ~$515–$525</li>
              </ul>
              <p className="text-gray-700 leading-relaxed text-lg">
                Experienced sellers use the Grailed seller fee calculator before every listing to set minimum acceptable offers. It prevents you from accepting lowball bids that leave you with almost nothing after fees.
              </p>
            </div>

            {/* Grailed Buyer Fee Calculator Explained */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Package className="w-8 h-8 text-teal-600" />
                Grailed Buyer Fee Calculator Explained
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                Here's the good news for buyers: <strong>There is no Grailed buyer fee calculator needed because buyers pay zero platform fees.</strong>
              </p>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                <strong>Grailed is 100% free for buyers.</strong> You only pay:
              </p>
              <ul className="space-y-2 text-gray-700 text-lg ml-6 mb-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                  <span>The listed item price</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                  <span>Shipping (or free shipping if the seller offers it)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                  <span>Any state sales tax or international duties/tariffs</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed text-lg">
                The Grailed buyer fee calculator people sometimes search for usually just helps estimate total out-of-pocket cost including shipping and tax. Grailed's Purchase Protection program adds extra peace of mind at no extra charge to buyers — covering authenticity and description issues on qualifying orders.
              </p>
            </div>

            {/* Grailed and PayPal Fee Calculator Breakdown */}
            <div className="bg-white border-2 border-indigo-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Grailed and PayPal Fee Calculator Breakdown</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                Many sellers still search for a <strong>Grailed and PayPal fee calculator</strong> because the platform used PayPal in earlier years. Today Grailed processes payments through Stripe, but the combined fee structure feels very similar.
              </p>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Transaction flow:</h3>
              <ol className="space-y-2 text-gray-700 text-lg ml-6 mb-6">
                <li>1. Buyer pays item price + shipping via card or other methods.</li>
                <li>2. Grailed deducts the 9% commission immediately.</li>
                <li>3. Stripe deducts the processing fee from the remaining amount.</li>
                <li>4. Grailed releases your net payout to your bank (usually 3 days after delivery).</li>
              </ol>
              <p className="text-gray-700 leading-relaxed text-lg">
                The old PayPal rates (2.9% + $0.30) were slightly lower than current Stripe international rates, which is why the Grailed and PayPal fee calculator still appears in searches. Use the current Stripe rates in this tool for 2026 accuracy.
              </p>
            </div>

            {/* Grailed Fees in 2026 */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Grailed Fees in 2026</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                As of April 2026, Grailed fees remain competitive and unchanged at their core: <strong>9% commission + Stripe processing fees</strong>. No major increases have hit sellers this year.
              </p>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Current 2026 rates (official):</h3>
              <ul className="space-y-2 text-gray-700 text-lg ml-6 mb-6">
                <li>• <strong>Stripe Onboarded Sellers (recommended):</strong> Domestic 3.49% + $0.49 | International 4.99% + $0.49</li>
                <li>• <strong>Not Onboarded:</strong> Slightly higher fixed fees ($0.99)</li>
                <li>• <strong>Non-Stripe Countries:</strong> Default higher rate</li>
              </ul>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                Total effective fees usually land between <strong>12–14%</strong>, still far below Poshmark (20%), Depop (10% + processing), or eBay (13%+). Occasional promotions appear — earlier in 2026 some in-demand designers enjoyed 0% seller fees for a limited time.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                <strong>Market comparison:</strong> Grailed continues to win for serious fashion resellers who value lower fees and a curated audience.
              </p>
            </div>

            {/* Factors Affecting Grailed Fees */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Factors Affecting Grailed Fees</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                Several variables change your exact fees:
              </p>
              <div className="space-y-3">
                {[
                  { title: "Sale price", desc: "Higher prices reduce the impact of the fixed processing fee." },
                  { title: "Buyer location", desc: "International buyers trigger higher processing rates." },
                  { title: "Your Stripe status", desc: "Onboarding saves you $0.50 per transaction." },
                  { title: "Currency & region", desc: "Non-US sellers may face conversion fees." },
                  { title: "Shipping strategy", desc: "Charging shipping increases the total transaction amount processed." },
                  { title: "Promotions", desc: "Temporary 0% commission events can appear." },
                ].map((factor, index) => (
                  <div key={index} className="p-4 bg-gray-50 border-2 border-gray-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-gray-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-gray-900">{factor.title}</h4>
                        <p className="text-gray-700"> — {factor.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips to Reduce Grailed Fees */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-green-600" />
                Tips to Reduce Grailed Fees
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                Smart sellers use these practical strategies to keep more money:
              </p>
              <div className="space-y-3">
                {[
                  { title: "Onboard with Stripe immediately", desc: "Cuts the fixed fee in half." },
                  { title: "Price strategically", desc: "Bundle items or aim for $100+ sales to minimize percentage impact." },
                  { title: "Offer free shipping", desc: "Absorb the cost into your price and attract more buyers (then calculate the real net)." },
                  { title: "Monitor promotions", desc: "Grailed occasionally runs 0-fee periods for popular designers." },
                  { title: "Ship efficiently", desc: "Use Grailed labels when available to streamline delivery and faster payouts." },
                  { title: "Negotiate offers wisely", desc: "Run every offer through the Grailed fee calculator before accepting." },
                ].map((tip, index) => (
                  <div key={index} className="p-4 bg-white border-2 border-green-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-gray-900">{tip.title}</h4>
                        <p className="text-gray-700"> — {tip.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mt-6">
                After years of selling, I've found that consistent high-volume sellers who stay onboarded and price above $150 see the best net margins.
              </p>
            </div>

            {/* Common Mistakes */}
            <div className="bg-white border-2 border-red-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                Common Mistakes Users Make
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                Even experienced sellers trip up on these:
              </p>
              <div className="space-y-3">
                {[
                  "Calculating only the 9% commission and forgetting processing fees.",
                  "Assuming fees apply only to the item price when shipping is charged.",
                  "Not checking Stripe status before big sales.",
                  "Accepting very low offers on cheap items where fixed fees eat most of the profit.",
                  "Ignoring potential refund scenarios (some processing fees may not return fully).",
                  "Using outdated PayPal-only calculators instead of 2026 Stripe rates.",
                ].map((mistake, index) => (
                  <div key={index} className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      <p className="text-gray-700">{mistake}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">FAQs</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is Grailed fee?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    It's the 9% commission plus Stripe processing fees that sellers pay on every successful sale. Buyers pay nothing to the platform.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How much does Grailed take from a sale?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Typically 12–14% total (9% commission + processing). Exact amount depends on your seller status and buyer location.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Does PayPal charge extra fees on Grailed?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    No — Grailed uses Stripe for processing in 2026. Older calculators may still reference PayPal rates, but current fees are listed above.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How do I calculate Grailed payout?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Use the Grailed payout calculator above: subtract 9% commission and the applicable Stripe processing fee from your sale price (plus any shipping you collected).
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Is Grailed fee fixed or variable?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    The 9% commission is fixed. The processing fee has both a percentage (variable) and fixed dollar component, so total fees vary slightly by sale size and location.
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
