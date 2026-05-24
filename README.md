# The Link Advertising — Multipage Website + CMS

React + TypeScript + Vite + Tailwind. A true multipage site with real URLs,
per-page SEO, a built-in CMS for every image and video, and defensive media
that never shows a broken-image icon.

## Run it
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## ⚠️ Your /public folder
Keep your existing /public exactly as-is (logos, campaign folders, slideshow,
etc.). This project does NOT include your media. The default content
(src/content/defaultContent.ts) points at those existing paths. Anything not
present yet shows a tasteful placeholder instead of a broken image — then you
fill the gaps from the CMS.

Drop these into /public when you have them:
- `favicon.png`
- `the-link-og.jpg` (1200×630 social-share image)
- `/videos/` showreel clips (optional — the showreel gracefully shows a static
  "Our Work" hero until videos exist)

## Routes
| URL              | Page                       |
|------------------|----------------------------|
| `/`              | Hero + Slideshow + Clients |
| `/about`         | About                      |
| `/portfolio`     | Portfolio                  |
| `/agentic-ai`    | Agentic AI                 |
| `/services`      | Services + Websites        |
| `/rent-creative` | Rent a Creative            |
| `/contact`       | Contact                    |
| `/admin`         | **CMS** (password-gated)   |
| anything else    | redirects to `/`           |

## The CMS (/admin)
A built-in content manager. Visit `/admin`, enter the password
(`VITE_ADMIN_PASSWORD`), and edit every media slot on the site: branding/logos,
hero, slideshow, CEO photo, showreel videos, and all portfolio campaigns
(add/remove/reorder, edit titles, clients, descriptions, categories, images).
It comes pre-filled with current content — you only change what you want.

- **Upload** sends files to Supabase Storage and writes back the live URL.
- **Publish** saves the whole content set to Supabase; changes go live for
  everyone instantly.
- Without Supabase configured, the site still runs fully on defaults; the CMS
  just can't upload/publish. See **SUPABASE_SETUP.md** (~5 min, free tier).

The admin bundle is code-split, so normal visitors never download it.

## How content flows
`src/content/defaultContent.ts` is the single source of truth (pre-filled).
`ContentProvider` loads from Supabase if configured, else uses defaults, and
falls back to defaults on any error. Every component reads via `useContent()`
and renders images through `<SmartImage>` (branded placeholder on miss/fail).

## What changed from the original
- **Real routing** (react-router-dom) — working URLs, deep links, back button.
  The old `useState` "router" is now a thin compat shim, so components were not
  rewritten.
- **Per-page SEO** (react-helmet-async) — unique title/description/OG per page.
- **CMS** for all images & videos, backed by Supabase.
- **Defensive media** — no broken-image icons anywhere; showreel handles "no
  videos yet" gracefully.
- **Fixed broken CTAs** in Clients/Websites (they targeted a same-page #contact
  that no longer exists) — now navigate to /contact.
- **Hero parallax** respects prefers-reduced-motion, skips touch, rAF-throttled.
- **Empty "POS" filter fixed** — only categories with real work are shown.
- **Lean bundle** — Supabase and the admin panel are both code-split.
- **SPA deploy fallback** for Netlify (`netlify.toml`, `public/_redirects`) and
  Vercel (`vercel.json`).

## Env
Copy `.env.example` → `.env` and fill in Supabase keys + admin password.
On Netlify/Vercel set the same vars in the dashboard (don't commit `.env`).

## Security note
The CMS is gated by a shared client-side password with open Supabase write
policies — fine for a small team. For stronger security, switch to Supabase
Auth and restrict write policies to authenticated users (the code is structured
to make that swap easy).
