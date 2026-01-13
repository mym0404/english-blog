import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

import { EmbeddingNotFound } from "@/components/EmbeddingNotFound";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    EmbeddingNotFound,
    ...components,
  };
}
