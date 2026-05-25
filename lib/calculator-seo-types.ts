export type CalculatorSeoData = {
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
  pageTitle: string;
  pageDescription: string;
  canonical?: string;
  openGraph: {
    title: string;
    description: string;
    image: string;
    siteName?: string;
  };
  twitter: {
    card: "summary" | "summary_large_image";
    title: string;
    description: string;
    image: string;
  };
  schema: Record<string, unknown>;
};

export type CalculatorSeoListItem = {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  publicPath: string;
  hasSeoFile: boolean;
};
