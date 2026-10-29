# Architecture
Next.js App Router + TypeScript + Tailwind 4. Server Components own listing queries, pagination, detail and saved pages. URL search params are the shareable filter state. Small client islands own interactive filters, map, favorites, gallery and authentication. Leaflet loads only for map view or the location section.

Supabase Postgres stores properties and favorites. Row level security permits public listing reads and restricts favorites to auth.uid(). Supabase Auth handles Google and email/password in one identity system with cookie-based SSR. The supplied plan names both NextAuth and Supabase Auth; this implementation deliberately uses Supabase Auth alone so favorites reference the same auth.users identity, avoiding duplicated sessions and account linking.

Without environment variables, deterministic demo data is served and favorites are explicitly saved on this device. A configured database failure is reported rather than silently falling back. The sample dataset contains 100 fictional properties with illustrative stock photography, not real offers.

Supabase schema and seed are versioned. Vercel builds with npm run build and runs standard Next.js; no provider-specific runtime is required. Secrets stay in deployment environment variables. Google OAuth requires provider credentials configured in Supabase. No service role credentials are used by application requests.
