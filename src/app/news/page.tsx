import ContentContainer from "@/components/ContentContainer";
import NewsGrid from "./NewsGrid";
import { getAllNews } from "@/utils/news";
import { constructMetadata } from "@/utils/seo";
import PageHeader from "@/components/PageHeader";

export const metadata = constructMetadata({
  title: "Aktuelles",
  description:
    "Berichte, Neuigkeiten und exklusive Ankündigungen rund um das Pfingstsportfest Rehlingen. Bleiben Sie immer auf dem neuesten Stand!",
  path: "/news",
});

export default async function NewsPage() {
  const news = await getAllNews();
  
  return (
    <ContentContainer>
      <PageHeader
        title="Aktuelles"
        description="Berichte, Neuigkeiten und exklusive Ankündigungen rund um das Pfingstsportfest Rehlingen. Bleiben Sie immer auf dem neuesten Stand!"
        className="mb-4"
      />
      <NewsGrid news={news} />
    </ContentContainer>
  );
}
