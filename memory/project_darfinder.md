---
name: project-darfinder
description: DarFinder real estate app — Cairo property listing platform built for Abdelrahman's Upwork portfolio
metadata:
  type: project
---

DarFinder is a full-stack Cairo real estate listing app at `/Users/applecare/Desktop/Abdelrahman/Real-Estate/darfinder`.

**Why:** Portfolio project to target $50–80/hr real estate / proptech contracts on Upwork.

**Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Supabase (Postgres + Auth), React-Leaflet, GSAP, Lucide, Swiper.

**Supabase project:** `dxfojlhebqjibupgjemc.supabase.co` — credentials in `darfinder/.env.local`.

**Status as of 2026-10-30:**
- Scaffolded, all core pages built, build passes cleanly.
- Schema SQL at `supabase/schema.sql` — needs to be applied to Supabase dashboard.
- Seed script at `scripts/seed.ts` — run with `npm run seed` (requires SUPABASE_SERVICE_ROLE_KEY in .env.local).
- Properties table needs 50 rows seeded before the app shows listings.

**Pages:** `/` (listing grid + filters), `/map` (Leaflet), `/properties/[id]` (detail), `/saved`, `/sign-in`, `/auth/callback`.

**How to apply:** Always use `darfinder/` as the working directory for this project (not the parent `Real-Estate/` folder).
