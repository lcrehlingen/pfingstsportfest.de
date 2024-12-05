import ContentContainer from "@/components/ContentContainer";
import Title from "@/components/Title";
import { EVENT_DATE } from "@/utils/constants";
import { daysAway } from "@/utils/date";

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
          Seit 2021 gehört das Pfingstsportfest zur World Athletics Continental
          Tour und wird als <strong>Silber Meeting</strong> der
          Leichtathletik weltweit gelistet.
        </p>
        <ul>
          <li>Datum: 08.06.2025</li>
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
            Meeting-Direktor: <a href="mailto:pfingstsportfest@lcrehlingen.de">Werner Klein</a>
          </li>
          <li>
            Sponsoring: <a href="mailto:klein.thomas24@googlemail.com">Thomas Klein</a>,{" "}
            <a href="mailto:philipp.stief@lcrehlingen.de">Philipp Stief</a>
          </li>
        </ul>
        {daysAway(EVENT_DATE) < 14 && (
          <>
            <h2>Callroom</h2>
            <ul>
              <li>15 min vor Start -Nachwuchsläufe</li>
              <li>20 min vor Start -Lauf</li>
              <li>40 min vor Start- Wurf/Hochsprung</li>
            </ul>
            <h2>Athleteneingang</h2>
            <p>
              Der Athleteneingang befindet sich hinter der Kultur-und
              Sporthalle:{" "}
              <a
                href="https://goo.gl/maps/SedUyjtRP63Lo9mk9"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Maps
              </a>
            </p>
          </>
        )}

        <h2>Hauptprogramm</h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Altersklasse</th>
                <th>Wettbewerb</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Männer</td>
                <td>100m</td>
              </tr>
              <tr>
                <td></td>
                <td>400m</td>
              </tr>
              <tr>
                <td></td>
                <td>800m</td>
              </tr>
              <tr>
                <td></td>
                <td>1500m</td>
              </tr>
              <tr>
                <td></td>
                <td>400m Hürden</td>
              </tr>
              <tr>
                <td></td>
                <td>3000m Hindernis</td>
              </tr>
              <tr>
                <td></td>
                <td>Speerwurf</td>
              </tr>
              <tr>
                <td>Frauen</td>
                <td>100m</td>
              </tr>
              <tr>
                <td></td>
                <td>400m</td>
              </tr>
              <tr>
                <td></td>
                <td>800m</td>
              </tr>
              <tr>
                <td></td>
                <td>1500m</td>
              </tr>
              <tr>
                <td></td>
                <td>Hochsprung</td>
              </tr>
              <tr>
                <td></td>
                <td>Weitsprung</td>
              </tr>
              <tr>
                <td></td>
                <td>Kugelstoßen</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2>Preisgeld</h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Platzierung</th>
                <th>Preisgeld</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>1600</td>
              </tr>
              <tr>
                <td>2</td>
                <td>1200</td>
              </tr>
              <tr>
                <td>3</td>
                <td>900</td>
              </tr>
              <tr>
                <td>4</td>
                <td>600</td>
              </tr>
              <tr>
                <td>5</td>
                <td>400</td>
              </tr>
              <tr>
                <td>6</td>
                <td>300</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2>Vorprogramm</h2>
        <p>
          <strong>
            Meldungen für das Nachwuchsprogramm erfolgen für alle deutschen
            Starter ausschließlich über{" "}
            <a href="https://ladv.de/ausschreibung/detail/41545/60.-Internationales-Pfingstsportfest-Rehlingen-Rehlingen.htm">
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
                <td>MJ U14</td>
                <td>800m</td>
                <td>-</td>
              </tr>
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
                <td>WJ U14</td>
                <td>800m</td>
                <td>-</td>
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
