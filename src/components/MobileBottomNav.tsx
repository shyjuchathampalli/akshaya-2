"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, HelpCircle, Phone } from "lucide-react";
const items = [{ href: "/", l: "ഹോം", I: Home }, { href: "/services", l: "സേവനങ്ങൾ", I: LayoutGrid }, { href: "/help", l: "സഹായം", I: HelpCircle }, { href: "/contact", l: "ബന്ധപ്പെടുക", I: Phone }];
export default function MobileBottomNav() {
  const p = usePathname();
  return (
    <nav aria-label="മൊബൈൽ മെനു" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-brand-100 bg-white md:hidden">
      {items.map(({ href, l, I }) => {
        const on = href === "/" ? p === "/" : p.startsWith(href);
        return (
          <Link key={href} href={href} aria-current={on ? "page" : undefined}
            className={`flex min-h-14 flex-col items-center justify-center text-xs ${on ? "font-bold text-brand-700" : "text-slate-600"}`}>
            <I size={22} aria-hidden="true" />{l}
          </Link>
        );
      })}
    </nav>
  );
}
