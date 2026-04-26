'use client'

import ChoreWheel from '@/components/chore-wheel'

export default function ChoreWheelClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Wheel Of Chores
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Stop arguing over chores. Spin the wheel — the randomizer system decides fairly, every time.
          </p>
        </div>

        {/* Wheel Component */}
        <div className="mb-12">
          <ChoreWheel />
        </div>

        {/* How To Use Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How To Use This Wheel Of Chores</h2>
          <p className="text-lg text-gray-700 mb-8">Three steps. Done in 30 seconds.</p>
          
          <div className="space-y-4 mb-8">
            <div className="bg-white p-5 rounded-xl border-l-4 border-blue-600 shadow-sm text-left">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Step 1 — Add Names</h3>
              <p className="text-gray-700">
                Type in every person's name kids, adults, or roommates.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-xl border-l-4 border-green-600 shadow-sm text-left">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Step 2 — Add Your Chores</h3>
              <p className="text-gray-700">
                Enter tasks like dishes, vacuuming, laundry, trash, or mopping.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-xl border-l-4 border-purple-600 shadow-sm text-left">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Step 3 — Spin The Wheel</h3>
              <p className="text-gray-700">
                Hit spin. The decision wheel mechanism assigns every chore through a probability-fair randomizer, no human bias, no arguments, no excuses.
              </p>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="prose prose-lg max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Is a Wheel Of Chores?</h2>
          <p className="text-gray-700 mb-6">
            A Wheel Of Chores is a free digital chore wheel and online spinning randomizer that assigns household tasks to family members, roommates, or adults. You add names and chores, spin the wheel, and every person gets a fair task instantly.
          </p>
          <p className="text-gray-700 mb-6">
            The tool uses a probability fairness system every person has an equal statistical chance of landing on any chore. This removes human decision-making from the equation entirely, which is exactly why families, roommates, and educators trust it.
          </p>
          <p className="text-gray-700 mb-6">
            Used across behavior management systems, family productivity methods, and education-based chore programs, the Wheel Of Chores is more than a game it is a proven household management tool.
          </p>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Works perfectly for:</h3>
          <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
            <li>Families with kids</li>
            <li>Couples and partners</li>
            <li>Roommates in shared apartments</li>
            <li>Office and workplace teams</li>
            <li>College dorms and student housing</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">How The Randomizer System Works</h2>
          <p className="text-gray-700 mb-4">
            Most people think a chore wheel is just a spinner. It is actually a decision wheel mechanism built on equal probability distribution.
          </p>
          <p className="text-gray-700 mb-4">Here is what happens when you spin:</p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>The wheel divides 360 degrees equally across all entered chores</li>
            <li>Each spin generates a random landing point with equal probability fairness</li>
            <li>No chore or person gets weighted higher than another</li>
            <li>Every new spin resets the randomizer — past results never influence future spins</li>
          </ul>
          <p className="text-gray-700 mb-8">
            This is the same randomizer system used in classroom name pickers, team assignment tools, and workplace task managers. Applied to household chores, it creates a system everyone trusts because no human made the decision.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">Chore Ideas To Add To Your Spin Wheel Chore Chart</h2>
          <p className="text-gray-700 mb-6">
            Not sure what chores to enter? Use these ready-made lists for your spin wheel chore chart:
          </p>

          <div className="space-y-6 mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Chores for Kids (Ages 6–9)</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Make the bed</li>
                <li>Put toys away</li>
                <li>Feed pets</li>
                <li>Set the dinner table</li>
                <li>Sort laundry by color</li>
                <li>Water the plants</li>
                <li>Wipe kitchen counters</li>
                <li>Sweep the floor</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Chores for Adults</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Deep clean bathrooms</li>
                <li>Mop all floors</li>
                <li>Cook weekly meal prep</li>
                <li>Grocery shopping</li>
                <li>Take out trash and recycling</li>
                <li>Vacuum the house</li>
                <li>Change bed linens</li>
                <li>Yard work and garden</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Chores for Roommates</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                <li>Clean shared bathroom</li>
                <li>Wipe kitchen surfaces</li>
                <li>Take out trash</li>
                <li>Vacuum living room</li>
                <li>Mop hallway and kitchen</li>
                <li>Clean stovetop</li>
                <li>Restock household supplies</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Families, Educators & Roommates Trust This Tool</h2>
          
          <div className="space-y-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Probability Fairness — No Bias Possible</h3>
              <p className="text-gray-700">
                The decision wheel mechanism distributes chores with equal probability. Every spin is statistically fair. No person can claim the system favors someone else — the randomizer system does not have favorites.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Backed by Behavior Management Research</h3>
              <p className="text-gray-700">
                Child development experts and behavior management systems consistently recommend task rotation for building responsibility in children. The Wheel Of Chores applies this principle digitally making it accessible to every household.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Used in Family Productivity Methods</h3>
              <p className="text-gray-700">
                Family productivity methods like chore rotation, reward-based task systems, and visual accountability charts all rely on the same core idea visible, fair, and rotating assignments. This tool combines all three in one free spinner.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Part of Education-Based Chore Systems</h3>
              <p className="text-gray-700">
                Teachers and parents who use education-based chore systems report higher task completion rates when children participate in the assignment process. Letting kids spin the wheel gives them agency they chose their chore, the wheel just confirmed it.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">Chore Wheel Generator Online — Build Your Custom Wheel</h2>
          <p className="text-gray-700 mb-6">
            Our chore wheel generator online lets you create a fully personalized wheel in under 60 seconds. No templates, no restrictions — you enter exactly what works for your household.
          </p>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Customization options:</h3>
          <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
            <li>Add 2 to 20+ names</li>
            <li>Enter any chore standard or custom</li>
            <li>Adjust wheel segments automatically</li>
            <li>Spin unlimited times</li>
            <li>Print your printable chore wheel after each spin</li>
          </ul>
          <p className="text-gray-700 mb-8">
            This is the most flexible digital chore wheel available no account, no payment, no limits.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">Printable Chore Wheel — Take It Offline</h2>
          <p className="text-gray-700 mb-6">
            Prefer something physical? After spinning, print your printable chore wheel directly from the tool. Stick it on the fridge, pin it to the noticeboard, or laminate it for weekly reuse.
          </p>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Your printable chore wheel includes:</h3>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Each person's name clearly labeled</li>
            <li>Their assigned chore for the week</li>
            <li>A checkbox for task completion tracking</li>
            <li>Space for a reward note if you use incentives</li>
          </ul>
          <p className="text-gray-700 mb-8">
            The printable chore wheel works as a standalone weekly reference — no screen needed after you print.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">Wheel Of Chores for Kids</h2>
          <p className="text-gray-700 mb-6">
            A spin wheel chore chart for kids turns cleaning into a game with real developmental benefits. Education-based chore systems show that children who participate in chore assignment like spinning a wheel themselves develop stronger responsibility habits than children given fixed chore lists.
          </p>
          <p className="text-gray-700 mb-6">
            When children spin the wheel, they feel ownership over their task. That ownership drives completion.
          </p>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Make it even more effective with a reward system:</h3>
          <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
            <li>30 minutes extra screen time</li>
            <li>Choose Friday's family movie</li>
            <li>A small treat from the snack drawer</li>
            <li>Points toward a monthly reward</li>
          </ul>
          <p className="text-gray-700 mb-8">
            The combination of a digital chore wheel plus a reward structure is the most effective behavior management approach for household chores in children aged 5–12.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">Wheel Of Chores for Roommates</h2>
          <p className="text-gray-700 mb-6">
            Shared living works better with a system everyone trusts. The chore wheel generator online removes personal bias from shared space management completely.
          </p>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Set it up in 60 seconds:</h3>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Add all roommate names</li>
            <li>Enter shared space chores kitchen, bathroom, hallway, living room</li>
            <li>Spin every Sunday using the randomizer system</li>
            <li>Print the printable chore wheel and post it in the kitchen</li>
            <li>Set a Friday completion deadline</li>
          </ul>
          <p className="text-gray-700 mb-8">
            The decision wheel mechanism makes the assignment not a person. That one shift removes 90% of roommate chore conflict.
          </p>

          {/* FAQs */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Is the Wheel Of Chores free?</h3>
              <p className="text-gray-700">
                Yes 100% free. No sign-up, no download, no payment. Open the tool and start using your chore wheel generator online immediately.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How does the randomizer system work?</h3>
              <p className="text-gray-700">
                The tool uses a probability fairness algorithm that divides the wheel into equal segments. Every spin has an equal chance of landing on any chore no weighting, no patterns, no bias.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Can I print my chore wheel?</h3>
              <p className="text-gray-700">
                Yes. Print your printable chore wheel directly after spinning. It shows each person's assigned task and includes a completion checkbox for the week.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Is this a digital chore wheel or a physical one?</h3>
              <p className="text-gray-700">
                It is a digital chore wheel that you use online but you can print the result and use it as a physical reference all week.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How often should I spin?</h3>
              <p className="text-gray-700">
                Spin every Sunday evening. Weekly rotation through your spin wheel chore chart gives everyone enough time to complete tasks without daily confusion.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Does it work on mobile?</h3>
              <p className="text-gray-700">
                Yes the chore wheel generator online works on all devices. No app download needed.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Is this used in schools or behavior programs?</h3>
              <p className="text-gray-700">
                Yes. The rotation-based assignment model this tool uses is a core part of education-based chore systems and behavior management systems recommended by child development professionals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
