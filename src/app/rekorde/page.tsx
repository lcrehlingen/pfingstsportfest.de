import eventRecordsM from "@/assets/records_m.json";
import eventRecordsW from "@/assets/records_w.json";
import ContentContainer from "@/components/ContentContainer";
import Title from "@/components/Title";

export const metadata = {
  title: "Stadionrekorde",
  openGraph: {
    title: "Stadionrekorde",
  }
};

export default function Ausschreibung() {
  return (
    <>
      <ContentContainer>
        <Title>Stadionrekorde</Title>
        <article className="prose prose-xl max-w-none prose-table:tracking-wide">
          <h3 id="m">Männer</h3>
          <table>
            <thead>
              <tr>
                <th>Disziplin</th>
                <th>Name</th>
                <th>Leistung</th>
                <th>Jahr</th>
              </tr>
            </thead>
            <tbody>
              {eventRecordsM.map((record, index) => (
                <tr key={index}>
                  <td className="font-semibold">{record.Disziplin}</td>
                  <td>
                    {record.Name} ({record.Land})
                  </td>
                  <td>{record.Leistung}</td>
                  <td>{record.Jahr}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3 id="w">Frauen</h3>
          <table>
            <thead>
              <tr>
                <th>Disziplin</th>
                <th>Name</th>
                <th>Leistung</th>
                <th>Jahr</th>
              </tr>
            </thead>
            <tbody>
              {eventRecordsW.map((record, index) => (
                <tr key={index}>
                  <td className="font-semibold">{record.Disziplin}</td>
                  <td>
                    {record.Name} ({record.Land})
                  </td>
                  <td>{record.Leistung}</td>
                  <td>{record.Jahr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </ContentContainer>
    </>
  );
}
