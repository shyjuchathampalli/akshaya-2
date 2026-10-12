import Link from "next/link";
export default function NotFound() {
  return (<div className="mx-auto max-w-xl p-10 text-center"><h1 className="text-2xl font-bold">പേജ് കണ്ടെത്തിയില്ല</h1>
    <p className="mt-2">ലിങ്ക് തെറ്റാണ് അല്ലെങ്കിൽ സേവനം ഇപ്പോൾ ലഭ്യമല്ല.</p>
    <Link href="/services" className="mt-4 inline-flex min-h-12 items-center rounded-xl bg-brand-700 px-6 font-semibold text-white">എല്ലാ സേവനങ്ങളും കാണുക</Link></div>);
}
