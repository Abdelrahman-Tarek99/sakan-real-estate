# Delivery and verification

Live URL: https://sakan-real-estate.vercel.app/
Required existing repository: https://github.com/Abdelrahman-Tarek99/sakan-real-estate
Local source: `/Users/applecare/Desktop/Abdelrahman/Real-Estate/Real-Estate`.

## Inventory — 29 October 2026
The dedicated Supabase project `dxfojlhebqjibupgjemc` has exactly **100** fictional properties: 60 sale and 40 rental. Fifty additions cover ten districts, all five property types, varied budgets, bedrooms and areas, and approximate Egyptian coordinates. Licensed local photography and sample/illustrative disclosures are retained. The old shared project was not modified.

The original 50 records have an unchanged database checksum (`10abd65cce0e76d6183448edfb5b5c85`). Existing IDs are preserved. Favorites count was zero before and after insertion. No properties or favorites were deleted. A repeated insert using the full seed retained exactly 100 records.

The seed uses deterministic IDs and inserts missing rows only (`ON CONFLICT DO NOTHING`), preserving existing records and favorites. It refuses other project URLs and verifies exactly 100 records. An unexpected inventory count causes an error; it never deletes extra records to force the count.

## Validation
Ten logic/inventory tests, TypeScript checks and the production build pass. The production build also passes with the dedicated project's public connection configured. Browser and deployment verification results will be recorded after checking the prepared build.

## Publication and authentication status
The existing GitHub repository was inspected: its main branch contained only the initial README. It is now public at the user's choice. The app can read it, but the first source upload returned GitHub 403 `Resource not accessible by integration`; app Contents write authorization is required.

The existing Vercel project is `prj_72laXbk2c4dN1ZAypFYNMBePbDSQ`, team `team_0ByicgWzotCoPgwL2hmToUIe`. Team-scoped requests returned 403 and an authorization link was requested. No replacement project was created. Existing environment variables and domains were not changed. Automatic Git linking and redeployment remain pending access.

Google provider configuration and real-account authentication testing remain incomplete. Available Supabase tools do not expose Auth configuration updates. Configure Google client credentials directly in Supabase; never add them to source or chat. Site URL must be `https://sakan-real-estate.vercel.app`; allowed app callbacks must include `https://sakan-real-estate.vercel.app/auth/callback` and `http://localhost:3000/auth/callback`. Google Cloud's Sakan Web authorized redirect URI must be `https://dxfojlhebqjibupgjemc.supabase.co/auth/v1/callback`. Keep public auth flags false until their corresponding configuration is complete. A human must complete Google login/consent before the real-account save/remove flow can be confirmed.
