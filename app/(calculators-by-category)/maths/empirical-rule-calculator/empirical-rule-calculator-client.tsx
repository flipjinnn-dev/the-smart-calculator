"use client";

import { useState, useEffect } from "react";
import { Calculator, BarChart3, TrendingUp, Sigma } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';
import Image from "next/image";

interface EmpiricalRuleCalculatorClientProps {
  content: any;
}

interface Results {
  range68Lower: number | null;
  range68Upper: number | null;
  range95Lower: number | null;
  range95Upper: number | null;
  range997Lower: number | null;
  range997Upper: number | null;
}

export default function EmpiricalRuleCalculatorClient({ content }: EmpiricalRuleCalculatorClientProps) {
  const contentData = content || {};
  
  const [mean, setMean] = useState<string>("");
  const [stdDev, setStdDev] = useState<string>("");
  const [results, setResults] = useState<Results>({
    range68Lower: null,
    range68Upper: null,
    range95Lower: null,
    range95Upper: null,
    range997Lower: null,
    range997Upper: null,
  });

  useEffect(() => {
    const μ = parseFloat(mean);
    const σ = parseFloat(stdDev);
    
    if (!isNaN(μ) && !isNaN(σ) && σ > 0) {
      setResults({
        range68Lower: μ - σ,
        range68Upper: μ + σ,
        range95Lower: μ - 2 * σ,
        range95Upper: μ + 2 * σ,
        range997Lower: μ - 3 * σ,
        range997Upper: μ + 3 * σ,
      });
    } else {
      setResults({
        range68Lower: null,
        range68Upper: null,
        range95Lower: null,
        range95Upper: null,
        range997Lower: null,
        range997Upper: null,
      });
    }
  }, [mean, stdDev]);

  const formatNumber = (num: number | null) => {
    if (num === null) return "—";
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{contentData.pageDescription}</p>
          </div>

          <Card className="shadow-2xl border-0 pt-0 bg-white overflow-hidden mb-8">
            <CardHeader className="bg-gradient-to-r py-4 from-blue-50 via-purple-50 to-indigo-50 border-b">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Calculator className="w-6 h-6 text-blue-600" />
                <span>{contentData.calculatorTitle}</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <Label htmlFor="mean" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                    <Sigma className="w-5 h-5 text-blue-600" />
                    {contentData.meanLabel || "Mean (μ)"}
                  </Label>
                  <Input
                    id="mean"
                    type="number"
                    placeholder={contentData.meanPlaceholder || "Enter mean value (e.g., 100)"}
                    value={mean}
                    onChange={(e) => setMean(e.target.value)}
                    className="h-14 text-lg border-2 border-blue-300 focus:border-blue-500 text-center font-semibold"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stdDev" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    {contentData.stdDevLabel || "Standard Deviation (σ)"}
                  </Label>
                  <Input
                    id="stdDev"
                    type="number"
                    placeholder={contentData.stdDevPlaceholder || "Enter standard deviation (e.g., 15)"}
                    value={stdDev}
                    onChange={(e) => setStdDev(e.target.value)}
                    className="h-14 text-lg border-2 border-purple-300 focus:border-purple-500 text-center font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-green-800 flex items-center gap-2">
                      <span className="text-2xl">📊</span>
                      {contentData.range68Title || "68% Range (±1σ)"}
                    </h3>
                    <span className="text-3xl font-bold text-green-600">~68%</span>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-300">
                    <div className="flex items-center justify-center gap-3 text-lg flex-wrap">
                      <div className="flex flex-col items-center">
                        <span className="text-sm text-gray-500 mb-1">{contentData.lowerBound || "Lower"}</span>
                        <span className="text-2xl font-bold text-green-600">
                          {formatNumber(results.range68Lower)}
                        </span>
                      </div>
                      <span className="text-gray-400 text-2xl">→</span>
                      <div className="flex flex-col items-center">
                        <span className="text-sm text-gray-500 mb-1">{contentData.upperBound || "Upper"}</span>
                        <span className="text-2xl font-bold text-green-600">
                          {formatNumber(results.range68Upper)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3 text-center">{contentData.range68Description}</p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-blue-800 flex items-center gap-2">
                      <span className="text-2xl">📈</span>
                      {contentData.range95Title || "95% Range (±2σ)"}
                    </h3>
                    <span className="text-3xl font-bold text-blue-600">~95%</span>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-300">
                    <div className="flex items-center justify-center gap-3 text-lg flex-wrap">
                      <div className="flex flex-col items-center">
                        <span className="text-sm text-gray-500 mb-1">{contentData.lowerBound || "Lower"}</span>
                        <span className="text-2xl font-bold text-blue-600">
                          {formatNumber(results.range95Lower)}
                        </span>
                      </div>
                      <span className="text-gray-400 text-2xl">→</span>
                      <div className="flex flex-col items-center">
                        <span className="text-sm text-gray-500 mb-1">{contentData.upperBound || "Upper"}</span>
                        <span className="text-2xl font-bold text-blue-600">
                          {formatNumber(results.range95Upper)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3 text-center">{contentData.range95Description}</p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-purple-800 flex items-center gap-2">
                      <span className="text-2xl">🎯</span>
                      {contentData.range997Title || "99.7% Range (±3σ)"}
                    </h3>
                    <span className="text-3xl font-bold text-purple-600">~99.7%</span>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-purple-300">
                    <div className="flex items-center justify-center gap-3 text-lg flex-wrap">
                      <div className="flex flex-col items-center">
                        <span className="text-sm text-gray-500 mb-1">{contentData.lowerBound || "Lower"}</span>
                        <span className="text-2xl font-bold text-purple-600">
                          {formatNumber(results.range997Lower)}
                        </span>
                      </div>
                      <span className="text-gray-400 text-2xl">→</span>
                      <div className="flex flex-col items-center">
                        <span className="text-sm text-gray-500 mb-1">{contentData.upperBound || "Upper"}</span>
                        <span className="text-2xl font-bold text-purple-600">
                          {formatNumber(results.range997Upper)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-3 text-center">{contentData.range997Description}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 pt-0 bg-white overflow-hidden mb-8">
            <CardHeader className="bg-gradient-to-r py-4 from-indigo-50 to-purple-50 border-b">
              <CardTitle className="text-2xl">{contentData.whatIsTitle}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <div className="prose max-w-none">
                <div className="mb-6">
                  <div className="relative w-full h-[450px] mb-6 rounded-lg overflow-hidden bg-white">
                    <Image 
                      src="/images/what-is-empirical-rule-calculator.png"
                      alt="What is Empirical Rule Calculator"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-4">{contentData.whatIsContent1}</p>
                  <p className="text-gray-700 leading-relaxed mb-4">{contentData.whatIsContent2}</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <span>📈</span> {contentData.ruleTitle}
                  </h3>
                  <p className="text-gray-700 mb-3">{contentData.ruleIntro}</p>
                  <ul className="space-y-2 ml-4">
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-1">✔</span>
                      <span>{contentData.rule1}</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-1">✔</span>
                      <span>{contentData.rule2}</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-purple-600 font-bold mt-1">✔</span>
                      <span>{contentData.rule3}</span>
                    </li>
                  </ul>
                  <p className="text-gray-600 mt-4 italic">{contentData.ruleNote}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{contentData.howWorksTitle}</h3>
                  
                  <div className="bg-purple-50 rounded-lg p-5 mb-4">
                    <h4 className="text-lg font-bold text-purple-900 mb-2">1️⃣ {contentData.step1Title}</h4>
                    <p className="text-gray-700">{contentData.step1Content}</p>
                  </div>

                  <div className="bg-indigo-50 rounded-lg p-5">
                    <h4 className="text-lg font-bold text-indigo-900 mb-3">2️⃣ {contentData.step2Title}</h4>
                    <p className="text-gray-700 mb-3">{contentData.step2Intro}</p>
                    
                    <div className="space-y-3 ml-4">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h5 className="font-bold text-green-800 mb-2">{contentData.formula68Title}</h5>
                        <p className="font-mono text-sm text-gray-700 mb-2">{contentData.formula68}</p>
                        <p className="text-gray-600 text-sm">{contentData.formula68Description}</p>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h5 className="font-bold text-blue-800 mb-2">{contentData.formula95Title}</h5>
                        <p className="font-mono text-sm text-gray-700 mb-2">{contentData.formula95}</p>
                        <p className="text-gray-600 text-sm">{contentData.formula95Description}</p>
                      </div>

                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <h5 className="font-bold text-purple-800 mb-2">{contentData.formula997Title}</h5>
                        <p className="font-mono text-sm text-gray-700 mb-2">{contentData.formula997}</p>
                        <p className="text-gray-600 text-sm">{contentData.formula997Description}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{contentData.conceptsTitle}</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-5 border border-blue-200">
                      <h4 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
                        <span>📌</span> {contentData.meanTitle}
                      </h4>
                      <p className="text-gray-700 mb-2">{contentData.meanContent}</p>
                      <p className="font-mono text-sm bg-white p-2 rounded border">{contentData.meanFormula}</p>
                      <p className="text-gray-600 text-sm mt-2">{contentData.meanDescription}</p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-5 border border-purple-200">
                      <h4 className="text-lg font-bold text-purple-900 mb-2 flex items-center gap-2">
                        <span>📌</span> {contentData.stdDevTitle}
                      </h4>
                      <p className="text-gray-700 mb-2">{contentData.stdDevContent}</p>
                      <p className="font-mono text-sm bg-white p-2 rounded border">{contentData.stdDevFormula}</p>
                      <p className="text-gray-600 text-sm mt-2">{contentData.stdDevDescription}</p>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-5 border border-green-200">
                      <h4 className="text-lg font-bold text-green-900 mb-2 flex items-center gap-2">
                        <span>📌</span> {contentData.rangeTableTitle}
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-lg overflow-hidden border">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-4 py-3 text-left font-bold text-gray-800">{contentData.tableRange}</th>
                              <th className="px-4 py-3 text-left font-bold text-gray-800">{contentData.tableFormula}</th>
                              <th className="px-4 py-3 text-left font-bold text-gray-800">{contentData.tablePercentage}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-t">
                              <td className="px-4 py-3 text-gray-700">±1σ</td>
                              <td className="px-4 py-3 font-mono text-sm text-gray-700">µ - σ to µ + σ</td>
                              <td className="px-4 py-3 text-green-600 font-bold">~68%</td>
                            </tr>
                            <tr className="border-t bg-gray-50">
                              <td className="px-4 py-3 text-gray-700">±2σ</td>
                              <td className="px-4 py-3 font-mono text-sm text-gray-700">µ - 2σ to µ + 2σ</td>
                              <td className="px-4 py-3 text-blue-600 font-bold">~95%</td>
                            </tr>
                            <tr className="border-t">
                              <td className="px-4 py-3 text-gray-700">±3σ</td>
                              <td className="px-4 py-3 font-mono text-sm text-gray-700">µ - 3σ to µ + 3σ</td>
                              <td className="px-4 py-3 text-purple-600 font-bold">~99.7%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-gray-600 text-sm mt-3">{contentData.tableNote}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 border-l-4 border-amber-400 mb-6">
                  <h3 className="text-xl font-bold text-amber-900 mb-3 flex items-center gap-2">
                    <span>📍</span> {contentData.exampleTitle}
                  </h3>
                  <p className="text-gray-700 mb-3">{contentData.exampleIntro}</p>
                  <div className="bg-white rounded-lg p-4 mb-3">
                    <p className="text-gray-700 mb-1">{contentData.exampleMean}</p>
                    <p className="text-gray-700">{contentData.exampleStdDev}</p>
                  </div>
                  <p className="text-gray-700 font-semibold mb-2">{contentData.exampleThen}</p>
                  <ul className="space-y-1 ml-4">
                    <li className="text-gray-700">{contentData.example68}</li>
                    <li className="text-gray-700">{contentData.example95}</li>
                    <li className="text-gray-700">{contentData.example997}</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 border border-indigo-200">
                  <h3 className="text-xl font-bold text-indigo-900 mb-3 flex items-center gap-2">
                    <span>📌</span> {contentData.whereUsedTitle}
                  </h3>
                  <p className="text-gray-700 mb-3">{contentData.whereUsedIntro}</p>
                  <ul className="space-y-2 ml-4">
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-indigo-600 font-bold mt-1">✔</span>
                      <span>{contentData.use1}</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-indigo-600 font-bold mt-1">✔</span>
                      <span>{contentData.use2}</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-indigo-600 font-bold mt-1">✔</span>
                      <span>{contentData.use3}</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-indigo-600 font-bold mt-1">✔</span>
                      <span>{contentData.use4}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white overflow-hidden mb-8">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
              <CardTitle className="text-2xl">{contentData.contentTitle}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <div className="prose max-w-none">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{contentData.contentWhatIsTitle}</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{contentData.contentWhatIs1}</p>
                  <p className="text-gray-700 leading-relaxed">{contentData.contentWhatIs2}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{contentData.whoUsesTitle}</h3>
                  <ul className="space-y-2 ml-4">
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-1">•</span>
                      <span>{contentData.whoUses1}</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-1">•</span>
                      <span>{contentData.whoUses2}</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-1">•</span>
                      <span>{contentData.whoUses3}</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-1">•</span>
                      <span>{contentData.whoUses4}</span>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{contentData.howToUseTitle}</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-5">
                      <h4 className="font-bold text-blue-900 mb-2">{contentData.howToStep1Title}</h4>
                      <p className="text-gray-700">{contentData.howToStep1Content}</p>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-5">
                      <h4 className="font-bold text-purple-900 mb-2">{contentData.howToStep2Title}</h4>
                      <p className="text-gray-700 mb-2">{contentData.howToStep2Content}</p>
                      <ul className="ml-6 space-y-1">
                        <li className="text-gray-700">{contentData.howToStep2Option1}</li>
                        <li className="text-gray-700">{contentData.howToStep2Option2}</li>
                        <li className="text-gray-700">{contentData.howToStep2Option3}</li>
                        <li className="text-gray-700">{contentData.howToStep2Option4}</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 rounded-lg p-5">
                      <h4 className="font-bold text-green-900 mb-2">{contentData.howToStep3Title}</h4>
                      <p className="text-gray-700">{contentData.howToStep3Content}</p>
                    </div>

                    <div className="bg-indigo-50 rounded-lg p-5">
                      <h4 className="font-bold text-indigo-900 mb-2">{contentData.howToStep4Title}</h4>
                      <p className="text-gray-700">{contentData.howToStep4Content}</p>
                    </div>
                  </div>

                  <div className="bg-amber-50 rounded-lg p-4 mt-4 border-l-4 border-amber-400">
                    <p className="font-bold text-amber-900 mb-2">{contentData.tipsTitle}</p>
                    <ul className="space-y-1 ml-4">
                      <li className="text-gray-700 text-sm">{contentData.tip1}</li>
                      <li className="text-gray-700 text-sm">{contentData.tip2}</li>
                      <li className="text-gray-700 text-sm">{contentData.tip3}</li>
                    </ul>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{contentData.examplesTitle}</h3>
                  <ul className="space-y-2 ml-4">
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-1">•</span>
                      <span><strong>{contentData.exampleType1}:</strong> {contentData.exampleType1Description}</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-1">•</span>
                      <span><strong>{contentData.exampleType2}:</strong> {contentData.exampleType2Description}</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-purple-600 font-bold mt-1">•</span>
                      <span><strong>{contentData.exampleType3}:</strong> {contentData.exampleType3Description}</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-indigo-600 font-bold mt-1">•</span>
                      <span><strong>{contentData.exampleType4}:</strong> {contentData.exampleType4Description}</span>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{contentData.advantagesTitle}</h3>
                  <ul className="space-y-2 ml-4">
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-1">✓</span>
                      <span><strong>{contentData.advantage1Title}:</strong> {contentData.advantage1Description}</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-1">✓</span>
                      <span><strong>{contentData.advantage2Title}:</strong> {contentData.advantage2Description}</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-purple-600 font-bold mt-1">✓</span>
                      <span><strong>{contentData.advantage3Title}:</strong> {contentData.advantage3Description}</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-indigo-600 font-bold mt-1">✓</span>
                      <span><strong>{contentData.advantage4Title}:</strong> {contentData.advantage4Description}</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-pink-600 font-bold mt-1">✓</span>
                      <span><strong>{contentData.advantage5Title}:</strong> {contentData.advantage5Description}</span>
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{contentData.platformsTitle}</h3>
                  <ul className="space-y-2 ml-4">
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-1">•</span>
                      <span><strong>{contentData.platform1Title}:</strong> {contentData.platform1Description}</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-green-600 font-bold mt-1">•</span>
                      <span><strong>{contentData.platform2Title}:</strong> {contentData.platform2Description}</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-purple-600 font-bold mt-1">•</span>
                      <span><strong>{contentData.platform3Title}:</strong> {contentData.platform3Description}</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-indigo-600 font-bold mt-1">•</span>
                      <span><strong>{contentData.platform4Title}:</strong> {contentData.platform4Description}</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{contentData.faqTitle}</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">{contentData.faq1Question}</h4>
                      <p className="text-gray-700">{contentData.faq1Answer}</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">{contentData.faq2Question}</h4>
                      <p className="text-gray-700 mb-2">{contentData.faq2Answer}</p>
                      <ul className="ml-6 space-y-1">
                        <li className="text-gray-700">{contentData.faq2Point1}</li>
                        <li className="text-gray-700">{contentData.faq2Point2}</li>
                        <li className="text-gray-700">{contentData.faq2Point3}</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">{contentData.faq3Question}</h4>
                      <p className="text-gray-700">{contentData.faq3Answer}</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">{contentData.faq4Question}</h4>
                      <p className="text-gray-700">{contentData.faq4Answer}</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">{contentData.faq5Question}</h4>
                      <p className="text-gray-700">{contentData.faq5Answer}</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">{contentData.faq6Question}</h4>
                      <p className="text-gray-700">{contentData.faq6Answer}</p>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">{contentData.faq7Question}</h4>
                      <p className="text-gray-700">{contentData.faq7Answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <RatingProfileSection
            entityId="empirical-rule-calculator"
            entityType="calculator"
            creatorSlug="felix-yacoub"
            initialRatingTotal={0}
            initialRatingCount={0}
          />

          <SimilarCalculators 
            calculators={[
              {
                calculatorName: "Percentage Calculator",
                calculatorHref: "/maths/percentage-calculator",
                calculatorDescription: "Calculate percentages, ratios, and percentage changes easily"
              },
              {
                calculatorName: "Scientific Calculator",
                calculatorHref: "/maths/scientific-calculator",
                calculatorDescription: "Perform complex scientific calculations"
              },
              {
                calculatorName: "Random Number Generator",
                calculatorHref: "/maths/random-number-generator",
                calculatorDescription: "Generate random numbers within specified ranges"
              }
            ]}
            color="blue"
            title="Related Math Calculators" 
          />
        </div>
      </main>
    </div>
  );
}
