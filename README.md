# Sakan
A polished Egyptian real estate portfolio app built with Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Supabase, Leaflet, GSAP, Lenis, React Bits and Swiper.

Live: https://sakan-real-estate.vercel.app/

## Run on your Mac
Node.js 20.9+ (Node 24 recommended).
1. Copy this source into `/Users/applecare/Desktop/Abdelrahman/Real-Estate`. Review any existing files before replacing them.
2. Run `npm ci`.
3. Copy `.env.example` to `.env.local` and add the Supabase project URL and publishable key from the project Connect dialog. These values are already configured on Vercel.
4. Run `npm run dev`, then open http://localhost:3000.

Without Supabase environment variables the app runs with the same 100 deterministic fictional listings and device-only favorites. With Supabase configured, listing failures produce an error state instead of silently falling back.

## Included
- Home page with optimized local WebP photography, original design tokens, GSAP entrance, Lenis scrolling and React Bits BlurText.
- Server-side district, text, property type, price, bedrooms and area filters, sort, pagination and URL state.
- Buy/rent inventory; Leaflet map with price markers and linked property previews.
- Property details with Swiper lightbox, keyboard controls, amenities, approximate map and share action.
- Supabase cookie-based email/password sign-in, Google OAuth, confirmation callback, password recovery and saved properties. Availability of registration, Google and recovery is explicitly gated by environment flags described below.
- Responsive layouts, mobile bottom navigation, focus styles and reduced-motion support.
- Database schema, deterministic seed script, 10 tests, pinned dependencies and lockfile.

## Connected deployment
Vercel project: `sakan-real-estate` (`prj_72laXbk2c4dN1ZAypFYNMBePbDSQ`). Dedicated Supabase project: **Sakan**, `dxfojlhebqjibupgjemc` in eu-west-1. Tables: `public.sakan_properties` and `public.sakan_favorites`. Fifty sample listings were copied from the original shared project on 29 October 2026; 50 additional fictional listings were subsequently added, bringing the total to 100 (60 sale, 40 rental); there were no favorites to transfer. The original project's data was retained. GitHub repository: `https://github.com/Abdelrahman-Tarek99/sakan-real-estate`. The complete source is maintained in this existing repository. Vercel Git linking status is recorded in DELIVERY.md.

## Authentication setup still required
In the dedicated Sakan project, email auth and public signups are enabled, email confirmation is required, and **Google is still disabled**. Existing-account email sign-in is available. New account, Google and recovery UI are disabled until configured. No real user account was used for end-to-end sign-in testing.

The dedicated Sakan project is already provisioned. For another fresh project, apply `supabase/schema.sql`, then run the seed script. The schema file is for a fresh database; do not reapply it to the already provisioned tables. Use the returned migration history in the connected project as authoritative.

To enable full Auth in a suitable project:
1. Add `https://sakan-real-estate.vercel.app/auth/callback` and `http://localhost:3000/auth/callback` under Authentication → URL Configuration → Redirect URLs. Set Sakan’s Site URL to `https://sakan-real-estate.vercel.app`.
2. Enable new user signups and email/password auth. Set `NEXT_PUBLIC_AUTH_SIGNUP_ENABLED=true` in Vercel and local environment.
3. Configure Google under Sign In / Providers using your own Google OAuth client ID and secret. In Google Cloud, use the dedicated project's callback: `https://dxfojlhebqjibupgjemc.supabase.co/auth/v1/callback`. Replace the original shared project's callback in the Sakan Web OAuth client. Set `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED=true`.
4. Once recovery redirects are validated, set `NEXT_PUBLIC_AUTH_RECOVERY_ENABLED=true`.
5. Redeploy for NEXT_PUBLIC flag changes, then test signup confirmation, Google, password reset, and saving on two devices.

Do not put the service-role key in browser code or a NEXT_PUBLIC variable. The application uses only the publishable key and RLS. `SUPABASE_SERVICE_ROLE_KEY` is server-only and required only by the optional `npm run seed` script.

## Database security
Properties allow public SELECT only. Favorites allow authenticated users to SELECT, INSERT and DELETE only rows whose user_id equals auth.uid(). Composite uniqueness prevents duplicate saves. Foreign keys cascade on deletion; all foreign keys have covering indexes. The dedicated project's security advisor returned no findings after provisioning. Existing warnings in the former shared project are outside Sakan's current database.

## Commands
`npm run dev` — local server. `npm run typecheck` — TypeScript. `npm test` — 10 logic tests. `npm run build` — production build. `node --env-file=.env.local --import tsx scripts/seed.ts` — optional seed with server-only credentials. The script targets only the dedicated Sakan project, inserts missing deterministic IDs without updating existing rows, verifies exactly 100 rows and never deletes properties or favorites.

The plan listed both NextAuth and Supabase Auth. This implementation uses Supabase Auth as the single identity source so favorites reference auth.users directly. It uses current Next.js rather than the plan's older Next.js 14.

## Photography and listings
All 100 listings are fictional and labeled as samples. The Unsplash photos are local, optimized stock assets; they do not depict actual Egyptian addresses. Sources and licenses are in THIRD_PARTY_NOTICES.md. For a commercial site, replace sample data with verified listings and choose a map provider with capacity for the expected traffic.

## Inventory expansion
The original 50 IDs and records are retained. The next 50 IDs cover ten districts, including Madinaty, El Shorouk, Smouha and Sidi Bishr, across all five property types and both intents. Photography reuses the licensed, optimized local stock assets with illustrative disclosures. Repeated seed runs insert missing IDs only; they preserve existing property edits and saved favorites. The script intentionally refuses other Supabase projects, including the old shared project.
