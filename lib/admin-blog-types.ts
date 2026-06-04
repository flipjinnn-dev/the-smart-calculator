export type BlogListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  authorName: string;
  categoryTitles: string[];
};

export function normalizeBlogs(raw: unknown): BlogListItem[] {
  if (!Array.isArray(raw)) return [];

  return raw
    .filter((b): b is Record<string, unknown> =>
      Boolean(b && typeof b === "object")
    )
    .map((b) => {
      const slugField = b.slug;
      const slug =
        typeof slugField === "string"
          ? slugField
          : slugField &&
              typeof slugField === "object" &&
              "current" in slugField &&
              typeof (slugField as { current: unknown }).current === "string"
            ? (slugField as { current: string }).current
            : "";

      const author = b.author as { name?: string } | null | undefined;
      const categories = Array.isArray(b.categories) ? b.categories : [];

      return {
        _id: String(b._id ?? ""),
        title: String(b.title ?? "Untitled"),
        slug,
        excerpt: String(b.excerpt ?? ""),
        publishedAt: String(b.publishedAt ?? new Date().toISOString()),
        authorName: author?.name || "Unknown",
        categoryTitles: categories
          .map((c) =>
            c && typeof c === "object" && "title" in c
              ? String((c as { title: unknown }).title ?? "")
              : ""
          )
          .filter(Boolean),
      };
    })
    .filter((b) => b._id);
}
