import Link from "next/link";
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import Title from "@/components/Title";
import ContentContainer from "@/components/ContentContainer";
import ExportedImage from "next-image-export-optimizer";

export const metadata = {
  title: "Aktuelles",
  openGraph: {
    title: "Aktuelles",
  }
};

export default async function News() {
  const news = await getNews();
  return (
    <ContentContainer>
      <Title>Aktuelles</Title>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {news.map((items, key) => (
          <article className="rounded-md bg-white" key={key}>
            <Link href={`news/${items.slug}`}>
              <div className="aspect-h-9 aspect-w-16">
                <ExportedImage
                  src={`/` + items.image}
                  width={1920}
                  height={1080}
                  alt={items.title}
                  className="w-full rounded-t-md"
                />
              </div>
              <div className="ml-4 flex flex-1 flex-col justify-between gap-4 py-4 ">
                <div className="flex items-center">
                  <span className="block text-sm text-gray-400">
                    {new Date(items.date).toLocaleDateString("de-DE", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric"
                    })}
                  </span>
                </div>
                <h3 className="font-wa-headline text-xl">{items.title}</h3>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </ContentContainer>
  );
}

async function getNews() {
  const postsDirectory = path.join(process.cwd(), "news");
  const filenames = await fs.readdir(postsDirectory);
  const allPostsData = filenames.map(async (fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = await fs.readFile(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      slug,
      date: matterResult.data.date,
      title: matterResult.data.title,
      image: matterResult.data.image,
    };
  });
  const news = await Promise.all(allPostsData);
  return news.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
