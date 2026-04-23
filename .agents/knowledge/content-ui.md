# Content And UI

## Content Rules
- Treat `content/` as user-authored material.
- Blog posts live in `content/blog`.
- Study notes live in `content/docs`.
- Embedded assets live in `content/assets`.
- If an asset filename changes, update every MDX reference that points to it.

## Blog Frontmatter
- Supported blog fields are `title`, `description`, `date`, `author`, `tags`, and optional `teaser`.
- `author` defaults to `MJ`.
- `teaser` is used in both the blog card UI and blog OG generation.
- Do not add new frontmatter keys without updating `source.config.ts`.

## Blog Images
- In-post images belong in `content/assets/images`.
- In-post references use Obsidian embed syntax such as `![[260203-january-2026-review-1.png]]`.
- `public/images` is for site-level assets, not ordinary post images.

## UI Rules
- Preserve the current home-page identity: animated terminal block, floating alphabet background, and small set of primary navigation actions.
- Preserve the current docs and blog bias toward readable content over decorative UI.
- Keep new UI changes aligned with the existing Fumadocs and Tailwind patterns unless the task is explicitly a redesign.
- Do not surface implementation instructions, sync mechanics, or agent-facing rules in visible UI copy.

## Infographic Notes
- Use the `baoyu-infographic` skill when a blog image should become an infographic or structured visual summary.
- For recent blog post collection, inspect `content/blog` directly.
- For monthly review style posts, check whether `bento-grid` fits before choosing a custom structure.
