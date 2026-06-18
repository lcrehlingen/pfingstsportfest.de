import ContentContainer from "@/components/ContentContainer";
import Title from "@/components/Title";

/* metadata removed */ 
const oldMetadata = {
  title: "Eintritt & Tickets",
  description:
    "Sichern Sie sich Ihre Tickets für das Pfingstsportfest in Rehlingen. Übersicht über Stehplatz- und Sitzplatztribünen-Preise im Bungertstadion.",
  openGraph: {
    title: "Eintritt & Tickets",
    description:
      "Sichern Sie sich Ihre Tickets für das Pfingstsportfest in Rehlingen. Übersicht über Stehplatz- und Sitzplatztribünen-Preise im Bungertstadion.",
  },
};

import { Locale } from '@/i18n/get-dictionary';

interface EintrittTemplateProps { locale: Locale; }

export default function EintrittTemplate({ locale }: EintrittTemplateProps) {
  const tickets = [
    {
      title: locale === 'de' ? 'Stehplatz Standard' : 'Standing Standard',
      price: "15 €",
      description: locale === 'de' ? 'Reguläres Ticket für Erwachsene im gesamten Stehplatzbereich des Stadions.' : 'Regular ticket for adults in the general standing area.',
      features: locale === 'de' ? ["Freie Platzwahl", "Zutritt Stehplatzbereich", "Kompaktes Familienerlebnis"] : ["General admission", "Standing area access", "Great family experience"],
      popular: false,
      badge: locale === 'de' ? 'Erwachsene' : 'Adults'
    },
    {
      title: locale === 'de' ? 'Tribüne Sitzplatz' : 'Covered Grandstand',
      price: "30 €",
      description: locale === 'de' ? 'Sitzplatz-Ticket auf der überdachten Haupttribüne mit bester Sicht auf die Zielgerade.' : 'Reserved seat on the covered grandstand with the best view of the finishing straight.',
      features: locale === 'de' ? ["Garantierter Sitzplatz", "Überdachter Tribünenbereich", "Perfekte Sicht auf Start & Ziel", "Exklusives Kontingent"] : ["Guaranteed seat", "Covered grandstand", "Perfect start/finish view", "Highly limited space"],
      popular: true,
      badge: locale === 'de' ? 'Premium' : 'Premium'
    },
    {
      title: locale === 'de' ? 'Ermäßigt' : 'Discounted',
      price: "7 €",
      description: locale === 'de' ? 'Vergünstigtes Stehplatz-Ticket gegen Vorlage eines gültigen Ausweises am Einlass.' : 'Reduced price ticket with verification needed at the gate.',
      features: locale === 'de' ? ["Schüler & Jugendliche (12-18 J.)", "Studenten & Auszubildende", "Schwerbehinderte (mit Ausweis)", "Gleicher Zutritt wie Standard"] : ["Youth (12-18 years)", "Students & Apprentices", "Disabled persons (with ID)", "Same standing access"],
      popular: false,
      badge: locale === 'de' ? 'Ermäßigt' : 'Discounted'
    }
  ];

  return (
    <ContentContainer>
      
      {/* Intro Header */}
      <div className="flex flex-col gap-3 text-center max-w-2xl mx-auto mb-8">
        <Title>{locale === 'de' ? 'Eintritt & Tickets' : 'Admission & Tickets'}</Title>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">{locale === "de" ? "Erleben Sie Leichtathletik auf Weltklasse-Niveau live im Bungertstadion. Eintrittskarten können unkompliziert am Wettkampftag direkt vor Ort erworben werden." : "Experience world-class track and field live in the Bungert Stadium. Admission tickets can be purchased directly on-site on event day."}</p>{/*
          */}
      </div>

      {/* Premium Ticket Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch w-full mb-10">
        {tickets.map((ticket, index) => (
          <div
            key={index}
            className={`relative flex flex-col justify-between p-6 bg-white/5 border rounded-3xl backdrop-blur-xs transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl ${
              ticket.popular
                ? "border-tourLightOrange shadow-xl shadow-tourLightOrange/5 bg-gradient-to-b from-tourLightOrange/5 to-transparent"
                : "border-white/10 hover:border-white/20 hover:bg-white/10"
            }`}
          >
            {/* Premium Badge */}
            {ticket.popular && (
              <span className="absolute top-0 right-6 -translate-y-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-tourLightOrange text-white shadow-md shadow-tourLightOrange/20 animate-fadeIn">
                {locale === "de" ? "🏆 Beliebt & Limitiert" : "🏆 Popular & Limited"}
              </span>
            )}

            <div className="flex flex-col gap-5">
              {/* Card Title & Header */}
              <div className="flex flex-col gap-1.5">
                <span className={`text-[10px] font-extrabold uppercase tracking-widest max-w-fit px-2 py-0.5 rounded-sm ${
                  ticket.popular 
                    ? "bg-tourLightOrange/20 text-tourLightOrange" 
                    : "bg-white/10 text-gray-300"
                }`}>
                  {ticket.badge}
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight">{ticket.title}</h3>
              </div>

              {/* Price Indicator */}
              <div className="flex items-baseline gap-1 py-1 border-b border-white/5">
                <span className="text-4xl font-black text-[#C1FB6E] tracking-tight">{ticket.price}</span>
                <span className="text-xs text-gray-400">{locale === "de" ? "/ Ticket" : "/ Ticket"}</span>
              </div>

              {/* Short description */}
              <p className="text-sm text-gray-300 leading-relaxed min-h-12">{ticket.description}</p>

              {/* Feature bullet list */}
              <ul className="flex flex-col gap-2.5 pt-2">
                {ticket.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                    <svg className={`h-4 w-4 shrink-0 ${ticket.popular ? "text-tourLightOrange" : "text-[#C1FB6E]"}`} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Bottom spacer */}
            <div className="mt-6 border-t border-white/5 pt-4 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 group-hover:text-white transition duration-300">
                {locale === "de" ? "Erhältlich an der Tageskasse" : "Available at the Gate"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Special Offers Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-12">
        
        {/* Family Card */}
        <div className="flex flex-col p-6 bg-gradient-to-r from-tourDarkBlue/40 to-tourOrange/5 border border-white/10 rounded-3xl relative overflow-hidden backdrop-blur-xs hover:border-white/20 transition-all duration-300 group">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-tourOrange/5 rounded-full blur-2xl pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
          
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">👨‍👩‍👧‍👦</span>
            <h4 className="text-lg font-bold font-wa-headline text-white tracking-wide uppercase">
              {locale === "de" ? "Familien-Sonderpreis (Family Card)" : "Family Special Price (Family Card)"}
            </h4>
          </div>
          
          <div className="flex items-baseline gap-1 py-1">
            <span className="text-3xl font-black text-[#C1FB6E] tracking-tight">35 €</span>
            <span className="text-xs text-gray-400">{locale === "de" ? "/ Familie" : "/ Family"}</span>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed mt-2.5">
            {locale === "de" ? <>Zwei Erwachsene und zwei zahlungspflichtige Kinder erhalten Einlass im Stehplatzbereich zum Vorzugstarif. Jedes weitere eigene Kind ist komplett <strong className="text-[#C1FB6E]">kostenlos</strong>! Ideal für sportbegeisterte Familien.</> : <>Two adults and two children receive general admission standing at a discount rate. Every additional own child is completely <strong className="text-[#C1FB6E]">free</strong>! Ideal for sports-loving families.</>}
          </p>
        </div>

        {/* Free Entry Card */}
        <div className="flex flex-col p-6 bg-gradient-to-r from-tourDarkBlue/40 to-tourLightOrange/5 border border-white/10 rounded-3xl relative overflow-hidden backdrop-blur-xs hover:border-white/20 transition-all duration-300 group">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-tourLightOrange/5 rounded-full blur-2xl pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
          
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🎈</span>
            <h4 className="text-lg font-bold font-wa-headline text-white tracking-wide uppercase">
              {locale === "de" ? "Freier Eintritt für Kinder" : "Free Admission for Kids"}
            </h4>
          </div>

          <div className="flex items-baseline gap-1 py-1">
            <span className="text-3xl font-black text-[#C1FB6E] tracking-tight">0 €</span>
            <span className="text-xs text-gray-400">/ Kinder</span>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed mt-2.5">
            Nachwuchs fördern ist uns eine Herzensangelegenheit: Alle Kinder und Schüler <strong className="text-[#C1FB6E]">bis einschließlich 11 Jahre</strong> haben freien Eintritt im Stehplatzbereich und benötigen keine Eintrittskarte!
          </p>
        </div>

      </div>

      {/* Logistics Information Panels (Tageskasse & Athleten) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full border-t border-white/10 pt-10">
        
        {/* Box Office Logistics */}
        <div className="flex items-start gap-4 p-5 bg-white/5 rounded-2xl border border-white/5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-tourLightOrange border border-white/10">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div className="flex flex-col gap-1.5">
            <h4 className="text-base font-bold text-white">Tageskasse & Kassenöffnung</h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              Die Tageskassen direkt an den Stadioneingängen öffnen am Wettkampftag um <strong className="text-white">13:30 Uhr</strong>. Eintrittskarten können bar oder mit EC-Karte erworben werden. Ein rechtzeitiges Erscheinen sichert Ihnen die besten Plätze, insbesondere auf der Haupttribüne!
            </p>
          </div>
        </div>

        {/* Participant Entry Logistics */}
        <div className="flex items-start gap-4 p-5 bg-white/5 rounded-2xl border border-white/5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#C1FB6E] border border-white/10">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V14.25M18 10.5V18a1.5 1.5 0 01-3 0v-3m-3-3V1.5a1.5 1.5 0 00-3 0v16.5a1.5 1.5 0 003 0v-4.5z"></path>
            </svg>
          </div>
          <div className="flex flex-col gap-2.5 w-full">
            <div className="flex flex-col gap-1.5">
              <h4 className="text-base font-bold text-white">Teilnehmer- & Presse-Einlass</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                Der Einlass für aktive Athletinnen, Athleten, Trainer, Betreuer und Pressevertreter ist ausschließlich über den dafür vorgesehenen Seitenzugang möglich.
              </p>
            </div>
            <a
              href="https://goo.gl/maps/SedUyjtRP63Lo9mk9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex max-w-fit items-center gap-1.5 rounded-xl bg-white/15 border border-white/10 hover:border-white/30 text-white hover:text-[#C1FB6E] px-4 py-2 text-xs font-bold transition duration-300"
            >
              <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              Athleteneingang auf Google Maps öffnen
            </a>
          </div>
        </div>

      </div>

    </ContentContainer>
  );
}
