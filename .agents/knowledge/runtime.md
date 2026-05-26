# Runtime

## Entry Points
- App Router code lives in `src/app`.
- Docs pages resolve through `src/app/docs/[[...slug]]/page.tsx`.
- Blog index and post pages resolve through `src/app/(home)/blog/page.tsx` and `src/app/(home)/blog/[slug]/page.tsx`.
- Shared content loaders live in `src/lib/source.ts`.

## Content Collections
- Docs collection root is `content/docs`.
- Blog collection root is `content/blog`.
- Blog collection wiring is defined in `source.config.ts`.
- Embedded assets live under `content/assets`, usually `content/assets/images`.

## Content Behavior
- Blog posts whose basename starts with `-` are hidden from the blog index and direct post routes.
- Blog and docs pages generate OG image URLs through `src/lib/source.ts` and the `src/app/og/**` routes.
- Obsidian-style wiki links, embeds, and callouts are supported through `remark-obsidian-mdx` in `source.config.ts`.
- Files under `content/assets` are served through `src/app/assets/[...path]/route.ts` at `/assets/...`.

## Sync Flow
- Local pull from Obsidian/iCloud into the repo runs through `scripts/sync.ts`.
- Local push from the repo back to Obsidian/iCloud runs through `scripts/sync-up.ts`.
- Local sync commands are exposed as `pnpm sync` and `pnpm sync:up`, but both run Bun scripts and depend on local `rsync`.
- Sync paths are rooted at the Obsidian vault top level: `blog/`, `docs/`, and `assets/`.
