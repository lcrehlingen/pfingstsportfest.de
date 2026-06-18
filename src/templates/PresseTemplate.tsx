import ContentContainer from "@/components/ContentContainer";
import Title from "@/components/Title";
import { EDITION } from "@/data";

/* metadata removed */ 
const oldMetadata = {
  title: "Presse & Akkreditierung",
  description: `Offizielle Medien-Richtlinien, Vor-Ort-Services und Presse-Akkreditierung für das ${EDITION}. Internationale Pfingstsportfest in Rehlingen.`,
  openGraph: {
    title: "Presse & Akkreditierung",
    description: `Offizielle Medien-Richtlinien, Vor-Ort-Services und Presse-Akkreditierung für das ${EDITION}. Internationale Pfingstsportfest in Rehlingen.`,
  },
};

import { Locale } from '@/i18n/get-dictionary';

interface PresseTemplateProps { locale: Locale; }

export default function PresseTemplate({ locale }: PresseTemplateProps) {
  const mailtoLink = "mailto:pfingstsportfest@lcrehlingen.de?subject=Akkreditierungsanfrage%20" + EDITION + ".%20Pfingstsportfest%20Rehlingen&body=Hallo%20Medien-Team%2C%0A%0Ahiermit%20beantrage%20ich%20eine%20Presse-Akkreditierung%20f%C3%BCr%20das%20" + EDITION + ".%20Pfingstsportfest%20Rehlingen.%0A%0AMeine%20Daten%3A%0A-%20Vor-%20und%20Nachname%3A%20%0A-%20Medium%20%2F%20Redaktion%3A%20%0A-%20Art%20der%20Berichterstattung%20(Journalist%20%2F%20Fotograf%20%2F%20Video%20%2F%20Radio)%3A%20%0A-%20Nummer%20des%20Presseausweises%20(und%20Verband)%3A%20%0A-%20E-Mail-Adresse%3A%20%0A-%20Telefonnummer%3A%20%0A-%20Bemerkungen%20%2F%20Spezielle%20Anforderungen%3A%20%0A%0AMit%20freundlichen%20Gr%C3%BC%C3%9Fen%0A";

  return (
    <ContentContainer>
      {/* Page Header */}
      <div className="flex flex-col gap-2.5 text-center max-w-2xl mx-auto mb-8">
        <Title>{locale === 'de' ? 'Presse & Akkreditierung' : 'Press & Accreditation'}</Title>
        <p className="text-gray-300 text-base md:text-lg leading-relaxed">{locale === "de" ? "Offizielle Medien-Richtlinien, Vor-Ort-Services und Presse-Akkreditierung für das Pfingstsportfest im Bungertstadion Rehlingen." : "Official media guidelines, on-site services, and press accreditation for the Pfingstsportfest in the Bungert Stadium Rehlingen."}</p>{/*
          */}
      </div>

      <div className="flex flex-col gap-10 text-white">
        
        {/* Intro Info Banner */}
        <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-tourLightOrange/10 border border-tourLightOrange/30 text-tourLightOrange max-w-fit">
              {locale === "de" ? "📢 Willkommen Medienvertreter" : "📢 Welcome Media Representatives"}
            </span>
            <p className="text-base text-gray-200 max-w-2xl leading-relaxed mt-1">
              {locale === "de" ? <>Wir freuen uns über Ihr Interesse am {EDITION}. Internationalen Pfingstsportfest Rehlingen. Um Ihnen die Berichterstattung so angenehm und effizient wie möglich zu gestalten, bieten wir Journalisten, Fotografen und Rundfunkanstalten umfassende Unterstützung vor Ort an.</> : <>We appreciate your interest in the {EDITION}. International Pfingstsportfest Rehlingen. To make your coverage as comfortable and efficient as possible, we provide full support on-site for journalists, photographers, and broadcasters.</>}
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end justify-center py-2.5 px-6 bg-white/5 border border-white/5 rounded-2xl shrink-0 font-mono text-center md:text-right">
            <span className="text-xs text-gray-400 uppercase font-extrabold tracking-wider">{locale === "de" ? "Akkreditierungsfrist" : "Accreditation Deadline"}</span>
            <span className="text-lg font-black text-[#C1FB6E] mt-0.5">{locale === "de" ? "Bis 1 Woche vor Event" : "Until 1 week before event"}</span>
          </div>
        </div>

        {/* Requirements & Process Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          
          {/* Left Column: Guidelines & Information */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h2 className="font-wa-headline text-2xl font-black text-tourLightOrange uppercase tracking-wide border-b border-white/5 pb-2.5">
                {locale === "de" ? "Richtlinien zur Akkreditierung" : "Accreditation Guidelines"}
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                Akkreditierungen werden ausschließlich zum Zweck der journalistischen Berichterstattung erteilt. Bitte beachten Sie folgende Voraussetzungen:
              </p>
              
              <div className="flex flex-col gap-4 mt-2">
                
                {/* Rule 1 */}
                <div className="flex gap-3.5 items-start">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-tourOrange/10 border border-tourOrange/30 text-tourOrange text-xs font-extrabold font-mono mt-0.5">
                    1
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-white text-base">Hauptberufliche Journalisten</h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Vorlage eines gültigen Presseausweises (z. B. DJV, dju, BDZV, VDZ, VDS oder AIPS). Ein reines Blog- oder Fanpage-Akkreditierungsbegehren ohne professionellen Reichweitennachweis ist in der Regel nicht ausreichend.
                    </p>
                  </div>
                </div>

                {/* Rule 2 */}
                <div className="flex gap-3.5 items-start">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-tourOrange/10 border border-tourOrange/30 text-tourOrange text-xs font-extrabold font-mono mt-0.5">
                    2
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-white text-base">Konkreter Redaktionsauftrag</h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Alternativ oder ergänzend ist ein schriftlicher Redaktionsauftrag eines etablierten Mediums vorzulegen, der die Absicht einer zeitnahen Berichterstattung dokumentiert.
                    </p>
                  </div>
                </div>

                {/* Rule 3 */}
                <div className="flex gap-3.5 items-start">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-tourOrange/10 border border-tourOrange/30 text-tourOrange text-xs font-extrabold font-mono mt-0.5">
                    3
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-white text-base">Fotografen & Videoproduzenten</h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Aufgrund Regularien für den Innenraum ist die Anzahl der Fotografen-Akkreditierungen limitiert. Fotografen müssen während des Wettkampfs eine offizielle Presseweste tragen.
                    </p>
                  </div>
                </div>

                {/* Rule 4 */}
                <div className="flex gap-3.5 items-start">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-tourOrange/10 border border-tourOrange/30 text-tourOrange text-xs font-extrabold font-mono mt-0.5">
                    4
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-white text-base">Keine Vor-Ort-Akkreditierung</h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Akkreditierungen müssen vorab beantragt werden. Am Wettkampftag selbst werden an der Tageskasse oder am Einlass keine Akkreditierungen ausgestellt.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <h2 className="font-wa-headline text-2xl font-black text-tourLightOrange uppercase tracking-wide border-b border-white/5 pb-2.5">
                {locale === "de" ? "Pressekontakt" : "Press Contact"}
              </h2>
              <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-3 backdrop-blur-xs">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎙</span>
                  <h3 className="font-bold text-white text-base">{locale === "de" ? "Presse- & Medien-Koordination" : "Press & Media Coordination"}</h3>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Für Presseanfragen im Vorfeld, Interviewwünsche, Bildanfragen oder redaktionelle Rückfragen wenden Sie sich bitte direkt an unser Organisationsteam:
                </p>
                <div className="flex flex-col gap-1 text-sm font-bold text-white mt-1">
                  <a href="mailto:pfingstsportfest@lcrehlingen.de" className="text-tourLightOrange hover:underline text-xs font-bold mt-1.5 select-all">
                    pfingstsportfest@lcrehlingen.de
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Accreditation Application Form Section */}
          <div className="p-6 bg-gradient-to-b from-white/10 to-transparent border border-white/10 rounded-3xl backdrop-blur-xs flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-tourLightOrange/20 text-tourLightOrange max-w-fit px-2.5 py-0.5 rounded-sm">
                Antragstellung
              </span>
              <h2 className="font-wa-headline text-2xl font-black text-white tracking-wide uppercase">
                {locale === "de" ? "Akkreditierung beantragen" : "Apply for Accreditation"}
              </h2>
            </div>
            
            <p className="text-xs text-gray-300 leading-relaxed">
              Bitte senden Sie uns Ihre Akkreditierungsanfrage formlos per E-Mail oder nutzen Sie die untenstehende Datenvorlage. Kopieren Sie die Felder oder klicken Sie direkt auf den Button, um Ihren E-Mail-Client zu öffnen.
            </p>

            {/* Copy-Paste Template Box */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-gray-400">Erforderliche Angaben:</span>
              <div className="p-4 bg-black/40 border border-white/5 rounded-2xl font-mono text-[11px] text-gray-300 leading-relaxed whitespace-pre select-all overflow-x-auto">
{`Betreff: Akkreditierungsfrage ${EDITION}. Pfingstsportfest

Vorname, Nachname: [Name eintragen]
Medium / Redaktion: [Medium eintragen]
Art der Berichterstattung: [Journalist / Fotograf / Video / Radio]
Presseausweis-Nummer: [Nummer und Verband eintragen]
E-Mail-Adresse: [E-Mail eintragen]
Telefonnummer: [Telefonnummer eintragen]
Bemerkungen / Wünsche: [Spezielle Anforderungen, falls vorhanden]`}
              </div>
            </div>

            {/* Direct Email Action Button */}
            <div className="flex flex-col gap-3 mt-2">
              <a
                href={mailtoLink}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-tourOrange hover:bg-tourLightOrange text-white px-5 py-3.5 text-center text-base font-extrabold transition duration-300 transform hover:-translate-y-0.5 shadow-md border border-tourOrange/10"
              >
                📬 E-Mail-Vorlage direkt öffnen
              </a>
              <span className="text-[10px] text-gray-400 text-center">
                Öffnet Ihr Standard-E-Mail-Programm mit vorausgefüllter Datenvorlage.
              </span>
            </div>
          </div>

        </div>

      </div>
    </ContentContainer>
  );
}
