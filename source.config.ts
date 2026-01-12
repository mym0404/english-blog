import {
  defineCollections,
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkObsidianMdx from "remark-obsidian-mdx";
import { z } from "zod";

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema.extend({
      teaser: z.string().optional(),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export const blog = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: frontmatterSchema.extend({
    date: z.coerce.date().optional(),
    author: z.string().default("MJ"),
    tags: z.array(z.string()).optional(),
  }),
});

export default defineConfig({
  mdxOptions: {
    // MDX options
    remarkPlugins: [remarkObsidianMdx, remarkMath],
    rehypePlugins: (v) => [rehypeKatex, ...v],
  },
});
