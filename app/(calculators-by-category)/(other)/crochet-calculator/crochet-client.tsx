"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CrochetCalculator from "@/components/crochet-calculator"
import { Scissors, Calculator, Info, BookOpen, DollarSign, Clock, TrendingUp, HelpCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function CrochetCalculatorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Crochet Calculator
          </h1>
        </div>

        {/* Main Calculator Card */}
        <div className="mb-12">
          <Card className="border-2 border-pink-200 shadow-xl">
            <CardHeader className="py-6 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                Crochet Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <CrochetCalculator />
            </CardContent>
          </Card>
        </div>

        {/* Quick Answer */}
        <div className="mb-12 p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Info className="w-6 h-6 text-purple-600" />
            QUICK ANSWER
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            A crochet calculator helps you estimate yarn yardage, project cost, time, gauge adjustments, stitch counts, and pricing for any crochet project from blankets and hats to sweaters and commission work. Use it before you start any project to avoid running out of yarn, undercharging for your work, or getting the wrong size.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* What Is Section */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-pink-600" />
              What Is a Crochet Calculator?
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                A crochet calculator is a tool either online or on paper that takes your project measurements, yarn weight, hook size, and gauge swatch, and gives you accurate numbers. It removes the guesswork from crocheting.
              </p>
              <p>
                When you start a new project without calculating first, you risk running out of yarn mid-blanket, sizing a sweater wrong, or charging a client too little for a commissioned piece. Experienced crocheters know that five minutes with a crochet calculator saves hours of frustration.
              </p>
              <p>A full-featured free crochet calculator covers:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Yarn amount (yardage and weight in grams)</li>
                <li>Project dimensions (width, length, circumference)</li>
                <li>Gauge adjustments (stitches per inch, rows per inch)</li>
                <li>Stitch counts (total stitches, increases, decreases per row)</li>
                <li>Pricing and commissions (material cost + labour rate + overhead)</li>
                <li>Time estimates (hours per project based on stitch count)</li>
              </ul>
              <p>
                Whether you are a complete beginner or a seasoned maker selling on Etsy, a crochet project calculator keeps your work organised and profitable.
              </p>
            </div>
          </div>

          {/* Yarn Calculator Section */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Crochet Yarn Calculator — How Much Yarn Do You Need?</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                The crochet yarn calculator answers the most common question every crocheter asks: "How many skeins do I need to buy?"
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">How the Crochet Yarn Amount Calculator Works</h3>
              <p>You input:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Project dimensions — length and width in inches or centimetres</li>
                <li>Yarn weight category — lace, fingering, DK, worsted, bulky, super bulky</li>
                <li>Stitch pattern — single crochet uses more yarn than double crochet for the same area</li>
                <li>Gauge swatch result — stitches per 4 inches and rows per 4 inches</li>
              </ul>

              <p className="mt-4">The calculator outputs:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Total yardage required</li>
                <li>Recommended number of skeins (based on skein yardage you enter)</li>
                <li>A safety buffer (usually 10–15% extra recommended)</li>
              </ul>

              {/* Yarn Weight Reference Chart */}
              <div className="overflow-x-auto my-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Yarn Weight Reference Chart</h3>
                <table className="w-full border-collapse border-2 border-gray-300 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-pink-600 text-white">
                      <th className="border border-gray-300 p-3 text-left">Yarn Weight</th>
                      <th className="border border-gray-300 p-3">Hook Size (mm)</th>
                      <th className="border border-gray-300 p-3">Avg. Yardage per 100g</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 font-semibold">Lace / Thread</td>
                      <td className="border border-gray-300 p-3 text-center">1.5–2.25 mm</td>
                      <td className="border border-gray-300 p-3 text-center">800–1,000 yds</td>
                    </tr>
                    <tr className="bg-pink-50">
                      <td className="border border-gray-300 p-3 font-semibold">Fingering / Sock</td>
                      <td className="border border-gray-300 p-3 text-center">2.25–3.5 mm</td>
                      <td className="border border-gray-300 p-3 text-center">400–600 yds</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 font-semibold">Sport / DK</td>
                      <td className="border border-gray-300 p-3 text-center">3.5–4.5 mm</td>
                      <td className="border border-gray-300 p-3 text-center">250–350 yds</td>
                    </tr>
                    <tr className="bg-pink-50">
                      <td className="border border-gray-300 p-3 font-semibold">Worsted</td>
                      <td className="border border-gray-300 p-3 text-center">4.5–5.5 mm</td>
                      <td className="border border-gray-300 p-3 text-center">180–220 yds</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 font-semibold">Bulky</td>
                      <td className="border border-gray-300 p-3 text-center">5.5–8 mm</td>
                      <td className="border border-gray-300 p-3 text-center">100–150 yds</td>
                    </tr>
                    <tr className="bg-pink-50">
                      <td className="border border-gray-300 p-3 font-semibold">Super Bulky</td>
                      <td className="border border-gray-300 p-3 text-center">9+ mm</td>
                      <td className="border border-gray-300 p-3 text-center">50–100 yds</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-4 p-4 bg-pink-100 rounded-lg border-l-4 border-pink-600">
                <strong>Experience tip:</strong> Always buy one extra skein of the same dye lot. Yarn is dyed in batches, and a skein from a different dye lot even the same colour name can look noticeably different once you wash your finished piece.
              </p>
            </div>
          </div>

          {/* Blanket Calculator Section */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Crochet Blanket Calculator — Size, Yarn & Yardage</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                The crochet blanket calculator is probably the most-used crochet tool online. Blankets are large, use a lot of yarn, and come in many sizes so calculating before you buy is essential.
              </p>

              {/* Standard Blanket Sizes */}
              <div className="overflow-x-auto my-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Standard Blanket Sizes</h3>
                <table className="w-full border-collapse border-2 border-gray-300 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-purple-600 text-white">
                      <th className="border border-gray-300 p-3 text-left">Blanket Type</th>
                      <th className="border border-gray-300 p-3">Dimensions (inches)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 font-semibold">Security / Lovey</td>
                      <td className="border border-gray-300 p-3 text-center">12 × 12</td>
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="border border-gray-300 p-3 font-semibold">Baby Blanket</td>
                      <td className="border border-gray-300 p-3 text-center">30 × 36</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 font-semibold">Lap / Stroller</td>
                      <td className="border border-gray-300 p-3 text-center">30 × 40</td>
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="border border-gray-300 p-3 font-semibold">Throw Blanket</td>
                      <td className="border border-gray-300 p-3 text-center">50 × 60</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 font-semibold">Twin Bed</td>
                      <td className="border border-gray-300 p-3 text-center">60 × 80</td>
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="border border-gray-300 p-3 font-semibold">Queen Bed</td>
                      <td className="border border-gray-300 p-3 text-center">90 × 90</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 font-semibold">King Bed</td>
                      <td className="border border-gray-300 p-3 text-center">108 × 90</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Crochet Blanket Yarn Calculator — Example</h3>
              <p>
                Let us say you want to make a throw blanket (50 × 60 inches) using worsted weight yarn with a single crochet stitch at a gauge of 14 stitches and 16 rows per 4 inches.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Stitch count:</strong> (50 ÷ 4) × 14 = 175 stitches wide</li>
                <li><strong>Row count:</strong> (60 ÷ 4) × 16 = 240 rows tall</li>
                <li><strong>Total stitches:</strong> 175 × 240 = 42,000 stitches</li>
                <li><strong>Approximate yardage:</strong> Single crochet uses roughly 1.5× the fabric width per row, so ≈ 50 × 1.5 × 240 = 18,000 inches ÷ 36 = 500 yards. In practice, add 15% buffer → 575 yards minimum</li>
              </ul>
              <p className="mt-4">
                This shows why a crochet blanket yarn calculator is so valuable the math is too tedious to do by hand every time.
              </p>
            </div>
          </div>

          {/* Gauge Calculator Section */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Crochet Gauge Calculator — Swatching Made Simple</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                The crochet gauge calculator converts your swatch measurements into usable stitch and row counts for your actual project.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">What Is Gauge and Why Does It Matter?</h3>
              <p>
                Gauge measures how many stitches and rows fit into a 4 × 4 inch (10 × 10 cm) square. Every crocheter has a slightly different tension. Two people using the same yarn and the same hook can produce swatches that differ by 2–3 stitches per 4 inches which adds up to several inches across a full blanket or sweater.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">How to Use the Crochet Gauge Calculator</h3>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Crochet a swatch at least 6 × 6 inches with your chosen yarn and hook</li>
                <li>Wash and block it the way you plan to treat the finished item</li>
                <li>Measure the centre 4 inches and count stitches across and rows down</li>
                <li>Enter those numbers into the gauge calculator</li>
                <li>Input your target dimensions</li>
                <li>The tool outputs how many stitches to cast on and how many rows to work</li>
              </ol>

              <div className="bg-white p-6 rounded-lg border-2 border-green-300 my-4">
                <p className="font-semibold mb-2">Formula:</p>
                <p className="font-mono bg-green-50 p-3 rounded mb-2">
                  Target Width (inches) ÷ 4 × Stitches per 4 inches = Starting Stitch Count
                </p>
                <p className="font-mono bg-green-50 p-3 rounded">
                  Target Length (inches) ÷ 4 × Rows per 4 inches = Total Row Count
                </p>
              </div>

              <p>
                If your gauge does not match the pattern, go up a hook size to get fewer stitches per inch, or down a hook size to get more stitches per inch.
              </p>
            </div>
          </div>

          {/* Size Calculator Section */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Crochet Size Calculator — Getting the Right Fit</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                The crochet size calculator is essential for wearables garments that must fit a real human body. It combines body measurements, ease allowance, and gauge to tell you exactly how many stitches to start with.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Key Measurements for the Crochet Size Calculator</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Bust / Chest circumference</strong> — measured at the fullest point</li>
                <li><strong>Body length</strong> — from underarm to desired hem length</li>
                <li><strong>Sleeve length</strong> — from underarm to wrist</li>
                <li><strong>Ease</strong> — the amount of extra width built in (negative ease = tight fit; positive ease = relaxed fit)</li>
              </ul>

              {/* Standard Size Guide */}
              <div className="overflow-x-auto my-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Standard Size Guide for Adults</h3>
                <table className="w-full border-collapse border-2 border-gray-300 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th className="border border-gray-300 p-3">Size</th>
                      <th className="border border-gray-300 p-3">Bust (inches)</th>
                      <th className="border border-gray-300 p-3">Positive Ease</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 text-center font-semibold">XS</td>
                      <td className="border border-gray-300 p-3 text-center">30–32</td>
                      <td className="border border-gray-300 p-3 text-center">2</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border border-gray-300 p-3 text-center font-semibold">S</td>
                      <td className="border border-gray-300 p-3 text-center">34–36</td>
                      <td className="border border-gray-300 p-3 text-center">2</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 text-center font-semibold">M</td>
                      <td className="border border-gray-300 p-3 text-center">38–40</td>
                      <td className="border border-gray-300 p-3 text-center">2</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border border-gray-300 p-3 text-center font-semibold">L</td>
                      <td className="border border-gray-300 p-3 text-center">42–44</td>
                      <td className="border border-gray-300 p-3 text-center">2</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 text-center font-semibold">XL</td>
                      <td className="border border-gray-300 p-3 text-center">46–48</td>
                      <td className="border border-gray-300 p-3 text-center">2</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border border-gray-300 p-3 text-center font-semibold">2XL</td>
                      <td className="border border-gray-300 p-3 text-center">50–52</td>
                      <td className="border border-gray-300 p-3 text-center">2</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-4 p-4 bg-blue-100 rounded-lg border-l-4 border-blue-600">
                <strong>Experience tip:</strong> For beginners, choose patterns with 2–4 inches of positive ease. Fitted garments demand precise gauge and sizing, which is harder to achieve without experience.
              </p>
            </div>
          </div>

          {/* Hat Calculator Section */}
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Crochet Hat Calculator — From Baby to Adult</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                The crochet hat calculator uses head circumference to calculate the number of starting stitches and the number of rounds to work.
              </p>

              {/* Head Circumferences */}
              <div className="overflow-x-auto my-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Standard Head Circumferences</h3>
                <table className="w-full border-collapse border-2 border-gray-300 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-orange-600 text-white">
                      <th className="border border-gray-300 p-3 text-left">Age Group</th>
                      <th className="border border-gray-300 p-3">Head Circumference</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 font-semibold">Preemie</td>
                      <td className="border border-gray-300 p-3 text-center">10–12 inches</td>
                    </tr>
                    <tr className="bg-orange-50">
                      <td className="border border-gray-300 p-3 font-semibold">Newborn</td>
                      <td className="border border-gray-300 p-3 text-center">13–14 inches</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 font-semibold">Baby (3–6 months)</td>
                      <td className="border border-gray-300 p-3 text-center">15–16 inches</td>
                    </tr>
                    <tr className="bg-orange-50">
                      <td className="border border-gray-300 p-3 font-semibold">Toddler (1–3 years)</td>
                      <td className="border border-gray-300 p-3 text-center">17–18 inches</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 font-semibold">Child (3–10 years)</td>
                      <td className="border border-gray-300 p-3 text-center">19–20 inches</td>
                    </tr>
                    <tr className="bg-orange-50">
                      <td className="border border-gray-300 p-3 font-semibold">Teen / Small Adult</td>
                      <td className="border border-gray-300 p-3 text-center">21–22 inches</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 font-semibold">Average Adult</td>
                      <td className="border border-gray-300 p-3 text-center">22–23 inches</td>
                    </tr>
                    <tr className="bg-orange-50">
                      <td className="border border-gray-300 p-3 font-semibold">Large Adult</td>
                      <td className="border border-gray-300 p-3 text-center">23–24 inches</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Hat Calculator Formula</h3>
              <p>
                Most hats are worked in the round. You need two measurements: circumference and height.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Negative ease for hats:</strong> Hats should be 1–2 inches smaller than actual head circumference so they stretch and stay on.</li>
                <li><strong>Stitch count for brim:</strong> (Circumference − 1.5 inches) ÷ 4 × Stitches per 4 inches = Starting stitch count (round to a number divisible by your stitch repeat)</li>
                <li><strong>Crown increases:</strong> For a flat top worked in the round, increase 6 stitches every other round until you reach your target circumference</li>
              </ul>
            </div>
          </div>

          {/* Sweater Calculator Section */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Crochet Sweater Calculator — Sizing & Yarn Amounts</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                A crochet sweater calculator combines elements of the size calculator and the yarn calculator. Sweaters are complex they have a front, back, two sleeves, neckline, and sometimes a collar or button band.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">How Much Yarn Does a Sweater Need?</h3>
              
              {/* Sweater Yarn Table */}
              <div className="overflow-x-auto my-6">
                <table className="w-full border-collapse border-2 border-gray-300 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-indigo-600 text-white">
                      <th className="border border-gray-300 p-3 text-left">Yarn Weight</th>
                      <th className="border border-gray-300 p-3">Average Yardage for Adult Sweater</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 font-semibold">Fingering</td>
                      <td className="border border-gray-300 p-3 text-center">1,500–2,000 yds</td>
                    </tr>
                    <tr className="bg-indigo-50">
                      <td className="border border-gray-300 p-3 font-semibold">DK</td>
                      <td className="border border-gray-300 p-3 text-center">1,000–1,500 yds</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 font-semibold">Worsted</td>
                      <td className="border border-gray-300 p-3 text-center">800–1,200 yds</td>
                    </tr>
                    <tr className="bg-indigo-50">
                      <td className="border border-gray-300 p-3 font-semibold">Bulky</td>
                      <td className="border border-gray-300 p-3 text-center">500–800 yds</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-4 p-4 bg-indigo-100 rounded-lg border-l-4 border-indigo-600">
                <strong>Experience tip:</strong> For colourwork sweaters, calculate each colour separately. You often use far less of contrast colours than you think, but you need to buy at least one full skein of each to ensure dye lot consistency.
              </p>
            </div>
          </div>

          {/* Stitch Calculator Section */}
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Crochet Stitch Calculator — Increases and Decreases</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                The crochet stitch calculator covers two of the most important shaping techniques: increases and decreases. These shape garments, hats, amigurumi, and any 3D object.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Crochet Increase Calculator</h3>
              <p>
                An increase adds one or more stitches to expand your fabric. The most common increase is working two stitches into one stitch.
              </p>
              <div className="bg-white p-6 rounded-lg border-2 border-teal-300 my-4">
                <p className="font-semibold mb-2">Evenly spaced increase formula:</p>
                <p className="font-mono bg-teal-50 p-3 rounded">
                  Total stitches ÷ Number of increases = Work 1 stitch, then increase every N stitches
                </p>
                <p className="mt-3"><strong>Example:</strong> You have 48 stitches and need to increase by 6 stitches evenly. 48 ÷ 6 = 8. Work 1 stitch in every 8th stitch. Your new count = 54.</p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Crochet Decrease Calculator</h3>
              <p>
                A decrease removes stitches to shape or close fabric. The most common decrease is working two stitches together (sc2tog, dc2tog).
              </p>
              <div className="bg-white p-6 rounded-lg border-2 border-teal-300 my-4">
                <p className="font-semibold mb-2">Evenly spaced decrease formula:</p>
                <p className="font-mono bg-teal-50 p-3 rounded">
                  Total stitches ÷ Number of decreases = Decrease every N stitches
                </p>
                <p className="mt-3"><strong>Example:</strong> You have 60 stitches and need to decrease by 10. 60 ÷ 10 = 6. Work a decrease every 6th stitch. New count = 50.</p>
              </div>
            </div>
          </div>

          {/* Price Calculator Section */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-green-600" />
              Crochet Price Calculator — Charge What You Are Worth
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                The crochet price calculator is a tool every maker who sells their work needs to use. Many crocheters especially beginners undercharge because they only count material costs and ignore their time.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">The Full Pricing Formula</h3>
              <div className="bg-green-50 p-6 rounded-lg border-2 border-green-300 my-4">
                <p className="font-semibold text-lg mb-3">Selling Price = Material Cost + Labour Cost + Overhead + Profit Margin</p>
                <ul className="space-y-2">
                  <li><strong>Material cost:</strong> Price of yarn, stuffing, buttons, labels, packaging</li>
                  <li><strong>Labour cost:</strong> Hours worked × hourly rate (minimum wage at least; skilled craft rates are higher)</li>
                  <li><strong>Overhead:</strong> Marketplace fees (Etsy takes up to 10%), shipping supplies, photography, electricity</li>
                  <li><strong>Profit margin:</strong> Typically 10–30% added on top</li>
                </ul>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Why Most Crocheters Undercharge</h3>
              <p>
                A hand-crocheted queen-size blanket can take 40–60 hours to complete. At even minimum wage, that is hundreds of dollars in labour alone before materials. Yet many people price blankets at $50–$80 because they feel guilty charging more. A crochet pricing calculator free of emotion shows you the real numbers so you can make an informed decision.
              </p>
            </div>
          </div>

          {/* Time Calculator Section */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Clock className="w-8 h-8 text-purple-600" />
              Crochet Time Calculator — Estimate Hours Per Project
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                The crochet time calculator estimates how long a project will take you to complete, based on:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Total stitch count</li>
                <li>Your personal crocheting speed (stitches per minute)</li>
                <li>Number of colour changes or finishing steps</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">How to Measure Your Crochet Speed</h3>
              <p>
                Work for exactly 10 minutes on a straightforward stitch like single crochet or double crochet. Count the stitches you completed. Multiply by 6 to get your hourly stitch count.
              </p>

              {/* Crochet Speed Table */}
              <div className="overflow-x-auto my-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Average crochet speeds:</h3>
                <table className="w-full border-collapse border-2 border-gray-300 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-purple-600 text-white">
                      <th className="border border-gray-300 p-3 text-left">Experience Level</th>
                      <th className="border border-gray-300 p-3">Stitches per Minute (Single Crochet)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 font-semibold">Beginner</td>
                      <td className="border border-gray-300 p-3 text-center">15–25</td>
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="border border-gray-300 p-3 font-semibold">Intermediate</td>
                      <td className="border border-gray-300 p-3 text-center">30–45</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 font-semibold">Advanced</td>
                      <td className="border border-gray-300 p-3 text-center">50–70</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                Once you know your speed and your total stitch count, divide: <strong>Total Stitches ÷ (Speed × 60) = Hours required.</strong>
              </p>
            </div>
          </div>

          {/* Cost Calculator Section */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Crochet Cost Calculator — Materials, Labour & Overhead</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                The crochet cost calculator gives you a line-by-line breakdown of every expense in a project. This is different from the price calculator cost is what you spend; price is what you charge.
              </p>

              {/* Cost Components Table */}
              <div className="overflow-x-auto my-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Cost Components to Track</h3>
                <table className="w-full border-collapse border-2 border-gray-300 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-gray-700 text-white">
                      <th className="border border-gray-300 p-3 text-left">Cost Item</th>
                      <th className="border border-gray-300 p-3 text-left">How to Calculate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 font-semibold">Yarn</td>
                      <td className="border border-gray-300 p-3">Yardage needed ÷ Skein yardage × Skein price</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">Hook</td>
                      <td className="border border-gray-300 p-3">Spread cost over many projects (depreciation)</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 font-semibold">Stuffing / Notions</td>
                      <td className="border border-gray-300 p-3">Actual purchase price</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">Labels / Tags</td>
                      <td className="border border-gray-300 p-3">Cost per unit</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 font-semibold">Packaging</td>
                      <td className="border border-gray-300 p-3">Cost per unit</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 p-3 font-semibold">Platform fees</td>
                      <td className="border border-gray-300 p-3">% of selling price (e.g., 6.5% Etsy transaction fee)</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 font-semibold">Shipping supplies</td>
                      <td className="border border-gray-300 p-3">Actual cost</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                Knowing your total cost helps you set a price that covers all expenses and still generates profit.
              </p>
            </div>
          </div>

          {/* Commission Calculator Section */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Crochet Commission Calculator — Pricing for Sellers</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                A crochet commission calculator focuses specifically on custom orders. Commissions are unique because the client chooses the design, size, colours, and deadline all of which affect your price.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Commission Pricing Checklist</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Customisation premium:</strong> Charge 10–20% more for custom colour choices</li>
                <li><strong>Rush fee:</strong> Charge 25–50% more for orders needed within 2 weeks</li>
                <li><strong>Complexity premium:</strong> Intricate stitch patterns like Tunisian entrelac or overlay mosaic take longer than basic stitches</li>
                <li><strong>Consultation time:</strong> Include the time you spend communicating with the client</li>
                <li><strong>Non-refundable deposit:</strong> Always collect 30–50% upfront for commissions</li>
              </ul>

              {/* Sample Commission Price */}
              <div className="overflow-x-auto my-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Sample Commission Price Calculation</h3>
                <table className="w-full border-collapse border-2 border-gray-300 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-yellow-600 text-white">
                      <th className="border border-gray-300 p-3 text-left">Item</th>
                      <th className="border border-gray-300 p-3 text-right">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3">Yarn for adult sweater (worsted, 1,200 yds)</td>
                      <td className="border border-gray-300 p-3 text-right font-semibold">$30</td>
                    </tr>
                    <tr className="bg-yellow-50">
                      <td className="border border-gray-300 p-3">Labour: 25 hours × $20/hr</td>
                      <td className="border border-gray-300 p-3 text-right font-semibold">$500</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3">Overhead (10%)</td>
                      <td className="border border-gray-300 p-3 text-right font-semibold">$53</td>
                    </tr>
                    <tr className="bg-yellow-50">
                      <td className="border border-gray-300 p-3">Profit margin (15%)</td>
                      <td className="border border-gray-300 p-3 text-right font-semibold">$87</td>
                    </tr>
                    <tr className="bg-yellow-100 border-t-2 border-yellow-600">
                      <td className="border border-gray-300 p-3 font-bold text-lg">Total Commission Price</td>
                      <td className="border border-gray-300 p-3 text-right font-bold text-xl text-yellow-700">$670</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                This may feel high, but it reflects the true value of skilled handmade work. Use the crochet commission calculator to show clients a transparent cost breakdown.
              </p>
            </div>
          </div>

          {/* Entities Section */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Entities and Concepts You Should Know</h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>For Google to understand and trust this content, the following entities are directly relevant to crochet calculators:</p>
              
              <ul className="space-y-2">
                <li><strong>Ravelry</strong> — the largest online crochet and knitting community; many patterns include built-in yarn calculators</li>
                <li><strong>Gauge swatch</strong> — the test square every crocheter makes before starting a project</li>
                <li><strong>Stitch marker</strong> — a physical tool used to mark stitch counts, relevant to calculator outputs</li>
                <li><strong>WPI (wraps per inch)</strong> — a method to determine yarn weight without a label</li>
                <li><strong>Amigurumi</strong> — crocheted stuffed figures that require increase/decrease calculators for shaping</li>
                <li><strong>Tunisian crochet</strong> — a hybrid crochet/knitting method with different gauge properties</li>
                <li><strong>CYCA yarn weight system</strong> — the Craft Yarn Council's standard weight numbering (0–7)</li>
                <li><strong>Dye lot</strong> — the batch number on yarn labels; important when calculating how many skeins to buy at once</li>
                <li><strong>Ease</strong> — the intentional difference between body measurement and garment measurement</li>
                <li><strong>Blocking</strong> — washing and shaping a finished piece; can change gauge by up to 10%</li>
              </ul>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-pink-600" />
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  What is a crochet calculator used for?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  A crochet calculator estimates yarn yardage, stitch counts, sizing, project cost, and time for any crochet project. It helps you buy the right amount of yarn, size garments correctly, and price your work fairly.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How do I calculate how much yarn I need for a crochet project?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Measure your gauge swatch to get stitches and rows per 4 inches. Input your target dimensions and stitch type into a crochet yardage calculator. Add a 10–15% safety buffer to the result before buying yarn.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Is there a free crochet calculator online?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Yes. Several free crochet calculators are available online. Many cover yarn yardage, blanket sizing, hat sizing, and basic pricing. This page provides the formulas so you can calculate manually or use any tool you prefer.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How do I price my crochet work correctly?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Use a crochet price calculator that adds material cost + labour (hours × your hourly rate) + overhead (platform fees, packaging) + a profit margin. Never price based on material cost alone.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How do I calculate increases and decreases in crochet?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Divide your current stitch count by the number of increases or decreases needed to find the interval. For example, 48 stitches with 6 increases = increase every 8th stitch. The crochet increase and decrease calculator automates this for any stitch count.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How long does a crochet blanket take to make?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  It depends on size, stitch type, and your speed. A throw blanket in single crochet at an intermediate speed takes approximately 20–35 hours. A crochet time calculator gives you a personalised estimate based on your stitch count and speed.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  What gauge should I use for a crochet hat?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Most worsted weight hat patterns use a gauge of 14–16 stitches per 4 inches with a 5.0–5.5 mm hook. Always swatch and use the crochet gauge calculator to confirm your stitch count before starting.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How many stitches do I need for a crochet blanket?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  It depends on your gauge and target width. Divide your target width in inches by 4, then multiply by your stitches per 4 inches. For a 50-inch-wide blanket at 14 stitches per 4 inches: (50 ÷ 4) × 14 = 175 stitches.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How do I calculate a crochet sweater size?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Measure the bust circumference, add your desired ease, divide by 4, and multiply by your stitch gauge. A crochet sweater calculator also helps you estimate yarn needed for each section body, sleeves, and collar.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  What is the difference between a crochet cost calculator and a price calculator?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  A cost calculator adds up all your expenses (yarn, notions, overhead). A price calculator uses that cost as a base and adds labour and profit margin to arrive at a selling price. You need both to run a sustainable crochet business.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
