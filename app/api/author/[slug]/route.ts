import { NextRequest, NextResponse } from 'next/server';
import { getAuthorBySlug } from '@/lib/sanity/client';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    const author = await getAuthorBySlug(slug);

    if (!author) {
      return NextResponse.json(
        { error: 'Author not found' },
        { status: 404 }
      );
    }

    // Return only the fields needed for the profile card
    return NextResponse.json({
      name: author.name,
      slug: author.slug,
      image: author.image,
      tagline: author.tagline,
      bio: author.bio,
    });
  } catch (error) {
    console.error('Error fetching author:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
