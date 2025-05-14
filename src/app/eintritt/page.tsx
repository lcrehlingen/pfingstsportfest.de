import ContentContainer from "@/components/ContentContainer";
import Title from "@/components/Title";

export const metadata = {
  title: "Eintritt",
  openGraph: {
    title: "Eintritt",
  }
};

export default function Ausschreibung() {
  return (
    <ContentContainer>
      <Title>Eintritt</Title>
      <article className="prose prose-xl max-w-max prose-table:tracking-wide">
        Eintrittskarten können an der Tageskasse am Stadioneingang erworben
        werden. Die Tageskasse öffnet um 14:00 Uhr.{" "}
        <ul>
          <li>Erwachsene: 15€</li>
          <li>Schüler und Jugendliche (12 bis 18 Jahre): 7€</li>
          <li>Schüler bis 11 Jahre: frei</li>
          <li>Schwerbehinderte (mit Ausweis): 7€</li>
          <li>Studenten (mit Ausweis): 7€</li>
          <li>Tribüne: 30€</li>

          <li>
            2 Erwachsene + 2 zahlungspflichtige Kinder: 35€ (jedes weitere
            eigene Kind frei)
          </li>
        </ul>
        <p>
          Der Einlass für Athleten, Trainer und Presse ist nur am{" "}
          <a
            href="https://goo.gl/maps/SedUyjtRP63Lo9mk9"
            target="_blank"
            rel="noreferrer"
          >
            Athleteneingang
          </a>{" "}
          möglich.
        </p>
      </article>
    </ContentContainer>
  );
}
