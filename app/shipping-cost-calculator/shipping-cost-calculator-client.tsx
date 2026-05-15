"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Calculator, DollarSign, Globe, Package, ShieldCheck, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useMobileScroll } from "@/hooks/useMobileScroll"
import { RatingProfileSection } from "@/components/rating-profile-section"

type ShipmentType = "documents" | "parcel" | "freight" | "container"
type WeightUnit = "kg" | "lb"
type DimUnit = "cm" | "in"
type ShippingMethod = "air_express" | "air_freight" | "sea_freight" | "rail_freight" | "standard_courier"
type Speed = "economy" | "standard" | "priority" | "express"
type Currency = "USD" | "EUR" | "GBP" | "PKR" | "AED"

type RateTable = Record<Currency, number>

const CURRENCIES: Array<{ code: Currency; label: string }> = [
  { code: "USD", label: "USD" },
  { code: "EUR", label: "EUR" },
  { code: "GBP", label: "GBP" },
  { code: "PKR", label: "PKR" },
  { code: "AED", label: "AED" },
]

const SHIPMENT_TYPES: Array<{ id: ShipmentType; label: string; hint: string; multiplier: number }> = [
  { id: "documents", label: "Documents", hint: "Lightweight paperwork", multiplier: 0.85 },
  { id: "parcel", label: "Parcel", hint: "Typical packages", multiplier: 1.0 },
  { id: "freight", label: "Freight", hint: "Heavy/bulky cargo", multiplier: 1.35 },
  { id: "container", label: "Container", hint: "LCL/FCL style moves", multiplier: 2.1 },
]

const METHODS: Array<{
  id: ShippingMethod
  label: string
  bestFor: string
  baseDays: [number, number]
  perKgUsd: number
  minUsd: number
  modeBadge: string
}> = [
  {
    id: "air_express",
    label: "Air Express",
    bestFor: "Fast delivery, documents, small parcels",
    baseDays: [2, 5],
    perKgUsd: 12.5,
    minUsd: 25,
    modeBadge: "Fastest",
  },
  {
    id: "standard_courier",
    label: "Standard Courier",
    bestFor: "Balanced cost & speed for parcels",
    baseDays: [4, 9],
    perKgUsd: 8.9,
    minUsd: 18,
    modeBadge: "Balanced",
  },
  {
    id: "air_freight",
    label: "Air Freight",
    bestFor: "Freight that still needs speed",
    baseDays: [5, 12],
    perKgUsd: 6.8,
    minUsd: 65,
    modeBadge: "Business",
  },
  {
    id: "rail_freight",
    label: "Rail Freight",
    bestFor: "Regional lanes, mid-cost",
    baseDays: [10, 22],
    perKgUsd: 4.4,
    minUsd: 85,
    modeBadge: "Regional",
  },
  {
    id: "sea_freight",
    label: "Sea Freight",
    bestFor: "Cheapest for heavy/bulky shipments",
    baseDays: [18, 45],
    perKgUsd: 2.2,
    minUsd: 95,
    modeBadge: "Cheapest",
  },
]

const SPEEDS: Array<{ id: Speed; label: string; priceMult: number; daysMult: number }> = [
  { id: "economy", label: "Economy", priceMult: 0.92, daysMult: 1.18 },
  { id: "standard", label: "Standard", priceMult: 1.0, daysMult: 1.0 },
  { id: "priority", label: "Priority", priceMult: 1.12, daysMult: 0.85 },
  { id: "express", label: "Express", priceMult: 1.28, daysMult: 0.7 },
]

const COUNTRIES: string[] = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Angola",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahrain",
  "Bangladesh",
  "Belarus",
  "Belgium",
  "Benin",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Congo (DRC)",
  "Congo (Republic)",
  "Costa Rica",
  "Côte d’Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia",
  "Denmark",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Estonia",
  "Ethiopia",
  "Finland",
  "France",
  "Gabon",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Guatemala",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "South Korea",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Libya",
  "Lithuania",
  "Luxembourg",
  "Malaysia",
  "Maldives",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Mongolia",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Panama",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Réunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "South Sudan",
  "Sweden",
  "Switzerland",
  "Taiwan",
  "Tanzania",
  "Thailand",
  "Tunisia",
  "Turkey",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "United States Virgin Islands",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Zambia",
  "Zimbabwe",
]

