import Link from "next/link";
import { Phone, Mail, ExternalLink, Clock, MapPin } from "lucide-react";
import { config } from "@/lib/config";
import { categories } from "@/lib/services";
import { WhatsAppCTA } from "./ui";
import { CopyButton } from "./Interactive";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-brand-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-700 text-lg font-bold text-sun-400" aria-hidden="true">അ</span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-bold text-brand-800">{config.name}</span>
            <span className="block truncate text-xs text-slate-600">സേവനങ്ങൾ വീട്ടിലിരുന്ന് അന്വേഷിക്കാം</span>
          </span>
        </Link>
        <nav aria-label="പ്രധാന മെനു" className="ml-auto hidden items-center gap-5 text-sm font-medium md:flex">
          <Link href="/services">സേവനങ്ങൾ</Link><Link href="/help">സഹായം</Link><Link href="/contact">ബന്ധപ്പെടുക</Link>
        </nav>
        <WhatsAppCTA label="വാട്സ്ആപ്പ്" className="ml-auto !min-h-10 !px-3 text-sm md:ml-0" />
      </div>
    </header>
  );
}
export function SiteFooter() {
  return (
    <footer className="mt-16 bg-brand-900 text-brand-100">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div><h2 className="font-bold text-white">{config.nameMl}</h2>
          <p className="mt-2 text-sm">ഇത് അക്ഷയ കേന്ദ്രം പെരിഞ്ചേരിയുടെ സ്വതന്ത്ര ഡിജിറ്റൽ സഹായ വെബ്സൈറ്റാണ്. കേരള സർക്കാരിന്റെ ഔദ്യോഗിക വെബ്സൈറ്റ് അല്ല. വാട്സ്ആപ്പ് അന്വേഷണം സർക്കാർ അപേക്ഷ സമർപ്പിക്കലല്ല.</p>
          <p className="mt-2 text-sm">{config.phoneDisplay} · {config.email}</p></div>
        <div><h2 className="font-bold text-white">സേവന വിഭാഗങ്ങൾ</h2>
          <ul className="mt-2 space-y-1 text-sm">{categories.map(c => <li key={c.id}><Link className="underline-offset-2 hover:underline" href={`/services?cat=${c.id}`}>{c.ml}</Link></li>)}</ul></div>
        <div><h2 className="font-bold text-white">വിവരങ്ങൾ</h2>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link href="/privacy">സ്വകാര്യതയും നിരാകരണവും</Link></li>
            <li><Link href="/help">സഹായവും FAQ-യും</Link></li>
            <li><Link href="/privacy#accessibility">ആക്സസിബിലിറ്റി</Link></li>
            <li><a className="inline-flex items-center gap-1" href={config.officialPortal} target="_blank" rel="noopener noreferrer">ഔദ്യോഗിക അക്ഷയ പോർട്ടൽ <ExternalLink size={14} aria-hidden="true" /></a></li>
          </ul></div>
      </div>
    </footer>
  );
}
export function ContactSection() {
  const todo = <span className="rounded bg-sun-100 px-2 py-0.5 text-sm text-amber-900">ഉടമ പൂരിപ്പിക്കേണ്ടത് (config.ts)</span>;
  return (
    <section aria-labelledby="contact-h" className="rounded-2xl border border-brand-100 bg-white p-5">
      <h2 id="contact-h" className="text-xl font-bold text-brand-800">ബന്ധപ്പെടാം</h2>
      <ul className="mt-4 space-y-3">
        <li className="flex flex-wrap items-center gap-2"><Phone size={18} aria-hidden="true" /><a className="font-semibold" href={`tel:${config.phoneTel}`}>{config.phoneDisplay}</a><CopyButton text={config.phoneDisplay} label="നമ്പർ" /></li>
        <li className="flex flex-wrap items-center gap-2"><Mail size={18} aria-hidden="true" /><a href={`mailto:${config.email}`}>{config.email}</a><CopyButton text={config.email} label="ഇമെയിൽ" /></li>
        <li className="flex items-center gap-2"><Clock size={18} aria-hidden="true" />പ്രവർത്തന സമയം: {config.workingHours ?? todo}</li>
        <li className="flex items-center gap-2"><MapPin size={18} aria-hidden="true" />വിലാസം: {config.address ?? todo}</li>
      </ul>
      <div className="mt-4 flex flex-wrap gap-3">
        <WhatsAppCTA />
        <a href={`tel:${config.phoneTel}`} className="inline-flex min-h-12 items-center gap-2 rounded-xl border-2 border-brand-700 px-5 font-semibold text-brand-700"><Phone size={18} aria-hidden="true" />വിളിക്കാം</a>
      </div>
    </section>
  );
}
export const faqs: [string, string][] = [
  ["ഈ വെബ്സൈറ്റ് വഴി അപേക്ഷ സമർപ്പിക്കാമോ?", "ഇല്ല. ഇവിടെ നിങ്ങൾക്ക് സേവനം തിരഞ്ഞെടുത്ത് വിവരങ്ങൾ അറിയാനും കേന്ദ്രത്തിലേക്ക് വാട്സ്ആപ്പ് സന്ദേശം തയ്യാറാക്കാനും മാത്രമേ കഴിയൂ. അപേക്ഷ സമർപ്പിക്കുന്നത് കേന്ദ്രവുമായി സംസാരിച്ച ശേഷമാണ്."],
  ["എല്ലാ സേവനങ്ങളും ഇവിടെ ലഭ്യമാണോ?", "പട്ടികയിലുള്ളവ അക്ഷയ സേവന ഡയറക്ടറിയിലെ സേവനങ്ങളാണ്. ഓരോന്നും പെരിഞ്ചേരി കേന്ദ്രത്തിൽ ലഭ്യമാണോ എന്ന് കേന്ദ്രം സ്ഥിരീകരിക്കുന്നതുവരെ 'ലഭ്യത സ്ഥിരീകരിക്കണം' എന്ന് കാണിക്കും."],
  ["ഫീസ് എത്രയാണ്?", "സ്ഥിരീകരിച്ച നിരക്കുകൾ മാത്രമേ കാണിക്കൂ. അല്ലാത്തവയ്ക്ക് 'സ്ഥിരീകരിച്ചിട്ടില്ല' എന്ന് കാണും. നിലവിലെ ഫീസ് വാട്സ്ആപ്പിൽ ചോദിക്കുക."],
  ["ആധാർ നമ്പറോ OTP-യോ അയയ്ക്കണോ?", "വേണ്ട. ആധാർ നമ്പർ, OTP, പാസ്‌വേഡ്, ബാങ്ക് PIN എന്നിവ ഒരിക്കലും വാട്സ്ആപ്പിൽ അയയ്ക്കരുത്."],
  ["വാട്സ്ആപ്പ് ഇല്ലെങ്കിൽ?", "സന്ദേശം പകർത്തി ഏതെങ്കിലും രീതിയിൽ അയയ്ക്കാം, അല്ലെങ്കിൽ ഞങ്ങളെ വിളിക്കാം."],
];
export function FAQAccordion() {
  return (
    <div className="space-y-2">
      {faqs.map(([q, a]) => (
        <details key={q} className="group rounded-xl border border-brand-100 bg-white p-4">
          <summary className="cursor-pointer font-semibold marker:text-brand-700">{q}</summary>
          <p className="mt-2 text-slate-700">{a}</p>
        </details>
      ))}
    </div>
  );
}
