'use client';

import { useEffect, useState } from 'react';
import { useWheelSpinnerStore } from '@/lib/stores/wheel-spinner-store';
import { ModernWheelSpinner } from '@/components/games/wheel-spinner/ModernWheelSpinner';
import { EditorPanel } from '@/components/games/wheel-spinner/EditorPanel';
import { SettingsPanel } from '@/components/games/wheel-spinner/SettingsPanel';
import { Menu, X, Share2, Calendar, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const AGE_RANGES = [
  '5', '10', '15', '20', '25', '30', '35', '40', '45', '50',
  '55', '60', '65', '70', '75', '80'
];

export default function AgeGeneratorWheelClient() {
  const { theme, loadFromLocalStorage, slices, settings, importSlices, updateSlice } = useWheelSpinnerStore();
  const [showEditor, setShowEditor] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    loadFromLocalStorage();
    
    if (!isInitialized) {
      const ageSlices = AGE_RANGES.map((age, index) => ({
        id: `age-${index}`,
        label: age,
        color: getAgeColor(index),
        textColor: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Arial',
        fontWeight: 'bold' as const,
        fontStyle: 'normal' as const,
      }));
      
      importSlices(ageSlices);
      setIsInitialized(true);
    }
  }, [loadFromLocalStorage, isInitialized, importSlices]);

  const getAgeColor = (index: number) => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
      '#FFD93D', '#6BCF7F', '#A8E6CF', '#FF8B94', '#C7CEEA',
      '#B4A7D6', '#89CFF0', '#F4A460', '#DDA0DD', '#87CEEB',
      '#FFB6C1'
    ];
    return colors[index % colors.length];
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setShowEditor(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleShare = () => {
    const data = {
      slices,
      settings,
    };
    const encoded = btoa(JSON.stringify(data));
    const url = `${window.location.origin}${window.location.pathname}?data=${encoded}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Age Generator Wheel',
        text: 'Check out my age generator wheel!',
        url: url,
      }).catch(() => {
        copyToClipboard(url);
      });
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Link copied to clipboard!');
    });
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-100 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900 transition-colors duration-200">
        <header className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-b border-blue-300 dark:border-gray-700 sticky top-0 z-40 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowEditor(!showEditor)}
                  className="p-2 bg-blue-200 dark:bg-blue-900 rounded-lg hover:bg-blue-300 dark:hover:bg-blue-800 md:hidden transition-colors shadow-sm"
                >
                  {showEditor ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-md">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      Age Generator Wheel
                    </h1>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Spin to Get Random Age</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 md:p-3 bg-blue-100 dark:bg-blue-900 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors shadow-sm"
                  title="Share Wheel"
                >
                  <Share2 size={20} className="md:w-6 md:h-6 text-blue-700 dark:text-blue-200" />
                </button>
                <SettingsPanel />
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {showEditor && (
            <div className={`${
              isMobile 
                ? 'fixed inset-0 top-[73px] z-30 bg-white dark:bg-gray-800' 
                : 'w-96 flex-shrink-0'
            }`}>
              <EditorPanel />
            </div>
          )}

          <div className="flex-1 overflow-auto">
            <div className="max-w-6xl mx-auto py-8 px-4">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                  <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-300">
                    Spin to Generate a Random Age
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                  Random Age Picker
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Use the age generator wheel to randomly select an age within your chosen range. Perfect for games, activities, and creative prompts.
                </p>
              </div>

              <ModernWheelSpinner />

              <div className="mt-16 prose prose-lg dark:prose-invert max-w-none">
                <article className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-xl">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <Calendar className="w-8 h-8 text-blue-600" />
                    Age Generator Wheel | Spin to Generate a Random Age Instantly
                  </h2>
                  
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    Age Generator Wheel is a free, interactive online tool that lets you spin a virtual wheel to randomly generate an age within a selected range. Also known as an age calculator wheel, age random wheel, or wheel of age generator, this tool is perfect for games, classroom activities, writing prompts, icebreakers, and fun challenges. Simply set your age range, spin the wheel, and get an instant random result.
                  </p>

                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 mb-8 border-l-4 border-blue-500">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      What Is the Age Generator Wheel?
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      The age generator wheel is a digital spinning wheel that randomly selects an age based on your chosen parameters. It functions like a random age generator wheel, combining randomness algorithms with an interactive spinning interface.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 font-semibold mb-3">
                      Many users also call it:
                    </p>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Age generator spin the wheel</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Age number wheel</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Age wheel picker</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Age range wheel</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Generator wheel number</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Wheel of age generator</span>
                      </li>
                    </ul>
                    <p className="text-gray-700 dark:text-gray-300 mt-4">
                      At its core, the tool uses randomized number generation to simulate fair probability distribution similar to tools like Wheel of Names.
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                    How the Age Generator Spin the Wheel Works
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    The age wheel operates in three simple steps:
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex gap-4 items-start bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          Select Age Range
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          Choose a minimum and maximum age (e.g., 5–80).
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                      <div className="flex-shrink-0 w-10 h-10 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          Customize Wheel (Optional)
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          Adjust segments, colors, labels, or animation speed.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                      <div className="flex-shrink-0 w-10 h-10 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          Spin the Wheel
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          Click to spin and let the generator wheel number algorithm select a random age.
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-8">
                    Behind the scenes, the tool uses a pseudorandom number generator (PRNG) to ensure unbiased outcomes across all wheel segments.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                    Key Features of the Random Age Generator Wheel
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">🎡</span>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                          Custom Age Range Wheel
                        </h4>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">
                        Set specific age brackets:
                      </p>
                      <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                        <li>• Kids (5–12)</li>
                        <li>• Teens (13–19)</li>
                        <li>• Adults (20–60)</li>
                        <li>• Seniors (60+)</li>
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-cyan-500">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">🔢</span>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                          Age Number Wheel Flexibility
                        </h4>
                      </div>
                      <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• Equal distribution probabilities</li>
                        <li>• Manual input of custom ages</li>
                        <li>• Add or remove numbers dynamically</li>
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-teal-500">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">🧩</span>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                          Multi-Purpose Generator Wheel Name Support
                        </h4>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        Want more than numbers? Some versions allow:
                      </p>
                      <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                        <li>• Switching from generator wheel number mode to generator wheel name</li>
                        <li>• Creating a mini wheel of names for party games or classroom selection</li>
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-indigo-500">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">📱</span>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                          Mobile-Friendly & Instant Results
                        </h4>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        Optimized for:
                      </p>
                      <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                        <li>• Smartphones</li>
                        <li>• Tablets</li>
                        <li>• Desktop browsers</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                    Use Cases for the Age Wheel Picker
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">🎲</span>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                          Party Games
                        </h4>
                      </div>
                      <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• "Act Your Age" challenges</li>
                        <li>• Random age role-play</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">📚</span>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                          Classroom Activities
                        </h4>
                      </div>
                      <ul className="space-y-1 text-gray-700 dark:text-gray-300">
                        <li>• History timeline guessing games</li>
                        <li>• Age-based math exercises</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">✍️</span>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                          Creative Writing Prompts
                        </h4>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        Generate a character's age instantly for storytelling.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">🎥</span>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                          Social Media Trends
                        </h4>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        Use it alongside tools like a how old do I look generator for comparison-based content and audience engagement.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                    Age Generator Wheel vs. Age Calculator Wheel
                  </h3>

                  <div className="overflow-x-auto mb-8">
                    <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                      <thead>
                        <tr className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                          <th className="px-6 py-4 text-left font-bold">Feature</th>
                          <th className="px-6 py-4 text-left font-bold">Age Generator Wheel</th>
                          <th className="px-6 py-4 text-left font-bold">Age Calculator Wheel</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            Purpose
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                            Random age selection
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                            Calculates real age
                          </td>
                        </tr>
                        <tr className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            Input Needed
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                            Optional range
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                            Date of birth
                          </td>
                        </tr>
                        <tr className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            Randomized
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                            ✅ Yes
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                            ❌ No
                          </td>
                        </tr>
                        <tr className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            Best For
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                            Games & fun
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                            Accurate age math
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-8 italic">
                    If you need to calculate your exact age from birthdate, an age calculator tool is better. If you want random results for fun or activities, the random age generator wheel is ideal.
                  </p>

                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 mb-8 border-l-4 border-blue-500">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Related Tools
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      The wheel of age generator belongs to a broader category of interactive randomization tools, such as:
                    </p>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Prize wheels</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Decision wheels</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Name pickers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Classroom randomizers</span>
                      </li>
                    </ul>
                    <p className="text-gray-700 dark:text-gray-300 mt-4">
                      Tools like Picker Wheel offer similar spinning mechanics but may focus on names or prizes instead of ages.
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                    Why Use an Age Random Wheel?
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">✔</span>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                          Fair & Unbiased Randomization
                        </h4>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        Ensures equal chance for every number in the selected age range.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">✔</span>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                          Easy Customization
                        </h4>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        Adapt the age wheel to any scenario.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">✔</span>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                          Fast & Engaging
                        </h4>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        Interactive spinning animation increases user engagement.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">✔</span>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                          Safe & Anonymous
                        </h4>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        No personal data required unless using an age calculator feature.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                    Frequently Asked Questions (FAQs)
                  </h3>

                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        1. What is an age generator wheel?
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        An age generator wheel is a digital spinning tool that randomly selects an age within a chosen range.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-cyan-500">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        2. Is the random age generator wheel truly random?
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Yes. It uses pseudorandom number generation to ensure fair distribution across all segments.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-teal-500">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        3. Can I customize the age range wheel?
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Absolutely. You can define minimum and maximum ages or manually enter specific numbers.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-indigo-500">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        4. What is the difference between generator wheel number and generator wheel name?
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        Generator wheel number selects numeric values (like ages).
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Generator wheel name selects names, similar to a wheel of names tool.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        5. Is this the same as a how old do I look generator?
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        No. A how old do I look generator estimates age based on appearance (often using AI). The age generator spin the wheel randomly selects an age without analyzing photos.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-pink-500">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        6. Can teachers use the age wheel picker in class?
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Yes. It's ideal for interactive lessons, probability demonstrations, and engagement activities.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-8 mb-8 mt-12">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Best Practices for Using the Age Wheel
                    </h3>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1 font-bold">•</span>
                        <span>Keep your age range realistic for your purpose.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1 font-bold">•</span>
                        <span>Avoid extremely wide ranges if you want meaningful results.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1 font-bold">•</span>
                        <span>Combine with storytelling, challenges, or decision-making games.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1 font-bold">•</span>
                        <span>For probability learning, demonstrate how changing segments affects odds.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl p-8 mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Final Summary
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      The Age Generator Wheel is a customizable, interactive age random wheel that allows users to spin and instantly generate a random age. Whether you call it an age calculator wheel, wheel of age generator, age number wheel, or age wheel picker, it's a fun and practical tool for games, classrooms, content creation, and social media trends. With flexible age ranges, fair randomization, and optional name-based modes similar to a wheel of names, it delivers fast, unbiased results in a simple spin.
                    </p>
                  </div>

                  <div className="mt-12 mb-8">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white text-center shadow-xl">
                      <h3 className="text-2xl font-bold mb-3">🔗 Related Wheel Games</h3>
                      <p className="mb-4 opacity-90">Explore more exciting wheel spinner games!</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <Link 
                          href="/games/anime-character-wheel"
                          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg px-4 py-3 transition-all transform hover:scale-105 font-semibold"
                        >
                          Anime Character Wheel
                        </Link>
                        <Link 
                          href="/games/aesthetic-wheel-spinner"
                          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg px-4 py-3 transition-all transform hover:scale-105 font-semibold"
                        >
                          Aesthetic Wheel
                        </Link>
                        <Link 
                          href="/games/animal-wheel-spinner"
                          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg px-4 py-3 transition-all transform hover:scale-105 font-semibold"
                        >
                          Animal Wheel
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 text-white text-center">
                    <h3 className="text-2xl font-bold mb-4">
                      Ready to Generate Random Ages?
                    </h3>
                    <p className="text-lg mb-6 opacity-90">
                      Spin the wheel above and discover your random age instantly!
                    </p>
                    <div className="flex justify-center">
                      <Link 
                        href="/games"
                        className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        Explore More Games
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>

        {!showEditor && isMobile && (
          <button
            onClick={() => setShowEditor(true)}
            className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full shadow-2xl hover:shadow-3xl z-30 transform hover:scale-110 transition-all"
          >
            <Menu size={24} />
          </button>
        )}
      </div>
    </div>
  );
}
