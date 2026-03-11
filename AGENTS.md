# Agent Guide for english-blog
## Purpose
- This file guides agentic coding tools working in `/Users/user1/Desktop/mj/english-blog`.
- Prefer repository facts over assumptions.
- Treat `content/` as user-authored source material and edit it carefully.
## Project Snapshot
- Stack: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Fumadocs, Zod, Biome.
- Package manager: `pnpm`.
- Main code: `src/`.
- Main content: `content/blog`, `content/docs`, `content/assets`.
- MDX collection rules live in `source.config.ts`.
## Directory Map
- `src/app`: App Router pages, layouts, route handlers, OG image routes.
- `src/components`: reusable UI and MDX support components.
- `src/lib`: shared loaders, layout helpers, and content utilities.
- `content/blog`: blog posts in `.md` or `.mdx`.
- `content/docs`: study-note content.
- `content/assets`: embedded media and content templates.
- `content/assets/images`: blog/doc embedded images.
- `infographic/prompts`: checked-in infographic prompt files.
- `public/images`: site-level static images.
- `.baoyu-skills/baoyu-cover-image/EXTEND.md`: existing blog-image preference file.
## Commands
- Install: `pnpm install`
- Dev server: `pnpm dev`
- Build: `pnpm build`
- Start production server: `pnpm start`
- Type generation + typecheck: `pnpm types:check`
- Lint: `pnpm lint`
- Format: `pnpm format`
- Normal verification: `pnpm run t`
- Pull content from Obsidian: `pnpm sync`
- Push content back to Obsidian: `pnpm sync:up`
## Validation Details
- `pnpm types:check` runs `fumadocs-mdx && next typegen && tsc --noEmit`.
- `pnpm lint` runs `biome check`.
- `pnpm format` runs `biome format --write`.
- `pnpm run t` runs typecheck first, then lint.
- If you changed MDX schemas, loaders, OG routes, or typed app code, prefer `pnpm run t`.
## Focused File Checks
- Single-file lint: `pnpm exec biome check path/to/file.tsx`
- Single-file format: `pnpm exec biome format --write path/to/file.tsx`
- Targeted TS check is not separately scripted; use `pnpm types:check` when type safety matters.
- There is no single-test equivalent today.
## Tests
- There is currently no dedicated test suite.
- No `test` script exists in `package.json`.
- No `*.test.*`, `*.spec.*`, Vitest, Jest, or Playwright config was found.
- There is currently no supported single-test command.
- Do not invent one in documentation or status updates.
- For code validation today, use the narrowest real check available: `pnpm types:check`, `pnpm lint`, or `pnpm run t`.
- If a test runner is added later, update this file with exact full-suite and single-test commands.
## Formatting
- Biome is the formatter and linter; preserve its 2-space indentation.
- Use double quotes consistently.
- Keep imports organized; Biome has organize-imports enabled.
- Follow the surrounding file style before introducing a new pattern.
- Keep diffs focused and small.
## Imports
- Use `@/*` aliases for shared modules under `src` when helpful.
- Use relative imports for nearby route-local modules when that is already the local pattern.
- Use `import type` for type-only imports.
- Remove unused imports rather than leaving cleanup to later.
## TypeScript
- `tsconfig.json` uses `strict: true`; keep all changes type-safe.
- Do not use `any`, `as any`, `@ts-ignore`, or `@ts-expect-error`.
- Prefer inferred return types unless an explicit type improves clarity.
- Reuse existing Zod schemas and shared types instead of creating parallel shapes.
- Extend frontmatter rules in `source.config.ts` when adding new metadata.
- Narrow `unknown` values with guards instead of unsafe casts.
## Exports and Naming
- Use framework conventions: default exports are normal for `page.tsx` and `layout.tsx`.
- Prefer named exports in shared modules unless Next.js conventions require otherwise.
- Components use PascalCase filenames and PascalCase names.
- Helper modules commonly use lower-case file names.
- Blog post filenames follow `YYMMDD-slug.mdx` or `YYMMDD-slug.md`.
## React and Next.js Rules
- Keep route-specific logic in `src/app`.
- Keep reusable logic in `src/lib` or `src/components`.
- Prefer Server Components unless a client boundary is required.
- Use `notFound()` for missing content routes, matching the current codebase.
- Check existing `src/app/og/**` files before changing OG image behavior.
## Error Handling
- Do not leave empty `catch` blocks.
- Return explicit responses for expected route-handler failures.
- Use small type guards like `isErrorWithCode` when narrowing error values.
- Log recoverable external failures only when existing code already does so.
- Never delete or silently rewrite user content to hide an error.
## Content and MDX
- Blog and docs content are authored in `content/blog` and `content/docs`.
- Obsidian-style embeds, wiki links, and callouts are supported through `remark-obsidian-mdx`.
- Embedded assets belong in `content/assets`, usually `content/assets/images`.
- Content assets are served from `/assets/...` by `src/app/assets/[...path]/route.ts`.
- If you rename a content asset, update every MDX reference that points to it.
## Blog Frontmatter
- Supported blog fields: `title`, `description`, `date`, `author`, `tags`, and optional `teaser`.
- `author` defaults to `MJ`.
- `teaser` is an optional string field defined in `source.config.ts`; current posts usually use hosted image URLs.
- Existing posts usually use jsDelivr-hosted teaser URLs.
- Do not add new frontmatter keys without updating `source.config.ts`.
## Blog Images
- In-post images: store files under `content/assets/images/`.
- In-post references: use Obsidian embed syntax such as `![[260203-january-2026-review-1.png]]`.
- Teaser/cover images: set the hosted image URL in frontmatter `teaser:`.
- `teaser` is used both in the blog index card UI and OG image generation.
- `public/images` is for site assets, not normal post-embedded content images.
- `image-prompts.md` exists but is currently empty; do not assume it drives automation.
## Infographic Workflow
- Use the `baoyu-infographic` skill when a blog image should be an infographic or structured visual summary.
- Keep checked-in prompt sources in `infographic/prompts/`.
- Existing examples: `infographic/prompts/hollow-knight-beat.md`, `infographic/prompts/february-2026-review.md`.
- Follow the established prompt shape: image specs, core principles, layout guidelines, style guidelines, content blocks, and final text labels.
- The repo currently stores prompt files, not generated infographic outputs.
- For monthly reviews and other overview posts, start by checking whether `bento-grid` fits.
- For narrative posts, check `winding-roadmap` before inventing a new structure.
## Infographic Skill Options
- Base usage: `/baoyu-infographic path/to/content.md`
- Available flags: `--layout <layout>`, `--style <style>`, `--aspect landscape|portrait|square`, `--lang <language>`.
- Repo-aligned defaults from current examples/signals: English, `landscape` / `16:9`, and hand-drawn style direction.
- Layout suggestions by content shape: overview/monthly review -> `bento-grid`, journey/narrative -> `winding-roadmap`, metrics-heavy summary -> `dashboard`.
- Do not invent chart values that are not visible in the source content.
## Infographic EXTEND Policy
- Project infographic defaults now live in `.baoyu-skills/baoyu-infographic/EXTEND.md`.
- Current defaults are `preferred_layout: null`, `preferred_style: null`, `default_aspect: landscape`, and `language: en`.
- `null` for layout/style means agents should choose them to fit the article instead of forcing one default pair.
- If you want to change those defaults later, ask the user before editing the file.
## Sync Scripts
- `pnpm sync` and `pnpm sync:up` move only `docs/***`, `blog/***`, and `assets/***`.
- Be careful when moving files under `content/`; those paths participate in sync.
## Agent Rule Files
- This repo already has `AGENTS.md` and `CLAUDE.md`.
- No `.cursor/rules/`, `.cursorrules`, or `.github/copilot-instructions.md` were found.
- If those files appear later, fold their rules into this guide and note conflicts explicitly.
## Working Style for Agents
- Prefer surgical changes over broad refactors.
- Read related files before changing content schema, loaders, or OG behavior.
- Preserve user-authored prose unless rewriting is explicitly requested.
- Do not commit, push, or open a PR unless the user explicitly asks.
- Be explicit about what you verified and what you did not verify.
