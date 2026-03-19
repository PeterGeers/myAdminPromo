import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://myadmin.jabaki.nl";

const locales = ["nl", "en"];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/pricing", "/privacy", "/terms"];

  return pages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === "" ? ("weekly" as const) : ("monthly" as const),
      priority: page === "" ? 1.0 : page === "/pricing" ? 0.9 : 0.5,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${siteUrl}/${l}${page}`])
        ),
      },
    }))
  );
}
