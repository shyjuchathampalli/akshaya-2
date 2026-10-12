# Akshaya Kendram Perinjeri — Digital Service Front Office
Next.js 14 (App Router) · TypeScript · Tailwind · lucide-react. No backend, login or API keys.

## Run
    npm install
    npm run dev          # http://localhost:3000
    npm run typecheck && npm run build && npm start

Set `NEXT_PUBLIC_SITE_URL` to your domain before deploying (used for sitemap/metadata).

## Where to edit
- `src/lib/config.ts`: phone, WhatsApp number, email, **address and working hours (currently blank)**.
- `src/lib/services.ts`: the 32 service records (fees, documents, availability, templates).
- Logo: no genuine logo file was supplied. Add it as `public/logo.png` and use it in `SiteHeader` (`src/components/Chrome.tsx`) in place of the "അ" badge.

## Owner must verify before publishing
1. Which services Perinjeri actually offers (`availabilityStatus`: "unconfirmed" → "confirmed").
2. All fees (government, service charge, scanning/printing, other) and `feeVerificationDate`. All are `null` = shown as "സ്ഥിരീകരിച്ചിട്ടില്ല".
3. Required/conditional documents per service (currently a generic, flagged list; `documentsVerified: false`).
4. Processing times, remote eligibility, and per-service descriptions against https://akshaya.kerala.gov.in/services.
5. Address, working hours, logo, and the Malayalam wording of all templates.
