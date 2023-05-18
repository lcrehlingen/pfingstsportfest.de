import ContentContainer from "@/components/ContentContainer";
import Title from "@/components/Title";

export const metadata = {
  title: "Ausschreibung",
  openGraph: {
    title: "Ausschreibung",
  },
};
export default function Ausschreibung() {
  return (
    <ContentContainer>
      <Title>Ausschreibung</Title>
      <article className="prose prose-xl max-w-max  prose-table:tracking-wide">
        <p>
          Seit 2023 gehört das Pfingstsportfest zur World Athletics Continental
          Tour und wird als <strong>Silver Level Meeting</strong> der
          Leichtathletik weltweit gelistet.
        </p>
        <ul>
          <li>Datum: 28.05.2023</li>
          <li>
            Mail:{" "}
            <a href="mailto:pfingstsportfest@lcrehlingen.de">
              pfingstsportfest@lcrehlingen.de
            </a>
          </li>
          <li>
            Athletenverpflichtung:{" "}
            <a href="mailto:pfingstsportfest@lcrehlingen.de">
              Werner Klein, Ann-Cathrine Klein, Niklas Marion
            </a>
          </li>
          <li>
            Meeting-Direktor: <a href="tel:+491715463788">Werner Klein</a>
          </li>
          <li>
            Sponsoring: <a href="tel:+491712772230">Thomas Klein</a>
          </li>
        </ul>
        <h2>Callroom</h2>
        <ul>
          <li>15 min vor Start -Nachwuchsläufe</li>
          <li>20 min vor Start -Lauf</li>
          <li>40 min vor Start- Wurf/Hochsprung</li>
          <li>90 min vor Stabhochsprung</li>
        </ul>
        <h2>Athleteneingang</h2>
        <p>
          Der Athleteneingang befindet sich hinter der Kultur-und Sporthalle:{" "}
          <a
            href="https://goo.gl/maps/SedUyjtRP63Lo9mk9"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Maps
          </a>
        </p>

        <h2>Hauptprogramm</h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Altersklasse</th>
                <th>Wettbewerb</th>
                <th>Qualifikation</th>
                <th>Preiskategorie</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Männer</td>
                <td>100m</td>
                <td>10,60</td>
                <td>A</td>
              </tr>
              <tr>
                <td></td>
                <td>800m</td>
                <td>1:49,50</td>
                <td>B</td>
              </tr>
              <tr>
                <td></td>
                <td>1500m</td>
                <td>3:45,00</td>
                <td>A</td>
              </tr>
              <tr>
                <td></td>
                <td>400m Hürden</td>
                <td>50,50</td>
                <td>B</td>
              </tr>
              <tr>
                <td></td>
                <td>3000m Hindernis</td>
                <td>8:35,00</td>
                <td>A</td>
              </tr>
              <tr>
                <td></td>
                <td>Hochsprung</td>
                <td>2,15</td>
                <td>A</td>
              </tr>
              <tr>
                <td></td>
                <td>Stabhochsprung</td>
                <td>5,40</td>
                <td>A</td>
              </tr>
              <tr>
                <td></td>
                <td>Speerwurf</td>
                <td>79,00</td>
                <td>A</td>
              </tr>
              <tr>
                <td>Frauen</td>
                <td>100m</td>
                <td>11,60</td>
                <td>B</td>
              </tr>
              <tr>
                <td></td>
                <td>400m</td>
                <td>54,00</td>
                <td>A</td>
              </tr>
              <tr>
                <td></td>
                <td>800m</td>
                <td>2:05,00</td>
                <td>A</td>
              </tr>
              <tr>
                <td></td>
                <td>1500m</td>
                <td>4:15,00</td>
                <td>A</td>
              </tr>
              <tr>
                <td></td>
                <td>Hochsprung</td>
                <td>1,80</td>
                <td>B</td>
              </tr>
              <tr>
                <td></td>
                <td>Kugelstoßen</td>
                <td>17,00</td>
                <td>B</td>
              </tr>
              <tr>
                <td></td>
                <td>Speerwurf</td>
                <td>59,00</td>
                <td>B</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2>Preisgeld</h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>A</th>
                <th>B</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>2000</td>
                <td>1200</td>
              </tr>
              <tr>
                <td>2</td>
                <td>1500</td>
                <td>800</td>
              </tr>
              <tr>
                <td>3</td>
                <td>1000</td>
                <td>400</td>
              </tr>
              <tr>
                <td>4</td>
                <td>700</td>
                <td>300</td>
              </tr>
              <tr>
                <td>5</td>
                <td>500</td>
                <td>200</td>
              </tr>
              <tr>
                <td>6</td>
                <td>300</td>
                <td>100</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2>Vorprogramm</h2>
        <p>
          <strong>
            Meldungen für das Nachwuchsprogramm erfolgen für alle deutschen
            Starter ausschließlich über{" "}
            <a href="https://ladv.de/ausschreibung/detail/35335/58.-Internationales-Pfingstsportfest-Rehlingen-Rehlingen-Siersburg.htm">
              LADV
            </a>
            .{" "}
          </strong>
          Ausländische Starter per Mail an{" "}
          <a href="mailto:niklas.marion@lcrehlingen.de">
            niklas.marion@lcrehlingen.de
          </a>
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Altersklasse</th>
                <th>Wettkampf</th>
                <th>Qualifikation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>MJ U16</td>
                <td>800m</td>
                <td>-</td>
              </tr>
              <tr>
                <td>MJ U18</td>
                <td>800m</td>
                <td>2:12:00 min</td>
              </tr>
              <tr>
                <td>MJ U20</td>
                <td>800m</td>
                <td>2:05,00 min</td>
              </tr>
              <tr>
                <td>WJ U16</td>
                <td>800m</td>
                <td>-</td>
              </tr>
              <tr>
                <td>WJ U18</td>
                <td>800m</td>
                <td>2:30,00 min</td>
              </tr>
              <tr>
                <td>WJ U20</td>
                <td>800m</td>
                <td>2:25,00 min</td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    </ContentContainer>
  );
}
