# Mykola Voronin — Portfolio

Personal portfolio built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Motion / Motion+**.

## Local development

```bash
# Motion+ needs MOTION_TOKEN during install (see .env.example)
# PowerShell:
$env:MOTION_TOKEN="your-token-here"
npm install
npm run dev
```

| Command | Description |
|---|---|
| `npm run dev` | Dev server (port 8080) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |

## Deploy on Vercel

### 1. Prerequisites

- GitHub/GitLab/Bitbucket repo (or Vercel CLI)
- **MOTION_TOKEN** for installing `motion-plus` (private registry)

### 2. Environment variable (required)

In Vercel: **Project → Settings → Environment Variables**

| Name | Value | Environments |
|---|---|---|
| `MOTION_TOKEN` | from [motion.dev/dashboard/tokens](https://motion.dev/dashboard/tokens) | Production, Preview, Development |

Without this, `npm install` fails with **401** on `@motionplus/*`.

### 3. Import the project

1. [vercel.com/new](https://vercel.com/new) → import this repo  
2. Framework Preset: **Vite** → **apply defaults** (leave Build / Output / Install as auto)  
3. Root Directory: **.** (repo root)  
4. Add `MOTION_TOKEN`, then Deploy  

Vercel Vite defaults:

| Setting | Default |
|---|---|
| Build Command | `vite build` / `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

### 4. Custom domain (optional)

**Project → Settings → Domains** → add `mykolavoronin.com`  
Point DNS as Vercel instructs (A/CNAME).

### 5. CLI (optional)

```bash
npm i -g vercel
vercel login
# first time
vercel
# production
vercel --prod
```

Set `MOTION_TOKEN` in the Vercel dashboard (or `vercel env add MOTION_TOKEN`) before building.

## Vercel Analytics & Speed Insights

Packages: `@vercel/analytics`, `@vercel/speed-insights` (wired in `src/components/VercelInsights.tsx`).

After deploy, enable them in the Vercel dashboard:

1. Project → **Analytics** → Enable  
2. Project → **Speed Insights** → Enable  

No extra env vars are required for these.

## SPA routing

`vercel.json` rewrites client routes to `index.html` so deep links like `/projects/eka-balance` work after refresh.

## Vite vs Next.js for this portfolio

**Stay on Vite** for this site unless you hit a hard SEO/SSR need.

| | **Vite (current)** | **Next.js** |
|---|---|---|
| Fit | Marketing/portfolio SPA | Content sites that need SSR/SSG by default |
| Deploy | Simple static `dist/` | Full framework on Vercel |
| SEO | Good enough with `Seo`, sitemap, meta (you already have this) | Stronger out of the box (SSR, OG images API) |
| Images | Manual / CDN | `next/image` optimization |
| DX for this codebase | Already built & polished | Full rewrite of routing, data, deploy |
| Analytics | Works the same | Works the same |

**Recommendation:** keep **Vite**. This portfolio is mostly static pages, client motion, and case studies — Vite is faster to ship and already production-ready. Consider Next.js later only if you want a blog/CMS, server OG images, or internationalized SSR.

## SPA routing

## Project layout

```
src/
  data/          # content (site, projects, services, …)
  pages/         # routes
  components/    # layout, motion, UI
public/          # static assets, robots, sitemap
vercel.json      # Vercel config
```

## License

MIT
