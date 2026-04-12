"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SeatimeCalculator from "@/components/seatime-calculator"
import { Ship, Calculator, Info, BookOpen, CheckCircle, Globe, FileText, AlertCircle, TrendingUp } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function SeatimeCalculatorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
            Seatime Calculator — Accurate Sea Time Calculation for Seafarers
          </h1>
        </div>

        {/* Quick Answer Box */}
        <div className="mb-12 p-8 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl shadow-lg">
          <div className="flex items-start gap-4">
            <div className="bg-blue-600 text-white rounded-full p-3 flex-shrink-0">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <p className="text-gray-700 leading-relaxed text-lg">
                <strong>Quick Answer:</strong> Instantly calculate your total sea service in days and months with this free seatime calculator. Enter your vessel name, sign-on, and sign-off dates for each voyage to get a precise record. Perfect for DG Shipping (India), MCA (UK), USCG (USA), and STCW applications. Track multiple voyages, avoid errors, and submit your CoC applications confidently.
              </p>
            </div>
          </div>
        </div>

        {/* Main Calculator Card */}
        <div className="mb-12">
          <Card className="border-2 border-gray-200 shadow-xl">
            <CardHeader className="py-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                Seatime Calculator — Accurate Sea Time Calculation for Seafarers (DG Shipping, MCA, USCG & STCW)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <SeatimeCalculator />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="mb-12">
          <div className="space-y-8">
            {/* Introduction */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                Every seafarer's career depends on one critical number — total sea time. Whether you are a deck cadet counting months before your Second Mate CoC exam, an AB tracking days toward an OOW certificate, or a Captain verifying sea service for USCG license renewal, accurate seatime calculation is non-negotiable. One miscalculation means a delayed Certificate of Competency, a rejected application, or a missed career opportunity.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                This free seatime calculator online gives you a precise, date-by-date breakdown of sea service across multiple vessels. It works for DG Shipping seatime requirements in India, MCA seatime requirements in the UK, USCG sea time calculations in the USA, and all STCW-compliant administrations worldwide.
              </p>
            </div>

            {/* What Is a Seatime Calculator */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Ship className="w-8 h-8 text-teal-600" />
                What Is a Seatime Calculator?
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                A seatime calculator computes the total duration of a seafarer's service on board merchant vessels. You enter the vessel name, joining date, and leaving date for each ship. The calculator adds all service periods and gives your total sea time in months and days — the exact format required by maritime administrations globally.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                Seafarers know it by different names depending on their region:
              </p>
              <ul className="space-y-2 text-gray-700 text-lg ml-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                  <span><strong>Clyde Marine seatime calculator</strong> — popular UK-based tool using MCA's system</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                  <span><strong>DG Shipping seatime calculator</strong> — India-specific for MMD/DGS applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                  <span><strong>Seatime calculator MCA</strong> — for UK Maritime and Coastguard Agency applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                  <span><strong>Seatime calculator USCG</strong> — for US Coast Guard MMC applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                  <span><strong>Seatime calculator in days</strong> — for administrations requiring day-count format</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                  <span><strong>Onboard maritime seatime calculator</strong> — used by shipping companies and crewing managers</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed text-lg mt-4">
                All serve the same purpose — preventing errors in your sea service record that cost you time and career progression.
              </p>
            </div>

            {/* How to Use */}
            <div className="bg-white border-2 border-green-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <BookOpen className="w-8 h-8" />
                  How to Use This Seatime Calculator Online
                </h2>
              </div>
              <div className="p-8">
                <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                  Using this free seatime calculator takes under two minutes per voyage entry.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-5 bg-green-50 border-2 border-green-200 rounded-lg">
                    <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-lg">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Step 1 — Enter Vessel Name</h4>
                      <p className="text-gray-700">Type the ship name exactly as it appears on your Continuous Discharge Certificate (CDC) or sea service letter.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-green-50 border-2 border-green-200 rounded-lg">
                    <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-lg">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Step 2 — Enter Sign-On Date</h4>
                      <p className="text-gray-700">Use the exact date from your CDC. For MCA and DG Shipping use DD/MM/YYYY format. For USCG use MM/DD/YYYY. Never use your travel date to the port — always use your official joining date.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-green-50 border-2 border-green-200 rounded-lg">
                    <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-lg">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Step 3 — Enter Sign-Off Date</h4>
                      <p className="text-gray-700">Use the date on your official sign-off documentation. If your CDC shows a different date than your actual departure, always use the CDC date — that is what your administration verifies.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-green-50 border-2 border-green-200 rounded-lg">
                    <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-lg">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Step 4 — Click Calculate and Add All Voyages</h4>
                      <p className="text-gray-700">The calculator instantly shows that voyage duration and adds it to your running total. Repeat for every ship you have served on. Your complete sea service record builds automatically in a log table below.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-green-50 border-2 border-green-200 rounded-lg">
                    <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-lg">
                      5
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Step 5 — Verify Against Your Target Requirement</h4>
                      <p className="text-gray-700">Compare your total against the sea time requirement for the rank or certificate you are applying for. The sections below cover exact requirements for DG Shipping, MCA, and USCG.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* STCW Rules */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Globe className="w-8 h-8 text-purple-600" />
                Sea Time Calculation as per STCW — Key Rules Every Seafarer Must Know
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                The STCW Convention (1978, Manila Amendments 2010) sets the minimum sea time standards all signatory nations follow. Key calculation principles include:
              </p>
              <ul className="space-y-3 text-gray-700 text-lg ml-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                  <span><strong>Approved seagoing service</strong> counts only time on qualifying vessels — generally ocean-going or near-coastal trading vessels above the minimum GT specified for each rank.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                  <span><strong>Watchkeeping service</strong> is calculated separately from total sea service. Under MCA rules, every 4 hours of watchkeeping counts as 1 day of watchkeeping service on a cumulative basis. You need both figures for OOW applications — total voyage days and watchkeeping days are two different numbers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                  <span><strong>Cadet bonus credit</strong> applies under USCG rules — cadet service on Maritime Administration training ships counts at 1.5 days per actual day served.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                  <span><strong>Non-trading vessel service</strong> under DG Shipping counts at a 2/3 rate beyond the first six months of such service on non-trading vessels in foreign waters.</span>
                </li>
              </ul>
            </div>

            {/* DG Shipping Requirements */}
            <div className="bg-white border-2 border-orange-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-orange-600 to-yellow-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">DG Shipping Seatime Calculator — Sea Time Requirements for Indian Seafarers</h2>
              </div>
              <div className="p-8 space-y-6">
                <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-orange-600 mb-4">Sea Time Requirements for Deck Cadet (DG Shipping India)</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    DNS (Diploma in Nautical Science) cadets from IMU-affiliated institutes must complete:
                  </p>
                  <ul className="space-y-2 text-gray-700 ml-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                      <span><strong>Minimum 18 months</strong> of sea service to become eligible for the 4-month post-sea training course</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                      <span>After post-sea training, the cadet qualifies for the Second Mate (FG) CoC examination</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                      <span>Cadets completing a Structured Shipboard Training Programme (SSTP) receive a <strong>12-month remission</strong>, reducing the total requirement from 36 to 24 months</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
                      <span>Cadets without SSTP must complete <strong>36 months</strong> of sea time before sitting the Second Mate CoC exam</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-4 bg-orange-100 border-2 border-orange-300 rounded-lg">
                    <p className="text-gray-700 font-semibold">
                      <strong>Critical DG Shipping rule:</strong> At least half of total required sea service must be on foreign-going or coastal trading vessels of 3,000 GT and above engaged on voyages of 500 nautical miles or more. Additionally, six months of supervised navigational watchkeeping must be completed on such qualifying vessels. Log your vessel GT and trading area for every voyage in your seatime tracker — you will need this information at the MMD office.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* MCA Requirements */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Seatime Calculator MCA — Sea Time Requirements for UK Seafarers</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                The MCA's Sea Service Testimonial (SST) verification system is strict. A poorly documented application causes delays of up to 160 days in issuing your Notice of Eligibility (NoE). Accurate seatime calculation before submission is essential.
              </p>

              <div className="bg-white border-2 border-blue-200 rounded-xl p-6 mb-6">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">Sea Time Requirements for OOW 3000 GT (MCA)</h3>
                <ul className="space-y-2 text-gray-700 ml-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span><strong>12 months</strong> of approved seagoing service via an MNTB-approved Cadet Training Programme</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span><strong>36 months</strong> of qualifying sea service via the MCA Experienced Seafarer Route</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span>At least <strong>6 months</strong> of bridge watchkeeping documented for ratings seeking OOW certification from other categories</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    <span>All service must be in an approved Training Record Book (TRB) for cadetship routes</span>
                  </li>
                </ul>
              </div>

              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-6">
                <h3 className="text-2xl font-bold text-indigo-600 mb-4">Watchkeeping Service — MCA Cumulative Calculation</h3>
                <p className="text-gray-700 leading-relaxed">
                  MCA calculates watchkeeping service cumulatively. Every 4 hours of watchkeeping performed on a voyage counts as 1 day of watchkeeping service. Time at anchor during an active passage, while the officer maintains a bridge watch, also counts. Your total voyage days and your watchkeeping days are recorded and submitted separately to MCA.
                </p>
              </div>
            </div>

            {/* USCG Requirements */}
            <div className="bg-white border-2 border-red-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-red-600 to-pink-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">Seatime Calculator USCG — Sea Time Requirements for US Seafarers</h2>
              </div>
              <div className="p-8 space-y-6">
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-red-600 mb-4">Sea Time Requirements for Captain's License and 100 Ton Master (USCG)</h3>
                  <ul className="space-y-2 text-gray-700 ml-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                      <span><strong>100 Ton Master:</strong> 360 days of sea service, minimum 90 days on near-coastal or offshore waters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                      <span><strong>Master 200 GRT:</strong> 720 days of sea service, 360 days near-coastal or offshore</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                      <span><strong>Master 500/1600 GRT:</strong> 1,080 days with appropriate offshore qualification</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-pink-50 border-2 border-pink-200 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-pink-600 mb-4">Sea Time Requirements for Able Bodied Seaman (AB) — USCG</h3>
                  <ul className="space-y-2 text-gray-700 ml-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-pink-600 flex-shrink-0 mt-1" />
                      <span><strong>AB Special:</strong> 180 days of deck service</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-pink-600 flex-shrink-0 mt-1" />
                      <span><strong>AB Limited:</strong> 540 days on near-coastal, ocean, or Great Lakes waters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-pink-600 flex-shrink-0 mt-1" />
                      <span><strong>AB Unlimited:</strong> 1,080 days on ocean or near-coastal waters on vessels 100 GRT and above</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-pink-600 flex-shrink-0 mt-1" />
                      <span><strong>STCW Able Seafarer Deck:</strong> 360 days with a USCG-approved course, or 540 days via NVIC 14-14 Checklist</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-4 bg-pink-100 border-2 border-pink-300 rounded-lg">
                    <p className="text-gray-700 font-semibold">
                      <strong>USCG calculation rule:</strong> Great Lakes service counts day-for-day up to 100% of total requirement. Inland waters service counts day-for-day for up to 50% of total. STCW-applicable vessel service counts day-for-day regardless of waters.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Clyde Marine Comparison */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Clyde Marine Seatime Calculator vs This Tool</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                The Clyde seatime calculator (seatimecalculator.com) was built by Clyde Software for MCA-based sea time calculation. It uses the same join-date to leave-date methodology and remains widely used by UK seafarers. However, it has clear limitations:
              </p>
              <ul className="space-y-2 text-gray-700 text-lg ml-6 mb-4">
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-1" />
                  <span>Supports only MCA calculation — no DG Shipping or USCG modes</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-1" />
                  <span>Does not separate watchkeeping service from total sea service</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-1" />
                  <span>Does not flag whether a vessel qualifies under DG Shipping's 3,000 GT rule</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-1" />
                  <span>No mobile optimisation</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-1" />
                  <span>No data export or save function</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed text-lg">
                This seatime calculator online covers all major administrations — DG Shipping, MCA, and USCG — using the same core calculation logic as the Clyde tool while adding region-specific guidance.
              </p>
            </div>

            {/* Excel vs Online */}
            <div className="bg-white border-2 border-yellow-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Seatime Calculator Excel vs Online — Which Should You Use?</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                Many seafarers maintain a seatime calculator Excel spreadsheet. It works, but has real risks — date difference formulas break easily, cells get overwritten, and there is no mobile access on board.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                An online seatime calculator free tool eliminates formula errors, works on any device including mobile, and gives a clean record ready to verify against official requirements. Best practice: use Excel for ongoing tracking on board, and use this online calculator for final verification before any CoC or license application.
              </p>
            </div>

            {/* Seatime Tracker Tips */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-green-600" />
                Seatime Tracker — How to Maintain an Accurate Sea Service Record
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                Experienced seafarers follow these habits from their very first contract:
              </p>

              <div className="space-y-4">
                {[
                  { title: "Record each voyage immediately on sign-off", desc: "Do not wait until your CoC application. Shipping companies merge, close, or change names — your CDC is your primary evidence but a personal seatime tracker is your backup." },
                  { title: "Record exact dates, never approximate months", desc: "A five-day error can push you below a minimum threshold. Copy dates directly from your CDC." },
                  { title: "Note vessel GT and trading route", desc: "DG Shipping requires at least half your service on vessels of 3,000 GT and above. Log this for every voyage." },
                  { title: "Keep digital and physical copies", desc: "Scan every CDC page and sea service letter. Store them in cloud storage. Multiple seafarers have lost verified sea time to lost documents when applying for Master CoC." },
                ].map((tip, index) => (
                  <div key={index} className="p-5 bg-white border-2 border-green-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{tip.title}</h4>
                        <p className="text-gray-700">{tip.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Table */}
            <div className="bg-white border-2 border-indigo-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">Sea Time Requirements — Quick Reference Summary</h2>
              </div>
              <div className="p-8">
                <div className="overflow-x-auto">
                  <table className="w-full border-2 border-gray-300">
                    <thead className="bg-indigo-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Rank / Certificate</th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Administration</th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-300">Minimum Sea Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        { rank: "Deck Cadet (DNS + SSTP)", admin: "DG Shipping India", time: "18 months" },
                        { rank: "Deck Cadet (without SSTP)", admin: "DG Shipping India", time: "36 months" },
                        { rank: "OOW 3000 GT (cadetship)", admin: "MCA UK", time: "12 months" },
                        { rank: "OOW 3000 GT (experienced route)", admin: "MCA UK", time: "36 months" },
                        { rank: "AB Unlimited", admin: "USCG USA", time: "1,080 days" },
                        { rank: "STCW Able Seafarer Deck", admin: "USCG USA", time: "360 days (with course)" },
                        { rank: "Master 100 Ton", admin: "USCG USA", time: "360 days" },
                        { rank: "Master 200 GRT", admin: "USCG USA", time: "720 days" },
                      ].map((row, index) => (
                        <tr key={index} className="hover:bg-indigo-50">
                          <td className="px-6 py-4 text-gray-900 font-semibold">{row.rank}</td>
                          <td className="px-6 py-4 text-gray-700">{row.admin}</td>
                          <td className="px-6 py-4 text-gray-700 font-bold">{row.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How does the DG Shipping seatime calculator work?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Enter sign-on and sign-off dates for each vessel. The calculator totals your sea time in months and days. For DG Shipping applications, separately verify that at least half your sea time qualifies on vessels of 3,000 GT and above on voyages of 500 nautical miles or more.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How much sea time do I need for OOW 3000 GT under MCA?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Minimum 12 months via an MNTB-approved cadetship, or 36 months through the Experienced Seafarer Route.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How much sea time does USCG require for a 100-ton Master?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    360 days of sea service with at least 90 days on near-coastal or offshore waters.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is the sea time requirement for Able Bodied Seaman?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    USCG requires 180 days (AB Special), 540 days (AB Limited), or 1,080 days (AB Unlimited). STCW Able Seafarer Deck requires 360 days with an approved course.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Is this seatime calculator free?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Yes. This is a completely free seatime calculator online. No registration, no download, no fee required.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Can I use this calculator for DG Shipping, MCA, and USCG?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Yes. Select your region and the calculator outputs sea time in the format each administration requires — months and days for DG Shipping and MCA, total days for USCG.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is the difference between the Clyde Marine seatime calculator and this tool?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    The Clyde seatime calculator supports only MCA calculations. This tool supports DG Shipping, MCA, and USCG with guidance on qualifying vessel rules for each administration.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Final CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl p-8 text-center shadow-2xl">
              <h3 className="text-3xl font-bold mb-4">Ready to Calculate Your Sea Time?</h3>
              <p className="text-xl mb-6">
                Use this free seatime calculator before every CoC application. Calculate your exact total, verify your qualifying vessel service, and submit with confidence. Never estimate your sea time — always calculate it precisely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
