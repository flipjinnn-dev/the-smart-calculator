"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/logo";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SEO from "@/lib/seo";

export default function PercentErrorCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()
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
    const signedPercent = (diff / actualNum) * 100;
    const absPercent = Math.abs(signedPercent);
    // Steps for display
    const steps = [
      `Percent Error = (Vobserved - Vtrue) / Vtrue × 100`,
      `= (${measuredNum} - ${actualNum}) / ${actualNum} × 100`,
      `= (${diff}) / ${actualNum} × 100`,
      `= ${signedPercent}%`,
      `= ${absPercent}% error`,
    ];
    setResult({ signed: signedPercent, abs: absPercent, steps, measured: measuredNum, actual: actualNum });
    // Scroll to results
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  };

  return (
    <>
<SEO
  title="Percentage Error Calculator – Fast Error Finder"
  description="Find percentage error quickly and accurately. Use our free calculator for math, science, and real-world calculations with precision."
  keywords="percentage error calculator, error percentage calculator, math error calculator, science calculator"
  slug="/maths/percent-error-calculator"
/>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <Logo />
                <div>
                  <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Smart Calculator
                  </Link>
                  <p className="text-sm text-gray-500">Percent Error Calculator</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* Breadcrumb */}
        <nav className="bg-white border-b px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 py-4 text-sm">
              <Link href="/" className="text-gray-500 hover:text-blue-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/maths" className="text-gray-500 hover:text-blue-600">
                Math
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Percent Error Calculator</span>
            </div>
          </div>
        </nav>
        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Percent Error Calculator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Calculate the percent error between a measured value and an actual value instantly.
              </p>
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
                      <span className="text-gray-900">Percent Error Calculator</span>
                    </CardTitle>
                    <CardDescription className="text-base text-gray-700">Enter measured and actual values</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label className="block mb-1 text-gray-900">Measured Value</Label>
                        <Input type="number" value={measured} onChange={e => setMeasured(e.target.value)} required />
                      </div>
                      <div>
                        <Label className="block mb-1 text-gray-900">Actual Value</Label>
                        <Input type="number" value={actual} onChange={e => setActual(e.target.value)} required />
                      </div>
                      {error && <div className="text-red-600 text-sm">{error}</div>}
                      <Button type="submit" className="w-full mt-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600">Calculate</Button>
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
                      <div className="text-2xl font-bold text-orange-700 tracking-tight mb-4 text-center">Result</div>
                      {result !== null ? (
                        <div className="w-full flex flex-col items-center">
                          <div className="text-xl font-semibold text-orange-900 mb-2 text-center">Percent error = {result.signed.toLocaleString(undefined, { maximumFractionDigits: 6 })}%</div>
                          <div className="w-full max-w-lg bg-white rounded-lg shadow p-4">
                            <div className="font-bold text-gray-800 mb-2">Formula:</div>
                            <div className="text-gray-700 text-base mb-4">Percent Error = (Vobserved - Vtrue) / Vtrue × 100</div>
                            <div className="flex flex-col gap-2">
                              <div><span className="font-bold text-gray-800">Observed Value:</span> <span className="text-gray-700">{result.measured}</span></div>
                              <div><span className="font-bold text-gray-800">True Value:</span> <span className="text-gray-700">{result.actual}</span></div>
                              <div><span className="font-bold text-gray-800">Percent Error (absolute):</span> <span className="text-orange-700 font-bold">{result.abs.toLocaleString(undefined, { maximumFractionDigits: 6 })}% error</span></div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-green-700 text-center text-base">Enter values and click <span className="font-semibold text-green-900">Calculate</span> to see percent error.</div>
                      )}
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
                  <CardTitle className="text-2xl font-bold text-orange-700 tracking-tight mb-2 text-left">How to use this calculator?</CardTitle>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-start justify-center">
                  <ul className="list-none w-full max-w-md mx-0 text-orange-900 space-y-4 text-base text-left">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-orange-200 text-orange-700 font-bold">1</span>
                      <span>Enter the measured value.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-orange-200 text-orange-700 font-bold">2</span>
                      <span>Enter the actual (true) value.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-orange-200 text-orange-700 font-bold">3</span>
                      <span>Click <span className="font-semibold text-orange-900">Calculate</span> to see the percent error instantly.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

      </div>
    </>
  );
}
