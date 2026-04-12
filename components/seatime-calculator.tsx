"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calculator, Ship, Trash2, Calendar } from "lucide-react"

interface Voyage {
  id: string
  vesselName: string
  joiningDate: string
  leavingDate: string
  months: number
  days: number
}

export default function SeatimeCalculator() {
  const [vesselName, setVesselName] = useState<string>("")
  const [joiningDate, setJoiningDate] = useState<string>("")
  const [leavingDate, setLeavingDate] = useState<string>("")
  const [voyages, setVoyages] = useState<Voyage[]>([])
  const [totalMonths, setTotalMonths] = useState<number>(0)
  const [totalDays, setTotalDays] = useState<number>(0)

  const calculateSeaTime = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    if (end < start) {
      alert("Leaving date must be after joining date")
      return null
    }

    let years = end.getFullYear() - start.getFullYear()
    let months = end.getMonth() - start.getMonth()
    let days = end.getDate() - start.getDate()

    // Adjust for negative days
    if (days < 0) {
      months--
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0)
      days += prevMonth.getDate()
    }

    // Adjust for negative months
    if (months < 0) {
      years--
      months += 12
    }

    // Convert years to months
    const totalMonths = years * 12 + months

    return { months: totalMonths, days }
  }

  const addVoyage = () => {
    if (!vesselName.trim()) {
      alert("Please enter vessel name")
      return
    }

    if (!joiningDate || !leavingDate) {
      alert("Please enter both joining and leaving dates")
      return
    }

    const seaTime = calculateSeaTime(joiningDate, leavingDate)
    if (!seaTime) return

    const newVoyage: Voyage = {
      id: Date.now().toString(),
      vesselName: vesselName.trim(),
      joiningDate,
      leavingDate,
      months: seaTime.months,
      days: seaTime.days,
    }

    const updatedVoyages = [...voyages, newVoyage]
    setVoyages(updatedVoyages)

    // Calculate total sea time
    calculateTotalSeaTime(updatedVoyages)

    // Reset form
    setVesselName("")
    setJoiningDate("")
    setLeavingDate("")
  }

  const calculateTotalSeaTime = (allVoyages: Voyage[]) => {
    let totalMonths = 0
    let totalDays = 0

    allVoyages.forEach((voyage) => {
      totalMonths += voyage.months
      totalDays += voyage.days
    })

    // Convert excess days to months
    if (totalDays >= 30) {
      const extraMonths = Math.floor(totalDays / 30)
      totalMonths += extraMonths
      totalDays = totalDays % 30
    }

    setTotalMonths(totalMonths)
    setTotalDays(totalDays)
  }

  const deleteVoyage = (id: string) => {
    const updatedVoyages = voyages.filter((v) => v.id !== id)
    setVoyages(updatedVoyages)
    calculateTotalSeaTime(updatedVoyages)
  }

  const resetCalculator = () => {
    setVesselName("")
    setJoiningDate("")
    setLeavingDate("")
    setVoyages([])
    setTotalMonths(0)
    setTotalDays(0)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  return (
    <div className="space-y-8">
      {/* Total Sea Time Display */}
      <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-2xl p-8 shadow-2xl">
        <h3 className="text-2xl font-bold mb-6 text-center">Total Sea Time</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-6xl font-bold mb-2">{String(totalMonths).padStart(2, '0')}</div>
            <div className="text-xl font-semibold">Months</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-6xl font-bold mb-2">{String(totalDays).padStart(2, '0')}</div>
            <div className="text-xl font-semibold">Days</div>
          </div>
        </div>
      </div>

      {/* Input Form */}
      <div className="space-y-6 bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Ship className="w-7 h-7 text-blue-600" />
          Add Voyage
        </h3>

        {/* Vessel Name */}
        <div className="space-y-3">
          <Label htmlFor="vesselName" className="text-lg font-bold text-gray-900">
            Vessel Name <span className="text-red-600">*</span>
          </Label>
          <Input
            id="vesselName"
            type="text"
            value={vesselName}
            onChange={(e) => setVesselName(e.target.value)}
            placeholder="e.g., MV Ocean Explorer"
            className="text-lg h-12 border-2 border-gray-300 focus:border-blue-500"
          />
          <p className="text-sm text-gray-600">
            Enter the ship name exactly as it appears on your CDC
          </p>
        </div>

        {/* Joining Date */}
        <div className="space-y-3">
          <Label htmlFor="joiningDate" className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-600" />
            Joining Date (Sign-On) <span className="text-red-600">*</span>
          </Label>
          <Input
            id="joiningDate"
            type="date"
            value={joiningDate}
            onChange={(e) => setJoiningDate(e.target.value)}
            className="text-lg h-12 border-2 border-gray-300 focus:border-green-500"
          />
          <p className="text-sm text-gray-600">
            Use the exact date from your CDC (official joining date)
          </p>
        </div>

        {/* Leaving Date */}
        <div className="space-y-3">
          <Label htmlFor="leavingDate" className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange-600" />
            Leaving Date (Sign-Off) <span className="text-red-600">*</span>
          </Label>
          <Input
            id="leavingDate"
            type="date"
            value={leavingDate}
            onChange={(e) => setLeavingDate(e.target.value)}
            className="text-lg h-12 border-2 border-gray-300 focus:border-orange-500"
          />
          <p className="text-sm text-gray-600">
            Use the date on your official sign-off documentation
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            onClick={addVoyage}
            size="lg"
            className="flex-1 text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
          >
            <Calculator className="w-5 h-5 mr-2" />
            Calculate & Add Voyage
          </Button>
          <Button
            onClick={resetCalculator}
            size="lg"
            variant="outline"
            className="text-lg font-semibold border-2 border-gray-300 hover:bg-gray-100"
          >
            Reset All
          </Button>
        </div>
      </div>

      {/* Voyages Table */}
      {voyages.length > 0 && (
        <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4">
            <h3 className="text-2xl font-bold text-white">Sea Service Record</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Vessel Name</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Joining Date</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Leaving Date</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900 border-b-2 border-gray-300">Months</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900 border-b-2 border-gray-300">Days</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900 border-b-2 border-gray-300">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {voyages.map((voyage) => (
                  <tr key={voyage.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900 font-semibold">{voyage.vesselName}</td>
                    <td className="px-6 py-4 text-gray-700">{formatDate(voyage.joiningDate)}</td>
                    <td className="px-6 py-4 text-gray-700">{formatDate(voyage.leavingDate)}</td>
                    <td className="px-6 py-4 text-center text-blue-600 font-bold text-lg">{String(voyage.months).padStart(2, '0')}</td>
                    <td className="px-6 py-4 text-center text-cyan-600 font-bold text-lg">{String(voyage.days).padStart(2, '0')}</td>
                    <td className="px-6 py-4 text-center">
                      <Button
                        onClick={() => deleteVoyage(voyage.id)}
                        size="sm"
                        variant="destructive"
                        className="hover:bg-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Helper Text */}
      <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
        <p className="text-gray-700 leading-relaxed">
          <strong>💡 Tip:</strong> Enter your ship name and the dates, then click "Calculate & Add Voyage" to add each trip. Each new trip will be added to the table so you can build your complete sea service record. Your total sea time updates automatically.
        </p>
      </div>
    </div>
  )
}
