import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import ContentContainer from "@/components/ContentContainer";
import Link from "next/link";
import ExportedImage from "next-image-export-optimizer";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { title, date, image, description } = await getNews(slug);
  const vercel = process.env.VERCEL_URL ? true : false;
  const url = vercel
    ? "https://" + process.env.VERCEL_URL
    : "http://localhost:3000";
  return {
    title,
    description,
    alternates: {
      canonical: `/news/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      modifiedTime: date,
      url: url + "/news/" + slug,
      images: {
        height: 1080,
        width: 1920,
        url: url + "/" + image,
      },
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: {
        height: 1080,
        width: 1920,
        url: url + "/" + image,
      }
    }
  };
}

export default async function NewsPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const { title, date, image, content } = await getNews(slug);

  return (
    <ContentContainer>
      <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full text-white">
        
        {/* Navigation Back Link */}
        <Link
          href="/news"
          className="group inline-flex items-center gap-1.5 text-sm font-bold text-gray-400 hover:text-white transition duration-300 max-w-fit"
        >
          <svg
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Zurück zu Aktuelles
        </Link>

        {/* Article Header block */}
        <header className="flex flex-col gap-4">
          {/* Metadata Badges row */}
          <div className="flex flex-wrap gap-2.5 items-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white/10 border border-white/5 text-gray-200">
              <svg
                className="h-3.5 w-3.5 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <time dateTime={date}>
                {new Date(date).toLocaleDateString("de-DE", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </time>
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-tourOrange/15 border border-tourOrange/20 text-tourLightOrange">
              🏆 Pressebericht
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-white/5 border border-white/5 text-gray-400">
              LC Rehlingen
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-wa-headline text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mt-1">
            {title}
          </h1>
        </header>

        {/* Featured Cover Image container */}
        {image && (
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/20 select-none">
            <ExportedImage
              src={`/` + image}
              width={1920}
              height={1080}
              alt={title}
              className="w-full h-full object-cover"
              preload
            />
          </div>
        )}

        {/* Prose Reading Card */}
        <article className="bg-white/5 border border-white/10 p-6 md:p-10 rounded-3xl backdrop-blur-xs shadow-xl">
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="prose prose-xl max-w-none prose-invert prose-headings:font-wa-headline prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-white prose-p:leading-8 prose-p:text-gray-300 prose-a:text-tourLightOrange hover:prose-a:text-white prose-a:transition prose-strong:text-white prose-ol:text-gray-300 prose-ul:text-gray-300 prose-li:text-gray-300 prose-hr:border-white/10 prose-blockquote:border-l-tourLightOrange prose-blockquote:text-gray-200"
          ></div>
        </article>

        {/* Bottom Back Button */}
        <div className="flex justify-center border-t border-white/5 pt-8 mt-4">
          <Link
            href="/news"
            className="group inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/5 hover:border-white/10 px-5 py-3 text-center text-sm font-bold text-white transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            Zurück zur Artikelübersicht
          </Link>
        </div>

      </div>
    </ContentContainer>
  );
}

async function getNews(slug: string) {
  const markdownWithMeta = await fs.readFile(
    path.join("news", slug + ".md"),
    "utf-8"
  );
  const matterResult = matter(markdownWithMeta);
  const content = await remark()
    .use(remarkGfm)
    .use(html)
    .process(matterResult.content);

  // Generate plain-text excerpt for metadata description
  const plainText = matterResult.content
    .replace(/[#*`_\[\]()\-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  const description = plainText.length > 155 ? plainText.substring(0, 155).trim() + "..." : plainText;

  return {
    slug,
    content: content.toString(),
    description,
    date: matterResult.data.date,
    title: matterResult.data.title,
    image: matterResult.data.image,
  };
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "news");
  const filenames = await fs.readdir(postsDirectory);
  return [
    ...filenames.map((filename) => ({
      slug: filename.replace(/\.md$/, ""),
    })),
  ];
}
