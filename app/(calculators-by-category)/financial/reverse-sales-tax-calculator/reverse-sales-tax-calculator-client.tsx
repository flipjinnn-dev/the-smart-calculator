"use client";

import type React from "react";
import { useRef, useState } from "react";

import { Calculator, Receipt, DollarSign, HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';

interface ReverseSalesTaxCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function ReverseSalesTaxCalculatorClient({ content, guideContent }: ReverseSalesTaxCalculatorClientProps) {
  const guideData = guideContent || {
    color: 'green',
    sections: [],
    faq: []
  };

  const contentData = content || {};

  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  
  const [totalPrice, setTotalPrice] = useState("108");
  const [taxRate, setTaxRate] = useState("8");
  
  const [results, setResults] = useState<{
    preTaxPrice: number;
    taxAmount: number;
    totalPrice: number;
  } | null>(null);

  const calculateReverseSalesTax = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    
    const total = Number.parseFloat(totalPrice);
    const rate = Number.parseFloat(taxRate);
    
    if (isNaN(total) || isNaN(rate)) return;

    // Formula: Pre-Tax Price = Total Price / (1 + Tax Rate)
    const preTax = total / (1 + rate / 100);
    // Formula: Tax Amount = Total Price - Pre-Tax Price
    const tax = total - preTax;

    setResults({
      preTaxPrice: +preTax.toFixed(2),
      taxAmount: +tax.toFixed(2),
      totalPrice: total
    });
  };

  return (
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle || "Reverse Sales Tax Calculator"}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription || "Calculate pre-tax price and exact tax amount from a tax-inclusive total price."}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Form */}
            <Card className="shadow-2xl border-0 pt-0 bg-white overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <Calculator className="w-6 h-6 text-green-600" />
                  <span>{contentData.reverse_sales_tax_calculator_0 || "Reverse Sales Tax Calculator"}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                
                {/* Input Fields */}
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label className="text-base font-semibold text-gray-900">{contentData.total_price_1 || "Total Price (Tax-Inclusive)"}</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input 
                        type="number" 
                        value={totalPrice} 
                        onChange={e => setTotalPrice(e.target.value)} 
                        className="pl-10 h-12 text-lg border-2 focus:border-green-500" 
                        placeholder="108.00" 
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-base font-semibold text-gray-900">{contentData.tax_rate_2 || "Sales Tax Rate (%)"}</Label>
                    <Input 
                      type="number" 
                      value={taxRate} 
                      onChange={e => setTaxRate(e.target.value)} 
                      className="h-12 text-lg border-2 focus:border-green-500" 
                      placeholder="8.00" 
                    />
                  </div>
                </div>

                <Button 
                  onClick={calculateReverseSalesTax} 
                  className="w-full h-14 text-lg font-semibold bg-green-600 hover:bg-green-700 transition-colors duration-300"
                >
                  {contentData.calculate_3 || "Calculate"}
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="shadow-2xl border-0 bg-white" ref={resultsRef}>
              <CardHeader className="bg-gray-50 rounded-t-lg border-b px-8 py-6">
                <CardTitle className="text-2xl text-gray-800">{contentData.results_4 || "Results"}</CardTitle>
              </CardHeader>
              <CardContent className="p-8 flex flex-col justify-center min-h-[400px]">
                {results ? (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">{contentData.your_reverse_tax_calculation_5 || "Your Reverse Tax Calculation"}</p>
                      <div className="text-5xl font-bold text-gray-900 mb-2">
                        ${results.preTaxPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <p className="text-gray-500 font-medium">{contentData.pretax_price_6 || "Pre-Tax Price"}</p>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="font-medium text-gray-700">{contentData.total_price_8 || "Total Price"}</span>
                        <span className="font-bold text-gray-900 text-xl">
                          ${results.totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <span className="font-medium text-gray-700">{contentData.sales_tax_amount_7 || "Tax Amount"}</span>
                        <span className="font-bold text-orange-600 text-xl">
                          ${results.taxAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                        <span className="font-medium text-gray-700">{contentData.pretax_price_6 || "Pre-Tax Price"}</span>
                        <span className="font-bold text-green-600 text-xl">
                          ${results.preTaxPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Receipt className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">{contentData.enter_your_information_to_reverse_calculate_sales_tax_10 || "Enter your information to reverse calculate sales tax"}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Similar Calculators */}
          <div className="mt-12">
            <SimilarCalculators calculators={[
              {
                calculatorName: "Sales Tax Calculator",
                calculatorHref: "/financial/sales-tax-calculator",
                calculatorDescription: "Calculate sales tax accurately by state or region using our Sales Tax Calculator for smarter purchase planning."
              },
              {
                calculatorName: "Income Tax Calculator",
                calculatorHref: "/financial/income-tax-calculator",
                calculatorDescription: "Calculate federal and state income taxes, deductions, and your total tax liability."
              },
              {
                calculatorName: "Estate Tax Calculator",
                calculatorHref: "/financial/estate-tax-calculator",
                calculatorDescription: "Calculate estate tax liability, exemptions, and tax planning strategies for estates."
              }
            ]} color="green" title="Related Financial Calculators" />
          </div>

          {/* Educational Content */}
          <div className="mt-12 space-y-8">
            {/* Formulas */}
            <Card className="shadow-2xl border-0 p-0 bg-white">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg border-b px-8 py-6">
                <CardTitle className="text-2xl">{contentData.formulas_11 || "Formulas"}</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                      <p>{contentData.pretax_price_formula_12 || "Pre-Tax Price = Total Price / (1 + Tax Rate as decimal)"}</p>
                      <p>{contentData.tax_amount_formula_13 || "Tax Amount = Total Price - Pre-Tax Price"}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rating and Profile Section */}
            <RatingProfileSection
              entityId="reverse-sales-tax-calculator"
              entityType="calculator"
              creatorSlug="neo-nicholas"
              initialRatingTotal={0}
              initialRatingCount={0}
            />
            
            {/* Guide */}
            <CalculatorGuide data={guideData} />
          </div>
        </div>
      </main>
    </div>
  );
}
