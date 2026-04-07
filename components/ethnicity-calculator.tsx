"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Dna, Users, Plus, Trash2, PieChart } from "lucide-react"

interface EthnicityEntry {
  ethnicity: string
  percentage: number
}

interface Parent {
  id: string
  name: string
  ethnicities: EthnicityEntry[]
}

export default function EthnicityCalculator() {
  const [calculationType, setCalculationType] = useState<string>("parents")
  
  // Parents data
  const [mother, setMother] = useState<EthnicityEntry[]>([{ ethnicity: "", percentage: 100 }])
  const [father, setFather] = useState<EthnicityEntry[]>([{ ethnicity: "", percentage: 100 }])
  
  // Grandparents data
  const [maternalGrandmother, setMaternalGrandmother] = useState<EthnicityEntry[]>([{ ethnicity: "", percentage: 100 }])
  const [maternalGrandfather, setMaternalGrandfather] = useState<EthnicityEntry[]>([{ ethnicity: "", percentage: 100 }])
  const [paternalGrandmother, setPaternalGrandmother] = useState<EthnicityEntry[]>([{ ethnicity: "", percentage: 100 }])
  const [paternalGrandfather, setPaternalGrandfather] = useState<EthnicityEntry[]>([{ ethnicity: "", percentage: 100 }])
  
  const [result, setResult] = useState<{ [key: string]: number } | null>(null)

  const addEthnicity = (parent: EthnicityEntry[], setter: (val: EthnicityEntry[]) => void) => {
    setter([...parent, { ethnicity: "", percentage: 0 }])
  }

  const removeEthnicity = (parent: EthnicityEntry[], setter: (val: EthnicityEntry[]) => void, index: number) => {
    if (parent.length > 1) {
      const newEntries = parent.filter((_, i) => i !== index)
      setter(newEntries)
    }
  }

  const updateEthnicity = (
    parent: EthnicityEntry[], 
    setter: (val: EthnicityEntry[]) => void, 
    index: number, 
    field: 'ethnicity' | 'percentage', 
    value: string | number
  ) => {
    const newEntries = [...parent]
    if (field === 'ethnicity') {
      newEntries[index].ethnicity = value as string
    } else {
      newEntries[index].percentage = parseFloat(value as string) || 0
    }
    setter(newEntries)
  }

  const calculateEthnicity = () => {
    const ethnicityMap: { [key: string]: number } = {}

    const addToMap = (entries: EthnicityEntry[], contribution: number) => {
      entries.forEach(entry => {
        if (entry.ethnicity.trim()) {
          const ethnicity = entry.ethnicity.trim()
          const value = (entry.percentage / 100) * contribution
          ethnicityMap[ethnicity] = (ethnicityMap[ethnicity] || 0) + value
        }
      })
    }

    if (calculationType === "parents") {
      // Each parent contributes 50%
      addToMap(mother, 50)
      addToMap(father, 50)
    } else if (calculationType === "grandparents") {
      // Each grandparent contributes 25%
      addToMap(maternalGrandmother, 25)
      addToMap(maternalGrandfather, 25)
      addToMap(paternalGrandmother, 25)
      addToMap(paternalGrandfather, 25)
    }

    // Sort by percentage descending
    const sortedResult = Object.entries(ethnicityMap)
      .sort(([, a], [, b]) => b - a)
      .reduce((acc, [key, value]) => {
        acc[key] = Math.round(value * 100) / 100
        return acc
      }, {} as { [key: string]: number })

    setResult(sortedResult)
  }

  const renderEthnicityInputs = (
    title: string,
    entries: EthnicityEntry[],
    setter: (val: EthnicityEntry[]) => void,
    color: string
  ) => (
    <div className="space-y-3">
      <div className={`flex items-center justify-between bg-gradient-to-r ${color} p-4 rounded-lg border-2 ${color.replace('from-', 'border-').replace('to-', '').split(' ')[0].replace('50', '300')}`}>
        <Label className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Dna className="w-5 h-5" />
          {title}
        </Label>
        <Button
          onClick={() => addEthnicity(entries, setter)}
          variant="outline"
          size="sm"
          className={`border-2 ${color.replace('from-', 'border-').replace('to-', '').split(' ')[0].replace('50', '600')} ${color.replace('from-', 'text-').replace('to-', '').split(' ')[0].replace('50', '600')} hover:${color.replace('from-', 'bg-').replace('to-', '').split(' ')[0].replace('50', '600')} hover:text-white font-semibold transition-all`}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Ethnicity
        </Button>
      </div>

      <div className="space-y-3">
        {entries.map((entry, index) => (
          <div key={index} className="flex items-center gap-3 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-purple-300 transition-colors shadow-sm">
            <div className="flex-1">
              <Input
                type="text"
                value={entry.ethnicity}
                onChange={(e) => updateEthnicity(entries, setter, index, 'ethnicity', e.target.value)}
                placeholder="e.g., Pakistani, Indian, Arab"
                className="text-lg h-12 border-2 border-gray-300 focus:border-purple-500"
              />
            </div>
            <div className="w-32">
              <Input
                type="number"
                value={entry.percentage || ''}
                onChange={(e) => updateEthnicity(entries, setter, index, 'percentage', e.target.value)}
                placeholder="%"
                className="text-lg h-12 border-2 border-gray-300 focus:border-purple-500"
                min="0"
                max="100"
              />
            </div>
            {entries.length > 1 && (
              <Button
                onClick={() => removeEthnicity(entries, setter, index)}
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-white hover:bg-red-600 border-2 border-red-200 hover:border-red-600 transition-all"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Calculator Type Selector */}
      <div className="space-y-3">
        <Label htmlFor="calculationType" className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-600" />
          Select Calculation Method
        </Label>
        <Select value={calculationType} onValueChange={(value) => { setCalculationType(value); setResult(null); }}>
          <SelectTrigger id="calculationType" className="text-lg h-14 border-2 border-gray-300 hover:border-purple-500 transition-colors">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="parents" className="text-base py-3">👨‍👩‍👧 Based on Parents (50% each)</SelectItem>
            <SelectItem value="grandparents" className="text-base py-3">👴👵 Based on Grandparents (25% each)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Parents Calculation */}
      {calculationType === "parents" && (
        <div className="space-y-6">
          {renderEthnicityInputs("Mother's Ethnicity", mother, setMother, "from-pink-50 to-rose-50")}
          {renderEthnicityInputs("Father's Ethnicity", father, setFather, "from-blue-50 to-cyan-50")}
        </div>
      )}

      {/* Grandparents Calculation */}
      {calculationType === "grandparents" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-xl border-2 border-pink-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-pink-600" />
              Maternal Side (Mother's Parents)
            </h3>
            <div className="space-y-4">
              {renderEthnicityInputs("Maternal Grandmother", maternalGrandmother, setMaternalGrandmother, "from-pink-50 to-rose-50")}
              {renderEthnicityInputs("Maternal Grandfather", maternalGrandfather, setMaternalGrandfather, "from-pink-50 to-rose-50")}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-600" />
              Paternal Side (Father's Parents)
            </h3>
            <div className="space-y-4">
              {renderEthnicityInputs("Paternal Grandmother", paternalGrandmother, setPaternalGrandmother, "from-blue-50 to-cyan-50")}
              {renderEthnicityInputs("Paternal Grandfather", paternalGrandfather, setPaternalGrandfather, "from-blue-50 to-cyan-50")}
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={calculateEthnicity}
        size="lg"
        className="w-full text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
      >
        <Calculator className="w-5 h-5 mr-2" />
        Calculate My Ethnicity
      </Button>

      {/* Results */}
      {result && Object.keys(result).length > 0 && (
        <div className="mt-8 p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <PieChart className="w-7 h-7 text-purple-600" />
            Your Ethnicity Results
          </h3>

          <div className="space-y-4">
            {Object.entries(result).map(([ethnicity, percentage], index) => (
              <div key={index} className="bg-white p-5 rounded-xl border-2 border-purple-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-gray-900">{ethnicity}</span>
                  <span className="text-2xl font-bold text-purple-600">{percentage.toFixed(2)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-5 bg-blue-50 border-2 border-blue-200 rounded-xl">
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>💡 Note:</strong> This is an estimate based on the information you provided. Each parent contributes 50% of your genetic heritage, and each grandparent contributes 25%. For the most accurate results, consider combining this estimate with a professional DNA test from services like AncestryDNA or 23andMe.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
