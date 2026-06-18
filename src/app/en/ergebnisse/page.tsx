import ErgebnisseTemplate from "@/templates/ErgebnisseTemplate";

export const metadata = {
  title: "Results & Archive",
  description: "Results, live results, winner lists, and the historic result archive of the Pfingstsportfest.",
};

export default function Page() {
  return <ErgebnisseTemplate locale="en" />;
}
