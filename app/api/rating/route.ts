import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Critical: Server-side token with write permissions
  useCdn: false, // We need fresh data for writes
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { entityId, entityType, rating } = body;

    if (!entityId || !rating || typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json(
        { message: 'Invalid input. Rating must be 1-5.' },
        { status: 400 }
      );
    }

    // Check cookie to prevent duplicate voting
    const cookieName = `rated_${entityId}`;
    const hasRated = req.cookies.get(cookieName);

    if (hasRated) {
      return NextResponse.json(
        { message: 'You have already rated this content.' },
        { status: 429 }
      );
    }

    // Ensure document exists before rating
    // This allows lazy creation of calculator/blog entries in Sanity
    const initialDoc: any = {
      _id: entityId,
      _type: entityType || 'calculator', // Fallback
      ratingTotal: 0,
      ratingCount: 0,
    };

    // Add specific ID fields to satisfy schema requirements
    if (entityType === 'calculator') {
      initialDoc.calculatorId = entityId;
      initialDoc.title = entityId // temporary title
    } else if (entityType === 'blog') {
      initialDoc.blogId = entityId;
    }

    await client.createIfNotExists(initialDoc);

    // Update Sanity document
    await client
      .patch(entityId)
      .inc({ ratingTotal: rating, ratingCount: 1 })
      .commit();

    // Create response
    const response = NextResponse.json(
      { message: 'Rating submitted successfully' },
      { status: 200 }
    );

    // Set cookie (HTTP only, expires in 1 year)
    response.cookies.set(cookieName, 'true', {
      httpOnly: false, // Allow client to read to update UI state if needed
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
      sameSite: 'strict',
    });

    return response;
  } catch (error) {
    console.error('Rating submission error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
