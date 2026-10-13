import type { MetadataRoute } from "next";
import { getAllContentPaths, CONTENT_TYPES } from "@/lib/content";
import { routing } from "@/i18n/routing";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://projectrasengan.lol").replace(/\/$/, "");

function alternatesFor(pathname: string) {
  return {
    languages: Object.fromEntries(
      routing.locales.map((l) => [l, `${siteUrl}/${l}${pathname}`])
    ),
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const localePaths = routing.locales.flatMap((locale) =>
    ["", ...CONTENT_TYPES].map((p) => ({
      url: `${siteUrl}/${locale}${p ? `/${p}` : ""}`,
      changeFrequency: "weekly" as const,
      priority: p ? 0.7 : 1,
      alternates: alternatesFor(p ? `/${p}` : ""),
    }))
  );

  const contentPaths = (
    await Promise.all(
      routing.locales.map(async (locale) =>
        (await getAllContentPaths(locale)).map(({ contentType, slug }) => {
          const pathname = `/${contentType}/${slug.join("/")}`;
          return {
            url: `${siteUrl}/${locale}${pathname}`,
            changeFrequency: "weekly" as const,
            priority: 0.8,
            alternates: alternatesFor(pathname),
          };
        })
      )
    )
  ).flat();

  return [...localePaths, ...contentPaths];
}
