import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const LANGUAGE_NAMES = {
  br: "Brazilian Portuguese",
  pl: "Polish",
  de: "German",
};

/**
 * Translate a single text string to target language
 */
export async function translateText(
  text: string,
  targetLang: keyof typeof LANGUAGE_NAMES
): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("⚠️  GEMINI_API_KEY not found. Returning original text.");
    return text;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Translate the following text to ${LANGUAGE_NAMES[targetLang]}. 
Only return the translation, nothing else. Maintain HTML tags if present:

${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error(`❌ Translation error for ${targetLang}:`, error);
    return text; // Return original on error
  }
}

/**
 * Translate entire JSON object to target language
 * Maintains structure, only translates string values
 */
export async function translateJSON(
  jsonContent: any,
  targetLang: keyof typeof LANGUAGE_NAMES
): Promise<any> {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("⚠️  GEMINI_API_KEY not found. Returning original content.");
    return jsonContent;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Translate the following JSON content to ${LANGUAGE_NAMES[targetLang]}. 

IMPORTANT RULES:
1. Keep the exact same JSON structure
2. Only translate string values (content inside quotes)
3. Do NOT translate keys (like "heading", "content", "q", "a", etc.)
4. Maintain HTML tags exactly as they are (like <br>, <strong>, etc.)
5. Return ONLY valid JSON, no extra text or explanation

JSON to translate:
${JSON.stringify(jsonContent, null, 2)}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    // Extract JSON from response (sometimes API wraps it in markdown)
    let jsonText = text;
    if (text.includes("```json")) {
      const match = text.match(/```json\s*([\s\S]*?)\s*```/);
      jsonText = match ? match[1] : text;
    } else if (text.includes("```")) {
      const match = text.match(/```\s*([\s\S]*?)\s*```/);
      jsonText = match ? match[1] : text;
    }

    // Try to extract JSON object from text
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    return JSON.parse(jsonText);
  } catch (error) {
    console.error(`❌ JSON translation error for ${targetLang}:`, error);
    return jsonContent; // Return original on error
  }
}

/**
 * Batch translate with rate limiting
 */
export async function batchTranslate(
  texts: string[],
  targetLang: keyof typeof LANGUAGE_NAMES,
  delayMs: number = 1000
): Promise<string[]> {
  const results: string[] = [];

  for (let i = 0; i < texts.length; i++) {
    console.log(`   Translating item ${i + 1}/${texts.length}...`);
    const translated = await translateText(texts[i], targetLang);
    results.push(translated);

    // Rate limiting
    if (i < texts.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return results;
}
