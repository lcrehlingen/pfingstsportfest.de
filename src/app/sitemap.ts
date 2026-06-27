import { MetadataRoute } from "next";
import { getAllNews } from "@/utils/news";
import { getBaseUrl } from "@/utils/url";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl("https://pfingstsportfest.de");

  // Static routes
  const staticRoutes = [
    "",
    "/ausschreibung",
    "/eintritt",
    "/ergebnisse",
    "/news",
    "/presse",
    "/rekorde",
    "/zeitplan",
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic news routes fetched via centralized service
  let newsEntries: MetadataRoute.Sitemap = [];
  try {
    const news = await getAllNews();
    newsEntries = news.map((article) => ({
      url: `${baseUrl}/news/${article.slug}`,
      lastModified: article.date ? new Date(article.date) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Failed to generate sitemap news entries:", error);
  }

  return [...staticEntries, ...newsEntries];
}
