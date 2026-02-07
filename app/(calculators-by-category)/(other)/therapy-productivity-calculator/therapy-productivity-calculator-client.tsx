"use client";

import type React from "react";
import { useRef, useState } from "react";
import Image from "next/image";
import { Clock, Users, Activity, Calculator, ChevronDown, ChevronUp, CheckCircle2, Lightbulb, HelpCircle, BarChart3, Target, Heart, Share2, Download, Printer, Copy, DollarSign, Briefcase, Zap, Search, TrendingUp, AlertCircle, ThumbsUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from "@/components/rating-profile-section";

type TabType = "basic" | "clock" | "billable" | "revenue";
type TimeUnit = "hours" | "minutes";

interface BasicInputs {
  output: string;
  outputUnit: TimeUnit;
  input: string;
  inputUnit: TimeUnit;
  productivity: string;
}

interface ClockInputs {
  clockIn: string;
  clockOut: string;
  breakMinutes: string;
  patientMinutes: string;
}

interface BillableInputs {
  totalHours: string;
  totalUnit: TimeUnit;
  billableHours: string;
  billableUnit: TimeUnit;
  productivity: string;
}

interface RevenueInputs {
  totalRevenue: string;
  employeeCount: string;
  revenuePerEmployee: string;
}

export default function TherapyProductivityCalculatorClient() {
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();

  const [activeTab, setActiveTab] = useState<TabType>("basic");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Basic mode state
  const [basicInputs, setBasicInputs] = useState<BasicInputs>({
    output: "",
    outputUnit: "hours",
    input: "",
    inputUnit: "hours",
    productivity: "",
  });

  // Clock Time mode state
  const [clockInputs, setClockInputs] = useState<ClockInputs>({
    clockIn: "08:00",
    clockOut: "16:00",
    breakMinutes: "0",
    patientMinutes: "",
  });

  // Billable mode state
  const [billableInputs, setBillableInputs] = useState<BillableInputs>({
    totalHours: "",
    totalUnit: "hours",
    billableHours: "",
    billableUnit: "hours",
    productivity: "",
  });

  // Revenue mode state
  const [revenueInputs, setRevenueInputs] = useState<RevenueInputs>({
    totalRevenue: "",
    employeeCount: "",
    revenuePerEmployee: "",
  });

  const [result, setResult] = useState<string>("");

  const convertToMinutes = (value: number, unit: TimeUnit): number => {
    return unit === "hours" ? value * 60 : value;
  };

  const convertFromMinutes = (minutes: number, unit: TimeUnit): number => {
    return unit === "hours" ? minutes / 60 : minutes;
  };

  const formatMinutesToHours = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  // Basic mode calculation - any 2 values calculates the 3rd
  const calculateBasic = () => {
    const { output, outputUnit, input, inputUnit, productivity } = basicInputs;
    const filled = [output, input, productivity].filter(v => v !== "").length;

    if (filled < 2) {
      toast.error("Please enter any 2 values to calculate the missing variable");
      return;
    }

    try {
      if (output === "") {
        // Calculate output from input and productivity
        const inputMins = convertToMinutes(parseFloat(input), inputUnit);
        const prod = parseFloat(productivity);
        const outputMins = (inputMins * prod) / 100;
        const outputValue = convertFromMinutes(outputMins, outputUnit);
        setBasicInputs({ ...basicInputs, output: outputValue.toFixed(2) });
        setResult(`Output (Patient Time): ${outputValue.toFixed(2)} ${outputUnit}`);
      } else if (input === "") {
        // Calculate input from output and productivity
        const outputMins = convertToMinutes(parseFloat(output), outputUnit);
        const prod = parseFloat(productivity);
        const inputMins = (outputMins * 100) / prod;
        const inputValue = convertFromMinutes(inputMins, inputUnit);
        setBasicInputs({ ...basicInputs, input: inputValue.toFixed(2) });
        setResult(`Input (Total Time): ${inputValue.toFixed(2)} ${inputUnit}`);
      } else if (productivity === "") {
        // Calculate productivity from output and input
        const outputMins = convertToMinutes(parseFloat(output), outputUnit);
        const inputMins = convertToMinutes(parseFloat(input), inputUnit);
        const prod = (outputMins / inputMins) * 100;
        setBasicInputs({ ...basicInputs, productivity: prod.toFixed(2) });
        setResult(`Productivity: ${prod.toFixed(2)}%`);
      }
      toast.success("Calculation complete!");
    } catch (error) {
      toast.error("Invalid input values");
    }
  };

  // Clock Time mode calculation
  const calculateClock = () => {
    const { clockIn, clockOut, breakMinutes, patientMinutes } = clockInputs;

    if (!patientMinutes || patientMinutes === "") {
      toast.error("Please enter patient care time");
      return;
    }

    const [inH, inM] = clockIn.split(":").map(Number);
    const [outH, outM] = clockOut.split(":").map(Number);
    const clockInMins = inH * 60 + inM;
    const clockOutMins = outH * 60 + outM;

    if (clockOutMins <= clockInMins) {
      toast.error("Clock-out time must be after clock-in time");
      return;
    }

    const totalClockedIn = clockOutMins - clockInMins;
    const breakMins = parseFloat(breakMinutes) || 0;
    const totalWorkMins = totalClockedIn - breakMins;
    const patientMins = parseFloat(patientMinutes);

    if (totalWorkMins <= 0) {
      toast.error("Total work time must be positive");
      return;
    }

    const productivity = (patientMins / totalWorkMins) * 100;
    setResult(`Productivity: ${productivity.toFixed(2)}% | Total Work: ${formatMinutesToHours(totalWorkMins)} | Patient Time: ${formatMinutesToHours(patientMins)}`);
    toast.success("Calculation complete!");
  };

  // Billable mode calculation - any 2 values calculates the 3rd
  const calculateBillable = () => {
    const { totalHours, totalUnit, billableHours, billableUnit, productivity } = billableInputs;
    const filled = [totalHours, billableHours, productivity].filter(v => v !== "").length;

    if (filled < 2) {
      toast.error("Please enter any 2 values to calculate the missing variable");
      return;
    }

    try {
      if (totalHours === "") {
        const billableMins = convertToMinutes(parseFloat(billableHours), billableUnit);
        const prod = parseFloat(productivity);
        const totalMins = (billableMins * 100) / prod;
        const totalValue = convertFromMinutes(totalMins, totalUnit);
        setBillableInputs({ ...billableInputs, totalHours: totalValue.toFixed(2) });
        setResult(`Total Hours: ${totalValue.toFixed(2)} ${totalUnit}`);
      } else if (billableHours === "") {
        const totalMins = convertToMinutes(parseFloat(totalHours), totalUnit);
        const prod = parseFloat(productivity);
        const billableMins = (totalMins * prod) / 100;
        const billableValue = convertFromMinutes(billableMins, billableUnit);
        setBillableInputs({ ...billableInputs, billableHours: billableValue.toFixed(2) });
        setResult(`Billable Hours: ${billableValue.toFixed(2)} ${billableUnit}`);
      } else if (productivity === "") {
        const billableMins = convertToMinutes(parseFloat(billableHours), billableUnit);
        const totalMins = convertToMinutes(parseFloat(totalHours), totalUnit);
        const prod = (billableMins / totalMins) * 100;
        setBillableInputs({ ...billableInputs, productivity: prod.toFixed(2) });
        setResult(`Productivity: ${prod.toFixed(2)}%`);
      }
      toast.success("Calculation complete!");
    } catch (error) {
      toast.error("Invalid input values");
    }
  };

  // Revenue per Employee calculation - any 2 values calculates the 3rd
  const calculateRevenue = () => {
    const { totalRevenue, employeeCount, revenuePerEmployee } = revenueInputs;
    const filled = [totalRevenue, employeeCount, revenuePerEmployee].filter(v => v !== "").length;

    if (filled < 2) {
      toast.error("Please enter any 2 values to calculate the missing variable");
      return;
    }

    try {
      if (totalRevenue === "") {
        const revPerEmp = parseFloat(revenuePerEmployee);
        const empCount = parseFloat(employeeCount);
        const total = revPerEmp * empCount;
        setRevenueInputs({ ...revenueInputs, totalRevenue: total.toFixed(2) });
        setResult(`Total Revenue: $${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
      } else if (employeeCount === "") {
        const total = parseFloat(totalRevenue);
        const revPerEmp = parseFloat(revenuePerEmployee);
        const empCount = total / revPerEmp;
        setRevenueInputs({ ...revenueInputs, employeeCount: empCount.toFixed(0) });
        setResult(`Employee Count: ${Math.round(empCount)}`);
      } else if (revenuePerEmployee === "") {
        const total = parseFloat(totalRevenue);
        const empCount = parseFloat(employeeCount);
        const revPerEmp = total / empCount;
        setRevenueInputs({ ...revenueInputs, revenuePerEmployee: revPerEmp.toFixed(2) });
        setResult(`Revenue per Employee: $${revPerEmp.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
      }
      toast.success("Calculation complete!");
    } catch (error) {
      toast.error("Invalid input values");
    }
  };

  const handleCalculate = () => {
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
    switch (activeTab) {
      case "basic":
        calculateBasic();
        break;
      case "clock":
        calculateClock();
        break;
      case "billable":
        calculateBillable();
        break;
      case "revenue":
        calculateRevenue();
        break;
    }
  };

  const handleReset = () => {
    switch (activeTab) {
      case "basic":
        setBasicInputs({ output: "", outputUnit: "hours", input: "", inputUnit: "hours", productivity: "" });
        break;
      case "clock":
        setClockInputs({ clockIn: "08:00", clockOut: "16:00", breakMinutes: "0", patientMinutes: "" });
        break;
      case "billable":
        setBillableInputs({ totalHours: "", totalUnit: "hours", billableHours: "", billableUnit: "hours", productivity: "" });
        break;
      case "revenue":
        setRevenueInputs({ totalRevenue: "", employeeCount: "", revenuePerEmployee: "" });
        break;
    }
    setResult("");
    toast.info("Calculator reset");
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "Therapy Productivity Calculator",
        text: result || "Calculate therapy productivity",
        url: window.location.href,
      });
    } catch (error) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleCopy = () => {
    const text = result || "No calculation yet";
    navigator.clipboard.writeText(text);
    toast.success("Result copied to clipboard!");
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const content = `Therapy Productivity Calculator Results\n\n${result || "No calculation yet"}\n\nCalculated at: ${new Date().toLocaleString()}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "therapy-productivity-results.txt";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Results downloaded!");
  };


  const faqs = [
    { q: "What factors affect therapy productivity?", a: "Patient complexity, documentation time, no-shows, and clinic workflows." },
    { q: "How can therapists improve productivity?", a: "Better scheduling, reminder systems, delegation, and technology use." },
    { q: "Is higher productivity always better?", a: "No. Extremely high productivity may reduce care quality or cause burnout." },
    { q: "Can this calculator handle multiple therapists?", a: "Yes. Calculate individual productivity or compare team performance." },
    { q: "Does the calculator account for lunch or unpaid breaks?", a: "Yes. You can include or exclude breaks for accurate results." },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Productivity Calculator
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Calculate therapy productivity with precision using clock time, billables, or revenue per employee metrics.
              </p>
            </div>

            {/* Main Calculator Card */}
            <div className="max-w-2xl mx-auto mb-16">
              <Card className="shadow-2xl border-0 bg-white overflow-hidden rounded-3xl ring-1 ring-slate-100">
                <CardHeader className="bg-slate-50/50 pb-0 pt-6 px-6 border-b border-slate-100">
                  {/* Tab Navigation */}
                  <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabType)} className="w-full">
                    <TabsList className="w-full grid grid-cols-4 bg-slate-100/50 p-1 rounded-xl gap-1">
                      <TabsTrigger 
                        value="basic" 
                        className="rounded-lg py-2.5 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=active]:ring-1 data-[state=active]:ring-slate-200/50 text-slate-600 hover:text-slate-900"
                      >
                        Basic
                      </TabsTrigger>
                      <TabsTrigger 
                        value="clock" 
                        className="rounded-lg py-2.5 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=active]:ring-1 data-[state=active]:ring-slate-200/50 text-slate-600 hover:text-slate-900"
                      >
                        Clock Time
                      </TabsTrigger>
                      <TabsTrigger 
                        value="billable" 
                        className="rounded-lg py-2.5 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=active]:ring-1 data-[state=active]:ring-slate-200/50 text-slate-600 hover:text-slate-900"
                      >
                        Billable
                      </TabsTrigger>
                      <TabsTrigger 
                        value="revenue" 
                        className="rounded-lg py-2.5 text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm data-[state=active]:ring-1 data-[state=active]:ring-slate-200/50 text-slate-600 hover:text-slate-900"
                      >
                        Rev / Emp
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                
                <CardContent className="p-0">
                  {/* Tab Content Wrapper */}
                  <Tabs value={activeTab} className="w-full">
                    <div className="p-8 sm:p-10">
                      <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 mb-8 flex gap-3 items-start">
                        <Lightbulb className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-blue-700">
                          Enter any <strong>2 values</strong> to automatically calculate the missing variable.
                        </p>
                      </div>

                      {/* BASIC TAB */}
                      <TabsContent value="basic" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <Label className="text-slate-700 font-semibold text-base">Output (Time/Units)</Label>
                            <div className="flex gap-3">
                              <div className="relative flex-1">
                                <Input
                                  type="number"
                                  value={basicInputs.output}
                                  onChange={(e) => setBasicInputs({ ...basicInputs, output: e.target.value })}
                                  className="h-14 text-lg bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl pl-4"
                                  placeholder="e.g. 2"
                                />
                              </div>
                              <Select value={basicInputs.outputUnit} onValueChange={(v: TimeUnit) => setBasicInputs({ ...basicInputs, outputUnit: v })}>
                                <SelectTrigger className="w-[140px] h-14 bg-slate-50 border-slate-200 focus:ring-4 focus:ring-blue-500/10 rounded-xl font-medium text-slate-700">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="hours">Hours</SelectItem>
                                  <SelectItem value="minutes">Minutes</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-slate-700 font-semibold text-base">Input (Time Clocked)</Label>
                            <div className="flex gap-3">
                              <div className="relative flex-1">
                                <Input
                                  type="number"
                                  value={basicInputs.input}
                                  onChange={(e) => setBasicInputs({ ...basicInputs, input: e.target.value })}
                                  className="h-14 text-lg bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl pl-4"
                                  placeholder="e.g. 8"
                                />
                              </div>
                              <Select value={basicInputs.inputUnit} onValueChange={(v: TimeUnit) => setBasicInputs({ ...basicInputs, inputUnit: v })}>
                                <SelectTrigger className="w-[140px] h-14 bg-slate-50 border-slate-200 focus:ring-4 focus:ring-blue-500/10 rounded-xl font-medium text-slate-700">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="hours">Hours</SelectItem>
                                  <SelectItem value="minutes">Minutes</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-slate-700 font-semibold text-base">Productivity (%)</Label>
                            <div className="relative">
                              <Input
                                type="number"
                                value={basicInputs.productivity}
                                onChange={(e) => setBasicInputs({ ...basicInputs, productivity: e.target.value })}
                                className="h-14 text-lg bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl pl-4 pr-12"
                                placeholder="e.g. 75"
                              />
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <span className="text-slate-400 font-medium">%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      {/* CLOCK TIME TAB */}
                      <TabsContent value="clock" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-5">
                            <div className="space-y-3">
                              <Label className="text-slate-700 font-semibold text-base">Clock-In</Label>
                              <div className="relative">
                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                <Input
                                  type="time"
                                  value={clockInputs.clockIn}
                                  onChange={(e) => setClockInputs({ ...clockInputs, clockIn: e.target.value })}
                                  className="h-14 text-lg bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl pl-12"
                                />
                              </div>
                            </div>
                            <div className="space-y-3">
                              <Label className="text-slate-700 font-semibold text-base">Clock-Out</Label>
                              <div className="relative">
                                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                <Input
                                  type="time"
                                  value={clockInputs.clockOut}
                                  onChange={(e) => setClockInputs({ ...clockInputs, clockOut: e.target.value })}
                                  className="h-14 text-lg bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl pl-12"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-slate-700 font-semibold text-base">Break Time (minutes)</Label>
                            <Input
                              type="number"
                              value={clockInputs.breakMinutes}
                              onChange={(e) => setClockInputs({ ...clockInputs, breakMinutes: e.target.value })}
                              className="h-14 text-lg bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl pl-4"
                              placeholder="e.g. 30"
                            />
                            <p className="text-sm text-slate-500 pl-1">Unpaid time to deduct (lunch, etc.)</p>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-slate-700 font-semibold text-base">Patient Care Time (minutes)</Label>
                            <Input
                              type="number"
                              value={clockInputs.patientMinutes}
                              onChange={(e) => setClockInputs({ ...clockInputs, patientMinutes: e.target.value })}
                              className="h-14 text-lg bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl pl-4"
                              placeholder="e.g. 240"
                            />
                            <p className="text-sm text-slate-500 pl-1">Total minutes spent with patients</p>
                          </div>
                        </div>
                      </TabsContent>

                      {/* BILLABLE TAB */}
                      <TabsContent value="billable" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <Label className="text-slate-700 font-semibold text-base">Total Hours (Clock)</Label>
                            <div className="flex gap-3">
                              <Input
                                type="number"
                                value={billableInputs.totalHours}
                                onChange={(e) => setBillableInputs({ ...billableInputs, totalHours: e.target.value })}
                                className="flex-1 h-14 text-lg bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl pl-4"
                                placeholder="e.g. 8"
                              />
                              <Select value={billableInputs.totalUnit} onValueChange={(v: TimeUnit) => setBillableInputs({ ...billableInputs, totalUnit: v })}>
                                <SelectTrigger className="w-[140px] h-14 bg-slate-50 border-slate-200 focus:ring-4 focus:ring-blue-500/10 rounded-xl font-medium text-slate-700">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="hours">Hours</SelectItem>
                                  <SelectItem value="minutes">Minutes</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-slate-700 font-semibold text-base">Billable Hours</Label>
                            <div className="flex gap-3">
                              <Input
                                type="number"
                                value={billableInputs.billableHours}
                                onChange={(e) => setBillableInputs({ ...billableInputs, billableHours: e.target.value })}
                                className="flex-1 h-14 text-lg bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl pl-4"
                                placeholder="e.g. 6"
                              />
                              <Select value={billableInputs.billableUnit} onValueChange={(v: TimeUnit) => setBillableInputs({ ...billableInputs, billableUnit: v })}>
                                <SelectTrigger className="w-[140px] h-14 bg-slate-50 border-slate-200 focus:ring-4 focus:ring-blue-500/10 rounded-xl font-medium text-slate-700">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="hours">Hours</SelectItem>
                                  <SelectItem value="minutes">Minutes</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-slate-700 font-semibold text-base">Productivity (%)</Label>
                            <div className="relative">
                              <Input
                                type="number"
                                value={billableInputs.productivity}
                                onChange={(e) => setBillableInputs({ ...billableInputs, productivity: e.target.value })}
                                className="h-14 text-lg bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl pl-4 pr-12"
                                placeholder="e.g. 75"
                              />
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <span className="text-slate-400 font-medium">%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      {/* REVENUE TAB */}
                      <TabsContent value="revenue" className="mt-0 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <Label className="text-slate-700 font-semibold text-base">Total Revenue</Label>
                            <div className="relative">
                              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <DollarSign className="w-5 h-5 text-slate-400" />
                              </div>
                              <Input
                                type="number"
                                value={revenueInputs.totalRevenue}
                                onChange={(e) => setRevenueInputs({ ...revenueInputs, totalRevenue: e.target.value })}
                                className="h-14 text-lg bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl pl-12"
                                placeholder="e.g. 100000"
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-slate-700 font-semibold text-base">Employee Count</Label>
                            <div className="relative">
                              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <Users className="w-5 h-5 text-slate-400" />
                              </div>
                              <Input
                                type="number"
                                value={revenueInputs.employeeCount}
                                onChange={(e) => setRevenueInputs({ ...revenueInputs, employeeCount: e.target.value })}
                                className="h-14 text-lg bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl pl-12"
                                placeholder="e.g. 5"
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label className="text-slate-700 font-semibold text-base">Revenue per Employee</Label>
                            <div className="relative">
                              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <DollarSign className="w-5 h-5 text-slate-400" />
                              </div>
                              <Input
                                type="number"
                                value={revenueInputs.revenuePerEmployee}
                                onChange={(e) => setRevenueInputs({ ...revenueInputs, revenuePerEmployee: e.target.value })}
                                className="h-14 text-lg bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all rounded-xl pl-12"
                                placeholder="e.g. 20000"
                              />
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                        <Button
                          onClick={handleCalculate}
                          className="h-14 text-lg bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 font-bold rounded-xl transition-all active:scale-[0.98]"
                        >
                          Calculate
                        </Button>
                        <Button
                          onClick={handleReset}
                          variant="outline"
                          className="h-14 text-lg border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold rounded-xl"
                        >
                          Reset
                        </Button>
                      </div>

                      {/* Result Display */}
                      {result && (
                        <div ref={resultsRef} className="mt-8 animate-in fade-in zoom-in-95 duration-300">
                          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 shadow-xl shadow-blue-500/20 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                            <div className="relative z-10 text-center">
                              <p className="text-blue-100 font-medium mb-2 uppercase tracking-wide text-xs">Result</p>
                              <p className="text-2xl md:text-3xl font-bold leading-tight">{result}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Share Buttons */}
                      <div className="flex justify-center gap-3 mt-8">
                        <Button variant="outline" size="icon" className="h-11 w-11 rounded-full border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all" onClick={handleShare} title="Share">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-11 w-11 rounded-full border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all" onClick={handleDownload} title="Download">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-11 w-11 rounded-full border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all" onClick={handlePrint} title="Print">
                          <Printer className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-11 w-11 rounded-full border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all" onClick={handleCopy} title="Copy Result">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Rating and Profile Section */}
            <RatingProfileSection
              entityId="therapy-productivity-calculator"
              entityType="calculator"
              creatorSlug="aiden-asher"
              initialRatingTotal={0}
              initialRatingCount={0}
            />

            {/* ========== CUSTOM SEO CONTENT SECTION ========== */}
            <div className="mt-24 max-w-5xl mx-auto space-y-24">

              {/* What is Therapy Productivity? */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-blue-100/50 rounded-2xl flex items-center justify-center ring-1 ring-blue-100">
                    <BarChart3 className="w-7 h-7 text-blue-600" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">What is Therapy Productivity?</h2>
                </div>
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                  <div className="md:flex items-center">
                    <div className="md:w-1/2 p-8 md:p-10">
                      <p className="text-lg text-slate-600 leading-relaxed mb-8">
                        Therapy productivity measures the percentage of time a therapist spends in direct patient care compared to total clocked-in working time.
                      </p>
                      <h3 className="font-bold text-slate-900 mb-4 text-lg">Key Points:</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-lg">Expressed as a percentage (%)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-lg">Higher percentages mean more time spent treating patients</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                          <div className="space-y-2">
                            <span className="text-slate-700 text-lg">Ideal productivity varies by:</span>
                            <ul className="grid grid-cols-2 gap-2 pl-1">
                              {["Clinic operations", "Patient complexity", "Documentation needs", "Business goals"].map((item, i) => (
                                <li key={i} className="text-slate-500 text-base flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="md:w-1/2 relative h-[400px] md:h-full min-h-[400px] bg-slate-50">
                      <Image
                        src="/images/What-is-Therapy-Productivity.png"
                        alt="What is Therapy Productivity - visual explanation of therapy productivity metrics"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Therapy Productivity Formula */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-indigo-100/50 rounded-2xl flex items-center justify-center ring-1 ring-indigo-100">
                    <Calculator className="w-7 h-7 text-indigo-600" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Therapy Productivity Formula</h2>
                </div>
                <p className="text-xl text-slate-600 mb-8 max-w-3xl">Use this simple formula to calculate therapy productivity:</p>
                
                <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl shadow-indigo-500/30 mb-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
                  
                  <div className="relative z-10 text-center">
                    <p className="text-indigo-100 font-bold tracking-widest uppercase mb-4 text-sm">The Formula</p>
                    <p className="text-2xl md:text-4xl font-bold font-mono tracking-tight leading-relaxed">
                      Productivity (%) = <span className="inline-block bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">(MP ÷ MC)</span> × 100
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-8 text-indigo-100 text-sm md:text-base">
                      <div className="flex items-center gap-2">
                        <span className="font-bold bg-white/20 px-2 py-1 rounded text-white">MP</span>
                        <span>Minutes with Patients</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold bg-white/20 px-2 py-1 rounded text-white">MC</span>
                        <span>Minutes Clocked In</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { step: 1, text: "Record total minutes spent with patients (MP)" },
                    { step: 2, text: "Record total minutes clocked in (MC)" },
                    { step: 3, text: "Apply the formula to get productivity percentage" }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl mb-4 border border-indigo-100">
                        {item.step}
                      </div>
                      <p className="text-slate-700 font-medium">{item.text}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Example Calculations */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-purple-100/50 rounded-2xl flex items-center justify-center ring-1 ring-purple-100">
                    <Target className="w-7 h-7 text-purple-600" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Example Calculations</h2>
                </div>

                {/* Example 1 */}
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10 mb-8">
                  <h3 className="font-bold text-slate-900 mb-4 text-xl flex items-center gap-3">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm">Example 1</span>
                    Standard Workday
                  </h3>
                  <p className="text-slate-600 text-lg mb-6">
                    A therapist spends <strong className="text-slate-900">200 minutes</strong> with patients and is clocked in for <strong className="text-slate-900">480 minutes</strong> (8 hours):
                  </p>
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 font-mono text-xl text-center mb-6 text-slate-800">
                    (200 ÷ 480) × 100 = <span className="font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">41.66%</span>
                  </div>
                  <p className="text-slate-500">
                    This means 41.66% of the therapist&apos;s work time was spent in direct patient care.
                  </p>
                </div>

                {/* Additional Scenarios */}
                <h3 className="font-bold text-slate-900 mb-6 text-2xl">Additional Scenarios</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-green-100 p-8 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                          <Activity className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-slate-900 text-lg">High Productivity</h4>
                      </div>
                      <p className="font-mono text-xl mb-4 text-slate-700">350 ÷ 480 × 100 = <span className="font-bold text-green-600">72.9%</span></p>
                      <p className="text-slate-600">Indicates efficient scheduling and strong patient engagement.</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-rose-100 p-8 relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center text-rose-600">
                          <AlertCircle className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-slate-900 text-lg">Low Productivity</h4>
                      </div>
                      <p className="font-mono text-xl mb-4 text-slate-700">180 ÷ 480 × 100 = <span className="font-bold text-rose-600">37.5%</span></p>
                      <p className="text-slate-600">May indicate excessive documentation, no-shows, or scheduling gaps.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Secondary Calculator Functions Image */}
              <section>
                <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden p-4 md:p-8">
                  <div className="relative w-full aspect-[16/9] md:aspect-[21/9]">
                    <Image
                      src="/images/Secondary-calculator-functions.png"
                      alt="Secondary calculator functions - additional features of the therapy productivity calculator"
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 1024px"
                    />
                  </div>
                </div>
              </section>

              {/* Benefits */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-emerald-100/50 rounded-2xl flex items-center justify-center ring-1 ring-emerald-100">
                    <ThumbsUp className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Benefits of Using This Calculator</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { text: "Instantly calculate productivity percentage", icon: Zap },
                    { text: "Track billable vs non-billable time", icon: Clock },
                    { text: "Identify time lost to documentation or breaks", icon: Search },
                    { text: "Compare productivity across therapists", icon: Users },
                    { text: "Improve clinic workflow & patient outcomes", icon: TrendingUp },
                  ].map((benefit, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col gap-4 hover:shadow-lg hover:border-emerald-100 transition-all duration-300 group">
                      <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                        <benefit.icon className="w-5 h-5 text-emerald-600" />
                      </div>
                      <span className="text-slate-700 font-medium text-lg leading-snug">{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Tips to Improve */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-amber-100/50 rounded-2xl flex items-center justify-center ring-1 ring-amber-100">
                    <Lightbulb className="w-7 h-7 text-amber-600" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Tips to Improve Productivity</h2>
                </div>
                <div className="space-y-4">
                  {[
                    { title: "Optimize Scheduling", desc: "Reduce gaps & overbooking to maximize patient face time." },
                    { title: "Use Reminder Systems", desc: "Automate patient reminders to minimize costly no-shows." },
                    { title: "Streamline Documentation", desc: "Use templates and point-of-care documentation to save admin time." },
                    { title: "Delegate Non-Clinical Tasks", desc: "Let admin staff handle scheduling so therapists can focus on care." },
                    { title: "Balance Productivity & Care Quality", desc: "Ensure high targets don't lead to burnout or reduced care standards." },
                  ].map((tip, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-start gap-6 hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-700 font-bold text-lg shrink-0 border-4 border-white shadow-sm ring-1 ring-amber-200">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-lg mb-1">{tip.title}</h4>
                        <p className="text-slate-600">{tip.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQs */}
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-sky-100/50 rounded-2xl flex items-center justify-center ring-1 ring-sky-100">
                    <HelpCircle className="w-7 h-7 text-sky-600" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
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

              {/* Why Use Our Calculator */}
              <section>
                <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center shadow-2xl shadow-slate-900/20 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"></div>
                  <div className="relative z-10 max-w-3xl mx-auto">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                      <Heart className="w-8 h-8 text-blue-400" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why Use Our Calculator?</h2>
                    <p className="text-slate-300 text-lg mb-10">
                      Designed for speed and accuracy, helping therapists and clinic managers make data-driven decisions effortlessly.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                      {[
                        "100% Free & No Ads",
                        "No Registration Required",
                        "Works on Mobile & Desktop",
                        "Instant & Accurate Results",
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                          <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                          <span className="text-white font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

            </div>
            {/* ========== END SEO CONTENT ========== */}

            {/* Similar Calculators */}
            <div className="mt-12">
              <SimilarCalculators
                calculators={[
                  { id: "age-calculator" },
                  { id: "gpa-calculator" },
                  { id: "time-calculator" },
                  { id: "rpe-calculator" },
                  { id: "height-calculator" },
                  { id: "bmi-calculator" },
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
