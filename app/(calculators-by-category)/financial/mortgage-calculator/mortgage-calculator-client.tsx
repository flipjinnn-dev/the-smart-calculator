"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useMobileScroll } from "@/hooks/useMobileScroll";
import SimilarCalculators from "@/components/similar-calculators";
import { RatingProfileSection } from "@/components/rating-profile-section";

/* ─── TYPES ─────────────────────────────────────────────────── */
interface MortgageResults {
  pi: number; taxMo: number; insMo: number; pmiMo: number; hoaMo: number;
  total: number;
  intNoExtra: number; intExtra: number;
  mNoExtra: number; mExtra: number;
  loan: number; rate: number; term: number;
  extra: number;
  intSaved: number; moSaved: number;
}

interface Seg { l: string; v: number; c: string; }

/* ─── HELPERS ────────────────────────────────────────────────── */
function amortStats(loan: number, mr: number, n: number, pi: number, extra: number) {
  let bal = loan, interest = 0, months = 0;
  for (let m = 0; m < n && bal > 0; m++) {
    const ic = bal * mr;
    let pr = pi - ic + extra;
    if (pr > bal) pr = bal;
    interest += ic; bal = Math.max(0, bal - pr); months = m + 1;
  }
  return { interest, months };
}
function fmt(n: number) { return Math.round(n).toLocaleString("en-US"); }
function fmtK(n: number) {
  if (n >= 1000000) return (n / 1000000).toFixed(2).replace(/\.?0+$/, "") + "M";
  if (n >= 10000) return Math.round(n / 1000) + "K";
  return Math.round(n).toLocaleString("en-US");
}

