"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import WhatnotFeeCalculator from "@/components/whatnot-fee-calculator"
import { DollarSign, Calculator, Info, AlertCircle, BookOpen, TrendingUp, Package, CheckCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function WhatnotFeeCalculatorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Whatnot Fee Calculator
          </h1>
        </div>

        {/* Quick Answer Box */}
        <div className="mb-12 p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl shadow-lg">
          <div className="flex items-start gap-4">
            <div className="bg-green-600 text-white rounded-full p-3 flex-shrink-0">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Quick Answer</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                Whatnot charges a commission and a processing fee on every sale. US, Canada, and Australia sellers pay 8% + 2.9% + $0.30, while UK/EU sellers pay 6.67% + VAT and 2.42% + VAT + £0.25. Use the calculator above to instantly see your profit after fees.
              </p>
            </div>
          </div>
        </div>

        {/* Main Calculator Card */}
        <div className="mb-12">
          <Card className="border-2 border-gray-200 shadow-xl">
            <CardHeader className="py-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                Whatnot Fee Calculator — Estimate Seller Fees & Net Profit Instantly
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <WhatnotFeeCalculator />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="mb-12">
          <div className="space-y-8">
            {/* Introduction */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <p className="text-gray-700 leading-relaxed text-lg">
                Whether you sell trading cards, collectibles, vintage clothing, electronics, or coins on Whatnot, you need to know exactly how much the platform takes before you set your price. Guessing costs you money. This free Whatnot seller fees calculator removes the guesswork. Enter your sale price, select your region and category, and you get a clear breakdown of every fee deducted and exactly what lands in your pocket.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg mt-4">
                This page covers everything a Whatnot seller needs to know: how the fee structure works in the US, UK, Canada, and Australia, which categories get lower rates, what affects your final payout, and how to price items to stay profitable on every sale.
              </p>
            </div>

            {/* What Are Whatnot Seller Fees */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-blue-600" />
                What Are Whatnot Seller Fees?
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Whatnot operates on a straightforward two-fee model. Every time you make a sale — whether through a live auction, a Buy It Now listing, or a marketplace post — Whatnot deducts two fees directly from your payout.
              </p>

              <div className="space-y-6">
                {/* Commission Fee */}
                <div className="bg-white border-2 border-blue-200 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-blue-600 mb-4">1. The Commission Fee (Whatnot's Percentage Cut)</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    The commission fee is Whatnot's share of your sale. It is calculated only on the final item sale price, not on shipping or taxes.
                  </p>
                  <p className="text-gray-700 mb-4 font-semibold">
                    Here is how commission breaks down by region and category:
                  </p>

                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-2">United States, Canada, and Australia:</h4>
                      <ul className="space-y-2 ml-6 text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span><strong>Standard categories</strong> (clothing, sneakers, vintage, jewellery, home goods, etc.): <strong>8% commission</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span><strong>Electronics:</strong> <strong>5% commission</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span><strong>Coins and Money:</strong> <strong>4% commission</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span><strong>High-value collectibles</strong> (comics and anime, trading card games, toys and hobbies, sports singles): <strong>8% on the first $1,500, then 0% on everything above $1,500</strong> (limited-time promotional offer — always verify on Whatnot's official fee schedule before listing)</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-2">United Kingdom and European Union:</h4>
                      <ul className="space-y-2 ml-6 text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold">•</span>
                          <span><strong>Standard categories:</strong> <strong>6.67% + VAT</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold">•</span>
                          <span><strong>Coins and Money:</strong> <strong>4% + VAT</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold">•</span>
                          <span><strong>High-value collectibles:</strong> Same $1,500 threshold rule applies (0% commission above that amount in eligible categories, for a limited period)</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-green-50 border-2 border-green-300 rounded-lg">
                    <p className="text-gray-700">
                      <strong>Real example:</strong> You sell a signed sports card for $200. Your commission is 8% × $200 = $16. Whatnot charges this against your item price only — not against what the buyer paid for shipping.
                    </p>
                  </div>
                </div>

                {/* Processing Fee */}
                <div className="bg-white border-2 border-cyan-200 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-cyan-600 mb-4">2. The Payment Processing Fee</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    The payment processing fee covers the cost of securely handling the buyer's payment. Unlike the commission, this fee applies to the total order value — meaning the item price plus buyer-paid shipping plus any applicable taxes.
                  </p>

                  <div className="space-y-4">
                    <div className="p-4 bg-cyan-50 border-2 border-cyan-200 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-2">United States, Canada, and Australia:</h4>
                      <p className="text-gray-700"><strong>2.9% of total order value + $0.30 per transaction</strong></p>
                    </div>

                    <div className="p-4 bg-indigo-50 border-2 border-indigo-200 rounded-lg">
                      <h4 className="font-bold text-gray-900 mb-2">United Kingdom and European Union:</h4>
                      <p className="text-gray-700"><strong>2.42% + VAT of total order value + £0.25 + VAT per transaction</strong></p>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
                    <p className="text-gray-700 mb-2">
                      <strong>Real example (US seller):</strong> You sell a handbag for $200. The buyer pays $10 for shipping and $10 in sales tax. Your total order value = $220. Payment processing fee = 2.9% × $220 + $0.30 = $6.38 + $0.30 = $6.68. Total fees = $16 (commission) + $6.68 (processing) = $22.68. Your net payout = $177.32.
                    </p>
                    <p className="text-gray-700 font-semibold">
                      This is why many sellers are surprised when their payout is lower than expected — they forget that processing fees are based on the full order amount, including shipping.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* How to Use */}
            <div className="bg-white border-2 border-green-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <BookOpen className="w-8 h-8" />
                  How to Use the Whatnot Fee Calculator (Step by Step)
                </h2>
              </div>
              <div className="p-8">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Using this free Whatnot cost calculator takes under a minute. Here is exactly what to do:
                </p>

                <div className="space-y-4">
                  {[
                    { step: "Step 1 — Select your region", desc: "Choose between US/Canada/Australia or UK/Europe. Fee rates differ significantly by location, so this step matters." },
                    { step: "Step 2 — Enter the sale price", desc: "Type in the price at which you expect to sell the item. For auctions, use your estimated final bid price. For Buy It Now listings, use your listed price." },
                    { step: "Step 3 — Choose your product category", desc: "Select Standard (8%), Electronics (5%), or Coins and Money (4%) to apply the correct commission rate to your calculation." },
                    { step: "Step 4 — Add the shipping cost", desc: "Enter what the buyer pays for shipping. Even though you do not keep this money, it increases the total order value and therefore raises your payment processing fee." },
                    { step: "Step 5 — Enter the sales tax rate (optional)", desc: "If you know the buyer's state or local sales tax rate, add it here for a more accurate result. Whatnot collects and remits sales tax automatically, but the tax amount still factors into the processing fee calculation." },
                    { step: "Step 6 — Click Calculate", desc: "The Whatnot selling fee calculator instantly shows you a full breakdown: commission fee, processing fee, total fees deducted, and your net earnings." },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4 p-5 bg-green-50 border-2 border-green-200 rounded-lg">
                      <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-lg">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{item.step}</h4>
                        <p className="text-gray-700">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-6 p-4 bg-green-100 border-2 border-green-300 rounded-lg text-gray-700 font-semibold">
                  Use it before every listing to make sure your asking price delivers the profit you actually need.
                </p>
              </div>
            </div>

            {/* Regional Calculators */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Whatnot Fee Calculator for Different Regions</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Sellers outside the US need region-specific numbers. Here is what you need to know.
              </p>

              <div className="space-y-6">
                {/* USA */}
                <div className="bg-white border-2 border-blue-200 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-blue-600 mb-3">Whatnot Fee Calculator — USA</h3>
                  <p className="text-gray-700 leading-relaxed">
                    For US sellers, the standard Whatnot seller fee is 8% commission plus 2.9% + $0.30 processing. This means on a typical $100 sale with $9 shipping, your total fees land around $11.86, and you take home approximately $88.14. Electronics sellers enjoy a lower 5% rate, and coin sellers pay just 4%.
                  </p>
                </div>

                {/* Canada */}
                <div className="bg-white border-2 border-red-200 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-red-600 mb-3">Whatnot Fee Calculator — Canada</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Canadian sellers follow the same fee structure as US sellers: 8% commission (5% for electronics, 4% for coins) plus 2.9% + $0.30 processing on the total order value. Whatnot has periodically offered promotional 0% commission windows for Canadian sellers in categories like Women's Fashion — check your seller dashboard for current eligibility.
                  </p>
                </div>

                {/* UK */}
                <div className="bg-white border-2 border-purple-200 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-purple-600 mb-3">Whatnot Fee Calculator — UK (Free)</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    UK sellers pay a different fee structure. The standard commission is 6.67% + VAT on most categories and 4% + VAT on coins. The payment processing fee is 2.42% + VAT plus £0.25 + VAT per transaction. Because VAT applies to the commission and processing fees (not the item itself for most domestic transactions), UK sellers need to factor this added cost into their pricing.
                  </p>

                  <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-lg">
                    <h4 className="font-bold text-gray-900 mb-2">Whatnot Seller Fees UK Calculator — What You Actually Take Home</h4>
                    <p className="text-gray-700">
                      For a UK seller selling an item at £100 with £8 shipping, your fee breakdown looks like this: commission = 6.67% × £100 = £6.67 + VAT (£1.33) = £8.00. Processing = 2.42% × £108 + £0.25 + VAT = approximately £3.37. Total fees ≈ £11.37. Net payout ≈ £88.63. This is the level of detail our Whatnot fee calculator UK free tool provides — so you stop guessing and start pricing accurately.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Cost */}
            <div className="bg-white border-2 border-orange-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <Package className="w-8 h-8" />
                  Whatnot Shipping Cost Calculator — USA
                </h2>
              </div>
              <div className="p-8">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Shipping costs on Whatnot directly affect your payout, even though the buyer pays for shipping. Here is why: Whatnot calculates the payment processing fee on the total order value, which includes shipping. So a higher shipping cost = a higher processing fee = a lower net payout for you.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  For US domestic shipping, Whatnot uses USPS. A standard flat-rate label for packages weighing 1–5 lbs costs approximately $9.21. If a buyer is far from you, the auto-generated label may cost more, which increases total order value and marginally reduces your payout. Keep this in mind when you price lightweight items with short-range buyers differently from heavy items shipping across the country.
                </p>
              </div>
            </div>

            {/* What Affects Payout */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-yellow-600" />
                What Affects Your Whatnot Seller Payout?
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Beyond the headline percentages, several real-world factors push your actual payout up or down. Experienced Whatnot sellers know to account for all of these.
              </p>

              <div className="space-y-4">
                {[
                  { title: "Seller-Generated Coupons Reduce Your Net", desc: "When you offer a coupon — for example, $5 off a $20 item — the commission applies to the discounted final sale price of $15. This means you absorb the full discount and still pay fees on the reduced amount. Use coupons strategically for high-margin items only." },
                  { title: "Whatnot-Generated Coupons Work Differently", desc: "When Whatnot itself issues a buyer coupon, the platform covers that discount. Your commission is based on the pre-coupon price. This is a meaningful benefit — you get full-price fees calculated in your favour." },
                  { title: "Giveaways Are Fee-Free", desc: "If you host a giveaway on Whatnot, the winner pays nothing. Since the total order value is zero, you pay no commission and no processing fee. You cover only the cost of shipping the item. Many experienced Whatnot sellers use strategic giveaways to grow their audience without paying platform fees on promotional items." },
                  { title: "Weight Discrepancies Cost You Money", desc: "If you underestimate your package weight, Whatnot prints a corrected label at a higher cost, and the difference comes out of your payout. Always weigh your items before listing. A few ounces over can add $2–5 to shipping costs on larger packages, directly reducing what you take home." },
                  { title: "The $1,500 Commission Threshold for High-Value Items", desc: "In specific categories — comics and anime, trading card games, toys and hobbies, sports singles, and coins — the commission drops to 0% on the portion of a sale above $1,500. This is a promotional offer, not a permanent policy. If you regularly sell rare cards, vintage comics, or high-grade coins above this threshold, this can save you significant money per sale. Always verify the current eligibility on Whatnot's official help centre before pricing around this threshold." },
                  { title: "Bundled Orders Lower Your Total Processing Fee", desc: "When a buyer purchases multiple items from you in one show, the combined shipping cost is lower than individual shipping per item. Lower shipping = lower total order value = lower processing fee. Encouraging buyers to bundle items in your live show is one of the most effective ways to reduce fees per sale." },
                ].map((item, index) => (
                  <div key={index} className="p-5 bg-white border-2 border-yellow-200 rounded-xl">
                    <h4 className="font-bold text-yellow-600 mb-2">{item.title}</h4>
                    <p className="text-gray-700">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitors Comparison */}
            <div className="bg-white border-2 border-teal-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">Whatnot Fees vs. Competitors — Is Whatnot Worth It?</h2>
              </div>
              <div className="p-8">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Understanding Whatnot's fee structure becomes more meaningful when you compare it to other platforms.
                </p>

                <div className="space-y-4">
                  {[
                    { platform: "Whatnot vs. eBay", desc: "eBay charges 13–15% in final value fees across most categories, plus per-order processing. Whatnot's 8% commission + 2.9% + $0.30 is substantially lower for most categories. High-volume collectible sellers often find Whatnot significantly more profitable per transaction." },
                    { platform: "Whatnot vs. Poshmark", desc: "Poshmark charges a flat 20% on all sales above $15. Whatnot's 8% is 12 percentage points cheaper on most items, making it far more attractive for sellers of clothing, sneakers, and vintage goods." },
                    { platform: "Whatnot vs. Mercari", desc: "Mercari charges 10% commission. Whatnot at 8% is lower, and the coin and electronics categories are dramatically cheaper." },
                    { platform: "Whatnot vs. Depop", desc: "Depop charges 10% commission. Whatnot's standard rate beats this, especially in niche collectible categories." },
                  ].map((item, index) => (
                    <div key={index} className="p-5 bg-teal-50 border-2 border-teal-200 rounded-xl">
                      <h4 className="font-bold text-teal-600 mb-2">{item.platform}</h4>
                      <p className="text-gray-700">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-6 p-4 bg-teal-100 border-2 border-teal-300 rounded-lg text-gray-700 font-semibold">
                  No listing fees, no store subscription fees, and no hosting fees for live shows give Whatnot a strong economic case for sellers who price their items correctly from the start.
                </p>
              </div>
            </div>

            {/* Pricing Formula */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Price Your Items for Profit on Whatnot</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Now that you understand the fee structure, here is how to work backwards from your desired profit to your listing price.
              </p>

              <div className="bg-white border-2 border-indigo-300 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">The simple formula:</h3>
                <div className="bg-indigo-100 border-2 border-indigo-400 rounded-lg p-4 font-mono text-lg mb-4">
                  <p className="text-gray-900"><strong>Minimum list price = (Your item cost + Desired profit) ÷ (1 − Total fee percentage)</strong></p>
                </div>
                <p className="text-gray-700 mb-4">
                  For a standard US sale with 8% commission and approximately 3% processing:
                </p>
                <div className="bg-indigo-100 border-2 border-indigo-400 rounded-lg p-4 font-mono">
                  <p className="text-gray-900"><strong>Minimum list price = (Cost + Profit) ÷ 0.89</strong></p>
                </div>
              </div>

              <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 mb-6">
                <h4 className="font-bold text-gray-900 mb-3">Example:</h4>
                <p className="text-gray-700 mb-2">
                  Your item cost you $40 and you want $20 profit ($60 minimum payout).
                </p>
                <p className="text-gray-700 font-semibold">
                  List price = $60 ÷ 0.89 = $67.42 minimum
                </p>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                Always run this through the Whatnot price calculator above with your actual shipping input for a precise number. Estimates built on rough percentages lose accuracy on higher shipping costs.
              </p>

              <div className="bg-white border-2 border-indigo-200 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-3">Pro tips from experienced sellers:</h4>
                <ul className="space-y-2 ml-6 text-gray-700">
                  {[
                    "Price in whole numbers. Buyers respond better to $49 than $48.73, and the fee difference is negligible.",
                    "Do not offer free shipping unless you have already built the full shipping cost into your item price.",
                    "Use the $1,500 threshold in eligible categories deliberately — price just above $1,500 if you are selling high-value collectibles, and make sure you confirm current eligibility before the show.",
                    "Factor in all deductible expenses (fees, shipping supplies, equipment, internet) when calculating taxable income from Whatnot sales.",
                  ].map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-1" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How much does Whatnot take from sellers?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Whatnot takes two fees: a commission of 8% (most categories) or 5% (electronics) or 4% (coins and money) of your item's final sale price, plus a payment processing fee of 2.9% + $0.30 on the total order value including shipping and taxes. For UK and EU sellers, the rates are 6.67% + VAT commission and 2.42% + VAT + £0.25 processing.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Is this Whatnot fee calculator free?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Yes. This Whatnot fee calculator free tool costs you nothing. Enter your numbers and get your results instantly with no sign-up required.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Does Whatnot charge listing fees?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    No. Whatnot does not charge listing fees, show-hosting fees, or monthly seller subscription fees. You pay only when an item actually sells.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How does shipping affect my Whatnot seller fees?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Shipping affects your payment processing fee. The processing fee (2.9% + $0.30 in the US) applies to the full order value, which includes what the buyer pays for shipping. Higher shipping costs raise the total order value and therefore raise the processing fee, reducing your payout slightly.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is the Whatnot fee for UK sellers?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    UK sellers pay 6.67% + VAT commission on most categories and 4% + VAT on coins and money. The payment processing fee is 2.42% + VAT of the total order value plus £0.25 + VAT per transaction. Use the UK/Europe setting in the calculator above for accurate results.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Do Whatnot fees vary by category?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Yes. Electronics attract a 5% commission rate and coins and money attract a 4% commission rate. All other categories default to 8% in the US, Canada, and Australia, and 6.67% + VAT in the UK and EU.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Does Whatnot charge fees on giveaways?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    No. Giveaways involve no buyer payment, so there is no order value on which to calculate fees. You pay only the cost of shipping the item to the winner.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is the $1,500 commission threshold on Whatnot?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    For a limited promotional period, Whatnot charges 0% commission on the portion of a sale that exceeds $1,500 in specific categories: comics and anime, trading card games, toys and hobbies, sports singles, and coins and money. The standard commission still applies to the first $1,500 of the sale price. This offer can change or end without notice, so always check Whatnot's official fee schedule before planning your pricing around it.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-9">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Can I negotiate lower Whatnot fees?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    High-volume sellers generating $10,000 or more per month in gross merchandise value sometimes negotiate promotional credits or reduced rates directly with Whatnot's seller success team. There is no publicly available tiered fee structure for volume discounts, but it is worth asking.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Summary Table */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-gray-300 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Summary</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-2 border-gray-300">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Region</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Commission</th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Payment Processing</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { region: "US / Canada / Australia (Standard)", commission: "8%", processing: "2.9% + $0.30" },
                      { region: "US / Canada / Australia (Electronics)", commission: "5%", processing: "2.9% + $0.30" },
                      { region: "US / Canada / Australia (Coins)", commission: "4%", processing: "2.9% + $0.30" },
                      { region: "UK / EU (Standard)", commission: "6.67% + VAT", processing: "2.42% + VAT + £0.25" },
                      { region: "UK / EU (Coins)", commission: "4% + VAT", processing: "2.42% + VAT + £0.25" },
                    ].map((row, index) => (
                      <tr key={index} className="hover:bg-blue-50">
                        <td className="px-6 py-4 text-gray-900 font-semibold">{row.region}</td>
                        <td className="px-6 py-4 text-gray-700">{row.commission}</td>
                        <td className="px-6 py-4 text-gray-700">{row.processing}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 space-y-3">
                <p className="text-gray-700 font-semibold">No listing fees. No hosting fees. No monthly subscriptions. You only pay when you sell.</p>
                <p className="text-gray-700 leading-relaxed">
                  Use the Whatnot fee calculator before every sale to see your exact profit. Enter your item price, choose your category and region, add shipping, and instantly calculate your net payout. Knowing your numbers upfront helps you price smarter and stay profitable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
