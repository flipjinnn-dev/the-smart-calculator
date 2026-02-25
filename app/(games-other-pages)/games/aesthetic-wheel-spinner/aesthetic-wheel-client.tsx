'use client';

import { useEffect, useState } from 'react';
import { useWheelSpinnerStore } from '@/lib/stores/wheel-spinner-store';
import { ModernWheelSpinner } from '@/components/games/wheel-spinner/ModernWheelSpinner';
import { EditorPanel } from '@/components/games/wheel-spinner/EditorPanel';
import { SettingsPanel } from '@/components/games/wheel-spinner/SettingsPanel';
import { Menu, X, Share2, Palette, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const AESTHETIC_STYLES = [
  'Grunge', 'Soft Girl', 'Clean Girl', 'Dark Academia', 'Fairycore',
  'Cottagecore', 'Y2K', 'Minimalist', 'Vintage', 'Streetwear',
  'Indie', 'E-Girl', 'Preppy', 'Boho', 'Gothic'
];

export default function AestheticWheelClient() {
  const { theme, loadFromLocalStorage, slices, settings, importSlices, updateSlice } = useWheelSpinnerStore();
  const [showEditor, setShowEditor] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    loadFromLocalStorage();
    
    if (!isInitialized) {
      const aestheticSlices = AESTHETIC_STYLES.map((style, index) => ({
        id: `aesthetic-${index}`,
        label: style,
        color: getAestheticColor(index),
        textColor: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Arial',
        fontWeight: 'bold' as const,
        fontStyle: 'normal' as const,
      }));
      
      importSlices(aestheticSlices);
      setIsInitialized(true);
    }
  }, [loadFromLocalStorage, isInitialized, importSlices]);

  const getAestheticColor = (index: number) => {
    const colors = [
      '#8B4789', '#FFB6C1', '#E6E6FA', '#2C3E50', '#DDA0DD',
      '#98D8C8', '#FF69B4', '#B0E0E6', '#D2691E', '#696969',
      '#F4A460', '#9370DB', '#4682B4', '#DEB887', '#483D8B'
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
        title: 'Aesthetic Wheel Spinner',
        text: 'Check out my aesthetic wheel!',
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
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 transition-colors duration-200">
        <header className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-b border-purple-300 dark:border-gray-700 sticky top-0 z-40 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowEditor(!showEditor)}
                  className="p-2 bg-purple-200 dark:bg-purple-900 rounded-lg hover:bg-purple-300 dark:hover:bg-purple-800 md:hidden transition-colors shadow-sm"
                >
                  {showEditor ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-md">
                    <Palette className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Aesthetic Wheel
                    </h1>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Discover Your Style</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 md:p-3 bg-purple-100 dark:bg-purple-900 rounded-full hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors shadow-sm"
                  title="Share Wheel"
                >
                  <Share2 size={20} className="md:w-6 md:h-6 text-purple-700 dark:text-purple-200" />
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
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900 rounded-full mb-4">
                  <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-300" />
                  <span className="text-sm font-semibold text-purple-600 dark:text-purple-300">
                    Spin to Discover Your Aesthetic
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                  Find Your Perfect Style
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Let the wheel decide your next aesthetic adventure. From Grunge to Fairycore, discover styles that inspire you.
                </p>
              </div>

              <ModernWheelSpinner />

              <div className="mt-16 prose prose-lg dark:prose-invert max-w-none">
                <article className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-xl">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <Palette className="w-8 h-8 text-purple-600" />
                    Aesthetic Wheel: A Practical, Creative Tool
                  </h2>
                  
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    An <strong>Aesthetic Wheel</strong> is an interactive tool that helps you randomly select a style, theme, color palette, outfit idea, name, or mood. Instead of overthinking decisions, you use a spinner-style generator to spark creativity, plan content, design spaces, or even guide gameplay in The Sims 4. When used properly, it's a genuinely helpful creative decision-making tool — not just internet entertainment.
                  </p>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 mb-8 border-l-4 border-purple-500">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      What Is an Aesthetic Wheel (In Simple Terms)?
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      An Aesthetic Wheel is a digital spinning wheel filled with different styles or themes. You click "spin," and it randomly selects one option for you.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 font-semibold mb-3">
                      It's commonly used for:
                    </p>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">✓</span>
                        <span>Outfit planning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">✓</span>
                        <span>Room decor ideas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">✓</span>
                        <span>Content creation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">✓</span>
                        <span>Mood board inspiration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">✓</span>
                        <span>Branding concepts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">✓</span>
                        <span>Character design</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 mt-1">✓</span>
                        <span>Creative writing prompts</span>
                      </li>
                    </ul>
                    <p className="text-gray-700 dark:text-gray-300 mt-4 italic">
                      Instead of scrolling endlessly for ideas, the wheel gives you a starting direction.
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                    Why It's Actually Useful
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Most people think it's just a TikTok trend. But the real value lies in <strong>decision reduction</strong> and <strong>creativity triggering</strong>.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">Here's how it helps:</p>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-purple-100 dark:border-purple-900">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
                        <span className="text-2xl">🎯</span>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        1. Reduces Decision Fatigue
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Too many options can block creativity. A wheel forces a choice, which helps you move forward faster.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-pink-100 dark:border-pink-900">
                      <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mb-4">
                        <span className="text-2xl">✨</span>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        2. Sparks Unexpected Combinations
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        If you spin twice, you might combine:
                      </p>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• Minimalist + Cottagecore</li>
                        <li>• Y2K + Dark Academia</li>
                      </ul>
                      <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                        Those unexpected blends often create unique ideas.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-blue-100 dark:border-blue-900">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                        <span className="text-2xl">🎨</span>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        3. Helps With Consistency
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        If you're building:
                      </p>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <li>• A social media theme</li>
                        <li>• A personal brand</li>
                        <li>• A wardrobe refresh</li>
                        <li>• A Sims household concept</li>
                      </ul>
                      <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                        The wheel keeps you focused on one aesthetic direction.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                    Different Types of Aesthetic Wheels (Explained Clearly)
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Instead of listing tools randomly, here's what each type is actually good for:
                  </p>

                  <div className="overflow-x-auto mb-8">
                    <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                      <thead>
                        <tr className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                          <th className="px-6 py-4 text-left font-bold">Type</th>
                          <th className="px-6 py-4 text-left font-bold">Focus</th>
                          <th className="px-6 py-4 text-left font-bold">Best For</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr className="hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            Aesthetic Style Wheel
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                            Fashion or lifestyle aesthetics like Grunge, Soft Girl, Clean Girl, Dark Academia, Fairycore
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                            Personal style experiments and wardrobe planning
                          </td>
                        </tr>
                        <tr className="hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            Aesthetic Color Wheel
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                            Coordinated color palettes for design, Instagram feeds, branding, room painting
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                            Graphic design, social media themes, interior decoration
                          </td>
                        </tr>
                        <tr className="hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            Aesthetic Outfit Wheel Picker
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                            Specific clothing combinations (e.g., "Oversized blazer + boots", "Pastel cardigan + skirt")
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                            Daily outfit decisions with structure
                          </td>
                        </tr>
                        <tr className="hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            Aesthetic Theme Wheel
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                            Whole vibes for parties, photo shoots, content series, vision boards
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                            Creators and event planners
                          </td>
                        </tr>
                        <tr className="hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            Aesthetic Wheel for The Sims 4
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                            House build styles, interior themes, Sim personalities, outfit types
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                            Making Sims 4 gameplay more creative and less repetitive
                          </td>
                        </tr>
                        <tr className="hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            Aesthetic Name Wheel
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                            Brand names, usernames, fictional characters, Sims families
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                            Combining aesthetic mood with naming style
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      How to Use an Aesthetic Wheel Properly
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Many people spin once and stop. To make it actually helpful:
                    </p>

                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                          1
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                            Define Your Goal
                          </h4>
                          <p className="text-gray-700 dark:text-gray-300">
                            Are you choosing an outfit? A content theme? A brand direction? A room design? Be clear first.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">
                          2
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                            Customize the Options
                          </h4>
                          <p className="text-gray-700 dark:text-gray-300">
                            If the tool allows editing, remove aesthetics you dislike. Add only relevant ones.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                          3
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                            Commit to the Result
                          </h4>
                          <p className="text-gray-700 dark:text-gray-300">
                            The wheel works only if you respect the outcome. If you keep re-spinning, it defeats the purpose.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">
                          4
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                            Add Constraints
                          </h4>
                          <p className="text-gray-700 dark:text-gray-300 mb-2">
                            For deeper creativity:
                          </p>
                          <ul className="text-gray-700 dark:text-gray-300 space-y-1 ml-4">
                            <li>• Spin for aesthetic</li>
                            <li>• Spin again for color palette</li>
                            <li>• Spin again for mood</li>
                          </ul>
                          <p className="text-gray-700 dark:text-gray-300 mt-2">
                            Now you have a structured creative brief.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-12">
                    Who Should Use an Aesthetic Wheel?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    It's especially helpful for:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                      <span className="text-2xl">🎨</span>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Content creators</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                      <span className="text-2xl">👗</span>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Fashion lovers</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                      <span className="text-2xl">🎓</span>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Students in design fields</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                      <span className="text-2xl">✍️</span>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Writers</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                      <span className="text-2xl">🎮</span>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Gamers</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                      <span className="text-2xl">💭</span>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Anyone stuck in creative block</span>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    If you struggle with starting, this tool is effective.
                  </p>

                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-8 mb-8 mt-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Is It Better Than Manually Choosing?
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      Not always.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-bold text-red-600 dark:text-red-400 mb-3">
                          Manual choice is better when:
                        </h4>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                          <li className="flex items-start gap-2">
                            <span className="text-red-500 mt-1">✗</span>
                            <span>You already have a clear vision</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-500 mt-1">✗</span>
                            <span>You're working on a professional client project</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-500 mt-1">✗</span>
                            <span>You need consistency long-term</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-green-600 dark:text-green-400 mb-3">
                          An aesthetic wheel works best when:
                        </h4>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>You need inspiration</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>You want experimentation</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>You're exploring new styles</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                    Frequently Asked Questions
                  </h3>

                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        Is an aesthetic wheel free?
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Most online aesthetic wheel tools are free and browser-based.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-pink-500">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        Can I create my own aesthetic wheel?
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Yes. Many wheel generators allow full customization where you can input your own categories.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        Is it useful for branding?
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        It can help during brainstorming, but final branding decisions should be strategic, not random.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-indigo-500">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        Can I use it for daily outfits?
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Yes. Many people use an aesthetic outfit wheel picker to simplify daily decisions.
                      </p>
                    </div>
                  </div>

                  <div className="mt-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white text-center">
                    <h3 className="text-2xl font-bold mb-4">
                      Ready to Discover Your Aesthetic?
                    </h3>
                    <p className="text-lg mb-6 opacity-90">
                      Spin the wheel above and let creativity guide you to your next style adventure!
                    </p>
                    <div className="flex justify-center">
                      <Link 
                        href="/games"
                        className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
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
            className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-2xl hover:shadow-3xl z-30 transform hover:scale-110 transition-all"
          >
            <Menu size={24} />
          </button>
        )}
      </div>
    </div>
  );
}
