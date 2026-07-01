# Food Order — Frontend (Phase 1: Project Setup)

## ✅ Status: Verified working

Ran and passed in this environment:
- `npx tsc --noEmit` — 0 errors
- `npm run lint` — 0 errors/warnings
- `npx prettier --check` — all files formatted
- `npm run build` — clean production build
- `npm run start` — production server serves `200 OK`
- Runtime check via Playwright: 0 console errors, 0 page errors, light + dark mode both render correctly (screenshots verified)

## Stack (as delivered)

| Package | Version | Note |
|---|---|---|
| Next.js | 15.5.19 | App Router, `src/` directory |
| React | 18.3.1 | Pinned — Next 15 + shadcn ecosystem is best supported on React 18 |
| TypeScript | 5.x | strict mode |
| Tailwind CSS | 4.x | CSS-first config (`@theme inline` in globals.css, not `tailwind.config.js`) |
| Redux Toolkit + RTK Query | 2.x | Axios-backed `baseQuery`, not the default `fetchBaseQuery` |
| React Hook Form + Zod | latest | installed, wired in Phase 3+ |
| Axios | 1.18 | with request/response interceptors + refresh-token retry |
| Lucide React | installed | icons, used from Phase 2 onward |
| Recharts | installed | used in Phase 6 (Admin dashboard charts) |
| Sonner | installed | global `<Toaster />` wired in `providers/index.tsx` |
| next-themes | installed | light/dark mode wired and verified |
| Prettier + `prettier-plugin-tailwindcss` | installed | class-sorting on save/format |

## ⚠️ Things you should know before continuing

**1. Two CLIs were unreachable in this build environment** (network allowlist only permits npm/GitHub/PyPI registries, not `ui.shadcn.com` or `fonts.googleapis.com`):
- `npx shadcn init` — failed with a 401/auth error hitting `ui.shadcn.com`. I configured `components.json` and the CSS variable system **by hand** to be shadcn-CLI-compatible. If you run `npx shadcn add <component>` on your own machine (with real network access), it should work normally and respect this `components.json`.
- `next/font/google` (Geist) — failed to fetch from `fonts.googleapis.com`. I removed it and fell back to the system font stack for now. **Phase 2 (Design System) will pick real, distinctive self-hosted fonts** via `next/font/local`, which doesn't require network access at all — so this isn't a long-term compromise, just sequencing.

**2. create-next-app defaulted to Next.js 16**, not 15. I explicitly downgraded `next`, `react`, `react-dom`, their type packages, and `eslint-config-next` to stay aligned with your requested Next 15 stack, and fixed an ESLint flat-config incompatibility that surfaced from the version mismatch (`eslint-config-next@15.5.19` ships legacy-format configs; bridged via `@eslint/eslintrc`'s `FlatCompat`).

**3. Only one shadcn primitive (`Button`) was added in Phase 1** — just enough to prove the whole chain (Tailwind v4 variables → `cva` → `cn()` → Radix Slot) works end-to-end. The full primitive set (Input, Card, Dialog, Drawer, Table, etc.) is Phase 2 scope per your phase breakdown.

**4. Figma reference** — I attempted to fetch the provided Figma community link, but Figma's community pages render via client-side JS and aren't inspectable through a basic page fetch; I have no way to open or screenshot Figma files directly. I cannot literally see the design. From Phase 2 onward I'll build an original, production-ready design using food-delivery UX conventions and the `frontend-design` skill's guidance (avoiding generic "AI" aesthetics) — genuinely inspired by the category, not a literal copy of a file I can't see. If pixel-fidelity to that specific Figma matters, the most reliable path is exporting a few key screens as PNGs and sharing them directly.

## Folder structure delivered

```
src/
├── app/                  → routes (currently just smoke-test homepage)
├── components/
│   ├── ui/                → shadcn primitives (Button so far)
│   ├── common/             → cross-domain reusable components (Phase 2+)
│   └── layout/             → Navbar/Footer/Sidebar layouts (Phase 2+)
├── modules/               → domain folders scaffolded (auth, restaurant, food, cart, order)
├── redux/
│   ├── store.ts            → configureStore, per-request factory (App Router safe)
│   ├── hooks.ts             → typed useAppDispatch/useAppSelector
│   ├── api/
│   │   ├── apiSlice.ts       → root RTK Query slice, tagTypes defined
│   │   └── axiosBaseQuery.ts → custom baseQuery wrapping our Axios instance
│   └── slices/
│       └── uiSlice.ts        → example client-state slice
├── services/               → imperative Axios service wrappers (outside RTK Query)
├── hooks/                  → shared hooks (useDebounce example included)
├── providers/              → StoreProvider, ThemeProvider, combined Providers
├── lib/
│   ├── axios.ts             → Axios client + interceptors + refresh-token retry
│   └── utils.ts             → cn() helper
├── types/                  → shared TS types (ApiResponse envelope)
└── constants/               → env-driven config constants
```

## Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
```

## Run it yourself

```bash
npm install
npm run dev        # http://localhost:3000
npm run build       # production build
npm run start        # serve production build
npm run lint
npm run typecheck
npm run format       # auto-fix formatting
npm run format:check
```

## Next: Phase 2 — Design System

Will add: real typography/color decisions, full shadcn primitive set (Input, Card,
Badge, Table, Dialog, Drawer, Sidebar, Navbar, Footer, Breadcrumb, Skeleton, Empty
State, Error State), all dark-mode-aware and built on the CSS variable system already
wired in `globals.css`.
