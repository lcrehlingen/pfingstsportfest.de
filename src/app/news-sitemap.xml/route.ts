import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

export const dynamic = "force-static";

export async function GET() {
  const vercel = process.env.VERCEL_URL ? true : false;
  const baseUrl = vercel
    ? "https://" + process.env.VERCEL_URL
    : "https://pfingstsportfest.de";

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">`;

  try {
    const newsDirectory = path.join(process.cwd(), "news");
    const filenames = await fs.readdir(newsDirectory);
    const mdFiles = filenames.filter((filename) => filename.endsWith(".md"));

    const articles = await Promise.all(
      mdFiles.map(async (filename) => {
        const slug = filename.replace(/\.md$/, "");
        const filePath = path.join(newsDirectory, filename);
        const fileContent = await fs.readFile(filePath, "utf8");
        const { data } = matter(fileContent);
        
        return {
          slug,
          title: data.title || "",
          date: data.date ? new Date(data.date) : new Date(),
        };
      })
    );

    // Sort by publication date descending (newest first)
    articles.sort((a, b) => b.date.getTime() - a.date.getTime());

    // Google News Sitemap rules: only include articles published in the last 2 days.
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    let newsArticles = articles.filter(
      (article) => article.date >= twoDaysAgo
    );

    // Smart Fallback: if no articles were published in the last 2 days (off-season),
    // include the top 5 most recent articles so the sitemap is functional and has content.
    if (newsArticles.length === 0) {
      newsArticles = articles.slice(0, 5);
    }

    newsArticles.forEach((article) => {
      const formattedDate = article.date.toISOString();
      xml += `
  <url>
    <loc>${baseUrl}/news/${article.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Pfingstsportfest Rehlingen</news:name>
        <news:language>de</news:language>
      </news:publication>
      <news:publication_date>${formattedDate}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
    </news:news>
  </url>`;
    });

  } catch (error) {
    console.error("Failed to generate Google News sitemap:", error);
  }

  xml += `
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "'": return "&apos;";
      case '"': return "&quot;";
      default: return c;
    }
  });
}