const DEFAULT_RATES: RateTable = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  PKR: 278,
  AED: 3.67,
}

function toNumber(value: string) {
  const n = Number(value)
  return Number.isFinite(n) ? n : 0
}

function round2(n: number) {
  return Math.round(n * 100) / 100
}

function formatMoney(amount: number, currency: Currency) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount)
  } catch {
    return `${currency} ${amount.toFixed(2)}`
  }
}

function kgFromWeight(weight: number, unit: WeightUnit) {
  if (unit === "kg") return weight
  return weight * 0.45359237
}

function cmFromDim(dim: number, unit: DimUnit) {
  if (unit === "cm") return dim
  return dim * 2.54
}

function volumetricKg(length: number, width: number, height: number, unit: DimUnit) {
  const l = cmFromDim(length, unit)
  const w = cmFromDim(width, unit)
  const h = cmFromDim(height, unit)
  if (l <= 0 || w <= 0 || h <= 0) return 0
  return (l * w * h) / 5000
}

function estimateRouteMultiplier(origin: string, destination: string) {
  if (!origin || !destination) return 1
  if (origin.trim().toLowerCase() === destination.trim().toLowerCase()) return 0.78
  return 1.0
}

function computeQuote(params: {
  shipmentType: ShipmentType
  origin: string
  destination: string
  actualWeight: number
  weightUnit: WeightUnit
  length: number
  width: number
  height: number
  dimUnit: DimUnit
  method: ShippingMethod
  speed: Speed
  includeInsurance: boolean
  includeCustoms: boolean
  includeFuel: boolean
}) {
  const type = SHIPMENT_TYPES.find((t) => t.id === params.shipmentType) || SHIPMENT_TYPES[1]
  const method = METHODS.find((m) => m.id === params.method) || METHODS[0]
  const speed = SPEEDS.find((s) => s.id === params.speed) || SPEEDS[1]

  const actualKg = Math.max(0, kgFromWeight(params.actualWeight, params.weightUnit))
  const volKg = Math.max(0, volumetricKg(params.length, params.width, params.height, params.dimUnit))
  const chargeableKg = Math.max(actualKg, volKg)

  const routeMult = estimateRouteMultiplier(params.origin, params.destination)
  const shipmentMult = type.multiplier

  const baseUsdRaw = Math.max(method.minUsd, chargeableKg * method.perKgUsd) * routeMult * shipmentMult * speed.priceMult
  const baseUsd = round2(baseUsdRaw)

  const fuelUsd = params.includeFuel ? round2(baseUsd * 0.12) : 0
  const insuranceUsd = params.includeInsurance ? round2(Math.max(2.5, baseUsd * 0.015)) : 0
  const customsUsd = params.includeCustoms ? round2(Math.max(5, baseUsd * 0.08)) : 0
  const totalUsd = round2(baseUsd + fuelUsd + insuranceUsd + customsUsd)

  const [minDays, maxDays] = method.baseDays
  const estMin = Math.max(1, Math.round(minDays * speed.daysMult))
  const estMax = Math.max(estMin, Math.round(maxDays * speed.daysMult))

  return {
    methodId: method.id,
    methodLabel: method.label,
    bestFor: method.bestFor,
    modeBadge: method.modeBadge,
    actualKg: round2(actualKg),
    volumetricKg: round2(volKg),
    chargeableKg: round2(chargeableKg),
    baseUsd,
    fuelUsd,
    insuranceUsd,
    customsUsd,
    totalUsd,
    etaLabel: `${estMin}–${estMax} days`,
    etaDaysMin: estMin,
    etaDaysMax: estMax,
  }
}

