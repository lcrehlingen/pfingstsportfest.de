import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import ContentContainer from "@/components/ContentContainer";
import Link from "next/link";
import ExportedImage from "next-image-export-optimizer";
import { Locale } from "@/i18n/get-dictionary";

interface NewsSlugTemplateProps {
  slug: string;
  locale: Locale;
}

export default async function NewsSlugTemplate({ slug, locale }: NewsSlugTemplateProps) {
  const { title, date, image, content, photographer } = await getNews(slug);

  const vercel = process.env.VERCEL_URL ? true : false;
  const baseUrl = vercel
    ? "https://" + process.env.VERCEL_URL
    : "https://pfingstsportfest.de";

  return (
    <ContentContainer>
      <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full text-white">
        
        {/* Navigation Back Link */}
        <Link
          href={locale === "de" ? "/news" : "/en/news"}
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
          {locale === "de" ? "Zurück zu Aktuelles" : "Back to News"}
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
              {locale === "de" ? "🏆 Pressebericht" : "🏆 Press Report"}
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
            {photographer && (
              <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-medium text-gray-300 flex items-center gap-1.5 shadow-lg select-none">
                <svg
                  className="h-3.5 w-3.5 text-gray-400 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316A2.192 2.192 0 0 0 14.512 4H9.488c-.699 0-1.332.332-1.745.898L6.827 6.175ZM15 13.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <span>{locale === "de" ? "Foto: " : "Photo: "}{photographer}</span>
              </div>
            )}
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
            href={locale === "de" ? "/news" : "/en/news"}
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
            {locale === "de" ? "Zurück zur Artikelübersicht" : "Back to news overview"}
          </Link>
        </div>

      </div>
    </ContentContainer>
  );
}

export async function getNews(slug: string) {
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
    photographer: matterResult.data.photographer || null,
  };
}
