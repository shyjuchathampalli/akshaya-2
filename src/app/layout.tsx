import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/Chrome";
import MobileBottomNav from "@/components/MobileBottomNav";
import { config } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: { default: "അക്ഷയ കേന്ദ്രം പെരിഞ്ചേരി | Akshaya Kendram Perinjeri", template: "%s | അക്ഷയ കേന്ദ്രം പെരിഞ്ചേരി" },
  description: "അക്ഷയ സേവനങ്ങൾ വീട്ടിലിരുന്ന് അറിയാം: ആവശ്യമായ രേഖകൾ പരിശോധിച്ച് വാട്സ്ആപ്പിലൂടെ അക്ഷയ കേന്ദ്രം പെരിഞ്ചേരിയുമായി ബന്ധപ്പെടാം.",
  openGraph: { title: "അക്ഷയ കേന്ദ്രം പെരിഞ്ചേരി", description: "സേവനങ്ങൾ കണ്ടെത്തൂ, രേഖകൾ അറിയൂ, വാട്സ്ആപ്പിൽ ബന്ധപ്പെടൂ.", locale: "ml_IN", type: "website" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#3b2a8a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ml">
      <body className="font-sans antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:p-3">ഉള്ളടക്കത്തിലേക്ക് പോകുക</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MobileBottomNav />
      </body>
    </html>
  );
}
