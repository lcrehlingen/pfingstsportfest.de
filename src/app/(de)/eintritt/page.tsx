import EintrittTemplate from "@/templates/EintrittTemplate";

export const metadata = {
  title: "Eintritt & Tickets",
  description: "Sichern Sie sich Ihre Tickets für das Pfingstsportfest in Rehlingen.",
};

export default function Page() {
  return <EintrittTemplate locale="de" />;
}
