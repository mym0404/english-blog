# Agent Guide for english-blog

## Project Overview
- Personal English-study site built with Next.js and Fumadocs.
- User-authored source lives under `content/`; edit prose and MDX carefully.
- Obsidian content sync is part of normal operation. The live content roots are `content/blog`, `content/docs`, and `content/assets`.

## Tech Stack
- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Fumadocs, Zod, Biome.
- Package manager: `pnpm`.

## Runtime
- App routes start in `src/app/`.
- Content loading and blog/docs collection wiring start in `source.config.ts` and `src/lib/source.ts`.
- Obsidian and iCloud sync entrypoints are `scripts/sync.ts`, `scripts/sync-up.ts`, and `.github/workflows/sync.yml`.

## Verification
- Baseline type safety: `pnpm types:check`
- Baseline lint: `pnpm lint`
- Full repo-native verification: `pnpm run t`
- Blind spots: `pnpm run t` does not include `pnpm build`, there is no dedicated test runner, and content rendering plus sync behavior are not covered beyond typecheck/lint.

## Design System
- UI surface exists.
- Preserve the current split: animated home hero, content-first docs pages, and minimal blog index/post layouts.
- Prefer existing Fumadocs and Tailwind patterns over introducing a new visual system during routine work.
- Cover image and infographic requests expect direct GPT image generation for bitmap output; do not substitute SVG, ImageMagick, or hand-built composition workflows unless explicitly requested.

## Knowledge Router
- Evergreen repo knowledge lives under `.agents/knowledge`.
- Main routes:
  - Runtime and content flow: [`.agents/knowledge/runtime.md`](.agents/knowledge/runtime.md)
  - Verification and sync: [`.agents/knowledge/verification.md`](.agents/knowledge/verification.md)
  - Content and UI rules: [`.agents/knowledge/content-ui.md`](.agents/knowledge/content-ui.md)
