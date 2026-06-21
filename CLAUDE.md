# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Community website for the Sitecore Sofia User Group — a Next.js 15 app deployed on Vercel. The site showcases upcoming events, past event archives with galleries, and community info.

## Commands

- `npm run dev` — start dev server with Turbopack (http://localhost:3000)
- `npm run build` — production build
- `npm run lint` — run Next.js linting

## Architecture

**Next.js App Router** with a mix of `.js` (legacy components) and `.tsx` (newer components). No test framework is configured.

### Data model

Events are defined as a static map in `app/data/events.ts` (keyed by slug). To add a new event, add an entry to the `events` object — no database or CMS involved.

Event gallery images are auto-discovered at build time from `public/events/<slug>/gallery/` by `app/utils/gallery.ts` (reads the filesystem with `fs.readdirSync`).

### Routing

- `/` — home page with hero, about section, upcoming event, and past event cards
- `/past-events` — event listing page
- `/past-events/[slug]` — dynamic event detail page with description, resources, and auto-discovered gallery

### Key conventions

- Tailwind CSS v4 via `@tailwindcss/postcss` (no `tailwind.config` file — uses CSS-based config)
- Path alias `@/*` maps to the project root
- Vercel Analytics is integrated in the root layout
- Brand color: Sitecore red `#E42325`
- Static event resources (presentations, images) go in `public/events/<slug>/`
