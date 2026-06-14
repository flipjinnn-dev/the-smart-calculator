const SITE = "https://www.thesmartcalculator.com";

const PAGES = [
  "/health/bmi-calculator",
  "/financial/mortgage-calculator",
  "/maths/percentage-calculator",
  "/physics/velocity-calculator",
  "/health",
  "/financial",
  "/",
  "/es/salud/calculadora-imc",
  "/de/gesundheit/bmi-rechner",
];

function analyze(html, url) {
  const headEnd = html.indexOf("</head>");
  const titleIdx = html.search(/<title[^>]*>/i);
  const descIdx = html.search(/<meta[^>]*name=["']description["']/i);
  const hreflangLinks = [...html.matchAll(/<link[^>]*hreflang[^>]*>/gi)];
  const hreflangAnchors = [...html.matchAll(/<a[^>]*hreflang[^>]*>/gi)];

  const pos = (idx) =>
    idx >= 0 && idx < headEnd ? "IN_HEAD" : idx >= 0 ? "OUTSIDE_HEAD" : "MISSING";

  const linkPos = hreflangLinks.map((m) =>
    html.indexOf(m[0]) < headEnd ? "IN_HEAD" : "OUTSIDE_HEAD"
  );

  const issues = [];
  if (pos(titleIdx) !== "IN_HEAD") issues.push(`title:${pos(titleIdx)}`);
  if (pos(descIdx) !== "IN_HEAD") issues.push(`description:${pos(descIdx)}`);
  if (hreflangLinks.length === 0) issues.push("hreflang-links:MISSING");
  else if (linkPos.some((p) => p !== "IN_HEAD")) {
    issues.push(
      `hreflang-links:${linkPos.filter((p) => p !== "IN_HEAD").length}/${hreflangLinks.length} outside head`
    );
  }
  if (hreflangAnchors.length > 0) {
    issues.push(`hreflang-anchors-in-body:${hreflangAnchors.length}`);
  }

  return {
    url,
    issues,
    hreflangCount: hreflangLinks.length,
    titleInHead: pos(titleIdx) === "IN_HEAD",
    descInHead: pos(descIdx) === "IN_HEAD",
    allHreflangInHead:
      hreflangLinks.length > 0 && linkPos.every((p) => p === "IN_HEAD"),
  };
}

async function fetchFresh(path) {
  const url = `${SITE}${path}${path.includes("?") ? "&" : "?"}seo_scan=${Date.now()}`;
  const res = await fetch(url, {
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      "User-Agent": "SEO-Verify-Bot/1.0",
    },
    cache: "no-store",
  });
  const html = await res.text();
  return {
    status: res.status,
    html,
    age: res.headers.get("age") || "n/a",
    xVercel: res.headers.get("x-vercel-cache") || "n/a",
  };
}

async function checkHreflangStatus(href) {
  try {
    const r = await fetch(href, {
      method: "HEAD",
      redirect: "manual",
      headers: { "Cache-Control": "no-cache" },
    });
    return r.status;
  } catch {
    return 0;
  }
}

console.log("=== LIVE SEO SCAN (cache-bypass fetch) ===\n");

const results = [];
for (const path of PAGES) {
  const { status, html, age, xVercel } = await fetchFresh(path);
  const a = analyze(html, path);
  results.push({ ...a, http: status, age, xVercel });
  const icon = a.issues.length === 0 ? "PASS" : "FAIL";
  console.log(
    `[${icon}] ${path} (HTTP ${status}, age=${age}, vercel=${xVercel})`
  );
  if (a.issues.length) {
    console.log(`       Issues: ${a.issues.join(", ")}`);
  } else {
    console.log(
      `       title/desc/hreflang all in <head> (${a.hreflangCount} hreflang links)`
    );
  }
}

console.log("\n=== HREFLANG URL STATUS (from BMI page) ===");
const bmi = await fetchFresh("/health/bmi-calculator");
const hrefs = [
  ...bmi.html.matchAll(/<link[^>]*hreflang[^>]*href=["']([^"']+)["']/gi),
].map((m) => m[1]);

for (const href of hrefs) {
  const st = await checkHreflangStatus(href);
  const ok = st === 200 ? "OK" : "BAD";
  console.log(`[${ok}] ${st} ${href}`);
}

const fails = results.filter((r) => r.issues.length > 0);
console.log("\n=== SUMMARY ===");
console.log(`Pages scanned: ${results.length}`);
console.log(`Passed: ${results.length - fails.length}`);
console.log(`Failed: ${fails.length}`);
if (fails.length) {
  console.log(`Failed pages: ${fails.map((f) => f.url).join(", ")}`);
}
