#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

const JOBS = [
  {
    client: "app/(calculators-by-category)/(other)/acres-per-hour-calculator/acres-per-hour-calculator-client.tsx",
    page: "app/(calculators-by-category)/(other)/acres-per-hour-calculator/page.tsx",
    id: "acres-per-hour-calculator",
    stripStart: "      {/* Educational Content Section */}",
    stripEnd: "      {/* Rating and Profile Section */}",
    removeIntro: true,
    introStart: "      {/* Introduction Section */}",
    introEnd: "      <div className=\"grid lg:grid-cols-2 gap-8 items-start\">",
  },
  {
    client: "app/(calculators-by-category)/(other)/ovr-calculator/OVRCalculatorClient.tsx",
    page: "app/(calculators-by-category)/(other)/ovr-calculator/page.tsx",
    id: "ovr-calculator",
    stripStart: "      <div ref={contentSectionRef}",
    stripEnd: "      </div>\n    </div>\n  )",
    removeIntro: true,
    introStart: "      <section className=\"mb-12 bg-gradient-to-br from-blue-50 to-purple-50",
    introEnd: "      <div className=\"grid lg:grid-cols-2 gap-8 items-start mb-12\">",
    isOvr: true,
  },
  {
    client: "app/(calculators-by-category)/(other)/notice-period-calculator/notice-period-calculator-client.tsx",
    page: "app/(calculators-by-category)/(other)/notice-period-calculator/page.tsx",
    id: "notice-period-calculator",
    stripStart: "            <div className=\"mt-24 max-w-5xl mx-auto space-y-24\">",
    stripEnd: "              <SimilarCalculators",
    keepSimilar: true,
  },
  {
    client: "app/(calculators-by-category)/(other)/ssc-gpa-calculator/ssc-gpa-calculator-client.tsx",
    page: "app/(calculators-by-category)/(other)/ssc-gpa-calculator/page.tsx",
    id: "ssc-gpa-calculator",
    stripStart: "        {/* Educational Content */}",
    stripEnd: "        <SimilarCalculators",
    keepSimilar: true,
  },
];

function ensureImport(src, id) {
  if (!src.includes("CalculatorGuide")) {
    src = src.replace(
      /import SimilarCalculators[^\n]+\n/,
      (m) =>
        m +
        'import CalculatorGuide, { type CalculatorGuideData } from "@/components/calculator-guide";\n'
    );
    if (!src.includes("CalculatorGuide")) {
      src = src.replace(
        /import \{ RatingProfileSection \}[^\n]+\n/,
        (m) =>
          m +
          'import CalculatorGuide, { type CalculatorGuideData } from "@/components/calculator-guide";\n'
      );
    }
  }

  if (!src.includes("guideContent")) {
    if (src.includes("export default function AcresPerHourCalculatorClient()")) {
      src = src.replace(
        "export default function AcresPerHourCalculatorClient()",
        `interface AcresPerHourCalculatorClientProps {
  content?: Record<string, string>;
  guideContent?: CalculatorGuideData;
}

export default function AcresPerHourCalculatorClient({ content, guideContent }: AcresPerHourCalculatorClientProps) {
  const guideData = guideContent || { color: "green", sections: [], faq: [] };
  const contentData = content || {};`
      );
    } else if (src.includes("export default function OVRCalculatorClient()")) {
      src = src.replace(
        "export default function OVRCalculatorClient()",
        `interface OVRCalculatorClientProps {
  content?: Record<string, string>;
  guideContent?: CalculatorGuideData;
}

export default function OVRCalculatorClient({ content, guideContent }: OVRCalculatorClientProps) {
  const guideData = guideContent || { color: "blue", sections: [], faq: [] };
  const contentData = content || {};`
      );
    } else if (src.includes("export default function NoticePeriodCalculatorClient()")) {
      src = src.replace(
        "export default function NoticePeriodCalculatorClient()",
        `interface NoticePeriodCalculatorClientProps {
  content?: Record<string, string>;
  guideContent?: CalculatorGuideData;
}

export default function NoticePeriodCalculatorClient({ content, guideContent }: NoticePeriodCalculatorClientProps) {
  const guideData = guideContent || { color: "blue", sections: [], faq: [] };
  const contentData = content || {};`
      );
    } else if (src.includes("export default function SscGpaCalculatorClient()")) {
      src = src.replace(
        "export default function SscGpaCalculatorClient()",
        `interface SscGpaCalculatorClientProps {
  content?: Record<string, string>;
  guideContent?: CalculatorGuideData;
}

export default function SscGpaCalculatorClient({ content, guideContent }: SscGpaCalculatorClientProps) {
  const guideData = guideContent || { color: "blue", sections: [], faq: [] };
  const contentData = content || {};`
      );
    }
  }

  return src;
}

