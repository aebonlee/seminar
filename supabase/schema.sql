-- ============================================================
-- DreamIT Seminar — Supabase Schema (prefix: seminar_)
-- 실행: Supabase Studio > SQL Editor 에 붙여넣고 실행
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ---------- seminar_profiles ----------
create table if not exists public.seminar_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz not null default now()
);

-- ---------- seminar_courses ----------
create table if not exists public.seminar_courses (
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
  /**
   * 강의에 매핑된 학습 사이트. 신청 승인된 사용자에게만 마이페이지에서 공개됩니다.
   * 형식: [{ id, name, url, description }]
   */
  learning_sites jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  approved_at timestamptz
);

create index if not exists idx_seminar_courses_status on public.seminar_courses(status);
create index if not exists idx_seminar_courses_created_at on public.seminar_courses(created_at desc);

-- ---------- seminar_applications ----------
create table if not exists public.seminar_applications (
  id uuid primary key default uuid_generate_v4(),
  course_id uuid not null references public.seminar_courses(id) on delete cascade,
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

create index if not exists idx_seminar_applications_status on public.seminar_applications(status);
create index if not exists idx_seminar_applications_user on public.seminar_applications(user_id);
create index if not exists idx_seminar_applications_course on public.seminar_applications(course_id);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.seminar_profiles enable row level security;
alter table public.seminar_courses enable row level security;
alter table public.seminar_applications enable row level security;

-- Helper: is current user admin?
create or replace function public.seminar_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select role = 'admin' from public.seminar_profiles where id = auth.uid()),
    false
  );
$$;

-- ---------- seminar_profiles policies ----------
drop policy if exists "seminar_profiles self select" on public.seminar_profiles;
create policy "seminar_profiles self select" on public.seminar_profiles
  for select using (id = auth.uid() or public.seminar_is_admin());

drop policy if exists "seminar_profiles self insert" on public.seminar_profiles;
create policy "seminar_profiles self insert" on public.seminar_profiles
  for insert with check (id = auth.uid());

drop policy if exists "seminar_profiles self update" on public.seminar_profiles;
create policy "seminar_profiles self update" on public.seminar_profiles
  for update using (id = auth.uid());

-- ---------- seminar_courses policies ----------
drop policy if exists "seminar_courses public read approved" on public.seminar_courses;
create policy "seminar_courses public read approved" on public.seminar_courses
  for select using (status = 'approved' or public.seminar_is_admin());

drop policy if exists "seminar_courses admin write" on public.seminar_courses;
create policy "seminar_courses admin write" on public.seminar_courses
  for all using (public.seminar_is_admin()) with check (public.seminar_is_admin());

-- ---------- seminar_applications policies ----------
drop policy if exists "seminar_applications self read" on public.seminar_applications;
create policy "seminar_applications self read" on public.seminar_applications
  for select using (user_id = auth.uid() or public.seminar_is_admin());

drop policy if exists "seminar_applications insert signed" on public.seminar_applications;
create policy "seminar_applications insert signed" on public.seminar_applications
  for insert with check (auth.uid() is not null);

drop policy if exists "seminar_applications admin update" on public.seminar_applications;
create policy "seminar_applications admin update" on public.seminar_applications
  for update using (public.seminar_is_admin()) with check (public.seminar_is_admin());

-- ============================================================
-- 초기 관리자 지정 (회원가입 후 1회 실행)
-- ============================================================
-- update public.seminar_profiles set role = 'admin' where email = 'admin@dreamitbiz.com';
