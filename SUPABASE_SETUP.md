# Supabase Setup — CMS (one-time, ~5 minutes)

The site runs without Supabase (it falls back to the built-in default content),
but to use the `/admin` panel to upload images/videos and publish changes live,
do this once.

## 1. Create a project
1. Go to https://supabase.com → New Project (free tier is fine).
2. When it's ready, open **Settings → API** and copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

## 2. Add env vars
Copy `.env.example` to `.env` and paste your values. Also set a strong
`VITE_ADMIN_PASSWORD`. (On Netlify/Vercel, add these same vars in the dashboard's
Environment Variables — don't commit `.env`.)

## 3. Create the content table
In Supabase → **SQL Editor**, run:

```sql
create table if not exists site_content (
  id int primary key,
  data jsonb not null,
  updated_at timestamptz default now()
);

-- Allow the site to read content publicly, and writes from anyone with the
-- anon key (the /admin password gates access in the UI). For stricter security,
-- swap to Supabase Auth later.
alter table site_content enable row level security;

create policy "public read"  on site_content for select using (true);
create policy "public write" on site_content for insert with check (true);
create policy "public update" on site_content for update using (true);
```

## 4. Create the storage bucket
Supabase → **Storage → New bucket**:
- Name: `media`
- **Public bucket: ON** (so uploaded images are viewable on the site)

Then under the bucket's **Policies**, add a policy allowing uploads with the
anon key (Storage → Policies → New policy → "For full customization" →
allow `insert` for `public`). A quick template:

```sql
create policy "public upload" on storage.objects
  for insert to public with check (bucket_id = 'media');
create policy "public read media" on storage.objects
  for select to public using (bucket_id = 'media');
```

## 5. Done
Run the site, visit `/admin`, log in, and the first load seeds the table with
the current content. Edit any slot, hit **Publish**, and it's live.

> Security note: this setup gates the CMS with a shared password on the client.
> It's fine for a small team site. For anything more sensitive, switch to
> Supabase Auth (email magic-link) and restrict the write policies to
> authenticated users — the code is structured to make that swap easy.
