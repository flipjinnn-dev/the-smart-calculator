"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Swords, Shield, Target, Hammer, TrendingUp } from "lucide-react"

// Troop cost data structure (per unit at T1, with tier multipliers)
const TROOP_BASE_COSTS = {
  mounted: {
    food: 100,
    lumber: 50,
    stone: 50,
    ore: 150,
    gold: 10,
    power: 2
  },
  ground: {
    food: 80,
    lumber: 40,
    stone: 40,
    ore: 80,
    gold: 8,
    power: 1.5
  },
  ranged: {
    food: 60,
    lumber: 120,
    stone: 40,
    ore: 60,
    gold: 7,
    power: 1.8
  },
  siege: {
    food: 50,
    lumber: 80,
    stone: 150,
    ore: 200,
    gold: 15,
    power: 3
  }
}

// Tier multipliers (exponential scaling)
const TIER_MULTIPLIERS: { [key: string]: number } = {
  "1": 1,
  "2": 1.5,
  "3": 2.2,
  "4": 3.5,
  "5": 5,
  "6": 7.5,
  "7": 11,
  "8": 16,
  "9": 23,
  "10": 32,
  "11": 45,
  "12": 65,
  "13": 90,
  "14": 130,
  "15": 180,
  "16": 250
}

export default function EvonyTroopCalculator() {
  const [troopType, setTroopType] = useState<string>("mounted")
  const [troopTier, setTroopTier] = useState<string>("10")
  const [troopTarget, setTroopTarget] = useState<string>("100000")
  const [results, setResults] = useState<any>(null)

  const calculateCosts = () => {
    const quantity = parseInt(troopTarget) || 0
    const tier = troopTier
    const type = troopType as keyof typeof TROOP_BASE_COSTS

    if (quantity <= 0) {
      return
    }

    const baseCost = TROOP_BASE_COSTS[type]
    const multiplier = TIER_MULTIPLIERS[tier]

    const totalFood = Math.round(baseCost.food * multiplier * quantity)
    const totalLumber = Math.round(baseCost.lumber * multiplier * quantity)
    const totalStone = Math.round(baseCost.stone * multiplier * quantity)
    const totalOre = Math.round(baseCost.ore * multiplier * quantity)
    const totalGold = Math.round(baseCost.gold * multiplier * quantity)
    const totalPower = Math.round(baseCost.power * multiplier * quantity)

    setResults({
      food: totalFood,
      lumber: totalLumber,
      stone: totalStone,
      ore: totalOre,
      gold: totalGold,
      power: totalPower,
      quantity: quantity,
      tier: tier,
      type: type
    })
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }

  const getTroopTypeIcon = () => {
    switch (troopType) {
      case "mounted":
        return <Swords className="w-5 h-5" />
      case "ground":
        return <Shield className="w-5 h-5" />
      case "ranged":
        return <Target className="w-5 h-5" />
      case "siege":
        return <Hammer className="w-5 h-5" />
      default:
        return <Swords className="w-5 h-5" />
    }
  }

  const getTroopTypeName = (type: string) => {
    const names: { [key: string]: string } = {
      mounted: "Mounted (Cavalry)",
      ground: "Ground (Infantry)",
      ranged: "Ranged",
      siege: "Siege"
    }
    return names[type] || type
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border-2 border-blue-200 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <Calculator className="w-8 h-8" />
            Evony Troop Cost Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="troop-type" className="text-base font-semibold text-gray-700">
                Troop Type
              </Label>
              <Select value={troopType} onValueChange={setTroopType}>
                <SelectTrigger id="troop-type" className="border-2 border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mounted">
                    <div className="flex items-center gap-2">
                      <Swords className="w-4 h-4" />
                      Mounted (Cavalry)
                    </div>
                  </SelectItem>
                  <SelectItem value="ground">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Ground (Infantry)
                    </div>
                  </SelectItem>
                  <SelectItem value="ranged">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Ranged
                    </div>
                  </SelectItem>
                  <SelectItem value="siege">
                    <div className="flex items-center gap-2">
                      <Hammer className="w-4 h-4" />
                      Siege
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="troop-tier" className="text-base font-semibold text-gray-700">
                Troop Tier (T1-T16)
              </Label>
              <Select value={troopTier} onValueChange={setTroopTier}>
                <SelectTrigger id="troop-tier" className="border-2 border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(TIER_MULTIPLIERS).map((tier) => (
                    <SelectItem key={tier} value={tier}>
                      T{tier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="troop-target" className="text-base font-semibold text-gray-700">
                Troop Target (Quantity)
              </Label>
              <Input
                id="troop-target"
                type="number"
                value={troopTarget}
                onChange={(e) => setTroopTarget(e.target.value)}
                placeholder="Enter quantity"
                className="border-2 border-gray-300"
                min="1"
              />
            </div>
          </div>

          <Button
            onClick={calculateCosts}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-6 text-lg"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Calculate Resource Cost
          </Button>

          {results && (
            <div className="mt-8 space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  {getTroopTypeIcon()}
                  <h3 className="text-xl font-bold text-green-900">
                    Training {formatNumber(results.quantity)} × T{results.tier} {getTroopTypeName(results.type)}
                  </h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border-2 border-orange-200">
                    <div className="text-sm text-gray-600 mb-1">🌾 Food</div>
                    <div className="text-2xl font-bold text-orange-700">{formatNumber(results.food)}</div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border-2 border-amber-200">
                    <div className="text-sm text-gray-600 mb-1">🪵 Lumber</div>
                    <div className="text-2xl font-bold text-amber-700">{formatNumber(results.lumber)}</div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border-2 border-gray-300">
                    <div className="text-sm text-gray-600 mb-1">🪨 Stone</div>
                    <div className="text-2xl font-bold text-gray-700">{formatNumber(results.stone)}</div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border-2 border-slate-300">
                    <div className="text-sm text-gray-600 mb-1">⛏️ Ore</div>
                    <div className="text-2xl font-bold text-slate-700">{formatNumber(results.ore)}</div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border-2 border-yellow-300">
                    <div className="text-sm text-gray-600 mb-1">💰 Gold</div>
                    <div className="text-2xl font-bold text-yellow-700">{formatNumber(results.gold)}</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-4 border-2 border-purple-300">
                    <div className="flex items-center gap-2 text-sm text-purple-700 mb-1">
                      <TrendingUp className="w-4 h-4" />
                      Power Gain
                    </div>
                    <div className="text-2xl font-bold text-purple-700">{formatNumber(results.power)}</div>
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                  <p className="text-sm text-blue-900">
                    <strong>Total Resources Required:</strong> {formatNumber(results.food + results.lumber + results.stone + results.ore + results.gold)} RSS
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                <p className="text-sm text-yellow-900">
                  <strong>⚠️ Important:</strong> These are base game values. Your actual costs may be lower if you have Academy research bonuses for Training Cost Reduction. Always verify your stockpile before starting a large training batch.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
