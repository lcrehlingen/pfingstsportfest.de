import { MetadataRoute } from "next";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const vercel = process.env.VERCEL_URL ? true : false;
  const baseUrl = vercel
    ? "https://" + process.env.VERCEL_URL
    : "https://pfingstsportfest.de";

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

  // Dynamic news routes
  let newsEntries: MetadataRoute.Sitemap = [];
  try {
    const newsDirectory = path.join(process.cwd(), "news");
    const filenames = await fs.readdir(newsDirectory);
    const mdFiles = filenames.filter((filename) => filename.endsWith(".md"));

    const dynamicNews = await Promise.all(
      mdFiles.map(async (filename) => {
        const slug = filename.replace(/\.md$/, "");
        const filePath = path.join(newsDirectory, filename);
        const fileContent = await fs.readFile(filePath, "utf8");
        const { data } = matter(fileContent);
        
        return {
          url: `${baseUrl}/news/${slug}`,
          lastModified: data.date ? new Date(data.date) : new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.6,
        };
      })
    );
    newsEntries = dynamicNews;
  } catch (error) {
    console.error("Failed to generate sitemap news entries:", error);
  }

  return [...staticEntries, ...newsEntries];
}
