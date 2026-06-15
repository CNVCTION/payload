# AGENTS.md — Payload CMS Ecommerce

## Commands

```bash
pnpm dev                   # Start dev server (defaults to :3000; use -p N if port busy)
pnpm build                 # Production build
pnpm lint                  # ESLint
pnpm test:int              # Vitest unit/integration tests (tests/int/)
pnpm test:e2e              # Playwright E2E (tests/e2e/; expects dev server on :3000)
pnpm test                  # Both test suites
pnpm generate:types        # Regenerate src/payload-types.ts from schema
pnpm generate:importmap    # Regenerate admin panel import map
```

## Schema changes workflow

After editing collections, globals, or plugins, run both:
1. `pnpm generate:types` → regenerates `src/payload-types.ts`
2. `pnpm generate:importmap` → regenerates `src/app/(payload)/admin/importMap.js`

Both files are generated and committed. ESLint ignores `payload-types.ts`.

## Architecture

Single Next.js app: the frontend store and admin panel/API share one process.

| Route group | Purpose |
|---|---|
| `src/app/(app)/` | Customer storefront (shop, products, cart, checkout, account) |
| `src/app/(payload)/` | Admin panel + REST/GraphQL API |

- **DB**: SQLite via `@payloadcms/db-sqlite`. File at `DATABASE_URL` (default `file:./payload.db`). No external DB needed. The `.db` file is gitignored.
- **Collections** defined in `src/collections/`, registered in `src/payload.config.ts`.
- **The ecommerce plugin** (`@payloadcms/plugin-ecommerce`) auto-registers `products`, `orders`, `carts`, `transactions`, `addresses`, `variants`, `variantOptions`, `variantTypes`. Only `Users`, `Pages`, `Categories`, `Media` are in the collections array.
- **Products** uses a `CollectionOverride` pattern via `src/collections/Products/index.ts` — extends the ecommerce plugin's default product collection with sports-card fields.
- **Globals**: `Header` and `Footer` stored in DB, editable via admin.
- **Plugins**: SEO + Form Builder + Ecommerce (Stripe) configured in `src/plugins/index.ts`.

## Path aliases (tsconfig paths)

```
@/*              → ./src/*
@payload-config  → ./src/payload.config.ts
@/payload-types  → ./src/payload-types.ts
```

## Quirks and gotchas

- **Port 3000 is often taken** on this host (Linkwarden, mdreader, repo). Pass `-p 4001` or another free port.
- **`pnpm approve-builds`** may be needed on first install for `sharp`, `esbuild`, `unrs-resolver`.
- **`turbopackServerFastRefresh`** warning on startup is harmless — Next.js Turbopack lacks this experimental feature.
- **Seed data** is generic (hats, t-shirts), not sports cards. Trigger via admin dashboard "Seed" button or POST `/next/seed` as admin.
- **Stripe** webhook CLI: `pnpm stripe-webhooks`. Real Stripe keys go in `.env`.
- **`.env`** is gitignored; `.env.example` is the template.
- **No typecheck command** exists (no `tsc --noEmit`); lint is the primary static check.