function computeComparison(params: {
  shipmentType: ShipmentType
  origin: string
  destination: string
  actualWeight: number
  weightUnit: WeightUnit
  length: number
  width: number
  height: number
  dimUnit: DimUnit
  speed: Speed
  includeInsurance: boolean
  includeCustoms: boolean
  includeFuel: boolean
}) {
  const rows = METHODS.map((m) =>
    computeQuote({
      ...params,
      method: m.id,
    })
  )

  const cheapest = rows.reduce((acc, r) => (r.totalUsd < acc.totalUsd ? r : acc), rows[0])
  const fastest = rows.reduce((acc, r) => (r.etaDaysMin < acc.etaDaysMin ? r : acc), rows[0])

  const scored = rows.map((r) => {
    const priceScore = cheapest.totalUsd > 0 ? r.totalUsd / cheapest.totalUsd : 1
    const timeScore = fastest.etaDaysMin > 0 ? r.etaDaysMin / fastest.etaDaysMin : 1
    return { ...r, score: priceScore * 0.55 + timeScore * 0.45 }
  })

  const recommended = scored.reduce((acc, r) => (r.score < acc.score ? r : acc), scored[0])

  return {
    rows: scored,
    cheapestId: cheapest.methodId,
    fastestId: fastest.methodId,
    recommendedId: recommended.methodId,
  }
}

