export interface NavLink {
  name: string;
  href: string;
  target?: string;
  isExternal?: boolean;
}

export const MAIN_NAV_LINKS: NavLink[] = [
  { name: "Aktuelles", href: "/news" },
  { name: "Ergebnisse", href: "/ergebnisse" },
  { name: "Rekorde", href: "/rekorde" },
  { name: "Sponsoren", href: "/#sponsoren" },
];

export const FOOTER_CONTACT_LINKS: NavLink[] = [
  { name: "Athletenverpflichtung", href: "mailto:pfingstsportfest@lcrehlingen.de", isExternal: true },
  { name: "Sponsoring-Anfragen", href: "mailto:klein.thomas24@googlemail.com", isExternal: true },
];

export const FOOTER_SOCIAL_LINKS: NavLink[] = [
  { name: "Instagram", href: "https://www.instagram.com/weltklasse_in_rehlingen/", target: "_blank", isExternal: true },
  { name: "Facebook", href: "https://www.facebook.com/PfingstsportfestRehlingen/", target: "_blank", isExternal: true },
];

export const FOOTER_LEGAL_LINKS: NavLink[] = [
  { name: "Presse & Akkreditierung", href: "/presse" },
  { name: "Datenschutz", href: "https://lcrehlingen.de/datenschutz", target: "_blank", isExternal: true },
  { name: "Impressum", href: "https://lcrehlingen.de/impressum", target: "_blank", isExternal: true },
];
