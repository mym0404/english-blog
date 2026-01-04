# Repository Guidelines

## Project Structure & Module Organization
- `src/app` contains Next.js App Router routes like `(home)`, `docs`, and `api`.
- `src/components` holds reusable React components with PascalCase filenames (example: `Terminal.tsx`).
- `src/lib` contains shared helpers and Fumadocs integration (`source.ts`, `layout.shared.tsx`).
- `content/docs` and `content/blog` store MDX content; collection rules live in `source.config.ts`.
- Static assets live in `public/`, and automation tasks live in `scripts/`.

## Build, Test, and Development Commands
- `pnpm dev`: run the local Next.js dev server.
- `pnpm build`: produce a production build.
- `pnpm start`: serve the production build.
- `pnpm lint`: run Biome checks.
- `pnpm format`: format code with Biome.
- `pnpm types:check`: run MDX generation, Next typegen, and `tsc --noEmit`.
- `pnpm run t`: shortcut for type check plus lint.
- `pnpm sync` / `pnpm sync:up`: run content sync scripts via Bun.

## Coding Style & Naming Conventions
- Use Biome formatting (2-space indentation) and follow existing directory boundaries.
- React components use `.tsx` and PascalCase filenames; utilities follow existing lower-case patterns.
- Keep route-specific code under `src/app` and shared UI in `src/components`.

## Testing Guidelines
- No dedicated test suite is present in the repository yet.
- For verification, run `pnpm t`; add tests alongside new modules if you introduce them (example: `MyFeature.test.ts`).

## Commit & Pull Request Guidelines
- Recent history follows Conventional Commit prefixes (example: `chore:`); use `feat:`, `fix:`, `docs:`, or `chore:` with concise summaries.
- PRs should include a short description, testing notes (`pnpm t` or manual steps), and screenshots for UI changes.
