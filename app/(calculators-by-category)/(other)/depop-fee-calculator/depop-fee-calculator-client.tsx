"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DepopFeeCalculator from "@/components/depop-fee-calculator"
import { DollarSign, Calculator, Info, AlertCircle, BookOpen, TrendingUp, Package, CheckCircle, Zap } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function DepopFeeCalculatorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
            Depop Fee Calculator — Calculate Your Exact Profit
          </h1>
        </div>

        {/* Quick Answer Box */}
        <div className="mb-12 p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl shadow-lg">
          <div className="flex items-start gap-4">
            <div className="bg-purple-600 text-white rounded-full p-3 flex-shrink-0">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-700 leading-relaxed text-lg">
                US and UK sellers pay zero Depop selling fee — only a payment processing fee of 3.3% + $0.45 (US) or 2.9% + £0.30 (UK). International sellers outside the US and UK pay a flat 10% selling fee plus payment processing fees. Use the live calculator above to find your exact payout in seconds.
              </p>
            </div>
          </div>
        </div>

        {/* Main Calculator Card */}
        <div className="mb-12">
          <Card className="border-2 border-gray-200 shadow-xl">
            <CardHeader className="py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                Depop Fee Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <DepopFeeCalculator />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="mb-12">
          <div className="space-y-8">
            {/* What Is a Depop Fee Calculator */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-purple-600" />
                What Is a Depop Fee Calculator and Why Do You Need One?
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                A Depop fee calculator is a free tool that takes your sale price, shipping amount, and location — then instantly shows you your net profit, total fees deducted, and real payout after every charge Depop applies. Instead of guessing or doing manual math on every listing, you get a reliable answer before you press "Publish."
              </p>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                Sellers who skip this step consistently underprice their items. They list a $25 jacket, receive a $19 payout, subtract what they paid for it, and realise they barely broke even or lost money. The calculator eliminates that surprise entirely.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                Whether you sell vintage streetwear, Y2K dresses, or pre-loved trainers, knowing your numbers upfront turns Depop from a hobby into a profitable resale business.
              </p>
            </div>

            {/* How Depop Fees Work */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-blue-600" />
                How Depop Fees Work in 2026 — The Complete Breakdown
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Understanding the fee structure is the foundation of smart pricing on Depop. There are three possible fee types you need to know:
              </p>

              <div className="space-y-6">
                {/* Selling Fee */}
                <div className="bg-white border-2 border-blue-200 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-blue-600 mb-4">1. Depop Selling Fee (Marketplace Commission)</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    As of 2026, Depop has removed its standard 10% selling commission for new listings in the US and UK to compete with Vinted. If you have items listed before mid-2024 that have not been updated, they may still be under the old 10% fee structure — you can refresh them by selecting "Edit and Save" to migrate to the 0% fee tier.
                  </p>
                  <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg mb-4">
                    <p className="text-gray-700 font-semibold">
                      Depop removed the 10% selling fee for UK sellers on new listings from March 20, 2024, and for US sellers on new listings from July 15, 2024.
                    </p>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    For sellers outside the US and UK (including Australia), international sellers pay a flat 10% selling fee plus payment processing fees.
                  </p>
                </div>

                {/* Processing Fee */}
                <div className="bg-white border-2 border-cyan-200 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-cyan-600 mb-4">2. Payment Processing Fee</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Depop no longer charges a selling fee for US and UK sellers, but the payment processing fee still impacts every sale. Since it includes both a percentage and a fixed amount, the impact is especially noticeable on lower-priced clothing and accessories.
                  </p>
                  <p className="text-gray-700 mb-4 font-semibold">
                    Here is the exact breakdown by region:
                  </p>

                  <div className="overflow-x-auto mb-4">
                    <table className="w-full border-2 border-gray-300">
                      <thead className="bg-cyan-100">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Region</th>
                          <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Processing Fee</th>
                          <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Selling Fee</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {[
                          { region: "United States", processing: "3.3% + $0.45", selling: "0%" },
                          { region: "United Kingdom", processing: "2.9% + £0.30", selling: "0%" },
                          { region: "Australia", processing: "2.6% + A$0.30", selling: "10%" },
                          { region: "International", processing: "Varies by PayPal", selling: "10%" },
                        ].map((row, index) => (
                          <tr key={index} className="hover:bg-cyan-50">
                            <td className="px-6 py-4 text-gray-900 font-semibold">{row.region}</td>
                            <td className="px-6 py-4 text-gray-700">{row.processing}</td>
                            <td className="px-6 py-4 text-gray-700">{row.selling}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="text-gray-700 leading-relaxed">
                    This fee applies to the <strong>Total Transaction Amount</strong> — item price, shipping, and sales tax. If you sell a $20 shirt with $8 shipping and $2 tax, the fee is calculated on $30, not $20. This is one of the most common mistakes sellers make when pricing.
                  </p>
                </div>

                {/* Boosted Listing Fee */}
                <div className="bg-white border-2 border-purple-200 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-purple-600 mb-4 flex items-center gap-2">
                    <Zap className="w-6 h-6" />
                    3. Boosted Listing Fee (Optional)
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Depop also offers Boosted Listings, which let you pay for extra visibility on your items. United States and Australia sellers are charged an 8% fee on the item sale price (excluding taxes). United Kingdom sellers are charged a 12% fee.
                  </p>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Boosted listings give your items priority placement in search results and feeds, increasing visibility to potential buyers. Depop charges a fee only if a buyer who viewed or clicked your boosted listing purchases the item within 28 days.
                  </p>
                  <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-lg">
                    <p className="text-gray-700 font-semibold">
                      <strong>The 28-Day Rule:</strong> if a buyer clicks your boosted listing today but does not buy it until three weeks later — even if you have turned off the boost — you still pay the fee.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* How to Use Calculator */}
            <div className="bg-white border-2 border-green-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <BookOpen className="w-8 h-8" />
                  How to Use This Depop Fee Calculator
                </h2>
              </div>
              <div className="p-8">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  The calculator above handles everything automatically. Here is how to get the most accurate result:
                </p>

                <div className="space-y-4">
                  {[
                    { step: "Step 1 — Select your region", desc: "Choose US, UK, Australia, or International. This determines both your selling fee rate and your payment processing rate." },
                    { step: "Step 2 — Enter your selling price", desc: "Type the price you plan to list the item at, not including shipping." },
                    { step: "Step 3 — Add buyer shipping", desc: "Enter what the buyer pays for shipping. This matters because Depop fees are calculated on the total transaction amount including shipping costs. For a $100 item with $10 shipping in the US, you would pay 3.3% of $110 ($3.63) plus $0.45, totaling $4.08 in fees." },
                    { step: "Step 4 — Enter your item cost", desc: "This is what you originally paid for the item from a thrift store, wholesaler, or your own wardrobe." },
                    { step: "Step 5 — Enter your shipping cost", desc: "What does it actually cost you to ship? This affects your real profit margin." },
                    { step: "Step 6 — Choose your shipping method", desc: "Depop's prepaid shipping labels get excluded from boosting and selling fee calculations. However, self-arranged shipping gets added to the fee base. Selecting \"Depop label\" here calculates your boost fee correctly." },
                    { step: "Step 7 — Toggle Boosted Listing if applicable", desc: "If you plan to promote the item, tick this box to see your fee with the boost included." },
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
                  The calculator instantly shows your net profit, payout, total fees, and profit margin — and colour-codes your margin so you know at a glance whether your pricing is healthy.
                </p>
              </div>
            </div>

            {/* Regional Calculators */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Depop Fee Calculator by Region — US, UK, and Australia</h2>

              <div className="space-y-6">
                {/* US */}
                <div className="bg-white border-2 border-blue-200 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-blue-600 mb-3">Depop Fee Calculator US</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    US sellers currently have the most favourable fee structure on Depop. For a $50 sale on Depop, a US seller keeps about $48 versus $40 on Poshmark — that is $8 more per sale.
                  </p>
                  
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
                    <h4 className="font-bold text-gray-900 mb-3">Example calculation for US sellers:</h4>
                    <div className="space-y-2 text-gray-700">
                      <p>• Selling price: $40</p>
                      <p>• Buyer shipping: $6</p>
                      <p>• Total transaction: $46</p>
                      <p>• Processing fee: 3.3% × $46 + $0.45 = $1.52 + $0.45 = $1.97</p>
                      <p>• Depop selling fee: $0.00</p>
                      <p className="pt-2 border-t-2 border-blue-300"><strong>Total fees: $1.97</strong></p>
                      <p className="text-lg font-bold text-blue-600"><strong>Payout: $44.03</strong></p>
                    </div>
                  </div>
                </div>

                {/* UK */}
                <div className="bg-white border-2 border-purple-200 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-purple-600 mb-3">Depop Fee Calculator UK</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    UK sellers also enjoy a 0% selling commission. The processing fee is slightly lower at 2.9% but the fixed amount stays at £0.30.
                  </p>
                  
                  <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-5">
                    <h4 className="font-bold text-gray-900 mb-3">Example calculation for UK sellers:</h4>
                    <div className="space-y-2 text-gray-700">
                      <p>• Selling price: £35</p>
                      <p>• Buyer shipping: £4</p>
                      <p>• Total transaction: £39</p>
                      <p>• Processing fee: 2.9% × £39 + £0.30 = £1.13 + £0.30 = £1.43</p>
                      <p>• Depop selling fee: £0.00</p>
                      <p className="pt-2 border-t-2 border-purple-300"><strong>Total fees: £1.43</strong></p>
                      <p className="text-lg font-bold text-purple-600"><strong>Payout: £37.57</strong></p>
                    </div>
                  </div>
                </div>

                {/* Australia */}
                <div className="bg-white border-2 border-orange-200 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-orange-600 mb-3">Depop Fee Calculator Australia</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Australian sellers face both the 10% selling fee and a payment processing fee, making accurate fee calculation even more critical before listing.
                  </p>
                  
                  <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-5">
                    <h4 className="font-bold text-gray-900 mb-3">Example calculation for AU sellers:</h4>
                    <div className="space-y-2 text-gray-700">
                      <p>• Selling price: A$50</p>
                      <p>• Buyer shipping: A$8</p>
                      <p>• Total transaction: A$58</p>
                      <p>• Depop selling fee: 10% × A$58 = A$5.80</p>
                      <p>• Processing fee: 2.6% × A$58 + A$0.30 = A$1.51 + A$0.30 = A$1.81</p>
                      <p className="pt-2 border-t-2 border-orange-300"><strong>Total fees: A$7.61</strong></p>
                      <p className="text-lg font-bold text-orange-600"><strong>Payout: A$50.39</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction vs Selling Fee */}
            <div className="bg-white border-2 border-teal-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">Depop Transaction Fee vs Depop Selling Fee — What Is the Difference?</h2>
              </div>
              <div className="p-8">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Many sellers on Reddit and in reseller communities confuse these two terms. Here is the clear distinction:
                </p>
                <div className="space-y-4">
                  <div className="p-5 bg-teal-50 border-2 border-teal-200 rounded-xl">
                    <p className="text-gray-700 leading-relaxed">
                      The <strong>Depop selling fee</strong> (also called the marketplace fee or commission) is what Depop charges for using the platform. For US and UK sellers, this is currently 0%. For international sellers, it is 10%.
                    </p>
                  </div>
                  <div className="p-5 bg-cyan-50 border-2 border-cyan-200 rounded-xl">
                    <p className="text-gray-700 leading-relaxed">
                      The <strong>transaction fee</strong> (payment processing fee) is what Stripe or PayPal charges to process the payment. This applies to every seller in every country — regardless of whether they pay a selling fee. The payment processing fee includes both a percentage and a fixed amount, which makes manual math more time-consuming than expected — especially when you are pricing multiple items.
                    </p>
                  </div>
                </div>
                <p className="mt-6 p-4 bg-teal-100 border-2 border-teal-300 rounded-lg text-gray-700 font-semibold">
                  When people search for a "depop fee and transaction fee calculator," they want a tool that shows both deductions together — which is exactly what the calculator above does.
                </p>
              </div>
            </div>

            {/* Shipping Fees */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Package className="w-8 h-8 text-yellow-600" />
                How Depop Fees Apply to Shipping — A Detail Most Sellers Miss
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                One of the most expensive mistakes Depop sellers make is forgetting that fees apply to the shipping amount the buyer pays — not just the item price.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                A $30 vintage sweatshirt with $8 self-arranged shipping means US sellers pay payment processing fees on the full $38, because processing is calculated on item price plus shipping and any taxes.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                This means your choice of shipping method directly affects your total fee. If you use a Depop shipping label, the cost of the label is excluded from boosting fees, lowering your advertising expense for promoted items. For a $30 item with Depop shipping, the boosting fee applies only to the $30 item price, adding only $2.40 in boost fees rather than more if you had charged for shipping separately.
              </p>
              <div className="p-5 bg-yellow-100 border-2 border-yellow-300 rounded-xl">
                <p className="text-gray-700 font-semibold">
                  <strong>Key takeaway:</strong> Using Depop's own shipping labels saves you money on boosted listing fees. The calculator above accounts for this when you select your shipping method.
                </p>
              </div>
            </div>

            {/* Bundles and Refunds */}
            <div className="bg-white border-2 border-pink-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Depop Fees for Bundles</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                If you sold a bundle on Depop and are based outside of the UK or US, Depop selling fees will apply for each item you sold. For US and UK sellers, bundles follow the same processing-fee-only structure as individual sales.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-8">What Happens to Fees When You Refund a Sale?</h2>
              <p className="text-gray-700 leading-relaxed">
                If your sale is refunded, all fees — the selling fee, payments processing fees, and boosting fees — will be reversed too. This happens automatically for transactions using Depop Payments.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Generally, Depop does not charge you a fee if a return happens, but you usually eat the shipping cost. The selling fee and processing fee get refunded, but the shipping label cost is not recovered if you paid for it.
              </p>
            </div>

            {/* Tips to Maximize Profit */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-green-600" />
                Tips to Maximise Your Depop Profit Margin
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Understanding fees is only half the equation. Here is how experienced Depop sellers protect their margins:
              </p>

              <div className="space-y-4">
                {[
                  { title: "Price with fees built in from day one", desc: "Before you list, run the numbers through the calculator. Set your price at the level that delivers the profit you actually want — not the profit you hope for after deductions." },
                  { title: "Factor in shipping weight carefully", desc: "If you misjudge the weight — for example, listing a 1.1lb item as \"Medium\" — USPS will charge the difference to Depop, who will then deduct it from your payout." },
                  { title: "Use Depop shipping labels on boosted items", desc: "As shown in the Australia example above, using a Depop label excludes the label cost from the boost fee base, saving you money on every promoted sale." },
                  { title: "Refresh old listings", desc: "If you listed items before July 2024 (US) or March 2024 (UK), edit and re-save those listings to migrate them to the 0% fee tier. Keeping outdated listings costs you 10% on every sale unnecessarily." },
                  { title: "Aim for a 40–60% margin", desc: "Most successful Depop sellers aim for a profit margin of 40–60% after fees. With Depop's low fees, especially for US and UK sellers, you can often price competitively while still maintaining excellent margins." },
                  { title: "Be strategic with boosting", desc: "Boosted items are 25% more likely to sell, and you only pay the fee when your item sells after a buyer interacts with a boosted tile — so it is completely risk-free in terms of upfront cost. Use it on items with strong margins where the extra fee still leaves you in profit." },
                ].map((tip, index) => (
                  <div key={index} className="p-5 bg-white border-2 border-green-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{tip.title}</h4>
                        <p className="text-gray-700">{tip.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Comparison */}
            <div className="bg-white border-2 border-indigo-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">Depop vs Other Resale Platforms — Fee Comparison</h2>
              </div>
              <div className="p-8">
                <div className="overflow-x-auto">
                  <table className="w-full border-2 border-gray-300">
                    <thead className="bg-indigo-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Platform</th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Selling Fee</th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Processing Fee</th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Total Approx.</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        { platform: "Depop (US/UK)", selling: "0%", processing: "3.3% + $0.45", total: "~4%" },
                        { platform: "Poshmark (US)", selling: "20% flat", processing: "Included", total: "20%" },
                        { platform: "Mercari (US)", selling: "10%", processing: "2.9% + $0.30", total: "~13%" },
                        { platform: "eBay (US)", selling: "12.90%", processing: "2.7% + $0.30", total: "~15%" },
                        { platform: "Etsy (US)", selling: "6.50%", processing: "3% + $0.25", total: "~10%" },
                      ].map((row, index) => (
                        <tr key={index} className="hover:bg-indigo-50">
                          <td className="px-6 py-4 text-gray-900 font-semibold">{row.platform}</td>
                          <td className="px-6 py-4 text-gray-700">{row.selling}</td>
                          <td className="px-6 py-4 text-gray-700">{row.processing}</td>
                          <td className="px-6 py-4 text-gray-700 font-bold">{row.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <p className="mt-6 p-4 bg-indigo-100 border-2 border-indigo-300 rounded-lg text-gray-700 font-semibold">
                  For US and UK sellers, Depop currently offers one of the lowest fee structures in the resale marketplace industry. This makes it especially powerful for sellers who move high volumes of lower-priced fashion items where every dollar of margin counts.
                </p>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">FAQs</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Does Depop charge a selling fee in 2026?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Depop has eliminated the Depop selling fee as of July 2024 for US and UK sellers. For listings created after July 15, 2024, there are no Depop selling fees. For sellers outside the US and UK, there is still a flat 10% fee.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How does Depop calculate fees on shipping?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Depop fees are calculated on the total transaction amount including shipping costs. Both the processing fee and (where applicable) the 10% selling fee apply to the item price plus whatever the buyer pays for shipping — not just the item price alone.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Can I avoid Depop fees?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    You cannot avoid Depop fees as they are automatically deducted from all sales made through the platform. The only fee that is optional is the boosted listing fee, which you pay only if you choose to promote your items.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is the Depop fee for UK sellers?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    UK sellers pay a 2.9% + £0.30 payment processing fee on each sale. There is no selling commission. If you boost a listing and it sells via the boosted tile, you also pay a 12% boosting fee on the item sale price.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is the Depop fee for Australian sellers?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Australia sellers pay 10% + 2.6% + A$0.30 per transaction. This means Australian sellers need to price significantly higher than US or UK counterparts to achieve the same profit margin.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Does Depop take fees from bundles?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Yes. For international sellers, the 10% selling fee applies to each item in a bundle. For US and UK sellers, only the standard payment processing fee applies to the full bundle transaction.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is the Depop boosted listing fee?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    UK sellers pay 12% (since December 2025), while US and Australia sellers pay 8%. The fee is charged on the item price plus buyer-paid shipping if you did not use a Depop shipping label.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Does Depop refund fees on cancelled or returned orders?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Yes. If your sale is refunded, all fees — including the selling fee, payments processing fees, and boosting fees — will be reversed automatically for transactions using Depop Payments.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-9">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How do I calculate Depop fees manually?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    For US sellers: multiply your total transaction (price + shipping) by 0.033, then add $0.45. That is your total fee. Subtract it from your total revenue to find your payout. Then subtract your item cost and your shipping cost to find your net profit. Or just use the calculator at the top of this page and get the answer in one second.
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
