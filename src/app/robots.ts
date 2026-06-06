import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const vercel = process.env.VERCEL_URL ? true : false;
  const baseUrl = vercel
    ? "https://" + process.env.VERCEL_URL
    : "https://pfingstsportfest.de";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/ergebnisse/live",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

