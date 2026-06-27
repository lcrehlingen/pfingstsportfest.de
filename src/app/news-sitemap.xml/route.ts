import { NextResponse } from "next/server";
import { getAllNews } from "@/utils/news";
import { getBaseUrl } from "@/utils/url";

export const dynamic = "force-static";

export async function GET() {
  const baseUrl = getBaseUrl("https://pfingstsportfest.de");

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">`;

  try {
    const news = await getAllNews();
    const articles = news.map((article) => ({
      slug: article.slug,
      title: article.title,
      date: article.date ? new Date(article.date) : new Date(),
    }));

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
