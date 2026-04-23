# Verification

## Repo-Native Commands
- `pnpm types:check`: runs `fumadocs-mdx && next typegen && tsc --noEmit`
- `pnpm lint`: runs `biome check`
- `pnpm format`: runs `biome format --write`
- `pnpm run t`: runs `pnpm run types:check && pnpm run lint`

## How To Choose
- Use `pnpm types:check` when changing typed app code, loaders, route handlers, MDX collection wiring, or frontmatter schemas.
- Use `pnpm lint` for focused code-quality validation when type-level impact is unlikely.
- Use `pnpm run t` for the normal full pass after meaningful code or schema changes.
- Use `pnpm exec biome check <path>` or `pnpm exec biome format --write <path>` for narrow file-level checks.

## Blind Spots
- There is no dedicated test runner or single-test command.
- Content rendering correctness is not fully validated by the scripted checks.
- Obsidian/iCloud sync behavior is operationally important but not covered by automated tests.
- Local sync commands also depend on Bun and `rsync`, so failures there are not necessarily repo logic regressions.
- Asset references inside MDX still need manual care when renaming files.

## Manual Checks
- After changing content paths or sync behavior, confirm both repo paths and Obsidian vault paths match the expected `blog/`, `docs/`, and `assets/` layout.
- After changing blog listing or blog routing logic, verify that normal posts appear and dash-prefixed drafts remain hidden.