export default function ShippingCostCalculatorClient() {
  const [mounted, setMounted] = useState(false)
  const [shipmentType, setShipmentType] = useState<ShipmentType>("parcel")
  const [origin, setOrigin] = useState("United States")
  const [destination, setDestination] = useState("United Kingdom")
  const [weight, setWeight] = useState<string>("2")
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg")
  const [dimUnit, setDimUnit] = useState<DimUnit>("cm")
  const [length, setLength] = useState<string>("30")
  const [width, setWidth] = useState<string>("20")
  const [height, setHeight] = useState<string>("10")
  const [method, setMethod] = useState<ShippingMethod>("air_express")
  const [speed, setSpeed] = useState<Speed>("standard")
  const [currency, setCurrency] = useState<Currency>("USD")
  const [includeInsurance, setIncludeInsurance] = useState(true)
  const [includeCustoms, setIncludeCustoms] = useState(false)
  const [includeFuel, setIncludeFuel] = useState(true)

  const [rates, setRates] = useState<RateTable>(DEFAULT_RATES)
  const [ratesLoading, setRatesLoading] = useState(true)
  const [ratesError, setRatesError] = useState<string | null>(null)

  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<{
    primary: ReturnType<typeof computeQuote>
    comparison: ReturnType<typeof computeComparison>
  } | null>(null)
  const [showComparison, setShowComparison] = useState(false)

  const resultsRef = useRef<HTMLDivElement>(null)
  const compareRef = useRef<HTMLDivElement>(null)
  const scrollToRef = useMobileScroll()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    let didCancel = false

    async function loadRates() {
      setRatesLoading(true)
      setRatesError(null)

      try {
        const cachedRaw = typeof window !== "undefined" ? localStorage.getItem("shipping_fx_v1") : null
        if (cachedRaw) {
          const parsed = JSON.parse(cachedRaw) as { at: number; rates: RateTable }
          if (parsed?.rates && Date.now() - parsed.at < 6 * 60 * 60 * 1000) {
            if (!didCancel) {
              setRates(parsed.rates)
              setRatesLoading(false)
            }
            return
          }
        }

        const res = await fetch("https://api.exchangerate.host/latest?base=USD&symbols=USD,EUR,GBP,PKR,AED", {
          method: "GET",
          cache: "no-store",
        })

        if (!res.ok) throw new Error(`FX fetch failed`)
        const data = (await res.json()) as { rates?: Partial<Record<Currency, number>> }

        const nextRates: RateTable = {
          USD: 1,
          EUR: Number(data?.rates?.EUR) || DEFAULT_RATES.EUR,
          GBP: Number(data?.rates?.GBP) || DEFAULT_RATES.GBP,
          PKR: Number(data?.rates?.PKR) || DEFAULT_RATES.PKR,
          AED: Number(data?.rates?.AED) || DEFAULT_RATES.AED,
        }

        if (!didCancel) {
          setRates(nextRates)
          setRatesLoading(false)
          localStorage.setItem("shipping_fx_v1", JSON.stringify({ at: Date.now(), rates: nextRates }))
        }
      } catch (e) {
        if (!didCancel) {
          setRates(DEFAULT_RATES)
          setRatesLoading(false)
          setRatesError("Using fallback exchange rates.")
        }
      }
    }

    loadRates()

    return () => {
      didCancel = true
    }
  }, [])

  const fx = rates[currency] || 1

  const numeric = useMemo(() => {
    return {
      weight: toNumber(weight),
      length: toNumber(length),
      width: toNumber(width),
      height: toNumber(height),
    }
  }, [weight, length, width, height])

  function runCalculation() {
    const errors: string[] = []
    if (!origin.trim()) errors.push("Please select an origin country.")
    if (!destination.trim()) errors.push("Please select a destination country.")
    if (numeric.weight <= 0) errors.push("Please enter a valid weight.")
    if (numeric.length <= 0 || numeric.width <= 0 || numeric.height <= 0) errors.push("Please enter valid dimensions.")

    if (errors.length > 0) {
      setError(errors[0] || "Please check your inputs.")
      setResults(null)
      return null
    }

    setError(null)

    const primary = computeQuote({
      shipmentType,
      origin,
      destination,
      actualWeight: numeric.weight,
      weightUnit,
      length: numeric.length,
      width: numeric.width,
      height: numeric.height,
      dimUnit,
      method,
      speed,
      includeInsurance,
      includeCustoms,
      includeFuel,
    })

    const comparison = computeComparison({
      shipmentType,
      origin,
      destination,
      actualWeight: numeric.weight,
      weightUnit,
      length: numeric.length,
      width: numeric.width,
      height: numeric.height,
      dimUnit,
      speed,
      includeInsurance,
      includeCustoms,
      includeFuel,
    })

    const next = { primary, comparison }
    setResults(next)
    scrollToRef(resultsRef)
    return next
  }

  if (!mounted) {
    return (
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
    )
  }

  return (
    <div className="space-y-10">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <Card className="shadow-2xl border-2 border-blue-100 pt-0 hover:shadow-blue-100 transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Calculator className="h-6 w-6" />
              Calculate Shipping Cost
            </CardTitle>
            <CardDescription className="text-black-50">Enter shipment details to generate an instant estimate.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-blue-600" />
                  Shipment Type
                </Label>
                <Select value={shipmentType} onValueChange={(v) => setShipmentType(v as ShipmentType)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select shipment type" />
                  </SelectTrigger>
                  <SelectContent>
                    {SHIPMENT_TYPES.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-blue-600" />
                    Origin Country
                  </Label>
                  <Select value={origin} onValueChange={setOrigin}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select origin" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map((name) => (
                        <SelectItem key={`o-${name}`} value={name}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-blue-600" />
                    Destination Country
                  </Label>
                  <Select value={destination} onValueChange={setDestination}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map((name) => (
                        <SelectItem key={`d-${name}`} value={name}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    inputMode="decimal"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Unit</Label>
                  <Select value={weightUnit} onValueChange={(v) => setWeightUnit(v as WeightUnit)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="lb">lb</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <Label>Dimensions</Label>
                  <Select value={dimUnit} onValueChange={(v) => setDimUnit(v as DimUnit)}>
                    <SelectTrigger className="w-[110px]">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cm">cm</SelectItem>
                      <SelectItem value="in">in</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <Input inputMode="decimal" value={length} onChange={(e) => setLength(e.target.value)} aria-label="Length" placeholder="Length" />
                  <Input inputMode="decimal" value={width} onChange={(e) => setWidth(e.target.value)} aria-label="Width" placeholder="Width" />
                  <Input inputMode="decimal" value={height} onChange={(e) => setHeight(e.target.value)} aria-label="Height" placeholder="Height" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Shipping Method</Label>
                <Select value={method} onValueChange={(v) => setMethod(v as ShippingMethod)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    {METHODS.map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Delivery Speed</Label>
                  <Select value={speed} onValueChange={(v) => setSpeed(v as Speed)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select speed" />
                    </SelectTrigger>
                    <SelectContent>
                      {SPEEDS.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-blue-600" />
                    Currency
                  </Label>
                  <Select value={currency} onValueChange={(v) => setCurrency(v as Currency)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCIES.map((c) => (
                        <SelectItem key={c.code} value={c.code}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold">Options</Label>
                <div className="space-y-3 pl-1">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-900">Insurance</span>
                    </div>
                    <Switch checked={includeInsurance} onCheckedChange={(v) => setIncludeInsurance(Boolean(v))} aria-label="Insurance toggle" />
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-900">Customs duty</span>
                    </div>
                    <Switch checked={includeCustoms} onCheckedChange={(v) => setIncludeCustoms(Boolean(v))} aria-label="Customs toggle" />
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-900">Fuel surcharge</span>
                    </div>
                    <Switch checked={includeFuel} onCheckedChange={(v) => setIncludeFuel(Boolean(v))} aria-label="Fuel surcharge toggle" />
                  </div>
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
                  {error}
                </div>
              )}

              {ratesError && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
                  {ratesError}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  onClick={() => {
                    const next = runCalculation()
                    if (next) setShowComparison(false)
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={ratesLoading}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculate Cost
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShipmentType("parcel")
                    setOrigin("United States")
                    setDestination("United Kingdom")
                    setWeight("2")
                    setWeightUnit("kg")
                    setDimUnit("cm")
                    setLength("30")
                    setWidth("20")
                    setHeight("10")
                    setMethod("air_express")
                    setSpeed("standard")
                    setIncludeInsurance(true)
                    setIncludeCustoms(false)
                    setIncludeFuel(true)
                    setCurrency("USD")
                    setError(null)
                    setResults(null)
                    setShowComparison(false)
                  }}
                >
                  Clear
                </Button>
              </div>

              <div className="flex">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    const next = results ?? runCalculation()
                    if (!next) return
                    setShowComparison(true)
                    setTimeout(() => {
                      compareRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
                    }, 0)
                  }}
                  disabled={ratesLoading}
                >
                  Compare Options
                </Button>
              </div>
          </CardContent>
        </Card>

      <div ref={resultsRef} className="lg:sticky lg:top-4">
        <Card className="shadow-2xl border-2 pt-0 border-blue-100 hover:shadow-blue-100 transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
            <CardTitle className="flex items-center gap-2 text-xl">
              <DollarSign className="h-6 w-6" />
              Estimated Shipping Cost
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {ratesLoading ? (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Loading currency rates…</p>
              </div>
            ) : results ? (
              <div className="space-y-6">
                <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-300 shadow-inner">
                  <div className="text-sm font-medium text-gray-600 mb-3 uppercase tracking-wide">Total Estimated Cost</div>
                  <div className="text-5xl font-bold text-blue-600 mb-2">{formatMoney(results.primary.totalUsd * fx, currency)}</div>
                  <div className="text-xs text-gray-500 mt-2">Delivery: {results.primary.etaLabel}</div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-gray-200 bg-white p-3">
                    <div className="text-[11px] font-bold text-gray-500">Actual</div>
                    <div className="mt-1 font-black text-gray-900">{results.primary.actualKg.toFixed(2)} kg</div>
                  </div>
                  <div className="rounded-2xl border border-gray-200 bg-white p-3">
                    <div className="text-[11px] font-bold text-gray-500">Volumetric</div>
                    <div className="mt-1 font-black text-gray-900">{results.primary.volumetricKg.toFixed(2)} kg</div>
                  </div>
                  <div className="rounded-2xl border border-gray-200 bg-white p-3">
                    <div className="text-[11px] font-bold text-gray-500">Chargeable</div>
                    <div className="mt-1 font-black text-gray-900">{results.primary.chargeableKg.toFixed(2)} kg</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                    <div className="h-1 w-8 bg-blue-600 rounded"></div>
                    Cost Breakdown
                  </h3>
                  <div className="space-y-2">
                    {[
                      { label: "Base Shipping Cost", value: results.primary.baseUsd * fx },
                      { label: "Fuel Surcharge", value: results.primary.fuelUsd * fx },
                      { label: "Insurance Fee", value: results.primary.insuranceUsd * fx },
                      { label: "Customs Estimate", value: results.primary.customsUsd * fx },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl border border-gray-200">
                        <span className="font-medium text-gray-700">{item.label}</span>
                        <span className="font-bold text-gray-900">{formatMoney(item.value, currency)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">
                    Cheapest: {METHODS.find((m) => m.id === results.comparison.cheapestId)?.label}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700">
                    Fastest: {METHODS.find((m) => m.id === results.comparison.fastestId)?.label}
                  </span>
                </div>

                <div className="text-xs text-gray-500">Estimates only. Carrier pricing varies by lane, season, and additional fees.</div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Truck className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Enter shipment details and click Calculate to see the estimated cost</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {results && showComparison && (
        <div ref={compareRef} className="lg:col-span-2 mt-2">
          <Card className="shadow-2xl border-2 border-blue-100 pt-0">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b px-8 py-6">
              <CardTitle className="text-xl">Compare All Shipping Methods</CardTitle>
              <CardDescription>Side-by-side pricing and transit time.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="min-w-[720px] w-full text-left text-sm">
                  <thead>
                    <tr className="text-xs font-bold text-gray-600">
                      <th className="py-2 pr-3">Method</th>
                      <th className="py-2 pr-3">Price</th>
                      <th className="py-2 pr-3">Transit Time</th>
                      <th className="py-2 pr-3">Best For</th>
                      <th className="py-2 pr-0 text-right">Badge</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {results.comparison.rows
                      .slice()
                      .sort((a, b) => a.totalUsd - b.totalUsd)
                      .map((q) => {
                        const isCheapest = q.methodId === results.comparison.cheapestId
                        const isFastest = q.methodId === results.comparison.fastestId
                        const isRecommended = q.methodId === results.comparison.recommendedId
                        const badge = isRecommended ? "Recommended" : isCheapest ? "Cheapest" : isFastest ? "Fastest" : q.modeBadge

                        return (
                          <tr key={q.methodId} className={isRecommended ? "bg-blue-50/40" : ""}>
                            <td className="py-3 pr-3 font-bold text-gray-900">{q.methodLabel}</td>
                            <td className="py-3 pr-3 font-semibold text-gray-900">{formatMoney(q.totalUsd * fx, currency)}</td>
                            <td className="py-3 pr-3 text-gray-700">{q.etaLabel}</td>
                            <td className="py-3 pr-3 text-gray-700">{q.bestFor}</td>
                            <td className="py-3 pr-0 text-right">
                              <span
                                className={[
                                  "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold",
                                  isRecommended
                                    ? "border-blue-200 bg-white text-blue-700"
                                    : isCheapest
                                      ? "border-teal-200 bg-teal-50 text-teal-700"
                                      : isFastest
                                        ? "border-sky-200 bg-sky-50 text-sky-700"
                                        : "border-gray-200 bg-gray-50 text-gray-700",
                                ].join(" ")}
                              >
                                {badge}
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      </div>

      <RatingProfileSection
        entityId="shipping-cost-calculator"
        entityType="calculator"
        creatorSlug="felix-yacoub"
        initialRatingTotal={3690}
        initialRatingCount={820}
        className="py-0 mt-0"
      />
    </div>
  )
}
