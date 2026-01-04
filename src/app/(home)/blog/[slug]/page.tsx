import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blog } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";

export default async function BlogPost(props: PageProps<"/blog/[slug]">) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <main className={"mx-auto w-full max-w-3xl px-6 py-10"}>
      <Link
        href={"/blog"}
        className={
          "inline-flex items-center gap-2 text-sm text-fd-muted-foreground hover:text-fd-foreground mb-4"
        }
      >
        ← 블로그 목록으로
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
            {page.data.date.toLocaleDateString("ko-KR", {
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

      <article className={"prose prose-fd max-w-none"}>
        <MDX components={getMDXComponents({})} />
      </article>
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
  };
}
