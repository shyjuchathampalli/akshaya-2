export type CategoryId = "certificates"|"aadhaar"|"ration"|"pan"|"insurance"|"bills"|"pension"|"other";
export type Remote = "whatsapp"|"online"|"physical"|"confirm";
export type Money = number | null; // null = unverified
export interface Doc { en: string; ml: string }
export interface Service {
  id: string; slug: string; titleEn: string; titleMl: string;
  shortDescriptionEn: string; shortDescriptionMl: string; fullDescriptionEn: string; fullDescriptionMl: string;
  category: CategoryId; icon: string; searchKeywords: string[];
  availabilityStatus: "confirmed"|"unconfirmed"|"unavailable";
  remoteEligibility: Remote; remoteEligibilityExplanation: string;
  documentsVerified: boolean; requiredDocuments: Doc[]; conditionalDocuments: Doc[]; requiredInformation: string[];
  officialGovernmentFee: Money; akshayaServiceCharge: Money; scanningPrintingCharge: Money; otherApplicableCharges: Money;
  feeVerificationDate: string | null; processingTime: string | null; officialSourceUrl: string;
  serviceSpecificInstructions: string[];
  whatsappTemplate: { ask: string; fields: string[]; closing: string };
  published: boolean; popular?: boolean;
}
export const categories: { id: CategoryId; ml: string; en: string; icon: string }[] = [
  { id:"certificates", ml:"സർട്ടിഫിക്കറ്റുകൾ", en:"Certificates", icon:"FileText" },
  { id:"aadhaar", ml:"ആധാർ സേവനങ്ങൾ", en:"Aadhaar", icon:"Fingerprint" },
  { id:"ration", ml:"റേഷൻ കാർഡ്", en:"Ration card", icon:"ShoppingBasket" },
  { id:"pan", ml:"പാൻ കാർഡ്", en:"PAN card", icon:"CreditCard" },
  { id:"insurance", ml:"വാഹന ഇൻഷുറൻസ്", en:"Vehicle insurance", icon:"Car" },
  { id:"bills", ml:"ബിൽ പേയ്മെന്റുകൾ", en:"Bill payments", icon:"Zap" },
  { id:"pension", ml:"പെൻഷൻ / ലൈഫ് സർട്ടിഫിക്കറ്റ്", en:"Pension / Life certificate", icon:"HandCoins" },
  { id:"other", ml:"മറ്റ് സർക്കാർ സേവനങ്ങൾ", en:"Other government services", icon:"Landmark" },
];
export const catLabel = (id: CategoryId) => categories.find(c => c.id === id)!;
const SRC = "https://akshaya.kerala.gov.in/services";
const CLOSE = "ആവശ്യമായ രേഖകൾ, നിലവിലെ ഫീസ്, തുടർനടപടികൾ എന്നിവ അറിയിക്കാമോ?";
type Kind = "c"|"h"|"p";
// slug, en, ml, category, icon, keywords, kind, popular, remote, extra WhatsApp fields
const raw: [string,string,string,CategoryId,string,string,Kind,boolean,Remote,string[]?][] = [
["aadhaar-enrollment","Aadhaar Enrollment","ആധാർ എൻറോൾമെന്റ്","aadhaar","Fingerprint","aadhar new enrol uid പുതിയ ആധാർ","h",false,"physical",["ആരുടെ എൻറോൾമെന്റ് (കുട്ടി/മുതിർന്നയാൾ)"]],
["aadhaar-update","Aadhaar Update","ആധാർ അപ്ഡേറ്റ്","aadhaar","Fingerprint","aadhar correction name address mobile ആധാർ തിരുത്തൽ വിലാസം പേര്","h",true,"confirm",["എന്താണ് തിരുത്തേണ്ടത് (പേര്/വിലാസം/മൊബൈൽ നമ്പർ/മറ്റ്)"]],
["aadhaar-seeding","Aadhaar Seeding","ആധാർ സീഡിംഗ്","aadhaar","Fingerprint","link aadhar bank ration ബന്ധിപ്പിക്കൽ","h",false,"confirm",["ഏതുമായി ബന്ധിപ്പിക്കണം (ബാങ്ക്/റേഷൻ കാർഡ്/മറ്റ്)"]],
["pan-card","PAN Card Services","പാൻ കാർഡ് സേവനങ്ങൾ","pan","CreditCard","pan new correction reprint income tax പാൻ","h",true,"confirm",["പുതിയത്/തിരുത്തൽ/വീണ്ടും ലഭിക്കൽ"]],
["ration-card","Ration Card Services","റേഷൻ കാർഡ് സേവനങ്ങൾ","ration","ShoppingBasket","ration card new correction member add remove റേഷൻ കാർഡ് അംഗം","h",true,"confirm",["ആവശ്യമായ സേവനം (പുതിയ കാർഡ്/തിരുത്തൽ/അംഗത്തെ ചേർക്കൽ)"]],
["income-certificate","Income Certificate","വരുമാന സർട്ടിഫിക്കറ്റ്","certificates","FileText","income വരുമാനം scholarship","c",true,"confirm"],
["possession-certificate","Possession Certificate","കൈവശ സർട്ടിഫിക്കറ്റ്","certificates","FileText","possession land കൈവശം ഭൂമി","c",false,"confirm"],
["community-certificate","Community Certificate","കമ്മ്യൂണിറ്റി സർട്ടിഫിക്കറ്റ്","certificates","FileText","community caste ജാതി സമുദായം","c",false,"confirm"],
["nativity-certificate","Nativity Certificate","നേറ്റിവിറ്റി സർട്ടിഫിക്കറ്റ്","certificates","FileText","nativity native ജന്മദേശം","c",true,"confirm"],
["residence-certificate","Residence Certificate","റെസിഡൻസ് സർട്ടിഫിക്കറ്റ്","certificates","FileText","residence resident താമസം","c",false,"confirm"],
["legal-heir-certificate","Legal Heir Certificate","ലീഗൽ ഹെയർ സർട്ടിഫിക്കറ്റ്","certificates","Users","legal heir അനന്തരാവകാശി","c",false,"confirm"],
["relationship-certificate","Relationship Certificate","ബന്ധ സർട്ടിഫിക്കറ്റ്","certificates","Users","relationship ബന്ധം","c",false,"confirm"],
["location-certificate","Location Certificate","ലൊക്കേഷൻ സർട്ടിഫിക്കറ്റ്","certificates","MapPin","location സ്ഥലം","c",false,"confirm"],
["dependency-certificate","Dependency Certificate","ആശ്രിത സർട്ടിഫിക്കറ്റ്","certificates","Users","dependency dependent ആശ്രിതൻ","c",false,"confirm"],
["solvency-certificate","Solvency Certificate","സോൾവൻസി സർട്ടിഫിക്കറ്റ്","certificates","Scale","solvency","c",false,"confirm"],
["minority-certificate","Minority Certificate","ന്യൂനപക്ഷ സർട്ടിഫിക്കറ്റ്","certificates","FileText","minority ന്യൂനപക്ഷം","c",false,"confirm"],
["caste-conversion-certificate","Caste Conversion Certificate","ജാതി മാറ്റ സർട്ടിഫിക്കറ്റ്","certificates","FileText","caste conversion ജാതി മാറ്റം","c",false,"confirm"],
["identification-certificate","Identification Certificate","തിരിച്ചറിയൽ സർട്ടിഫിക്കറ്റ്","certificates","BadgeCheck","identification identity തിരിച്ചറിയൽ","c",false,"confirm"],
["life-certificate","Life Certificate","ലൈഫ് സർട്ടിഫിക്കറ്റ്","pension","HeartPulse","life certificate pension jeevan pramaan ജീവൻ പ്രമാൺ പെൻഷൻ","c",true,"confirm"],
["one-and-same-certificate","One and Same Certificate","വൺ ആൻഡ് സെയിം സർട്ടിഫിക്കറ്റ്","certificates","BadgeCheck","one and same name mismatch പേര് വ്യത്യാസം","c",false,"confirm"],
["family-membership-certificate","Family Membership Certificate","കുടുംബാംഗത്വ സർട്ടിഫിക്കറ്റ്","certificates","Users","family membership കുടുംബം","c",false,"confirm"],
["voter-epic-assistance","Voter Registration / EPIC Assistance","വോട്ടർ രജിസ്ട്രേഷൻ / EPIC സഹായം","other","Vote","voter election epic id വോട്ടർ ഐഡി","h",false,"confirm"],
["passport-assistance","Passport Application Assistance","പാസ്പോർട്ട് അപേക്ഷാ സഹായം","other","Plane","passport പാസ്പോർട്ട്","h",false,"confirm"],
["vehicle-insurance","Vehicle Insurance","വാഹന ഇൻഷുറൻസ്","insurance","Car","insurance renewal vehicle bike car policy ഇൻഷുറൻസ് പുതുക്കൽ വണ്ടി","p",true,"confirm",["വാഹന തരം (ഇരുചക്ര/കാർ/മറ്റ്)","പോളിസി പുതുക്കേണ്ട തീയതി","നിലവിലെ പോളിസി ഉണ്ടോ (ഉണ്ട്/ഇല്ല)"]],
["electricity-bill","Electricity Bill Payment","വൈദ്യുതി ബിൽ അടയ്ക്കൽ","bills","Zap","kseb electricity current bill കറന്റ് ബിൽ വൈദ്യുതി","p",true,"confirm",["ബിൽ അടയ്ക്കേണ്ട അവസാന തീയതി"]],
["water-bill","Kerala Water Authority Bill Payment","വാട്ടർ അതോറിറ്റി ബിൽ അടയ്ക്കൽ","bills","Droplets","kwa water bill വെള്ളം ബിൽ","p",false,"confirm",["ബിൽ അടയ്ക്കേണ്ട അവസാന തീയതി"]],
["university-fee","University Fee Payment","സർവകലാശാല ഫീസ് അടയ്ക്കൽ","bills","GraduationCap","university fee exam college സർവകലാശാല പരീക്ഷ ഫീസ്","p",false,"confirm",["സർവകലാശാലയുടെ പേര്","ഫീസ് അടയ്ക്കേണ്ട അവസാന തീയതി"]],
["scholarship-assistance","Scholarship Application Assistance","സ്കോളർഷിപ്പ് അപേക്ഷാ സഹായം","other","GraduationCap","scholarship student സ്കോളർഷിപ്പ് വിദ്യാർത്ഥി","h",false,"confirm",["ഏത് സ്കോളർഷിപ്പ്"]],
["birth-death-certificate","Birth / Death Certificate Copies","ജനന / മരണ സർട്ടിഫിക്കറ്റ് പകർപ്പ്","certificates","Baby","birth death copy ജനനം മരണം","c",false,"confirm",["ജനന/മരണ വർഷം"]],
["public-grievance","Public Grievance Assistance","പൊതുജന പരാതി സഹായം","other","Megaphone","grievance complaint പരാതി","h",false,"confirm",["പരാതി ഏത് വകുപ്പിനെ സംബന്ധിച്ച്"]],
["rti-assistance","RTI Application Assistance","വിവരാവകാശ (RTI) അപേക്ഷാ സഹായം","other","BookOpen","rti right to information വിവരാവകാശം","h",false,"confirm"],
["pension-assistance","Pension and Related Application Assistance","പെൻഷൻ അനുബന്ധ അപേക്ഷാ സഹായം","pension","HandCoins","pension welfare പെൻഷൻ ക്ഷേമം","h",false,"confirm",["ഏത് പെൻഷൻ"]],
];
const ask = (k: Kind, ml: string) =>
  k === "c" ? `${ml} ലഭിക്കുന്നതിനുള്ള സഹായം ആവശ്യമാണ്.` : k === "p" ? `${ml} സംബന്ധിച്ച് അന്വേഷിക്കാനാണ്.` : `${ml} സംബന്ധിച്ച വിവരങ്ങളും സഹായവും ആവശ്യമാണ്.`;
