import ContentContainer from "@/components/ContentContainer";
import Title from "@/components/Title";

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
      <article className="prose prose-xl max-w-none prose-table:tracking-wide">
        <h2>VSE-Nachwuchs Vorprogramm</h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Uhrzeit</th>
                <th>Lauf</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>15.00</td>
                <td>800m Weibliche Jugend Zeitläufe</td>
              </tr>
              <tr>
                <td>15.15</td>
                <td>800m Männliche Jugend Zeitläufe</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2>Hauptprogramm - Offizielle Eröffnung 16:00</h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Uhrzeit</th>
                <th>Lauf</th>
                <th>Sprung</th>
                <th>Wurf</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>16.15</td>
                <td></td>
                <td>Weitsprung Para</td>
                <td> </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>16.20</td>
                <td>Pendelstaffel</td>
                <td></td>
                <td> </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>16.30</td>
                <td>4 x 400m Mixed U12/U14</td>
                <td></td>
                <td> </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>16.45</td>
                <td>100m VL Frauen</td>
                <td></td>
                <td> </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>16.57</td>
                <td>100m VL Männer</td>
                <td></td>
                <td> </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>17.12</td>
                <td>1. Lauf 400m Hürden</td>
                <td></td>
                <td> </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>17.17</td>
                <td>2. Lauf 400m Hürden</td>
                <td></td>
                <td> </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>17.20</td>
                <td></td>
                <td></td>
                <td>Kugel Frauen </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>17.25</td>
                <td>1500m Frauen</td>
                <td></td>
                <td> </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>17.40</td>
                <td></td>
                <td>Hochsprung Frauen</td>
                <td> </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>17.42</td>
                <td>100m EL Frauen</td>
                <td></td>
                <td> </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>17.48</td>
                <td>100m EL Männer</td>
                <td></td>
                <td> </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>17:50</td>
                <td></td>
                <td>Weitsprung Frauen</td>
                <td> </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>17.55</td>
                <td>1. Lauf 400m Frauen</td>
                <td></td>
                <td> </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>17.59</td>
                <td>2. Lauf 400m Frauen</td>
                <td></td>
                <td> </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>18.04</td>
                <td></td>
                <td></td>
                <td> </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>18.05</td>
                <td>2. Lauf 400m Männer</td>
                <td></td>
                <td> </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>18.10</td>
                <td>1. Lauf 400m Männer</td>
                <td></td>
                <td> </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>18.20</td>
                <td>2. Lauf 800m Frauen</td>
                <td></td>
                <td> </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>18.28</td>
                <td>1. Lauf 800m Frauen</td>
                <td></td>
                <td> </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>18.36</td>
                <td>1500m Männer</td>
                <td></td>
                <td> </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>18.47</td>
                <td>2. Lauf 800 Männer</td>
                <td></td>
                <td> </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>18.53</td>
                <td>1. Lauf 800m Männer</td>
                <td></td>
                <td> </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>19.00</td>
                <td>3000m Hindernis</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    </ContentContainer>
  );
}
