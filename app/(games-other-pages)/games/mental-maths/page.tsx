import { Metadata } from 'next';
import { MentalMathsGame } from '@/components/games/mental-maths/MentalMathsGame';
import { BookOpen, Brain, Calculator, Clock, HelpCircle, Lightbulb, Target, Zap } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Mental Math Practice – Boost Your Calculation Skills',
    description: 'Challenge yourself with quick mental math quizzes and improve your calculation speed and accuracy. Learn shortcuts for addition, subtraction, multiplication, and more.',
    alternates: {
        canonical: 'https://www.thesmartcalculator.com/games/mental-maths',
        languages: {
            'x-default': 'https://www.thesmartcalculator.com/games/mental-maths',
            'en': 'https://www.thesmartcalculator.com/games/mental-maths',
            'pt-BR': 'https://www.thesmartcalculator.com/games/mental-maths',
            'pl': 'https://www.thesmartcalculator.com/games/mental-maths',
            'de': 'https://www.thesmartcalculator.com/games/mental-maths',
            'es': 'https://www.thesmartcalculator.com/games/mental-maths',
        }
    },
    openGraph: {
        title: 'Mental Math Practice – Boost Your Calculation Skills',
        description: 'Challenge yourself with quick mental math quizzes and improve your calculation speed and accuracy.',
        type: 'website',
        url: 'https://www.thesmartcalculator.com/games/mental-maths',
        siteName: "Smart Calculator",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Mental Math Practice",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: 'Mental Math Practice – Boost Your Calculation Skills',
        description: 'Challenge yourself with quick mental math quizzes and improve your calculation speed and accuracy.',
        images: ["/og-image.png"],
    },
};

