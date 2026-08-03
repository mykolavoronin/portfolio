# Mykola Voronin — Portfolio

Personal portfolio: **React**, **TypeScript**, **Vite**, **Tailwind CSS**, **Motion / Motion+**.

## Quick start

```bash
# Motion+ needs MOTION_TOKEN during install (see .env.example)
# PowerShell:
$env:MOTION_TOKEN="your-token-here"
npm install
npm run dev
```

| Command | Description |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm run screenshots` | Capture project site screenshots |
| `npm run og:render` | Rebuild card OG PNGs from SVG |

## Layout

```
public/                 Static assets (favicons, OG, robots, sitemap)
scripts/                Capture screenshots, OG render, repo checks
src/
  assets/               Avatar, signature, project screenshots
  components/           Layout, motion, SEO, UI primitives
  data/                 Content SSOT (projects, site, education, …)
  hooks/                Small shared hooks
  lib/                  Utils (cn, haptics, vcard, motion tokens)
  pages/                Route screens
  App.tsx               Router
  index.css             Design tokens + components
vercel.json             SPA rewrites
```

## Deploy (Vercel)

1. Framework: **Vite** (defaults)
2. Env: `MOTION_TOKEN` from [motion.dev/dashboard/tokens](https://motion.dev/dashboard/tokens)
3. Enable **Analytics** + **Speed Insights** in the dashboard after first deploy
4. Optional domain: `mykolavoronin.com`

`vercel.json` rewrites SPA routes to `index.html`.

## Content

Edit `src/data/*` — projects, experience, education, site identity.

## License

MIT
