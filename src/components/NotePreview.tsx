import defaultMdxComponents, { createRelativeLink } from "fumadocs-ui/mdx";

import { EmbeddingNotFound } from "@/components/EmbeddingNotFound";
import { blog, source } from "@/lib/source";

type NotePreviewProps = {
  resolvedUrl?: string;
  target?: string;
  alias?: string;
  depth?: number;
  trail?: string[];
};

const maxDepth = 2;

const normalizeResolvedUrl = (resolvedUrl: string) => {
  const [pathPart] = resolvedUrl.split("?");
  const [cleanPath] = pathPart.split("#");
  return cleanPath;
};

const toSlug = ({
  baseUrl,
  resolvedUrl,
}: {
  baseUrl: string;
  resolvedUrl: string;
}) => {
  if (!resolvedUrl.startsWith(baseUrl)) {
    return null;
  }

  let path = resolvedUrl.slice(baseUrl.length);
  if (path.startsWith("/")) {
    path = path.slice(1);
  }

  path = path.replace(/\.(md|mdx)$/i, "");
  if (path.endsWith("/index")) {
    path = path.slice(0, -"/index".length);
  }

  if (!path || path === "index") {
    return undefined;
  }

  return path.split("/");
};

const getPageFromResolvedUrl = (resolvedUrl?: string): any => {
  if (!resolvedUrl) {
    return null;
  }

  const cleanUrl = normalizeResolvedUrl(resolvedUrl);

  if (cleanUrl.startsWith("/docs")) {
    const slug = toSlug({ baseUrl: "/docs", resolvedUrl: cleanUrl });
    if (slug === null) {
      return null;
    }
    const page = source.getPage(slug);
    return page ? { page, loader: source } : null;
  }

  if (cleanUrl.startsWith("/blog")) {
    const slug = toSlug({ baseUrl: "/blog", resolvedUrl: cleanUrl });
    if (slug === null) {
      return null;
    }
    const page = blog.getPage(slug);
    return page ? { page, loader: blog } : null;
  }

  return null;
};

const getNodeKey = ({
  resolvedUrl,
  target,
}: {
  resolvedUrl?: string;
  target?: string;
}) => {
  const candidate = resolvedUrl ?? target;
  if (!candidate) {
    return null;
  }

  if (candidate.startsWith("/")) {
    return normalizeResolvedUrl(candidate);
  }

  return candidate;
};

const getFileLabel = ({ resolvedUrl, target }: { resolvedUrl?: string; target?: string }) => {
  const candidate = resolvedUrl ?? target;
  if (!candidate) {
    return null;
  }

  const normalized = candidate.startsWith("/") ? normalizeResolvedUrl(candidate) : candidate;
  const lastSegment = normalized.split("/").filter(Boolean).pop();
  if (!lastSegment) {
    return null;
  }

  return lastSegment.replace(/\.(md|mdx)$/i, "");
};

const toToggleId = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return `note-preview-${Math.abs(hash)}`;
};

const NotePreviewNotice = ({ title }: { title: string }) => {
  return (
    <div
      className={
        "relative overflow-hidden rounded-2xl border border-fd-border/70 bg-fd-background/60 px-5 py-4 text-left shadow-sm"
      }
    >
      <div
        className={
          "text-[11px] uppercase tracking-[0.35em] text-fd-muted-foreground"
        }
      >
        Note Preview
      </div>
      <div className={"mt-2 text-sm font-semibold text-fd-muted-foreground"}>
        {title}
      </div>
    </div>
  );
};

const NotePreview = ({
  resolvedUrl,
  target,
  alias,
  depth = 0,
  trail = [],
}: NotePreviewProps) => {
  const nodeKey = getNodeKey({ resolvedUrl, target });
  const hasCycle = nodeKey ? trail.includes(nodeKey) : false;
  const isBeyondLimit = depth > maxDepth;

  if (hasCycle) {
    return <NotePreviewNotice title={"Preview loop detected"} />;
  }

  if (isBeyondLimit) {
    return <NotePreviewNotice title={"Preview depth limit reached"} />;
  }

  const entry = getPageFromResolvedUrl(resolvedUrl);

  if (!entry) {
    return <EmbeddingNotFound target={target ?? resolvedUrl} kind={"note"} />;
  }

  const { page, loader } = entry;
  const MDX = page.data.body;
  const headingText = alias ?? page.data.title ?? target ?? "Note Preview";
  const fileLabel = getFileLabel({ resolvedUrl, target });
  const nextTrail = nodeKey ? [...trail, nodeKey] : trail;
  const nextDepth = depth + 1;
  const toggleId = toToggleId(
    `${resolvedUrl ?? ""}-${target ?? ""}-${alias ?? ""}-${trail.join("|")}-${depth}`,
  );
  const mdxComponents = {
    ...defaultMdxComponents,
    EmbeddingNotFound,
    NotePreview: (props: NotePreviewProps) => (
      <NotePreview {...props} depth={nextDepth} trail={nextTrail} />
    ),
    a: createRelativeLink(loader, page),
  };

  return (
    <div
      className={
        "my-8 relative overflow-hidden rounded-2xl border border-fd-border/70 bg-fd-background/60 shadow-sm"
      }
    >
      <div className={"relative"}>
        <input id={toggleId} type={"checkbox"} className={"peer sr-only"} />
        <div className={"px-5 pt-4"}>
          <div
            className={
              "text-[11px] uppercase tracking-[0.35em] text-fd-muted-foreground"
            }
          >
            Note Preview
          </div>
          <div className={"mt-2 flex items-baseline justify-between gap-4"}>
            <div className={"text-base font-semibold text-fd-foreground"}>
              {headingText}
            </div>
            {fileLabel ? (
              <div className={"text-[11px] uppercase tracking-[0.28em] text-fd-muted-foreground"}>
                {fileLabel}
              </div>
            ) : null}
          </div>
        </div>
        <div
          className={
            "relative px-5 pb-4 pt-3 min-h-[240px] max-h-[240px] overflow-hidden transition-[max-height] duration-300 ease-out peer-checked:max-h-none"
          }
        >
          <div className={"article text-sm text-fd-foreground"}>
            <MDX components={mdxComponents} />
          </div>
        </div>
        <div
          className={
            "pointer-events-none absolute inset-x-5 bottom-0 h-16 bg-gradient-to-b from-transparent via-fd-background/70 to-fd-background opacity-100 transition-opacity duration-300 peer-checked:opacity-0"
          }
        />
        <label
          htmlFor={toggleId}
          className={
            "flex cursor-pointer items-center justify-center gap-2 border-t border-fd-border/70 bg-fd-background/70 px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-fd-muted-foreground transition hover:text-fd-foreground peer-checked:[&_.more]:hidden peer-checked:[&_.close]:inline"
          }
        >
          <span className={"more"}>More</span>
          <span className={"close hidden"}>Close</span>
        </label>
      </div>
    </div>
  );
};

export { NotePreview };
