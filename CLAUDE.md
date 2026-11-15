# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Next.js version warning

`AGENTS.md` states this is a Next.js version (16.4.5, React 19.3) with breaking changes from what you may know. Before writing code, read the relevant guide in `node_modules/next/dist/docs/` and heed deprecation notices.

## Commands

- `npm run dev` — start dev server (http://localhost:3000)
- `npm run build` / `npm start` — production build / serve
- `npm run lint` — ESLint (flat config in `eslint.config.mjs`, uses `eslint-config-next`)
- `npx eslint path/to/file.tsx` — lint a single file. `npx tsc --noEmit` type-checks (no script defined).
- No test framework is configured. `README.md` is unmodified create-next-app boilerplate.

## Architecture

A marketing/booking site for a Mirissa (Sri Lanka) fishing-trip business, built on the App Router with no `src/` dir. The `@/*` alias maps to the repo root. Routes: `/`, `/packages`, `/packages/[slug]`, `/booking`, `/contact`, `/about`, `/team`, `/faq`, `/gallery`, plus `robots.ts` and `sitemap.ts`.

**Content is data-driven, not hardcoded in pages.**
- `lib/site.ts` — single source of business config (name, contact details, social links, form endpoints) and `navItems`. Many values are still `TODO` placeholders; social links of `"#"` are hidden.
- `data/*.ts` (`packages`, `faqs`, `team`, `testimonials`, plus `rates`, `extras`, `species`, `whatToBring`, `packageTopics`) — typed content arrays (types in `types/index.ts`). Package list/cards/detail routes/booking selector all read from `data/packages.ts`; the `[slug]` page uses `generateStaticParams` over it. Much of this content is placeholder/sample text.
- `data/gallery.ts` is the exception: it reads `public/images` with `node:fs` at build time (images/videos, seeded shuffle via `SEED`), so dropping files into that folder updates `/gallery`. Videos play through `components/gallery/AutoPlayVideo.tsx`. Local media also lives in `public/{fish,team,videos}`.
- `lib/images.ts` — central registry of Unsplash image URLs. `next.config.ts` whitelists only `images.unsplash.com/photo-*` (query string intentionally unrestricted); any new remote host must be added there.

**Components** are grouped by feature (`components/home|booking|contact|layout|packages|team`) with shared primitives in `components/ui` (`Section`, `PageHero`, `Button`/`ButtonLink`, `Field`, `SafeImage`, `Reveal` via framer-motion, etc.). Only interactive pieces are client components (`BookingForm`, `ContactForm`, `Navbar`, `Accordion`, `Reveal`, `SafeImage`); pages stay server components. Use `cn()` from `lib/utils.ts` for class merging (a tiny join helper, not `tailwind-merge`).

**Forms** (`components/booking`, `components/contact`): validation lives in `lib/forms.ts`. Submission POSTs JSON to `NEXT_PUBLIC_BOOKING_ENDPOINT` / `NEXT_PUBLIC_CONTACT_ENDPOINT` (via `site.bookingEndpoint` / `site.contactEndpoint`); if unset, forms run in "local mode" and tell the visitor nothing was sent. `NEXT_PUBLIC_SITE_URL` sets `metadataBase`/sitemap URL.

**Next.js / tooling settings** in `next.config.ts` that affect how code must be written:
- `cacheComponents: true` and `partialPrefetching: true` — Cache Components/PPR model; check the bundled docs for rules on dynamic data access (e.g. awaiting `params`) and caching before adding data fetching.
- `experimental.agentFeedback: true`.
- `"use cache"` is already used in `components/layout/Footer.tsx`; follow that pattern for cached server components. Bundled docs live in `node_modules/next/dist/docs/01-app`.
- Tailwind CSS v4 is wired through a Turbopack rule (`@tailwindcss/turbopack` loader for `*.css`); styling is via `@import "tailwindcss"` and `@theme inline` tokens in `app/globals.css` (no `tailwind.config`). Custom palette tokens: `navy`, `ocean`, `turquoise`, `sand` (note: despite the names, they are green-toned). Headings use the Playfair display font; body uses Geist.
- Root layout and pages use the globally generated `LayoutProps<"/">` / `PageProps<"/packages/[slug]">` helpers rather than manual prop types.
