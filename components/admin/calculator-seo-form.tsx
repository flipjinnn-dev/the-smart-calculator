"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CalculatorSeoData } from "@/lib/calculator-seo";

type Props = {
  calculatorId: string;
  calculatorLabel: string;
  publicPath: string;
  initial: CalculatorSeoData;
};

export function CalculatorSeoForm({
  calculatorId,
  calculatorLabel,
  publicPath,
  initial,
}: Props) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [schemaText, setSchemaText] = useState(
    JSON.stringify(initial.schema, null, 2)
  );
  const [saving, setSaving] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof CalculatorSeoData>(
    key: K,
    value: CalculatorSeoData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/admin/calculator-seo", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          calculatorId,
          language: "en",
          ...form,
          schema: schemaText,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Save failed");
      }
      const paths = Array.isArray(json.revalidatedPaths)
        ? (json.revalidatedPaths as string[]).join(", ")
        : publicPath;
      const storageNote =
        json.storage === "blob"
          ? " Stored on Vercel Blob."
          : json.storage === "filesystem"
            ? " Saved to app/content/calculator-seo/ (commit & deploy for live)."
            : "";
      setMessage(
        `Saved. Page cache cleared${paths ? ` (${paths})` : ""}.${storageNote}`
      );
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleClearCache() {
    setClearing(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/admin/calculator-seo/revalidate", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          calculatorId,
          canonical: form.canonical,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Cache clear failed");
      }
      setMessage(json.message || "Page cache cleared.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cache clear failed");
    } finally {
      setClearing(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      <div className="flex flex-wrap gap-3 text-sm">
        <Link href="/admin/calculators/seo" className="text-blue-600 hover:underline">
          ← All calculators
        </Link>
        <a
          href={publicPath}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          View live page
        </a>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">{calculatorLabel}</h1>
        <p className="text-gray-600 text-sm mt-1">Calculator ID: {calculatorId}</p>
      </div>

      <section className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Meta tags</h2>
        <div>
          <Label htmlFor="metaTitle">Meta title</Label>
          <Input
            id="metaTitle"
            value={form.metaTitle}
            onChange={(e) => update("metaTitle", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="metaDescription">Meta description</Label>
          <Textarea
            id="metaDescription"
            value={form.metaDescription}
            onChange={(e) => update("metaDescription", e.target.value)}
            rows={3}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="keywords">Keywords</Label>
          <Input
            id="keywords"
            value={form.keywords ?? ""}
            onChange={(e) => update("keywords", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="canonical">Canonical URL</Label>
          <Input
            id="canonical"
            value={form.canonical ?? ""}
            onChange={(e) => update("canonical", e.target.value)}
            className="mt-1"
            placeholder="https://www.thesmartcalculator.com/..."
          />
        </div>
      </section>

      <section className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">On-page hero</h2>
        <div>
          <Label htmlFor="pageTitle">Page title (H1)</Label>
          <Input
            id="pageTitle"
            value={form.pageTitle}
            onChange={(e) => update("pageTitle", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="pageDescription">Page description</Label>
          <Textarea
            id="pageDescription"
            value={form.pageDescription}
            onChange={(e) => update("pageDescription", e.target.value)}
            rows={3}
            className="mt-1"
          />
        </div>
      </section>

      <section className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Open Graph</h2>
        <div>
          <Label>OG title</Label>
          <Input
            value={form.openGraph.title}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                openGraph: { ...p.openGraph, title: e.target.value },
              }))
            }
            className="mt-1"
          />
        </div>
        <div>
          <Label>OG description</Label>
          <Textarea
            value={form.openGraph.description}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                openGraph: { ...p.openGraph, description: e.target.value },
              }))
            }
            rows={2}
            className="mt-1"
          />
        </div>
        <div>
          <Label>OG image path</Label>
          <Input
            value={form.openGraph.image}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                openGraph: { ...p.openGraph, image: e.target.value },
              }))
            }
            className="mt-1"
          />
        </div>
      </section>

      <section className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Twitter card</h2>
        <div>
          <Label>Card type</Label>
          <select
            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={form.twitter.card}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                twitter: {
                  ...p.twitter,
                  card: e.target.value as "summary" | "summary_large_image",
                },
              }))
            }
          >
            <option value="summary_large_image">summary_large_image</option>
            <option value="summary">summary</option>
          </select>
        </div>
        <div>
          <Label>Twitter title</Label>
          <Input
            value={form.twitter.title}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                twitter: { ...p.twitter, title: e.target.value },
              }))
            }
            className="mt-1"
          />
        </div>
        <div>
          <Label>Twitter description</Label>
          <Textarea
            value={form.twitter.description}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                twitter: { ...p.twitter, description: e.target.value },
              }))
            }
            rows={2}
            className="mt-1"
          />
        </div>
        <div>
          <Label>Twitter image path</Label>
          <Input
            value={form.twitter.image}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                twitter: { ...p.twitter, image: e.target.value },
              }))
            }
            className="mt-1"
          />
        </div>
      </section>

      <section className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Schema (JSON-LD)</h2>
        <Textarea
          value={schemaText}
          onChange={(e) => setSchemaText(e.target.value)}
          rows={16}
          className="font-mono text-xs"
        />
      </section>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </p>
      )}
      {message && (
        <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">
          {message}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <Button
          type="submit"
          disabled={saving || clearing}
          size="lg"
          className="min-w-[180px] bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 hover:shadow-xl border-0"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving…
            </>
          ) : (
            "Save changes"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          disabled={saving || clearing}
          onClick={handleClearCache}
          className="min-w-[180px] border-gray-300"
        >
          {clearing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Clearing…
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4" />
              Clear page cache
            </>
          )}
        </Button>
      </div>
      <p className="text-xs text-gray-500 -mt-4">
        Use &quot;Clear page cache&quot; if the live page still shows an old meta title after saving.
        Hard-refresh the calculator URL (Ctrl+Shift+R) in your browser as well.
      </p>
    </form>
  );
}
