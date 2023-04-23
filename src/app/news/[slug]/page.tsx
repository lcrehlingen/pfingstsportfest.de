import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import Title from "@/components/Title";
import ContentContainer from "@/components/ContentContainer";
import { Metadata } from "next";

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { title, date, image } = await getNews(params.slug);
  const vercel = process.env.VERCEL_URL ? true : false;
  const url = vercel
    ? "https://" + process.env.VERCEL_URL
    : "http://localhost:3000";
  return {
    title,
    description: null,
    openGraph: {
      title,
      type: "article",
      modifiedTime: date,
      images: {
        height: 1080,
        width: 1920,
        url: url + "/" + image,
      },
    },
    twitter: {
      card: "summary_large_image",
      title,
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
}: {
  params: { slug: string };
}) {
  const { title, date, content } = await getNews(params.slug);
  return (
    <ContentContainer>
      <article className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Title center={false}>{title}</Title>
          <p className="text-xl text-white ">
            <time dateTime={date}>
              {new Date(date).toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </time>
          </p>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="prose prose-xl max-w-none prose-p:leading-7 prose-table:tracking-wide"
        ></div>
      </article>
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
  return {
    slug,
    content: content.toString(),
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
