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
import CalculatorGuide, { type CalculatorGuideData } from "@/components/calculator-guide";
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

interface NoticePeriodCalculatorClientProps {
  content?: any;
  guideContent?: CalculatorGuideData;
}

export default function NoticePeriodCalculatorClient({
  content,
  guideContent,
}: NoticePeriodCalculatorClientProps) {
  const guideData = guideContent || { color: "blue", sections: [], faq: [] };
  const contentData = content || {};
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const scrollToResults = () => {
    if (typeof window !== "undefined" && window.innerWidth <= 768 && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <header className="text-center mb-10">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                {contentData.pageTitle || "Notice Period Calculator"}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {contentData.pageDescriptionBefore ?? ""}
                {contentData.pageDescriptionBold ? (
                  <strong className="font-semibold text-gray-900">{contentData.pageDescriptionBold}</strong>
                ) : null}
                {contentData.pageDescriptionAfter ?? contentData.pageDescription ?? "Calculate your last working day from notice start date and contract duration."}
              </p>
            </header>

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

          <CalculatorGuide data={guideData} layout="article" />

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
