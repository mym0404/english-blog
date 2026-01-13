type EmbeddingNotFoundProps = {
  target?: string;
  kind?: string;
};

const EmbeddingNotFound = ({ target, kind }: EmbeddingNotFoundProps) => {
  return (
    <div
      className={
        "relative block overflow-hidden rounded-2xl border border-fd-border bg-fd-primary/5 px-5 py-4 text-left text-fd-foreground shadow-sm"
      }
    >
      <div
        className={
          "pointer-events-none absolute -top-10 left-10 h-24 w-24 rounded-full bg-fd-primary/20 blur-3xl"
        }
      />
      <div className={"relative flex flex-col gap-2"}>
        <div className={"text-[11px] uppercase tracking-[0.35em] text-fd-muted-foreground"}>
          Embed Not Found
        </div>
        <div className={"text-base font-semibold text-fd-foreground"}>
          Please check the link and try again.
        </div>
        <div className={"text-sm text-fd-muted-foreground"}>
          {target && <div>{target}</div>}
          {kind && <div className={"text-fd-muted-foreground"}>type: {kind}</div>}
        </div>
      </div>
    </div>
  );
};

export { EmbeddingNotFound };
