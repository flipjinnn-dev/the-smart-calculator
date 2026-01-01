// Server-side function to load homepage content
export async function loadHomepageContent(language: string = 'en') {
  try {
    const contentModule = await import(`@/app/content/homepage/${language}.json`);
    return { content: contentModule.default, loading: false, error: null };
  } catch (err) {
    try {
      const contentModule = await import(`@/app/content/homepage/en.json`);
      return { content: contentModule.default, loading: false, error: null };
    } catch (fallbackErr) {
      return { content: null, loading: false, error: `Failed to load homepage content in ${language} or English` };
    }
  }
}
