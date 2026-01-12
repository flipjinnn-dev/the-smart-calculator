import { client } from './config';

export interface WordleData {
    wordleNumber: number;
    date: string;
    solution: string;
    difficulty?: 'easy' | 'medium' | 'hard';
    hints?: string[];
    pageMetadata?: {
        metaTitle?: string;
        metaDescription?: string;
        keywords?: string[];
    };
    gamePageMetadata?: {
        metaTitle?: string;
        metaDescription?: string;
        keywords?: string[];
        ogImage?: string;
    };
    archivePageMetadata?: {
        metaTitle?: string;
        metaDescription?: string;
        keywords?: string[];
        ogImage?: string;
    };
    statisticsData?: {
        totalAttempts?: number;
        averageGuesses?: number;
        winRate?: number;
    };
    isActive?: boolean;
    publishedAt?: string;
}

/**
 * Fetch today's Wordle from Sanity CMS
 */
export async function getTodaysWordleFromSanity(): Promise<WordleData | null> {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayString = today.toISOString().split('T')[0];

        const query = `*[_type == "wordle" && date == $today && isActive == true][0]{
      wordleNumber,
      date,
      solution,
      difficulty,
      hints,
      gamePageMetadata,
      archivePageMetadata,
      statisticsData,
      isActive,
      publishedAt
    }`;

        const wordle = await client.fetch(query, { today: todayString });
        return wordle;
    } catch (error) {
        console.error('Error fetching today\'s Wordle from Sanity:', error);
        return null;
    }
}

/**
 * Fetch a specific Wordle by number from Sanity CMS
 */
export async function getWordleByNumber(wordleNumber: number): Promise<WordleData | null> {
    try {
        const query = `*[_type == "wordle" && wordleNumber == $number][0]{
      wordleNumber,
      date,
      solution,
      difficulty,
      hints,
      gamePageMetadata,
      archivePageMetadata,
      statisticsData,
      isActive,
      publishedAt
    }`;

        const wordle = await client.fetch(query, { number: wordleNumber });
        return wordle;
    } catch (error) {
        console.error(`Error fetching Wordle #${wordleNumber} from Sanity:`, error);
        return null;
    }
}

/**
 * Fetch all Wordles from Sanity (for archive page)
 */
export async function getAllWordles(limit = 100): Promise<WordleData[]> {
    try {
        const query = `*[_type == "wordle" && isActive == true] | order(wordleNumber desc)[0...${limit}]{
      wordleNumber,
      date,
      solution,
      difficulty,
      isActive
    }`;

        const wordles = await client.fetch(query);
        return wordles || [];
    } catch (error) {
        console.error('Error fetching Wordles from Sanity:', error);
        return [];
    }
}

/**
 * Fetch Wordles by date range
 */
export async function getWordlesByDateRange(startDate: string, endDate: string): Promise<WordleData[]> {
    try {
        const query = `*[_type == "wordle" && date >= $startDate && date <= $endDate && isActive == true] | order(date desc){
      wordleNumber,
      date,
      solution,
      difficulty,
      isActive
    }`;

        const wordles = await client.fetch(query, { startDate, endDate });
        return wordles || [];
    } catch (error) {
        console.error('Error fetching Wordles by date range from Sanity:', error);
        return [];
    }
}
