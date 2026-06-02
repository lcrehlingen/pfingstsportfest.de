import ContentContainer from "@/components/ContentContainer";
import Title from "@/components/Title";
import { EVENT_DATE } from "@/utils/constants";
import { daysAway, formatEditionDate } from "@/utils/date";

export const metadata = {
  title: "Ausschreibung",
  description:
    "Offizielle Disziplinen, Prämien und Qualifikations-Standards für das Internationale Pfingstsportfest in Rehlingen.",
  openGraph: {
    title: "Ausschreibung",
    description:
      "Offizielle Disziplinen, Prämien und Qualifikations-Standards für das Internationale Pfingstsportfest in Rehlingen.",
  },
};

export default function Ausschreibung() {
  const daysAwayEvent = daysAway(EVENT_DATE);

  const mainDisciplinesM = ["100m", "400m Hürden", "800m", "1500m", "Diskuswurf (Mixed)"];
  const mainDisciplinesW = ["100m", "400m", "400m Hürden", "800m", "1500m", "Hochsprung", "Weitsprung", "Kugelstoßen", "Diskuswurf (Mixed)"];

  const prizeMoney = [
    { rank: "1.", amount: "1.600 €", medal: "🥇", label: "Gold-Prämie" },
    { rank: "2.", amount: "1.300 €", medal: "🥈", label: "Silber-Prämie" },
    { rank: "3.", amount: "1.000 €", medal: "🥉", label: "Bronze-Prämie" },
    { rank: "4.", amount: "700 €", medal: "🏅", label: "4. Platz" },
    { rank: "5.", amount: "500 €", medal: "🏅", label: "5. Platz" },
    { rank: "6.", amount: "300 €", medal: "🏅", label: "6. Platz" },
  ];

  const preProgram = [
    { class: "MJ U14", event: "800m", limit: "ohne Limit" },
    { class: "MJ U16", event: "800m", limit: "ohne Limit" },
    { class: "MJ U18", event: "800m", limit: "2:12,00 min" },
    { class: "MJ U20", event: "800m", limit: "2:05,00 min" },
    { class: "Männer", event: "800m", limit: "2:00,00 min" },
    { class: "WJ U14", event: "800m", limit: "ohne Limit" },
    { class: "WJ U16", event: "800m", limit: "ohne Limit" },
    { class: "WJ U18", event: "800m", limit: "2:30,00 min" },
    { class: "WJ U20", event: "800m", limit: "2:25,00 min" },
    { class: "Frauen", event: "800m", limit: "2:20,00 min" },
  ];

  return (
    <ContentContainer>
      
      {/* Page Header */}
      <div className="flex flex-col gap-2.5 text-center max-w-2xl mx-auto mb-8">
        <Title>Ausschreibung</Title>
        <p className="text-gray-300 text-base md:text-lg leading-relaxed">
          Offizielle Disziplinen, Prämien und Qualifikations-Standards für das Internationale Pfingstsportfest in Rehlingen.
        </p>
      </div>

      <div className="flex flex-col gap-10 text-white">
        
        {/* Intro Info Banner */}
        <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-tourLightOrange/10 border border-tourLightOrange/30 text-tourLightOrange max-w-fit">
              🏆 Silber Meeting Status
            </span>
            <p className="text-base text-gray-200 max-w-xl leading-relaxed mt-1">
              Seit 2021 gehört das Rehlinger Pfingstsportfest stolz zur renommierten <strong className="text-white">World Athletics Continental Tour</strong> und wird weltweit als Silber Meeting der Leichtathletik gelistet.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end justify-center py-2.5 px-6 bg-white/5 border border-white/5 rounded-2xl shrink-0 font-mono text-center md:text-right">
            <span className="text-xs text-gray-400 uppercase font-extrabold tracking-wider">Austragungsdatum</span>
            <span className="text-xl font-black text-[#C1FB6E] mt-0.5">{formatEditionDate()}</span>
          </div>
        </div>

        {/* Contacts grid */}
        <div className="flex flex-col gap-4">
          <h2 className="font-wa-headline text-2xl font-black text-tourLightOrange uppercase tracking-wide border-b border-white/5 pb-2.5">
            Zuständigkeiten & Kontakte
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Contact Card 1 */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-3 backdrop-blur-xs">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏃‍♂️</span>
                <h3 className="font-bold text-white text-lg">Athletenverpflichtung</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Verpflichtung und Abstimmung für die internationalen Hauptwettbewerbe:
              </p>
              <div className="flex flex-col gap-1.5 text-base font-bold text-white mt-1">
                <span>Werner Klein</span>
                <span>Ann-Cathrine Klein</span>
                <span>Niklas Marion</span>
                <a href="mailto:pfingstsportfest@lcrehlingen.de" className="text-tourLightOrange hover:underline text-sm font-bold mt-1.5 select-all">
                  pfingstsportfest@lcrehlingen.de
                </a>
              </div>
            </div>

            {/* Contact Card 2 */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-3 backdrop-blur-xs">
              <div className="flex items-center gap-2">
                <span className="text-xl">📋</span>
                <h3 className="font-bold text-white text-lg">Meeting-Direktion</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Leitung, Gesamtorganisation und wettkampf-technische Anfragen zum Sportfest:
              </p>
              <div className="flex flex-col gap-1.5 text-base font-bold text-white mt-1">
                <span>Werner Klein</span>
                <span className="text-xs text-gray-400 font-extrabold uppercase bg-white/10 px-2 py-0.5 rounded-sm max-w-fit">Meeting-Direktor</span>
                <a href="mailto:pfingstsportfest@lcrehlingen.de" className="text-tourLightOrange hover:underline text-sm font-bold mt-2 select-all">
                  pfingstsportfest@lcrehlingen.de
                </a>
              </div>
            </div>

            {/* Contact Card 3 */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-3 backdrop-blur-xs">
              <div className="flex items-center gap-2">
                <span className="text-xl">💼</span>
                <h3 className="font-bold text-white text-lg">Sponsoring & Marketing</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Kooperationen, Werbemaßnahmen, Sponsorenverträge und Mediapaket-Anfragen:
              </p>
              <div className="flex flex-col gap-3 text-base font-bold text-white mt-1">
                <div className="flex flex-col">
                  <span>Thomas Klein</span>
                  <a href="mailto:klein.thomas24@googlemail.com" className="text-tourLightOrange hover:underline text-sm select-all">klein.thomas24@googlemail.com</a>
                </div>
                <div className="flex flex-col border-t border-white/5 pt-2 mt-0.5">
                  <span>Philipp Stief</span>
                  <a href="mailto:philipp.stief@lcrehlingen.de" className="text-tourLightOrange hover:underline text-sm select-all">philipp.stief@lcrehlingen.de</a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Dynamic callroom and entry details during meet season */}
        {daysAwayEvent < 14 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-gradient-to-r from-tourLightOrange/5 to-tourOrange/5 border border-tourLightOrange/20 rounded-3xl backdrop-blur-xs animate-fadeIn">
            
            {/* Callroom Card */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
                <span className="text-2xl">⏱</span>
                <h4 className="font-bold font-wa-headline text-white uppercase text-base tracking-wider">Callroom-Zeiten</h4>
              </div>
              <p className="text-sm text-gray-200 leading-relaxed mb-1.5">
                Athleten müssen sich zu den angegebenen Zeiten vor ihrem jeweiligen Start im Callroom einfinden:
              </p>
              <ul className="flex flex-col gap-2">
                <li className="flex justify-between text-base p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-gray-200 font-semibold">Nachwuchsläufe</span>
                  <strong className="text-[#C1FB6E] font-black">15 min vor Start</strong>
                </li>
                <li className="flex justify-between text-base p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-gray-200 font-semibold">Läufe (Hauptprogramm)</span>
                  <strong className="text-[#C1FB6E] font-black">20 min vor Start</strong>
                </li>
                <li className="flex justify-between text-base p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-gray-200 font-semibold">Technische Disziplinen (Wurf/Sprung)</span>
                  <strong className="text-[#C1FB6E] font-black">40 min vor Start</strong>
                </li>
              </ul>
            </div>

            {/* Athlete Entrance */}
            <div className="flex flex-col gap-4 justify-between">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
                  <span className="text-2xl">📍</span>
                  <h4 className="font-bold font-wa-headline text-white uppercase text-base tracking-wider">Athleteneingang</h4>
                </div>
                <p className="text-base text-gray-200 leading-relaxed">
                  Der Einlass für aktive Athleten, Trainer, Betreuer und akkreditierte Presse befindet sich hinter der Kultur- und Sporthalle Rehlingen.
                </p>
              </div>
              
              <a
                href="https://goo.gl/maps/SedUyjtRP63Lo9mk9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white hover:bg-gray-100 text-tourDarkBlue px-5 py-3.5 text-base font-bold transition duration-300 transform hover:-translate-y-0.5"
              >
                <svg className="h-5 w-5 shrink-0 text-tourOrange" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                Athleteneingang in Google Maps öffnen
              </a>
            </div>

          </div>
        )}

        {/* Hauptprogramm Disciplines list */}
        <div className="flex flex-col gap-4">
          <h2 className="font-wa-headline text-2xl font-black text-tourLightOrange uppercase tracking-wide border-b border-white/5 pb-2.5">
            Disziplinen Hauptprogramm
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            
            {/* Men card */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-4 backdrop-blur-xs animate-fadeIn">
              <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                <span className="text-xl">🏃‍♂️</span>
                <h3 className="font-bold text-white text-lg">Männer (Men)</h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {mainDisciplinesM.map((disc, idx) => (
                  <span key={idx} className="px-4 py-2.5 text-base font-extrabold rounded-xl bg-white/10 border border-white/5 text-gray-100">
                    {disc}
                  </span>
                ))}
              </div>
            </div>

            {/* Women card */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-4 backdrop-blur-xs animate-fadeIn">
              <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                <span className="text-xl">🏃‍♀️</span>
                <h3 className="font-bold text-white text-lg">Frauen (Women)</h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {mainDisciplinesW.map((disc, idx) => (
                  <span key={idx} className="px-4 py-2.5 text-base font-extrabold rounded-xl bg-white/10 border border-white/5 text-gray-100">
                    {disc}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Preisgeld Medal Grid */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <h2 className="font-wa-headline text-2xl font-black text-tourLightOrange uppercase tracking-wide border-b border-white/5 pb-2">
              Prämien & Preisgelder
            </h2>
            <p className="text-sm text-gray-300">
              Der Preisgeldpool verteilt sich pro offiziellem WA-Hauptwettbewerb auf die besten sechs Platzierten wie folgt:
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 w-full">
            {prizeMoney.map((tier, idx) => (
              <div 
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2 backdrop-blur-xs group hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <span className="text-3xl filter drop-shadow-sm select-none">{tier.medal}</span>
                <div className="flex flex-col leading-none">
                  <span className="text-xs text-gray-300 font-bold">{tier.rank} Platz</span>
                  <span className="text-2xl font-black text-white mt-1.5 group-hover:text-[#C1FB6E] transition">{tier.amount}</span>
                </div>
                <span className="text-xs font-black uppercase text-tourLightOrange tracking-wider mt-0.5 leading-none">
                  {tier.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Vorprogramm (Pre-Program) table database view */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <h2 className="font-wa-headline text-2xl font-black text-tourLightOrange uppercase tracking-wide border-b border-white/5 pb-2">
              Nachwuchs- & Vorprogramm
            </h2>
            <p className="text-sm text-gray-300">
              Ablauf und Mindest-Qualifikationsleistungen für die Läufe des Nachwuchsprogramms am Nachmittag:
            </p>
          </div>

          {/* Registration instructions info alert */}
          <div className="p-6 bg-gradient-to-r from-[#C1FB6E]/5 to-tourLightOrange/5 border border-white/10 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-xs">
            <div className="flex flex-col gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#C1FB6E]/10 border border-[#C1FB6E]/30 text-[#C1FB6E] max-w-fit">
                Meldungen
              </span>
              <p className="text-sm text-gray-200 leading-relaxed max-w-xl">
                Deutsche Starter melden sich ausschließlich online über das <strong className="text-white font-black">LADV-Portal</strong> an. Ausländische Starter senden Ihre Meldung per E-Mail an <a href="mailto:niklas.marion@lcrehlingen.de" className="text-tourLightOrange hover:underline font-bold font-wa-bold">niklas.marion@lcrehlingen.de</a>.
              </p>
            </div>
            
            <a
              href="https://ladv.de/ausschreibung/detail/41545/60.-Internationales-Pfingstsportfest-Rehlingen-Rehlingen.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white hover:bg-gray-100 text-tourDarkBlue font-bold text-sm shrink-0 transition px-5 py-3.5"
            >
              Meldung über LADV ↗
            </a>
          </div>

          {/* Database Grid view */}
          <div className="overflow-hidden bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xs shadow-xl mt-2">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-xs font-bold uppercase tracking-wider text-tourLightOrange">
                  <th className="py-4 px-6">Altersklasse</th>
                  <th className="py-4 px-6">Wettkampf</th>
                  <th className="py-4 px-6 text-right">Qualifikations-Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-semibold text-base">
                {preProgram.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition duration-200">
                    <td className="py-4 px-6 text-white font-extrabold text-lg">{item.class}</td>
                    <td className="py-4 px-6 text-gray-200">{item.event}</td>
                    <td className="py-4 px-6 text-right text-gray-200 font-mono">
                      {item.limit === "ohne Limit" ? (
                        <span className="text-gray-500 font-sans font-bold text-xs italic">{item.limit}</span>
                      ) : (
                        <span className="text-[#C1FB6E] font-black">{item.limit}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </ContentContainer>
  );
}
