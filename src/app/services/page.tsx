import type { Metadata } from "next";
import { ServiceDirectory } from "@/components/Directory";
import { categories, type CategoryId } from "@/lib/services";
import { FeeDisclaimer } from "@/components/ui";
export const metadata: Metadata = { title: "സേവനങ്ങൾ", description: "അക്ഷയ സേവനങ്ങൾ തിരയുക: സർട്ടിഫിക്കറ്റുകൾ, ആധാർ, റേഷൻ കാർഡ്, ഇൻഷുറൻസ്, ബില്ലുകൾ." };
export default function Services({ searchParams }: { searchParams: { q?: string; cat?: string } }) {
  const cat = categories.some(c => c.id === searchParams.cat) ? (searchParams.cat as CategoryId) : "all";
  return (
    <div className="mx-auto max-w-6xl space-y-5 px-4 py-8">
      <h1 className="text-3xl font-bold text-brand-800">സേവനങ്ങൾ</h1>
      <p className="text-slate-700">ഇവ അക്ഷയ സേവന ഡയറക്ടറിയിലെ സാധ്യതയുള്ള സേവനങ്ങളാണ്; പെരിഞ്ചേരി കേന്ദ്രത്തിൽ ലഭ്യത സ്ഥിരീകരിച്ചതായി അർത്ഥമില്ല.</p>
      <FeeDisclaimer />
      <ServiceDirectory initialQ={searchParams.q ?? ""} initialCat={cat} />
    </div>
  );
}
