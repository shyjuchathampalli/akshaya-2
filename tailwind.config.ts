import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { brand: { 50:"#f5f2fc",100:"#e7e0f6",200:"#cfc2ee",600:"#4a34a8",700:"#3b2a8a",800:"#2e2170",900:"#221852" },
      sun: { 100:"#fff3c4",300:"#fbd34d",400:"#f6c026",500:"#e8aa0c" }, ink:"#1d1b2e", sky:{600:"#2563a8",50:"#eef5fc"} },
    fontFamily: { sans: ['"Noto Sans Malayalam"','Inter','system-ui','"Segoe UI"','Roboto','sans-serif'] } } },
  plugins: [],
} satisfies Config;
