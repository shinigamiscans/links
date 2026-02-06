# Copilot Instructions — link-page

## Project Overview

Single-page "link in bio" site (like Linktree) built with **Next.js 16** (App Router, React 19) and scaffolded via **v0.app**. Dark-themed, mobile-first, animation-heavy. No backend/API — all data is hardcoded in components.

## Tech Stack & Conventions

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (`app/` router, RSC enabled) |
| UI primitives | shadcn/ui **new-york** style, Tailwind CSS v4 (PostCSS plugin, **not** `tailwind.config`) |
| Animations | Framer Motion — every visible component uses `motion.*` wrappers |
| Icons | Lucide React (`lucide-react`) — always import individual icons |
| Styling util | `cn()` from `@/lib/utils` (clsx + tailwind-merge) |
| Package manager | **pnpm** |

## Architecture

```
app/page.tsx            → renders <LinkBioPage /> (single route)
components/
  link-bio-page.tsx     → orchestrator: layout, ambient blobs, staggered entrance
  profile-section.tsx   → avatar + name + bio
  link-card.tsx         → individual link row (glassmorphism card)
  social-footer.tsx     → social icon row + copyright
  theme-provider.tsx    → next-themes wrapper (unused currently — dark hardcoded)
  ui/                   → shadcn/ui primitives (do not edit manually)
```

- **All page components are `"use client"`** — the layout is the only server component.
- Link data lives in the `links` array at the top of `components/link-bio-page.tsx`. To add/edit links, modify that array.
- Social links live in the `socials` array at the top of `components/social-footer.tsx`.

## Key Patterns

### Glassmorphism Styling
Cards use inline `style` objects with `rgba()` backgrounds, `backdrop-filter: blur()`, and layered `box-shadow` — not Tailwind classes. Preserve this pattern for visual consistency:
```tsx
style={{
  background: "rgba(255, 255, 255, 0.03)",
  backdropFilter: "blur(40px) saturate(180%)",
  WebkitBackdropFilter: "blur(40px) saturate(180%)",
  boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.08)`,
}}
```

### Framer Motion Animations
- Container → `containerVariants` with `staggerChildren` / `delayChildren`
- Items → `itemVariants` with spring physics (`stiffness: 350, damping: 25`)
- Interactive → `whileHover` / `whileTap` on `motion.a` / `motion.div`

### Theme System
CSS variables defined in `app/globals.css` using **oklch** color space. Light/dark tokens in `:root` / `.dark`. The HTML element has `class="dark"` hardcoded in `app/layout.tsx`. Custom `--card-shadow`, `--card-glow`, `--icon-bg` variables extend the shadcn defaults for glassmorphism support.

### shadcn/ui Components
Managed via `components.json` (new-york style, RSC-enabled, `@/components/ui` alias). Add new primitives with `npx shadcn@latest add <component>` — don't hand-write UI primitives.

## Dev Commands

```sh
pnpm dev          # Start dev server
pnpm build        # Production build (TS errors ignored via next.config)
pnpm lint         # ESLint
```

## Important Notes

- `next.config.mjs` sets `ignoreBuildErrors: true` and `images.unoptimized: true` — the project tolerates TS errors at build time.
- Path alias `@/*` maps to project root (configured in `tsconfig.json`).
- Profile image is referenced from `/public/images/` — use `next/image` with `fill` + `object-cover` for avatars.
- No testing framework is configured.
- No database, CMS, or API routes exist — this is a purely static site.
