import { MetadataRoute } from "next";
import { getBaseUrl } from "@/utils/url";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl("https://pfingstsportfest.de");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/ergebnisse/live",
      ],
    },
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/news-sitemap.xml`,
    ],
  };
}
