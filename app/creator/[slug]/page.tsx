import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getAuthorBySlug } from '@/lib/sanity/client';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Calculator, FileText, User, Star, ArrowLeft, Linkedin, Mail, Twitter, Instagram, Globe, CheckCircle2, TrendingUp, Sparkles, Zap, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PortableText } from '@/components/portable-text';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600; // Revalidate every hour

export default async function CreatorPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Fetch real data from Sanity
  let author = await getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const totalCalculators = author.calculators?.length || 0;
  const totalPosts = author.posts?.length || 0;
  
  // Demo override: Add ratings for paver-base-calculator
  const calculatorsWithDemoRatings = author.calculators?.map((calc: any) => {
    if (calc.calculatorId === 'paver-base-calculator') {
      return {
        ...calc,
        ratingCount: 3200,
        ratingTotal: 15360
      };
    }
    return calc;
  }) || [];
  
  // Calculate total reviews across all content (if available)
  const totalReviews = calculatorsWithDemoRatings.reduce((acc: number, curr: any) => acc + (curr.ratingCount || 0), 0) || 0;
  const averageRating = totalReviews > 0 
    ? (calculatorsWithDemoRatings.reduce((acc: number, curr: any) => acc + (curr.ratingTotal || 0), 0) / totalReviews).toFixed(1)
    : null;

  // Brand colors inspired by the image (Blue, Red, Green, Yellow)
  const brandColors = {
    blue: "text-[#4285F4]",
    red: "text-[#EA4335]",
    green: "text-[#34A853]",
    yellow: "text-[#FBBC05]",
    bgBlue: "bg-[#4285F4]",
    bgRed: "bg-[#EA4335]",
    bgGreen: "bg-[#34A853]",
    bgYellow: "bg-[#FBBC05]",
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Vibrant Header Background with Brand Colors */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05]"></div>
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
        {/* Decorative Circles */}
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-[#34A853] rounded-full blur-3xl opacity-40 mix-blend-multiply animate-pulse"></div>
        <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-[#4285F4] rounded-full blur-3xl opacity-40 mix-blend-multiply animate-pulse"></div>
        
        <div className="container mx-auto px-4 h-full relative z-10">
          <Link href="/">
            <Button variant="ghost" className="mt-8 text-white hover:bg-white/20 hover:text-white transition-all backdrop-blur-md rounded-full px-6 py-6 text-base font-medium border border-white/30">
              <ArrowLeft className="mr-2 h-5 w-5" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Sidebar - Profile Info (Widened Column) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-24 space-y-8">
              <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-md overflow-visible rounded-3xl ring-1 ring-black/5">
                <CardContent className="pt-0 px-8 pb-10 text-center">
                  <div className="relative -mt-24 mb-6 inline-block">
                    {/* Colorful Glow behind Avatar */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#4285F4] via-[#EA4335] to-[#FBBC05] blur-lg opacity-70 transform scale-110"></div>
                    <Avatar className="h-48 w-48 md:h-56 md:w-56 border-[8px] border-white shadow-2xl bg-white relative z-10">
                      <AvatarImage src={author.image} alt={author.name} className="object-cover" />
                      <AvatarFallback className="text-6xl bg-slate-50 text-slate-300">
                        {author.name?.charAt(0) || <User />}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-4 right-4 bg-[#34A853] border-[5px] border-white rounded-full p-2 shadow-lg z-20" title="Verified Creator">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">{author.name}</h1>
                  <p className="text-lg font-medium text-slate-600 mb-8 max-w-xs mx-auto leading-relaxed">{author.tagline}</p>
                  
                  {/* Stats Row with Brand Colors */}
                  <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-6 pb-2 mb-8">
                    <div className="group cursor-default hover:bg-blue-50/50 p-2 rounded-xl transition-colors">
                      <div className={`font-black text-2xl ${brandColors.blue} mb-1`}>{totalCalculators}</div>
                      <div className="text-[11px] text-slate-400 uppercase tracking-widest font-bold flex items-center justify-center gap-1">
                        <Calculator className="w-3 h-3" /> Tools
                      </div>
                    </div>
                    <div className="group cursor-default hover:bg-red-50/50 p-2 rounded-xl transition-colors border-l border-r border-slate-100">
                      <div className={`font-black text-2xl ${brandColors.red} mb-1`}>{totalPosts}</div>
                      <div className="text-[11px] text-slate-400 uppercase tracking-widest font-bold flex items-center justify-center gap-1">
                        <FileText className="w-3 h-3" /> Posts
                      </div>
                    </div>
                    <div className="group cursor-default hover:bg-yellow-50/50 p-2 rounded-xl transition-colors">
                      <div className={`font-black text-2xl ${brandColors.yellow} flex items-center justify-center gap-1 mb-1`}>
                        {averageRating || '-'} <Star className="w-5 h-5 fill-[#FBBC05] text-[#FBBC05]" />
                      </div>
                      <div className="text-[11px] text-slate-400 uppercase tracking-widest font-bold flex items-center justify-center gap-1">
                        <Award className="w-3 h-3" /> Rating
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="text-slate-600 text-base leading-relaxed mb-10 text-left bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-inner">
                    {Array.isArray(author.bio) ? (
                      <PortableText value={author.bio} />
                    ) : (
                      <p>{typeof author.bio === 'string' ? author.bio : "Expert contributor creating high-quality calculators and content."}</p>
                    )}
                  </div>

                  {/* Social Links with Brand Hover Effects */}
                  {author.social && (
                    <div className="flex justify-center gap-3 flex-wrap">
                      {author.social.email && (
                        <a href={`mailto:${author.social.email}`} className="p-3.5 bg-slate-100 text-slate-500 hover:bg-[#EA4335] hover:text-white rounded-2xl transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1" title="Email">
                          <Mail className="w-5 h-5" />
                        </a>
                      )}
                      {author.social.linkedin && (
                        <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-3.5 bg-slate-100 text-slate-500 hover:bg-[#4285F4] hover:text-white rounded-2xl transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1" title="LinkedIn">
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {author.social.twitter && (
                        <a href={author.social.twitter} target="_blank" rel="noopener noreferrer" className="p-3.5 bg-slate-100 text-slate-500 hover:bg-black hover:text-white rounded-2xl transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1" title="Twitter/X">
                          <Twitter className="w-5 h-5" />
                        </a>
                      )}
                      {author.social.instagram && (
                        <a href={author.social.instagram} target="_blank" rel="noopener noreferrer" className="p-3.5 bg-slate-100 text-slate-500 hover:bg-gradient-to-tr hover:from-[#FBBC05] hover:via-[#EA4335] hover:to-[#4285F4] hover:text-white rounded-2xl transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1" title="Instagram">
                          <Instagram className="w-5 h-5" />
                        </a>
                      )}
                      {author.social.website && (
                        <a href={author.social.website} target="_blank" rel="noopener noreferrer" className="p-3.5 bg-slate-100 text-slate-500 hover:bg-[#34A853] hover:text-white rounded-2xl transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1" title="Website">
                          <Globe className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-16">
            
            {/* Calculators Section */}
            <section>
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-gradient-to-br from-[#4285F4] to-[#3367D6] rounded-2xl text-white shadow-xl shadow-blue-200 ring-4 ring-blue-50">
                    <Calculator className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Calculators</h2>
                    <p className="text-slate-500 font-medium">Precision tools built for accuracy</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-[#4285F4] rounded-full text-sm font-bold border border-blue-100">
                  <Sparkles className="w-4 h-4" />
                  {totalCalculators} Active
                </div>
              </div>
              
              {calculatorsWithDemoRatings && calculatorsWithDemoRatings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {calculatorsWithDemoRatings.map((calc: any, idx: number) => (
                    <Link href={`/${calc.calculatorId}`} key={calc.calculatorId || idx} className="group h-full">
                      <Card className="h-full border-0 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-5px_rgba(66,133,244,0.2)] transition-all duration-300 bg-white rounded-2xl overflow-hidden group-hover:-translate-y-1.5 ring-1 ring-slate-100 hover:ring-[#4285F4]/30">
                        {/* Top Color Line */}
                        <div className="h-1.5 w-full bg-gradient-to-r from-[#4285F4] via-[#34A853] to-[#FBBC05] opacity-80 group-hover:opacity-100 transition-opacity"></div>
                        
                        <CardContent className="p-7 flex flex-col h-full">
                          <div className="flex justify-between items-start mb-5">
                            <div className="p-3 bg-blue-50 rounded-2xl text-[#4285F4] group-hover:bg-[#4285F4] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-blue-200">
                              <Calculator className="w-6 h-6" />
                            </div>
                            {calc.ratingCount > 0 && (
                              <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-full text-xs font-bold text-yellow-700 border border-yellow-100 shadow-sm">
                                <Star className="w-3.5 h-3.5 fill-[#FBBC05] text-[#FBBC05]" />
                                {((calc.ratingTotal || 0) / calc.ratingCount).toFixed(1)}
                              </div>
                            )}
                          </div>
                          <h3 className="font-bold text-xl text-slate-900 mb-3 line-clamp-1 group-hover:text-[#4285F4] transition-colors">
                            {calc.title || calc.calculatorId.replace(/-/g, ' ')}
                          </h3>
                          <div className="text-slate-500 line-clamp-2 mb-6 flex-1 leading-relaxed">
                            {Array.isArray(calc.description) ? (
                              <PortableText value={calc.description} />
                            ) : (
                              <p>{calc.description || "Calculate efficiently with this specialized tool designed for precision and ease of use."}</p>
                            )}
                          </div>
                          <div className="flex items-center text-sm font-bold text-[#4285F4] mt-auto pt-5 border-t border-slate-50 group-hover:border-blue-50 transition-colors">
                            Try Calculator <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1.5 transition-transform" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
                  <div className="bg-white p-5 rounded-full shadow-sm inline-block mb-4">
                    <Calculator className="w-10 h-10 text-slate-300" />
                  </div>
                  <p className="text-slate-500 font-medium text-lg">No calculators published yet.</p>
                </div>
              )}
            </section>

            {/* Articles Section */}
            <section>
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-gradient-to-br from-[#EA4335] to-[#D93025] rounded-2xl text-white shadow-xl shadow-red-200 ring-4 ring-red-50">
                    <FileText className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Articles</h2>
                    <p className="text-slate-500 font-medium">Expert insights and guides</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-red-50 text-[#EA4335] rounded-full text-sm font-bold border border-red-100">
                  <TrendingUp className="w-4 h-4" />
                  {totalPosts} Published
                </div>
              </div>

              {author.posts && author.posts.length > 0 ? (
                <div className="grid grid-cols-1 gap-8">
                  {author.posts.map((post: any, idx: number) => (
                    <Link href={`/blog/${post.slug}`} key={post.slug || idx} className="block group">
                      <Card className="border-0 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-[0_20px_40px_-5px_rgba(234,67,53,0.15)] transition-all duration-300 overflow-hidden bg-white rounded-2xl group-hover:-translate-y-1.5 ring-1 ring-slate-100 hover:ring-[#EA4335]/30">
                        <div className="flex flex-col md:flex-row h-full">
                          {post.image && (
                            <div className="w-full md:w-80 h-56 md:h-auto relative flex-shrink-0 overflow-hidden">
                              <Image 
                                src={post.image} 
                                alt={post.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 md:opacity-0 md:group-hover:opacity-40 transition-opacity duration-300"></div>
                              <div className="absolute top-4 left-4">
                                <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-[#EA4335] hover:bg-white font-bold px-3 py-1 shadow-lg">
                                  Article
                                </Badge>
                              </div>
                            </div>
                          )}
                          <CardContent className="p-8 flex-1 flex flex-col justify-center relative">
                            {/* Decorative accent line */}
                            <div className="absolute left-0 top-8 bottom-8 w-1 bg-gradient-to-b from-[#EA4335] to-[#FBBC05] opacity-0 group-hover:opacity-100 transition-opacity rounded-r-full hidden md:block"></div>
                            
                            <div className="flex items-center gap-3 mb-4">
                              {!post.image && (
                                <Badge variant="secondary" className="bg-red-50 text-[#EA4335] hover:bg-red-100 font-bold px-2.5">
                                  Article
                                </Badge>
                              )}
                              {post.publishedAt && (
                                <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                                  <Zap className="w-3.5 h-3.5 text-[#FBBC05]" />
                                  {new Date(post.publishedAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                                </span>
                              )}
                            </div>
                            <h3 className="font-bold text-2xl text-slate-900 mb-4 group-hover:text-[#EA4335] transition-colors line-clamp-2 leading-tight">
                              {post.title}
                            </h3>
                            <div className="text-slate-500 line-clamp-2 mb-6 leading-relaxed text-base">
                              {Array.isArray(post.excerpt) ? (
                                <PortableText value={post.excerpt} />
                              ) : (
                                <p>{post.excerpt || "Read this insightful article to learn more about this topic."}</p>
                              )}
                            </div>
                            <span className="text-sm font-bold text-[#EA4335] flex items-center mt-auto uppercase tracking-wide group-hover:translate-x-1 transition-transform">
                              Read Article <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                            </span>
                          </CardContent>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
                  <div className="bg-white p-5 rounded-full shadow-sm inline-block mb-4">
                    <FileText className="w-10 h-10 text-slate-300" />
                  </div>
                  <p className="text-slate-500 font-medium text-lg">No articles published yet.</p>
                </div>
              )}
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}

