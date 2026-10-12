"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (<div className="mx-auto max-w-xl p-10 text-center"><h1 className="text-2xl font-bold">എന്തോ പിഴവ് സംഭവിച്ചു</h1>
    <p className="mt-2">പേജ് ലോഡ് ചെയ്യാനായില്ല. വീണ്ടും ശ്രമിക്കുക.</p>
    <button onClick={reset} className="mt-4 min-h-12 rounded-xl bg-brand-700 px-6 font-semibold text-white">വീണ്ടും ശ്രമിക്കുക</button></div>);
}
