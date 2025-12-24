'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

interface CreatorProfile {
  name: string;
  slug: string;
  image?: string | null;
  tagline?: string;
  bio?: string;
}

interface RatingProfileSectionProps {
  entityId: string;
  entityType: 'calculator' | 'blog';
  creatorSlug: string; // Only need the slug, will fetch the rest from Sanity
  initialRatingTotal?: number;
  initialRatingCount?: number;
  className?: string;
}

export function RatingProfileSection({
  entityId,
  entityType,
  creatorSlug,
  initialRatingTotal = 0,
  initialRatingCount = 0,
  className,
}: RatingProfileSectionProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [hasRated, setHasRated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [creatorProfile, setCreatorProfile] = useState<CreatorProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  
  // Display state
  const [currentTotal, setCurrentTotal] = useState(initialRatingTotal);
  const [currentCount, setCurrentCount] = useState(initialRatingCount);

  // Calculate average for display
  const averageRating = currentCount > 0 ? (currentTotal / currentCount) : 0;

  // Format review count for display (e.g., "1.2K", "3.5K")
  const formatReviewCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  // Fetch creator profile from Sanity
  useEffect(() => {
    async function fetchCreatorProfile() {
      try {
        setIsLoadingProfile(true);
        const response = await fetch(`/api/author/${creatorSlug}`);
        if (response.ok) {
          const data = await response.json();
          setCreatorProfile(data);
        }
      } catch (error) {
        console.error('Error fetching creator profile:', error);
      } finally {
        setIsLoadingProfile(false);
      }
    }

    fetchCreatorProfile();
  }, [creatorSlug]);

  useEffect(() => {
    // Check if user has already rated this entity via cookie
    const cookieName = `rated_${entityId}`;
    if (document.cookie.split(';').some((c) => c.trim().startsWith(`${cookieName}=`))) {
      setHasRated(true);
    }
  }, [entityId]);

  const handleRate = async (value: number) => {
    if (hasRated || isSubmitting) return;

    setIsSubmitting(true);
    
    // Optimistic update
    const previousTotal = currentTotal;
    const previousCount = currentCount;
    
    setCurrentTotal(prev => prev + value);
    setCurrentCount(prev => prev + 1);
    setHasRated(true);
    setRating(value);

    try {
      const response = await fetch('/api/rating', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          entityId,
          entityType,
          rating: value,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit rating');
      }

      toast.success('Thank you for your rating!');
    } catch (error) {
      console.error('Rating error:', error);
      toast.error('Something went wrong. Please try again.');
      
      // Rollback
      setCurrentTotal(previousTotal);
      setCurrentCount(previousCount);
      setHasRated(false);
      setRating(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("w-full max-w-7xl mx-auto py-10 mt-10", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* LEFT SIDE: Reviews Section */}
        <div className="bg-white dark:bg-slate-950 rounded-2xl border border-border/50 shadow-sm p-8 flex flex-col justify-center">
          <div className="flex flex-col gap-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  Rate this Tool
                </h3>
                <p className="text-muted-foreground mt-1">How useful was this {entityType === 'calculator' ? 'calculator' : 'article'} for you?</p>
              </div>
              {currentCount > 0 && (
                <div className="text-right hidden sm:block">
                  <div className="text-4xl font-bold text-foreground">{averageRating.toFixed(1)}</div>
                  <div className="text-sm text-muted-foreground">{formatReviewCount(currentCount)} Reviews</div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex items-center gap-1 p-2 bg-slate-50 dark:bg-slate-900 rounded-xl border border-border/50">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={cn(
                      "transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1",
                      hasRated ? "cursor-default" : "cursor-pointer hover:scale-110"
                    )}
                    onMouseEnter={() => !hasRated && setHoverRating(star)}
                    onMouseLeave={() => !hasRated && setHoverRating(0)}
                    onClick={() => handleRate(star)}
                    disabled={hasRated || isSubmitting}
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      className={cn(
                        "w-8 h-8 md:w-10 md:h-10 transition-all",
                        (hoverRating || rating || Math.round(averageRating)) >= star
                          ? "fill-yellow-400 text-yellow-400 drop-shadow-sm"
                          : "fill-transparent text-slate-300 dark:text-slate-600"
                      )}
                    />
                  </button>
                ))}
              </div>

              {hasRated ? (
                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 rounded-full animate-in fade-in zoom-in duration-300">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-medium">Thanks for rating!</span>
                </div>
              ) : (
                <span className="text-sm text-muted-foreground animate-pulse font-medium hidden sm:inline-block">
                  Tap stars to rate
                </span>
              )}
            </div>
            
            {/* Mobile Stats */}
            {currentCount > 0 && (
              <div className="flex items-center gap-4 sm:hidden border-t border-border/50 pt-4">
                <div>
                  <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
                  <span className="text-muted-foreground text-sm ml-1">/ 5</span>
                </div>
                <div className="w-px h-8 bg-border"></div>
                <div>
                  <span className="font-bold block">{formatReviewCount(currentCount)}</span>
                  <span className="text-muted-foreground text-xs uppercase tracking-wider">Reviews</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE: Creator Profile Section */}
        <div className="h-full">
          {isLoadingProfile ? (
            <div className="h-full bg-slate-50 dark:bg-slate-900 rounded-2xl border border-border/50 p-8 flex flex-col justify-center gap-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-muted animate-pulse" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                  <div className="h-3 w-32 bg-muted animate-pulse rounded" />
                </div>
              </div>
              <div className="h-12 w-full bg-muted animate-pulse rounded-xl" />
            </div>
          ) : creatorProfile ? (
            <div className="h-full bg-slate-50 dark:bg-slate-900 rounded-2xl border border-border/50 p-8 flex flex-col justify-center relative overflow-hidden group hover:border-primary/20 transition-colors">
              {/* Decorative Background Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
              
              <div className="relative z-10 flex items-start gap-5">
                <Link href={`/creator/${creatorProfile.slug}`} className="shrink-0 relative">
                  <Avatar className="h-20 w-20 border-4 border-white dark:border-slate-950 shadow-md group-hover:scale-105 transition-transform duration-300">
                    <AvatarImage src={creatorProfile.image || undefined} alt={creatorProfile.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-xl">
                      <User className="h-8 w-8 text-primary/60" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-4 border-white dark:border-slate-950 rounded-full shadow-sm" title="Online" />
                </Link>
                
                <div className="flex-1 min-w-0 pt-1">
                  <div className="text-xs font-bold text-primary tracking-wider uppercase mb-1">Created By</div>
                  <Link 
                    href={`/creator/${creatorProfile.slug}`}
                    className="text-xl font-bold text-foreground hover:text-primary transition-colors line-clamp-1 block mb-1"
                  >
                    {creatorProfile.name}
                  </Link>
                  {(creatorProfile.tagline || creatorProfile.bio) && (
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {creatorProfile.tagline || creatorProfile.bio}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border/50 flex justify-between items-center relative z-10">
                <Link 
                  href={`/creator/${creatorProfile.slug}`}
                  className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1 group/link"
                >
                  View Full Profile 
                  <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
