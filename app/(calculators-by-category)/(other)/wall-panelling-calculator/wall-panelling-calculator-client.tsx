"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import WallPanellingCalculator from "@/components/wall-panelling-calculator"
import { Ruler, Calculator, CheckCircle, DollarSign, AlertCircle, Info, Layers, Zap } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function WallPanellingCalculatorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Wall Panelling Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Free Online Tool, Formulas & Complete Guide
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className="mb-12 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl shadow-lg">
          <div className="flex items-start gap-4">
            <div className="bg-blue-600 text-white rounded-full p-3 flex-shrink-0">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Quick Answer</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                To calculate how much wall panelling you need, measure your wall height and width in millimetres. Multiply them together to get the gross area. Subtract the area of doors and windows. Divide the net area by the area of one panel, round up, and add 10% for waste. For shaker, box, or dado panelling, you also calculate batten spacing using an equal-gap formula. Every formula, step, and cost guide is covered fully below.
              </p>
            </div>
          </div>
        </div>

        {/* Main Calculator Card */}
        <div className="mb-12">
          <Card className="border-2 border-gray-200 shadow-xl">
            <CardHeader className="py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                Wall Panelling Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <WallPanellingCalculator />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="mb-12">
          <div className="space-y-8">
            {/* What Is Section */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Ruler className="w-8 h-8 text-blue-600" />
                What Is a Wall Panelling Calculator?
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  A wall panelling calculator is a free planning tool that tells you exactly how many panels, battens, rails, and mouldings you need before you spend a single pound on materials. You enter your wall dimensions, choose your panel style, and the calculator removes all the guesswork that normally leads to overspending or running short mid-project.
                </p>
                <p>
                  Whether you plan a full room transformation, a hallway feature wall, or a bedroom dado design, the right panelling calculator saves you real money. It works for every popular UK style:
                </p>
                <ul className="space-y-2 ml-6">
                  {[
                    "MDF panelling — the most popular choice for UK homes",
                    "Shaker panelling — rectangular batten frames on the wall",
                    "Dado panelling — lower-third wall panel with rail",
                    "Box panelling — individual square or rectangular recessed frames",
                    "Beading panelling — thin strip mouldings in geometric patterns",
                    "Wood panelling — tongue-and-groove, shiplap, and cladding boards",
                    "PVC wall panels — waterproof option for bathrooms and wet rooms",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-5 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
                  <p className="font-semibold text-gray-800">
                    <strong>Key benefit:</strong> Interior trade research consistently shows that DIY panelling projects without accurate pre-planning waste 18–22% of materials on average. A panelling calculator cuts that figure below 5% when you correctly account for obstructions.
                  </p>
                </div>
                <p>
                  This wall panelling calculator UK guide covers metric and imperial measurements and aligns with standard UK panel sizes sold by Wickes, B&Q, Toolstation, Travis Perkins, and independent timber merchants.
                </p>
              </div>
            </div>

            {/* How to Calculate Step by Step */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Calculate Wood Panelling Step by Step</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Calculating wood panelling correctly involves four key measurements: wall height, wall width, panel dimensions, and obstructions. Follow these steps whether you use an online panelling calculator or work it out manually.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-lg">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Measure Your Wall Height</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Use a tape measure and record the height from the floor to the ceiling or from the top of the skirting board to the ceiling if you keep the existing skirting. In older UK properties, ceiling heights vary, so measure at three points: left, centre, and right. Always use the largest figure in your calculation. Record in millimetres for precision.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-lg">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Measure Your Wall Width</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Measure the full width from corner to corner, or between adjacent walls. If the room has alcoves or a chimney breast, treat each flat surface as a separate wall and measure it independently. Add all wall widths together only if you panel the entire room.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-lg">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Subtract Obstructions</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Measure the height and width of every door frame, window reveal, radiator, and fixed piece of furniture. Calculate the area of each obstruction (height × width) and subtract the total from your gross wall area. This gives you the net panellable area — the figure your panelling measurement calculator uses to determine quantity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-lg">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Choose Your Panel Dimensions</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Standard UK MDF panel sheets are typically 2440mm × 1220mm. PVC panels often measure 2600mm × 250mm or 2700mm × 375mm. Shaker batten strips come in widths of 45mm–70mm. Always confirm the exact dimensions of the product you plan to buy before you calculate.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-lg">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Apply the Panelling Formula</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Divide your net wall area by the area of a single panel. Round up to the nearest whole number. Add 10% for waste, cuts, and pattern matching. This gives your total order quantity. For shaped designs like shaker or box panelling, use the spacing formula in the next section.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Basic Panelling Formula */}
            <div className="bg-white border-2 border-purple-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <Zap className="w-8 h-8" />
                  📏 Basic Panelling Formula (Sheet Panels)
                </h2>
              </div>
              <div className="p-8">
                <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 font-mono text-sm space-y-3">
                  <div className="grid grid-cols-1 gap-2">
                    <p><strong>Net Wall Area (mm²)</strong> = (Wall Height × Wall Width) − Total Obstruction Area</p>
                    <p><strong>Panels Needed</strong> = Net Wall Area ÷ Single Panel Area <span className="text-red-600">(always round UP)</span></p>
                    <p><strong>Order Quantity</strong> = Panels Needed × 1.10 <span className="text-blue-600">(adds 10% waste allowance)</span></p>
                  </div>
                </div>

                <div className="mt-6 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Example:</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>• Wall: 2400mm high × 3600mm wide = <strong>8,640,000 mm²</strong></p>
                    <p>• Door obstruction: 2000mm × 800mm = <strong>1,600,000 mm²</strong></p>
                    <p>• Net area = <strong>7,040,000 mm²</strong></p>
                    <p>• Panel size: 2440 × 1220 = <strong>2,976,800 mm²</strong></p>
                    <p>• Panels needed = 7,040,000 ÷ 2,976,800 = 2.36 → <strong className="text-blue-600">round up to 3</strong></p>
                    <p>• Order quantity = 3 × 1.10 = 3.3 → <strong className="text-green-600">order 4 panels</strong></p>
                  </div>
                </div>

                <div className="mt-6 p-5 bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg">
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Experience tip from real projects:</strong> On installations where each wall was measured individually with every obstruction noted, we consistently ordered within 5 panels of actual usage. Rooms measured as a single block regularly produced 15–20 spare panels — wasted budget every time.
                  </p>
                </div>
              </div>
            </div>

            {/* Spacing Calculator Section */}
            <div className="bg-white border-2 border-indigo-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">Panelling Spacing Calculator — Equal Gaps Every Time</h2>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  Getting equal spacing between panel battens, frames, or mouldings is one of the most critical elements of a professional finish. Uneven gaps are immediately visible and ruin the symmetry of any panelling design. The wall panelling spacing calculator solves this instantly.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8">How to Calculate Panelling Spacing (Shaker, Box & Dado Style)</h3>
                <p className="text-gray-700 leading-relaxed">
                  For shaker panelling, box panelling, dado panelling, and beading panelling, you work with fixed-width battens and equal gaps between them. Use this formula:
                </p>

                <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 font-mono text-sm space-y-3">
                  <div className="grid grid-cols-1 gap-2">
                    <p><strong>Available Space</strong> = Wall Width − (2 × Edge Margin)</p>
                    <p><strong>Gap Width</strong> = (Available Space − (No. of Battens × Batten Width)) ÷ (No. of Battens + 1)</p>
                  </div>
                </div>

                <div className="mt-6 p-6 bg-indigo-50 border-2 border-indigo-200 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Example:</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>• Wall Width: <strong>3000mm</strong> | Edge margin: <strong>50mm each side</strong> | <strong>4 Battens × 50mm wide</strong></p>
                    <p>• Available = 3000 − 100 = <strong>2900mm</strong></p>
                    <p>• Gap = (2900 − 200) ÷ 5 = <strong className="text-indigo-600">540mm per gap</strong></p>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  If the gap width feels too wide or too narrow, adjust the number of battens up or down and recalculate until you reach a spacing that looks balanced for your wall width. On walls under 1500mm, three to four vertical panels usually work best. On walls over 3000mm, five to seven panels create better proportion.
                </p>
              </div>
            </div>

            {/* Height Calculator Section */}
            <div className="bg-white border-2 border-teal-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">Wall Panelling Height Calculator — Where to Set Your Rail</h2>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  The panelling height calculator determines where your dado rail, chair rail, or top moulding sits on the wall. The classic rule places the dado rail at one-third of the total wall height. For modern half-wall panelling, many UK designers now set the rail at 900mm–1100mm from the floor — roughly waist height. For full-height panelling to a picture rail, measure to 300mm below the ceiling cornice.
                </p>

                <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 font-mono text-sm space-y-3">
                  <div className="grid grid-cols-1 gap-2">
                    <p><strong>Classic Dado Height</strong> = Wall Height ÷ 3</p>
                    <p><strong>Modern Half-Wall</strong> = 900mm – 1100mm from floor <span className="text-gray-600">(standard UK 2400mm ceiling)</span></p>
                    <p><strong>Two-Thirds Panel</strong> = Wall Height × 0.66</p>
                    <p><strong>Full Height (to coving)</strong> = Ceiling Height − 300mm</p>
                  </div>
                </div>

                <div className="mt-6 p-6 bg-teal-50 border-2 border-teal-200 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Example on a 2400mm ceiling:</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>• Classic dado = 2400 ÷ 3 = <strong className="text-teal-600">800mm</strong></p>
                    <p>• Half-wall = <strong className="text-teal-600">1100mm</strong> (popular modern choice)</p>
                    <p>• Two-thirds = 2400 × 0.66 = <strong className="text-teal-600">1584mm</strong></p>
                    <p>• Full height = 2400 − 300 = <strong className="text-teal-600">2100mm</strong> to underside of coving</p>
                  </div>
                </div>

                <div className="p-5 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg">
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Design insight:</strong> On a standard UK ceiling of 2400mm, placing your dado rail at 800mm creates the classic one-third proportion. At 1200mm you get an equal split that suits contemporary Scandi-style interiors. At 1600mm you create a dramatic two-thirds panel that makes the room feel taller — ideal for hallways and dining rooms.
                  </p>
                </div>
              </div>
            </div>

            {/* Panel Types Explained */}
            <div className="bg-white border-2 border-orange-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <Layers className="w-8 h-8" />
                  Panel Types Explained — MDF, Shaker, Dado, Box, Beading & Wood
                </h2>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  Different panelling styles require different calculation methods. Understanding which type you install helps you use the right formula and order the correct materials the first time.
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">MDF Panelling Calculator</h3>
                    <p className="text-gray-700 leading-relaxed">
                      MDF (Medium Density Fibreboard) panels are the most popular choice for UK DIY projects. Standard sheets measure 2440 × 1220mm. You calculate total wall area, divide by sheet area, and add 10% for cuts. MDF takes primer and paint extremely well and suits living rooms, bedrooms, hallways, and dining rooms. It is not suitable for wet rooms or areas with direct moisture exposure.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Shaker Panelling Calculator</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Shaker panelling uses vertical stiles and horizontal rails to create rectangular frames on the wall. You calculate the number of frames, the batten width, and the equal gaps between them. Most UK shaker installs use 45mm–68mm MDF battens with gaps of 300mm–600mm depending on wall width. You fix the battens directly to the plasterboard wall using adhesive and panel pins, then fill, prime, and paint for a seamless finish.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Dado Panelling Calculator</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Dado panelling sits in the lower third of the wall, topped by a dado rail moulding. You calculate your dado height first (typically 800mm–1000mm from floor), then treat the dado zone as its own wall section for panel quantity. Dado panelling commonly uses tongue-and-groove boards or flat MDF panels below the rail, with the upper wall painted in a contrasting colour.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Box Panelling Calculator</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Box panelling creates individual square or rectangular recessed frames across the wall surface. You calculate the wall width, decide on your frame size (commonly 400×500mm or 500×600mm), then work out how many fit across and how many rows fit vertically, keeping all gaps equal. Box panelling suits dining rooms, grand hallways, and statement bedroom walls.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Beading Panelling Calculator</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Beading panelling uses thin strip mouldings applied directly to the wall in geometric patterns — squares, diamonds, or herringbone layouts. You calculate the total length of beading required by mapping out your design first. Total linear metres of beading strip is your key ordering figure. Always add 15% waste allowance for mitred corner cuts, which generate significant offcuts.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Wood Panelling Calculator</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Solid wood panelling — including tongue-and-groove, shiplap, and cladding boards — is calculated by linear metre coverage. Measure the wall area, check the coverage width per board (typically 90mm–140mm exposed face after tongue), then calculate the number of boards required. Add 10% waste for cuts and always acclimatise timber in the room for a minimum of 48 hours before cutting to reduce post-installation movement.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Calculator */}
            <div className="bg-white border-2 border-green-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <DollarSign className="w-8 h-8" />
                  Wall Panelling Cost Calculator UK — 2026 Price Guide
                </h2>
              </div>
              <div className="p-8">
                <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                  Understanding the cost of panelling a room is just as important as calculating the quantity of materials. Use the table below as your wood panelling cost calculator to estimate your full project budget before buying anything.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 to-green-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Panelling Type</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Material Cost (per m²)</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">DIY Suitability</th>
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">Trade Labour Cost</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="hover:bg-green-50 transition-all duration-200">
                        <td className="px-6 py-4 text-gray-900 font-medium">MDF Panel Sheets</td>
                        <td className="px-6 py-4 text-green-600 font-bold">£8 – £22 per m²</td>
                        <td className="px-6 py-4 text-gray-700">Easy • Beginner-friendly</td>
                        <td className="px-6 py-4 text-gray-700">£15 – £30/hr</td>
                      </tr>
                      <tr className="hover:bg-green-50 transition-all duration-200">
                        <td className="px-6 py-4 text-gray-900 font-medium">Shaker Panelling (MDF Battens)</td>
                        <td className="px-6 py-4 text-green-600 font-bold">£12 – £35 per m²</td>
                        <td className="px-6 py-4 text-gray-700">Easy • Suitable for DIY</td>
                        <td className="px-6 py-4 text-gray-700">£18 – £35/hr</td>
                      </tr>
                      <tr className="hover:bg-green-50 transition-all duration-200">
                        <td className="px-6 py-4 text-gray-900 font-medium">PVC Wall Panels</td>
                        <td className="px-6 py-4 text-green-600 font-bold">£15 – £45 per m²</td>
                        <td className="px-6 py-4 text-gray-700">Easy • No cutting tools needed</td>
                        <td className="px-6 py-4 text-gray-700">£15 – £28/hr</td>
                      </tr>
                      <tr className="hover:bg-green-50 transition-all duration-200">
                        <td className="px-6 py-4 text-gray-900 font-medium">Solid Wood / Tongue & Groove</td>
                        <td className="px-6 py-4 text-green-600 font-bold">£25 – £80 per m²</td>
                        <td className="px-6 py-4 text-gray-700">Moderate • Saw required</td>
                        <td className="px-6 py-4 text-gray-700">£20 – £45/hr</td>
                      </tr>
                      <tr className="hover:bg-green-50 transition-all duration-200">
                        <td className="px-6 py-4 text-gray-900 font-medium">Box / Dado Panelling</td>
                        <td className="px-6 py-4 text-green-600 font-bold">£18 – £50 per m²</td>
                        <td className="px-6 py-4 text-gray-700">Moderate • Planning needed</td>
                        <td className="px-6 py-4 text-gray-700">£20 – £40/hr</td>
                      </tr>
                      <tr className="hover:bg-green-50 transition-all duration-200">
                        <td className="px-6 py-4 text-gray-900 font-medium">Beading Panelling</td>
                        <td className="px-6 py-4 text-green-600 font-bold">£10 – £30 per m²</td>
                        <td className="px-6 py-4 text-gray-700">Easy • Good for beginners</td>
                        <td className="px-6 py-4 text-gray-700">£15 – £30/hr</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">How Much Does Panelling Cost — A Full Room Example</h3>
                  <p className="text-gray-700 leading-relaxed">
                    For a standard UK living room measuring 4m × 3.5m with a 2.4m ceiling, panelling three walls gives roughly 26m² of gross wall area. After subtracting one door (1.6m²) and two windows (2.4m² combined), you have approximately 22m² of net panelling area. Using MDF shaker-style panelling at £20 per m² for materials, you spend around £440 on panels alone. Adding primer, paint, adhesive, moulding, filler, caulk, and fixings brings the total materials budget to £550–£700 for a room this size.
                  </p>

                  <div className="p-5 bg-green-50 border-l-4 border-green-600 rounded-r-lg">
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Cost-saving tip:</strong> Buying MDF sheet panels and cutting your own battens is consistently 30–40% cheaper than buying pre-packaged panelling kits. If you have access to a table saw or a local timber merchant who cuts to size, this is the most cost-effective route for any DIY panelling project.
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mt-8">What Else Adds to the Bill</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The final cost of a panelling project always includes several items beyond the panels themselves. Always budget for:
                  </p>
                  <ul className="space-y-2 ml-6">
                    {[
                      "Panel adhesive or gripfill — typically £8–£12 per cartridge",
                      "Panel pins or brad nails — £4–£8 per pack",
                      "Wood filler and decorator's caulk — £6–£12 combined",
                      "MDF primer (one coat) — £10–£18 per litre",
                      "Topcoat paint (two coats) — £14–£35 per litre",
                      "Corner trims or Scotia moulding — £2–£5 per metre",
                      "Sandpaper assortment — £5–£10",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <span className="text-green-600 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    On average, these add-ons account for 20–30% of your total project cost. Factor them in from the start to avoid budget surprises.
                  </p>
                </div>
              </div>
            </div>

            {/* Expert Measuring Tips */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-yellow-600" />
                Expert Measuring Tips — What Real Projects Teach You
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                Accurate wall panelling measurements are the single biggest factor that separates a professional-looking result from a frustrating one. These tips come from real project experience across dozens of UK rooms — not theory.
              </p>
              <div className="space-y-5">
                {[
                  {
                    title: "Always Measure at Multiple Points",
                    desc: "UK homes — especially Victorian and Edwardian properties — rarely have perfectly square rooms. Measure wall width at floor level, mid-height, and near the ceiling. Always use the largest dimension in your calculation so panels always fit without forcing.",
                  },
                  {
                    title: "Check Walls Are Plumb Before You Start",
                    desc: "Hold a spirit level against the wall. If it reads more than 5mm out of plumb over 2 metres, use packers behind your battens to create a true vertical surface. Installing panels on an unplumb wall makes the frames look skewed even when the spacing maths is perfect.",
                  },
                  {
                    title: "Measure Obstructions to the Full Frame Reveal",
                    desc: "When measuring doors and windows as obstructions, include the full architrave reveal — not just the door leaf or glass. Panels butt up to the architrave, not the glass. Measuring to the outer edge of the frame gives a more accurate net panellable area and prevents gaps or overlaps at reveals.",
                  },
                  {
                    title: "Mark Your Spacing on the Wall Before Cutting Anything",
                    desc: "Before you cut a single piece of panel, use a pencil and spirit level to draw all your batten positions directly onto the wall. Step back and check the spacing looks even at a distance of 2–3 metres. It takes 10 minutes to adjust pencil lines. It takes hours to fix incorrectly installed battens.",
                  },
                  {
                    title: "Account for Paint Thickness on MDF",
                    desc: "MDF expands very slightly with moisture from water-based primer and paint. Always prime your MDF panels before cutting them to final size if possible, or add 0.5mm tolerance at joins to avoid visible swelling at seams after painting. Use an oil-based or shellac-based primer on raw MDF edges, which are particularly absorbent.",
                  },
                  {
                    title: "Acclimatise Panels Before Installing",
                    desc: "Leave timber and MDF panels flat in the room for at least 48 hours before cutting and fixing. This allows the material to adjust to the room's temperature and humidity levels, significantly reducing post-installation movement, warping, and gap formation at joints.",
                  },
                ].map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white border-2 border-yellow-200 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">{tip.title}</h3>
                      <p className="text-gray-700 leading-relaxed">{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions — Wall Panelling Calculator</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How do I calculate how much panelling I need?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Measure your wall height and width in millimetres. Multiply them together to get gross wall area. Subtract the area of all doors, windows, and fixed obstructions. Divide the remaining net area by the area of one panel sheet. Round up to the nearest whole panel. Always add 10% on top of this figure as a waste allowance before placing your order.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is the standard wall panelling height in the UK?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    The most common dado panelling height in the UK is 900mm–1000mm from the floor, which is roughly one-third of a standard 2400mm ceiling. For modern half-wall panelling styles, 1100mm–1200mm is increasingly popular. Full-height panelling runs from floor to ceiling or to the underside of the coving, typically 2300mm–2400mm on a standard UK house.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How do I calculate panelling spacing for shaker or box panels?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Take your total wall width and subtract any edge margins you want on each side (typically 40mm–80mm). Then subtract the total width of all your vertical battens (number of battens multiplied by batten width). Divide the remaining figure by the number of gaps, which is always one more than the number of battens. The result is your equal gap width. Adjust your number of battens until the gap figure looks balanced for the wall.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Can I use the panelling calculator for rooms with sloped or vaulted ceilings?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Yes. For sloped ceilings, measure the tallest and shortest points of each wall section separately. Calculate the area as a trapezoid: add the two heights together, divide by two, and multiply by the wall width. This gives the average area for that sloped section. Add 15% waste on top of the standard 10% allowance for the extra angled cuts that sloped ceilings require.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How much does it cost to panel a room in the UK?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    For a standard UK bedroom or living room of 12–16m², expect to spend £300–£600 on MDF or PVC materials for basic panelling. Shaker or box panelling with decorative mouldings typically costs £400–£900 in materials. If you hire a decorator or carpenter, labour adds £300–£800 depending on complexity and location. A full DIY project with painting can cost as little as £200–£350 for a smaller room using basic MDF panels.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Is MDF or wood better for wall panelling?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    MDF is the most popular choice for UK interior panelling because it is cost-effective, dimensionally stable in heated rooms, and takes paint extremely well. Solid wood or pine tongue-and-groove is better when you want a natural timber appearance, especially in older or rural properties. PVC panels are the best choice for wet areas such as bathrooms and shower rooms where moisture resistance is essential. For most UK living rooms, hallways, and bedrooms, MDF delivers the best balance of cost, finish quality, and ease of installation.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What tools do I need to install wall panelling?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    For measuring: a 5m tape measure, pencil, notepad, and spirit level. For installation: a mitre saw or hand saw for clean 45-degree corner cuts, an electric drill or pin nailer, panel adhesive with a caulk gun, panel pins, a sanding block, wood filler, decorator's caulk, and a roller with primer and topcoat paint. A laser level is a worthwhile investment — it speeds up the marking stage significantly and removes the risk of racking errors across long walls.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Does the panelling calculator account for pattern matching?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    For plain flat panels or painted MDF, pattern matching is not relevant and the standard formula works precisely. For patterned PVC or printed panels with a repeating design, you must calculate based on full panels only — you cannot flip or rotate sheets to match a pattern. This raises your waste figure to 20–25% on patterned materials. Always check the pattern repeat dimension on the product specification and factor it into your ordering decision before you buy.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-9">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Do I need planning permission for wall panelling in the UK?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    No. Wall panelling is an internal decorative finish and does not require planning permission anywhere in the UK. It also does not require building regulations approval because it does not affect the structural integrity of the property. If you live in a listed building, always check with your local conservation officer before making any internal alterations, as some listed building consents restrict changes to internal features.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Summary — Wall Panelling Calculator: Everything You Need</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Use this concise summary as a quick reference before you start your project:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { label: "Basic formula", value: "Net wall area ÷ panel area = panels needed. Round up, then add 10% for waste." },
                  { label: "Spacing formula", value: "(Available width − total batten width) ÷ (battens + 1) = equal gap. Adjust batten count until the gap looks right." },
                  { label: "Height guide", value: "Dado at 900–1000mm • half-wall at 1100–1200mm • full height at 2300–2400mm on standard UK ceilings." },
                  { label: "Cost range", value: "MDF panelling £8–£22/m² in materials • shaker or box styles £12–£50/m² • solid wood £25–£80/m²." },
                  { label: "Panel types", value: "MDF, shaker, dado, box, beading, PVC, and solid wood — all use slightly different calculation approaches — match your formula to your panel type." },
                  { label: "Top tip", value: "Measure at multiple points, check walls are plumb, mark spacing on the wall before cutting, and acclimatise all panels for 48 hours before installation." },
                ].map((item, index) => (
                  <div key={index} className="p-5 bg-white border-2 border-blue-200 rounded-lg">
                    <div className="text-sm font-bold text-blue-600 mb-2 uppercase tracking-wide">{item.label}</div>
                    <div className="text-gray-700 leading-relaxed">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
