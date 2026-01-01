"use client"

import Link from "next/link"
import { ArrowLeft, Calculator, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getCalculatorsByCategory, getPopularCalculatorsByCategory } from "@/lib/calculator-data"

interface CategoryClientProps {
  categoryId: string;
  content: any;
}

export default function CategoryClient({ categoryId, content }: CategoryClientProps) {
  const contentData = content || {
    name: categoryId.charAt(0).toUpperCase() + categoryId.slice(1),
    description: `Free ${categoryId} calculators`,
    slug: categoryId
  };

  const allCalculators = getCalculatorsByCategory(categoryId);
  const popularCalculators = getPopularCalculatorsByCategory(categoryId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/">
          <Button variant="ghost" className="mb-8 hover:bg-white/50">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-xl">
            <Calculator className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {contentData.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {contentData.description}
          </p>
        </div>

        {popularCalculators.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="mr-3 h-6 w-6 text-blue-600" />
              Popular {contentData.name} Calculators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularCalculators.map((calc) => (
                <Link key={calc.id} href={calc.href}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-0 shadow-lg group">
                    <div className="h-2 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                    <CardHeader>
                      <CardTitle className="group-hover:text-blue-600 transition-colors">
                        {calc.name}
                      </CardTitle>
                      <CardDescription>{calc.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Calculator className="mr-3 h-6 w-6 text-blue-600" />
            All {contentData.name} Calculators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCalculators.map((calc) => (
              <Link key={calc.id} href={calc.href}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                  <CardHeader>
                    <CardTitle className="group-hover:text-blue-600 transition-colors">
                      {calc.name}
                    </CardTitle>
                    <CardDescription>{calc.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="text-blue-600 font-semibold group-hover:translate-x-1 transition-transform inline-block">
                      Calculate Now →
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
