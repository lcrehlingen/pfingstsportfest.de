import ContentContainer from "@/components/ContentContainer";
import Title from "@/components/Title";
import { LIVE_RESULTS } from "@/utils/constants";
import { daysAway } from "@/utils/date";

export const metadata = {
  title: "Zeitplan",
  openGraph: {
    title: "Zeitplan",
  },
};
export default function Zeitplan() {
  return (
    <ContentContainer>
      <Title>Zeitplan</Title>
      <iframe src={LIVE_RESULTS} className="w-full" height={1000} />
    </ContentContainer>
  );
}
