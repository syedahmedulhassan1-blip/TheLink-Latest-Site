# The Link Advertising — Multipage Website

A React + TypeScript + Vite + Tailwind site, now running as a **true multipage
application** with real URLs, deep-linking, working browser back/forward, and
per-page SEO.

## Run it
```bash
npm install
npm run dev      # local dev at http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## IMPORTANT — your /public folder
Your images and videos live in /public (logos, campaign folders, /slideshow,
/videos, image.png, Untitled-1.png, etc.). That folder was NOT part of this
change — keep your existing /public exactly as-is. The two small files added to
/public here (`_redirects`, and a `favicon.png` you should drop in) sit
alongside your existing assets. Do not delete your media.

## Routes
| URL             | Page                          |
|-----------------|-------------------------------|
| `/`             | Hero + Slideshow + Clients    |
| `/about`        | About                         |
| `/portfolio`    | Portfolio                     |
| `/agentic-ai`   | Agentic AI                    |
| `/services`     | Services + Websites           |
| `/rent-creative`| Rent a Creative               |
| `/contact`      | Contact                       |
| anything else   | redirects to `/`              |

## What changed (and why)
- **Real routing** via `react-router-dom`. The old `router.tsx` (which was just
  `useState`) is now a thin compatibility shim over react-router, so every
  existing component keeps using `useRouter()` unchanged — but now you get real
  URLs, shareable deep links, and a working back button.
- **Per-page SEO** via `react-helmet-async` — unique title, description,
  canonical URL, and Open Graph / Twitter tags per page (see `src/seo/`).
- **Scroll reset** on navigation (`ScrollToTop`).
- **Fixed broken CTAs**: the "Start Your Project" / "Let's Build Yours" buttons
  in Clients and Websites used `getElementById('contact')`, which does nothing
  on separate pages. They now navigate to `/contact`.
- **Hero parallax** now respects `prefers-reduced-motion`, skips touch devices,
  and is throttled with `requestAnimationFrame` (was firing setState on every
  mouse move).
- **SPA deploy fallback** for Netlify (`netlify.toml`, `public/_redirects`) and
  Vercel (`vercel.json`) so direct links / refresh on deep routes work.

## To finish
- Drop a `favicon.png` and a 1200×630 `the-link-og.jpg` social-share image into
  /public (the OG image URL is set in `src/seo/seo.ts`).
- Update the base URL in `src/seo/seo.ts` if your domain differs.
