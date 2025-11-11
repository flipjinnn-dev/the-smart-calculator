"use client";

import { useCalculatorContent } from "@/hooks/useCalculatorContent";
import { usePathname } from "next/navigation";
import type React from "react";
import { useRef, useState } from "react";

import { Calculator, CreditCardIcon, DollarSign, TrendingDown, HelpCircle, Plus, Trash2, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
;
interface CreditCard {
  id: number;
  name: string;
  balance: number;
  minPayment: number;
  apr: number;
}
interface PaymentScheduleEntry {
  month: number;
  cards: {
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
export default function CreditCardPayoffCalculatorCalculator() {
  const pathname = usePathname();
  const language = pathname.split('/')[1] || 'en';
  const {
    content,
    loading,
    error: contentError
  } = useCalculatorContent('credit-card-payoff-calculator', language, "calculator-ui");
  const { content: guideContent, loading: guideLoading, error: guideError } = useCalculatorContent('credit-card-payoff-calculator', language, "calculator-guide");

  // Use content or fallback to defaults
  const contentData = content || {
    "pageTitle": "",
    "pageDescription": "",
    "form": "",
    "results": "",
    "educational": "",
    "messages": "",
    "disclaimer": "",
    "seekHelp": "",
    "errors": "",
    "tooltips": "",
    "debt_avalanche_calculator_0": "",
    "monthly_payment_budget_1": "",
    "total_monthly_budget_for_all_credit_card_payments_2": "",
    "credit_cards_3": "",
    "add_card_4": "",
    "card_5": "",
    "card_name_6": "",
    "current_balance_7": "",
    "minimum_payment_8": "",
    "apr_9": "",
    "calculate_strategy_10": "",
    "payoff_results_11": "",
    "your_debt_avalanche_strategy_12": "",
    "payoff_time_13": "",
    "y_14": "",
    "m_15": "",
    "total_interest_16": "",
    "total_amount_paid_17": "",
    "payment_schedule_18": "",
    "download_csv_19": "",
    "month_20": "",
    "card_21": "",
    "balance_22": "",
    "interest_23": "",
    "payment_24": "",
    "remaining_25": "",
    "showing_first_24_months_download_csv_for_complete__26": "",
    "enter_your_credit_card_information_to_see_your_pay_27": "",
    "formulas_behind_the_avalanche_method_28": "",
    "k_1_monthly_interest_calculation_29": "",
    "interest_balance_apr_12_30": "",
    "k_2_minimum_payment_application_31": "",
    "new_balance_balance_interest_min_payment_32": "",
    "k_3_extra_payment_allocation_33": "",
    "extra_budget_min_payments_34": "",
    "extra_payment_goes_to_the_card_with_the_highest_ap_35": "",
    "k_4_payoff_priority_36": "",
    "cards_are_prioritized_by_apr_highest_first_with_ba_37": "",
    "example_scenarios_38": "",
    "scenario_1_two_cards_39": "",
    "card_a_5000_at_1899_apr_100_minimum_40": "",
    "card_b_3000_at_2499_apr_75_minimum_41": "",
    "monthly_budget_400_42": "",
    "strategy_pay_minimums_175_put_extra_225_toward_car_43": "",
    "scenario_2_multiple_cards_44": "",
    "card_a_8000_at_1599_apr_160_minimum_45": "",
    "card_b_4000_at_2299_apr_80_minimum_46": "",
    "card_c_2000_at_1999_apr_50_minimum_47": "",
    "monthly_budget_500_48": "",
    "strategy_pay_minimums_290_put_extra_210_toward_car_49": ""
  }

  const guideData = guideContent || { color: 'green', sections: [], faq: [] };;
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [monthlyBudget, setMonthlyBudget] = useState("1000");
  const [cards, setCards] = useState<CreditCard[]>([{
    id: 1,
    name: "Card 1",
    balance: 5000,
    minPayment: 100,
    apr: 18.99
  }, {
    id: 2,
    name: "Card 2",
    balance: 3000,
    minPayment: 75,
    apr: 24.99
  }]);
  const [results, setResults] = useState<{
    payoffTime: number;
    totalInterest: number;
    totalPaid: number;
    schedule: PaymentScheduleEntry[];
  } | null>(null);
  const addCard = () => {
    const newId = Math.max(...cards.map(c => c.id)) + 1;
    setCards([...cards, {
      id: newId,
      name: `Card ${newId}`,
      balance: 0,
      minPayment: 0,
      apr: 0
    }]);
  };
  const removeCard = (id: number) => {
    if (cards.length > 1) {
      setCards(cards.filter(c => c.id !== id));
    }
  };
  const updateCard = (id: number, field: keyof CreditCard, value: string | number) => {
    setCards(cards.map(c => c.id === id ? {
      ...c,
      [field]: value
    } : c));
  };
  const calculateDebtAvalanche = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    const budget = Number.parseFloat(monthlyBudget);
    const totalMinPayments = cards.reduce((sum, card) => sum + card.minPayment, 0);

    // Validation
    if (budget < totalMinPayments) {
      alert("Budget too small to cover minimum payments");
      return;
    }

    // Initialize working balances
    let workingCards = cards.map(card => ({
      ...card,
      currentBalance: card.balance
    })).filter(card => card.balance > 0);
    const schedule: PaymentScheduleEntry[] = [];
    let month = 0;
    let totalInterestPaid = 0;
    while (workingCards.some(card => card.currentBalance > 0) && month < 600) {
      // 50 year max
      month++;
      const monthEntry: PaymentScheduleEntry = {
        month,
        cards: [],
        totalInterest: 0,
        totalPayment: 0
      };

      // Step 1: Apply interest to all cards
      workingCards.forEach(card => {
        if (card.currentBalance > 0) {
          const monthlyRate = card.apr / 100 / 12;
          const interestCharged = card.currentBalance * monthlyRate;
          card.currentBalance += interestCharged;
          totalInterestPaid += interestCharged;
          monthEntry.totalInterest += interestCharged;
        }
      });

      // Step 2: Make minimum payments
      let remainingBudget = budget;
      workingCards.forEach(card => {
        if (card.currentBalance > 0) {
          const payment = Math.min(card.minPayment, card.currentBalance);
          card.currentBalance -= payment;
          remainingBudget -= payment;
        }
      });

      // Step 3: Apply extra payment to highest APR card
      if (remainingBudget > 0) {
        // Sort by APR descending, then by balance ascending (tiebreaker)
        const sortedCards = workingCards.filter(card => card.currentBalance > 0).sort((a, b) => {
          if (b.apr !== a.apr) return b.apr - a.apr;
          return a.currentBalance - b.currentBalance;
        });
        if (sortedCards.length > 0) {
          const targetCard = sortedCards[0];
          const extraPayment = Math.min(remainingBudget, targetCard.currentBalance);
          targetCard.currentBalance -= extraPayment;
          remainingBudget -= extraPayment;
        }
      }

      // Record this month's activity
      cards.forEach(originalCard => {
        const workingCard = workingCards.find(c => c.id === originalCard.id);
        if (workingCard) {
          const beginningBalance = workingCard.currentBalance + (workingCard.currentBalance > 0 ? Math.min(workingCard.minPayment, workingCard.currentBalance) : 0) + (remainingBudget > 0 && workingCards.filter(c => c.currentBalance > 0).sort((a, b) => {
            if (b.apr !== a.apr) return b.apr - a.apr;
            return a.currentBalance - b.currentBalance;
          })[0]?.id === workingCard.id ? Math.min(budget - cards.reduce((sum, c) => sum + c.minPayment, 0), workingCard.currentBalance) : 0) - (originalCard.balance > 0 ? originalCard.balance * (originalCard.apr / 100 / 12) : 0);
          const interestCharged = originalCard.balance > 0 ? originalCard.balance * (originalCard.apr / 100 / 12) : 0;
          const totalPayment = Math.min(workingCard.minPayment, originalCard.balance) + (remainingBudget > 0 && workingCards.filter(c => c.currentBalance > 0).sort((a, b) => {
            if (b.apr !== a.apr) return b.apr - a.apr;
            return a.currentBalance - b.currentBalance;
          })[0]?.id === workingCard.id ? Math.min(budget - cards.reduce((sum, c) => sum + c.minPayment, 0), workingCard.currentBalance) : 0);
          monthEntry.cards.push({
            id: workingCard.id,
            name: workingCard.name,
            beginningBalance: originalCard.balance,
            interestCharged,
            paymentMade: totalPayment,
            principalPaid: totalPayment - interestCharged,
            endingBalance: Math.max(0, workingCard.currentBalance)
          });
          monthEntry.totalPayment += totalPayment;
        }
      });
      schedule.push(monthEntry);

      // Update original balances for next iteration
      workingCards.forEach(workingCard => {
        const originalCard = cards.find(c => c.id === workingCard.id);
        if (originalCard) {
          originalCard.balance = Math.max(0, workingCard.currentBalance);
        }
      });

      // Remove paid off cards
      workingCards = workingCards.filter(card => card.currentBalance > 0.01);
    }
    const totalPrincipal = cards.reduce((sum, card) => sum + card.balance, 0);
    const totalPaid = totalPrincipal + totalInterestPaid;
    setResults({
      payoffTime: month,
      totalInterest: totalInterestPaid,
      totalPaid,
      schedule
    });
  };
  const downloadCSV = () => {
    if (!results) return;
    const headers = ["Month", "Card Name", "Beginning Balance", "Interest Charged", "Payment Made", "Principal Paid", "Ending Balance"];
    const csvContent = [headers.join(","), ...results.schedule.flatMap(entry => entry.cards.map(card => [entry.month, `"${card.name}"`, card.beginningBalance.toFixed(2), card.interestCharged.toFixed(2), card.paymentMade.toFixed(2), card.principalPaid.toFixed(2), card.endingBalance.toFixed(2)].join(",")))].join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv"
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "debt-avalanche-schedule.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };
  return <>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50">

        {/* Main Content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <CreditCardIcon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calculator Form */}
              <Card className="shadow-2xl border-0 pt-0 bg-white overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="flex items-center space-x-3 text-2xl">
                    <Calculator className="w-6 h-6 text-red-600" />
                    <span>{contentData.debt_avalanche_calculator_0}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  {/* Monthly Budget */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <DollarSign className="w-5 h-5 text-red-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{contentData.monthly_payment_budget_1}</h3>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-gray-900">{contentData.total_monthly_budget_for_all_credit_card_payments_2}</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input type="number" value={monthlyBudget} onChange={e => setMonthlyBudget(e.target.value)} className="pl-10 h-12 text-lg border-2 focus:border-red-500" placeholder="1000" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Credit Cards */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <CreditCardIcon className="w-5 h-5 text-red-600" />
                        <h3 className="text-lg font-semibold text-gray-900">{contentData.credit_cards_3}</h3>
                      </div>
                      <Button onClick={addCard} variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent">
                        <Plus className="w-4 h-4 mr-2" />{contentData.add_card_4}</Button>
                    </div>

                    <div className="space-y-4">
                      {cards.map((card, index) => <Card key={card.id} className="border-2 border-gray-200">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-semibold text-gray-900">{contentData.card_5}{index + 1}</h4>
                              {cards.length > 1 && <Button onClick={() => removeCard(card.id)} variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                  <Trash2 className="w-4 h-4" />
                                </Button>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">{contentData.card_name_6}</Label>
                                <Input value={card.name} onChange={e => updateCard(card.id, "name", e.target.value)} className="h-10 border-2 focus:border-red-500" placeholder="Card Name" />
                              </div>

                              <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">{contentData.current_balance_7}</Label>
                                <div className="relative">
                                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                  <Input type="number" value={card.balance} onChange={e => updateCard(card.id, "balance", Number.parseFloat(e.target.value) || 0)} className="pl-9 h-10 border-2 focus:border-red-500" placeholder="5000" />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">{contentData.minimum_payment_8}</Label>
                                <div className="relative">
                                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                  <Input type="number" value={card.minPayment} onChange={e => updateCard(card.id, "minPayment", Number.parseFloat(e.target.value) || 0)} className="pl-9 h-10 border-2 focus:border-red-500" placeholder="100" />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">{contentData.apr_9}</Label>
                                <Input type="number" step="0.01" value={card.apr} onChange={e => updateCard(card.id, "apr", Number.parseFloat(e.target.value) || 0)} className="h-10 border-2 focus:border-red-500" placeholder="18.99" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>)}
                    </div>
                  </div>

                  <Button onClick={calculateDebtAvalanche} className="w-full h-14 text-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-xl font-bold mt-12">{contentData.calculate_strategy_10}</Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card ref={resultsRef} className="shadow-2xl border-0 pt-0 bg-white sticky top-24">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.payoff_results_11}</CardTitle>
                  <CardDescription className="text-base">{contentData.your_debt_avalanche_strategy_12}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {results ? <div className="space-y-6">
                      {/* Key Metrics */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="text-center p-4 rounded-2xl border-2 bg-gradient-to-r from-green-100 to-green-200 border-green-300">
                          <p className="text-sm mb-1 font-semibold text-green-800">{contentData.payoff_time_13}</p>
                          <p className="text-2xl font-bold text-green-700">
                            {Math.floor(results.payoffTime / 12)}{contentData.y_14}{results.payoffTime % 12}{contentData.m_15}</p>
                        </div>

                        <div className="text-center p-4 rounded-2xl border-2 bg-gradient-to-r from-blue-100 to-blue-200 border-blue-300">
                          <p className="text-sm mb-1 font-semibold text-blue-800">{contentData.total_interest_16}</p>
                          <p className="text-2xl font-bold text-blue-700">
                            $
                            {results.totalInterest.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                          </p>
                        </div>
                      </div>

                      <div className="text-center p-4 rounded-2xl border-2 bg-gradient-to-r from-purple-100 to-purple-200 border-purple-300">
                        <p className="text-sm mb-1 font-semibold text-purple-800">{contentData.total_amount_paid_17}</p>
                        <p className="text-3xl font-bold text-purple-700">
                          $
                          {results.totalPaid.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                        </p>
                      </div>

                      {/* Payment Schedule */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-lg text-gray-900">{contentData.payment_schedule_18}</h3>
                          <Button onClick={downloadCSV} variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent">
                            <Download className="w-4 h-4 mr-2" />{contentData.download_csv_19}</Button>
                        </div>

                        <div className="max-h-96 overflow-y-auto border rounded-lg">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>{contentData.month_20}</TableHead>
                                <TableHead>{contentData.card_21}</TableHead>
                                <TableHead>{contentData.balance_22}</TableHead>
                                <TableHead>{contentData.interest_23}</TableHead>
                                <TableHead>{contentData.payment_24}</TableHead>
                                <TableHead>{contentData.remaining_25}</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {results.schedule.slice(0, 24).flatMap(entry => entry.cards.map((card, cardIndex) => <TableRow key={`${entry.month}-${card.id}`}>
                                    {cardIndex === 0 && <TableCell rowSpan={entry.cards.length} className="font-medium">
                                        {entry.month}
                                      </TableCell>}
                                    <TableCell className="font-medium">{card.name}</TableCell>
                                    <TableCell>${card.beginningBalance.toFixed(0)}</TableCell>
                                    <TableCell>${card.interestCharged.toFixed(2)}</TableCell>
                                    <TableCell>${card.paymentMade.toFixed(2)}</TableCell>
                                    <TableCell>${card.endingBalance.toFixed(0)}</TableCell>
                                  </TableRow>))}
                            </TableBody>
                          </Table>
                        </div>
                        {results.schedule.length > 24 && <p className="text-sm text-gray-500 text-center">{contentData.showing_first_24_months_download_csv_for_complete__26}</p>}
                      </div>
                    </div> : <div className="text-center py-12 text-gray-500">
                      <TrendingDown className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">{contentData.enter_your_credit_card_information_to_see_your_pay_27}</p>
                    </div>}
                </CardContent>
              </Card>
            </div>

            {/* Similar Calculators Section */}
            <SimilarCalculators calculators={[{
            calculatorName: "Credit Card Calculator",
            calculatorHref: "/financial/credit-card-calculator",
            calculatorDescription: "Calculate payments and payoff time for credit card balances"
          }, {
            calculatorName: "Interest Calculator",
            calculatorHref: "/financial/interest-calculator",
            calculatorDescription: "Calculate and compound interest for loans and investments"
          }, {
            calculatorName: "Payment Calculator",
            calculatorHref: "/financial/payment-calculator",
            calculatorDescription: "Calculate payments for various types of financing scenarios"
          }]} color="red" title="Related Financial Calculators" />

            {/* Educational Content */}
            <div className="mt-12 space-y-8 p-0">
              {/* Formulas */}
              <Card className="shadow-2xl border-0 bg-white p-0">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.formulas_behind_the_avalanche_method_28}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_1_monthly_interest_calculation_29}</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">{contentData.interest_balance_apr_12_30}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_2_minimum_payment_application_31}</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">{contentData.new_balance_balance_interest_min_payment_32}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_3_extra_payment_allocation_33}</h3>
                      <p className="text-gray-700 font-mono bg-gray-100 p-2 rounded">{contentData.extra_budget_min_payments_34}</p>
                      <p className="text-gray-700 mt-2">{contentData.extra_payment_goes_to_the_card_with_the_highest_ap_35}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{contentData.k_4_payoff_priority_36}</h3>
                      <p className="text-gray-700">{contentData.cards_are_prioritized_by_apr_highest_first_with_ba_37}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Example Scenarios */}
              <Card className="shadow-2xl border-0 bg-white p-0">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 rounded-t-lg border-b px-8 py-6">
                  <CardTitle className="text-2xl">{contentData.example_scenarios_38}</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h3 className="text-lg font-semibold mb-2 text-blue-800">{contentData.scenario_1_two_cards_39}</h3>
                      <ul className="text-blue-700 space-y-1">
                        <li>{contentData.card_a_5000_at_1899_apr_100_minimum_40}</li>
                        <li>{contentData.card_b_3000_at_2499_apr_75_minimum_41}</li>
                        <li>{contentData.monthly_budget_400_42}</li>
                        <li>{contentData.strategy_pay_minimums_175_put_extra_225_toward_car_43}</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h3 className="text-lg font-semibold mb-2 text-green-800">{contentData.scenario_2_multiple_cards_44}</h3>
                      <ul className="text-green-700 space-y-1">
                        <li>{contentData.card_a_8000_at_1599_apr_160_minimum_45}</li>
                        <li>{contentData.card_b_4000_at_2299_apr_80_minimum_46}</li>
                        <li>{contentData.card_c_2000_at_1999_apr_50_minimum_47}</li>
                        <li>{contentData.monthly_budget_500_48}</li>
                        <li>{contentData.strategy_pay_minimums_290_put_extra_210_toward_car_49}</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Guide */}
              <CalculatorGuide data={guideData} />
            </div>
          </div>
        </main>
      </div>
    </>;
}