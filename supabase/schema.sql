-- ============================================================
-- DreamIT Seminar — Supabase Schema
-- 실행: Supabase Studio > SQL Editor 에 붙여넣고 실행
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ---------- profiles ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz not null default now()
);

-- ---------- courses ----------
create table if not exists public.courses (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  subtitle text,
  description text not null,
  category text not null,
  instructor text not null,
  instructor_bio text,
  cover_url text,
  duration_weeks int not null default 4,
  sessions int not null default 8,
  level text not null default 'intermediate' check (level in ('beginner','intermediate','advanced')),
  price int not null default 0,
  capacity int not null default 20,
  start_date timestamptz,
  end_date timestamptz,
  status text not null default 'pending' check (status in ('draft','pending','approved','rejected','archived')),
  highlights jsonb not null default '[]'::jsonb,
  curriculum jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  approved_at timestamptz
);

create index if not exists idx_courses_status on public.courses(status);
create index if not exists idx_courses_created_at on public.courses(created_at desc);

-- ---------- applications ----------
create table if not exists public.applications (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid not null references public.courses(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text not null,
  phone text not null,
  organization text,
  motivation text not null,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  admin_note text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz
);

create index if not exists idx_applications_status on public.applications(status);
create index if not exists idx_applications_user on public.applications(user_id);
create index if not exists idx_applications_course on public.applications(course_id);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.applications enable row level security;

-- Helper: is current user admin?
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select role = 'admin' from public.profiles where id = auth.uid()),
    false
  );
$$;

-- ---------- profiles policies ----------
drop policy if exists "profiles self select" on public.profiles;
create policy "profiles self select" on public.profiles
  for select using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles self insert" on public.profiles;
create policy "profiles self insert" on public.profiles
  for insert with check (id = auth.uid());

drop policy if exists "profiles self update" on public.profiles;
create policy "profiles self update" on public.profiles
  for update using (id = auth.uid());

-- ---------- courses policies ----------
drop policy if exists "courses public read approved" on public.courses;
create policy "courses public read approved" on public.courses
  for select using (status = 'approved' or public.is_admin());

drop policy if exists "courses admin write" on public.courses;
create policy "courses admin write" on public.courses
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------- applications policies ----------
drop policy if exists "applications self read" on public.applications;
create policy "applications self read" on public.applications
  for select using (user_id = auth.uid() or public.is_admin());

drop policy if exists "applications insert any signed user" on public.applications;
create policy "applications insert any signed user" on public.applications
  for insert with check (auth.uid() is not null);

drop policy if exists "applications admin update" on public.applications;
create policy "applications admin update" on public.applications
  for update using (public.is_admin()) with check (public.is_admin());

-- ============================================================
-- 초기 관리자 지정 (회원가입 후 1회 실행)
-- ============================================================
-- update public.profiles set role = 'admin' where email = 'admin@dreamitbiz.com';
