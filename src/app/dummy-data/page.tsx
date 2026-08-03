"use client";

import { useState } from "react";
import Link from "next/link";
import {
  generatePeople,
  toCSV,
  FIELD_LABELS,
  type DummyField,
  type DummyPerson,
} from "@/data/dummyData";
import { clampInt } from "@/lib/validate";

const LINE = "border-cream/25";
const ALL_FIELDS = Object.keys(FIELD_LABELS) as DummyField[];

export default function DummyDataPage() {
  const [fields, setFields] = useState<DummyField[]>(ALL_FIELDS);
  const [count, setCount] = useState(5);
  const [rows, setRows] = useState<Partial<DummyPerson>[]>([]);

  const toggle = (f: DummyField) => {
    setFields((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
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

  return (
    <main className="bg-[#1A3CDB] text-cream w-screen min-w-full min-h-screen flex flex-col">
      <header className={`grid grid-cols-[2.6%_18.81%_78%_1fr] border-b-2 ${LINE}`}>
        <div className="flex items-center justify-center border-r-2 border-cream/25 p-1 font-mono text-[9px] text-cream/30">1</div>
        <Link href="/" className={`flex items-center border-r-2 ${LINE} pl-2 md:pl-4 font-display font-bold tracking-widest`}>
          Netchi Sentinel
        </Link>
        <div className={`flex items-center justify-between border-r-2 ${LINE} px-3 md:px-4`}>
          <span className="font-mono text-xs tracking-widest uppercase text-cream/60">5://MASK</span>
          <Link href="/" className="font-mono text-xs uppercase tracking-widest hover:text-white">← Beranda</Link>
        </div>
        <div className="flex items-center justify-center p-1 font-mono text-[9px] text-cream/30">MASK</div>
      </header>

      <div className="flex-1 px-6 py-10 md:px-10">
        <div className="mx-auto max-w-4xl">
          <span className="font-mono text-[10px] uppercase tracking-widest text-cream/40">
            5://MASK — Data palsu untuk situs abal-abal
          </span>
          <h1 className="mt-2 font-display font-bold leading-[0.95] tracking-[-0.03em] text-[clamp(2rem,5vw,3.5rem)]">
            Lindungi identitas aslimu
          </h1>
          <p className="mt-3 text-sm text-cream/70 md:text-base">
            Butuh daftar di situs yang mencurigakan? Pakai data dummy realistis khas Indonesia.
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
                    {FIELD_LABELS[f]}
                  </label>
                ))}
              </div>
              <label className="flex items-center gap-2 font-mono text-sm">
                Jumlah
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
                <span className="font-mono text-xs uppercase tracking-widest text-cream/50">Hasil</span>
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
                        <th key={h} className="px-3 py-2 font-normal">{FIELD_LABELS[h]}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={i} className="border-b border-cream/15 last:border-0">
                        {head.map((h) => (
                          <td key={h} className="px-3 py-2 text-cream/85">{row[h]}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}