"use client";
import { useState } from "react";
import { Copy, Check, MessageCircle, RotateCcw } from "lucide-react";
import { waUrl, waWebUrl } from "@/lib/whatsapp";
import type { Service } from "@/lib/services";
import { services } from "@/lib/services";

export function CopyButton({ text, label = "പകർത്തുക" }: { text: string; label?: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button type="button" className="inline-flex min-h-9 items-center gap-1 rounded-lg border border-brand-200 px-2.5 text-sm"
      onClick={async () => { try { await navigator.clipboard.writeText(text); setOk(true); setTimeout(() => setOk(false), 2000); } catch { window.prompt("പകർത്തുക:", text); } }}>
      {ok ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}{ok ? "പകർത്തി" : label}
      <span role="status" className="sr-only">{ok ? "പകർത്തി" : ""}</span>
    </button>
  );
}

/** Preview/edit the message, then copy or open WhatsApp. Nothing is sent automatically. */
export function MessageActions({ generated }: { generated: string }) {
  const [edited, setEdited] = useState<string | null>(null);
  const msg = edited ?? generated;
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold" htmlFor="msg">സന്ദേശം (പരിശോധിക്കാം, തിരുത്താം)</label>
      <textarea id="msg" value={msg} onChange={e => setEdited(e.target.value)} rows={10} className="w-full rounded-xl border border-brand-200 bg-white p-3" />
      <div className="flex flex-wrap gap-2">
        <a href={waUrl(msg)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#1f9d55] px-5 font-semibold text-white hover:bg-[#178246]">
          <MessageCircle size={20} aria-hidden="true" />വാട്സ്ആപ്പ് തുറക്കുക</a>
        <CopyButton text={msg} label="സന്ദേശം പകർത്തുക" />
        {edited !== null && <button type="button" onClick={() => setEdited(null)} className="inline-flex min-h-9 items-center gap-1 rounded-lg border border-brand-200 px-2.5 text-sm"><RotateCcw size={16} aria-hidden="true" />പഴയ രൂപത്തിലാക്കുക</button>}
      </div>
      <p className="text-sm text-slate-600">ബട്ടൺ അമർത്തിയാൽ വാട്സ്ആപ്പിൽ സന്ദേശം തുറക്കും; അയയ്ക്കണോ എന്ന് നിങ്ങൾ തീരുമാനിക്കും. ആപ്പ് തുറന്നില്ലെങ്കിൽ <a className="underline" href={waWebUrl(msg)} target="_blank" rel="noopener noreferrer">WhatsApp Web</a> ഉപയോഗിക്കുക അല്ലെങ്കിൽ സന്ദേശം പകർത്തുക.</p>
    </div>
  );
}

const inp = "mt-1 w-full min-h-11 rounded-xl border border-brand-200 bg-white px-3";
const Field = ({ id, label, value, set, type = "text" }: { id: string; label: string; value: string; set: (v: string) => void; type?: string }) => (
  <div><label htmlFor={id} className="text-sm font-semibold">{label}</label><input id={id} type={type} value={value} onChange={e => set(e.target.value)} className={inp} autoComplete="off" /></div>
);

