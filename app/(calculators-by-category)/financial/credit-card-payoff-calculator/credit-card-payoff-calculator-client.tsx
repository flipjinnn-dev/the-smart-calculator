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
import { useMobileScroll } from "@/hooks/useMobileScroll";
import CalculatorGuide from "@/components/calculator-guide";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from '@/components/rating-profile-section';
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

interface CreditCardPayoffCalculatorClientProps {
  content: any;
  guideContent: any;
}

export default function CreditCardPayoffCalculatorClient({ content, guideContent }: CreditCardPayoffCalculatorClientProps) {
  const guideData = guideContent || { color: 'blue', sections: [], faq: [] };
  
  const contentData = content || {
    "pageTitle": "",
    "pageDescription": "",
    "your_credit_cards": "Your Credit Cards",
    "add_card": "Add Card",
    "card_name": "Card Name",
    "current_balance": "Current Balance",
    "minimum_payment": "Minimum Payment",
    "apr": "APR",
    "calculate": "Calculate Strategy",
    "results": "Results",
    "enter_info": "Enter your credit card information"
  };

  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();
  const [cards, setCards] = useState<CreditCard[]>([
    { id: 1, name: "Credit Card 1", balance: 5000, minPayment: 100, apr: 18.99 },
    { id: 2, name: "Credit Card 2", balance: 3000, minPayment: 75, apr: 24.99 }
  ]);
  const [results, setResults] = useState<any>(null);

  const addCard = () => {
    const newId = Math.max(...cards.map(c => c.id)) + 1;
    setCards([...cards, { id: newId, name: `Card ${newId}`, balance: 0, minPayment: 0, apr: 0 }]);
  };

  const removeCard = (id: number) => {
    if (cards.length > 1) {
      setCards(cards.filter(c => c.id !== id));
    }
  };

  const updateCard = (id: number, field: keyof CreditCard, value: string | number) => {
    setCards(cards.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const calculatePayoff = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    let workingCards = cards.filter(card => card.balance > 0).map(card => ({
      ...card,
      currentBalance: card.balance
    }));
    
    if (workingCards.length === 0) return;
    
    let month = 0;
    let totalInterest = 0;
    
    while (workingCards.some(card => card.currentBalance > 0.01) && month < 600) {
      month++;
      workingCards.forEach(card => {
        if (card.currentBalance > 0) {
          const interest = (card.currentBalance * card.apr / 100) / 12;
          totalInterest += interest;
          const payment = Math.min(card.minPayment, card.currentBalance + interest);
          card.currentBalance = Math.max(0, card.currentBalance + interest - payment);
        }
      });
    }
    
    setResults({
      payoffTime: month,
      totalInterest: totalInterest,
      totalPaid: cards.reduce((sum, c) => sum + c.balance, 0) + totalInterest
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <CreditCardIcon className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{contentData.pageTitle}</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{contentData.pageDescription}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="shadow-2xl border-0">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center space-x-3">
                    <CreditCardIcon className="w-6 h-6 text-blue-600" />
                    <span>{contentData.your_credit_cards}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4 mb-6">
                    {cards.map((card, index) => (
                      <Card key={card.id} className="border-2">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold">Card {index + 1}</h4>
                            {cards.length > 1 && (
                              <Button onClick={() => removeCard(card.id)} variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <Input value={card.name} onChange={e => updateCard(card.id, "name", e.target.value)} placeholder="Card name" />
                            <Input type="number" value={card.balance} onChange={e => updateCard(card.id, "balance", Number(e.target.value))} placeholder="Balance" />
                            <Input type="number" value={card.minPayment} onChange={e => updateCard(card.id, "minPayment", Number(e.target.value))} placeholder="Min Payment" />
                            <Input type="number" value={card.apr} onChange={e => updateCard(card.id, "apr", Number(e.target.value))} placeholder="APR %" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <Button onClick={addCard} variant="outline" className="w-full mb-4">
                    <Plus className="w-4 h-4 mr-2" />{contentData.add_card}
                  </Button>
                  <Button onClick={calculatePayoff} className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-600">
                    {contentData.calculate}
                  </Button>
                </CardContent>
              </Card>

              <Card ref={resultsRef} className="shadow-2xl border-0">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle>{contentData.results}</CardTitle>
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
                      <CreditCardIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                      <p>{contentData.enter_info}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <SimilarCalculators 
              calculators={[
                {
                  calculatorName: "Debt Payoff Calculator",
                  calculatorHref: "/financial/debt-payoff-calculator",
                  calculatorDescription: "Create a debt payoff plan and strategy"
                }
              ]} 
              color="blue" 
              title="Related Financial Calculators" 
            />
            <RatingProfileSection
              entityId="credit-card-payoff-calculator"
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
