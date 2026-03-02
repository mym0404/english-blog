import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blog, getBlogPageImage } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

export default async function BlogPost(props: PageProps<"/blog/[slug]">) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);
  if (!page || path.basename(page.path).charAt(0) === "-") notFound();

  const MDX = page.data.body;

  const sortedPosts = blog
    .getPages()
    .sort((a, b) => {
      const dateA = a.data.date ? a.data.date.getTime() : 0;
      const dateB = b.data.date ? b.data.date.getTime() : 0;
      return dateB - dateA;
    })
    .filter((p) => path.basename(p.path).charAt(0) !== "-");

  const currentIndex = sortedPosts.findIndex((p) => p.url === page.url);
  const newerPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const olderPost =
    currentIndex < sortedPosts.length - 1
      ? sortedPosts[currentIndex + 1]
      : null;

  return (
    <main className={"mx-auto w-full max-w-3xl px-6 py-10"}>
      <Link
        href={"/blog"}
        className={
          "inline-flex items-center gap-2 text-sm text-fd-muted-foreground hover:text-fd-foreground mb-4"
        }
      >
        ← Back to posts
      </Link>

      <h1 className={"text-4xl font-bold mb-4"}>{page.data.title}</h1>
      {page.data.description && (
        <p className={"text-lg text-fd-muted-foreground mb-4"}>
          {page.data.description}
        </p>
      )}

      <div
        className={
          "flex items-center gap-3 text-sm text-fd-muted-foreground mb-6"
        }
      >
        {page.data.date && (
          <time dateTime={page.data.date.toISOString()}>
            {page.data.date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}
        {page.data.author && (
          <>
            <span>·</span>
            <span>{page.data.author}</span>
          </>
        )}
      </div>

      {page.data.tags && page.data.tags.length > 0 && (
        <div className={"flex flex-wrap gap-2 mb-8"}>
          {page.data.tags.map((tag) => (
            <span
              key={tag}
              className={
                "px-3 py-1 text-xs rounded-full bg-fd-primary/10 text-fd-primary"
              }
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <article className={"prose prose-fd max-w-none article"}>
        <MDX components={getMDXComponents({})} />
      </article>

      {(olderPost || newerPost) && (
        <nav
          className={
            "grid grid-cols-2 gap-4 mt-16 pt-8 border-t border-fd-border"
          }
        >
          {olderPost ? (
            <Link
              href={olderPost.url}
              className={
                "group flex flex-col gap-2 rounded-xl border border-fd-border p-4 transition-all hover:border-fd-primary/30 hover:shadow-md"
              }
            >
              <span className={"text-xs text-fd-muted-foreground"}>
                ← Older
              </span>
              <span
                className={
                  "text-sm font-medium group-hover:text-fd-primary transition-colors line-clamp-2"
                }
              >
                {olderPost.data.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {newerPost ? (
            <Link
              href={newerPost.url}
              className={
                "group flex flex-col items-end gap-2 rounded-xl border border-fd-border p-4 transition-all hover:border-fd-primary/30 hover:shadow-md"
              }
            >
              <span className={"text-xs text-fd-muted-foreground"}>
                Newer →
              </span>
              <span
                className={
                  "text-sm font-medium text-right group-hover:text-fd-primary transition-colors line-clamp-2"
                }
              >
                {newerPost.data.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      )}
    </main>
  );
}

export async function generateStaticParams() {
  return blog.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const params = await props.params;
  const page = blog.getPage([params.slug]);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getBlogPageImage(page).url,
      title: page.data.title,
      description: page.data.description,
    },
  };
}
