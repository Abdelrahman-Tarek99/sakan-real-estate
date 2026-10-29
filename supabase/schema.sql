-- Sakan owns only these two tables. Existing application tables are untouched.
create table public.sakan_properties (
 id uuid primary key default gen_random_uuid(),
 title text not null check (length(title) between 1 and 200),
 description text not null,
 price integer not null check (price > 0),
 bedrooms smallint not null check (bedrooms between 0 and 10),
 bathrooms smallint not null check (bathrooms between 1 and 10),
 area_sqm integer not null check (area_sqm > 0),
 property_type text not null check (property_type in ('apartment','villa','studio','penthouse','duplex')),
 listing_type text not null default 'buy' check (listing_type in ('buy','rent')),
 address text not null, city text not null, district text not null,
 latitude double precision not null check (latitude between -90 and 90),
 longitude double precision not null check (longitude between -180 and 180),
 images text[] not null check (cardinality(images) > 0),
 features text[] not null default '{}',
 is_featured boolean not null default false,
 created_at timestamptz not null default now()
);
create table public.sakan_favorites (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 property_id uuid not null references public.sakan_properties(id) on delete cascade,
 created_at timestamptz not null default now(),
 unique (user_id, property_id)
);
create index sakan_properties_search_idx on public.sakan_properties(listing_type,district,price);
create index sakan_properties_created_idx on public.sakan_properties(created_at desc,id);
create index sakan_favorites_property_idx on public.sakan_favorites(property_id);
alter table public.sakan_properties enable row level security;
alter table public.sakan_favorites enable row level security;
revoke all on public.sakan_properties from anon,authenticated;
revoke all on public.sakan_favorites from anon,authenticated;
grant select on public.sakan_properties to anon,authenticated;
grant select,insert,delete on public.sakan_favorites to authenticated;
create policy "Public sample property reads" on public.sakan_properties for select to anon,authenticated using (true);
create policy "Read own saved homes" on public.sakan_favorites for select to authenticated using ((select auth.uid())=user_id);
create policy "Save own homes" on public.sakan_favorites for insert to authenticated with check ((select auth.uid())=user_id);
create policy "Remove own saved homes" on public.sakan_favorites for delete to authenticated using ((select auth.uid())=user_id);
comment on table public.sakan_properties is 'Sakan portfolio app: fictional Egyptian listings and illustrative stock photography';
