import NewsSlugTemplate, { getNews } from "@/templates/NewsSlugTemplate";
import { promises as fs } from "fs";
import path from "path";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { title, description, date, image } = await getNews(slug);
  const vercel = process.env.VERCEL_URL ? true : false;
  const url = vercel ? "https://" + process.env.VERCEL_URL : "http://localhost:3000";
  return {
    title,
    description,
    alternates: { canonical: `/news/${slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      modifiedTime: date,
      url: url + "/news/" + slug,
      images: { height: 1080, width: 1920, url: url + "/" + image },
    },
  };
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "news");
  const filenames = await fs.readdir(postsDirectory);
  return filenames.map((filename) => ({
    slug: filename.replace(/\.md$/, ""),
  }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <NewsSlugTemplate slug={slug} locale="de" />;
}
