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
          callout: {
            componentName: "Callout",
            typePropName: "type",
            defaultType: "info",
            typeMap: {
              note: "info",
              abstract: "info",
              summary: "info",
              tldr: "info",
              info: "info",
              todo: "info",
              quote: "info",
              tip: "idea",
              hint: "idea",
              example: "idea",
              question: "idea",
              warn: "warn",
              warning: "warn",
              caution: "warn",
              attention: "warn",
              danger: "error",
              error: "error",
              fail: "error",
              failure: "error",
              bug: "error",
              success: "success",
              done: "success",
              check: "success",
            },
          },
          embedRendering: {
            note: ({ target }) => ({
              type: "mdxJsxFlowElement",
              name: "EmbedNote",
              attributes: [
                { type: "mdxJsxAttribute", name: "page", value: target.page },
                {
                  type: "mdxJsxAttribute",
                  name: "anchor",
                  value: target.anchor,
                },
                {
                  type: "mdxJsxAttribute",
                  name: "anchorType",
                  value: target.anchorType,
                },
              ],
              children: [],
            }),
            // image: ({
            //   target,
            //   imageWidth,
            //   imageHeight,
            //   resolvedUrlWithExtension,
            // }) => ({
            //   type: "mdxJsxFlowElement",
            //   name: "Image",
            //   attributes: [
            //     {
            //       type: "mdxJsxAttribute",
            //       name: "src",
            //       value: resolvedUrlWithExtension ?? target.page,
            //     },
            //     { type: "mdxJsxAttribute", name: "alt", value: target.page },
            //     {
            //       type: "mdxJsxAttribute",
            //       name: "width",
            //       value: imageWidth ?? 640,
            //     },
            //     {
            //       type: "mdxJsxAttribute",
            //       name: "height",
            //       value: imageHeight ?? 480,
            //     },
            //   ],
            //   children: [],
            // }),
            video: ({ target }) => ({
              type: "mdxJsxFlowElement",
              name: "EmbedVideo",
              attributes: [
                { type: "mdxJsxAttribute", name: "src", value: target.page },
              ],
              children: [],
            }),
          },
        } satisfies PluginOptions,
      ],
      remarkMath,
    ],
    rehypePlugins: (v) => [rehypeKatex, ...v],
  },
});
