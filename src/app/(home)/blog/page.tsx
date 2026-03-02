import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { blog } from "@/lib/source";

export default async function BlogIndex() {
  const posts = blog
    .getPages()
    .sort((a, b) => {
      const dateA = a.data.date ? a.data.date.getTime() : 0;
      const dateB = b.data.date ? b.data.date.getTime() : 0;
      return dateB - dateA;
    })
    .filter((b) => path.basename(b.path).charAt(0) !== "-");

  return (
    <main className={"mx-auto max-w-5xl px-6 py-10"}>
      <h1 className={"text-4xl font-bold mb-2"}>Blog</h1>
      <p className={"text-fd-muted-foreground mb-10"}>
        A space for practicing English writing and sharing my advancement
      </p>

      <div className={"grid gap-6 md:grid-cols-2"}>
        {posts.map((post) => (
          <Link
            key={post.url}
            href={post.url}
            className={
              "relative overflow-hidden block rounded-xl border border-fd-border p-6 transition-all hover:border-fd-primary/30 hover:dark:drop-shadow hover:dark:drop-shadow-white/20 hover:shadow-lg"
            }
          >
            {post.data.teaser && (
              <div
                className={
                  "absolute bottom-0 right-0 w-48 h-27 pointer-events-none"
                }
                style={{
                  maskImage:
                    "linear-gradient(to top left, rgba(0,0,0,0.55) 0%, transparent 70%)",
                  WebkitMaskImage:
                    "linear-gradient(to top left, rgba(0,0,0,0.55) 0%, transparent 70%)",
                }}
              >
                <Image
                  src={post.data.teaser}
                  alt={""}
                  fill
                  sizes={"192px"}
                  className={"object-cover"}
                />
              </div>
            )}
            <div
              className={
                "flex items-center gap-2 text-xs text-fd-muted-foreground mb-3"
              }
            >
              {post.data.date && (
                <time dateTime={post.data.date.toISOString()}>
                  {post.data.date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              )}
              {post.data.author && (
                <>
                  <span>·</span>
                  <span>{post.data.author}</span>
                </>
              )}
            </div>

            <h2 className={"text-xl font-semibold mb-2"}>{post.data.title}</h2>
            <p className={"text-sm text-fd-muted-foreground line-clamp-2"}>
              {post.data.description}
            </p>

            {post.data.tags && post.data.tags.length > 0 && (
              <div className={"flex flex-wrap gap-2 mt-4"}>
                {post.data.tags.map((tag) => (
                  <span
                    key={tag}
                    className={
                      "px-2 py-1 text-xs rounded-md bg-fd-primary/10 text-fd-primary"
                    }
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <div className={"text-center py-20 text-fd-muted-foreground"}>
          There is no post yet.
        </div>
      )}
    </main>
  );
}
