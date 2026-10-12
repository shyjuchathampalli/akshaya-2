import { config } from "./config";
export const waUrl = (text?: string, number = config.whatsappNumber) =>
  `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
export const waWebUrl = (text: string, number = config.whatsappNumber) =>
  `https://web.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(text)}`;
