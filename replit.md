# CoLab Nation

A cinematic, anime-styled, multi-page web experience for CoLab Nation —
"Build. Be Verified. Be Hired."

## Stack

- **React 19 + Vite 8** (TypeScript)
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Framer Motion** for page transitions, scroll reveals, and micro-interactions
- **GSAP** (already available, used sparingly for advanced effects)
- **React Router v6** for the multi-page experience

## Pages (`src/pages`)

| Route        | File           | Purpose                                                            |
| ------------ | -------------- | ------------------------------------------------------------------ |
| `/`          | `landing.tsx`  | Cinematic hero (video bg + corner stroke typography), story flow   |
| `/about`     | `about.tsx`    | Story-mode origin, founders, timeline                              |
| `/programs`  | `programs.tsx` | Season of Creation 2026 hero + countdown + program lineup grid     |
| `/projects`  | `projects.tsx` | Verified project drops gallery                                     |
| `/platform`  | `platform.tsx` | Six "powers" + animated profile preview                            |
| `/nation`    | `nation.tsx`   | Live missions, badges, community feed                              |
| `/join`      | `join.tsx`     | Gamified 4-step squad onboarding (POSTs to `/api/join`)            |
| `/admin`     | `admin.tsx`    | Hidden password-gated dashboard for submissions + email log        |

## Components

- `components/layout/` — `navbar.tsx`, `footer.tsx`, `page-shell.tsx`
- `components/intro/` — `opening-animation.tsx` (logo materialize + rocket launch)
- `components/sections/` — `hero.tsx`, `story-flow.tsx`, `stats.tsx`,
  `character-showcase.tsx`, `cta-banner.tsx`
- `components/ui/` — `button.tsx`, `particles.tsx` (StarField + ConfettiBurst),
  `animated-counter.tsx`, `floating-character.tsx`, `section-heading.tsx`

## Backend (Vite middleware)

`src/server/api-plugin.ts` — Express app mounted into Vite's dev + preview
servers. Persists JSON files under `.data/`:

- `submissions.json` — join-form payloads
- `outbox.json` — log of admin emails sent
- `sessions.json` — bearer-token sessions (8h TTL)

Endpoints:

- `POST /api/join` — public; appends to submissions
- `POST /api/admin/login` — body `{ password }`; returns `{ token, expires }`
- `POST /api/admin/logout`
- `GET /api/admin/me`
- `GET /api/admin/submissions` (auth)
- `DELETE /api/admin/submissions/:id` (auth)
- `POST /api/admin/email` (auth) — body `{ to, subject, body }`; logs to outbox
- `GET /api/admin/outbox` (auth)

Admin password defaults to `colab2026` and is overridable with the
`ADMIN_PASSWORD` env var. The admin UI opens a `mailto:` link prefilled with
the composed message in addition to logging the send.

## Characters, Scenes & Project Art

AI-generated anime art lives in `src/assets/`:

- `characters/builder.png`, `mentor.png`, `aibot.png`, `squad.png`, `rocket.png`
- `scenes/space-bg.png`, `problem.png`, `success.png`, `season-launch.png`
- `projects/project-{ai,open,design,robotics}.png`

Looping cinematic video backgrounds in `public/videos/hero-1..4.mp4` cycle
behind the hero (Nova-game inspired).

The brand logo lives at `attached_assets/45375_1777311860118.png` and is
imported via the `@assets` alias.

## Opening Animation

`OpeningAnimation` plays once per browser session (sessionStorage flag
`colab.intro.seen`). Sequence: logo materializes → wordmark fades in →
rocket launches off-screen → overlay dissolves into the landing page.
Skipped automatically on `/admin` and on URLs with `?nointro`.

## SEO

`index.html` ships full Open Graph + Twitter card meta, JSON-LD
`Organization` schema, theme color, and canonical URL.

## Aliases

- `@/*` → `src/*`
- `@assets/*` → `attached_assets/*`

## Workflow

`Start application` runs `npm run dev` (Vite on port 5000, all hosts allowed).

## Notes

- Dependencies installed with `--legacy-peer-deps` because of the eslint v10
  major upgrade in the original template.
- `tsconfig.app.json` exposes the path aliases. `tsconfig.node.json` includes
  `@types/node` for `vite.config.ts`.
