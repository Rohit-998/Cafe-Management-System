-- ============================================
-- Cafe Management System — Database Schema
-- Run this in the Supabase SQL Editor once.
-- ============================================

-- 1. PROFILES TABLE
-- Stores extra user info. Links to Supabase Auth users.
create table if not exists public.profiles (
  id         uuid references auth.users on delete cascade primary key,
  full_name  text,
  role       text default 'user' check (role in ('user', 'admin')),
  created_at timestamptz default now()
);

-- 2. MENU_ITEMS TABLE
-- Stores cafe menu items.
create table if not exists public.menu_items (
  id           uuid default gen_random_uuid() primary key,
  name         text not null,
  description  text,
  price        numeric(8,2) not null check (price > 0),
  category     text,
  is_available boolean default true,
  created_by   uuid references auth.users on delete set null,
  created_at   timestamptz default now()
);

-- 3. AUTO-CREATE PROFILE ON SIGNUP
-- When a new user signs up via Supabase Auth, this trigger
-- automatically inserts a row into profiles.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Drop the trigger first if it already exists (safe re-run)
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 4. ROW LEVEL SECURITY (RLS)

-- Enable RLS on both tables
alter table public.profiles   enable row level security;
alter table public.menu_items enable row level security;

-- profiles: users can read their own profile
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- profiles: users can update their own profile
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- menu_items: everyone (even anonymous) can read
create policy "Anyone can read menu items"
  on public.menu_items for select
  using (true);

-- menu_items: only logged-in users can insert
create policy "Logged-in users can insert menu items"
  on public.menu_items for insert
  with check (auth.uid() is not null);

-- menu_items: users can update items they created
create policy "Users can update own menu items"
  on public.menu_items for update
  using (auth.uid() = created_by);

-- menu_items: users can delete items they created
create policy "Users can delete own menu items"
  on public.menu_items for delete
  using (auth.uid() = created_by);

-- 5. SEED DATA — 5 sample menu items
insert into public.menu_items (name, description, price, category)
values
  ('Cappuccino',    'Rich espresso with steamed milk foam',   120.00, 'Beverages'),
  ('Cold Coffee',   'Chilled coffee blended with ice cream',  150.00, 'Beverages'),
  ('Veg Sandwich',  'Grilled sandwich with fresh vegetables',  90.00, 'Snacks'),
  ('Brownie',       'Warm chocolate brownie',                 110.00, 'Desserts'),
  ('Masala Tea',    'Traditional Indian spiced tea',           40.00, 'Beverages');
