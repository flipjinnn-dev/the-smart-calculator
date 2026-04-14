"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import EvonyTroopCalculator from "@/components/evony-troop-calculator"
import { Swords, Shield, Target, Hammer, TrendingUp, Calculator, Info, BookOpen, Users } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function EvonyTroopCalculatorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Evony Troop Cost Calculator
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
                The Evony Troop Cost Calculator uses three inputs—Troop Type (Mounted, Ground, Ranged, Siege), Troop Tier (T1–T16), and Troop Target—to instantly calculate total food, lumber, stone, ore, gold cost, and power gain before training troops.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <EvonyTroopCalculator />
        </div>

        <div className="prose prose-lg max-w-none space-y-12">
          <Card className="border-2 border-blue-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-blue-900">
                <Calculator className="w-7 h-7 text-blue-600" />
                What This Evony Troop Cost Calculator Does
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                If you want to train troops in Evony: The King's Return without running out of resources halfway through, this calculator is your first stop.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Most players open their barracks, pick a troop, and start training then panic when lumber or ore runs dry at 60 percent completion. This Evony troop calculator eliminates that problem completely.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You give it three things:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Troop Type</strong> — Mounted, Ground, Ranged, or Siege</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Troop Tier</strong> — anywhere from T1 to T16</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold mt-1">•</span>
                  <span><strong>Troop Target</strong> — the exact quantity you want to build</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                It gives you back the complete resource bill and your power gain before you commit a single resource.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-green-900">
                <Swords className="w-7 h-7 text-green-600" />
                Input 1 — Troop Type (Mounted, Ground, Ranged, Siege)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                The first thing the Evony troop cost calculator asks you is which of the four troop types you are training. This matters because each type has a different resource cost structure, a different role in battle, and a different power value per unit.
              </p>

              <h3 className="text-xl font-bold text-green-900 mt-6">Mounted Troops (Cavalry)</h3>
              <p className="text-gray-700 leading-relaxed">
                Mounted troops are your fastest and most aggressive attack force. They deal heavy damage against Ground troops and excel in open-field PvP battles. However, they are expensive Mounted troops cost significantly more ore per unit than Ground or Ranged at the same tier.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Use the Evony troop calculator for Mounted troops when:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">•</span>
                  <span>Planning a PvP attack march that needs maximum offensive power</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">•</span>
                  <span>Calculating whether your ore stockpile supports a large Cavalry batch before a war event</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">•</span>
                  <span>Comparing the cost of T12 Mounted vs T14 Mounted to find the tier your economy actually supports</span>
                </li>
              </ul>

              <h3 className="text-xl font-bold text-green-900 mt-6">Ground Troops (Infantry)</h3>
              <p className="text-gray-700 leading-relaxed">
                Ground troops are your defensive backbone and your layering filler. They counter Mounted troops, absorb damage well, and form the foundation of every serious defensive setup. Ground troops at low tiers (T1 to T5) are also the cheapest filler troops available — critical for hospital buffer layering strategies.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Use the calculator for Ground troops when:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">•</span>
                  <span>Building your defensive layer before a Server War</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">•</span>
                  <span>Calculating how many T1 Ground troops you can train as filler with leftover resources</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">•</span>
                  <span>Planning a T12 or T14 Ground batch for a serious defense upgrade</span>
                </li>
              </ul>
              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded mt-4">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Experience note:</strong> Never skip calculating even cheap T1 Ground troops. Players building large filler layers for hospital buffering sometimes need 2 to 5 million T1 troops and even at low cost, that adds up to hundreds of millions of food. The calculator catches this before it wipes your farm.
                </p>
              </div>

              <h3 className="text-xl font-bold text-green-900 mt-6">Ranged Troops</h3>
              <p className="text-gray-700 leading-relaxed">
                Ranged troops attack from a distance and deal effective damage against Mounted troops. They are a critical mid-layer in balanced armies and the primary troop type for certain boss monster compositions. Ranged troops have a notably high lumber requirement compared to other types at the same tier.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Use the calculator for Ranged troops when:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">•</span>
                  <span>Building the support layer of a layered march</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">•</span>
                  <span>Preparing a boss-farming army optimized for monsters weak to Ranged damage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">•</span>
                  <span>Checking whether your lumber stockpile supports a Ranged training batch before you start</span>
                </li>
              </ul>

              <h3 className="text-xl font-bold text-green-900 mt-6">Siege Troops</h3>
              <p className="text-gray-700 leading-relaxed">
                Siege troops deal massive damage to buildings and fortifications but move slowly and are vulnerable without protection. High-tier Siege machines are among the most resource-intensive troops in the game their ore and gold costs at T12 and above are the highest of any troop type.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Use the calculator for Siege troops when:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">•</span>
                  <span>Planning a Keep attack that requires breaking through high-level walls</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">•</span>
                  <span>Calculating the exact cost of adding a Siege layer to your march</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-1">•</span>
                  <span>Checking whether a Siege batch is feasible before a coordinated alliance rally</span>
                </li>
              </ul>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded mt-4">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Key insight:</strong> Many players ignore Siege in their cost planning because they train smaller quantities. But 50,000 T12 Siege machines cost more in ore than 500,000 T10 Cavalry. Always run the Siege numbers through the troop cost calculator Evony before you start the resource bill surprises most players the first time they see it.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-purple-900">
                <TrendingUp className="w-7 h-7 text-purple-600" />
                Input 2 — Troop Tier (T1 Through T16)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                The second input and the one that changes your resource bill the most dramatically — is Troop Tier. The Evony troop tier calculator logic applies a scaling multiplier at each tier level. The cost difference between T7 and T10 is significant. The difference between T10 and T14 is enormous. The difference between T14 and T16 is staggering.
              </p>

              <h3 className="text-xl font-bold text-purple-900 mt-6">Troop Cost Scaling by Tier — What to Expect</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border-2 border-purple-200 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-purple-100">
                      <th className="border border-purple-200 p-3 text-left font-bold text-purple-900">Tier Range</th>
                      <th className="border border-purple-200 p-3 text-left font-bold text-purple-900">Cost Level</th>
                      <th className="border border-purple-200 p-3 text-left font-bold text-purple-900">Best For</th>
                      <th className="border border-purple-200 p-3 text-left font-bold text-purple-900">Who Should Train</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-purple-200 p-3 font-semibold">T1 – T3</td>
                      <td className="border border-purple-200 p-3">Minimal</td>
                      <td className="border border-purple-200 p-3">Hospital filler, march buffer layers</td>
                      <td className="border border-purple-200 p-3">All players</td>
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="border border-purple-200 p-3 font-semibold">T4 – T6</td>
                      <td className="border border-purple-200 p-3">Low</td>
                      <td className="border border-purple-200 p-3">Early-game army building</td>
                      <td className="border border-purple-200 p-3">New players, K20 and below</td>
                    </tr>
                    <tr>
                      <td className="border border-purple-200 p-3 font-semibold">T7 – T9</td>
                      <td className="border border-purple-200 p-3">Moderate</td>
                      <td className="border border-purple-200 p-3">Mid-game core troops</td>
                      <td className="border border-purple-200 p-3">Developing players, K25 range</td>
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="border border-purple-200 p-3 font-semibold">T10 – T11</td>
                      <td className="border border-purple-200 p-3">High</td>
                      <td className="border border-purple-200 p-3">Best power-to-cost ratio troops</td>
                      <td className="border border-purple-200 p-3">Mid-to-late game, K30 range</td>
                    </tr>
                    <tr>
                      <td className="border border-purple-200 p-3 font-semibold">T12 – T13</td>
                      <td className="border border-purple-200 p-3">Very High</td>
                      <td className="border border-purple-200 p-3">Competitive PvP core troops</td>
                      <td className="border border-purple-200 p-3">Late-game players, K35+</td>
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="border border-purple-200 p-3 font-semibold">T14 – T15</td>
                      <td className="border border-purple-200 p-3">Extreme</td>
                      <td className="border border-purple-200 p-3">Elite war troops</td>
                      <td className="border border-purple-200 p-3">Established players, strong economies</td>
                    </tr>
                    <tr>
                      <td className="border border-purple-200 p-3 font-semibold">T16</td>
                      <td className="border border-purple-200 p-3">Massive</td>
                      <td className="border border-purple-200 p-3">Top-tier combat</td>
                      <td className="border border-purple-200 p-3">End-game, K45+, major spenders</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-bold text-purple-900 mt-6">Tier Unlock Requirements</h3>
              <p className="text-gray-700 leading-relaxed">
                The troop tier calculator shows you costs for all tiers — but you can only train the tiers your Keep level actually unlocks. Here is the general unlock structure:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold mt-1">•</span>
                  <span><strong>T1 – T3:</strong> Available from Keep Level 1</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold mt-1">•</span>
                  <span><strong>T4 – T6:</strong> Unlocks around Keep Level 15 to 20</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold mt-1">•</span>
                  <span><strong>T7 – T9:</strong> Unlocks around Keep Level 20 to 25</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold mt-1">•</span>
                  <span><strong>T10 – T11:</strong> Unlocks at Keep Level 25+</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold mt-1">•</span>
                  <span><strong>T12 – T13:</strong> Requires Keep Level 30+, significant Academy research</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold mt-1">•</span>
                  <span><strong>T14 – T15:</strong> Requires Keep Level 35+, advanced research chain completion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold mt-1">•</span>
                  <span><strong>T16:</strong> Requires Keep Level 40+, top-tier research</span>
                </li>
              </ul>
              <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded mt-4">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Practical tip:</strong> Use the calculator to compare adjacent tiers before training. The jump from T11 to T12 is a major cost spike, and it helps you avoid overspending resources on troops your economy can't sustain.
                </p>
              </div>

              <h3 className="text-xl font-bold text-purple-900 mt-6">The T10 Sweet Spot</h3>
              <p className="text-gray-700 leading-relaxed">
                Experienced players consistently identify T10 as the best value tier for most mid-game players. The Evony troop power calculator output confirms this — T10 delivers the highest power gain per resource unit spent of any tier available to Keep 25 to 30 players.
              </p>
              <p className="text-gray-700 leading-relaxed">
                If you are between K25 and K30 and unsure which tier to focus on, run both T10 and T12 through the cost calculator with your target quantity. The resource gap will tell you clearly whether your economy is ready for T12 or whether T10 is the smarter investment at your current stage.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-orange-900">
                <Target className="w-7 h-7 text-orange-600" />
                Input 3 — Troop Target (How Many Troops You Want to Train)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                The third input is the quantity your Troop Target. This is the number of troops you want to train in this batch. The calculator multiplies your per-unit cost by this number to give you the total resource bill.
              </p>

              <h3 className="text-xl font-bold text-orange-900 mt-6">How to Set Your Troop Target Smartly</h3>
              
              <p className="text-gray-700 leading-relaxed">
                <strong>For Resource Consumption Events:</strong> The Resource Consumption Event rewards players for spending large quantities of resources within the event window. Before the event starts, decide your target reward tier, then work backward through the calculator to find the troop quantity that generates exactly the resource spend you need.
              </p>
              <p className="text-gray-700 leading-relaxed">
                For example: if the top event reward requires spending 2 billion total resources, input your chosen troop type and tier into the calculator, then adjust the Troop Target quantity until the total resource output matches your event goal. This gives you an exact training target to hit during the event.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                <strong>For War Preparation:</strong> Before any Server War, Alliance War, or Keep Warfare event, decide your minimum acceptable army size. Run that number through the Evony troop build calculator to confirm your resources support the full batch before the war window opens.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                <strong>For March Optimization:</strong> Your Troop Target should align with your march capacity. Use your march size limit as your maximum quantity target, then use the calculator to find the most resource-efficient composition that fills that march completely.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                <strong>For Layering Builds:</strong> If you are building a layered army, run separate calculations for each layer. For example:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold mt-1">•</span>
                  <span>T12 Cavalry: 200,000 troops — run cost calculation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold mt-1">•</span>
                  <span>T10 Ranged: 150,000 troops — run cost calculation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold mt-1">•</span>
                  <span>T7 Ground: 300,000 troops — run cost calculation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold mt-1">•</span>
                  <span>T1 Infantry: 500,000 troops — run cost calculation</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Add all four outputs together for your total resource requirement across the complete layered build.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-red-900">
                <BookOpen className="w-7 h-7 text-red-600" />
                Evony Troop RSS Calculator — Reading the Output
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                After you enter your Troop Type, Troop Tier, and Troop Target and hit Calculate, the Evony troop RSS calculator outputs five resource values plus your power gain.
              </p>

              <h3 className="text-xl font-bold text-red-900 mt-6">Understanding Each Output</h3>
              
              <p className="text-gray-700 leading-relaxed">
                <strong>Food:</strong> Food is consumed primarily by Mounted and Ground troops at higher tiers. Food is typically the easiest resource to stockpile through farming but becomes a significant cost at T12 and above for large batches.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                <strong>Lumber:</strong> Lumber is the most commonly bottlenecked resource for Ranged troop training. High-tier Ranged troops have disproportionately high lumber costs. If the calculator shows your lumber requirement is higher than your current stockpile, prioritize lumber-focused gathering marches before starting the batch.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                <strong>Stone:</strong> Stone requirements are moderate across most troop types but spike significantly for Siege machines. Always check your stone balance before a large Siege batch.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                <strong>Ore:</strong> Ore is the primary bottleneck for Mounted (Cavalry) training at high tiers. T12 and T14 Cavalry ore costs shock many players the first time they calculate them accurately. Ore is also the slowest resource to gather, so plan your ore accumulation well in advance of any major Cavalry training session.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                <strong>Gold:</strong> Gold requirements scale sharply at higher tiers and are the hardest resource to accumulate without active play. If your gold output is insufficient to support your planned Troop Target, reduce your batch size or split it across multiple smaller training sessions.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                <strong>Power Gain:</strong> This tells you exactly how much your total power score increases from this batch. Use this number to plan for power milestone events and to track whether your training investments are delivering the power growth your strategy requires.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-indigo-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-indigo-900">
                <Shield className="w-7 h-7 text-indigo-600" />
                Evony Troop Layering Calculator — Combine All Four Types Strategically
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                The Evony troop layering calculator is where all four troop types and multiple tiers come together into a single army plan.
              </p>
              <p className="text-gray-700 leading-relaxed">
                A complete layered army uses all four troop types at different tier levels simultaneously. Run the cost calculator separately for each component of your layer, then add the totals together to see your complete resource requirement for the full layered build.
              </p>

              <h3 className="text-xl font-bold text-indigo-900 mt-6">Sample Layered Army — Mid-Game Player (K30)</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border-2 border-indigo-200 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-indigo-100">
                      <th className="border border-indigo-200 p-3 text-left font-bold text-indigo-900">Layer Role</th>
                      <th className="border border-indigo-200 p-3 text-left font-bold text-indigo-900">Troop Type</th>
                      <th className="border border-indigo-200 p-3 text-left font-bold text-indigo-900">Tier</th>
                      <th className="border border-indigo-200 p-3 text-left font-bold text-indigo-900">Quantity</th>
                      <th className="border border-indigo-200 p-3 text-left font-bold text-indigo-900">Primary Resource Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-indigo-200 p-3">Main attack force</td>
                      <td className="border border-indigo-200 p-3 font-semibold">Mounted</td>
                      <td className="border border-indigo-200 p-3">T12</td>
                      <td className="border border-indigo-200 p-3">200,000</td>
                      <td className="border border-indigo-200 p-3">High ore + food</td>
                    </tr>
                    <tr className="bg-indigo-50">
                      <td className="border border-indigo-200 p-3">Siege support</td>
                      <td className="border border-indigo-200 p-3 font-semibold">Siege</td>
                      <td className="border border-indigo-200 p-3">T10</td>
                      <td className="border border-indigo-200 p-3">80,000</td>
                      <td className="border border-indigo-200 p-3">High ore + stone</td>
                    </tr>
                    <tr>
                      <td className="border border-indigo-200 p-3">Ranged mid-layer</td>
                      <td className="border border-indigo-200 p-3 font-semibold">Ranged</td>
                      <td className="border border-indigo-200 p-3">T9</td>
                      <td className="border border-indigo-200 p-3">150,000</td>
                      <td className="border border-indigo-200 p-3">High lumber</td>
                    </tr>
                    <tr className="bg-indigo-50">
                      <td className="border border-indigo-200 p-3">Ground base layer</td>
                      <td className="border border-indigo-200 p-3 font-semibold">Ground</td>
                      <td className="border border-indigo-200 p-3">T10</td>
                      <td className="border border-indigo-200 p-3">200,000</td>
                      <td className="border border-indigo-200 p-3">Moderate all resources</td>
                    </tr>
                    <tr>
                      <td className="border border-indigo-200 p-3">Hospital filler</td>
                      <td className="border border-indigo-200 p-3 font-semibold">Ground</td>
                      <td className="border border-indigo-200 p-3">T1</td>
                      <td className="border border-indigo-200 p-3">1,000,000</td>
                      <td className="border border-indigo-200 p-3">Minimal — cheap buffer</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-gray-700 leading-relaxed mt-4">
                Run each row through the troop cost calculator Evony separately, then sum all five resource totals. This gives you the complete resource roadmap for building a competitive layered army at Keep 30.
              </p>

              <h3 className="text-xl font-bold text-indigo-900 mt-6">PvP Layering vs PvE Layering</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>PvP Evony troop layering calculator use:</strong> Focus on composition variety and unpredictability. Include all four troop types to prevent an opponent from running a counter composition that defeats your army cheaply. The T1 filler layer is especially important for PvP — it fills hospital beds and protects expensive high-tier troops from permanent death.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>PvE layering (Boss Troop Calculator use):</strong> Different boss monsters have different type weaknesses. Optimize your boss farming composition for the specific monster you are targeting. A composition optimized for the Fire Dragon boss is different from the one that maximizes damage against the Hydra. Calculate the cost of maintaining both compositions separately and decide which bosses are worth the resource investment for your current economy.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-teal-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50">
              <CardTitle className="flex items-center gap-3 text-2xl text-teal-900">
                <Users className="w-7 h-7 text-teal-600" />
                How to Use the Evony Troop Cost Calculator — Step by Step
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <p className="font-bold text-teal-900">Select Troop Type</p>
                    <p className="text-gray-700">Choose Mounted, Ground, Ranged, or Siege from the dropdown. If you are planning a layered army, run the calculator once for each troop type you plan to train.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <p className="font-bold text-teal-900">Select Troop Tier</p>
                    <p className="text-gray-700">Choose your target tier from T1 to T16. If you are unsure which tier your economy supports, run the same quantity through T10, T12, and T14 and compare the three resource outputs side by side.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <p className="font-bold text-teal-900">Enter Troop Target</p>
                    <p className="text-gray-700">Input the exact quantity you want to train. For event planning, calculate backward from your resource goal. For war planning, use your march capacity or army size target as your quantity guide.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <p className="font-bold text-teal-900">Hit Calculate</p>
                    <p className="text-gray-700">Review all five resource outputs: food, lumber, stone, ore, gold plus your power gain. Compare each resource output against your current stockpile.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">5</div>
                  <div>
                    <p className="font-bold text-teal-900">Check your stockpile gap</p>
                    <p className="text-gray-700">If any resource output exceeds your current inventory, you know exactly what to gather before starting. Use your gathering marches on the specific bottleneck resource.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">6</div>
                  <div>
                    <p className="font-bold text-teal-900">Plan your training time</p>
                    <p className="text-gray-700">Check whether your batch completes within your required timeline. Allocate speed-ups if necessary or split the batch into multiple sessions.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="faq-1" className="border-2 border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:text-blue-600">
                Which troop type costs the most resources in Evony?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pt-4">
                Siege machines and high-tier Mounted (Cavalry) troops carry the highest per-unit resource costs. Siege machines have especially high ore and stone requirements. Mounted troops at T12 and above demand massive ore quantities. Always run these through the cost calculator before committing to a large batch.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-2" className="border-2 border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:text-blue-600">
                What is the cheapest troop to train in Evony?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pt-4">
                T1 Ground troops are the cheapest troops in the game. They cost minimal resources per unit, train quickly, and serve as effective hospital filler in layered armies. Many experienced players maintain millions of T1 Ground troops specifically for this purpose.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-3" className="border-2 border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:text-blue-600">
                How do I use the Troop Target field for Resource Consumption Events?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pt-4">
                Decide your target event reward tier and note the required resource spend. Enter your chosen Troop Type and Tier, then adjust the Troop Target quantity until the total resource output matches your event goal. This gives you your exact training target to hit during the event window.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-4" className="border-2 border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:text-blue-600">
                Why does ore run out faster than other resources during Cavalry training?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pt-4">
                Mounted troops have disproportionately high ore requirements per unit compared to other troop types at the same tier. This is a deliberate game balance mechanic that makes high-tier Cavalry armies expensive to maintain. Plan ore gathering in advance of any large Cavalry training batch.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-5" className="border-2 border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:text-blue-600">
                Can I calculate multiple troop types at once?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pt-4">
                Run the calculator separately for each troop type and tier in your planned army, then add the five resource totals together manually. This gives you the complete resource requirement for a full multi-type training plan or layered army build.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-6" className="border-2 border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:text-blue-600">
                What tier should a Keep 30 player focus on training?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pt-4">
                T10 to T12 is the sweet spot for most Keep 30 players. Run both tiers through the cost calculator with your target quantity and compare the resource gap to your current stockpile. T10 delivers excellent power gain per resource spent. T12 delivers superior combat performance but at a cost that requires a well-developed resource economy to sustain consistently.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-7" className="border-2 border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:text-blue-600">
                Does the calculator account for research bonuses?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pt-4">
                Base calculator outputs use standard game values. If your Academy research includes Training Cost Reduction bonuses, your actual cost will be lower than the base output. Apply your research percentage reduction manually to get your personalized accurate cost.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-8" className="border-2 border-gray-200 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold hover:text-blue-600">
                How do T1 troops help in PvP even though they are weak?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed pt-4">
                T1 troops fill hospital beds when your army takes damage in battle. When your hospital fills with cheap T1 troops, your expensive T12 and T14 troops go to the hospital to heal rather than dying permanently. This hospital buffer strategy is one of the most important and most overlooked uses of low-tier troops in serious PvP play.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Card className="border-2 border-gray-200 shadow-lg bg-gradient-to-br from-gray-50 to-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Final Thoughts</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Evony Troop Cost Calculator gives you three simple inputs Troop Type, Troop Tier, Troop Target and turns them into a complete resource roadmap for every training decision you make.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Every resource you save through accurate pre-training calculation is a resource your opponent does not have. In a game where wars are won and lost by who ran out of ore first, that advantage compounds over weeks and months of play.
              </p>
              <p className="text-gray-700 leading-relaxed font-semibold">
                Select your troop type. Set your tier. Enter your target. Calculate before you commit.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
