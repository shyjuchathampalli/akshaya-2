import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";
import { categories, popularServices } from "@/lib/services";
import { ServiceCard, WhatsAppCTA } from "@/components/ui";
import Icon from "@/components/Icon";
import { GuidedServiceFinder } from "@/components/Directory";
import { ContactSection } from "@/components/Chrome";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl space-y-14 px-4 py-8">
      <section className="rise rounded-3xl bg-brand-800 p-6 text-white md:p-10" aria-labelledby="hero">
        <h1 id="hero" className="max-w-2xl text-3xl font-bold leading-snug md:text-4xl">അക്ഷയ സേവനങ്ങൾ ഇനി വീട്ടിലിരുന്നും അറിയാം</h1>
        <p className="mt-3 max-w-xl text-brand-100">ആവശ്യമായ സേവനം കണ്ടെത്തൂ, വേണ്ട രേഖകൾ മനസ്സിലാക്കൂ, വാട്സ്ആപ്പിലൂടെ ഞങ്ങളുമായി ബന്ധപ്പെടൂ.</p>
        <form action="/services" role="search" className="mt-5 flex max-w-xl gap-2">
          <label htmlFor="hq" className="sr-only">സേവനം തിരയുക</label>
          <input id="hq" name="q" type="search" placeholder="ഉദാ: വരുമാനം, ആധാർ, insurance" className="min-h-12 w-full rounded-xl px-4 text-ink" />
          <button className="grid min-h-12 w-14 shrink-0 place-items-center rounded-xl bg-sun-400 text-ink" aria-label="തിരയുക"><Search aria-hidden="true" /></button>
        </form>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/services" className="inline-flex min-h-12 items-center rounded-xl bg-sun-400 px-5 font-semibold text-ink">സേവനങ്ങൾ കണ്ടെത്താം</Link>
          <WhatsAppCTA />
        </div>
        <p className="mt-4 text-sm text-brand-200">എല്ലാ സേവനങ്ങളും പൂർണ്ണമായി ഓൺലൈനായി ചെയ്യാനാകില്ല; വിവരങ്ങൾ കേന്ദ്രം സ്ഥിരീകരിക്കും.</p>
      </section>

      <section aria-labelledby="cats"><h2 id="cats" className="mb-4 text-2xl font-bold text-brand-800">സേവന വിഭാഗങ്ങൾ</h2>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {categories.map(c => (
            <li key={c.id}><Link href={`/services?cat=${c.id}`} className="flex min-h-20 items-center gap-3 rounded-2xl border border-brand-100 bg-white p-3 hover:border-brand-600">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sun-100 text-brand-800"><Icon name={c.icon} size={20} /></span>
              <span className="text-sm font-semibold leading-snug">{c.ml}</span></Link></li>))}
        </ul></section>

      <section aria-labelledby="pop"><div className="mb-4 flex items-end justify-between"><h2 id="pop" className="text-2xl font-bold text-brand-800">പ്രധാന സേവനങ്ങൾ</h2>
        <Link href="/services" className="inline-flex items-center text-sm font-semibold text-brand-700">എല്ലാം കാണുക<ChevronRight size={16} aria-hidden="true" /></Link></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{popularServices().map(s => <ServiceCard key={s.id} s={s} />)}</div></section>

      <section aria-labelledby="find"><h2 id="find" className="mb-4 text-2xl font-bold text-brand-800">നിങ്ങൾക്ക് എന്ത് സേവനമാണ് വേണ്ടത്?</h2><GuidedServiceFinder /></section>

      <section aria-labelledby="how"><h2 id="how" className="mb-4 text-2xl font-bold text-brand-800">എങ്ങനെ പ്രവർത്തിക്കുന്നു</h2>
        <ol className="grid gap-3 md:grid-cols-3">
          {["സേവനം തിരഞ്ഞെടുക്കുക.", "രേഖകളും വിവരങ്ങളും പരിശോധിക്കുക.", "വാട്സ്ആപ്പിലൂടെ ബന്ധപ്പെടുക."].map((t, i) => (
            <li key={t} className="flex items-center gap-3 rounded-2xl border border-brand-100 bg-white p-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-700 font-bold text-white">{i + 1}</span>{t}</li>))}
        </ol></section>

      <ContactSection />
    </div>
  );
}
