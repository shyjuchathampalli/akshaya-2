"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { categories, services, type CategoryId } from "@/lib/services";
import { searchServices } from "@/lib/search";
import { ServiceCard } from "./ui";

export function ServiceDirectory({ initialQ = "", initialCat = "all" }: { initialQ?: string; initialCat?: CategoryId | "all" }) {
  const [q, setQ] = useState(initialQ);
  const [cat, setCat] = useState<CategoryId | "all">(initialCat);
  const res = searchServices(q, cat);
  const chip = (on: boolean) => `min-h-10 shrink-0 rounded-full border px-4 text-sm ${on ? "border-brand-700 bg-brand-700 text-white" : "border-brand-200 bg-white"}`;
  return (
    <div className="space-y-5">
      <div role="search" className="relative">
        <label htmlFor="q" className="sr-only">സേവനം തിരയുക</label>
        <Search className="absolute left-3 top-3.5 text-slate-500" size={20} aria-hidden="true" />
        <input id="q" type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="തിരയുക: വരുമാനം, insurance, ആധാർ…" className="min-h-12 w-full rounded-xl border-2 border-brand-200 bg-white pl-10 pr-10" />
        {q && <button type="button" aria-label="തിരച്ചിൽ മായ്ക്കുക" onClick={() => setQ("")} className="absolute right-1 top-1 grid h-10 w-10 place-items-center"><X size={18} aria-hidden="true" /></button>}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="വിഭാഗം">
        <button type="button" aria-pressed={cat === "all"} className={chip(cat === "all")} onClick={() => setCat("all")}>എല്ലാം</button>
        {categories.map(c => <button type="button" key={c.id} aria-pressed={cat === c.id} className={chip(cat === c.id)} onClick={() => setCat(c.id)}>{c.ml}</button>)}
      </div>
      <p role="status" className="text-sm text-slate-600">{res.length} സേവനങ്ങൾ</p>
      {res.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{res.map(s => <ServiceCard key={s.id} s={s} />)}</div> : (
        <div className="rounded-2xl border border-dashed border-brand-200 bg-white p-6 text-center">
          <p className="font-semibold">“{q}” എന്നതിന് സേവനങ്ങൾ കണ്ടില്ല.</p>
          <p className="mt-1 text-sm text-slate-700">മറ്റൊരു വാക്ക് ശ്രമിക്കുക, അല്ലെങ്കിൽ വിഭാഗം “എല്ലാം” ആക്കുക. ഇവിടെ ഇല്ലാത്ത സേവനമാണെങ്കിൽ <Link className="font-semibold underline" href="/help#unlisted">ഞങ്ങളോട് ചോദിക്കാം</Link>.</p>
        </div>)}
    </div>
  );
}

const choices: { l: string; ids: string[] }[] = [
  { l: "ഒരു സർട്ടിഫിക്കറ്റ് വേണം", ids: ["income-certificate", "nativity-certificate", "possession-certificate", "residence-certificate"] },
  { l: "ആധാർ വിവരങ്ങൾ തിരുത്തണം", ids: ["aadhaar-update", "aadhaar-seeding", "one-and-same-certificate"] },
  { l: "വാഹന ഇൻഷുറൻസ് പുതുക്കണം", ids: ["vehicle-insurance"] },
  { l: "സർക്കാർ അപേക്ഷയ്ക്ക് സഹായം വേണം", ids: ["ration-card", "pension-assistance", "scholarship-assistance", "public-grievance"] },
  { l: "ഒരു ബിൽ അടയ്ക്കണം", ids: ["electricity-bill", "water-bill", "university-fee"] },
];
export function GuidedServiceFinder() {
  const [i, setI] = useState(0);
  const list = choices[i].ids.map(id => services.find(s => s.id === id)!);
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="ആവശ്യം തിരഞ്ഞെടുക്കുക">
        {choices.map((c, k) => <button type="button" key={c.l} aria-pressed={k === i} onClick={() => setI(k)}
          className={`min-h-11 rounded-xl border px-4 text-left ${k === i ? "border-brand-700 bg-brand-700 text-white" : "border-brand-200 bg-white"}`}>{c.l}</button>)}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">{list.map(s => <ServiceCard key={s.id} s={s} />)}</div>
    </div>
  );
}
