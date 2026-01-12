import { Metadata } from 'next';
import { getTodaysWordleFromSanity } from '@/lib/sanity/wordle-client';

/**
 * Generate dynamic metadata for Wordle game page
 */
export async function generateWordleGameMetadata(): Promise<Metadata> {
    const baseMetadata: Metadata = {
        title: 'Play Wordle - Daily Word Game Challenge',
        description: 'Play today\'s Wordle puzzle! Guess the 5-letter word in 6 tries. A new word every day!',
        keywords: ['wordle', 'word game', 'daily puzzle', 'wordle today', 'word puzzle', 'guess the word'],
        openGraph: {
            title: 'Play Wordle - Daily Word Game Challenge',
            description: 'Play today\'s Wordle puzzle! Guess the 5-letter word in 6 tries.',
            type: 'website',
            url: 'https://www.thesmartcalculator.com/games/wordle',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Play Wordle - Daily Word Game Challenge',
            description: 'Play today\'s Wordle puzzle! Guess the 5-letter word in 6 tries.',
        },
    };

    try {
        const todaysWordle = await getTodaysWordleFromSanity();

        if (todaysWordle?.gamePageMetadata) {
            const { metaTitle, metaDescription, keywords, ogImage } = todaysWordle.gamePageMetadata;

            return {
                title: metaTitle || baseMetadata.title,
                description: metaDescription || baseMetadata.description,
                keywords: keywords || baseMetadata.keywords,
                openGraph: {
                    ...baseMetadata.openGraph,
                    title: metaTitle || baseMetadata.openGraph?.title,
                    description: metaDescription || baseMetadata.openGraph?.description,
                    ...(ogImage && { images: [{ url: ogImage }] }),
                },
                twitter: {
                    ...baseMetadata.twitter,
                    title: metaTitle || baseMetadata.twitter?.title,
                    description: metaDescription || baseMetadata.twitter?.description,
                    ...(ogImage && { images: [ogImage] }),
                },
            };
        }
    } catch (error) {
        console.error('[Metadata] Failed to fetch Wordle game metadata from Sanity:', error);
    }

    return baseMetadata;
}

/**
 * Generate dynamic metadata for Wordle archive page
 */
export async function generateWordleArchiveMetadata(): Promise<Metadata> {
    const baseMetadata: Metadata = {
        title: 'Wordle Archive - Past Puzzles & Solutions',
        description: 'Browse the complete history of Wordle puzzles and solutions. Search by date, puzzle number, or answer.',
        keywords: ['wordle archive', 'past wordle answers', 'wordle history', 'previous wordle solutions', 'wordle answers list'],
        openGraph: {
            title: 'Wordle Archive - Past Puzzles & Solutions',
            description: 'Browse the complete history of Wordle puzzles and solutions.',
            type: 'website',
            url: 'https://www.thesmartcalculator.com/games/what-is-the-wordle-today',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Wordle Archive - Past Puzzles & Solutions',
            description: 'Browse the complete history of Wordle puzzles and solutions.',
        },
    };

    try {
        const todaysWordle = await getTodaysWordleFromSanity();

        if (todaysWordle?.archivePageMetadata) {
            const { metaTitle, metaDescription, keywords, ogImage } = todaysWordle.archivePageMetadata;

            return {
                title: metaTitle || baseMetadata.title,
                description: metaDescription || baseMetadata.description,
                keywords: keywords || baseMetadata.keywords,
                openGraph: {
                    ...baseMetadata.openGraph,
                    title: metaTitle || baseMetadata.openGraph?.title,
                    description: metaDescription || baseMetadata.openGraph?.description,
                    ...(ogImage && { images: [{ url: ogImage }] }),
                },
                twitter: {
                    ...baseMetadata.twitter,
                    title: metaTitle || baseMetadata.twitter?.title,
                    description: metaDescription || baseMetadata.twitter?.description,
                    ...(ogImage && { images: [ogImage] }),
                },
            };
        }
    } catch (error) {
        console.error('[Metadata] Failed to fetch Wordle archive metadata from Sanity:', error);
    }

    return baseMetadata;
}
