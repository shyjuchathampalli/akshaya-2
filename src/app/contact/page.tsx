import type { Metadata } from "next";
import { ContactSection } from "@/components/Chrome";
export const metadata: Metadata = { title: "ബന്ധപ്പെടുക", description: "അക്ഷയ കേന്ദ്രം പെരിഞ്ചേരിയെ ഫോണിലൂടെയോ വാട്സ്ആപ്പിലൂടെയോ ബന്ധപ്പെടാം." };
export default function Contact() { return <div className="mx-auto max-w-3xl space-y-4 px-4 py-8"><h1 className="text-3xl font-bold text-brand-800">ബന്ധപ്പെടുക</h1><ContactSection /></div>; }
