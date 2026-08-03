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

## SPA routing

`vercel.json` rewrites client routes to `index.html` so deep links like `/projects/eka-balance` work after refresh.

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
