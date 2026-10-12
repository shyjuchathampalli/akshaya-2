import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { bySlug, services, catLabel } from "@/lib/services";
import { AvailabilityBadge, RemoteBadge, ServiceCard, FeeDisclaimer } from "@/components/ui";
import { ServiceActions } from "@/components/Interactive";

export const generateStaticParams = () => services.map(s => ({ slug: s.slug }));
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = bySlug(params.slug);
  return s ? { title: `${s.titleMl} (${s.titleEn})`, description: s.shortDescriptionMl } : {};
}
const U = <span className="rounded bg-sun-100 px-2 py-0.5 text-amber-900">സ്ഥിരീകരിച്ചിട്ടില്ല</span>;
const money = (v: number | null) => (v === null ? U : `₹${v}`);

export default function ServicePage({ params }: { params: { slug: string } }) {
  const s = bySlug(params.slug);
  if (!s) notFound();
  const parts = [s.officialGovernmentFee, s.akshayaServiceCharge, s.scanningPrintingCharge, s.otherApplicableCharges];
  const total = parts.every(p => p !== null) ? (parts as number[]).reduce((a, b) => a + b, 0) : null;
  const rows: [string, number | null][] = [["സർക്കാർ ഫീസ്", parts[0]], ["അക്ഷയ സേവന നിരക്ക്", parts[1]], ["സ്കാനിംഗ് / പ്രിന്റിംഗ്", parts[2]], ["മറ്റ് ബാധകമായ നിരക്കുകൾ", parts[3]]];
  const related = services.filter(x => x.category === s.category && x.id !== s.id && x.published).slice(0, 3);
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-8">
      <nav aria-label="Breadcrumb" className="text-sm"><Link href="/services" className="underline">സേവനങ്ങൾ</Link> / {catLabel(s.category).ml}</nav>
      <header>
        <h1 className="text-3xl font-bold text-brand-800">{s.titleMl}</h1>
        <p className="text-lg text-slate-600">{s.titleEn}</p>
        <div className="mt-3 flex flex-wrap gap-2"><AvailabilityBadge s={s.availabilityStatus} /><RemoteBadge r={s.remoteEligibility} /></div>
        <p className="mt-4">{s.fullDescriptionMl}</p><p className="text-sm text-slate-600">{s.fullDescriptionEn}</p>
      </header>
      <section aria-labelledby="req" className="rounded-2xl border border-brand-100 bg-white p-5">
        <h2 id="req" className="text-xl font-bold text-brand-800">നേരിട്ട് വരണോ? വിദൂര സാധ്യത</h2>
        <p className="mt-2">{s.remoteEligibilityExplanation}</p>
        <p className="mt-2 text-sm text-slate-700">വാട്സ്ആപ്പ് അന്വേഷണം അയയ്ക്കുന്നത് സർക്കാർ അപേക്ഷ സമർപ്പിക്കുന്നതിന് തുല്യമല്ല. ഒറിജിനൽ രേഖകൾ, ബയോമെട്രിക് അല്ലെങ്കിൽ ഔദ്യോഗിക പോർട്ടൽ ആവശ്യമുണ്ടോ എന്ന് കേന്ദ്രം അറിയിക്കും.</p>
      </section>
      <section aria-labelledby="fee" className="rounded-2xl border border-brand-100 bg-white p-5">
        <h2 id="fee" className="text-xl font-bold text-brand-800">നിരക്കുകളും സമയവും</h2>
        <dl className="mt-3 divide-y divide-brand-100">
          {rows.map(([l, v]) => <div key={l} className="flex justify-between gap-3 py-2"><dt>{l}</dt><dd className="font-semibold">{money(v)}</dd></div>)}
          <div className="flex justify-between gap-3 py-2"><dt className="font-semibold">ആകെ</dt><dd className="font-bold">{total === null ? <>{U} (എല്ലാ ഘടകങ്ങളും അറിഞ്ഞാൽ മാത്രം)</> : `₹${total}`}</dd></div>
          <div className="flex justify-between gap-3 py-2"><dt>പ്രോസസ്സിംഗ് സമയം</dt><dd>{s.processingTime ?? U}</dd></div>
          <div className="flex justify-between gap-3 py-2"><dt>നിരക്ക് പരിശോധിച്ച തീയതി</dt><dd>{s.feeVerificationDate ?? U}</dd></div>
        </dl>
        <div className="mt-3"><FeeDisclaimer /></div>
      </section>
      <section aria-labelledby="info" className="rounded-2xl border border-brand-100 bg-white p-5">
        <h2 id="info" className="text-xl font-bold text-brand-800">തയ്യാറാക്കേണ്ട വിവരങ്ങൾ</h2>
        <ul className="mt-2 list-inside list-disc">{s.requiredInformation.map(i => <li key={i}>{i}</li>)}</ul>
        <ul className="mt-3 list-inside list-disc text-sm text-slate-700">{s.serviceSpecificInstructions.map(i => <li key={i}>{i}</li>)}</ul>
        <a className="mt-3 inline-flex min-h-10 items-center gap-1 font-semibold text-brand-700 underline" href={s.officialSourceUrl} target="_blank" rel="noopener noreferrer">ഔദ്യോഗിക അക്ഷയ സേവന പേജ് <ExternalLink size={16} aria-hidden="true" /></a>
      </section>
      <ServiceActions s={s} />
      {related.length > 0 && <section aria-labelledby="rel"><h2 id="rel" className="mb-3 text-xl font-bold text-brand-800">അനുബന്ധ സേവനങ്ങൾ</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{related.map(r => <ServiceCard key={r.id} s={r} />)}</div></section>}
    </div>
  );
}
