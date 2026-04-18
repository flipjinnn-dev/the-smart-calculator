"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ERACalculator from "@/components/era-calculator"
import { Calculator, Info, BookOpen, TrendingDown, Calendar, HelpCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function ERACalculatorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ERA Calculator
          </h1>
        </div>

        {/* Main Calculator Card */}
        <div className="mb-12">
          <Card className="border-2 border-blue-200 shadow-xl">
            <CardHeader className="py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                ERA Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <ERACalculator />
            </CardContent>
          </Card>
        </div>

        {/* Quick Answer */}
        <div className="mb-12 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-300 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Info className="w-6 h-6 text-indigo-600" />
            QUICK ANSWER
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            ERA (Earned Run Average) measures how many earned runs a pitcher allows per 9 innings pitched. The formula is: ERA = (Earned Runs ÷ Innings Pitched) × 9. A good ERA in MLB is typically under 3.50, and an elite ERA falls below 2.50.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* What Is ERA */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              What Is ERA? Understanding Earned Run Average
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                ERA stands for Earned Run Average. It is one of the most important and widely used statistics in baseball and softball. Pitchers, coaches, scouts, and fans use ERA to measure how effective a pitcher is at preventing the opposing team from scoring runs.
              </p>
              <p>
                When you watch a baseball game and the announcer mentions a pitcher's ERA, they are telling you the average number of earned runs that pitcher gives up over a full nine-inning game. The lower the ERA, the better the pitcher is performing.
              </p>
              <p>
                ERA does not count unearned runs — runs that score because of fielding errors or passed balls. This makes ERA a fairer measurement of the pitcher's individual performance, separate from the defensive mistakes of teammates.
              </p>
            </div>
          </div>

          {/* ERA Formula */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">ERA Calculator Formula: How to Calculate ERA</h2>
            
            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">The Standard ERA Formula</h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>The ERA formula is straightforward once you understand the components:</p>
              
              <div className="bg-white p-6 rounded-lg border-2 border-blue-300 my-4">
                <p className="text-2xl font-bold text-center text-blue-600 mb-4">
                  ERA = (Earned Runs ÷ Innings Pitched) × 9
                </p>
              </div>

              <p>Let's break down each part:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Earned Runs (ER):</strong> These are runs that score without the help of an error or a passed ball. If a runner reaches base because a fielder made an error, any run that scores as a result is typically unearned.</li>
                <li><strong>Innings Pitched (IP):</strong> This is the total number of innings a pitcher has thrown. Partial innings are recorded in thirds. For example, if a pitcher gets two outs in an inning without finishing it, that counts as 0.2 innings (or ⅔ of an inning).</li>
                <li><strong>Multiply by 9:</strong> Since baseball games are nine innings long, multiplying by 9 gives you the per-game average.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">ERA Calculation Example (Step-by-Step)</h3>
              <p>Suppose a pitcher has thrown 45 innings and allowed 15 earned runs during the season.</p>
              
              <div className="bg-blue-50 p-4 rounded-lg my-4 font-mono">
                <p>ERA = (15 ÷ 45) × 9</p>
                <p>ERA = 0.333 × 9</p>
                <p className="text-xl font-bold text-blue-600">ERA = 3.00</p>
              </div>

              <p>This pitcher has a 3.00 ERA, which is a strong performance in MLB.</p>
            </div>
          </div>

          {/* 9 vs 7 Innings */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">ERA Calculator for 9 Innings vs. 7 Innings</h2>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">ERA Calculator Per 9 Innings (MLB Standard)</h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Major League Baseball uses the standard 9-inning ERA formula. This is the most recognized format worldwide and the one broadcasters use when they discuss pitcher statistics on television and radio.
              </p>
              <p><strong>Formula:</strong> ERA = (Earned Runs ÷ Innings Pitched) × 9</p>
              <p>This version of the ERA calculator is the default for MLB, college baseball, and most professional leagues globally.</p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">ERA Calculator Per 7 Innings (High School and Some Leagues)</h3>
              <p>
                Many high school leagues, youth baseball leagues, and some amateur competitions play 7-inning games instead of 9-inning games. In these cases, the ERA formula adjusts accordingly:
              </p>
              <p><strong>Formula for 7-Inning ERA:</strong> ERA = (Earned Runs ÷ Innings Pitched) × 7</p>
              <p>
                This adjustment makes the ERA reflect the actual length of games being played. Comparing a 9-inning ERA with a 7-inning ERA would be misleading, so always confirm which format applies to the league you are analyzing.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Why the Inning Multiplier Matters</h3>
              <p>
                If you use the wrong multiplier, your ERA calculation will be significantly off. A pitcher in a 7-inning league with the same numbers as one in a 9-inning league will appear to have a better ERA when calculated per 9 innings. Always match the ERA calculator to the game format.
              </p>
            </div>
          </div>

          {/* Softball ERA */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">ERA Calculator for Softball</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Softball follows the same ERA calculation principle as baseball, but with one important difference: most softball games are 7 innings long, not 9.
              </p>
              <p><strong>Softball ERA Formula:</strong> ERA = (Earned Runs ÷ Innings Pitched) × 7</p>
              <p>
                Softball pitchers also throw underhand, which affects the nature of pitching mechanics and strategy. However, the ERA stat remains equally relevant as a performance measurement tool in softball. Coaches use it to evaluate pitchers during tryouts, tournaments, and season performance reviews.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Softball ERA Example</h3>
              <p>A softball pitcher allows 12 earned runs over 56 innings pitched.</p>
              
              <div className="bg-pink-50 p-4 rounded-lg my-4 font-mono">
                <p>ERA = (12 ÷ 56) × 7</p>
                <p>ERA = 0.214 × 7</p>
                <p className="text-xl font-bold text-pink-600">ERA = 1.50</p>
              </div>

              <p>A 1.50 ERA is an outstanding performance in softball, indicating dominant pitching.</p>
            </div>
          </div>

          {/* MLB ERA Standards */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">ERA Calculator MLB: Understanding MLB ERA Standards</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Major League Baseball has used ERA as an official pitching statistic since the early 20th century. Today, MLB tracks ERA for every pitcher and publishes it publicly for fans and analysts. Here is how to read and interpret MLB ERA figures:
              </p>

              {/* MLB ERA Rating Table */}
              <div className="overflow-x-auto my-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">MLB ERA Rating Scale</h3>
                <table className="w-full border-collapse border-2 border-gray-300 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th className="border border-gray-300 p-3 text-left">ERA Range</th>
                      <th className="border border-gray-300 p-3 text-left">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 font-semibold">Under 2.00</td>
                      <td className="border border-gray-300 p-3">Elite / Hall of Fame Level</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border border-gray-300 p-3 font-semibold">2.00 – 2.99</td>
                      <td className="border border-gray-300 p-3">Excellent</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 font-semibold">3.00 – 3.49</td>
                      <td className="border border-gray-300 p-3">Very Good</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border border-gray-300 p-3 font-semibold">3.50 – 3.99</td>
                      <td className="border border-gray-300 p-3">Above Average</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 font-semibold">4.00 – 4.49</td>
                      <td className="border border-gray-300 p-3">Average</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="border border-gray-300 p-3 font-semibold">4.50 – 4.99</td>
                      <td className="border border-gray-300 p-3">Below Average</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 font-semibold">5.00 and above</td>
                      <td className="border border-gray-300 p-3">Poor</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                These ranges shift slightly depending on the era (time period) of baseball. During the 1990s and 2000s, the offensive environment in MLB was much higher due to various factors, so a 4.50 ERA was more acceptable. In today's game, where pitching has become increasingly dominant, expectations are higher.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Season ERA Calculator in MLB</h3>
              <p>
                To calculate a pitcher's ERA at any point in the MLB season, simply use the same formula with the statistics accumulated so far. For example, if a pitcher is midway through the season with 80 innings pitched and 28 earned runs:
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg my-4 font-mono">
                <p>ERA = (28 ÷ 80) × 9</p>
                <p className="text-xl font-bold text-blue-600">ERA = 3.15</p>
              </div>

              <p>This is the pitcher's current season ERA. It will fluctuate up and down throughout the season as the pitcher allows more or fewer earned runs.</p>
            </div>
          </div>

          {/* Expected ERA */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Expected ERA (xERA): The Next Level of Pitching Analysis</h2>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">What Is Expected ERA?</h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Expected ERA, often abbreviated as xERA, is a modern advanced statistic developed to go beyond the traditional ERA formula. It was introduced as part of the Statcast era in MLB analytics.
              </p>
              <p>
                xERA attempts to measure what a pitcher's ERA should be based on the quality of contact they allow — not just the outcomes. It uses data such as exit velocity, launch angle, and spin rate to estimate how effective a pitcher truly was, regardless of whether balls fell in for hits or were caught by defenders.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">How Expected ERA Is Calculated</h3>
              <p>xERA relies on Statcast data and is not something fans can calculate manually with a basic formula. It factors in:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Expected batting average (xBA) on each ball in play</li>
                <li>Expected slugging percentage (xSLG) on contact</li>
                <li>Strikeout rate and walk rate</li>
                <li>Hard-hit ball rate</li>
              </ul>

              <p className="mt-4">
                A pitcher with a high ERA but a low xERA may have experienced bad luck — balls that were hit weakly happened to fall in for hits. Over time, their ERA is likely to improve. Conversely, a pitcher with a low ERA but a high xERA may be benefiting from good fortune that is unlikely to continue.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Why xERA Matters for Evaluating Pitchers</h3>
              <p>
                Traditional ERA tells you what happened. Expected ERA tells you what was likely to happen based on the underlying skill. Scouts, fantasy baseball players, and analysts use xERA to identify undervalued pitchers and predict future performance more accurately than ERA alone.
              </p>
            </div>
          </div>

          {/* Common Scenarios */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How ERA Is Calculated: Common Scenarios and Edge Cases</h2>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Partial Innings in ERA Calculation</h3>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>One of the most confusing aspects of ERA calculation involves partial innings. In baseball scorekeeping, innings are recorded in thirds:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>1 out recorded = 0.1 innings</li>
                <li>2 outs recorded = 0.2 innings</li>
                <li>3 outs recorded = 1.0 inning (full inning)</li>
              </ul>

              <p className="mt-4">When you enter partial innings into an ERA calculator, convert them to decimals first:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>0.1 innings = 0.333 actual innings</li>
                <li>0.2 innings = 0.667 actual innings</li>
              </ul>

              <p className="mt-4">So if a pitcher has thrown 34.2 innings, the actual value you use in the formula is 34.667, not 34.2.</p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Inherited Runners and ERA</h3>
              <p>
                When a relief pitcher enters the game, they may face runners already on base left by the previous pitcher. If those inherited runners score, the earned runs are charged to the pitcher who originally allowed them to reach base — not the relief pitcher who was on the mound when they crossed home plate.
              </p>
              <p>
                This rule protects relief pitchers from being unfairly penalized for a predecessor's failures and is a critical part of official ERA calculation in baseball.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Errors and ERA</h3>
              <p>
                If a batter reaches base due to a fielding error, and that batter later scores a run, that run is typically ruled unearned. The official scorer makes this determination during the game. Unearned runs do not count against the pitcher's ERA, keeping the statistic focused on what the pitcher alone allowed.
              </p>
            </div>
          </div>

          {/* Japanese ERA System */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-purple-600" />
              ERA in Japanese History: Understanding the Japanese Historical Era System
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                ERA also refers to a completely different concept in Japanese history. Japan uses an imperial era calendar system called Gengō (元号), where years are counted from the start of each emperor's reign.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Japanese Era System Overview</h3>
              <p>
                In Japan, instead of only using the Western Gregorian calendar year, official documents, newspapers, and everyday life often use the imperial era name and year. Each time a new emperor ascends the throne, a new era begins.
              </p>

              {/* Japanese Era Table */}
              <div className="overflow-x-auto my-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Major Japanese Historical Eras</h3>
                <table className="w-full border-collapse border-2 border-gray-300 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-purple-600 text-white">
                      <th className="border border-gray-300 p-3 text-left">Era Name</th>
                      <th className="border border-gray-300 p-3 text-left">Japanese</th>
                      <th className="border border-gray-300 p-3 text-left">Western Years</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 font-semibold">Meiji</td>
                      <td className="border border-gray-300 p-3">明治</td>
                      <td className="border border-gray-300 p-3">1868 – 1912</td>
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="border border-gray-300 p-3 font-semibold">Taishō</td>
                      <td className="border border-gray-300 p-3">大正</td>
                      <td className="border border-gray-300 p-3">1912 – 1926</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 font-semibold">Shōwa</td>
                      <td className="border border-gray-300 p-3">昭和</td>
                      <td className="border border-gray-300 p-3">1926 – 1989</td>
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="border border-gray-300 p-3 font-semibold">Heisei</td>
                      <td className="border border-gray-300 p-3">平成</td>
                      <td className="border border-gray-300 p-3">1989 – 2019</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 font-semibold">Reiwa</td>
                      <td className="border border-gray-300 p-3">令和</td>
                      <td className="border border-gray-300 p-3">2019 – Present</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Japanese Era Calculator: Converting Era Years to Western Years</h3>
              <p>To convert a Japanese era year to a Western calendar year, use the following formula:</p>
              
              <div className="bg-purple-50 p-4 rounded-lg my-4">
                <p className="text-xl font-bold text-center text-purple-600">
                  Western Year = Era Start Year + Era Year Number − 1
                </p>
              </div>

              <p><strong>Example:</strong> Shōwa 64 = 1926 + 64 − 1 = 1989</p>
              <p><strong>Example:</strong> Reiwa 6 = 2019 + 6 − 1 = 2024</p>

              <p className="mt-4">
                This calculation is essential for historians, genealogists, people researching Japanese documents, and anyone dealing with official Japanese paperwork that uses the Gengō system.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Era to Years Conversion: Common Japanese Era Dates</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Shōwa 1 = 1926</li>
                <li>Shōwa 64 = 1989</li>
                <li>Heisei 1 = 1989</li>
                <li>Heisei 31 = 2019</li>
                <li>Reiwa 1 = 2019</li>
                <li>Reiwa 7 = 2025</li>
              </ul>
            </div>
          </div>

          {/* Geological Eras */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Era and Period Timeline: Geological and Historical Context</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Beyond baseball and Japanese imperial history, the word era carries broad meaning in geology, world history, and science. Understanding these different uses helps you use the right type of ERA calculator or reference tool.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Historical Eras vs. Time Periods</h3>
              <p>In history, an era refers to a long stretch of time defined by a major characteristic or event. Examples include:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>The Classical Era</li>
                <li>The Medieval Era</li>
                <li>The Industrial Era</li>
                <li>The Modern Era</li>
              </ul>

              <p className="mt-4">
                A period is typically a subdivision within an era. For instance, within the Paleozoic Era, you find periods such as the Cambrian, Ordovician, and Devonian.
              </p>

              {/* Geological Era Table */}
              <div className="overflow-x-auto my-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Geological Era Timeline</h3>
                <table className="w-full border-collapse border-2 border-gray-300 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-green-600 text-white">
                      <th className="border border-gray-300 p-3 text-left">Eon</th>
                      <th className="border border-gray-300 p-3 text-left">Era</th>
                      <th className="border border-gray-300 p-3 text-left">Years Ago (Approximate)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 font-semibold">Phanerozoic</td>
                      <td className="border border-gray-300 p-3">Cenozoic</td>
                      <td className="border border-gray-300 p-3">66 million – Present</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-gray-300 p-3 font-semibold">Phanerozoic</td>
                      <td className="border border-gray-300 p-3">Mesozoic</td>
                      <td className="border border-gray-300 p-3">252 – 66 million</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-gray-300 p-3 font-semibold">Phanerozoic</td>
                      <td className="border border-gray-300 p-3">Paleozoic</td>
                      <td className="border border-gray-300 p-3">541 – 252 million</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="border border-gray-300 p-3 font-semibold">Proterozoic</td>
                      <td className="border border-gray-300 p-3">–</td>
                      <td className="border border-gray-300 p-3">2.5 billion – 541 million</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                These geological eras help scientists and researchers understand Earth's history, evolution of life forms, and climate changes across millions of years
              </p>
            </div>
          </div>

          {/* How Many Years */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How Many Years Is an Era?</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>There is no fixed number of years in an era. The length depends entirely on the context:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>In baseball, an era is typically an entire pitching season or a career phase.</li>
                <li>In Japanese imperial history, an era can last anywhere from a few months to several decades, depending on the emperor's reign.</li>
                <li>In geology, eras span tens to hundreds of millions of years.</li>
                <li>In general history, people loosely use "era" to mean any significant period — anywhere from a decade to a century or more.</li>
              </ul>

              <p className="mt-4">
                The word era comes from the Latin word aera, meaning a fixed starting point or epoch. The common thread across all uses is that an era begins with a notable event or change and continues until the next major shift occurs.
              </p>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Tips for Using an ERA Calculator Accurately</h2>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                <p><strong>Always confirm the game length.</strong> Use a 9-inning multiplier for MLB and most professional leagues. Use a 7-inning multiplier for high school, many amateur leagues, and softball.</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                <p><strong>Convert partial innings correctly.</strong> A scorebook entry of 6.2 innings means 6 and two-thirds innings, which is 6.667 in decimal form.</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                <p><strong>Separate earned from unearned runs.</strong> Only earned runs go into the ERA formula. Review the official scorer's decisions carefully.</p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-600">
                <p><strong>Track inherited runners.</strong> In relief pitching situations, always note which pitcher is responsible for each baserunner.</p>
              </div>

              <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-600">
                <p><strong>Update regularly.</strong> ERA changes with every outing. Calculate it after each game to keep an accurate, current picture of performance.</p>
              </div>
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
                  What is a good ERA in baseball?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  In MLB, a good ERA is generally considered to be 3.50 or below. An elite ERA is under 2.50. Average hovers around 4.00 to 4.50 depending on the offensive environment of the season.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Can a pitcher have a 0.00 ERA?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Yes, but only temporarily. Early in the season, a pitcher who has not allowed any earned runs will have a 0.00 ERA. This is rare to sustain over a full season. The lowest single-season ERA in MLB history was 0.96 by Dutch Leonard in 1914.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How does ERA differ from WHIP?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  ERA measures how many earned runs a pitcher allows per 9 innings. WHIP (Walks plus Hits per Inning Pitched) measures how many baserunners a pitcher allows per inning. Both are pitching quality statistics, but they measure different things. A pitcher can have a low WHIP but a high ERA if they allow baserunners who then score frequently.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How do you calculate ERA for a relief pitcher?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  The formula is the same — (Earned Runs ÷ Innings Pitched) × 9. The key difference is that relief pitchers accumulate fewer innings, so their ERA can fluctuate more dramatically with each outing. A single bad appearance can raise a relief pitcher's ERA significantly if they have only pitched a small number of total innings.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  What is the ERA formula for 7 innings?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  ERA = (Earned Runs ÷ Innings Pitched) × 7. This applies to high school baseball, many youth leagues, and softball leagues that play 7-inning games.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Is ERA the best pitching statistic?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  ERA is excellent for general evaluation, but modern analysts combine it with advanced metrics like FIP (Fielding Independent Pitching), xFIP, and xERA for a fuller picture. ERA can be influenced by the quality of a team's defense, which is why these complementary stats were developed.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  What does ERA mean in Japanese history?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  In Japan, ERA refers to the imperial reign period system called Gengō. Each emperor's reign begins a new era with its own name. The current era is Reiwa, which began in 2019 when Emperor Naruhito ascended the throne.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  How do I convert a Japanese era year to a Western year?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Use this formula: Western Year = Era Start Year + Era Year − 1. For example, Reiwa 7 = 2019 + 7 − 1 = 2025.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  Does ERA apply to pitchers in all baseball leagues worldwide?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Yes. ERA is a universal pitching statistic used in MLB, Nippon Professional Baseball (NPB) in Japan, KBO in South Korea, the Caribbean leagues, and amateur leagues worldwide. The formula remains consistent, though the inning multiplier adjusts based on game length.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
