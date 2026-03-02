-- CRM Expansion: contact_submissions, advertiser_leads, admin_notes

-- ── Contact Submissions ────────────────────────────────────
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'responded', 'archived')),
  admin_notes text,
  created_at timestamptz not null default now(),
  responded_at timestamptz
);

alter table public.contact_submissions enable row level security;

-- Anyone can submit a contact form
create policy "Anyone can insert contact submissions"
  on public.contact_submissions for insert
  to anon, authenticated
  with check (true);

-- Only admins can read
create policy "Admins can read contact submissions"
  on public.contact_submissions for select
  to authenticated
  using (public.is_admin());

-- Only admins can update
create policy "Admins can update contact submissions"
  on public.contact_submissions for update
  to authenticated
  using (public.is_admin());

-- ── Advertiser Leads ───────────────────────────────────────
create table if not exists public.advertiser_leads (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  website text,
  tier_interest text check (tier_interest in ('basic', 'premium', 'elite')),
  message text,
  source text not null default 'website',
  status text not null default 'new' check (status in ('new', 'contacted', 'negotiating', 'converted', 'lost')),
  admin_notes text,
  created_at timestamptz not null default now(),
  contacted_at timestamptz,
  converted_at timestamptz
);

alter table public.advertiser_leads enable row level security;

-- Anyone can submit a lead inquiry
create policy "Anyone can insert advertiser leads"
  on public.advertiser_leads for insert
  to anon, authenticated
  with check (true);

-- Only admins can read
create policy "Admins can read advertiser leads"
  on public.advertiser_leads for select
  to authenticated
  using (public.is_admin());

-- Only admins can update
create policy "Admins can update advertiser leads"
  on public.advertiser_leads for update
  to authenticated
  using (public.is_admin());

-- ── Admin Notes ────────────────────────────────────────────
create table if not exists public.admin_notes (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null check (entity_type in ('contact', 'lead', 'user', 'sponsorship')),
  entity_id uuid not null,
  admin_id uuid not null references auth.users(id),
  note text not null,
  created_at timestamptz not null default now()
);

alter table public.admin_notes enable row level security;

-- Admins only — all operations
create policy "Admins can do everything with notes"
  on public.admin_notes for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ── Recent Admin Activity Function ─────────────────────────
create or replace function public.recent_admin_activity(lim int default 20)
returns table (
  id uuid,
  activity_type text,
  title text,
  status text,
  created_at timestamptz
)
language sql
security definer
as $$
  (
    select id, 'contact' as activity_type, name || ' — ' || subject as title, status, created_at
    from public.contact_submissions
    order by created_at desc
    limit lim
  )
  union all
  (
    select id, 'lead' as activity_type, business_name as title, status, created_at
    from public.advertiser_leads
    order by created_at desc
    limit lim
  )
  union all
  (
    select id, 'event' as activity_type, title, moderation_status as status, created_at
    from public.events
    order by created_at desc
    limit lim
  )
  union all
  (
    select id, 'user' as activity_type, coalesce(display_name, email) as title, role as status, applied_at as created_at
    from public.profiles
    where applied_at is not null
    order by applied_at desc
    limit lim
  )
  order by created_at desc
  limit lim;
$$;
