"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import NewbornWeightLossCalculator from "@/components/newborn-weight-loss-calculator"
import { Calculator, Info, BookOpen, Baby, HelpCircle, AlertTriangle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function NewbornWeightLossCalculatorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Newborn Weight Loss Calculator
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-4">
            Normal newborn weight loss is 7–10% of birth weight in the first 3–5 days of life. Use this formula to calculate it:
          </p>
          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200 max-w-2xl mx-auto mb-4">
            <p className="font-mono text-lg text-gray-800">
              Weight Loss % = [(Birth Weight − Current Weight) ÷ Birth Weight] × 100
            </p>
          </div>
          <p className="text-base text-red-600 font-semibold">
            If your baby loses more than 10% of their birth weight, contact your pediatrician immediately.
          </p>
        </div>

        {/* Main Calculator Card */}
        <div className="mb-12">
          <Card className="border-2 border-pink-200 shadow-xl">
            <CardHeader className="py-6 bg-gradient-to-r from-pink-600 to-blue-600 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                Newborn Weight Loss Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <NewbornWeightLossCalculator />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Introduction */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Newborn Weight Loss Calculator — How to Calculate, What's Normal, and When to Worry
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Every new parent feels a wave of anxiety when the nurse tells them their baby has lost weight since birth. The good news? This is completely expected. Almost every newborn loses some weight in the first few days of life. The key is knowing how much is normal, how to calculate it accurately, and when the numbers should send you to the doctor.
              </p>
              <p>
                This guide gives you everything you need the formula, worked examples in pounds, ounces, and kilograms, a normal range reference, clinical context, and answers to the most common questions parents ask.
              </p>
            </div>
          </div>

          {/* What Is Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              What Is Newborn Weight Loss and Why Does It Happen?
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                When a baby is born, they carry extra fluid in their body fluid from the womb, amniotic fluid absorbed through the skin, and maternal IV fluids from labor. In the first 2–5 days, their kidneys and skin naturally release this fluid. At the same time, breastfeeding is still getting established, and milk supply has not fully come in yet. This combination means babies take in less than they lose during those early days.
              </p>
              <p>
                This is not a sign that something is wrong. It is a well-documented, expected physiological process called transitional weight loss.
              </p>
              <p className="font-semibold text-gray-900">Here are the main reasons behind it:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Fluid redistribution</strong> — The baby sheds extra extracellular fluid accumulated during delivery and the final weeks of pregnancy.</li>
                <li><strong>Meconium passage</strong> — The baby passes their first dark, sticky stool (meconium), which weighs something on its own.</li>
                <li><strong>Colostrum volume</strong> — Breast milk in the first 2–3 days is colostrum, which is very small in volume but dense in nutrients and antibodies. It is enough for the baby's tiny stomach but not enough to prevent some weight loss.</li>
                <li><strong>Formula-fed babies</strong> — Babies on formula typically lose slightly less weight because formula intake can be measured and is available from birth.</li>
              </ul>
              <p>
                Most babies begin regaining weight by day 3–5 once the mother's milk comes in or formula feeding is well established.
              </p>
            </div>
          </div>

          {/* Formula Explained */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Newborn Weight Loss Calculator — The Formula Explained</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                You do not need a special app or device to calculate your newborn's weight loss percentage. The formula is straightforward and the same one hospitals and pediatricians use.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600 my-4">
                <p className="font-bold text-gray-900 mb-2">Newborn Weight Loss Percentage Formula</p>
                <p className="font-mono text-lg text-gray-800">
                  Weight Loss (%) = [(Birth Weight − Current Weight) ÷ Birth Weight] × 100
                </p>
              </div>
              <p>
                This formula works regardless of whether you are measuring in kilograms, pounds, or ounces as long as both weights use the same unit.
              </p>
            </div>
          </div>

          {/* Step-by-Step Calculations */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Calculate Newborn Weight Loss — Step-by-Step</h2>

            {/* Kilograms */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Calculate Newborn Weight Loss in Kilograms</h3>
              <div className="bg-white p-6 rounded-lg border-l-4 border-green-600">
                <p className="font-semibold text-gray-900 mb-3">Example:</p>
                <ul className="space-y-1 text-gray-700 mb-4">
                  <li>Birth weight: 3.4 kg</li>
                  <li>Current weight (Day 3): 3.1 kg</li>
                </ul>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Step 1:</strong> Subtract current weight from birth weight → 3.4 − 3.1 = 0.3 kg</p>
                  <p><strong>Step 2:</strong> Divide by birth weight → 0.3 ÷ 3.4 = 0.0882</p>
                  <p><strong>Step 3:</strong> Multiply by 100 → 0.0882 × 100 = 8.82% weight loss</p>
                </div>
                <p className="mt-4 text-green-700 font-semibold">This result falls within the normal range of 7–10%.</p>
              </div>
            </div>

            {/* Pounds and Ounces */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Calculate Newborn Weight Loss in Pounds and Ounces</h3>
              <p className="text-gray-700 mb-4">
                This is where many parents get confused and understandably so. You need to convert everything to ounces before doing the calculation.
              </p>
              <p className="text-gray-700 mb-4"><strong>Conversion reminder:</strong> 1 pound = 16 ounces</p>
              <div className="bg-white p-6 rounded-lg border-l-4 border-blue-600">
                <p className="font-semibold text-gray-900 mb-3">Example:</p>
                <ul className="space-y-1 text-gray-700 mb-4">
                  <li>Birth weight: 7 lbs 8 oz = (7 × 16) + 8 = 120 oz</li>
                  <li>Current weight (Day 4): 6 lbs 14 oz = (6 × 16) + 14 = 110 oz</li>
                </ul>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Step 1:</strong> Subtract current weight from birth weight → 120 − 110 = 10 oz</p>
                  <p><strong>Step 2:</strong> Divide by birth weight → 10 ÷ 120 = 0.0833</p>
                  <p><strong>Step 3:</strong> Multiply by 100 → 0.0833 × 100 = 8.33% weight loss</p>
                </div>
                <p className="mt-4 text-green-700 font-semibold">This is within the normal range.</p>
              </div>
            </div>

            {/* Decimal Pounds */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Calculate Newborn Weight Loss in Pounds (Decimal Form)</h3>
              <p className="text-gray-700 mb-4">
                If your scale shows weight in decimal pounds (e.g., 7.5 lbs), the calculation is simpler.
              </p>
              <div className="bg-white p-6 rounded-lg border-l-4 border-purple-600">
                <p className="font-semibold text-gray-900 mb-3">Example:</p>
                <ul className="space-y-1 text-gray-700 mb-4">
                  <li>Birth weight: 7.5 lbs</li>
                  <li>Current weight: 6.9 lbs</li>
                </ul>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Step 1:</strong> 7.5 − 6.9 = 0.6 lbs</p>
                  <p><strong>Step 2:</strong> 0.6 ÷ 7.5 = 0.08</p>
                  <p><strong>Step 3:</strong> 0.08 × 100 = 8% weight loss</p>
                </div>
              </div>
            </div>
          </div>

          {/* Normal Weight Loss Chart */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Normal Newborn Weight Loss Chart — What the Numbers Mean</h2>
            <p className="text-gray-700 mb-6">
              Use this reference table to understand where your baby's weight loss falls.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border-2 border-gray-300 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-pink-600 text-white">
                    <th className="border border-gray-300 p-3 text-left">Weight Loss Percentage</th>
                    <th className="border border-gray-300 p-3 text-left">What It Means</th>
                    <th className="border border-gray-300 p-3 text-left">Recommended Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-green-50">
                    <td className="border border-gray-300 p-3 font-semibold">0% – 3%</td>
                    <td className="border border-gray-300 p-3">Minimal loss</td>
                    <td className="border border-gray-300 p-3">Normal, usually seen in formula-fed babies</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-3 font-semibold">3% – 7%</td>
                    <td className="border border-gray-300 p-3">Moderate loss</td>
                    <td className="border border-gray-300 p-3">Normal, monitor feeding frequency</td>
                  </tr>
                  <tr className="bg-yellow-50">
                    <td className="border border-gray-300 p-3 font-semibold">7% – 10%</td>
                    <td className="border border-gray-300 p-3">Expected range</td>
                    <td className="border border-gray-300 p-3">Normal, support feeding, monitor daily</td>
                  </tr>
                  <tr className="bg-orange-50">
                    <td className="border border-gray-300 p-3 font-semibold">10% – 12%</td>
                    <td className="border border-gray-300 p-3">Borderline high</td>
                    <td className="border border-gray-300 p-3">Contact your pediatrician, increase feeding support</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="border border-gray-300 p-3 font-semibold">Above 12%</td>
                    <td className="border border-gray-300 p-3">Excessive loss</td>
                    <td className="border border-gray-300 p-3">Seek medical attention promptly</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-gray-700 mt-6">
              Most breastfed babies fall in the 5–8% range. Formula-fed babies typically lose 2–5%. The threshold that triggers clinical concern in most hospitals is 10% or more.
            </p>
          </div>

          {/* When Does Baby Start Gaining Weight */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">When Does a Newborn Start Gaining Weight Again?</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Most newborns start regaining weight between day 3 and day 5 of life. This lines up with when the mother's mature breast milk comes in (called lactogenesis stage II), which dramatically increases the volume of milk available.
              </p>
              <p className="font-semibold text-gray-900">The general clinical expectation is:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>By day 10–14:</strong> Baby should return to their birth weight</li>
                <li><strong>After birth weight is regained:</strong> Babies gain approximately 20–30 grams per day (about 5–7 oz per week) for the first few months</li>
              </ul>
              <p>
                If your baby has not returned to their birth weight by two weeks of age, your pediatrician will want to investigate feeding patterns, latch quality, or any underlying issues.
              </p>
            </div>
          </div>

          {/* Factors That Affect Weight Loss */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Factors That Affect How Much Weight a Newborn Loses</h2>
            <p className="text-gray-700 mb-6">
              Not all newborns lose the same amount of weight. Several factors influence this, and understanding them helps you interpret the numbers more accurately.
            </p>

            <div className="space-y-4 text-gray-700">
              <div>
                <p><strong>Feeding method</strong> — Breastfed babies typically lose more weight than formula-fed babies in the first few days, simply because breast milk takes a few days to fully come in. This is not a reason to stop breastfeeding.</p>
              </div>
              <div>
                <p><strong>IV fluids during labor</strong> — If the mother received large volumes of IV fluids during labor (common with epidurals or long labors), the baby may be born with extra fluid and show a higher initial weight. The subsequent weight loss may look larger than it actually is, because some of it is just shedding that extra fluid not losing true body mass.</p>
              </div>
              <div>
                <p><strong>Birth weight</strong> — Larger babies and smaller babies can both lose similar percentages, but the absolute grams lost will differ.</p>
              </div>
              <div>
                <p><strong>Delivery type</strong> — Some research suggests babies born via cesarean section may lose slightly more weight, possibly linked to maternal IV fluids and differences in early feeding initiation.</p>
              </div>
              <div>
                <p><strong>Hospital stay length</strong> — Babies discharged early (within 24 hours) are often weighed again at a follow-up visit, which sometimes shows weight loss that was not captured before discharge.</p>
              </div>
              <div>
                <p><strong>Feeding frequency</strong> — Babies who feed 8–12 times per day typically lose less weight and regain it faster.</p>
              </div>
            </div>
          </div>

          {/* Clinical Practice */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Newborn Weight Loss Calculator in Clinical Practice — What Hospitals Actually Do</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Hospitals and pediatric units use the same percentage formula discussed above, but they often use it within standardized nomograms reference charts developed from large datasets of thousands of newborns. One widely used tool in neonatal care is the NEWT (Newborn Weight Tool), developed from data collected at UC San Diego and UCSF. It plots your baby's weight loss percentage against their age in hours and feeding method to give a more nuanced percentile-based result.
              </p>
              <p>
                This is useful because a 9% weight loss at 24 hours of age is very different from a 9% loss at 72 hours. The NEWT tool accounts for this time dimension. Pediatricians and lactation consultants use tools like this to decide whether a baby needs supplemental feeding, a lactation consult, or more frequent weight checks.
              </p>
              <p>
                The core formula, however, remains exactly the same one you can calculate at home.
              </p>
            </div>
          </div>

          {/* Tracking Weight at Home */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Track Your Newborn's Weight Accurately at Home</h2>
            <p className="text-gray-700 mb-6">
              If you want to track weight between pediatric visits, here is how to do it reliably.
            </p>

            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-3">
                <span className="text-pink-600 font-bold">•</span>
                <span><strong>Use a digital baby scale.</strong> Kitchen scales can work in a pinch but baby scales that measure in grams or tenths of a pound are more accurate for newborns.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-pink-600 font-bold">•</span>
                <span><strong>Weigh at the same time each day.</strong> Early morning, before the first feed, gives the most consistent baseline.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-pink-600 font-bold">•</span>
                <span><strong>Weigh without clothing or a diaper.</strong> Even a wet diaper can add 50–100 grams, which distorts the reading.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-pink-600 font-bold">•</span>
                <span><strong>Record the weight and the date and time.</strong> This gives your pediatrician useful trend data, not just a single number.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-pink-600 font-bold">•</span>
                <span><strong>Do not obsess over day-to-day fluctuations.</strong> Weight can vary slightly based on when the baby last fed, when they last had a wet diaper, or how much they have slept. Look at the trend over 2–3 days, not single readings.</span>
              </li>
            </ul>
          </div>

          {/* Signs Baby Not Getting Enough Milk */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
              Signs Your Newborn May Not Be Getting Enough Milk
            </h2>
            <p className="text-gray-700 mb-6">
              Weight loss percentage is one signal, but there are other signs worth watching alongside the numbers.
            </p>

            <div className="space-y-4 text-gray-700">
              <div>
                <p><strong>Wet and dirty diapers</strong> — By day 3–4, your baby should have at least 3–4 wet diapers and 3–4 dirty diapers per day. Fewer diapers than this can indicate inadequate intake.</p>
              </div>
              <div>
                <p><strong>Feeding behavior</strong> — A baby who feeds fewer than 8 times in 24 hours, falls asleep at the breast consistently within 2–3 minutes, or seems unsatisfied after feeds may not be transferring enough milk.</p>
              </div>
              <div>
                <p><strong>Skin and fontanelle</strong> — Sunken fontanelle (the soft spot on the head), dry mouth, or skin that does not spring back when gently pinched can indicate dehydration.</p>
              </div>
              <div>
                <p><strong>Jaundice</strong> — Elevated jaundice levels in the first week can sometimes be linked to insufficient feeding and dehydration, which concentrates bilirubin in the blood.</p>
              </div>
              <div>
                <p><strong>Crying and alertness</strong> — A baby who is difficult to rouse, unusually sleepy, or cries weakly should be evaluated by a doctor promptly.</p>
              </div>
            </div>
          </div>

          {/* Experience-Based Insights */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Experience-Based Insights From Lactation Consultants and Neonatologists</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Parents who have been through this process and the healthcare professionals who support them consistently share a few key observations that the numbers alone do not always capture.
              </p>
              <p>
                Many experienced lactation consultants note that the weight loss percentage is meaningful only when paired with feeding observation. A baby losing 9% of their birth weight but feeding vigorously 10–12 times a day with good latch and strong suck is in a very different situation from a baby losing 9% who feeds rarely and falls asleep at the breast within minutes.
              </p>
              <p>
                Neonatologists often point out that the 10% threshold, while clinically useful, is not a cliff edge. A baby at 10.1% who is otherwise healthy, feeding well, and showing normal diaper output is not automatically in crisis. The number triggers a closer look not a panic.
              </p>
              <p>
                Parents who have navigated this process repeatedly say the same thing: the follow-up weight check at day 3–5 feels nerve-wracking, but most babies pass it without issue. The rare babies who do not often benefit enormously from even a single lactation consultation, which can identify a poor latch, lip tie, or positioning issue that resolves everything.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-blue-600" />
              FAQs
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  What is a normal newborn weight loss percentage?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  A normal newborn weight loss percentage is 7–10% of birth weight in the first 3–5 days of life. Breastfed babies often fall between 5–8%, while formula-fed babies typically lose 2–5%. Anything above 10% warrants medical evaluation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How do I calculate my newborn's weight loss percentage?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Use this formula: [(Birth Weight − Current Weight) ÷ Birth Weight] × 100. Make sure both weights are in the same unit before you calculate.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  My baby lost 11% of their birth weight — is that dangerous?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  A loss above 10% is outside the typical normal range and should be evaluated by your pediatrician. Many babies at this level do well with increased feeding support, but your doctor needs to assess the situation directly including feeding behavior, diaper output, and overall clinical signs.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How long does it take a newborn to regain birth weight?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Most newborns regain their birth weight by 10–14 days of age. If your baby has not returned to birth weight by two weeks, your pediatrician will investigate further.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Does breastfeeding cause more weight loss than formula feeding?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Yes, breastfed babies typically lose slightly more weight in the first few days because colostrum (early breast milk) is low in volume. This does not mean breastfeeding is harmful it is expected. Weight loss in breastfed babies normalizes once milk supply increases, usually around day 3–5.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Should I give formula if my baby is losing too much weight?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  That decision belongs to your pediatrician or lactation consultant. In some cases, a small amount of supplemental formula can prevent dehydration and support the baby while breastfeeding is established. In other cases, increased feeding frequency and lactation support resolve the issue without formula.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How do I convert pounds and ounces for the weight loss calculation?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Multiply the number of pounds by 16, then add the ounces. This gives you the total in ounces. Use ounces for both the birth weight and current weight in the formula, then calculate as normal.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  What is the NEWT tool for newborn weight loss?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  NEWT stands for Newborn Weight Tool. It is a clinical nomogram that plots weight loss percentage against the baby's age in hours and feeding method. It gives a percentile result rather than just a raw percentage, which helps clinicians identify babies at higher risk of excessive weight loss earlier.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Can I weigh my baby at home to track weight loss?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Yes. Use a digital baby scale, weigh without clothing or a diaper, and record the weight at the same time each day. Share your records with your pediatrician or midwife at follow-up visits. Home weights can supplement but should not replace professional weight checks.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
