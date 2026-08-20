-- Add missing profile fields to public.users
alter table public.users add column username text unique;
alter table public.users add column avatar_url text;
alter table public.users add column website text;
alter table public.users add column social_links jsonb default '{}'::jsonb;

-- Function to keep public.users in sync when auth.users is updated
create or replace function public.handle_user_update()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  update public.users
  set
    name = coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', name),
    username = coalesce(new.raw_user_meta_data->>'username', username),
    bio = coalesce(new.raw_user_meta_data->>'bio', bio),
    avatar_url = coalesce(new.raw_user_meta_data->>'avatar_url', avatar_url),
    website = coalesce(new.raw_user_meta_data->>'website', website),
    social_links = coalesce((new.raw_user_meta_data->>'social_links')::jsonb, social_links)
  where id = new.id;
  return new;
end;
$$;

create trigger on_auth_user_updated
  after update on auth.users
  for each row execute function public.handle_user_update();

-- Sync existing users from auth.users to public.users
do $$
declare
  r record;
begin
  for r in select id, raw_user_meta_data from auth.users loop
    update public.users
    set
      name = coalesce(r.raw_user_meta_data->>'full_name', r.raw_user_meta_data->>'name', name),
      username = coalesce(r.raw_user_meta_data->>'username', username),
      bio = coalesce(r.raw_user_meta_data->>'bio', bio),
      avatar_url = coalesce(r.raw_user_meta_data->>'avatar_url', avatar_url),
      website = coalesce(r.raw_user_meta_data->>'website', website),
      social_links = coalesce((r.raw_user_meta_data->>'social_links')::jsonb, social_links)
    where id = r.id;
  end loop;
end $$;

-- RLS: Public reading of profiles is allowed (for /u/[username] and /explore)
create policy "users_select_public" on public.users
  for select using (true);
