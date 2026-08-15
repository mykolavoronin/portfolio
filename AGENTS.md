# Agent notes

This is a personal portfolio. Design *is* the product: keep the existing
identity (restrained neutrals, Inter + Instrument Serif, calm motion) and
improve craft, don't restyle it into a template.

## Project skills

Canonical project skills live in `.agents/skills/` (the shared Agent Skills
path). `skills-lock.json` is the install lockfile.

Who reads that folder:

- **Grok**, **Codex**, and **Antigravity / Gemini CLI** — `.agents/skills`
- **Claude Code** — does **not** use `.agents`; it needs `.claude/skills`
  (a copy of the same set)

Do not add `.codex/` or `.gemini/` skill trees. Those tools already pick up
`.agents/skills`.

When building or reviewing UI, load these first:

| Task | Skill |
| --- | --- |
| Polish, hover, press, shadows, icons | `better-ui` / `make-interfaces-feel-better` |
| Holistic screen review | `better-interface` |
| A11y, focus, hit areas, reduced motion | `better-accessibility` / `touch-and-accessibility` |
| Type, wrapping, OpenType | `better-typography` / `typography` |
| Color, contrast, dark mode | `better-colors` / `color` |
| Layout, grouping, breakpoints | `better-layout` |
| Copy, labels, empty states | `better-writing` |
| Motion for React | `motion-react` / `animate` / `animations` |
| Distinctive visual direction | `frontend-design` |
| Design-engineering checklist | `emil-design-engineering` |
| Architecture / deepening | `improve-codebase-architecture` |

## Visual system

One look: editorial. No style switcher, no liquid-glass, no Material You.

Tokens live in `src/index.css` (`:root` / `.dark`) and are consumed via Tailwind
(`bg-background`, `shadow-sm`, `rounded-lg`) or `var(--*)`. Don't hardcode
shadows, radii, or status colors in components.

## Hard rules from those skills

- Press scale is **always `0.96`**. Never below `0.95`.
- Hover is color / border only — no lift, no image zoom, no scale-up.
- Hover only when `@media (hover: hover)` — Tailwind `future.hoverOnlyWhenSupported`.
- Theme flips **snap**. Disable transitions for the swap (`ThemeProvider`).
- Icon state changes: scale `0.25→1`, opacity `0→1`, blur `4px→0`, spring `bounce: 0`.
- Image outlines: `oklch(0 0 0 / 0.1)` light, `oklch(1 0 0 / 0.1)` dark.
- Nested radii are concentric. No `transition: all`. No `will-change: all`.
- Reduced motion is not optional. Touch targets prefer 44×44.
- Content lives in `src/data/*`. Don't scatter copy into components.

## Layout

```
src/components   Layout, motion, SEO, UI primitives
src/data         Content SSOT
src/lib          cn, haptics, vcard, motion tokens
src/pages        Route screens
src/index.css    Tokens + surfaces
```
