"use client";

import type React from "react";
import { useRef, useState } from "react";
import { Calendar, Clock, Calculator, ChevronDown, CheckCircle2, Briefcase, FileText, AlertCircle, HelpCircle, DollarSign, TrendingUp, Shield, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from "@/components/rating-profile-section";

type DurationType = "days" | "weeks" | "months";
type DayType = "calendar" | "working";

interface CalculationResult {
  noticeStartDate: string;
  noticeDuration: number;
  durationType: string;
  lastWorkingDay: string;
  totalDays: number;
  noticePay?: number;
}

const faqs = [
  {
    q: "How do I calculate my notice period?",
    a: "Identify your resignation date, check your contract for notice duration, and add the required days, weeks, or months. Use our notice period calculator for instant accuracy."
  },
  {
    q: "How is notice period calculated?",
    a: "Add the notice duration specified in your contract or statutory law to the official notice submission date."
  },
  {
    q: "Is notice period calculated in working days or calendar days?",
    a: "Most contracts use calendar days unless specified as working days. Always check your employment contract."
  },
  {
    q: "How to calculate 1 month notice period?",
    a: "Add one calendar month from the resignation date. Note: 1 month ≠ 30 days as months vary between 28–31 days."
  },
  {
    q: "What is the difference between 30 days and 1 month notice?",
    a: "30 days is a fixed duration. 1 month depends on the number of days in that specific month."
  },
  {
    q: "Can an employer reduce my notice period?",
    a: "Yes, if mutually agreed or if the contract includes early release/buyout clauses."
  },
  {
    q: "How to calculate notice period pay?",
    a: "Divide monthly salary by 30 (depending on company policy) to get daily salary, then multiply by remaining notice days."
  }
];

export default function NoticePeriodCalculatorClient() {
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const scrollToResults = () => {
    if (typeof window !== "undefined" && window.innerWidth <= 768 && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [noticeStartDate, setNoticeStartDate] = useState<string>("");
  const [noticeDuration, setNoticeDuration] = useState<string>("");
  const [durationType, setDurationType] = useState<DurationType>("days");
  const [dayType, setDayType] = useState<DayType>("calendar");
  const [monthlySalary, setMonthlySalary] = useState<string>("");
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateNotice = () => {
    if (!noticeStartDate || !noticeDuration) {
      toast.error("Please enter notice start date and duration");
      return;
    }

    const startDate = new Date(noticeStartDate);
    const duration = parseInt(noticeDuration);
    let endDate = new Date(startDate);

    if (durationType === "days") {
      if (dayType === "calendar") {
        endDate.setDate(endDate.getDate() + duration);
      } else {
        let daysAdded = 0;
        while (daysAdded < duration) {
          endDate.setDate(endDate.getDate() + 1);
          const dayOfWeek = endDate.getDay();
          if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            daysAdded++;
          }
        }
      }
    } else if (durationType === "weeks") {
      endDate.setDate(endDate.getDate() + (duration * 7));
    } else if (durationType === "months") {
      endDate.setMonth(endDate.getMonth() + duration);
    }

    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    let noticePay: number | undefined;
    if (monthlySalary) {
      const dailySalary = parseFloat(monthlySalary) / 30;
      noticePay = dailySalary * totalDays;
    }

    const calculationResult: CalculationResult = {
      noticeStartDate: startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      noticeDuration: duration,
      durationType,
      lastWorkingDay: endDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      totalDays,
      noticePay
    };

    setResult(calculationResult);
    toast.success("Notice period calculated successfully!");
    scrollToResults();
  };

  const resetCalculator = () => {
    setNoticeStartDate("");
    setNoticeDuration("");
    setDurationType("days");
    setDayType("calendar");
    setMonthlySalary("");
    setResult(null);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        <main className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-12 space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Briefcase className="w-4 h-4" />
                Employment Calculator
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">
                Notice Period Calculator
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Calculate Last Working Day – Free Online Notice Period Calculator
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              <Card className="shadow-2xl shadow-slate-200/50 pt-0 border-0 rounded-3xl overflow-hidden bg-white/80 backdrop-blur">
                <CardHeader className="bg-gradient-to-br from-blue-600 pt-4 to-purple-600 text-white pb-8">
                  <CardTitle className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <Calculator className="w-6 h-6" />
                    </div>
                    Calculate Notice Period
                  </CardTitle>
                  <CardDescription className="text-blue-50 text-base">
                    Enter your details to calculate your last working day
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 md:p-8 space-y-6">
                  <div className="space-y-3">
                    <Label className="text-slate-700 font-semibold text-base">Notice Start Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                      <Input
                        type="date"
                        value={noticeStartDate}
                        onChange={(e) => setNoticeStartDate(e.target.value)}
                        className="h-14 text-lg bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl pl-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-slate-700 font-semibold text-base">Notice Duration</Label>
                    <div className="flex gap-3">
                      <Input
                        type="number"
                        value={noticeDuration}
                        onChange={(e) => setNoticeDuration(e.target.value)}
                        className="flex-1 h-14 text-lg bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl pl-4"
                        placeholder="e.g. 30"
                      />
                      <Select value={durationType} onValueChange={(v: DurationType) => setDurationType(v)}>
                        <SelectTrigger className="w-[140px] h-14 bg-slate-50 border-slate-200 focus:ring-4 focus:ring-blue-500/10 rounded-xl font-medium text-slate-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="days">Days</SelectItem>
                          <SelectItem value="weeks">Weeks</SelectItem>
                          <SelectItem value="months">Months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-slate-700 font-semibold text-base">Day Type</Label>
                    <Select value={dayType} onValueChange={(v: DayType) => setDayType(v)}>
                      <SelectTrigger className="h-14 bg-slate-50 border-slate-200 focus:ring-4 focus:ring-blue-500/10 rounded-xl font-medium text-slate-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="calendar">Calendar Days</SelectItem>
                        <SelectItem value="working">Working Days (Mon-Fri)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-slate-700 font-semibold text-base">Monthly Salary (Optional)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                      <Input
                        type="number"
                        value={monthlySalary}
                        onChange={(e) => setMonthlySalary(e.target.value)}
                        className="h-14 text-lg bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl pl-12"
                        placeholder="e.g. 3000"
                      />
                    </div>
                    <p className="text-sm text-slate-500 pl-1">For notice period pay calculation</p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={calculateNotice}
                      className="flex-1 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40"
                    >
                      <Calculator className="w-5 h-5 mr-2" />
                      Calculate
                    </Button>
                    <Button
                      onClick={resetCalculator}
                      variant="outline"
                      className="h-14 px-6 border-2 border-slate-200 hover:border-slate-300 rounded-xl font-semibold"
                    >
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {result && (
                <div ref={resultsRef} className="space-y-6">
                  <Card className="shadow-2xl shadow-slate-200/50 border-0 rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                    <CardHeader className="pb-6">
                      <CardTitle className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                          <FileText className="w-6 h-6" />
                        </div>
                        Results
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <p className="text-blue-100 text-sm mb-2">Notice Start Date</p>
                        <p className="text-2xl font-bold">{result.noticeStartDate}</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <p className="text-blue-100 text-sm mb-2">Last Working Day</p>
                        <p className="text-2xl font-bold">{result.lastWorkingDay}</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                        <p className="text-blue-100 text-sm mb-2">Total Duration</p>
                        <p className="text-2xl font-bold">{result.totalDays} days</p>
                      </div>
                      {result.noticePay && (
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                          <p className="text-blue-100 text-sm mb-2">Estimated Notice Pay</p>
                          <p className="text-2xl font-bold">${result.noticePay.toFixed(2)}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

          <RatingProfileSection
            entityId="notice-period-calculator"
            entityType="calculator"
            creatorSlug="aiden-asher"
            initialRatingTotal={0}
            initialRatingCount={0}
          />

            <div className="mt-24 max-w-5xl mx-auto space-y-24">

              <section>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-8">Calculate Notice Period</h2>
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10">
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    To calculate notice period, start from your official resignation or termination notice date and add the number of days, weeks, or months specified in your employment contract or statutory law. Your last working day is determined by counting either calendar days or working days, depending on your company policy.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Use our Notice Period Calculator above to instantly calculate your last working day, notice duration, and notice period end date accurately.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-blue-100/50 rounded-2xl flex items-center justify-center ring-1 ring-blue-100">
                    <Briefcase className="w-7 h-7 text-blue-600" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Free Notice Period Calculator</h2>
                </div>
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10">
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    Our advanced notice period calculator helps you:
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Calculate notice period instantly",
                      "Calculate notice period in days, weeks, or months",
                      "Calculate last day of notice period",
                      "Determine notice period end date",
                      "Estimate notice period pay",
                      "Avoid calculation errors"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-lg text-slate-600 leading-relaxed mt-6">
                    Whether you are resigning, being terminated, or planning an early exit, accurate notice period calculation is essential for legal and salary compliance.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-purple-100/50 rounded-2xl flex items-center justify-center ring-1 ring-purple-100">
                    <FileText className="w-7 h-7 text-purple-600" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">What Is a Notice Period in Employment?</h2>
                </div>
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10">
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    A notice period is the legally required or contractually agreed duration between the date an employee submits resignation (or receives termination notice) and their final working day. It protects both employee rights and employer operational continuity.
                  </p>
                  <h3 className="font-bold text-slate-900 mb-4 text-xl">Notice period terms are usually defined in:</h3>
                  <ul className="grid md:grid-cols-2 gap-4 mb-6">
                    {["Employment contract", "Offer letter", "HR policy manual", "Labor law regulations", "Collective bargaining agreements"].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <h3 className="font-bold text-slate-900 mb-4 text-xl">Common durations include:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["1 week", "2 weeks", "30 days", "1 month", "2 months", "3 months", "60 days", "90 days"].map((item, i) => (
                      <div key={i} className="bg-purple-50 rounded-xl p-3 text-center font-semibold text-purple-700">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-indigo-100/50 rounded-2xl flex items-center justify-center ring-1 ring-indigo-100">
                    <Calculator className="w-7 h-7 text-indigo-600" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">How to Calculate Notice Period (Step-by-Step Guide)</h2>
                </div>
                <div className="space-y-6">
                  {[
                    {
                      step: "Step 1: Confirm the Notice Start Date",
                      content: "Your notice period usually begins on:\n• The date you formally submit your resignation in writing or\n• The date your employer acknowledges your resignation\n\nAlways confirm in writing via email or HR documentation."
                    },
                    {
                      step: "Step 2: Check Your Employment Contract",
                      content: "Look for:\n• Notice duration (e.g., 1 month, 60 days)\n• Whether it is calendar days or working days\n• Early release or buyout clauses\n• Garden leave provision"
                    },
                    {
                      step: "Step 3: Identify Calendar Days vs Working Days",
                      content: "• Calendar Days: Includes weekends and public holidays\n• Working Days: Excludes weekends and company-declared holidays\n\nMost contracts use calendar days unless stated otherwise."
                    },
                    {
                      step: "Step 4: Add Notice Duration to Start Date",
                      content: "Notice Period Formula:\nNotice End Date = Notice Start Date + Notice Duration\n\nExamples:\n• Resignation Date: 1 March | Notice Period: 1 Month | Last Working Day: 31 March or 1 April (based on policy)\n• Resignation Date: 15 January | Notice Period: 90 Days | Last Working Day: 15 April"
                    }
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 p-8">
                      <h3 className="font-bold text-slate-900 mb-4 text-xl flex items-center gap-3">
                        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg text-sm">{item.step}</span>
                      </h3>
                      <p className="text-slate-600 text-lg whitespace-pre-line">{item.content}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-emerald-100/50 rounded-2xl flex items-center justify-center ring-1 ring-emerald-100">
                    <Clock className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Calculating Notice Period for Different Durations</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "1 Month Notice Period",
                      desc: "Add one calendar month from the notice start date.\nExample: Start: 10 May | End: 10 June\nNote: 1 month ≠ 30 days – months vary between 28–31 days."
                    },
                    {
                      title: "2 Months Notice Period",
                      desc: "Add two calendar months.\nStart: 1 February | End: 1 April"
                    },
                    {
                      title: "30 Days Notice Period",
                      desc: "Add exactly 30 days, not a calendar month.\nStart: 1 May | End: 31 May"
                    },
                    {
                      title: "90 Days Notice Period",
                      desc: "Add 90 consecutive calendar days.\nCommon for senior-level, IT, and managerial contracts."
                    },
                    {
                      title: "2 Weeks Notice Period",
                      desc: "Add 14 days unless defined as working days."
                    }
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6">
                      <h3 className="font-bold text-slate-900 mb-3 text-lg">{item.title}</h3>
                      <p className="text-slate-600 whitespace-pre-line">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-amber-100/50 rounded-2xl flex items-center justify-center ring-1 ring-amber-100">
                    <DollarSign className="w-7 h-7 text-amber-600" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Notice Period Pay Calculation</h2>
                </div>
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10">
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    Sometimes employees:
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-lg">Serve full notice or</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-lg">Opt for notice period buyout</span>
                    </li>
                  </ul>
                  
                  <div className="bg-gradient-to-br from-amber-600 to-orange-600 rounded-3xl p-8 text-white shadow-2xl shadow-amber-500/30 mb-6">
                    <p className="text-amber-100 font-bold tracking-widest uppercase mb-4 text-sm">Notice Period Pay Formula</p>
                    <div className="space-y-3 font-mono text-lg">
                      <p>Daily Salary = Monthly Salary ÷ 30 (depending on company policy)</p>
                      <p>Notice Pay = Daily Salary × Remaining Notice Days</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-3 text-lg">Example:</h3>
                    <div className="space-y-2 text-slate-700">
                      <p>• Monthly Salary: $3,000</p>
                      <p>• Daily Salary: $3,000 ÷ 30 = $100</p>
                      <p>• Remaining Notice: 45 days</p>
                      <p className="font-bold text-amber-600">→ Notice Pay: $4,500</p>
                    </div>
                  </div>

                  <p className="text-slate-600 mt-6">
                    This is also known as: Notice period salary calculation, Notice period buyout calculation, Notice recovery calculation. Always verify payroll policy before calculation.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-rose-100/50 rounded-2xl flex items-center justify-center ring-1 ring-rose-100">
                    <AlertCircle className="w-7 h-7 text-rose-600" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Common Mistakes in Notice Period Calculation</h2>
                </div>
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10">
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">Avoid errors like:</p>
                  <div className="space-y-4">
                    {[
                      "Confusing 30 days with 1 month",
                      "Ignoring weekends vs working days",
                      "Not confirming resignation acceptance date",
                      "Miscalculating leap years",
                      "Forgetting public holidays",
                      "Assuming 90 days = 3 calendar months"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 bg-rose-50 rounded-xl p-4">
                        <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                        <span className="text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-lg text-slate-600 leading-relaxed mt-6">
                    Using an online notice period calculator prevents these mistakes.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-sky-100/50 rounded-2xl flex items-center justify-center ring-1 ring-sky-100">
                    <TrendingUp className="w-7 h-7 text-sky-600" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Why Accurate Notice Period Calculation Matters</h2>
                </div>
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10">
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    Incorrect calculation can cause:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "Salary deductions",
                      "Delayed final settlement",
                      "Relieving letter delays",
                      "Legal disputes",
                      "Employment record issues"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                        <span className="text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-lg text-slate-600 leading-relaxed mt-6">
                    Accurate calculation ensures smooth transition, payroll accuracy, legal compliance, and professional exit.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-violet-100/50 rounded-2xl flex items-center justify-center ring-1 ring-violet-100">
                    <Users className="w-7 h-7 text-violet-600" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Who Should Use This Notice Period Calculator?</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    "Employees planning resignation",
                    "HR managers",
                    "Employers",
                    "Payroll professionals",
                    "Recruitment consultants",
                    "Legal advisors"
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 text-center">
                      <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-6 h-6 text-violet-600" />
                      </div>
                      <p className="text-slate-700 font-semibold">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="text-lg text-slate-600 text-center mt-8">
                  Simplifies notice period calculation across industries.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-sky-100/50 rounded-2xl flex items-center justify-center ring-1 ring-sky-100">
                    <HelpCircle className="w-7 h-7 text-sky-600" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Frequently Asked Questions (FAQs)</h2>
                </div>
                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-md">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-6 text-left"
                        aria-expanded={openFaq === i}
                      >
                        <span className="font-bold text-slate-900 text-lg pr-8">{faq.q}</span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openFaq === i ? 'bg-blue-100 text-blue-600 rotate-180' : 'bg-slate-50 text-slate-400'}`}>
                          <ChevronDown className="w-5 h-5" />
                        </div>
                      </button>
                      <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                      >
                        <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-50 mt-2">
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>

            <div className="mt-12">
              <SimilarCalculators
                calculators={[
                  { id: "age-calculator" },
                  { id: "time-calculator" },
                  { id: "gpa-calculator" },
                  { id: "salary-calculator" },
                  { id: "income-tax-calculator" },
                  { id: "therapy-productivity-calculator" },
                ]}
                color="blue"
                title="Similar Calculators"
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
