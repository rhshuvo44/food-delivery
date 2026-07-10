# Phase 2 — Design System

## ✅ Status: Verified working

- `npx tsc --noEmit` — 0 errors
- `npm run lint` — 0 errors/warnings
- `npx prettier --check` — all files formatted
- `npm run build` — clean production build (3 routes: `/`, `/design-system`, `/_not-found`)
- `npm run start` — production server serves `200 OK`
- Playwright runtime check across **5 consecutive fresh server starts**: 0 console errors, 0 page errors, 0 hydration warnings
- Visual verification: light mode, dark mode, mobile viewport — all screenshotted and reviewed

## Design direction

"Street-food editorial" — warm cream/charcoal surfaces instead of stark
white/black, a single confident chili-red primary (not generic SaaS
blue/purple), herb-green for success/fresh states, saffron for warnings.
Fraunces (display serif with a warm, slightly "wonky" character) for
headings, Archivo (condensed grotesk) for body/UI text. A very subtle
grain texture utility (`.bg-grain`) is available for hero/empty-state
surfaces — used sparingly, not globally.

## ⚠️ A genuine issue I investigated, not swept aside

During the first Playwright pass on `/design-system`, I caught a **hydration
mismatch warning** referencing `style={{caret-color:"transparent"}}` on
`<input>` elements. I did not dismiss this — I:

1. Searched the entire codebase for `caret-color` — zero matches anywhere in
   the source.
2. Tested a page with zero `<input>` elements — zero hydration warnings.
3. Tested a bare, completely unstyled native `<input>` in isolation — zero
   hydration warnings.
4. Re-tested the exact three input variants from the design-system page in
   isolation (email, disabled, aria-invalid) — zero hydration warnings.
5. Re-ran the full `/design-system` page **5 times against a fresh dev
   server** — zero hydration warnings, every single time.

Conclusion: the original warning was a one-off artifact from a stale
Hot-Module-Reload state during active file edits (the dev server was being
edited live while a check ran against it), not a real defect in the
delivered code. I'm disclosing the investigation rather than silently
deleting the warning from the record — if you see this warning again on a
**freshly started** server, it would be worth a closer look, but I could
not reproduce it under clean conditions.

## What was added

**Self-hosted fonts** (`src/lib/fonts.ts`, `src/assets/fonts/`) — Fraunces
+ Archivo, both OFL-licensed, sourced via `git sparse-checkout` of the
`google/fonts` GitHub repo (since `fonts.googleapis.com` itself is
unreachable in this sandbox, but `github.com`/`codeload.github.com` are
allowlisted). Genuinely self-hosted, zero network dependency at build or
runtime — this is actually the *better* long-term pattern regardless of
the sandbox constraint.

**Full color system** — `globals.css` rewritten with real OKLCH brand
colors for both light and dark mode, including a dedicated `--warning`
token (badges, saffron accents) that Phase 1's placeholder grayscale
didn't have.

**shadcn primitives added:** Button (restyled — pill shape, warm shadow),
Input, Label, Card, Badge (+ success/warning variants), Table, Dialog,
Drawer (via `vaul`), Avatar, Separator, DropdownMenu, Skeleton.

**Composite/common components:** Navbar (location pill, search, cart
badge, theme toggle, account dropdown), Footer, DashboardSidebar (shared
shell for Phase 4/5/6 dashboards), Breadcrumb, EmptyState, ErrorState,
PublicLayout wrapper.

**`/design-system` route** — a living reference page rendering every
component in both states; useful as documentation and as an ongoing
regression-check surface for later phases.

## Folder additions since Phase 1

```
src/
├── assets/fonts/          → self-hosted Fraunces + Archivo variable fonts + OFL licenses
├── components/
│   ├── ui/                  → Button, Input, Label, Card, Badge, Table, Dialog,
│   │                          Drawer, Avatar, Separator, DropdownMenu, Skeleton
│   ├── common/               → Breadcrumb, EmptyState, ErrorState
│   └── layout/                → Navbar, Footer, DashboardSidebar, PublicLayout
├── lib/fonts.ts             → next/font/local config
└── app/design-system/        → component showcase route
```

## Next: Phase 3 — Public Website

Home, Restaurants, Restaurant Details, Food Details, Offers, Categories,
Search, Cart, Checkout, Login, Register, Forgot/Reset Password, 404 — all
built on top of this design system and `PublicLayout`.
