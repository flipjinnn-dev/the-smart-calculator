import fs from "fs";
import path from "path";
import { translateJSON } from "../lib/translation/gemini-translate";

// Languages to translate to
const LANGUAGES = ["br", "pl", "de"] as const;

// Directories to process
const CONTENT_DIR = path.join(process.cwd(), "app/content/calculators");

/**
 * Translate all calculator content files
 */
async function translateAllContent() {
  console.log("🚀 Starting auto-translation process...\n");
  console.log("📋 Languages: Brazilian Portuguese (br), Polish (pl), German (de)\n");

  // Check if GEMINI_API_KEY is set
  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ ERROR: GEMINI_API_KEY not found in environment variables!");
    console.error("Please add GEMINI_API_KEY to your .env.local file");
    console.error("\nGet your free API key at: https://makersuite.google.com/app/apikey\n");
    process.exit(1);
  }

  // Get all calculator directories
  const calculators = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  console.log(`📁 Found ${calculators.length} calculator(s) to process:\n`);

  for (const calculator of calculators) {
    console.log(`\n${"=".repeat(60)}`);
    console.log(`📊 Processing: ${calculator}`);
    console.log("=".repeat(60));

    const calculatorDir = path.join(CONTENT_DIR, calculator);
    const enFilePath = path.join(calculatorDir, "en.json");

    // Check if English file exists
    if (!fs.existsSync(enFilePath)) {
      console.log(`⚠️  Skipping: en.json not found`);
      continue;
    }

    // Read English content
    console.log(`📖 Reading English content...`);
    const enContent = JSON.parse(fs.readFileSync(enFilePath, "utf-8"));

    // Translate to each language
    for (const lang of LANGUAGES) {
      const outputPath = path.join(calculatorDir, `${lang}.json`);

      // Check if translation already exists
      if (fs.existsSync(outputPath)) {
        console.log(`\n🌍 ${lang.toUpperCase()}: Already exists, skipping...`);
        continue;
      }

      console.log(`\n🌍 Translating to ${lang.toUpperCase()}...`);

      try {
        const translated = await translateJSON(enContent, lang);

        // Save translated content
        fs.writeFileSync(outputPath, JSON.stringify(translated, null, 2), "utf-8");

        console.log(`   ✅ Created: ${path.basename(outputPath)}`);

        // Rate limiting to avoid API limits
        console.log(`   ⏳ Waiting 2 seconds before next translation...`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`   ❌ Error translating to ${lang}:`, error);
      }
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("✨ Translation process complete!");
  console.log("=".repeat(60) + "\n");
}

// Run the translation
translateAllContent().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
