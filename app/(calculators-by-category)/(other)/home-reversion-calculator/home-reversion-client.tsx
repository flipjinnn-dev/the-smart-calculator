"use client"

import HomeReversionCalculator from "@/components/home-reversion-calculator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Home, Info, Calculator, TrendingUp, AlertCircle, CheckCircle, FileText, DollarSign, Users, Heart, Shield } from "lucide-react"

export default function HomeReversionClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        
        {/* H1 - Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Home Reversion Calculator — Estimate Your Equity Release Payout Instantly
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            A home reversion plan lets you sell between 20% and 100% of your property to a provider in exchange for a tax-free lump sum or regular income while keeping the right to live there for life, rent-free. You typically receive between 20% and 60% of the market value of the share you sell, depending on your age and health. Use the free home reversion calculator above to get an instant estimate.
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-6 mb-12">
          <div className="flex items-start gap-4">
            <div className="bg-amber-600 text-white p-3 rounded-xl">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Important</h2>
              <p className="text-gray-700 leading-relaxed">
                Home reversion plans are regulated by the Financial Conduct Authority (FCA). This calculator provides illustrative figures only. Always speak with an independent, Equity Release Council-registered adviser before making any decision.
              </p>
            </div>
          </div>
        </div>

        {/* Main Calculator Card */}
        <div className="mb-16">
          <HomeReversionCalculator />
        </div>

        {/* What Is a Home Reversion Plan Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Home className="w-8 h-8 text-blue-600" />
            What Is a Home Reversion Plan?
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              A home reversion plan is a type of equity release product available to homeowners in later life. It is a type of equity release where homeowners sell a portion of their property to a reversion provider, receiving cash based on the percentage sold. The homeowner can continue living in the property without paying rent. Upon the sale of the home, the provider receives their agreed share of the proceeds.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Unlike a lifetime mortgage, you do not take on any debt. There are no monthly repayments, no interest charges, and no compounding loan balance. You simply exchange a percentage of your future property value for cash today.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Home reversion plans were first introduced in the UK in the 1960s as a way for older homeowners to access the equity in their homes. Although this market has gone through ups and downs over the decades, it has grown immensely in recent years thanks to improved regulation and provider standards.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The key figures that drive a home reversion calculation are your age, your property value, the percentage you choose to sell, and your health status. The calculator above uses all four inputs to produce an instant, personalised estimate.
            </p>
          </div>
        </section>

        {/* How the Calculator Works Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Calculator className="w-8 h-8 text-green-600" />
            How the Home Reversion Calculator Works
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-6">
            <p className="text-gray-700 leading-relaxed">
              The free home reversion plan calculator above gives you a realistic estimate in seconds. Here is what each input does and why it matters:
            </p>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Home className="w-6 h-6 text-blue-600" />
                  Property Value
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Enter the current market value of your home. Providers commission an independent survey to verify this figure, so use a realistic estimate not an aspirational one. The property must be a minimum of £50,000 and located in the UK to qualify.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-orange-600" />
                  Outstanding Mortgage
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  If you still carry a mortgage balance, you must repay it from the proceeds of the home reversion plan. The calculator subtracts your outstanding mortgage to show you the true net equity you hold.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-6 h-6 text-green-600" />
                  Age of the Youngest Homeowner
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  Age is the single biggest variable in any home reversion equity release calculator. If you are older or in poor health when you take out a home reversion scheme, you might get a better deal. That is because you will probably stay in your home for a shorter time, so your provider is taking less of a gamble on how house prices might change.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  You can only take out a home reversion plan if you are aged 65 or older. Some providers set their minimum at 60 or 55, but the most common minimum is 65 for home reversion specifically. The older you are at application, the higher the percentage of market value the provider offers you.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                  Share of Home to Sell
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Home reversion plans let people sell between 20% and 60% of their home in return for a cash lump sum, a regular income, or both. Some providers allow you to sell up to 100% of the property. The calculator lets you explore the full range from 20% to 100% by moving the slider and shows you instantly how your payout and retained equity change.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-red-600" />
                  Health Status
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Providers assess your health because it affects how long they expect to wait before recovering their share. If you have qualifying medical conditions diabetes, heart disease, limited mobility you may receive an "enhanced" offer at a higher percentage of market value. The calculator applies an approximate enhanced adjustment to reflect this.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Formula Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <FileText className="w-8 h-8 text-indigo-600" />
            How to Calculate Reversion Value — The Formula Explained
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Many people ask how to calculate a home reversion payout manually. The core formula is straightforward:
            </p>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Home Reversion Formula</h3>
              <div className="bg-white rounded-lg p-6 text-center">
                <div className="text-2xl font-bold text-indigo-600">
                  Estimated cash = Property value × Share sold × (1 − Provider discount rate)
                </div>
              </div>
              <p className="text-gray-700 mt-4">
                The provider discount rate is the percentage below market value that the provider pays. This discount exists because the provider pays less than full market value since they may wait many years before selling the property.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Example — Home Reversion Calculation for a 70-Year-Old:</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="border-2 border-blue-300 p-3 text-left font-semibold">Input</th>
                      <th className="border-2 border-blue-300 p-3 text-left font-semibold">Figure</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border-2 border-blue-200 p-3">Property value</td>
                      <td className="border-2 border-blue-200 p-3 font-semibold">£350,000</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border-2 border-blue-200 p-3">Share sold</td>
                      <td className="border-2 border-blue-200 p-3 font-semibold">40%</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border-2 border-blue-200 p-3">Market value of sold share</td>
                      <td className="border-2 border-blue-200 p-3 font-semibold">£140,000</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border-2 border-blue-200 p-3">Provider discount (70 yrs, standard health)</td>
                      <td className="border-2 border-blue-200 p-3 font-semibold">~52%</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border-2 border-green-300 p-3 font-bold">Estimated cash received</td>
                      <td className="border-2 border-green-300 p-3 font-bold text-green-600">~£67,200</td>
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="border-2 border-purple-300 p-3 font-bold">Share retained</td>
                      <td className="border-2 border-purple-300 p-3 font-bold text-purple-600">60% = £210,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-700 mt-4">
                This illustrates why a home reversion value calculator is essential before you approach any provider. The raw headline of "sell 40%" sounds simple, but what you actually receive is considerably less than 40% of your property's value typically between 20% and 60% of the market value of that share.
              </p>
              <p className="text-gray-700 mt-3">
                The amount of equity you can release varies from 30.9% to 59.3% of the property's value; however, many factors influence this amount, such as your age and the size of the home share you sell.
              </p>
            </div>
          </div>
        </section>

        {/* Minimum Age Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Users className="w-8 h-8 text-orange-600" />
            Home Reversion Plan Minimum Age
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              Home reversion plans are not available to anyone under the age of 65. This is the standard minimum set by most providers and enforced under FCA regulatory requirements. Some brokers and calculators cite age 60 or even 55 for equity release broadly, but those lower ages typically apply to lifetime mortgages rather than home reversion plans specifically.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Younger applicants receive lower offers because the provider expects a longer wait before recovering their investment. A 65-year-old applicant typically receives a significantly lower proportion of market value than an 80-year-old, even for the same percentage of home sold.
            </p>
          </div>
        </section>

        {/* Home Reversion vs Lifetime Mortgage */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-purple-600" />
            Home Reversion vs Lifetime Mortgage — Key Differences
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-6">
            <p className="text-gray-700 leading-relaxed">
              This is one of the most common questions people bring to a home reversion equity release calculator session. Both products unlock cash tied up in your home, but they operate very differently.
            </p>
            <p className="text-gray-700 leading-relaxed">
              A lifetime mortgage is a loan secured against your home. You keep full ownership, but the lender charges interest on the amount you borrow. The loan and accumulated interest are usually repaid when you die or move into long-term care.
            </p>
            <p className="text-gray-700 leading-relaxed">
              A home reversion plan, by contrast, charges no interest at all. You give up a fixed percentage of your home's ownership permanently. Whereas a lifetime mortgage will charge a compounded interest rate and add this amount to the total owed each month, a home reversion scheme does not charge any interest whatsoever.
            </p>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Complete Comparison Table</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-purple-100">
                      <th className="border-2 border-purple-300 p-3 text-left font-semibold">Feature</th>
                      <th className="border-2 border-purple-300 p-3 text-left font-semibold">Home Reversion Plan</th>
                      <th className="border-2 border-purple-300 p-3 text-left font-semibold">Lifetime Mortgage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border-2 border-purple-200 p-3 font-semibold">Ownership</td>
                      <td className="border-2 border-purple-200 p-3">Partially transferred</td>
                      <td className="border-2 border-purple-200 p-3">You keep full ownership</td>
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="border-2 border-purple-200 p-3 font-semibold">Interest charged</td>
                      <td className="border-2 border-purple-200 p-3">None</td>
                      <td className="border-2 border-purple-200 p-3">Yes compounds over time</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border-2 border-purple-200 p-3 font-semibold">Monthly repayments</td>
                      <td className="border-2 border-purple-200 p-3">None</td>
                      <td className="border-2 border-purple-200 p-3">None (or optional)</td>
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="border-2 border-purple-200 p-3 font-semibold">Minimum age</td>
                      <td className="border-2 border-purple-200 p-3">65</td>
                      <td className="border-2 border-purple-200 p-3">55</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border-2 border-purple-200 p-3 font-semibold">Payout as % of value</td>
                      <td className="border-2 border-purple-200 p-3">20–60% of sold share</td>
                      <td className="border-2 border-purple-200 p-3">Higher upfront amount</td>
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="border-2 border-purple-200 p-3 font-semibold">Estate impact</td>
                      <td className="border-2 border-purple-200 p-3">Fixed % given up</td>
                      <td className="border-2 border-purple-200 p-3">Loan + interest repaid from sale</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border-2 border-purple-200 p-3 font-semibold">Reversibility</td>
                      <td className="border-2 border-purple-200 p-3">Very expensive to reverse</td>
                      <td className="border-2 border-purple-200 p-3">More flexible</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-700 mt-4">
                Lifetime mortgages are much more popular than home reversion plans, making up most of the equity release market. But a home reversion scheme might still be a better choice for you, particularly if you are older or in poor health.
              </p>
            </div>
          </div>
        </section>

        {/* Home Reversion vs Reverse Mortgage */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Info className="w-8 h-8 text-teal-600" />
            Home Reversion vs Reverse Mortgage
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              In countries like the United States and Australia, a "reverse mortgage" functions similarly to a UK lifetime mortgage it is a loan against your home that grows with interest. The UK does not use the term "reverse mortgage" formally. A home reversion plan is distinct from a reverse mortgage because it involves no borrowing and no interest. You sell equity outright rather than borrowing against it.
            </p>
          </div>
        </section>

        {/* What Calculator Shows Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Calculator className="w-8 h-8 text-blue-600" />
            What Does the Reversion Value Calculator Show You?
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              The free home reversion plan calculator on this page shows you four key results:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold">Estimated cash release</span> — the approximate lump sum you would receive from the provider after their discount is applied.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold">Net equity retained</span> — the portion of your home's current value that remains yours (and eventually passes to your estate).
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold">Share sold to provider</span> — expressed as a percentage, so you can clearly see what you are giving up.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold">Percentage of market value received</span> — this reveals how much of the sold share's market value the provider actually pays you. The higher your age, the higher this percentage tends to be.
                </div>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              These four figures give you everything you need to begin a meaningful conversation with an FCA-regulated equity release adviser.
            </p>
          </div>
        </section>

        {/* Pros and Cons Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Shield className="w-8 h-8 text-green-600" />
            Pros and Cons of a Home Reversion Plan
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6" />
                  Advantages
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>You can typically raise a larger sum from your home with a reversion plan than would be available with a lifetime mortgage.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>You can benefit from any future increase in the value of the home from the proportion you retain.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>The older you are, the more money you will generally be able to release.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>You can remove your home entirely from your estate to reduce any potential inheritance tax.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>The ability to release a tax-free lump sum or receive a regular income.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>The certainty of knowing how much of your property you have sold as well as how much you have retained.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>The ability to live in your property rent-free for the rest of your life.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6" />
                  Disadvantages
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>If you die shortly after taking out a home reversion scheme, your loved ones will receive less as you do not receive the full market value at the outset.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>There is no scope to return for further funds in the future if you sell all of your home.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>It is expensive to reverse your home would have to be purchased back from the reversion lender at the full market value.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>It can also affect your entitlement to any means-tested benefits.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>A large cash lump sum may affect your eligibility for Pension Credit, Council Tax Reduction, or other income-tested support. Always check this with a benefits adviser before proceeding.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Who Is It Best For Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-600" />
            Who Is a Home Reversion Plan Best Suited For?
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-4">
            <p className="text-gray-700 leading-relaxed">
              A home reversion plan works best in specific situations. It suits you if:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold">You are over 70 and want certainty.</span> Older applicants often receive better offers because providers expect a shorter plan duration.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold">If you need funds to cover care costs,</span> many families use home equity release to help pay for in-home care or residential care.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold">If inheritance is not your main priority</span> and you do not depend on passing on the full value of your property, selling a fixed share may feel acceptable.
                </div>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Conversely, if you value retaining full legal ownership, prefer flexibility, or plan to move in the next few years, a lifetime mortgage or downsizing may serve you better.
            </p>
          </div>
        </section>

        {/* Costs Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-orange-600" />
            Costs to Factor Into Your Home Reversion Calculation
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Beyond the provider's discount, home reversion plans carry set-up costs that affect your true net payout. These typically include:
            </p>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-5 rounded-r-xl">
                <div className="font-semibold text-gray-900 mb-2">A property valuation fee</div>
                <p className="text-gray-700">
                  Usually £150 to £300.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-5 rounded-r-xl">
                <div className="font-semibold text-gray-900 mb-2">A solicitor's fee</div>
                <p className="text-gray-700">
                  Typically £500 to £1,500. You must instruct your own solicitor who will confirm you understand the agreement fully. It is important you are clear on the terms and set-up costs of your home reversion plan. To complete the equity release process, you will need to instruct a solicitor to act on your behalf.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-500 p-5 rounded-r-xl">
                <div className="font-semibold text-gray-900 mb-2">A financial adviser fee</div>
                <p className="text-gray-700">
                  This is mandatory for regulated equity release products. Some advisers charge a flat fee; others take a commission from the provider. Always ask upfront.
                </p>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-500 p-5 rounded-r-xl">
                <div className="font-semibold text-gray-900 mb-2">Application fees</div>
                <p className="text-gray-700">
                  These vary by provider and may or may not be refundable if you choose not to proceed.
                </p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mt-4">
              Enter these costs into your own calculations alongside the lump sum estimate to understand the full picture before you commit.
            </p>
          </div>
        </section>

        {/* FAQ Section - COMPLETE with all 10 questions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Info className="w-8 h-8 text-blue-600" />
            FAQs
          </h2>
          <Accordion type="single" collapsible className="bg-white rounded-2xl border-2 border-gray-200">
            <AccordionItem value="item-1" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                What is a home reversion calculator?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                A home reversion calculator is a free online tool that estimates how much tax-free cash you could receive from a home reversion plan. You enter your property value, age, the share of your home you want to sell, and your health status. The calculator applies an age-based discount rate to show you an approximate lump sum, your retained equity, and the percentage of market value you receive.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                How much can I release with a home reversion plan?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                The amount received is typically between 20% and 60% of the property's market value, depending on factors such as age and the percentage of the home sold. The older you are, the more favourable the rate. A healthy 80-year-old typically receives a significantly higher proportion than a 65-year-old.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                What is the minimum age for a home reversion plan?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                Home reversion plans are not available to anyone under the age of 65. This minimum applies to all applicants named on the plan the youngest must meet this age requirement at the point of application.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                Is a home reversion plan tax-free?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                Yes. The funds released through equity release are tax-free, providing a potential financial boost for retirement or other needs. The cash you receive does not count as income for tax purposes. However, it may affect means-tested benefits, so always verify your benefit entitlement before proceeding.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                How does a home reversion plan affect my estate?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                The ownership split stays fixed. The provider does not charge interest. Your estate simply receives whatever remains after their percentage when the property eventually sells. If you sell 40% and the property later sells for £400,000, your estate receives 60% £240,000 regardless of how much the property has risen or fallen since you took out the plan.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                Can I sell 100% of my home with a reversion plan?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                Yes, some providers allow you to sell your entire home. If you sell 100% of your home, there will be no property value to leave to your loved ones. However, you retain the guaranteed right to live there rent-free for the rest of your life or until you move into permanent long-term care.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                How does home reversion differ from a reverse mortgage?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                A reverse mortgage (common in the US) is a loan against your property that grows with interest similar to a UK lifetime mortgage. A home reversion plan involves no loan and no interest. You permanently sell a share of your home in exchange for cash. The UK does not use "reverse mortgage" as a formal product category. If you are searching for "how to calculate a reverse mortgage" in a UK context, a lifetime mortgage calculator is the closest equivalent.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                What happens when my home reversion plan ends?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                The home reversion plan comes to an end typically when the last remaining applicant passes away or moves into long-term care. The home reversion provider then takes its percentage share of the sale proceeds. Your estate receives the remaining share of whatever the property fetches at sale.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="border-b border-gray-200 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                Can I reverse a home reversion plan?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                It is expensive to reverse your home would have to be purchased back from the reversion lender at the full market value. Because you initially sold your share at a significant discount, buying it back at full market value results in a substantial financial loss. This makes home reversion a long-term, largely irrevocable commitment.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10" className="px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-blue-600">
                Does the home reversion calculator result guarantee an offer?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                No. The home reversion scheme results shown in your calculation are only for illustrative purposes and cannot be guaranteed. To understand the features, benefits and risks of a home reversion plan, you should contact an adviser and ask for your own individual, personalised illustration. Actual offers depend on a formal property valuation, a detailed health assessment, and the specific terms of your chosen provider.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
        
      </div>
    </div>
  )
}

