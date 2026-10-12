import { FileText, Fingerprint, ShoppingBasket, CreditCard, Car, Zap, Droplets, GraduationCap, Landmark, HeartPulse, Vote, Plane, Users, MapPin, Scale, BookOpen, Megaphone, Baby, BadgeCheck, HandCoins, type LucideProps } from "lucide-react";
const map = { FileText, Fingerprint, ShoppingBasket, CreditCard, Car, Zap, Droplets, GraduationCap, Landmark, HeartPulse, Vote, Plane, Users, MapPin, Scale, BookOpen, Megaphone, Baby, BadgeCheck, HandCoins };
export default function Icon({ name, ...p }: { name: string } & LucideProps) {
  const C = (map as Record<string, typeof FileText>)[name] ?? FileText;
  return <C aria-hidden="true" {...p} />;
}