export function ServiceActions({ s }: { s: Service }) {
  const [ready, setReady] = useState<Record<string, boolean>>({});
  const [vals, setVals] = useState<Record<string, string>>({});
  const [incl, setIncl] = useState(false);
  const set = (k: string) => (v: string) => setVals(o => ({ ...o, [k]: v }));
  const t = s.whatsappTemplate;
  const base = ["പേര്", "ബന്ധപ്പെടേണ്ട ഫോൺ നമ്പർ", "അപേക്ഷയുടെ ആവശ്യകത", ...t.fields];
  const have = s.requiredDocuments.filter(d => ready[d.en]).map(d => d.ml);
  const miss = s.requiredDocuments.filter(d => !ready[d.en]).map(d => d.ml);
  const summary = incl ? `\n\nരേഖകൾ (എന്റെ സ്വന്തം പരിശോധന പ്രകാരം):\nതയ്യാറാണ്: ${have.join(", ") || "ഇല്ല"}\nതയ്യാറല്ല: ${miss.join(", ") || "ഇല്ല"}` : "";
  const generated = `നമസ്കാരം,\n\n${t.ask}\n\n${base.map(l => `${l}: ${vals[l] ?? ""}`).join("\n")}${summary}\n\n${t.closing}`;
  return (
    <div className="space-y-8">
      <section aria-labelledby="chk" className="rounded-2xl border border-brand-100 bg-white p-5">
        <h2 id="chk" className="text-xl font-bold text-brand-800">രേഖകൾ തയ്യാറാണോ?</h2>
        {!s.documentsVerified && <p className="mt-2 rounded-lg bg-sun-100 p-2 text-sm text-amber-950">ഈ പട്ടിക പൊതുവായതാണ്, സ്ഥിരീകരിച്ചതല്ല. കൃത്യമായ രേഖകൾ കേന്ദ്രത്തോട് ചോദിക്കുക.</p>}
        <ul className="mt-3 space-y-2">
          {s.requiredDocuments.map(d => (
            <li key={d.en}><label className="flex min-h-11 items-center gap-3"><input type="checkbox" className="h-5 w-5 accent-[#3b2a8a]" checked={!!ready[d.en]} onChange={e => setReady(o => ({ ...o, [d.en]: e.target.checked }))} />{d.ml}</label></li>
          ))}
        </ul>
        <p aria-live="polite" className="mt-3 text-sm font-medium">{miss.length ? `ഇനിയും ബാക്കി: ${miss.length} രേഖ(കൾ)` : "എല്ലാ രേഖകളും തയ്യാറാണെന്ന് അടയാളപ്പെടുത്തി."}</p>
        <p className="mt-1 text-xs text-slate-600">ടിക്ക് ചെയ്യുന്നത് നിങ്ങളുടെ സ്വന്തം ഓർമ്മക്കുറിപ്പാണ്; രേഖ ശരിയാണെന്നോ മതിയായതാണെന്നോ ഇത് ഉറപ്പാക്കുന്നില്ല.</p>
        <h3 className="mt-4 font-semibold">സാഹചര്യത്തിനനുസരിച്ച് വേണ്ട രേഖകൾ</h3>
        <p className="text-sm text-slate-700">{s.conditionalDocuments.length ? s.conditionalDocuments.map(d => d.ml).join(", ") : "സ്ഥിരീകരിച്ച വിവരമില്ല — കേന്ദ്രത്തോട് ചോദിക്കുക."}</p>
        <button type="button" onClick={() => setReady({})} className="mt-3 inline-flex min-h-10 items-center gap-1 rounded-lg border border-brand-200 px-3 text-sm"><RotateCcw size={16} aria-hidden="true" />പട്ടിക റീസെറ്റ് ചെയ്യുക</button>
      </section>
      <section aria-labelledby="wa" className="rounded-2xl border border-brand-100 bg-white p-5">
        <h2 id="wa" className="text-xl font-bold text-brand-800">വാട്സ്ആപ്പ് സന്ദേശം തയ്യാറാക്കാം</h2>
        <p className="mt-1 text-sm text-slate-700">ഓപ്ഷണൽ വിവരങ്ങൾ നൽകാം. ആധാർ നമ്പർ, OTP, പാസ്‌വേഡ് എന്നിവ നൽകരുത്.</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">{base.map((l, i) => <Field key={l} id={`f${i}`} label={l} value={vals[l] ?? ""} set={set(l)} type={i === 1 ? "tel" : "text"} />)}</div>
        <label className="mt-3 flex min-h-11 items-center gap-3"><input type="checkbox" className="h-5 w-5 accent-[#3b2a8a]" checked={incl} onChange={e => setIncl(e.target.checked)} />രേഖകളുടെ സ്ഥിതി സന്ദേശത്തിൽ ഉൾപ്പെടുത്തുക</label>
        <div className="mt-4"><MessageActions generated={generated} /></div>
      </section>
    </div>
  );
}

/** Generic template form used by follow-up and "service not listed" enquiries. */
export function WhatsAppForm({ mode }: { mode: "followup" | "other" }) {
  const [v, setV] = useState<Record<string, string>>({});
  const set = (k: string) => (x: string) => setV(o => ({ ...o, [k]: x }));
  const g = (k: string) => v[k] ?? "";
  const generated = mode === "followup"
    ? `നമസ്കാരം,\n\nഎന്റെ അപേക്ഷയുടെ/അന്വേഷണത്തിന്റെ നിലവിലെ അവസ്ഥ അറിയാൻ ആഗ്രഹിക്കുന്നു.\n\nസേവനം: ${g("svc")}\nകേന്ദ്രം നൽകിയ റഫറൻസ് നമ്പർ (ഉണ്ടെങ്കിൽ): ${g("ref")}\nഏകദേശ തീയതി: ${g("date")}\nപേര്: ${g("name")}\n\nദയവായി ഒരു അപ്ഡേറ്റ് അറിയിക്കാമോ? നന്ദി.`
    : `നമസ്കാരം,\n\nപട്ടികയിൽ ഇല്ലാത്ത ഒരു സേവനത്തെക്കുറിച്ച് അറിയാൻ ആഗ്രഹിക്കുന്നു.\n\nസേവനത്തിന്റെ പേര്/വിവരണം: ${g("svc")}\nപേര്: ${g("name")}\n\nഈ സേവനം ലഭ്യമാണോ, ആവശ്യമായ രേഖകളും ഫീസും എന്തൊക്കെയാണ് എന്ന് അറിയിക്കാമോ?`;
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        {mode === "followup"
          ? <div><label htmlFor="svc" className="text-sm font-semibold">സേവനം</label>
              <select id="svc" value={g("svc")} onChange={e => set("svc")(e.target.value)} className={inp}><option value="">തിരഞ്ഞെടുക്കുക</option>{services.map(s => <option key={s.id} value={s.titleMl}>{s.titleMl}</option>)}</select></div>
          : <Field id="svc" label="സേവനത്തിന്റെ പേര്/വിവരണം" value={g("svc")} set={set("svc")} />}
        {mode === "followup" && <><Field id="ref" label="റഫറൻസ് നമ്പർ (കേന്ദ്രം നൽകിയത്)" value={g("ref")} set={set("ref")} /><Field id="date" label="ഏകദേശ തീയതി" value={g("date")} set={set("date")} type="date" /></>}
        <Field id="name" label="പേര്" value={g("name")} set={set("name")} />
      </div>
      <MessageActions generated={generated} />
    </div>
  );
}
