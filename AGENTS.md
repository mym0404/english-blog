# Agent Guide for english-blog

## Project Overview
- Personal English-study site built with Next.js and Fumadocs.
- User-authored source lives under `content/`; edit prose and MDX carefully.
- Obsidian content sync is part of normal operation. The live content roots are `content/blog`, `content/docs`, and `content/assets`.

## Tech Stack
- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Fumadocs, Zod, Biome.
- Package manager: `pnpm`.

## Project Structure
```text
content/                 # User-authored blog, docs, and embedded assets
src/app/                 # Next.js App Router pages, routes, and OG image routes
src/lib/source.ts        # Shared blog/docs source helpers
source.config.ts         # Fumadocs collections and MDX processing
scripts/                 # Local Obsidian/iCloud sync entrypoints
.agents/knowledge/       # Evergreen repo-local agent knowledge
```

## Runtime
- App routes start in `src/app/`.
- Content loading and blog/docs collection wiring start in `source.config.ts` and `src/lib/source.ts`.
- Local Obsidian and iCloud sync entrypoints are `scripts/sync.ts` and `scripts/sync-up.ts`.

## Verification
- Baseline type safety: `pnpm types:check`
- Baseline lint: `pnpm lint`
- Full repo-native verification: `pnpm run t`
- Blind spots: `pnpm run t` does not include `pnpm build`, there is no dedicated test runner, and content rendering plus sync behavior are not covered beyond typecheck/lint.

## Design System
- UI surface exists.
- Preserve the current split: animated home hero, content-first docs pages, and minimal blog index/post layouts.
- Prefer existing Fumadocs and Tailwind patterns over introducing a new visual system during routine work.
- Cover image and infographic requests expect one quick GPT image generation result posted in chat only.
- Do not create repository-side prompts, analysis files, copied sources, refs, SVGs, `cover-image/`, `infographic/`, or other generated visual artifacts unless the user explicitly asks to save assets.
- Do not present multiple generated-visual style options for routine requests; infer one suitable style from the content and project preferences, then generate it.

## Knowledge Router
- Evergreen repo knowledge lives under `.agents/knowledge`.
- Main routes:
  - Runtime and content flow: [`.agents/knowledge/runtime.md`](.agents/knowledge/runtime.md)
  - Verification and sync: [`.agents/knowledge/verification.md`](.agents/knowledge/verification.md)
  - Content and UI rules: [`.agents/knowledge/content-ui.md`](.agents/knowledge/content-ui.md)

## Knowledge System
- Root `AGENTS.md` is the repository router; `.agents/knowledge/*` stores evergreen repo-local details.
- Update `AGENTS.md` and the relevant `.agents/knowledge/*` document in the same change when project structure, runtime entrypoints, verification commands, ownership boundaries, or documented behavior changes.
- Repository knowledge describes the current state and must not be used by itself to reject intentional functional or structural changes.
