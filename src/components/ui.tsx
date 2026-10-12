import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { waUrl } from "@/lib/whatsapp";
import type { Service, Remote } from "@/lib/services";
import Icon from "./Icon";
import { catLabel } from "@/lib/services";

const remoteMap: Record<Remote, [string, string]> = {
  whatsapp: ["വാട്സ്ആപ്പ് അന്വേഷണം ലഭ്യം", "bg-green-50 text-green-800 border-green-200"],
  online: ["ഓൺലൈൻ തയ്യാറെടുപ്പ് സാധ്യം", "bg-sky-50 text-sky-600 border-blue-200"],
  physical: ["നേരിട്ട് എത്തണം", "bg-orange-50 text-orange-800 border-orange-200"],
  confirm: ["ലഭ്യത സ്ഥിരീകരിക്കണം", "bg-sun-100 text-amber-900 border-sun-300"],
};
export const RemoteBadge = ({ r }: { r: Remote }) => (
  <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${remoteMap[r][1]}`}>{remoteMap[r][0]}</span>
);
export const AvailabilityBadge = ({ s }: { s: Service["availabilityStatus"] }) => (
  <span className="inline-block rounded-full border border-sun-300 bg-sun-100 px-2.5 py-0.5 text-xs font-medium text-amber-900">
    {s === "confirmed" ? "സേവനം ലഭ്യമാണ്" : s === "unavailable" ? "ലഭ്യമല്ല" : "സേവന ലഭ്യത സ്ഥിരീകരിക്കണം"}
  </span>
);
export function WhatsAppCTA({ label = "വാട്സ്ആപ്പിൽ ബന്ധപ്പെടാം", text, className = "" }: { label?: string; text?: string; className?: string }) {
  return (
    <a href={waUrl(text)} target="_blank" rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#1f9d55] px-5 py-2.5 font-semibold text-white shadow-sm hover:bg-[#178246] ${className}`}>
      <MessageCircle size={20} aria-hidden="true" />{label}
    </a>
  );
}
export function ServiceCard({ s }: { s: Service }) {
  return (
    <article className="flex flex-col gap-2 rounded-2xl border border-brand-100 bg-white p-4">
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700"><Icon name={s.icon} size={22} /></span>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold leading-snug">{s.titleMl}</h3>
          <p className="text-sm text-slate-600">{s.titleEn}</p>
        </div>
      </div>
      <p className="text-sm text-slate-700">{s.shortDescriptionMl}</p>
      <p className="text-xs text-slate-600">{catLabel(s.category).ml}</p>
      <div className="flex flex-wrap gap-1.5"><RemoteBadge r={s.remoteEligibility} /></div>
      <Link href={`/services/${s.slug}`} className="mt-auto inline-flex min-h-11 items-center justify-center rounded-xl border-2 border-brand-700 font-semibold text-brand-700 hover:bg-brand-50">
        വിശദാംശങ്ങൾ<span className="sr-only">: {s.titleEn}</span>
      </Link>
    </article>
  );
}
export const FeeDisclaimer = () => (
  <p className="rounded-xl border border-sun-300 bg-sun-100 p-3 text-sm text-amber-950">
    നിരക്കുകൾ കേന്ദ്രം സ്ഥിരീകരിക്കുന്നതുവരെ കാണിക്കുന്നില്ല. ഫീസും സേവന ലഭ്യതയും മാറാം; കൃത്യമായ വിവരത്തിന് വാട്സ്ആപ്പിൽ ചോദിക്കുക.
  </p>
);
