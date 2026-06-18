import eventRecordsM from "@/assets/records_m.json";
import eventRecordsW from "@/assets/records_w.json";
import ContentContainer from "@/components/ContentContainer";
import Title from "@/components/Title";
import RecordsTable from "@/app/(de)/rekorde/RecordsTable";

/* metadata removed */ 
const oldMetadata = {
  title: "Stadionrekorde",
  description:
    "Die historischen Meilensteine des Pfingstsportfests Rehlingen. Durchsuchen Sie alle offiziellen Stadionrekorde der Männer- und Frauen-Disziplinen im Bungertstadion.",
  openGraph: {
    title: "Stadionrekorde",
    description:
      "Die historischen Meilensteine des Pfingstsportfests Rehlingen. Durchsuchen Sie alle offiziellen Stadionrekorde der Männer- und Frauen-Disziplinen im Bungertstadion.",
  }
};


import { Locale } from '@/i18n/get-dictionary';

interface RekordeTemplateProps { locale: Locale; }

export default function RekordeTemplate({ locale }: RekordeTemplateProps) {
  return (
    <ContentContainer>
      <div className="flex flex-col gap-2 text-center max-w-2xl mx-auto mb-4">
        <Title>{locale === 'de' ? 'Stadionrekorde' : 'Stadium Records'}</Title>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">{locale === "de" ? "Die historischen Meilensteine des Pfingstsportfests Rehlingen. Durchsuchen Sie alle offiziellen Stadionrekorde der Männer- und Frauen-Disziplinen im Bungertstadion." : "The historical milestones of the Rehlingen Pfingstsportfest. Browse all official stadium records for both men and women events in the Bungert Stadium."}</p>{/*
          */}
      </div>
      <RecordsTable recordsM={eventRecordsM} recordsW={eventRecordsW} />
    </ContentContainer>
  );
}
