"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeft, Calculator as CalculatorIcon, TrendingUp, ChevronRight, Activity, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Calculator } from "@/lib/calculator-data"

interface CategoryClientProps {
  categoryId: string;
  content: any;
  allCalculators: Calculator[];
  popularCalculators: Calculator[];
  children?: React.ReactNode;
}

export default function CategoryClient({ categoryId, content, allCalculators, popularCalculators, children }: CategoryClientProps) {
  const contentData = content || {
    name: categoryId.charAt(0).toUpperCase() + categoryId.slice(1),
    description: `Free ${categoryId} calculators`,
    slug: categoryId
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Premium Hero Section */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white pt-16 pb-32 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link href="/">
            <Button variant="ghost" className="mb-8 text-slate-300 hover:text-white hover:bg-slate-800 backdrop-blur-sm -ml-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Directory
            </Button>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="animate-in fade-in slide-in-from-right-4 duration-700">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4">
                {contentData.name}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  Calculators
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl font-medium leading-relaxed">
                {contentData.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-24">
        
        {popularCalculators.length > 0 && (
          <div className="mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
            <div className="flex items-center gap-3 mb-8 px-2">
              <div className="p-2 bg-rose-100 rounded-lg text-rose-600 shadow-sm border border-rose-200">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Most Popular
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularCalculators.map((calc, i) => (
                <Link key={calc.id} href={calc.href} className="group block h-full outline-none">
                  <Card className="h-full bg-white/90 backdrop-blur-xl border-slate-200/60 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/30 overflow-hidden relative">
                    {/* Top gradient accent */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-rose-500 group-hover:to-orange-500 group-hover:text-white transition-all duration-500 shadow-sm">
                          <Activity className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-rose-500 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">Hot</span>
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
                        {calc.name}
                      </CardTitle>
                      <CardDescription className="text-slate-500 text-sm leading-relaxed line-clamp-2 mt-2">
                        {calc.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center text-sm font-semibold text-indigo-600 pt-4 border-t border-slate-100 mt-2">
                        <span>Open Calculator</span>
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1.5 transition-transform duration-300" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600 shadow-sm border border-indigo-200">
              <CalculatorIcon className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              All {contentData.name} Tools
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCalculators.map((calc, i) => (
              <Link key={calc.id} href={calc.href} className="group block h-full outline-none">
                <Card className="h-full bg-white border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/50 relative overflow-hidden">
                  {/* Subtle side accent on hover */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {calc.name}
                    </CardTitle>
                    <CardDescription className="text-slate-500 text-sm leading-relaxed line-clamp-2 mt-2">
                      {calc.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center text-sm font-medium text-slate-500 group-hover:text-blue-600 transition-colors pt-4 border-t border-slate-50 mt-2">
                      <span>Calculate</span>
                      <ArrowRight className="w-4 h-4 ml-1.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {children && (
          <div className="mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
            {children}
          </div>
        )}

      </div>
    </div>
  );
}
