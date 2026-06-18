import NewsTemplate from "@/templates/NewsTemplate";

export const metadata = {
  title: "Latest News",
  description: "Reports, news, and exclusive announcements regarding the Pfingstsportfest Rehlingen.",
};

export default function Page() {
  return <NewsTemplate locale="en" />;
}
