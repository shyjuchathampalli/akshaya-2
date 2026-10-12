import type { Metadata } from "next";
import { FAQAccordion } from "@/components/Chrome";
import { WhatsAppForm } from "@/components/Interactive";
export const metadata: Metadata = { title: "സഹായം", description: "പതിവ് ചോദ്യങ്ങൾ, വാട്സ്ആപ്പ് ഫോളോ-അപ്പ്, പട്ടികയിൽ ഇല്ലാത്ത സേവനങ്ങൾ." };
export default function Help() {
  return (
    <div className="mx-auto max-w-3xl space-y-10 px-4 py-8">
      <h1 className="text-3xl font-bold text-brand-800">സഹായം</h1>
      <section aria-labelledby="faq"><h2 id="faq" className="mb-3 text-xl font-bold">പതിവ് ചോദ്യങ്ങൾ</h2><FAQAccordion /></section>
      <section id="followup" aria-labelledby="fu" className="rounded-2xl border border-brand-100 bg-white p-5">
        <h2 id="fu" className="text-xl font-bold text-brand-800">വാട്സ്ആപ്പ് വഴി ഫോളോ-അപ്പ്</h2>
        <p className="mt-2 text-sm text-slate-700">ഇത് തത്സമയ അപേക്ഷാ ട്രാക്കിംഗ് അല്ല. സർക്കാർ സംവിധാനവുമായി ഈ സൈറ്റ് ബന്ധിപ്പിച്ചിട്ടില്ല. അപേക്ഷയുടെ അവസ്ഥ കേന്ദ്രത്തോട് മര്യാദയോടെ ചോദിക്കാനുള്ള സന്ദേശം മാത്രമാണ് ഇവിടെ തയ്യാറാക്കുന്നത്.</p>
        <p className="mt-2 text-sm text-slate-700">റഫറൻസ് നമ്പർ: അപേക്ഷ/അന്വേഷണം സ്വീകരിക്കുമ്പോൾ കേന്ദ്രത്തിന് ഒരു റഫറൻസ് കോഡ് നൽകാം (ഉദാ. രസീതിൽ എഴുതി). അത് ഇവിടെ ചേർക്കുക. കോഡ് ഇല്ലെങ്കിൽ ഒഴിച്ചിടാം.</p>
        <div className="mt-4"><WhatsAppForm mode="followup" /></div>
      </section>
      <section id="unlisted" aria-labelledby="ul" className="rounded-2xl border border-brand-100 bg-white p-5">
        <h2 id="ul" className="text-xl font-bold text-brand-800">പട്ടികയിൽ ഇല്ലാത്ത സേവനം</h2>
        <div className="mt-4"><WhatsAppForm mode="other" /></div>
      </section>
    </div>
  );
}
