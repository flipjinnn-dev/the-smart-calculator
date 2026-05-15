"use client"

import dynamic from "next/dynamic"
import { Calculator, DollarSign } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const ShippingCostCalculatorClient = dynamic(() => import("./shipping-cost-calculator-client"), {
  ssr: false,
  loading: () => (
    <div className="space-y-10">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <Card className="shadow-2xl border-2 border-blue-100 pt-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Calculator className="h-6 w-6" />
              Calculate Shipping Cost
            </CardTitle>
            <CardDescription>Enter shipment details to generate an instant estimate.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <div className="grid grid-cols-3 gap-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>

        <Card className="shadow-2xl border-2 pt-0 border-blue-100">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
            <CardTitle className="flex items-center gap-2 text-xl">
              <DollarSign className="h-6 w-6" />
              Estimated Shipping Cost
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-28 w-full rounded-2xl" />
            <div className="grid grid-cols-3 gap-3">
              <Skeleton className="h-16 w-full rounded-2xl" />
              <Skeleton className="h-16 w-full rounded-2xl" />
              <Skeleton className="h-16 w-full rounded-2xl" />
            </div>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  ),
})

export default function ShippingCostCalculatorIsland() {
  return <ShippingCostCalculatorClient />
}

