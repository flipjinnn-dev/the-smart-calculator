'use client'

import CandyWheel from '@/components/candy-wheel'

export default function CandyWheelClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Candy Wheel
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Can't decide which candy to pick? Spin the wheel — the randomizer instantly selects a candy for you in a fair and fun way.
          </p>
        </div>

        {/* Wheel Component */}
        <div className="mb-12">
          <CandyWheel />
        </div>

        {/* How To Use Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How To Use The Candy Wheel</h2>
          <p className="text-lg text-gray-700 mb-8">Three simple steps ready in under 20 seconds.</p>
          
          <div className="space-y-4 mb-8">
            <div className="bg-white p-5 rounded-xl border-l-4 border-pink-600 shadow-sm text-left">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Step 1 — Add Your Candies</h3>
              <p className="text-gray-700">
                Type candy names like gummy bears, chocolate bars, lollipops, sour candy, or custom prizes.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-xl border-l-4 border-purple-600 shadow-sm text-left">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Step 2 — Customize Your Wheel</h3>
              <p className="text-gray-700">
                Adjust colors and section sizes. Make rare candies harder to win by giving them smaller sections.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-xl border-l-4 border-blue-600 shadow-sm text-left">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Step 3 — Spin & Win</h3>
              <p className="text-gray-700">
                Click spin. The wheel randomly lands on one candy — fair, unbiased, and instant.
              </p>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
            <ul className="text-left space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✅</span>
                <span>100% Free — No sign-up needed</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✅</span>
                <span>Works on mobile, tablet & desktop</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600 font-bold">✅</span>
                <span>Unlimited spins — reset anytime</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Content Sections */}
        <div className="prose prose-lg max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Is a Candy Wheel?</h2>
          <p className="text-gray-700 mb-6">
            A Candy Wheel is a free online spinner that randomly selects a candy from your custom list. You add items, spin the wheel, and get a fair random result instantly.
          </p>
          <p className="text-gray-700 mb-6">
            It uses a probability-based system to ensure every candy has an equal chance of selection unless you customize the section sizes.
          </p>
          <p className="text-gray-700 mb-6">
            The system is widely used in classroom reward tools, carnival games, and interactive event setups making selection fair, fun, and engaging.
          </p>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Perfect for:</h3>
          <ul className="list-none pl-0 mb-8 text-gray-700 space-y-2">
            <li>🎂 Birthday parties</li>
            <li>🏫 Classroom reward activities</li>
            <li>🎪 Carnivals and school fairs</li>
            <li>🍫 Candy shop promotions</li>
            <li>🎉 Fundraising events</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">How The Randomizer System Works</h2>
          <p className="text-gray-700 mb-4">The Candy Wheel uses a simple probability system:</p>
          <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
            <li>The wheel is divided into equal 360° sections</li>
            <li>Each spin generates a completely random result</li>
            <li>No item is favored unless manually adjusted</li>
            <li>Every spin is independent of previous results</li>
          </ul>
          <p className="text-gray-700 mb-8">
            This creates a transparent and fair selection experience trusted in games, classrooms, and events.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">Types of Candy Wheels</h2>
          
          <div className="space-y-6 mb-8">
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Online Candy Wheel Spinner</h3>
              <p className="text-gray-700">
                A browser-based wheel you can use instantly no download required. Add candies, spin, and get results in seconds.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Candy Prize Wheel</h3>
              <p className="text-gray-700">
                A physical wheel used in fairs, shops, and events. Players spin and win prizes based on where the pointer lands.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-pink-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Candy Ferris Wheel Dispenser</h3>
              <p className="text-gray-700">
                A rotating candy display that holds real sweets. Spin and collect candy as it reaches the bottom fun and decorative.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Candy Bar Wheel</h3>
              <p className="text-gray-700">
                A prize wheel filled with candy bar names used in games, challenges, and tasting events.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">Best Candies To Add To Your Wheel</h2>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white border-2 border-gray-200 rounded-lg">
              <thead className="bg-gradient-to-r from-pink-100 to-purple-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-200">Candy Type</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-200">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 text-gray-700">Gummy bears & worms</td>
                  <td className="px-6 py-4 text-gray-700">All ages</td>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <td className="px-6 py-4 text-gray-700">Mini chocolate bars</td>
                  <td className="px-6 py-4 text-gray-700">Premium rewards</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 text-gray-700">Lollipops</td>
                  <td className="px-6 py-4 text-gray-700">Colorful visual appeal</td>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <td className="px-6 py-4 text-gray-700">Caramel chews</td>
                  <td className="px-6 py-4 text-gray-700">Unique prizes</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 text-gray-700">Sour candy packs</td>
                  <td className="px-6 py-4 text-gray-700">Fun challenges</td>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <td className="px-6 py-4 text-gray-700">Candy canes</td>
                  <td className="px-6 py-4 text-gray-700">Seasonal events</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-gray-700">Mystery candy packs</td>
                  <td className="px-6 py-4 text-gray-700">Jackpot rewards</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500 mb-8">
            <p className="text-gray-700">
              <strong>👉 Tip:</strong> Add one rare candy section to create excitement and suspense.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">Where People Use The Candy Wheel</h2>
          
          <div className="space-y-4 mb-8">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Classroom Reward System</h3>
              <p className="text-gray-700">
                Teachers use it to reward students for good behavior and achievements. It turns learning into a fun game.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Birthday Party Game</h3>
              <p className="text-gray-700">
                Guests take turns spinning and winning candy simple, fun, and fair for all ages.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Candy Shop Promotions</h3>
              <p className="text-gray-700">
                Shops use it to offer free candy, discounts, or surprise rewards to customers.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Carnival & Fair Booths</h3>
              <p className="text-gray-700">
                A popular attraction where visitors spin to win candy prizes in a transparent way.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">School Fundraising Events</h3>
              <p className="text-gray-700">
                Used to engage students while raising funds through paid spins and rewards.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">Candy Wheel vs Basic Random Picker</h2>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white border-2 border-gray-200 rounded-lg">
              <thead className="bg-gradient-to-r from-pink-100 to-purple-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-200">Feature</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-200">Candy Wheel</th>
                  <th className="px-6 py-3 text-left text-sm font-bold text-gray-900 border-b-2 border-gray-200">Basic Picker</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 text-gray-700">Visual spinning</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">✅ Yes</td>
                  <td className="px-6 py-4 text-red-600 font-semibold">❌ No</td>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <td className="px-6 py-4 text-gray-700">Fun experience</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">✅ High</td>
                  <td className="px-6 py-4 text-red-600 font-semibold">❌ Low</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 text-gray-700">Probability control</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">✅ Yes</td>
                  <td className="px-6 py-4 text-red-600 font-semibold">❌ No</td>
                </tr>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <td className="px-6 py-4 text-gray-700">Group engagement</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">✅ Strong</td>
                  <td className="px-6 py-4 text-red-600 font-semibold">❌ Weak</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 text-gray-700">Animations</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">✅ Yes</td>
                  <td className="px-6 py-4 text-red-600 font-semibold">❌ No</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-gray-700">Fairness display</td>
                  <td className="px-6 py-4 text-green-600 font-semibold">✅ Visible</td>
                  <td className="px-6 py-4 text-red-600 font-semibold">❌ Hidden</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mb-8">
            <p className="text-gray-700">
              <strong>👉</strong> Candy Wheel is better for games, events, and group fun.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced Features</h2>
          
          <div className="space-y-4 mb-8">
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-5 rounded-xl">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Probability Control</h3>
              <p className="text-gray-700">
                Adjust section sizes to control win chances. Smaller = rare, larger = common.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-5 rounded-xl">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Elimination Mode</h3>
              <p className="text-gray-700">
                Remove selected candies after each spin — perfect for structured games.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-pink-50 p-5 rounded-xl">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Candy Color Theme</h3>
              <p className="text-gray-700">
                Customize colors for better visuals and themed events.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-5 rounded-xl">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Share & Embed</h3>
              <p className="text-gray-700">
                Share your wheel or embed it on websites for promotions or classrooms.
              </p>
            </div>
          </div>

          {/* FAQs */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What is a Candy Wheel?</h3>
              <p className="text-gray-700">
                A Candy Wheel is a free online random spinner tool that lets you add candy names and spin to pick one instantly in a fair and fun way. It is commonly used in games, classrooms, and events.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How is Candy Wheel different from Candy Crush booster wheel?</h3>
              <p className="text-gray-700">
                A Candy Wheel is an external random selection tool, while the Candy Crush booster wheel is an in-game feature inside Candy Crush. The Candy Wheel allows full customization, whereas Candy Crush wheels are game-controlled rewards.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How do you get the jackpot on Candy Crush booster wheel?</h3>
              <p className="text-gray-700">
                The Candy Crush booster wheel jackpot is based on in-game random probability. There is no guaranteed method to win it, as each spin is controlled by the game's internal RNG (random number generator).
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How to win on Candy Crush booster wheel?</h3>
              <p className="text-gray-700">
                There is no fixed trick to win the booster wheel jackpot in Candy Crush. It is fully random, but playing daily may give you more chances to spin and receive rewards.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What does the coconut wheel do in Candy Crush?</h3>
              <p className="text-gray-700">
                The coconut wheel in Candy Crush is a special booster that creates striped candies when activated. It helps clear rows and columns faster during gameplay.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How to use the coconut wheel in Candy Crush?</h3>
              <p className="text-gray-700">
                You can use the coconut wheel by activating it during a level. It will roll across the board and turn candies into striped candies, helping you clear obstacles.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What is the coconut wheel in Candy Crush?</h3>
              <p className="text-gray-700">
                The coconut wheel is a special in-game booster in Candy Crush that transforms candies into striped effects to help complete levels faster.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How to play Candy Land wheel games?</h3>
              <p className="text-gray-700">
                Candy Land wheel games are simple spin-based games where players spin a wheel and land on different candy-themed rewards or actions. It is usually used for fun, parties, or classroom activities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
