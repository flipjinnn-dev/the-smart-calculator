"use client";



import { useState } from "react";
import Logo from "@/components/logo";
import SearchBar from "@/components/search-bar";
import Link from "next/link";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { ChartContainer } from "@/components/ui/chart";
import { PieChart, Pie, Tooltip as RechartsTooltip } from 'recharts';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Button } from "@/components/ui/button";

const COMPOUND_OPTIONS = [
  { label: "Annually", value: 1 },
  { label: "Monthly", value: 12 },
];

const CONTRIBUTION_TIMING = [
  { label: "End of each period", value: "end" },
  { label: "Beginning of each period", value: "beginning" },
];



export default function InvestmentCalculator() {
  // Notation: PV = initial, PMT = contribution, r = rate (decimal), m = compound, i = r/m, t = years, n = m*t, FV = target
  const [tab, setTab] = useState("years");
  const [FV, setFV] = useState(1000000); // End Amount
  const [PV, setPV] = useState(20000); // Starting Amount
  const [r, setR] = useState(6); // Annual rate (%)
  const [m, setM] = useState(1); // Compounding per year
  const [PMT, setPMT] = useState(1000); // Contribution
  const [timing, setTiming] = useState("end"); // Contribution timing
  const [t, setT] = useState(10); // Years (for tabs that need it)
  const [result, setResult] = useState<any>(null);

  // Helper
  const i = r / 100 / m;
  const n = m * t;
  const timingFactor = timing === "beginning" ? (1 + i) : 1;

  // 1. End Amount (FV)
  function calcFV() {
    let fv = 0;
    if (i === 0) {
      fv = PV + PMT * n;
    } else {
      fv = PV * Math.pow(1 + i, n) + PMT * ((Math.pow(1 + i, n) - 1) / i) * timingFactor;
    }
    setResult({
      FV: fv,
      totalContrib: PV + PMT * n,
      totalInterest: fv - (PV + PMT * n),
    });
  }

  // 2. Contribution Amount (PMT)
  function calcPMT() {
    let pmt = 0;
    if (i === 0) {
      pmt = (FV - PV) / n;
    } else {
      pmt = (FV - PV * Math.pow(1 + i, n)) * i / ((Math.pow(1 + i, n) - 1) * timingFactor);
    }
    setResult({
      PMT: pmt,
      totalContrib: PV + pmt * n,
      totalInterest: FV - (PV + pmt * n),
    });
  }

  // 3. Starting Amount (PV)
  function calcPV() {
    let pv = 0;
    if (i === 0) {
      pv = FV - PMT * n;
    } else {
      pv = (FV - PMT * ((Math.pow(1 + i, n) - 1) / i) * timingFactor) / Math.pow(1 + i, n);
    }
    setResult({
      PV: pv,
      totalContrib: pv + PMT * n,
      totalInterest: FV - (pv + PMT * n),
    });
  }

  // 4. Investment Length (t)
  function calcYears() {
    // If PMT = 0, closed form
    let nPeriods = 0;
    if (PMT === 0) {
      nPeriods = Math.log(FV / PV) / Math.log(1 + i);
    } else {
      // Numerical solve for n: f(n) = PV*(1+i)^n + PMT*[ ((1+i)^n - 1) / i ]*timingFactor - FV = 0
      // Use bisection method
      let low = 0, high = 1000, tol = 1e-8, maxIter = 100;
      let iter = 0;
      function f(n: number) {
        return PV * Math.pow(1 + i, n) + PMT * ((Math.pow(1 + i, n) - 1) / i) * timingFactor - FV;
      }
      while (high - low > tol && iter < maxIter) {
        let mid = (low + high) / 2;
        if (f(mid) * f(low) < 0) {
          high = mid;
        } else {
          low = mid;
        }
        iter++;
      }
      nPeriods = (low + high) / 2;
    }
    const yearsNeeded = nPeriods / m;
    setResult({
      years: yearsNeeded,
      periods: nPeriods,
    });
  }

  // 5. Return Rate (r)
  function calcRate() {
    // Numerical solve for r: g(r) = PV*(1 + r/m)^(m*t) + PMT * [ ((1 + r/m)^(m*t) - 1) / (r/m) ] * timingFactor - FV = 0
    let low = 0.00001, high = 5, tol = 1e-8, maxIter = 100;
    let iter = 0;
    function g(rate: number) {
      const i_ = rate / m;
      return PV * Math.pow(1 + i_, n) + PMT * ((Math.pow(1 + i_, n) - 1) / i_) * timingFactor - FV;
    }
    while (high - low > tol && iter < maxIter) {
      let mid = (low + high) / 2;
      if (g(mid) * g(low) < 0) {
        high = mid;
      } else {
        low = mid;
      }
      iter++;
    }
    const rateFound = ((low + high) / 2) * 100;
    setResult({
      rate: rateFound,
    });
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <Logo />
              <div>
                <Link
                  href="/"
                  className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  Smart Calculator
                </Link>
                <p className="text-sm text-gray-500">Investment Calculator</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-muted py-2 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/financial">Financial</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Investment Calculator</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Calculator Card */}
          <div className="col-span-1">
            <Card className="bg-white/90 border-blue-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-700">Investment Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={tab} onValueChange={setTab} className="w-full">
                  <TabsList className="bg-blue-100 flex flex-col gap-2 mb-4 w-full h-fit py-2 p-0">
                    <div className="flex w-full gap-2">
                      <TabsTrigger value="years" className="flex-1 min-w-0 data-[state=active]:bg-blue-400 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-b-4 data-[state=active]:border-blue-500">Investment Length</TabsTrigger>
                      <TabsTrigger value="rate" className="flex-1 min-w-0 data-[state=active]:bg-blue-400 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-b-4 data-[state=active]:border-blue-500">Return Rate</TabsTrigger>
                      <TabsTrigger value="end" className="flex-1 min-w-0 data-[state=active]:bg-blue-400 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-b-4 data-[state=active]:border-blue-500">End Amount</TabsTrigger>
                    </div>
                    <div className="flex w-full gap-2 border-t border-blue-200 pt-2 bg-blue-50 rounded-b-md shadow-sm">
                      <TabsTrigger value="pmt" className="flex-1 min-w-0 data-[state=active]:bg-blue-400 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-b-4 data-[state=active]:border-blue-500">Contribution Amount</TabsTrigger>
                      <TabsTrigger value="pv" className="flex-1 min-w-0 data-[state=active]:bg-blue-400 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-b-4 data-[state=active]:border-blue-500">Starting Amount</TabsTrigger>
                    </div>
                  </TabsList>
                  {/* Investment Length (t) */}
                  <TabsContent value="years">
                    <div className="grid gap-4 mb-4">
                      <label className="font-medium text-blue-900">End Amount (FV)
                        <Input type="number" value={FV} min={0} onChange={e => setFV(Number(e.target.value))} className="mt-1" />
                      </label>
                      <label className="font-medium text-blue-900">Starting Amount (PV)
                        <Input type="number" value={PV} min={0} onChange={e => setPV(Number(e.target.value))} className="mt-1" />
                      </label>
                      <label className="font-medium text-blue-900">Return Rate (%) (r)
                        <Input type="number" value={r} min={0} step={0.01} onChange={e => setR(Number(e.target.value))} className="mt-1" />
                      </label>
                      <label className="font-medium text-blue-900">Compounding (m)
                        <Select value={String(m)} onValueChange={val => setM(Number(val))}>
                          <SelectTrigger className="input mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {COMPOUND_OPTIONS.map(opt => (
                              <SelectItem key={opt.value} value={String(opt.value)}>{opt.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </label>
                      <label className="font-medium text-blue-900">Contribution (PMT)
                        <Input type="number" value={PMT} min={0} onChange={e => setPMT(Number(e.target.value))} className="mt-1" />
                      </label>
                      <label className="font-medium text-blue-900">Contribution timing
                        <Select value={timing} onValueChange={val => setTiming(val)}>
                          <SelectTrigger className="input mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {CONTRIBUTION_TIMING.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </label>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow" onClick={calcYears}>Calculate</Button>
                  </TabsContent>
                  <TabsContent value="rate">
                    <div className="grid gap-4 mb-4">
                      <label className="font-medium text-blue-900">End Amount (FV)
                        <Input type="number" value={FV} min={0} onChange={e => setFV(Number(e.target.value))} className="mt-1" />
                      </label>
                      <label className="font-medium text-blue-900">Starting Amount (PV)
                        <Input type="number" value={PV} min={0} onChange={e => setPV(Number(e.target.value))} className="mt-1" />
                      </label>
                      <label className="font-medium text-blue-900">Contribution (PMT)
                        <Input type="number" value={PMT} min={0} onChange={e => setPMT(Number(e.target.value))} className="mt-1" />
                      </label>
                      <label className="font-medium text-blue-900">Years (t)
                        <Input type="number" value={t} min={0} step={0.01} onChange={e => setT(Number(e.target.value))} className="mt-1" />
                      </label>
                      <label className="font-medium text-blue-900">Compounding (m)
                        <Select value={String(m)} onValueChange={val => setM(Number(val))}>
                          <SelectTrigger className="input mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {COMPOUND_OPTIONS.map(opt => (
                              <SelectItem key={opt.value} value={String(opt.value)}>{opt.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </label>
                      <label className="font-medium text-blue-900">Contribution timing
                        <Select value={timing} onValueChange={val => setTiming(val)}>
                          <SelectTrigger className="input mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {CONTRIBUTION_TIMING.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </label>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow" onClick={calcRate}>Calculate</Button>
                  </TabsContent>
                  <TabsContent value="end">
                    <div className="grid gap-4 mb-4">
                      <label className="font-medium text-blue-900">Starting Amount (PV)
                        <Input type="number" value={PV} min={0} onChange={e => setPV(Number(e.target.value))} className="mt-1" />
                      </label>
                      <label className="font-medium text-blue-900">Contribution (PMT)
                        <Input type="number" value={PMT} min={0} onChange={e => setPMT(Number(e.target.value))} className="mt-1" />
                      </label>
                      <label className="font-medium text-blue-900">Years (t)
                        <Input type="number" value={t} min={0} step={0.01} onChange={e => setT(Number(e.target.value))} className="mt-1" />
                      </label>
                      <label className="font-medium text-blue-900">Return Rate (%) (r)
                        <Input type="number" value={r} min={0} step={0.01} onChange={e => setR(Number(e.target.value))} className="mt-1" />
                      </label>
                      <label className="font-medium text-blue-900">Compounding (m)
                        <Select value={String(m)} onValueChange={val => setM(Number(val))}>
                          <SelectTrigger className="input mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {COMPOUND_OPTIONS.map(opt => (
                              <SelectItem key={opt.value} value={String(opt.value)}>{opt.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </label>
                      <label className="font-medium text-blue-900">Contribution timing
                        <Select value={timing} onValueChange={val => setTiming(val)}>
                          <SelectTrigger className="input mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {CONTRIBUTION_TIMING.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </label>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow" onClick={calcFV}>Calculate</Button>
                  </TabsContent>
                  <TabsContent value="pmt">
                    <div className="grid gap-4 mb-4">
                      <label className="font-medium text-blue-900">End Amount (FV)
                        <Input type="number" value={FV} min={0} onChange={e => setFV(Number(e.target.value))} className="mt-1" />
                      </label>
                      <label className="font-medium text-blue-900">Starting Amount (PV)
                        <Input type="number" value={PV} min={0} onChange={e => setPV(Number(e.target.value))} className="mt-1" />
                      </label>
                      <label className="font-medium text-blue-900">Years (t)
                        <Input type="number" value={t} min={0} step={0.01} onChange={e => setT(Number(e.target.value))} className="mt-1" />
                      </label>
                      <label className="font-medium text-blue-900">Return Rate (%) (r)
                        <Input type="number" value={r} min={0} step={0.01} onChange={e => setR(Number(e.target.value))} className="mt-1" />
                      </label>
                      <label className="font-medium text-blue-900">Compounding (m)
                        <Select value={String(m)} onValueChange={val => setM(Number(val))}>
                          <SelectTrigger className="input mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {COMPOUND_OPTIONS.map(opt => (
                              <SelectItem key={opt.value} value={String(opt.value)}>{opt.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </label>
                      <label className="font-medium text-blue-900">Contribution timing
                        <Select value={timing} onValueChange={val => setTiming(val)}>
                          <SelectTrigger className="input mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {CONTRIBUTION_TIMING.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </label>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow" onClick={calcPMT}>Calculate</Button>
                  </TabsContent>
                  <TabsContent value="pv">
                    <div className="grid gap-4 mb-4">
                      <label className="font-medium text-blue-900">End Amount (FV)
                        <Input type="number" value={FV} min={0} onChange={e => setFV(Number(e.target.value))} className="mt-1" />
                      </label>
                      <label className="font-medium text-blue-900">Contribution (PMT)
                        <Input type="number" value={PMT} min={0} onChange={e => setPMT(Number(e.target.value))} className="mt-1" />
                      </label>
                      <label className="font-medium text-blue-900">Years (t)
                        <Input type="number" value={t} min={0} step={0.01} onChange={e => setT(Number(e.target.value))} className="mt-1" />
                      </label>
                      <label className="font-medium text-blue-900">Return Rate (%) (r)
                        <Input type="number" value={r} min={0} step={0.01} onChange={e => setR(Number(e.target.value))} className="mt-1" />
                      </label>
                      <label className="font-medium text-blue-900">Compounding (m)
                        <Select value={String(m)} onValueChange={val => setM(Number(val))}>
                          <SelectTrigger className="input mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {COMPOUND_OPTIONS.map(opt => (
                              <SelectItem key={opt.value} value={String(opt.value)}>{opt.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </label>
                      <label className="font-medium text-blue-900">Contribution timing
                        <Select value={timing} onValueChange={val => setTiming(val)}>
                          <SelectTrigger className="input mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {CONTRIBUTION_TIMING.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </label>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow" onClick={calcPV}>Calculate</Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right: Results Card */}
          <div className="col-span-1">
            <Card className="bg-white/90 border-green-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-green-700">Results</CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  <div className="mt-2 p-4 bg-green-100/80 rounded border border-green-200">
                    {/* Main summary */}
                    {tab === "years" && result.years !== undefined && (
                      <h2 className="text-lg font-semibold text-green-900 mb-2">
                        You will need to invest <span className="text-blue-700 font-bold">{result.years.toLocaleString(undefined, { maximumFractionDigits: 2 })} years</span> to reach the target of <span className="font-bold">${FV.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>.
                      </h2>
                    )}
                    {tab === "end" && result.FV !== undefined && (
                      <h2 className="text-lg font-semibold text-green-900 mb-2">
                        Your investment will grow to <span className="font-bold">${result.FV.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span> in <span className="font-bold">{t} years</span>.
                      </h2>
                    )}
                    {tab === "pmt" && result.PMT !== undefined && (
                      <h2 className="text-lg font-semibold text-green-900 mb-2">
                        You need to contribute <span className="text-blue-700 font-bold">${result.PMT.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span> per period to reach your target of <span className="font-bold">${FV.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>.
                      </h2>
                    )}
                    {tab === "pv" && result.PV !== undefined && (
                      <h2 className="text-lg font-semibold text-green-900 mb-2">
                        You need to start with <span className="text-blue-700 font-bold">${result.PV.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span> to reach your target of <span className="font-bold">${FV.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>.
                      </h2>
                    )}
                    {tab === "rate" && result.rate !== undefined && (
                      <h2 className="text-lg font-semibold text-green-900 mb-2">
                        You need an annual return rate of <span className="text-blue-700 font-bold">{result.rate.toLocaleString(undefined, { maximumFractionDigits: 3 })}%</span> to reach your target of <span className="font-bold">${FV.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>.
                      </h2>
                    )}

                    {/* Breakdown */}
                    <div className="mt-4 mb-2">
                      <div className="font-semibold text-gray-700 mb-1">Breakdown</div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div><span className="text-gray-500">End Balance</span><br /><span className="font-bold text-green-800">${(result.FV ?? FV).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                        <div><span className="text-gray-500">Starting Amount</span><br /><span className="font-bold">${(result.PV ?? PV).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                        <div><span className="text-gray-500">Total Contributions</span><br /><span className="font-bold">${(result.totalContrib ?? (PV + PMT * (m * t))).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                        <div><span className="text-gray-500">Total Interest</span><br /><span className="font-bold">${(result.totalInterest ?? ((result.FV ?? FV) - (result.totalContrib ?? (PV + PMT * (m * t))))).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span></div>
                      </div>
                    </div>

                    {/* Pie Chart */}
                    <div className="my-4">
                      <ChartContainer
                        config={{
                          start: { color: '#2563eb', label: 'Starting Amount' },
                          contrib: { color: '#22c55e', label: 'Total Contributions' },
                          interest: { color: '#ef4444', label: 'Interest' },
                        }}
                        style={{ width: '100%', maxWidth: 320, margin: '0 auto' }}
                      >
                        <PieChart width={320} height={180}>
                          <Pie
                            data={[
                              { name: 'Starting Amount', value: result.PV ?? PV, fill: '#2563eb' },
                              { name: 'Total Contributions', value: (result.totalContrib ?? (PV + PMT * (m * t))) - (result.PV ?? PV), fill: '#22c55e' },
                              { name: 'Interest', value: (result.totalInterest ?? ((result.FV ?? FV) - (result.totalContrib ?? (PV + PMT * (m * t))))), fill: '#ef4444' },
                            ]}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={60}
                            label
                          />
                          <RechartsTooltip />
                        </PieChart>
                      </ChartContainer>
                    </div>

                    {/* Accumulation Schedule Table (Annual) */}
                    <div className="mt-6">
                      <div className="font-semibold text-gray-700 mb-2">Accumulation Schedule (Annual)</div>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Year</TableHead>
                            <TableHead>Deposit</TableHead>
                            <TableHead>Interest</TableHead>
                            <TableHead>Ending Balance</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {(() => {
                            // Generate annual schedule
                            let rows = [];
                            let balance = result.PV ?? PV;
                            let totalDeposit = 0;
                            for (let year = 1; year <= t; year++) {
                              let deposit = PMT * m;
                              let interest = balance * Math.pow(1 + i, m) - balance + deposit * ((Math.pow(1 + i, m) - 1) / i) * (timing === 'beginning' ? (1 + i) : 1) - deposit;
                              balance = balance * Math.pow(1 + i, m) + deposit * ((Math.pow(1 + i, m) - 1) / i) * (timing === 'beginning' ? (1 + i) : 1);
                              totalDeposit += deposit;
                              rows.push(
                                <TableRow key={year}>
                                  <TableCell>{year}</TableCell>
                                  <TableCell>${deposit.toLocaleString(undefined, { maximumFractionDigits: 2 })}</TableCell>
                                  <TableCell>${interest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</TableCell>
                                  <TableCell>${balance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</TableCell>
                                </TableRow>
                              );
                            }
                            return rows;
                          })()}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ) : (
                  <div className="text-muted-foreground">Enter your details and click Calculate to see results.</div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Logo />
              <span className="text-2xl font-bold">Smart Calculator</span>
            </div>
            <div className="flex space-x-6 text-gray-400">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="/contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="text-center text-gray-400 mt-4">&copy; 2025 Smart Calculator. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
