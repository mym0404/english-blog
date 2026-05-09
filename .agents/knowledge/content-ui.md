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
- Blog `teaser` frontmatter can point at a remote image URL and is used by blog cards and blog OG images.

## Generated Visuals
- Use `baoyu-cover-image` for article cover images and `baoyu-infographic` for infographics.
- Cover image and infographic requests expect exactly one quick direct GPT image generation result by default.
- Post generated cover images and infographics in chat only; do not leave repository artifacts unless the user explicitly asks to save or wire the image into the site.
- Do not create `cover-image/`, `infographic/`, prompt files, analysis files, structured-content files, copied source files, refs, SVGs, ImageMagick outputs, or other sidecar files for routine generated-visual requests.
- Do not present multiple style options for routine generated-visual requests; infer one suitable style from the content and project preferences, then generate it.
- Do not replace these requests with handcrafted SVG, ImageMagick or `magick` composition, HTML/CSS capture, or script-generated placeholder images unless the user explicitly asks for that workflow.
- If a generated visual must be kept in the site, store the accepted bitmap under `content/assets/images` and reference it from MDX or `teaser` frontmatter as needed.

## UI Rules
- Preserve the current home-page identity: animated terminal block, floating alphabet background, and small set of primary navigation actions.
- Preserve the current docs and blog bias toward readable content over decorative UI.
- Keep new UI changes aligned with the existing Fumadocs and Tailwind patterns unless the task is explicitly a redesign.
- Do not surface implementation instructions, sync mechanics, or agent-facing rules in visible UI copy.

## Infographic Notes
- For recent blog post collection, inspect `content/blog` directly.
- For monthly review style posts, check whether `bento-grid` fits before choosing a custom structure.
