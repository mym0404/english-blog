import Link from "next/link";
import { blog } from "@/lib/source";

export default async function BlogIndex() {
  const posts = blog.getPages().sort((a, b) => {
    const dateA = a.data.date ? a.data.date.getTime() : 0;
    const dateB = b.data.date ? b.data.date.getTime() : 0;
    return dateB - dateA;
  });

  return (
    <main className={"mx-auto max-w-5xl px-6 py-10"}>
      <h1 className={"text-4xl font-bold mb-2"}>블로그</h1>
      <p className={"text-fd-muted-foreground mb-10"}>
        영작을 연습하고 영어 공부와 관련된 저의 발전을 공유합니다
      </p>

      <div className={"grid gap-6 md:grid-cols-2"}>
        {posts.map((post) => (
          <Link
            key={post.url}
            href={post.url}
            className={
              "block rounded-xl border border-fd-border p-6 transition-all hover:border-fd-primary hover:shadow-lg"
            }
          >
            <div
              className={
                "flex items-center gap-2 text-xs text-fd-muted-foreground mb-3"
              }
            >
              {post.data.date && (
                <time dateTime={post.data.date.toISOString()}>
                  {post.data.date.toLocaleDateString("ko-KR", {
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
          아직 작성된 글이 없습니다.
        </div>
      )}
    </main>
  );
}
