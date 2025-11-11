#!/usr/bin/env node

// Script to automatically translate all calculator content files
// Usage: npm run translate-content

import fs from 'fs/promises';
import path from 'path';
// @vitalets/google-translate-api is a free, unofficial Google Translate API
// Install with: npm install @vitalets/google-translate-api
// @ts-ignore
import translate from '@vitalets/google-translate-api';

// Define the languages to translate to
const TARGET_LANGUAGES = ['br', 'pl', 'de'];
const SOURCE_LANGUAGE = 'en';

// Cache to avoid re-translating the same text
const translationCache = new Map<string, Record<string, string>>();

async function loadCache() {
  try {
    const cacheData = await fs.readFile(path.join(__dirname, 'translation-cache.json'), 'utf8');
    const parsed = JSON.parse(cacheData);
    for (const [key, value] of Object.entries(parsed)) {
      translationCache.set(key, value as Record<string, string>);
    }
    console.log(`Loaded ${translationCache.size} cached translations`);
  } catch (err) {
    console.log('No cache file found, starting fresh');
  }
}

async function saveCache() {
  try {
    await fs.writeFile(
      path.join(__dirname, 'translation-cache.json'), 
      JSON.stringify(Object.fromEntries(translationCache), null, 2)
    );
    console.log(`Saved ${translationCache.size} translations to cache`);
  } catch (err) {
    console.error('Failed to save cache:', err);
  }
}

async function translateText(text: string, targetLang: string): Promise<string> {
  // Check cache first
  const cacheKey = `${text}___${targetLang}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey) as any;
  }

  try {
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const result = await translate(text, { from: SOURCE_LANGUAGE, to: targetLang });
    const translated = result.text;
    
    // Cache the result
    translationCache.set(cacheKey, translated);
    
    return translated;
  } catch (err) {
    console.error(`Translation failed for "${text}" to ${targetLang}:`, err);
    // Return original text as fallback
    return text;
  }
}

async function translateObject(obj: any, targetLang: string): Promise<any> {
  if (typeof obj === 'string') {
    return await translateText(obj, targetLang);
  }
  
  if (Array.isArray(obj)) {
    const result = [];
    for (const item of obj) {
      result.push(await translateObject(item, targetLang));
    }
    return result;
  }
  
  if (obj && typeof obj === 'object') {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = await translateObject(value, targetLang);
    }
    return result;
  }
  
  return obj;
}

async function translateCalculatorContent(calculatorId: string) {
  console.log(`Translating content for calculator: ${calculatorId}`);
  
  const contentDir = path.join(__dirname, '..', 'app', 'content', 'calculators', calculatorId);
  
  try {
    // Check if English content exists
    const enContentPath = path.join(contentDir, 'en.json');
    await fs.access(enContentPath);
    
    // Read English content
    const enContent = JSON.parse(await fs.readFile(enContentPath, 'utf8'));
    
    // Translate to each target language
    for (const lang of TARGET_LANGUAGES) {
      try {
        console.log(`  Translating to ${lang}...`);
        const translatedContent = await translateObject(enContent, lang);
        
        // Save translated content
        const langContentPath = path.join(contentDir, `${lang}.json`);
        await fs.writeFile(langContentPath, JSON.stringify(translatedContent, null, 2));
        console.log(`  ✓ Saved ${lang}.json`);
      } catch (err) {
        console.error(`  ✗ Failed to translate to ${lang}:`, err);
      }
    }
  } catch (err) {
    console.error(`  ✗ Failed to process ${calculatorId}:`, err);
  }
}

async function getAllCalculatorIds() {
  const calculatorsDir = path.join(__dirname, '..', 'app', 'content', 'calculators');
  const entries = await fs.readdir(calculatorsDir);
  
  const calculatorIds = [];
  for (const entry of entries) {
    const entryPath = path.join(calculatorsDir, entry);
    const stat = await fs.stat(entryPath);
    
    if (stat.isDirectory()) {
      calculatorIds.push(entry);
    }
  }
  
  return calculatorIds;
}

async function main() {
  console.log('Starting automatic translation of calculator content...');
  
  // Load existing translations from cache
  await loadCache();
  
  try {
    // Get all calculator IDs
    const calculatorIds = await getAllCalculatorIds();
    console.log(`Found ${calculatorIds.length} calculators to translate`);
    
    // Translate each calculator
    for (const calculatorId of calculatorIds) {
      await translateCalculatorContent(calculatorId);
    }
    
    // Save cache
    await saveCache();
    
    console.log('\n✅ Translation completed!');
    console.log(`Processed ${calculatorIds.length} calculators`);
    console.log(`Cached ${translationCache.size} translations`);
  } catch (err) {
    console.error('Translation process failed:', err);
    // Save cache even if process failed
    await saveCache();
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

export { translateText, translateObject };