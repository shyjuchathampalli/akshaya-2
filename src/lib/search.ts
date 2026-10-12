import { services, catLabel, type Service, type CategoryId } from "./services";
const norm = (s: string) => s.toLowerCase().normalize("NFC");
const hay = (s: Service) => norm([s.titleEn, s.titleMl, ...s.searchKeywords, catLabel(s.category).ml, catLabel(s.category).en].join(" "));
export function searchServices(q: string, cat: CategoryId | "all" = "all", list: Service[] = services) {
  const terms = norm(q).split(/\s+/).filter(Boolean);
  return list.filter(s => s.published && (cat === "all" || s.category === cat) && terms.every(t => hay(s).includes(t)));
}
