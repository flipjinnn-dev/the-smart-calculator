import fs from 'fs';
import path from 'path';

// Languages we support
const languages = ['en', 'br', 'pl', 'de'];

// Get all calculator JSON files from the content directory
const contentDir = path.join(process.cwd(), 'app', 'content');
const calculatorsDir = path.join(contentDir, 'calculators');

// Read all JSON files in the content directory (excluding directories)
const files = fs.readdirSync(contentDir).filter(file => 
  file.endsWith('.json') && 
  !fs.statSync(path.join(contentDir, file)).isDirectory()
);

console.log(`Found ${files.length} calculator files`);

// For each calculator file, create language-specific directories and copy the English content
files.forEach(file => {
  const calculatorId = file.replace('.json', '');
  const calculatorDir = path.join(calculatorsDir, calculatorId);
  
  // Create calculator directory if it doesn't exist
  if (!fs.existsSync(calculatorDir)) {
    fs.mkdirSync(calculatorDir, { recursive: true });
    console.log(`Created directory: ${calculatorDir}`);
  }
  
  // Copy the original English content to the en.json file in the calculator directory
  const originalFilePath = path.join(contentDir, file);
  const englishContentPath = path.join(calculatorDir, 'en.json');
  
  if (!fs.existsSync(englishContentPath)) {
    fs.copyFileSync(originalFilePath, englishContentPath);
    console.log(`Copied ${file} to ${englishContentPath}`);
  }
  
  // Create empty files for other languages (to be filled later)
  languages.filter(lang => lang !== 'en').forEach(lang => {
    const langFilePath = path.join(calculatorDir, `${lang}.json`);
    if (!fs.existsSync(langFilePath)) {
      // For now, just copy the English content as a placeholder
      fs.copyFileSync(originalFilePath, langFilePath);
      console.log(`Created placeholder ${lang}.json for ${calculatorId}`);
    }
  });
});

console.log('Calculator content structure generation completed!');