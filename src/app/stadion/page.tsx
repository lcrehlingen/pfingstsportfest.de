import ContentContainer from "@/components/ContentContainer";
import Title from "@/components/Title";
import StadionClient from "./StadionClient";

export const metadata = {
  title: "Virtueller Stadionrundgang (3D)",
  description:
    "Erkunden Sie das legendäre Bungertstadion Rehlingen in einer interaktiven 3D-Tour. Entdecken Sie die verschiedenen Wettkampfanlagen, Tribünen und historischen Stadionrekorde vor Ort.",
  openGraph: {
    title: "Virtueller Stadionrundgang (3D)",
    description:
      "Erkunden Sie das legendäre Bungertstadion Rehlingen in einer interaktiven 3D-Tour. Entdecken Sie die verschiedenen Wettkampfanlagen, Tribünen und historischen Stadionrekorde vor Ort.",
  },
};

export default function StadionPage() {
  return (
    <ContentContainer>
      {/* Intro Header */}
      <div className="flex flex-col gap-2.5 text-center max-w-2xl mx-auto mb-6">
        <Title>Bungertstadion (3D)</Title>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          Erkunden Sie die Wettkampfanlagen und die Infrastruktur des Bungertstadions Rehlingen in unserem interaktiven 3D-Rundgang. Klicken Sie auf die markierten Hotspots, um mehr über die Disziplinen und die jeweiligen Stadionrekorde zu erfahren.
        </p>
      </div>

      {/* 3D Client wrapper containing dynamic ThreeJS canvas */}
      <StadionClient />
    </ContentContainer>
  );
}