function patchClient(job) {
  const full = path.join(ROOT, job.client);
  let src = fs.readFileSync(full, "utf8");
  src = ensureImport(src, job.id);

  if (job.removeIntro && job.introStart && job.introEnd) {
    const i0 = src.indexOf(job.introStart);
    const i1 = src.indexOf(job.introEnd);
    if (i0 >= 0 && i1 > i0) {
      src = src.slice(0, i0) + "      " + src.slice(i1);
    }
  }

  const start = src.indexOf(job.stripStart);
  const end = src.indexOf(job.stripEnd);
  if (start >= 0 && end > start) {
    const replacement = job.keepSimilar
      ? `          <CalculatorGuide data={guideData} layout="article" />\n\n              `
      : `          <CalculatorGuide data={guideData} layout="article" />\n\n      `;
    src = src.slice(0, start) + replacement + src.slice(end);
  }

  src = src.replace(
    /min-h-screen bg-gradient-to-br from-slate-50 via-blue-50\/30 to-purple-50\/20/g,
    "min-h-screen bg-gradient-to-b from-slate-50 to-white"
  );
  src = src.replace(
    /min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50/g,
    "min-h-screen bg-gradient-to-b from-slate-50 to-white"
  );
  src = src.replace(
    /<div className="container mx-auto p-4 max-w-7xl">/g,
    '<div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">\n      <main className="py-8 px-4 sm:px-6 lg:px-8">\n        <div className="max-w-7xl mx-auto">'
  );

  if (job.isOvr) {
    src = src.replace(
      /    <\/div>\n  \)\n\}$/,
      `        </div>\n      </main>\n\n      <RatingProfileSection
        entityId="ovr-calculator"
        entityType="calculator"
        creatorSlug="aiden-asher"
        initialRatingTotal={0}
        initialRatingCount={0}
      />
      <CalculatorGuide data={guideData} layout="article" />
      <SimilarCalculators
        calculators={[{
          calculatorName: "Age Calculator",
          calculatorHref: "/age-calculator",
          calculatorDescription: "Calculate age in years, months, and days from a birth date"
        }]}
        color="blue"
        title="Related Other Calculators"
      />
    </div>
  )
}
`
    );
  } else if (!job.isOvr && job.client.includes("acres-per-hour")) {
    src = src.replace(
      /    <\/div>\n  \);\n\}$/,
      `        </div>\n      </main>\n    </div>\n  );\n}`
    );
  }

  fs.writeFileSync(full, src);
  console.log("CLIENT:", job.client);
}

function patchPage(job) {
  const full = path.join(ROOT, job.page);
  const pageContent = `import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";
import ${job.client.includes("OVRCalculator") ? "OVRCalculatorClient" : job.id.split("-").map((w,i)=> i===0?w:w[0].toUpperCase()+w.slice(1)).join("").replace(/Calculator$/,'') + "CalculatorClient"} from "./${path.basename(path.dirname(job.page)) === "ovr-calculator" ? "OVRCalculatorClient" : job.id + "-client"}";

export default async function Page() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";
  const content = await loadCalculatorUiContent("${job.id}", language);
  const guideContent = await loadCalculatorGuideContent("${job.id}", language);
  return <Client content={content} guideContent={guideContent} />;
}
`;
  // Write proper page per calculator
  let importName, clientFile, exportName;
  if (job.id === "ovr-calculator") {
    importName = "OVRCalculatorClient";
    clientFile = "./OVRCalculatorClient";
    exportName = "OVRCalculatorPage";
  } else if (job.id === "acres-per-hour-calculator") {
    importName = "AcresPerHourCalculatorClient";
    clientFile = "./acres-per-hour-calculator-client";
    exportName = "AcresPerHourCalculatorPage";
  } else if (job.id === "notice-period-calculator") {
    importName = "NoticePeriodCalculatorClient";
    clientFile = "./notice-period-calculator-client";
    exportName = "NoticePeriodCalculatorPage";
  } else {
    importName = "SscGpaCalculatorClient";
    clientFile = "./ssc-gpa-calculator-client";
    exportName = "SscGpaCalculatorPage";
  }

  const page = `import { headers } from "next/headers";
import {
  loadCalculatorUiContent,
  loadCalculatorGuideContent,
} from "@/lib/calculator-page-runtime";
import ${importName} from "${clientFile}";

export default async function ${exportName}() {
  const headersList = await headers();
  const language = headersList.get("x-language") || "en";
  const content = await loadCalculatorUiContent("${job.id}", language);
  const guideContent = await loadCalculatorGuideContent("${job.id}", language);
  return <${importName} content={content} guideContent={guideContent} />;
}
`;
  fs.writeFileSync(full, page);
  console.log("PAGE:", job.page);
}

for (const job of JOBS) {
  try {
    patchClient(job);
    patchPage(job);
  } catch (e) {
    console.error("FAIL", job.id, e);
  }
}
