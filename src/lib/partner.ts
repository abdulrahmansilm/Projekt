/**
 * Partner-Logos für die Trustbar (Leistungsseiten) und „Starke Partner“ (Startseite).
 * Quelle der Dateien: referenz/startseite/image/Partner → public/partner/.
 * Microsoft erscheint seit Runde 4 ausschließlich als Schriftzug, ohne Logo-Bild.
 * Lenovo und Dell folgen später (Kundenangabe 22.09.2026).
 */
export type PartnerLogo = {
  /** Name für alt-Text und Screenreader */
  name: string;
  /** Pfad unter public/ – fehlt bei Inline-Marken */
  bild?: string;
  /** nur den Namen als Schriftzug zeigen, ohne Bild */
  nurText?: boolean;
  /** Anzeigehöhe in px (Standard 30) */
  hoehe?: number;
};

export const PARTNER: PartnerLogo[] = [
  // Runde 4: kein Microsoft-Logo mehr, nur der Schriftzug
  { name: "Microsoft", nurText: true, hoehe: 26 },
  { name: "TD SYNNEX", bild: "/partner/td-synnex.png", hoehe: 26 },
  { name: "Nextcloud", bild: "/partner/nextcloud.png", hoehe: 34 },
  { name: "Hornetsecurity by Proofpoint", bild: "/partner/hornetsecurity.svg", hoehe: 44 },
  { name: "Elovade Professional Partner", bild: "/partner/elovade.png", hoehe: 52 },
];
