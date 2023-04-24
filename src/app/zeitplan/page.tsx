import ContentContainer from "@/components/ContentContainer";
import Title from "@/components/Title";

export const metadata = {
  title: "Zeitplan",
  openGraph: {
    title: "Zeitplan",
  }
};
export default function Zeitplan() {
  return (
    <ContentContainer>
      <Title>Zeitplan</Title>
      <article className="prose prose-xl max-w-none prose-table:tracking-wide">
        <p className="text-center">
          Der Zeitplan wird in Kürze veröffentlicht.
        </p>
      </article>
    </ContentContainer>
  );
}