/* ─── DONUT CHART ────────────────────────────────────────────── */
function drawDonut(canvas: HTMLCanvasElement, segs: Seg[]) {
  const ctx = canvas.getContext("2d"); if (!ctx) return;
  const cx = 80, cy = 80, r = 70, thick = 22;
  ctx.clearRect(0, 0, 160, 160);
  const total = segs.reduce((s, i) => s + i.v, 0); if (total <= 0) return;
  let start = -Math.PI / 2;
  segs.forEach(seg => {
    const sweep = (seg.v / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(cx, cy, r, start, start + sweep);
    ctx.arc(cx, cy, r - thick, start + sweep, start, true);
    ctx.closePath(); ctx.fillStyle = seg.c; ctx.fill();
    start += sweep + 0.018;
  });
}

/* ─── CONTENT RENDERING ──────────────────────────────────────── */
function Callout({ type, badge, text }: { type: string; badge: string; text: string }) {
  const styles: Record<string, string> = {
    tip: "bg-amber-50 border-amber-500 [&_.badge]:text-amber-600",
    insight: "bg-teal-50 border-teal-500 [&_.badge]:text-teal-600",
    warning: "bg-red-50 border-red-600 [&_.badge]:text-red-600",
    info: "bg-blue-50 border-blue-600 [&_.badge]:text-blue-600",
    good: "bg-green-50 border-green-600 [&_.badge]:text-green-600",
  };
  return (
    <div className={`border-l-4 rounded-r-md px-5 py-4 my-5 ${styles[type] || styles.info}`}>
      <div className="badge text-[10.5px] font-extrabold uppercase tracking-widest mb-1.5">{badge}</div>
      <p className="text-sm text-slate-700 leading-relaxed m-0">{text}</p>
    </div>
  );
}

function Steps({ steps }: { steps: Array<{ label: string; text: string }> }) {
  return (
    <div className="flex flex-col gap-2.5 my-4">
      {steps.map((s, i) => (
        <div key={i} className="flex gap-3.5 items-start bg-white border border-slate-200 rounded-lg px-4 py-3.5 shadow-sm hover:border-blue-200 hover:translate-x-[3px] transition-all">
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-blue-700 to-blue-500 text-white text-xs font-extrabold flex items-center justify-center shadow-md">{i + 1}</span>
          <span className="text-sm text-slate-700 leading-relaxed"><strong className="text-slate-900">{s.label}</strong>{s.text}</span>
        </div>
      ))}
    </div>
  );
}

function BulletList({ bullets }: { bullets: string[] }) {
  return (
    <ul className="list-none flex flex-col gap-2 my-3.5 p-0">
      {bullets.map((b, i) => (
        <li key={i} className="flex gap-2.5 items-start text-sm text-slate-700 leading-relaxed">
          <span className="flex-shrink-0 w-[7px] h-[7px] rounded-full bg-blue-600 mt-2" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  );
}

function ContentTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 my-4 shadow-sm">
      <table className="w-full border-collapse text-sm min-w-[460px]">
        <thead><tr className="bg-slate-800">
          {headers.map((h, i) => <th key={i} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">{h}</th>)}
        </tr></thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 1 ? "bg-slate-50 hover:bg-blue-50" : "hover:bg-blue-50"}>
              {row.map((cell, ci) => (
                <td key={ci} className={`px-4 py-3 text-slate-700 border-b border-slate-100 last:border-b-0 ${ci === 0 ? "font-semibold text-slate-800" : ""}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RenderSection({ sec }: { sec: any }) {
  return (
    <div>
      {sec.intro && <p className="text-[14.5px] text-slate-700 leading-[1.75] mb-3.5">{sec.intro}</p>}
      {sec.preamble && <p className="text-[14.5px] text-slate-700 leading-[1.75] mb-3.5">{sec.preamble}</p>}

      {sec.type === "steps" && <Steps steps={sec.steps} />}

      {sec.type === "bullets" && <BulletList bullets={sec.bullets} />}

      {sec.type === "bullets_strong" && (
        <ul className="list-none flex flex-col gap-2 my-3.5 p-0">
          {sec.bullets.map((b: any, i: number) => (
            <li key={i} className="flex gap-2.5 items-start text-sm text-slate-700 leading-relaxed">
              <span className="flex-shrink-0 w-[7px] h-[7px] rounded-full bg-blue-600 mt-2" />
              <span><strong className="text-slate-900 font-semibold">{b.label}</strong>{b.text}</span>
            </li>
          ))}
        </ul>
      )}

      {(sec.type === "subsections" || sec.type === "subsections_with_bullets") && sec.subsections?.map((sub: any, i: number) => (
        <div key={i}>
          <h3 className="text-base font-bold text-slate-800 mt-6 mb-2">{sub.heading}</h3>
          <p className="text-[14.5px] text-slate-700 leading-[1.75] mb-3">{sub.text}</p>
          {sub.example && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 my-3.5 text-sm text-slate-700 leading-relaxed">
              <strong className="text-slate-800">Example:</strong> {sub.example}
            </div>
          )}
        </div>
      ))}

      {sec.type === "subsections_with_bullets" && sec.bullets && (
        <>
          <h3 className="text-base font-bold text-slate-800 mt-6 mb-2">{sec.bulletsHeading}</h3>
          <BulletList bullets={sec.bullets} />
        </>
      )}

      {sec.type === "table" && <ContentTable headers={sec.tableHeaders} rows={sec.tableRows} />}

      {sec.outro && <p className="text-[14.5px] text-slate-700 leading-[1.75] mb-3.5">{sec.outro}</p>}
      {sec.callout && <Callout type={sec.callout.type} badge={sec.callout.badge} text={sec.callout.text} />}
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
interface Props { content: any; }

export default function MortgageCalculatorClient({ content }: Props) {
  const c = content || {};

  /* inputs */
  const [homePrice, setHomePrice] = useState(400000);
  const [downPayment, setDownPayment] = useState(80000);
  const [downPct, setDownPct] = useState(20);
  const [loanTerm, setLoanTerm] = useState(30);
  const [intRate, setIntRate] = useState(6.75);
  const [propTax, setPropTax] = useState(4800);
  const [homeIns, setHomeIns] = useState(1500);
  const [hoa, setHoa] = useState(0);
  const [pmiRate, setPmiRate] = useState(0.5);
  const [extraPmt, setExtraPmt] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [activeTab, setActiveTab] = useState<"buy" | "refi" | "extra">("buy");
  const [activeResTab, setActiveResTab] = useState<"chart" | "table" | "extra">("chart");
  const [results, setResults] = useState<MortgageResults | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const donutRef = useRef<HTMLCanvasElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const scrollToRef = useMobileScroll();

  /* amort table data */
  const [amortRows, setAmortRows] = useState<Array<{ yr: number; yP: number; yI: number; yTI: number; yTotal: number; bal: number }>>([]);

  /* ── sync dp ── */
  const syncFromPrice = useCallback((price: number, pct: number) => {
    setDownPayment(Math.round(price * pct / 100));
  }, []);

  const handlePriceChange = (val: number) => {
    setHomePrice(val);
    syncFromPrice(val, downPct);
  };
  const handleDpAmtChange = (val: number) => {
    setDownPayment(val);
    if (homePrice > 0) setDownPct(+(val / homePrice * 100).toFixed(1));
  };
  const handleDpPctChange = (val: number) => {
    setDownPct(val);
    setDownPayment(Math.round(homePrice * val / 100));
  };

  /* ── calculate ── */
  const calculate = useCallback(() => {
    const loan = Math.max(0, homePrice - downPayment);
    const mr = intRate / 100 / 12;
    const n = loanTerm * 12;
    const ltv = homePrice > 0 ? downPayment / homePrice : 1;
    let pi = 0;
    if (mr === 0) { pi = n > 0 ? loan / n : 0; }
    else { pi = loan * mr * Math.pow(1 + mr, n) / (Math.pow(1 + mr, n) - 1); }
    const taxMo = propTax / 12;
    const insMo = homeIns / 12;
    const pmiMo = ltv < 0.8 ? loan * pmiRate / 100 / 12 : 0;
    const hoaMo = hoa;
    const total = pi + taxMo + insMo + pmiMo + hoaMo;
    const { interest: intNoExtra, months: mNoExtra } = amortStats(loan, mr, n, pi, 0);
    const { interest: intExtra, months: mExtra } = amortStats(loan, mr, n, pi, extraPmt);
    const intSaved = intNoExtra - intExtra;
    const moSaved = mNoExtra - mExtra;
    setResults({ pi, taxMo, insMo, pmiMo, hoaMo, total, intNoExtra, intExtra, mNoExtra, mExtra, loan, rate: intRate, term: loanTerm, extra: extraPmt, intSaved, moSaved });

    /* amort table */
    const rows: typeof amortRows = [];
    let bal = loan;
    for (let yr = 1; yr <= loanTerm && bal > 0; yr++) {
      let yP = 0, yI = 0, yTI = 0, yTotal = 0;
      for (let m = 0; m < 12 && bal > 0; m++) {
        const ic = bal * mr; let pr = pi - ic + extraPmt;
        if (pr > bal) pr = bal;
        bal = Math.max(0, bal - pr);
        yP += pr; yI += ic; yTI += taxMo + insMo; yTotal += pr + ic + taxMo + insMo;
      }
      rows.push({ yr, yP, yI, yTI, yTotal, bal: Math.max(0, bal) });
    }
    setAmortRows(rows);
    scrollToRef(resultsRef as React.RefObject<HTMLElement>);
  }, [homePrice, downPayment, loanTerm, intRate, propTax, homeIns, hoa, pmiRate, extraPmt, scrollToRef]);

  /* draw donut after results update */
  useEffect(() => {
    if (!results || !donutRef.current) return;
    const segs: Seg[] = [
      { l: "P&I", v: results.pi, c: "#1a56db" },
      { l: "Tax", v: results.taxMo, c: "#0d9488" },
      { l: "Insurance", v: results.insMo, c: "#7c3aed" },
    ];
    if (results.pmiMo > 0) segs.push({ l: "PMI", v: results.pmiMo, c: "#d97706" });
    if (results.hoaMo > 0) segs.push({ l: "HOA", v: results.hoaMo, c: "#64748b" });
    drawDonut(donutRef.current, segs);
  }, [results]);

  /* tab switch presets */
  const switchTab = (tab: "buy" | "refi" | "extra") => {
    setActiveTab(tab);
    if (tab === "refi") { setHomePrice(250000); setDownPayment(0); setDownPct(0); setIntRate(6.0); }
    if (tab === "extra") { setExtraPmt(200); setShowMore(true); setActiveResTab("extra"); }
  };

  /* ── slider helper ── */
  const Slider = ({ val, min, max, step, onChange, label }: { val: number; min: number; max: number; step: number; onChange: (v: number) => void; label: string }) => {
    const pct = ((val - min) / (max - min)) * 100;
    return (
      <div className="flex items-center gap-2.5 pt-1.5">
        <input type="range" min={min} max={max} step={step} value={val}
          onChange={e => onChange(parseFloat(e.target.value))}
          className="flex-1 h-1 rounded-sm outline-none cursor-pointer appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
          style={{ background: `linear-gradient(to right,#1a56db ${pct}%,#e2e8f0 ${pct}%)` }}
        />
        <span className="text-[11px] font-semibold text-slate-400 min-w-[36px] text-right">{label}</span>
      </div>
    );
  };

  const FieldLabel = ({ text }: { text: string }) => (
    <label className="block text-[11.5px] font-bold text-slate-500 uppercase tracking-[0.65px] mb-1.5">{text}</label>
  );

  const fieldCls = "w-full h-11 border-[1.5px] border-slate-200 rounded-lg text-[15px] font-semibold text-slate-900 bg-white px-3 outline-none focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(26,86,219,0.12)] hover:border-slate-300 transition-all appearance-none [font-family:inherit]";

  /* extra payment scenario builder */
  const extraScenarios = [0, 100, 200, 300];

  return (
    <>
      {/* ── PAGE WRAPPER ── */}
      <div style={{ fontFamily: "'Inter',-apple-system,sans-serif", background: "#f0f4f9", minHeight: "100vh" }}>

        {/* HERO */}
        <div style={{ background: "linear-gradient(160deg,#0f172a 0%,#1e3a8a 55%,#1a56db 100%)", padding: "44px 24px 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 0%,rgba(59,130,246,.25) 0%,transparent 70%)", pointerEvents: "none" }} />
          <div className="pb-5" style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <nav className="flex items-center gap-1.5 text-[13px] mb-5" style={{ color: "rgba(255,255,255,.5)" }}>
              <a href="/" style={{ color: "rgba(255,255,255,.55)" }}>{c.breadcrumb?.home || "Home"}</a>
              <span style={{ color: "rgba(255,255,255,.3)" }}>›</span>
              <a href="/financial" style={{ color: "rgba(255,255,255,.55)" }}>{c.breadcrumb?.financial || "Financial Calculators"}</a>
              <span style={{ color: "rgba(255,255,255,.3)" }}>›</span>
              <span style={{ color: "rgba(255,255,255,.75)" }}>{c.breadcrumb?.current || "Mortgage Calculator"}</span>
            </nav>
            <h1 className="text-4xl md:text-[36px] font-extrabold mb-2.5 leading-tight" style={{ color: "#fff", letterSpacing: "-0.6px" }}>{c.heroTitle || "Mortgage Calculator"}</h1>
            <p className="text-[15px] mb-6 mx-auto max-w-lg" style={{ color: "rgba(255,255,255,.65)" }}>{c.heroSubtitle || "Get your complete monthly payment breakdown instantly."}</p>
          </div>
        </div>

        {/* CALC CARD */}
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ background: "#fff", borderRadius: 22, boxShadow: "0 8px 40px rgba(15,23,42,.1),0 4px 12px rgba(15,23,42,.06)", overflow: "hidden", position: "relative", top: -28, border: "1px solid #e8edf4" }}>

            {/* TABS */}
            <div className="flex border-b border-slate-200" style={{ background: "#f8fafc", padding: "0 6px" }}>
              {(["buy", "refi", "extra"] as const).map(t => (
                <button key={t} onClick={() => switchTab(t)}
                  className={`px-[18px] py-3.5 text-[13px] font-semibold cursor-pointer border-b-2 transition-all whitespace-nowrap ${activeTab === t ? "text-blue-600 border-blue-600" : "text-slate-500 border-transparent hover:text-slate-700"}`}
                  style={{ marginBottom: -1 }}>
                  {(c.tabs as any)?.[t] || t}
                </button>
              ))}
            </div>

            {/* INPUTS */}
            <div className="p-7 pb-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-5">
                {/* Home Price */}
                <div>
                  <FieldLabel text={c.fields?.homePrice || "Home Price"} />
                  <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">$</span>
                    <input type="number" value={homePrice} min={0} step={5000} onChange={e => handlePriceChange(parseFloat(e.target.value) || 0)} className={fieldCls} style={{ paddingLeft: 26 }} />
                  </div>
                  <Slider val={Math.min(homePrice, 2000000)} min={50000} max={2000000} step={5000} onChange={handlePriceChange} label={homePrice >= 1000000 ? `$${(homePrice / 1000000).toFixed(1)}M` : `$${Math.round(homePrice / 1000)}K`} />
                </div>
                {/* Down Payment */}
                <div>
                  <FieldLabel text={c.fields?.downPayment || "Down Payment"} />
                  <div className="flex gap-2">
                    <div className="relative flex-1"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">$</span>
                      <input type="number" value={downPayment} min={0} onChange={e => handleDpAmtChange(parseFloat(e.target.value) || 0)} className={fieldCls} style={{ paddingLeft: 26 }} />
                    </div>
                    <div className="relative w-24">
                      <input type="number" value={downPct} min={0} max={100} step={0.5} onChange={e => handleDpPctChange(parseFloat(e.target.value) || 0)} className={fieldCls} style={{ paddingRight: 26 }} />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">%</span>
                    </div>
                  </div>
                  <Slider val={Math.min(downPct, 50)} min={0} max={50} step={0.5} onChange={handleDpPctChange} label={`${downPct}%`} />
                </div>
                {/* Loan Term */}
                <div>
                  <FieldLabel text={c.fields?.loanTerm || "Loan Term"} />
                  <select value={loanTerm} onChange={e => setLoanTerm(parseInt(e.target.value))} className={fieldCls}>
                    {[10, 15, 20, 30].map(y => <option key={y} value={y}>{(c.loanTermOptions as any)?.[y] || `${y} Years`}</option>)}
                  </select>
                </div>
                {/* Interest Rate */}
                <div>
                  <FieldLabel text={c.fields?.interestRate || "Interest Rate"} />
                  <div className="relative">
                    <input type="number" value={intRate} min={0} max={30} step={0.05} onChange={e => setIntRate(parseFloat(e.target.value) || 0)} className={fieldCls} style={{ paddingRight: 32 }} />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">%</span>
                  </div>
                  <Slider val={intRate} min={1} max={20} step={0.05} onChange={setIntRate} label={`${intRate}%`} />
                </div>
              </div>

              {/* More options toggle */}
              <div className="flex justify-center py-1 pb-5">
                <button onClick={() => setShowMore(!showMore)}
                  className={`flex items-center gap-2 px-5 py-2.5 border-[1.5px] border-slate-200 rounded-full bg-white text-[13px] font-semibold text-slate-500 cursor-pointer transition-all hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50`}>
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={2.5} fill="none"><path d="M12 4v16m-8-8h16" /></svg>
                  <span>{showMore ? (c.moreOptions?.hide || "Hide Options") : (c.moreOptions?.show || "Add Taxes, Insurance & HOA")}</span>
                  <svg viewBox="0 0 24 24" className={`w-3.5 h-3.5 transition-transform ${showMore ? "rotate-180" : ""}`} stroke="currentColor" strokeWidth={2.5} fill="none"><path d="M6 9l6 6 6-6" /></svg>
                </button>
              </div>

              {showMore && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pb-5">
                  <div>
                    <FieldLabel text={c.fields?.propertyTax || "Property Tax ($/yr)"} />
                    <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">$</span>
                      <input type="number" value={propTax} min={0} onChange={e => setPropTax(parseFloat(e.target.value) || 0)} className={fieldCls} style={{ paddingLeft: 26 }} />
                    </div>
                  </div>
                  <div>
                    <FieldLabel text={c.fields?.homeInsurance || "Home Insurance ($/yr)"} />
                    <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">$</span>
                      <input type="number" value={homeIns} min={0} onChange={e => setHomeIns(parseFloat(e.target.value) || 0)} className={fieldCls} style={{ paddingLeft: 26 }} />
                    </div>
                  </div>
                  <div>
                    <FieldLabel text={c.fields?.hoaFees || "HOA Fees ($/mo)"} />
                    <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">$</span>
                      <input type="number" value={hoa} min={0} onChange={e => setHoa(parseFloat(e.target.value) || 0)} className={fieldCls} style={{ paddingLeft: 26 }} />
                    </div>
                  </div>
                  <div>
                    <FieldLabel text={c.fields?.pmiRate || "PMI Rate (%/yr)"} />
                    <div className="relative">
                      <input type="number" value={pmiRate} min={0} max={5} step={0.1} onChange={e => setPmiRate(parseFloat(e.target.value) || 0)} className={fieldCls} style={{ paddingRight: 32 }} />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">%</span>
                    </div>
                  </div>
                  <div>
                    <FieldLabel text={c.fields?.extraPayment || "Extra Payment ($/mo)"} />
                    <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">$</span>
                      <input type="number" value={extraPmt} min={0} onChange={e => setExtraPmt(parseFloat(e.target.value) || 0)} className={fieldCls} style={{ paddingLeft: 26 }} />
                    </div>
                    <Slider val={Math.min(extraPmt, 2000)} min={0} max={2000} step={50} onChange={setExtraPmt} label={`$${extraPmt}`} />
                  </div>
                </div>
              )}
            </div>

            {/* CALCULATE BUTTON */}
            <div className="px-7 pb-7">
              <button onClick={calculate}
                className="w-full h-14 flex items-center justify-center gap-2.5 rounded-lg text-white text-base font-bold cursor-pointer transition-all hover:-translate-y-px hover:shadow-xl active:translate-y-0"
                style={{ background: "linear-gradient(135deg,#1648c0,#1a56db 60%,#2563eb)", boxShadow: "0 4px 16px rgba(26,86,219,.3)" }}>
                <svg viewBox="0 0 24 24" className="w-5 h-5" stroke="currentColor" strokeWidth={2.5} fill="none"><path d="M9 7H5a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-4M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M9 7h6" /></svg>
                {c.calculateBtn || "Calculate My Mortgage Payment"}
              </button>
            </div>

            {/* DIVIDER */}
            <div style={{ height: 1, background: "#e8edf4", margin: "0 28px" }} />

            {/* RESULTS */}
            {results && (
              <div ref={resultsRef} className="p-7">
                {/* Top row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                  {/* Monthly Payment */}
                  <div className="rounded-xl p-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#0f172a,#1e3a8a)", color: "#fff" }}>
                    <div style={{ position: "absolute", top: -40, right: -30, width: 160, height: 160, borderRadius: "50%", background: "rgba(59,130,246,.15)", pointerEvents: "none" }} />
                    <div className="text-[11px] font-bold uppercase tracking-[.8px] mb-2" style={{ color: "rgba(255,255,255,.5)" }}>{c.results?.monthlyPayment || "Monthly Payment"}</div>
                    <div className="text-[44px] font-extrabold leading-none mb-1" style={{ letterSpacing: -1.5 }}>
                      <sup className="text-[22px] font-semibold align-super">$</sup>{fmt(results.total)}
                    </div>
                    <div className="text-[12px] mt-2" style={{ color: "rgba(255,255,255,.5)" }}>
                      Loan ${fmtK(results.loan)} · {results.term}-yr · {results.rate}% APR{results.extra > 0 ? ` · +$${fmt(results.extra)}/mo extra` : ""}
                    </div>
                  </div>
                  {/* Donut */}
                  <div className="flex flex-col items-center justify-center p-4">
                    <div className="relative w-40 h-40">
                      <canvas ref={donutRef} width={160} height={160} style={{ width: 160, height: 160 }} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <div className="text-[10px] font-semibold uppercase tracking-[.5px] text-slate-400">{c.results?.piLabel || "P&I"}</div>
                        <div className="text-sm font-bold text-slate-800">${fmt(results.pi)}</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3 justify-center">
                      {[
                        { l: c.results?.breakdown?.principalInterest || "P&I", c: "#1a56db" },
                        { l: c.results?.breakdown?.propertyTax || "Tax", c: "#0d9488" },
                        { l: c.results?.breakdown?.homeInsurance || "Insurance", c: "#7c3aed" },
                        ...(results.pmiMo > 0 ? [{ l: c.results?.breakdown?.pmi || "PMI", c: "#d97706" }] : []),
                        ...(results.hoaMo > 0 ? [{ l: c.results?.breakdown?.hoa || "HOA", c: "#64748b" }] : []),
                      ].map((s, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[12px] text-slate-600">
                          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.c }} />
                          {s.l}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Breakdown cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 mb-5">
                  {[
                    { l: c.results?.breakdown?.principalInterest || "P&I", v: results.pi, cls: "text-blue-600" },
                    { l: c.results?.breakdown?.propertyTax || "Property Tax", v: results.taxMo, cls: "text-teal-600" },
                    { l: c.results?.breakdown?.homeInsurance || "Home Insurance", v: results.insMo, cls: "text-purple-600" },
                    ...(results.pmiMo > 0 ? [{ l: c.results?.breakdown?.pmi || "PMI", v: results.pmiMo, cls: "text-amber-600" }] : []),
                    ...(results.hoaMo > 0 ? [{ l: c.results?.breakdown?.hoa || "HOA", v: results.hoaMo, cls: "text-slate-600" }] : []),
                  ].map((item, i) => (
                    <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
                      <div className="text-[10.5px] font-bold uppercase tracking-[.5px] text-slate-400 mb-1">{item.l}</div>
                      <div className={`text-lg font-extrabold ${item.cls}`} style={{ letterSpacing: -0.4 }}>${fmt(item.v)}</div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="flex flex-wrap gap-4 rounded-xl p-5 mb-5" style={{ background: "linear-gradient(135deg,#eff6ff,#e0f2fe)", border: "1px solid #bfdbfe" }}>
                  {[
                    { l: c.results?.totals?.totalPrincipal || "Total Principal", v: `$${fmtK(results.loan)}` },
                    { l: c.results?.totals?.totalInterest || "Total Interest", v: `$${fmtK(results.extra > 0 ? results.intExtra : results.intNoExtra)}` },
                    { l: c.results?.totals?.totalPaid || "Total Paid", v: `$${fmtK(results.loan + (results.extra > 0 ? results.intExtra : results.intNoExtra))}` },
                    {
                      l: c.results?.totals?.payoffTerm || "Payoff Term",
                      v: results.extra > 0
                        ? `${Math.floor(results.mExtra / 12)}yr ${results.mExtra % 12}mo`
                        : `${Math.floor(results.mNoExtra / 12)}yr ${results.mNoExtra % 12}mo`
                    },
                  ].map((t, i) => (
                    <div key={i}>
                      <div className="text-[11px] font-bold uppercase tracking-[.6px] text-blue-600 mb-0.5">{t.l}</div>
                      <div className="text-lg font-extrabold text-slate-900" style={{ letterSpacing: -0.4 }}>{t.v}</div>
                    </div>
                  ))}
                </div>

                {/* Savings banner */}
                {results.extra > 0 && results.intSaved > 100 && (
                  <div className="flex items-center gap-3 rounded-md p-3.5 mb-5" style={{ background: "#ecfdf5", border: "1px solid rgba(5,150,105,.25)" }}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(5,150,105,.15)" }}>
                      <svg viewBox="0 0 24 24" className="w-4 h-4" stroke="#059669" strokeWidth={2.5} fill="none"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-green-700">You save ${fmt(results.intSaved)} in interest</div>
                      <div className="text-[12px] text-slate-600">Extra ${fmt(results.extra)}/mo cuts {results.moSaved} month{results.moSaved !== 1 ? "s" : ""} off your loan term</div>
                    </div>
                  </div>
                )}

                {/* Result tabs */}
                <div className="flex gap-1 border-b border-slate-200 mb-4 mt-5">
                  {([
                    { id: "chart", label: c.results?.tabs?.balanceChart || "📊 Balance Chart" },
                    { id: "table", label: c.results?.tabs?.amortTable || "📋 Amortization Table" },
                    { id: "extra", label: c.results?.tabs?.extraSavings || "💡 Extra Payment Savings" },
                  ] as const).map(t => (
                    <button key={t.id} onClick={() => setActiveResTab(t.id)}
                      className={`px-4 py-2.5 text-[13px] font-semibold cursor-pointer border-b-2 transition-all ${activeResTab === t.id ? "text-blue-600 border-blue-600" : "text-slate-500 border-transparent hover:text-slate-700"}`}
                      style={{ marginBottom: -1 }}>
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Balance Chart tab */}
                {activeResTab === "chart" && (
                  <div>
                    <div className="h-52 flex items-end gap-px overflow-hidden rounded-lg bg-slate-50 border border-slate-100 p-4">
                      {amortRows.map((row, i) => {
                        const maxBal = results.loan;
                        const h = maxBal > 0 ? (row.bal / maxBal) * 100 : 0;
                        return (
                          <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-0.5 group relative">
                            <div title={`Yr ${row.yr}: $${fmtK(row.bal)}`}
                              style={{ height: `${h}%`, minHeight: 2, background: "linear-gradient(to top,#1a56db,#3b82f6)" }}
                              className="w-full rounded-t-sm transition-all group-hover:opacity-80" />
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-center text-[12px] text-slate-400 mt-1.5">{c.results?.chartNote || "Principal balance over time"}</p>
                  </div>
                )}

                {/* Amortization Table tab */}
                {activeResTab === "table" && (
                  <div className="border border-slate-200 rounded-lg overflow-hidden max-h-80 overflow-y-auto">
                    <table className="w-full border-collapse text-[13px]">
                      <thead className="sticky top-0">
                        <tr style={{ background: "#1e293b" }}>
                          {[c.results?.amortHeaders?.year || "Year", c.results?.amortHeaders?.principal || "Principal", c.results?.amortHeaders?.interest || "Interest", c.results?.amortHeaders?.taxesIns || "Taxes+Ins", c.results?.amortHeaders?.totalPaid || "Total Paid", c.results?.amortHeaders?.balance || "Balance"].map((h, i) => (
                            <th key={i} className={`px-3.5 py-2.5 text-[11px] font-bold uppercase tracking-[.5px] ${i === 0 ? "text-left text-slate-300" : "text-right text-slate-400"}`}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {amortRows.map((row, i) => (
                          <tr key={i} className={i % 2 === 1 ? "bg-slate-50 hover:bg-blue-50" : "hover:bg-blue-50"}>
                            <td className="px-3.5 py-2.5 text-left font-bold text-slate-800 border-b border-slate-100">Year {row.yr}</td>
                            {[row.yP, row.yI, row.yTI, row.yTotal, row.bal].map((v, j) => (
                              <td key={j} className="px-3.5 py-2.5 text-right text-slate-600 border-b border-slate-100">${fmt(v)}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Extra Payments tab */}
                {activeResTab === "extra" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {extraScenarios.map((sc, i) => {
                      const { interest, months } = amortStats(results.loan, results.rate / 100 / 12, results.term * 12, results.pi, sc);
                      const intSave = results.intNoExtra - interest;
                      const moSave = results.mNoExtra - months;
                      const isHighlight = i > 0 && intSave > 0;
                      return (
                        <div key={i} className={`border rounded-lg overflow-hidden ${isHighlight ? "border-green-500 shadow-[0_0_0_3px_rgba(5,150,105,.1)]" : "border-slate-200"}`}>
                          <div className={`px-4 py-3 text-[12px] font-bold uppercase tracking-[.5px] border-b ${isHighlight ? "bg-green-50 border-green-200 text-green-700" : "bg-slate-50 border-slate-200 text-slate-600"}`}>
                            {[c.results?.extraScenarios?.noExtra || "No Extra Payment", c.results?.extraScenarios?.plus100 || "+$100/month", c.results?.extraScenarios?.plus200 || "+$200/month", c.results?.extraScenarios?.plus300 || "+$300/month"][i]}
                          </div>
                          <div className="p-4">
                            {[
                              { k: c.results?.extraLabels?.monthlyPI || "Monthly P&I", v: `$${fmt(results.pi + sc)}`, green: false },
                              { k: c.results?.extraLabels?.totalInterest || "Total Interest", v: `$${fmt(interest)}`, green: false },
                              { k: c.results?.extraLabels?.totalCost || "Total Cost", v: `$${fmt(results.loan + interest)}`, green: false },
                              { k: c.results?.extraLabels?.payoff || "Payoff", v: `${Math.floor(months / 12)}yr ${months % 12}mo`, green: false },
                              ...(isHighlight ? [{ k: c.results?.extraLabels?.interestSaved || "Interest Saved", v: `$${fmt(intSave)}`, green: true }] : []),
                              ...(isHighlight && moSave > 0 ? [{ k: c.results?.extraLabels?.timeSaved || "Time Saved", v: `${moSave} months`, green: true }] : []),
                            ].map((row, j) => (
                              <div key={j} className="flex justify-between items-center py-1.5 border-b border-slate-100 last:border-none">
                                <span className="text-[12px] text-slate-500">{row.k}</span>
                                <span className={`text-[13px] font-bold ${row.green ? "text-green-600" : "text-slate-800"}`}>{row.v}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── PAGE CONTENT ── */}
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 20px 80px" }}>
          {/* Quick Answer */}
          {c.quickAnswer && (
            <div className="bg-white border-l-4 border-blue-600 rounded-r-lg p-4 mb-5" style={{ borderTop: "1px solid #bfdbfe", borderRight: "1px solid #bfdbfe", borderBottom: "1px solid #bfdbfe", boxShadow: "0 1px 3px rgba(15,23,42,.07)" }}>
              <div className="text-[10.5px] font-extrabold uppercase tracking-[.8px] text-blue-600 mb-1.5">{c.quickAnswer.badge}</div>
              <p className="text-[14.5px] text-slate-700 leading-relaxed m-0">{c.quickAnswer.text}</p>
            </div>
          )}

          {/* Intro paragraphs */}
          {c.intro?.map((p: string, i: number) => (
            <p key={i} className="text-[15px] text-slate-700 leading-[1.78] mb-3.5">{p}</p>
          ))}

          {/* Content sections */}
          {c.sections?.map((sec: any, i: number) => (
            <div key={i} className="mt-12">
              <h2 className="text-[22px] font-extrabold text-slate-900 mb-3 pb-3 border-b-2 border-slate-100" style={{ letterSpacing: -0.3, lineHeight: 1.25 }}>{sec.heading}</h2>
              <RenderSection sec={sec} />
            </div>
          ))}

          {/* FAQ */}
          {c.faq && (
            <div className="mt-12">
              <h2 className="text-[22px] font-extrabold text-slate-900 mb-3 pb-3 border-b-2 border-slate-100" style={{ letterSpacing: -0.3 }}>{c.faq.heading}</h2>
              <div className="flex flex-col gap-1.5 mt-4">
                {c.faq.items?.map((item: { q: string; a: string }, i: number) => (
                  <div key={i} className={`border rounded-lg overflow-hidden bg-white transition-all ${openFaq === i ? "border-blue-200 shadow-[0_0_0_3px_rgba(26,86,219,.06)]" : "border-slate-200"}`}
                    style={{ boxShadow: "0 1px 3px rgba(15,23,42,.07)" }}>
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className={`w-full flex justify-between items-center gap-3.5 px-4 py-4 text-left cursor-pointer transition-all ${openFaq === i ? "bg-blue-50" : "hover:bg-slate-50 bg-transparent"} border-none`}>
                      <span className="text-[14px] font-semibold text-slate-800 leading-snug">{item.q}</span>
                      <span className={`flex-shrink-0 w-6 h-6 rounded-full border-[1.5px] border-blue-600 flex items-center justify-center transition-all ${openFaq === i ? "bg-blue-600 rotate-45" : ""}`}>
                        <svg viewBox="0 0 24 24" className={`w-[10px] h-[10px] ${openFaq === i ? "stroke-white" : "stroke-blue-600"}`} strokeWidth={3} fill="none"><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" /></svg>
                      </span>
                    </button>
                    {openFaq === i && (
                      <div className="px-4 pb-4 border-t border-blue-100">
                        <p className="text-[14px] text-slate-600 leading-[1.75] mt-3 mb-0">{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Calculators */}
          {c.relatedCalcs && (
            <div className="mt-12">
              <h2 className="text-[22px] font-extrabold text-slate-900 mb-2 pb-3 border-b-2 border-slate-100" style={{ letterSpacing: -0.3 }}>{c.relatedCalcs.heading}</h2>
              <p className="text-[14.5px] text-slate-700 mb-4">{c.relatedCalcs.sub}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {c.relatedCalcs.items?.map((item: { name: string; href: string; desc: string }, i: number) => (
                  <a key={i} href={item.href} className="bg-white border border-slate-200 rounded-lg p-4 no-underline transition-all hover:border-blue-600 hover:-translate-y-0.5 hover:shadow-md" style={{ boxShadow: "0 1px 3px rgba(15,23,42,.07)" }}>
                    <div className="text-[13.5px] font-bold text-blue-600 mb-1">{item.name}</div>
                    <div className="text-[12px] text-slate-500 leading-snug">{item.desc}</div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Takeaways */}
          {c.takeaways && (
            <div className="mt-12 rounded-2xl p-7" style={{ background: "linear-gradient(135deg,#eff6ff 0%,#e0f2fe 100%)", border: "1px solid #bfdbfe", boxShadow: "0 1px 3px rgba(15,23,42,.07)" }}>
              <h2 className="text-xl font-extrabold text-slate-900 mb-4" style={{ letterSpacing: -0.3 }}>{c.takeaways.heading}</h2>
              <ul className="list-none flex flex-col gap-2 p-0 m-0">
                {c.takeaways.bullets?.map((b: string, i: number) => (
                  <li key={i} className="flex gap-2.5 items-start text-sm text-slate-700 leading-relaxed">
                    <span className="flex-shrink-0 w-[7px] h-[7px] rounded-full bg-blue-600 mt-2" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[13px] text-slate-500 mt-4 mb-0 leading-relaxed">{c.takeaways.closing}</p>
            </div>
          )}

          {/* Rating & Profile */}
          <div className="mt-10">
            <RatingProfileSection
              entityId="mortgage-calculator"
              entityType="calculator"
              creatorSlug="neo-nicholas"
              initialRatingTotal={0}
              initialRatingCount={0}
            />
          </div>

          {/* Similar Calculators */}
          <div className="mt-8">
            <SimilarCalculators
              calculators={[
                { calculatorName: "Amortization Calculator", calculatorHref: "/financial/amortization-calculator", calculatorDescription: "Generate a full amortization schedule for any loan" },
                { calculatorName: "Mortgage Payoff Calculator", calculatorHref: "/financial/mortgage-payoff-calculator", calculatorDescription: "Find your exact payoff date with extra payments" },
                { calculatorName: "House Affordability Calculator", calculatorHref: "/financial/house-affordability-calculator", calculatorDescription: "Determine how much house you can afford" },
              ]}
              color="blue"
              title="Related Financial Calculators"
            />
          </div>
        </div>
      </div>
    </>
  );
}