export const services: Service[] = raw.map(([slug, en, ml, category, icon, kw, kind, popular, remote, extra]) => ({
  id: slug, slug, titleEn: en, titleMl: ml, category, icon, popular,
  shortDescriptionEn: `Check requirements for ${en} and enquire via WhatsApp.`,
  shortDescriptionMl: `${ml} സംബന്ധിച്ച വിവരങ്ങൾ അറിയാം, വാട്സ്ആപ്പിൽ അന്വേഷിക്കാം.`,
  fullDescriptionEn: `${en} is a candidate service listed from the Akshaya service directory. Detailed description is to be confirmed against the official portal.`,
  fullDescriptionMl: `അക്ഷയ സേവന ഡയറക്ടറിയിൽ ഉൾപ്പെട്ട ${ml} സംബന്ധിച്ച വിവരങ്ങൾക്ക് ഔദ്യോഗിക പോർട്ടൽ പരിശോധിക്കുക. വിശദാംശങ്ങൾ കേന്ദ്രം സ്ഥിരീകരിക്കേണ്ടതുണ്ട്.`,
  searchKeywords: kw.split(" "), availabilityStatus: "unconfirmed" as const,
  remoteEligibility: remote,
  remoteEligibilityExplanation: remote === "physical"
    ? "ബയോമെട്രിക് വിവരങ്ങൾ ആവശ്യമായതിനാൽ നേരിട്ട് എത്തേണ്ടി വരും. കേന്ദ്രത്തോട് സ്ഥിരീകരിക്കുക."
    : "വാട്സ്ആപ്പിലൂടെ അന്വേഷിക്കാം. അപേക്ഷ വിദൂരമായി ആരംഭിക്കാനാകുമോ, നേരിട്ട് എത്തേണ്ടതുണ്ടോ എന്നത് കേന്ദ്രം സ്ഥിരീകരിച്ചിട്ടില്ല.",
  documentsVerified: false,
  requiredDocuments: [
    { en: "Identity proof (e.g. Aadhaar copy)", ml: "തിരിച്ചറിയൽ രേഖ (ഉദാ: ആധാർ പകർപ്പ്)" },
    { en: "Existing related documents", ml: "ബന്ധപ്പെട്ട നിലവിലെ രേഖകൾ" },
  ],
  conditionalDocuments: [],
  requiredInformation: ["പേര്", "ബന്ധപ്പെടേണ്ട ഫോൺ നമ്പർ", "സേവനത്തിന്റെ ആവശ്യം"],
  officialGovernmentFee: null, akshayaServiceCharge: null, scanningPrintingCharge: null, otherApplicableCharges: null,
  feeVerificationDate: null, processingTime: null, officialSourceUrl: SRC,
  serviceSpecificInstructions: ["ആധാർ നമ്പർ, OTP, പാസ്‌വേഡ് എന്നിവ വാട്സ്ആപ്പിൽ അയയ്ക്കരുത്."],
  whatsappTemplate: { ask: ask(kind, ml), fields: extra ?? [], closing: kind === "p" ? "നിലവിലെ നിരക്കുകളും ആവശ്യമായ രേഖകളും അറിയിക്കാമോ?" : CLOSE },
  published: true,
}));
export const bySlug = (s: string) => services.find(x => x.slug === s && x.published);
export const popularServices = () => services.filter(s => s.popular);
