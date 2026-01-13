import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

import { EmbeddingNotFound } from "@/components/EmbeddingNotFound";
import { NotePreview } from "@/components/NotePreview";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    EmbeddingNotFound,
    NotePreview,
    ...components,
  };
}
