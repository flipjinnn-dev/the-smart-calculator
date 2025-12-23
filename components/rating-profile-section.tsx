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
  slug: string; // expecting full slug or part? usually /creator/slug
  image?: string | null;
  bio?: string;
}

interface RatingProfileSectionProps {
  entityId: string;
  entityType: 'calculator' | 'blog';
  creatorProfile: CreatorProfile;
  initialRatingTotal?: number;
  initialRatingCount?: number;
  className?: string;
}

export function RatingProfileSection({
  entityId,
  entityType,
  creatorProfile,
  initialRatingTotal = 0,
  initialRatingCount = 0,
  className,
}: RatingProfileSectionProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [hasRated, setHasRated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Display state
  const [currentTotal, setCurrentTotal] = useState(initialRatingTotal);
  const [currentCount, setCurrentCount] = useState(initialRatingCount);

  // Calculate average for display
  const averageRating = currentCount > 0 ? (currentTotal / currentCount) : 0;

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
    <div className={cn("w-full py-8 border-t border-border mt-12", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* LEFT SIDE: Rating */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">
            How useful was this {entityType === 'calculator' ? 'calculator' : 'article'}?
          </h3>
          
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={cn(
                  "p-1 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full",
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
                    "w-8 h-8",
                    (hoverRating || rating || Math.round(averageRating)) >= star
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-transparent text-muted-foreground"
                  )}
                />
              </button>
            ))}
          </div>

          <div className="text-sm text-muted-foreground">
            {currentCount > 0 ? (
              <>
                <span className="font-medium text-foreground">{averageRating.toFixed(1)}</span>/5 
                <span className="mx-1">•</span> 
                {currentCount} {currentCount === 1 ? 'vote' : 'votes'}
              </>
            ) : (
              "Be the first to rate!"
            )}
            {hasRated && <span className="ml-2 text-green-600 font-medium">(Thanks!)</span>}
          </div>
        </div>

        {/* RIGHT SIDE: Creator Profile */}
        <div className="flex md:justify-end">
          <Card className="p-4 flex items-center gap-4 min-w-[300px] hover:shadow-md transition-shadow">
            <Link href={`/creator/${creatorProfile.slug}`} className="shrink-0">
              <Avatar className="h-16 w-16 border-2 border-primary/10">
                <AvatarImage src={creatorProfile.image || undefined} alt={creatorProfile.name} />
                <AvatarFallback className="bg-primary/5">
                  <User className="h-8 w-8 text-primary/40" />
                </AvatarFallback>
              </Avatar>
            </Link>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">
                Created by
              </span>
              <Link 
                href={`/creator/${creatorProfile.slug}`}
                className="text-lg font-bold hover:text-primary transition-colors line-clamp-1"
              >
                {creatorProfile.name}
              </Link>
              {(creatorProfile.tagline || creatorProfile.bio) && (
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                  {creatorProfile.tagline || creatorProfile.bio}
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
