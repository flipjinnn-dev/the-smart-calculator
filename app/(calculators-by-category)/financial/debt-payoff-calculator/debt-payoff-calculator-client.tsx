"use client";

import type React from "react";
import { useRef, useState } from "react";

import { Calculator, CreditCardIcon, DollarSign, TrendingDown, HelpCircle, Plus, Trash2, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';
;
interface Debt {
  id: number;
  name: string;
  balance: number;
  minPayment: number;
  apr: number;
}
interface PaymentScheduleEntry {
  month: number;
  debts: {
    id: number;
    name: string;
    beginningBalance: number;
    interestCharged: number;
    paymentMade: number;
    principalPaid: number;
    endingBalance: number;
  }[];
  totalInterest: number;
  totalPayment: number;
}

interface DebtPayoffCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function DebtPayoffCalculatorClient({ content, guideContent }: DebtPayoffCalculatorClientProps) {
  const guideData = guideContent || { color: 'green', sections: [], faq: [] };
  
  const contentData = content || {
    "pageTitle": "",
    "pageDescription": "",
    "your_debts_8": "",
    "add_debt_9": "",
    "debt_10": "",
    "debt_name_11": "",
    "current_balance_12": "",
    "minimum_payment_13": "",
    "apr_14": "",
    "calculate_strategy_15": "",
    "payoff_results_16": "",
    "enter_your_debt_information_to_see_your_payoff_str_33": ""
  };

  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [debts, setDebts] = useState<Debt[]>([
    { id: 1, name: "Credit Card 1", balance: 5000, minPayment: 100, apr: 18.99 },
    { id: 2, name: "Credit Card 2", balance: 3000, minPayment: 75, apr: 24.99 }
  ]);
  const [results, setResults] = useState<any>(null);

  const addDebt = () => {
    const newId = Math.max(...debts.map(d => d.id)) + 1;
    setDebts([...debts, { id: newId, name: `Debt ${newId}`, balance: 0, minPayment: 0, apr: 0 }]);
  };

  const removeDebt = (id: number) => {
    if (debts.length > 1) {
      setDebts(debts.filter(d => d.id !== id));
    }
  };

  const updateDebt = (id: number, field: keyof Debt, value: string | number) => {
    setDebts(debts.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  const calculateDebtPayoff = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    let workingDebts = debts.filter(debt => debt.balance > 0).map(debt => ({
      ...debt,
      currentBalance: debt.balance
    }));
    
    if (workingDebts.length === 0) return;
    
    let month = 0;
    let totalInterest = 0;
    
    while (workingDebts.some(debt => debt.currentBalance > 0.01) && month < 600) {
      month++;
      workingDebts.forEach(debt => {
        if (debt.currentBalance > 0) {
          const interest = (debt.currentBalance * debt.apr / 100) / 12;
          totalInterest += interest;
          const payment = Math.min(debt.minPayment, debt.currentBalance + interest);
          debt.currentBalance = Math.max(0, debt.currentBalance + interest - payment);
        }
      });
    }
    
    setResults({
      payoffTime: month,
      totalInterest: totalInterest,
      totalPaid: debts.reduce((sum, d) => sum + d.balance, 0) + totalInterest
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50">
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingDown className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="shadow-2xl border-0">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
                  <CardTitle className="flex items-center space-x-3">
                    <CreditCardIcon className="w-6 h-6 text-red-600" />
                    <span>{contentData.your_debts_8}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4 mb-6">
                    {debts.map((debt, index) => (
                      <Card key={debt.id} className="border-2">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold">{contentData.debt_10}{index + 1}</h4>
                            {debts.length > 1 && (
                              <Button onClick={() => removeDebt(debt.id)} variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <Input value={debt.name} onChange={e => updateDebt(debt.id, "name", e.target.value)} placeholder="Debt name" />
                            <Input type="number" value={debt.balance} onChange={e => updateDebt(debt.id, "balance", Number(e.target.value))} placeholder="Balance" />
                            <Input type="number" value={debt.minPayment} onChange={e => updateDebt(debt.id, "minPayment", Number(e.target.value))} placeholder="Min Payment" />
                            <Input type="number" value={debt.apr} onChange={e => updateDebt(debt.id, "apr", Number(e.target.value))} placeholder="APR %" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <Button onClick={addDebt} variant="outline" className="w-full mb-4">
                    <Plus className="w-4 h-4 mr-2" />{contentData.add_debt_9}
                  </Button>
                  <Button onClick={calculateDebtPayoff} className="w-full h-12 bg-gradient-to-r from-red-500 to-red-600">
                    {contentData.calculate_strategy_15}
                  </Button>
                </CardContent>
              </Card>

              <Card ref={resultsRef} className="shadow-2xl border-0">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
                  <CardTitle>{contentData.payoff_results_16}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? (
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-green-100 rounded-lg">
                        <p className="text-sm font-semibold">Payoff Time</p>
                        <p className="text-2xl font-bold">{Math.floor(results.payoffTime / 12)}y {results.payoffTime % 12}m</p>
                      </div>
                      <div className="text-center p-4 bg-blue-100 rounded-lg">
                        <p className="text-sm font-semibold">Total Interest</p>
                        <p className="text-2xl font-bold">${results.totalInterest.toFixed(2)}</p>
                      </div>
                      <div className="text-center p-4 bg-purple-100 rounded-lg">
                        <p className="text-sm font-semibold">Total Paid</p>
                        <p className="text-2xl font-bold">${results.totalPaid.toFixed(2)}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <TrendingDown className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                      <p>{contentData.enter_your_debt_information_to_see_your_payoff_str_33}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <SimilarCalculators 
              calculators={[
                {
                  calculatorName: "Interest Calculator",
                  calculatorHref: "/financial/interest-calculator",
                  calculatorDescription: "Calculate compound interest for loans and investments"
                }
              ]} 
              color="red" 
              title="Related Financial Calculators" 
            />
            <RatingProfileSection
              entityId="debt-payoff-calculator"
              entityType="calculator"
              creatorSlug="neo-nicholas"
              initialRatingTotal={0}
              initialRatingCount={0}
            />
            <CalculatorGuide data={guideData} />
          </div>
        </main>
      </div>
    </>
  );
}
