const defaultSection = "grammar";
export function getSection(path: string | undefined) {
  if (!path) return defaultSection;
  const [dir] = path.split("/", 1);
  if (!dir) return defaultSection;
  return (
    {
      listening: "listening",
    }[dir] ?? defaultSection
  );
}
