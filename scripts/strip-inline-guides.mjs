#!/usr/bin/env node
import fs from "node:fs";

const files = [
  {
    path: "app/(calculators-by-category)/(other)/acres-per-hour-calculator/acres-per-hour-calculator-client.tsx",
    start: "      {/* Educational Content Section */}",
    end: "      {/* Rating and Profile Section */}",
    introStart: "      {/* Introduction Section */}",
    introEnd: '      <div className="grid lg:grid-cols-2 gap-8 items-start">',
  },
  {
    path: "app/(calculators-by-category)/(other)/notice-period-calculator/notice-period-calculator-client.tsx",
    start: '            <div className="mt-24 max-w-5xl mx-auto space-y-24">',
    end: '            <div className="mt-12">',
  },
  {
    path: "app/(calculators-by-category)/(other)/ssc-gpa-calculator/ssc-gpa-calculator-client.tsx",
    start: '        <Card className="shadow-xl mb-12 pt-2">',
    end: "        <RatingProfileSection",
  },
];

for (const f of files) {
  let s = fs.readFileSync(f.path, "utf8");
  if (f.introStart) {
    const i0 = s.indexOf(f.introStart);
    const i1 = s.indexOf(f.introEnd);
    if (i0 >= 0 && i1 > i0) s = s.slice(0, i0) + "      " + s.slice(i1);
  }
  const i = s.indexOf(f.start);
  const j = s.indexOf(f.end);
  if (i >= 0 && j > i) {
    s =
      s.slice(0, i) +
      '          <CalculatorGuide data={guideData} layout="article" />\n\n            ' +
      s.slice(j);
    fs.writeFileSync(f.path, s);
    console.log("OK", f.path);
  } else {
    console.log("SKIP", f.path, i, j);
  }
}
