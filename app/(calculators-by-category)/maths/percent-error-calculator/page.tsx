"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";

import { Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
;
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
;
export default function PercentErrorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const { content, loading, error: contentError } = useCalculatorContent('percent-error-calculator', language, "calculator-ui");
  
  // Use content or fallback to defaults
  const contentData = content || {
    pageTitle: "Percent Error Calculator",
    pageDescription: "Calculate with our free online calculator",
    form: {
      labels: {},
      placeholders: {},
      buttons: {
        calculate: "Calculate",
        reset: "Reset"
      }
    },
    results: {}
  };

  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [measured, setMeasured] = useState<string>("");
  const [actual, setActual] = useState<string>("");
  const [result, setResult] = useState<{
    signed: number;
    abs: number;
    steps: string[];
    measured: number;
    actual: number;
  } | null>(null);
  const [error, setError] = useState<string>("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const measuredNum = parseFloat(measured);
    const actualNum = parseFloat(actual);
    if (isNaN(measuredNum) || isNaN(actualNum)) {
      setError("Please enter valid numbers.");
      setResult(null);
      return;
    }
    if (actualNum === 0) {
      setError("Actual value cannot be zero.");
      setResult(null);
      return;
    }
    const diff = measuredNum - actualNum;
    const signedPercent = diff / actualNum * 100;
    const absPercent = Math.abs(signedPercent);
    // Steps for display
    const steps = [`Percent Error = (Vobserved - Vtrue) / Vtrue × 100`, `= (${measuredNum} - ${actualNum}) / ${actualNum} × 100`, `= (${diff}) / ${actualNum} × 100`, `= ${signedPercent}%`, `= ${absPercent}% error`];
    setResult({
      signed: signedPercent,
      abs: absPercent,
      steps,
      measured: measuredNum,
      actual: actualNum
    });
    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  };
  return <>

      <div className="min-h-screen bg-white">
        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.percent_error_calculator_2}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.calculate_the_percent_error_between_a_measured_val_3}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Calculator Form */}
              <div className="col-span-1">
                <Card className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-white rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 flex items-center justify-center">
                        <Calculator className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-gray-900">{contentData.percent_error_calculator_4}</span>
                    </CardTitle>
                    <CardDescription className="text-base text-gray-700">{contentData.enter_measured_and_actual_values_5}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label className="block mb-1 text-gray-900">{contentData.measured_value_6}</Label>
                        <Input type="number" value={measured} onChange={e => setMeasured(e.target.value)} required />
                      </div>
                      <div>
                        <Label className="block mb-1 text-gray-900">{contentData.actual_value_7}</Label>
                        <Input type="number" value={actual} onChange={e => setActual(e.target.value)} required />
                      </div>
                      {error && <div className="text-red-600 text-sm">{error}</div>}
                      <Button type="submit" className="w-full mt-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600">{contentData.calculate_8}</Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
              {/* Right: Results */}
              <div className="col-span-1 flex items-stretch">
                <Card ref={resultsRef} className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-yellow-100 flex flex-col w-full h-full">
                  <div className="flex flex-1 flex-col justify-center items-center h-full py-12">
                    <div className="flex flex-col items-center justify-center w-full">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 flex items-center justify-center mb-4 shadow-lg">
                        <Calculator className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-orange-700 tracking-tight mb-4 text-center">{contentData.result_9}</div>
                      {result !== null ? <div className="w-full flex flex-col items-center">
                          <div className="text-xl font-semibold text-orange-900 mb-2 text-center">{contentData.percent_error_10}{result.signed.toLocaleString(undefined, {
                          maximumFractionDigits: 6
                        })}%</div>
                          <div className="w-full max-w-lg bg-white rounded-lg shadow p-4">
                            <div className="font-bold text-gray-800 mb-2">{contentData.formula_11}</div>
                            <div className="text-gray-700 text-base mb-4">{contentData.percent_error_vobserved_vtrue_vtrue_100_12}</div>
                            <div className="flex flex-col gap-2">
                              <div><span className="font-bold text-gray-800">{contentData.observed_value_13}</span> <span className="text-gray-700">{result.measured}</span></div>
                              <div><span className="font-bold text-gray-800">{contentData.true_value_14}</span> <span className="text-gray-700">{result.actual}</span></div>
                              <div><span className="font-bold text-gray-800">{contentData.percent_error_absolute_15}</span> <span className="text-orange-700 font-bold">{result.abs.toLocaleString(undefined, {
                                maximumFractionDigits: 6
                              })}{contentData.error_16}</span></div>
                            </div>
                          </div>
                        </div> : <div className="text-green-700 text-center text-base">{contentData.enter_values_and_click_17}<span className="font-semibold text-green-900">{contentData.calculate_18}</span>{contentData.to_see_percent_error_19}</div>}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            {/* How to use section below both cards */}
            <div className="mt-12">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-yellow-100 flex flex-col justify-center items-start p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 flex items-center justify-center mr-3 shadow-lg">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight mb-2 text-left">{contentData.how_to_use_this_calculator_20}</CardTitle>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-start justify-center">
                  <ul className="list-none w-full max-w-md mx-0 text-orange-900 space-y-4 text-base text-left">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-orange-200 text-orange-700 font-bold">{contentData.k_1_21}</span>
                      <span>{contentData.enter_the_measured_value_22}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-orange-200 text-orange-700 font-bold">{contentData.k_2_23}</span>
                      <span>{contentData.enter_the_actual_true_value_24}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-orange-200 text-orange-700 font-bold">{contentData.k_3_25}</span>
                      <span>{contentData.click_26}<span className="font-semibold text-orange-900">{contentData.calculate_27}</span>{contentData.to_see_the_percent_error_instantly_28}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
                    <SimilarCalculators calculators={[{
          calculatorName: "Scientific Calculator",
          calculatorHref: "/maths/scientific-calculator",
          calculatorDescription: "Calculate loan payments and schedules for any type of loan"
        }, {
          calculatorName: "Percent Error Calculator",
          calculatorHref: "/maths/percent-error-calculator",
          calculatorDescription: "Calculate car loan payments and total cost"
        },
        ]} 
        color="orange" 
        title="Related Financial Calculators" />
        </main>

      </div>
    </>;
}