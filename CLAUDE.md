# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Community website for the Sitecore Sofia User Group — a Next.js 16 (App Router) app deployed on Vercel. The site showcases upcoming events, past event archives with galleries, and community info.

## Commands

- `npm run dev` — start dev server with Turbopack (http://localhost:3000)
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run Next.js linting

No test framework is configured — there is no `npm test` and no test files.

## Architecture

**Next.js App Router** with a mix of `.js` (legacy components: `header.js`, `footer.js`, `hero.js`, `about-box.js`) and `.tsx` (newer components: `EventCard`, `EventCardList`, `event-hero`, `StatsStrip`, `ImageGallery`, `CookieConsentBanner`). Prefer `.tsx` for new components.

### Data model

Events are defined as a static map in `app/data/events.ts` (`EventMap`, keyed by slug — e.g. `"june-2026"`). Each `Event` has `id`, `title`, `date` (a human-readable string parsed via `new Date()` for sorting — keep it Date-parseable), `location`, `thumbnail`/`coverImage` paths, `shortDescription`/`description`, and a `resources[]` list (title/url/icon) for links like recordings or slide decks. To add a new event, add an entry to the `events` object — no database or CMS involved.

Event gallery images are auto-discovered at build time from `public/events/<slug>/gallery/` by `app/utils/gallery.ts` (reads the filesystem with `fs.readdirSync`, filters to jpg/jpeg/png/webp). If a `gallery/` folder doesn't exist for a slug, it returns an empty array rather than throwing.

`location === "Online"` (case-insensitive) drives an "Online" vs "In-Person" badge on `EventCard`.

Blog posts are Markdown files with frontmatter under `content/blogs/<slug>.md`, parsed at build/request time by `app/utils/blogs.ts` (via `gray-matter`) and rendered with `react-markdown` + `remark-gfm`. Filenames starting with `_` (e.g. `_TEMPLATE.md`) are skipped by the loader. A post's `author` frontmatter field is matched by name against `members` in `app/data/community.ts` to pull in a headshot/LinkedIn link; unmatched names fall back to initials. Colleagues publish by copying `content/blogs/_TEMPLATE.md` and opening a PR — there is no CMS, login, or upload UI.

### Routing

- `/` — home page: `Hero` → `About` → `StatsStrip` → `EventHero` (single featured/upcoming event) → `EventCardList` (past events grid, built from `app/data/events.ts`) → `CookieConsentBanner`
- `/past-events` — full event listing, sorted by date descending
- `/past-events/[slug]` — dynamic event detail page with description, resources, and auto-discovered gallery
- `/blogs` — blog listing, sourced from `content/blogs/*.md`, sorted by date descending
- `/blogs/[slug]` — blog post detail page, Markdown body rendered as HTML
- `/community` — community info page
- `/materials` — materials page

### Key conventions

- Tailwind CSS v4 via `@tailwindcss/postcss` (no `tailwind.config` file — uses CSS-based config); `@tailwindcss/typography` is registered via `@plugin` in `app/globals.css` for the `prose` classes used on long-form content (event/blog descriptions)
- Path alias `@/*` maps to the project root
- Vercel Analytics is integrated in the root layout
- Brand color: Sitecore red `#E42325`
- Scroll-in animations use per-component `IntersectionObserver` hooks (see `EventCardList.tsx` and `app/hooks/useInView.ts`) rather than an animation library
- Static event resources (presentations, images) go in `public/events/<slug>/`; images meant for the auto-discovered gallery must live in `public/events/<slug>/gallery/`
- Site metadata (OpenGraph/Twitter cards, `metadataBase`) is centralized in `app/layout.tsx`
