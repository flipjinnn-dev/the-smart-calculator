"use client";

import { useState, useEffect } from "react";
import { Percent, TrendingUp, TrendingDown, Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import SimilarCalculators from "@/components/similar-calculators";
import CalculatorGuide from "@/components/calculator-guide";
import { RatingProfileSection } from '@/components/rating-profile-section';

interface CalculationState {
  percentOf1: string;
  percentOf2: string;
  whatIs1: string;
  whatIs2: string;
  percentChange1: string;
  percentChange2: string;
  increase1: string;
  increase2: string;
  decrease1: string;
  decrease2: string;
}


interface PercentageCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function PercentageCalculatorClient({ content, guideContent }: PercentageCalculatorClientProps) {
  const guideData = guideContent || {
    color: 'blue',
    sections: [],
    faq: []
  };
  
  const contentData = content || {};
  

          
  
  

  const [values, setValues] = useState<CalculationState>({
    percentOf1: "",
    percentOf2: "",
    whatIs1: "",
    whatIs2: "",
    percentChange1: "",
    percentChange2: "",
    increase1: "",
    increase2: "",
    decrease1: "",
    decrease2: "",
  });

  const [results, setResults] = useState({
    percentOf: null as number | null,
    whatIs: null as number | null,
    percentChange: null as number | null,
    increase: null as number | null,
    decrease: null as number | null,
  });

  useEffect(() => {
    const num1 = parseFloat(values.percentOf1);
    const num2 = parseFloat(values.percentOf2);
    if (!isNaN(num1) && !isNaN(num2)) {
      setResults(prev => ({ ...prev, percentOf: (num1 / 100) * num2 }));
    } else {
      setResults(prev => ({ ...prev, percentOf: null }));
    }
  }, [values.percentOf1, values.percentOf2]);

  useEffect(() => {
    const num1 = parseFloat(values.whatIs1);
    const num2 = parseFloat(values.whatIs2);
    if (!isNaN(num1) && !isNaN(num2) && num2 !== 0) {
      setResults(prev => ({ ...prev, whatIs: (num1 / num2) * 100 }));
    } else {
      setResults(prev => ({ ...prev, whatIs: null }));
    }
  }, [values.whatIs1, values.whatIs2]);

  useEffect(() => {
    const num1 = parseFloat(values.percentChange1);
    const num2 = parseFloat(values.percentChange2);
    if (!isNaN(num1) && !isNaN(num2) && num1 !== 0) {
      setResults(prev => ({ ...prev, percentChange: ((num2 - num1) / num1) * 100 }));
    } else {
      setResults(prev => ({ ...prev, percentChange: null }));
    }
  }, [values.percentChange1, values.percentChange2]);

  useEffect(() => {
    const num1 = parseFloat(values.increase1);
    const num2 = parseFloat(values.increase2);
    if (!isNaN(num1) && !isNaN(num2)) {
      setResults(prev => ({ ...prev, increase: num1 + (num1 * num2) / 100 }));
    } else {
      setResults(prev => ({ ...prev, increase: null }));
    }
  }, [values.increase1, values.increase2]);

  useEffect(() => {
    const num1 = parseFloat(values.decrease1);
    const num2 = parseFloat(values.decrease2);
    if (!isNaN(num1) && !isNaN(num2)) {
      setResults(prev => ({ ...prev, decrease: num1 - (num1 * num2) / 100 }));
    } else {
      setResults(prev => ({ ...prev, decrease: null }));
    }
  }, [values.decrease1, values.decrease2]);

  const updateValue = (field: keyof CalculationState, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

      return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Percent className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{contentData.pageDescription}</p>
          </div>

          {/* Main Calculator Card */}
          <Card className="shadow-2xl border-0 bg-white overflow-hidden mb-8 pt-0">
            <CardHeader className="bg-gradient-to-r from-blue-50 via-purple-50 pt-5 mt-0 to-blue-50 border-b">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Calculator className="w-6 h-6 text-blue-600" />
                <span>Calculate Percentages</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-6 md:p-8 space-y-6">
              {/* Calculation 1: What is X% of Y? */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <Percent className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">What is</h3>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-lg">
                  <Input
                    type="number"
                    placeholder="10"
                    value={values.percentOf1}
                    onChange={(e) => updateValue('percentOf1', e.target.value)}
                    className="w-24 h-12 text-center text-lg font-semibold border-2 border-blue-300 focus:border-blue-500"
                  />
                  <span className="text-gray-600 font-medium">%</span>
                  <span className="text-gray-600 font-medium">of</span>
                  <Input
                    type="number"
                    placeholder="200"
                    value={values.percentOf2}
                    onChange={(e) => updateValue('percentOf2', e.target.value)}
                    className="w-32 h-12 text-center text-lg font-semibold border-2 border-blue-300 focus:border-blue-500"
                  />
                  <span className="text-gray-600 font-medium">?</span>
                  <div className="flex-1 min-w-[200px] h-12 bg-white rounded-lg border-2 border-blue-400 flex items-center justify-center">
                    {results.percentOf !== null ? (
                      <span className="text-2xl font-bold text-blue-600">
                        {results.percentOf.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Calculation 2: X is what % of Y? */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <Calculator className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-800">What percentage</h3>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-lg">
                  <Input
                    type="number"
                    placeholder="50"
                    value={values.whatIs1}
                    onChange={(e) => updateValue('whatIs1', e.target.value)}
                    className="w-32 h-12 text-center text-lg font-semibold border-2 border-purple-300 focus:border-purple-500"
                  />
                  <span className="text-gray-600 font-medium">is what % of</span>
                  <Input
                    type="number"
                    placeholder="200"
                    value={values.whatIs2}
                    onChange={(e) => updateValue('whatIs2', e.target.value)}
                    className="w-32 h-12 text-center text-lg font-semibold border-2 border-purple-300 focus:border-purple-500"
                  />
                  <span className="text-gray-600 font-medium">?</span>
                  <div className="flex-1 min-w-[200px] h-12 bg-white rounded-lg border-2 border-purple-400 flex items-center justify-center">
                    {results.whatIs !== null ? (
                      <span className="text-2xl font-bold text-purple-600">
                        {results.whatIs.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Calculation 3: Percentage Change */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Percentage change</h3>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-lg">
                  <span className="text-gray-600 font-medium">from</span>
                  <Input
                    type="number"
                    placeholder="100"
                    value={values.percentChange1}
                    onChange={(e) => updateValue('percentChange1', e.target.value)}
                    className="w-32 h-12 text-center text-lg font-semibold border-2 border-indigo-300 focus:border-indigo-500"
                  />
                  <span className="text-gray-600 font-medium">to</span>
                  <Input
                    type="number"
                    placeholder="150"
                    value={values.percentChange2}
                    onChange={(e) => updateValue('percentChange2', e.target.value)}
                    className="w-32 h-12 text-center text-lg font-semibold border-2 border-indigo-300 focus:border-indigo-500"
                  />
                  <span className="text-gray-600 font-medium">?</span>
                  <div className="flex-1 min-w-[200px] h-12 bg-white rounded-lg border-2 border-indigo-400 flex items-center justify-center">
                    {results.percentChange !== null ? (
                      <span className={`text-2xl font-bold ${results.percentChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {results.percentChange >= 0 ? '+' : ''}{results.percentChange.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Calculation 4: Increase by X% */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Increase value</h3>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-lg">
                  <Input
                    type="number"
                    placeholder="100"
                    value={values.increase1}
                    onChange={(e) => updateValue('increase1', e.target.value)}
                    className="w-32 h-12 text-center text-lg font-semibold border-2 border-green-300 focus:border-green-500"
                  />
                  <span className="text-gray-600 font-medium">increased by</span>
                  <Input
                    type="number"
                    placeholder="20"
                    value={values.increase2}
                    onChange={(e) => updateValue('increase2', e.target.value)}
                    className="w-24 h-12 text-center text-lg font-semibold border-2 border-green-300 focus:border-green-500"
                  />
                  <span className="text-gray-600 font-medium">%</span>
                  <span className="text-gray-600 font-medium">=</span>
                  <div className="flex-1 min-w-[200px] h-12 bg-white rounded-lg border-2 border-green-400 flex items-center justify-center">
                    {results.increase !== null ? (
                      <span className="text-2xl font-bold text-green-600">
                        {results.increase.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Calculation 5: Decrease by X% */}
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border border-red-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingDown className="w-5 h-5 text-red-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Decrease value</h3>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-lg">
                  <Input
                    type="number"
                    placeholder="100"
                    value={values.decrease1}
                    onChange={(e) => updateValue('decrease1', e.target.value)}
                    className="w-32 h-12 text-center text-lg font-semibold border-2 border-red-300 focus:border-red-500"
                  />
                  <span className="text-gray-600 font-medium">decreased by</span>
                  <Input
                    type="number"
                    placeholder="15"
                    value={values.decrease2}
                    onChange={(e) => updateValue('decrease2', e.target.value)}
                    className="w-24 h-12 text-center text-lg font-semibold border-2 border-red-300 focus:border-red-500"
                  />
                  <span className="text-gray-600 font-medium">%</span>
                  <span className="text-gray-600 font-medium">=</span>
                  <div className="flex-1 min-w-[200px] h-12 bg-white rounded-lg border-2 border-red-400 flex items-center justify-center">
                    {results.decrease !== null ? (
                      <span className="text-2xl font-bold text-red-600">
                        {results.decrease.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <RatingProfileSection
          entityId="percentage-calculator"
          entityType="calculator"
          creatorSlug="felix-yacoub"
          initialRatingTotal={0}
          initialRatingCount={0}
        />
        <CalculatorGuide data={guideData} />
        <SimilarCalculators 
          calculators={[{
            calculatorName: "Percent Error Calculator",
            calculatorHref: "/maths/percent-error-calculator",
            calculatorDescription: "Calculate loan payments and schedules for any type of loan"
          }, {
            calculatorName: "Scientific Calculator",
            calculatorHref: "/maths/scientific-calculator",
            calculatorDescription: "Calculate car loan payments and total cost"
          }]}
          color="blue"
          title="Related Math Calculators" 
        />
      </main>
    </div>
  );
}
