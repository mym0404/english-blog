import {
  defineCollections,
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkObsidianMdx, { type PluginOptions } from "remark-obsidian-mdx";
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
    remarkPlugins: [
      [
        remarkObsidianMdx,
        {
          contentRoot: "./content",
          contentRootUrlPrefix: "",
          wikiLinkPathTransform: ({ resolvedUrl }) =>
            resolvedUrl?.replace("/content", ""),
          embedingPathTransform: ({ resolvedUrl }) =>
            resolvedUrl?.replace("/content", ""),
          embedRendering: {
            note: ({ resolvedUrl, target, alias }) => {
              const targetValue = target.page ?? target.value;
              const attributes: {
                type: "mdxJsxAttribute";
                name: string;
                value: string;
              }[] = [];

              if (resolvedUrl) {
                attributes.push({
                  type: "mdxJsxAttribute",
                  name: "resolvedUrl",
                  value: resolvedUrl,
                });
              }

              if (targetValue) {
                attributes.push({
                  type: "mdxJsxAttribute",
                  name: "target",
                  value: targetValue,
                });
              }

              if (alias) {
                attributes.push({
                  type: "mdxJsxAttribute",
                  name: "alias",
                  value: alias,
                });
              }

              return {
                type: "mdxJsxFlowElement",
                name: "NotePreview",
                attributes,
                children: [],
              };
            },
            notFound: ({ target, kind }) => {
              const targetValue = target.page ?? target.value;
              return {
                type: "mdxJsxFlowElement",
                name: "EmbeddingNotFound",
                attributes: [
                  {
                    type: "mdxJsxAttribute",
                    name: "target",
                    value: targetValue,
                  },
                  {
                    type: "mdxJsxAttribute",
                    name: "kind",
                    value: kind,
                  },
                ],
                children: [],
              };
            },
          },
        } satisfies PluginOptions,
      ],
      remarkMath,
    ],
    rehypePlugins: (v) => [rehypeKatex, ...v],
  },
});
