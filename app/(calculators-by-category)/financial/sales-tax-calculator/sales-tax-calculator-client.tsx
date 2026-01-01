"use client";

import type React from "react";
import { useRef, useState } from "react";

import { Calculator, Receipt, DollarSign, HelpCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';


interface SalesTaxCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function SalesTaxCalculatorClient({ content, guideContent }: SalesTaxCalculatorClientProps) {
  const guideData = guideContent || {
    color: 'blue',
    sections: [],
    faq: []
  };
  
  const contentData = content || {};
  
const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [calculationMode, setCalculationMode] = useState("fromPreTax");
  const [preTaxPrice, setPreTaxPrice] = useState("100");
  const [afterTaxPrice, setAfterTaxPrice] = useState("108");
  const [taxRate, setTaxRate] = useState("8");
  const [results, setResults] = useState<{
    prePrice: number;
    tax: number;
    afterPrice: number;
    rate?: number;
  } | null>(null);

  // Calculation functions based on the provided formulas
  function fromPreTax(prePrice: number, r: number) {
    const tax = prePrice * (r / 100);
    const after = prePrice * (1 + r / 100);
    return {
      prePrice,
      tax: +tax.toFixed(2),
      afterPrice: +after.toFixed(2)
    };
  }
  function fromAfterTax(afterPrice: number, r: number) {
    const pre = afterPrice / (1 + r / 100);
    const tax = afterPrice - pre;
    return {
      prePrice: +pre.toFixed(2),
      tax: +tax.toFixed(2),
      afterPrice
    };
  }
  function rateFromPreAfter(prePrice: number, afterPrice: number) {
    const r = afterPrice / prePrice - 1;
    return +(r * 100).toFixed(6);
  }
  const calculateSalesTax = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    let result: {
      prePrice: number;
      tax: number;
      afterPrice: number;
      rate?: number;
    };
    if (calculationMode === "fromPreTax") {
      const prePrice = Number.parseFloat(preTaxPrice);
      const rate = Number.parseFloat(taxRate);
      const calc = fromPreTax(prePrice, rate);
      result = {
        prePrice: calc.prePrice,
        tax: calc.tax,
        afterPrice: calc.afterPrice
      };
    } else if (calculationMode === "fromAfterTax") {
      const afterPrice = Number.parseFloat(afterTaxPrice);
      const rate = Number.parseFloat(taxRate);
      const calc = fromAfterTax(afterPrice, rate);
      result = {
        prePrice: calc.prePrice,
        tax: calc.tax,
        afterPrice: calc.afterPrice
      };
    } else {
      // findTaxRate
      const prePrice = Number.parseFloat(preTaxPrice);
      const afterPrice = Number.parseFloat(afterTaxPrice);
      const calculatedRate = rateFromPreAfter(prePrice, afterPrice);
      result = {
        prePrice,
        tax: afterPrice - prePrice,
        afterPrice,
        rate: calculatedRate
      };
    }
    setResults(result);
  };
  return <>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Receipt className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <Card className="shadow-2xl border-0 pt-0 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-green-600" />
                    <span>{contentData.sales_tax_calculator_0}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Calculation Mode */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold text-gray-900">{contentData.calculation_mode_1}</Label>
                    <Select value={calculationMode} onValueChange={setCalculationMode}>
                      <SelectTrigger className="h-12 border-2 focus:border-green-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fromPreTax">{contentData.from_pretax_price_tax_aftertax_price_2}</SelectItem>
                        <SelectItem value="fromAfterTax">{contentData.from_aftertax_price_pretax_tax_3}</SelectItem>
                        <SelectItem value="findTaxRate">{contentData.find_tax_rate_from_pretax_aftertax_price_4}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Input Fields */}
                  <div className="space-y-6">
                    {calculationMode === "fromPreTax" && <>
                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">{contentData.pretax_price_5}</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input type="number" value={preTaxPrice} onChange={e => setPreTaxPrice(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" placeholder="100.00" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">{contentData.tax_rate_6}</Label>
                          <Input type="number" value={taxRate} onChange={e => setTaxRate(e.target.value)} className="h-12 text-lg border-2 focus:border-green-500" placeholder="8.25" />
                        </div>
                      </>}

                    {calculationMode === "fromAfterTax" && <>
                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">{contentData.aftertax_price_7}</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input type="number" value={afterTaxPrice} onChange={e => setAfterTaxPrice(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" placeholder="108.00" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">{contentData.tax_rate_8}</Label>
                          <Input type="number" value={taxRate} onChange={e => setTaxRate(e.target.value)} className="h-12 text-lg border-2 focus:border-green-500" placeholder="8.25" />
                        </div>
                      </>}

                    {calculationMode === "findTaxRate" && <>
                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">{contentData.pretax_price_9}</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input type="number" value={preTaxPrice} onChange={e => setPreTaxPrice(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" placeholder="100.00" />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label className="text-base font-semibold text-gray-900">{contentData.aftertax_price_10}</Label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input type="number" value={afterTaxPrice} onChange={e => setAfterTaxPrice(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-green-500" placeholder="108.00" />
                          </div>
                        </div>
                      </>}
                  </div>

                  <Button onClick={calculateSalesTax} className="w-full h-14 text-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-xl font-bold mt-8">{contentData.calculate_tax_11}</Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.results_12}</CardTitle>
                  <CardDescription className="text-base">{contentData.your_sales_tax_calculation_13}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? <div className="space-y-6">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <span className="font-medium text-gray-700">{contentData.pretax_price_14}</span>
                          <span className="font-bold text-blue-600 text-xl">
                            $
                            {results.prePrice.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                          <span className="font-medium text-gray-700">{contentData.sales_tax_15}</span>
                          <span className="font-bold text-orange-600 text-xl">
                            $
                            {results.tax.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                          <span className="font-medium text-gray-700">{contentData.aftertax_price_16}</span>
                          <span className="font-bold text-green-600 text-xl">
                            $
                            {results.afterPrice.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                          </span>
                        </div>
                        {results.rate !== undefined && <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                            <span className="font-medium text-gray-700">{contentData.tax_rate_17}</span>
                            <span className="font-bold text-purple-600 text-xl">{results.rate.toFixed(6)}%</span>
                          </div>}
                      </div>
                    </div> : <div className="text-center py-12 text-gray-500">
                      <Receipt className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">{contentData.enter_your_information_to_calculate_sales_tax_18}</p>
                    </div>}
                </CardContent>
              </Card>
            </div>

            {/* Similar Calculators */}
            <div className="mt-12">
              <SimilarCalculators calculators={[{
              calculatorName: "Estate Tax Calculator",
              calculatorHref: "/financial/estate-tax-calculator",
              calculatorDescription: "Calculate estate tax liability, exemptions, and tax planning strategies for estates."
            }, {
              calculatorName: "Salary Calculator",
              calculatorHref: "/financial/salary-calculator",
              calculatorDescription: "Convert between different pay periods and calculate your salary breakdown across various timeframes."
            }, {
              calculatorName: "Income Tax Calculator",
              calculatorHref: "/financial/income-tax-calculator",
              calculatorDescription: "Calculate and state income taxes, deductions, and your total tax liability."
            }]} color="green" title="Related Financial Calculators" />
            </div>

            {/* Educational Content */}
            <div className="mt-12 space-y-8">
              {/* Sales Tax Formulas */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.sales_tax_formulas_19}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_1_from_pretax_price_20}</h3>
                      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                        <p>{contentData.tax_preprice_rate_100_21}</p>
                        <p>{contentData.after_price_preprice_tax_22}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_2_from_aftertax_price_23}</h3>
                      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                        <p>{contentData.preprice_after_price_1_rate_100_24}</p>
                        <p>{contentData.tax_after_price_preprice_25}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_3_find_tax_rate_26}</h3>
                      <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                        <p>{contentData.rate_after_price_pre_price_1_100_27}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Examples */}
              <Card className="shadow-2xl border-0 p-0 bg-white">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.examples_28}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.example_1_calculate_price_29}</h3>
                      <p className="text-gray-700">{contentData.pretax_price_100_tax_rate_8_tax_8_final_price_108_30}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.example_2_reverse_tax_calculation_31}</h3>
                      <p className="text-gray-700">{contentData.aftertax_price_108_tax_rate_8_pretax_price_100_tax_32}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.example_3_find_tax_rate_33}</h3>
                      <p className="text-gray-700">{contentData.pretax_100_aftertax_108_tax_rate_8_34}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guide */}
              
          {/* Rating and Profile Section */}
          <RatingProfileSection
            entityId="sales-tax-calculator"
            entityType="calculator"
            creatorSlug="neo-nicholas"
            initialRatingTotal={0}
            initialRatingCount={0}
          />
          <CalculatorGuide data={guideData} />
            </div>
          </div>
        </main>
      </div>
    </>;
}
