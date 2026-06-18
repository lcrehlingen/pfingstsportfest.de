import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import Title from "@/components/Title";
import ContentContainer from "@/components/ContentContainer";
import NewsGrid from "@/app/(de)/news/NewsGrid";

/* metadata removed */ 
const oldMetadata = {
  title: "Aktuelles",
  description:
    "Berichte, Neuigkeiten und exklusive Ankündigungen rund um das Pfingstsportfest Rehlingen. Bleiben Sie immer auf dem neuesten Stand!",
  openGraph: {
    title: "Aktuelles",
    description:
      "Berichte, Neuigkeiten und exklusive Ankündigungen rund um das Pfingstsportfest Rehlingen. Bleiben Sie immer auf dem neuesten Stand!",
  }
};

import { Locale } from '@/i18n/get-dictionary';

interface NewsTemplateProps { locale: Locale; }

export default async function NewsTemplate({ locale }: NewsTemplateProps) {
  const news = await getNews();
  
  return (
    <ContentContainer>
      <div className="flex flex-col gap-2 text-center max-w-2xl mx-auto mb-4">
        <Title>{locale === 'de' ? 'Aktuelles' : 'News'}</Title>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">{locale === "de" ? "Berichte, Neuigkeiten und exklusive Ankündigungen rund um das Pfingstsportfest Rehlingen. Bleiben Sie immer auf dem neuesten Stand!" : "Reports, news, and exclusive announcements regarding the Pfingstsportfest Rehlingen. Stay up to date!"}</p>{/*
          */}
      </div>
      <NewsGrid news={news} />
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
