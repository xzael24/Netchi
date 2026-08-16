"use client";

import { useState } from "react";
import { FeatureShell } from "@/components/layout/FeatureShell";
import {
  generatePeople,
  toCSV,
  FIELD_LABELS,
  type DummyField,
  type DummyPerson,
} from "@/data/dummyData";
import { clampInt } from "@/lib/validate";
import { useLocale } from "@/components/providers/LocaleProvider";
import type { TranslationKey } from "@/lib/i18n";

const LINE = "border-cream/25";
const ALL_FIELDS = Object.keys(FIELD_LABELS) as DummyField[];

const FIELD_T_KEYS: Record<DummyField, TranslationKey> = {
  nama: "dd.field.nama",
  email: "dd.field.email",
  phone: "dd.field.phone",
  alamat: "dd.field.alamat",
  ttl: "dd.field.ttl",
  pekerjaan: "dd.field.pekerjaan",
  perusahaan: "dd.field.perusahaan",
};

export default function DummyDataPage() {
  const { t } = useLocale();
  const [fields, setFields] = useState<DummyField[]>(ALL_FIELDS);
  const [count, setCount] = useState(5);
  const [rows, setRows] = useState<Partial<DummyPerson>[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const toggle = (f: DummyField) => {
    setFields((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  const flash = (key: string) => {
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1500);
  };

  const copyText = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      flash(key);
    } catch {
      /* clipboard unavailable */
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const c = clampInt(count, 1, 20);
    setCount(c);
    setRows(generatePeople(fields, c));
  };

  const download = (data: string, type: string, ext: string) => {
    const blob = new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `netchi-dummy.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const head = fields.length ? fields : ALL_FIELDS;

  const copyRow = async (row: Partial<DummyPerson>, i: number) => {
    const text = head.map((h) => `${t(FIELD_T_KEYS[h])}: ${row[h] ?? ""}`).join("\n");
    await copyText(`row-${i}`, text);
  };

  return (
    <FeatureShell label="5://MASK">
      <div className="mx-auto max-w-4xl">
          <span className="font-mono text-[10px] uppercase tracking-widest text-cream/40">
            {t("dd.label")}
          </span>
          <h1 className="mt-2 font-display font-bold leading-[0.95] tracking-[-0.03em] text-[clamp(2rem,5vw,3.5rem)]">
            {t("dd.title")}
          </h1>
          <p className="mt-3 text-sm text-cream/70 md:text-base">
            {t("dd.desc")}
          </p>

          <form onSubmit={handleGenerate} className={`mt-6 border-2 ${LINE} bg-cream/5 p-5`}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {ALL_FIELDS.map((f) => (
                  <label key={f} className="flex items-center gap-1.5 font-mono text-xs">
                    <input
                      type="checkbox"
                      checked={fields.includes(f)}
                      onChange={() => toggle(f)}
                      className="accent-[#f5f0d5]"
                    />
                    {t(FIELD_T_KEYS[f])}
                  </label>
                ))}
              </div>
              <label className="flex items-center gap-2 font-mono text-sm">
                {t("dd.count")}
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-16 bg-transparent border border-cream/25 px-2 py-1 text-center outline-none"
                />
              </label>
            </div>
            <button
              type="submit"
              className="mt-5 w-full bg-[#f5f0d5] text-[#1D3CDB] font-mono uppercase tracking-widest px-6 py-3 text-sm font-bold"
            >
              Generate →
            </button>
          </form>

          {rows.length > 0 && (
            <div className="mt-8">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-cream/50">{t("dd.results")}</span>
                <button
                  onClick={() => download(JSON.stringify(rows, null, 2), "application/json", "json")}
                  className="border border-cream/25 px-3 py-1 font-mono text-[11px] uppercase tracking-widest hover:border-cream/60"
                >
                  ⬇ JSON
                </button>
                <button
                  onClick={() => download(toCSV(rows), "text/csv", "csv")}
                  className="border border-cream/25 px-3 py-1 font-mono text-[11px] uppercase tracking-widest hover:border-cream/60"
                >
                  ⬇ CSV
                </button>
              </div>
              <div className="overflow-x-auto border-2 border-cream/25">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b-2 border-cream/25 font-mono text-[11px] uppercase tracking-widest text-cream/60">
                      {head.map((h) => (
                        <th key={h} className="px-3 py-2 font-normal">{t(FIELD_T_KEYS[h])}</th>
                      ))}
                      <th className="px-3 py-2 font-normal text-right">{t("dd.copyRow")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={i} className="border-b border-cream/15 last:border-0">
                        {head.map((h) => (
                          <td
                            key={h}
                            onClick={() => copyText(`${i}:${h}`, row[h] ?? "")}
                            title={t("dd.copyHint")}
                            className="cursor-pointer px-3 py-2 text-cream/85 hover:bg-cream/10"
                          >
                            {row[h]}
                            {copiedKey === `${i}:${h}` && <span className="ml-1 text-[#4cd99b]">✓</span>}
                          </td>
                        ))}
                        <td className="px-3 py-2 text-right">
                          <button
                            type="button"
                            onClick={() => copyRow(row, i)}
                            className="border border-cream/25 px-2 py-1 font-mono text-[10px] uppercase tracking-widest hover:border-cream/60"
                          >
                            {copiedKey === `row-${i}` ? t("dd.copied") : t("dd.copyRow")}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
    </FeatureShell>
  );
}