export default function MentalMathsPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500/30">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10">
                {/* Game Section */}
                <div className="pt-8 pb-12">
                    <MentalMathsGame />
                </div>

                {/* Content Section */}
                <div className="max-w-4xl mx-auto px-4 pb-24 space-y-16">

                    {/* Intro */}
                    <section className="space-y-6 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-300">
                            Mental Math Trainer
                        </h2>
                        <p className="text-lg text-slate-100 leading-relaxed max-w-2xl mx-auto">
                            Mental math is the skill of performing calculations in your head without using a calculator, pen, or paper.
                            It’s not only fun but also improves focus, memory, and problem-solving speed—perfect for games and everyday life.
                        </p>
                    </section>

                    {/* How to Do It */}
                    <section className="space-y-8 bg-slate-900/50 p-8 mb-6 rounded-3xl border border-slate-800/50 backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                                <BookOpen className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold text-white">How to Do Mental Math</h2>
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-blue-300 flex items-center gap-2">
                                    <span className="w-8 h-8 flex items-center justify-center rounded-full text-sm text-white font-bold">1</span>
                                    Understand the Problem
                                </h3>
                                <p className="text-white pl-11">Read the problem carefully and break it into smaller, manageable parts.</p>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-blue-300 flex items-center gap-2">
                                    <span className="w-8 h-8 flex items-center justify-center bg-blue-500/20 rounded-full text-sm text-white font-bold">2</span>
                                    Use Simple Techniques
                                </h3>
                                <div className="grid md:grid-cols-3 gap-6 pl-0 md:pl-10">
                                    <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50">
                                        <h4 className="font-bold text-white mb-2">Addition & Subtraction</h4>
                                        <p className="text-sm text-blue-300 mb-3">Round numbers, then adjust.</p>
                                        <div className="bg-slate-950/50 p-3 rounded-lg text-xs font-mono text-green-400">
                                            498 + 237 → 500 + 237 = 737<br />
                                            737 - 2 = 735
                                        </div>
                                    </div>
                                    <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50">
                                        <h4 className="font-bold text-white mb-2">Multiplication</h4>
                                        <p className="text-sm text-blue-300 mb-3">Break numbers into factors.</p>
                                        <div className="bg-slate-950/50 p-3 rounded-lg text-xs font-mono text-blue-400">
                                            12 × 15 → (10 × 15) + (2 × 15)<br />
                                            150 + 30 = 180
                                        </div>
                                    </div>
                                    <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50">
                                        <h4 className="font-bold text-white mb-2">Division</h4>
                                        <p className="text-sm text-blue-300 mb-3">Use estimation or simplify.</p>
                                        <div className="bg-slate-950/50 p-3 rounded-lg text-xs font-mono text-red-400">
                                            144 ÷ 12 → 12 × ? = 144<br />
                                            Answer: 12
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* How to Improve */}
                    <div className="grid md:grid-cols-2 gap-8 mb-6">
                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
                                <Target className="text-green-400" />
                                How to Get Better
                            </h2>
                            <ul className="space-y-6">
                                {[
                                    { icon: Clock, title: "Daily Practice", desc: "Spend 10–15 minutes on mental math exercises." },
                                    { icon: Zap, title: "Use Games", desc: "Math puzzles and apps make learning fun." },
                                    { icon: Brain, title: "Visualize Numbers", desc: "Picture numbers in your head to simplify." },
                                    { icon: Target, title: "Challenge Yourself", desc: "Try timed exercises to improve speed." },
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4 p-4 bg-slate-800/30 rounded-2xl border border-slate-800">
                                        <div className="mt-1 text-slate-300"><item.icon size={20} /></div>
                                        <div>
                                            <h4 className="font-bold text-white">{item.title}</h4>
                                            <p className="text-sm text-blue-300">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-white">
                                <Lightbulb className="text-yellow-400" />
                                Cool Tricks
                            </h2>
                            <div className="space-y-4">
                                <div className="p-5 bg-slate-800/30 rounded-2xl border border-slate-800">
                                    <h4 className="font-bold text-white mb-2">Multiply by 9</h4>
                                    <p className="text-sm text-blue-300">Multiply by 10 and subtract the number.</p>
                                    <div className="mt-3 text-xs font-mono text-yellow-400">9 × 6 → (10 × 6) - 6 = 54</div>
                                </div>
                                <div className="p-5 bg-slate-800/30 rounded-2xl border border-slate-800">
                                    <h4 className="font-bold text-white mb-2">Squares ending in 5</h4>
                                    <p className="text-sm text-blue-300">Multiply first digit by (itself + 1), append 25.</p>
                                    <div className="mt-3 text-xs font-mono text-yellow-400">35² → (3 × 4) & 25 = 1225</div>
                                </div>
                                <div className="p-5 bg-slate-800/30 rounded-2xl border border-slate-800">
                                    <h4 className="font-bold text-white mb-2">Percent Error</h4>
                                    <p className="text-sm text-blue-300">Estimate 10%, 5%, 1% first.</p>
                                    <div className="mt-3 text-xs font-mono text-yellow-400">15% of 80 → 10%(8) + 5%(4) = 12</div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* FAQ */}
                    <section className="space-y-8 pt-8 border-t border-slate-800">
                        <div className="flex items-center gap-3 mb-4">
                            <HelpCircle className="text-purple-400 w-6 h-6" />
                            <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { q: "What is mental math?", a: "Performing calculations in your head without paper or calculator." },
                                { q: "Why is it important?", a: "It improves brain speed, memory, and problem-solving skills." },
                                { q: "Can I learn if I'm bad at math?", a: "Yes! Start with small numbers and simple tricks." },
                                { q: "How long to see results?", a: "With daily practice, you can see improvement in a few weeks." },
                                { q: "Is memorization necessary?", a: "Memorizing tables (1-20) and squares helps speed significantly." },
                                { q: "Can it help in exams?", a: "Absolutely. It saves time and reduces dependency on calculators." }
                            ].map((faq, i) => (
                                <div key={i} className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800/50 hover:border-purple-500/30 transition-colors">
                                    <h3 className="font-bold text-blue-100 mb-2">{faq.q}</h3>
                                    <p className="text-sm text-blue-300">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </main>
    );
}
