"use client";
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/logo";

export default function RandomNumberGenerator() {
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(100);
  const [quantity, setQuantity] = useState<number>(1);
  const [allowRepeat, setAllowRepeat] = useState<boolean>(true);
  const [result, setResult] = useState<number[] | null>(null);
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (isNaN(min) || isNaN(max) || isNaN(quantity)) {
      setError("Please enter valid numbers.");
      setResult(null);
      return;
    }
    if (min > max) {
      setError("Minimum value cannot be greater than maximum value.");
      setResult(null);
      return;
    }
    if (quantity < 1) {
      setError("Quantity must be at least 1.");
      setResult(null);
      return;
    }
    if (!allowRepeat && quantity > max - min + 1) {
      setError("Quantity exceeds the range without repeats.");
      setResult(null);
      return;
    }
    let numbers: number[] = [];
    if (allowRepeat) {
      for (let i = 0; i < quantity; i++) {
        numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
      }
    } else {
      const pool = Array.from({ length: max - min + 1 }, (_, i) => min + i);
      for (let i = 0; i < quantity; i++) {
        const idx = Math.floor(Math.random() * pool.length);
        numbers.push(pool[idx]);
        pool.splice(idx, 1);
      }
    }
    setResult(numbers);
  };

  return (
    <>
      <Head>
        <title>Random Number Generator - Smart Calculator</title>
        <meta name="description" content="Generate random numbers in a range with or without repeats. Free online random number generator." />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
                  <p className="text-sm text-gray-500">Random Number Generator</p>
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
              <Link href="/category/math" className="text-gray-500 hover:text-blue-600">
                Math
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Random Number Generator</span>
            </div>
          </div>
        </nav>
        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Calculator className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Random Number Generator</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Generate random numbers in a custom range, with or without repeats, instantly.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Generator Form */}
              <div className="col-span-1">
                <Card className="shadow-2xl border-0 bg-white">
                  <CardHeader className="bg-white rounded-t-lg border-b px-8 py-6">
                    <CardTitle className="flex items-center space-x-3 text-2xl">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                        <Calculator className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-gray-900">Random Number Generator</span>
                    </CardTitle>
                    <CardDescription className="text-base text-gray-700">Set your range and options</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label className="block mb-1 text-gray-900">Minimum Value</Label>
                        <Input type="number" value={min} onChange={e => setMin(Number(e.target.value))} required />
                      </div>
                      <div>
                        <Label className="block mb-1 text-gray-900">Maximum Value</Label>
                        <Input type="number" value={max} onChange={e => setMax(Number(e.target.value))} required />
                      </div>
                      <div>
                        <Label className="block mb-1 text-gray-900">How many numbers?</Label>
                        <Input type="number" value={quantity} min={1} onChange={e => setQuantity(Number(e.target.value))} required />
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="repeat" checked={allowRepeat} onChange={e => setAllowRepeat(e.target.checked)} />
                        <Label htmlFor="repeat" className="text-gray-900">Allow repeats</Label>
                      </div>
                      {error && <div className="text-red-600 text-sm">{error}</div>}
                      <Button type="submit" className="w-full mt-2 bg-gradient-to-r from-green-500 to-green-700 text-white hover:from-green-600 hover:to-green-800">Generate</Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
              {/* Right: Results */}
              <div className="col-span-1 flex items-stretch">
                <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-green-200 flex flex-col w-full h-full">
                  <div className="flex flex-1 flex-col justify-center items-center h-full py-12">
                    <div className="flex flex-col items-center justify-center w-full">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center mb-4 shadow-lg">
                        <Calculator className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-green-700 tracking-tight mb-4 text-center">Result</div>
                      {result !== null ? (
                        <div className="text-3xl font-bold mb-2 text-center w-full bg-gradient-to-l from-green-700 to-green-300 bg-clip-text text-transparent">
                          {result.join(", ")}
                        </div>
                      ) : (
                        <div className="text-green-700 text-center text-base">Set your range and click <span className="font-semibold text-green-900">Generate</span> to see random numbers.</div>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            {/* How to use section below both cards */}
            <div className="mt-12">
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-green-200 flex flex-col justify-center items-start p-8">
                <CardHeader className="w-full flex flex-row items-center justify-start mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center mr-3 shadow-lg">
                    <Calculator className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-green-700 tracking-tight mb-2 text-left">How to use this generator?</CardTitle>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-start justify-center">
                  <ul className="list-none w-full max-w-md mx-0 text-green-900 space-y-4 text-base text-left">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-green-200 text-green-700 font-bold">1</span>
                      <span>Enter the minimum and maximum values for your range.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-green-200 text-green-700 font-bold">2</span>
                      <span>Enter how many random numbers you want to generate.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-green-200 text-green-700 font-bold">3</span>
                      <span>Choose whether to allow repeats or not.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-green-200 text-green-700 font-bold">4</span>
                      <span>Click <span className="font-semibold text-green-900">Generate</span> to see your random numbers instantly.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Logo />
                <span className="text-2xl font-bold">Smart Calculator</span>
              </div>
              <p className="text-gray-400">&copy; 2025 Smart Calculator. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
