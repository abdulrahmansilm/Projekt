/**
 * Content Collections (docs/BRANCHE.md → Content Collections).
 * - leistungen: je Leistungsseite eine JSON-Datei mit Hero-Daten und geordneter Sektionsliste
 * - seiten: seitenübergreifende Inhalte (Startseite, Kontaktformular, Trustbar)
 * - wissen: Fachartikel (Markdown mit HTML-Blöcken)
 * Icons liegen als SVG-Innenmarkup (aus den Referenzdateien) in den Daten.
 */
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const kopf = {
  eyebrow: z.string().optional(),
  titel: z.string(),
  intro: z.string().optional(),
};

const problemLoesung = z.object({
  typ: z.literal("problemLoesung"),
  ...kopf,
  akzent: z.string(),
  labelOhne: z.string(),
  labelMit: z.string(),
  karten: z.array(
    z.object({
      titel: z.string(),
      icon: z.string(),
      ohne: z.string(),
      mitStark: z.string(),
      mitText: z.string(),
    })
  ),
  kicker: z.string().optional(),
});

const trustbar = z.object({
  typ: z.literal("trustbar"),
  label: z.string(),
  /** nicht mehr genutzt: die Logos stehen seit 22.09.2026 zentral in src/lib/partner.ts */
  logos: z.array(z.string()).optional(),
});

const zeitstrahl = z.object({
  typ: z.literal("zeitstrahl"),
  ...kopf,
  aktiv: z.number().int().min(1).default(1),
  bild: z.string().optional(),
  schritte: z.array(z.object({ nummer: z.string(), titel: z.string(), text: z.string() })),
});

const pricingPakete = z.object({
  typ: z.literal("pricingPakete"),
  ...kopf,
  chips: z.object({ titel: z.string(), sub: z.string(), icon: z.string(), items: z.array(z.string()) }),
  jahresRabatt: z.number().optional(),
  rabattHinweis: z.string().optional(),
  slider: z
    .object({ label: z.string(), einzahl: z.string(), mehrzahl: z.string(), min: z.number(), max: z.number(), start: z.number(), hinweis: z.string().optional() })
    .optional(),
  einheit: z.string(),
  geraetEinheit: z.string().optional(),
  pakete: z.array(
    z.object({
      name: z.string(),
      variante: z.enum(["neutral", "beliebt", "premium"]),
      badge: z.string().optional(),
      claim: z.string(),
      preis: z.number(),
      prefix: z.string().optional(),
      geraetPreis: z.number().optional(),
      reaktion: z.object({ wert: z.string(), sub: z.string() }).optional(),
      diffTitel: z.string(),
      geerbt: z.boolean().default(false),
      diffs: z.array(z.string()),
      cta: z.string().default("Jetzt anfragen"),
    })
  ),
  vergleich: z
    .array(
      z.object({
        label: z.string(),
        werte: z.array(z.string()).optional(),
        preisFeld: z.enum(["preis", "geraetPreis"]).optional(),
        betont: z.boolean().optional(),
      })
    )
    .optional(),
  zusatz: z
    .object({
      titel: z.string(),
      sub: z.string(),
      karten: z.array(
        z.object({
          icon: z.string(),
          badge: z.string().optional(),
          name: z.string(),
          claim: z.string(),
          preisLabel: z.string().optional(),
          preisEinheit: z.string().optional(),
          notiz: z.string().optional(),
          features: z.array(z.string()),
          cta: z.string(),
          link: z.object({ text: z.string(), href: z.string() }).optional(),
        })
      ),
    })
    .optional(),
});

const setupEintrag = z.object({
  text: z.string().optional(),
  enthalten: z.boolean().default(true),
  notiz: z.string().optional(),
  tipp: z.string().optional(),
  info: z.boolean().optional(),
  erbt: z.string().optional(),
  hervor: z.boolean().optional(),
});

const pricingSetup = z.object({
  typ: z.literal("pricingSetup"),
  ...kopf,
  setup: z.object({ name: z.string(), tagline: z.string(), preis: z.string(), features: z.array(z.string()) }),
  pakete: z.array(
    z.object({
      name: z.string(),
      variante: z.enum(["neutral", "beliebt", "premium"]),
      badge: z.string().optional(),
      tagline: z.string(),
      monatlich: z.number(),
      jaehrlich: z.number(),
      spart: z.number(),
      prefix: z.string().optional(),
      cta: z.string(),
      inkludiert: z.array(setupEintrag),
      /** Runde 7: optional, der WhatsApp-Chatbot zeigt keinen Features-Block mehr */
      features: z.array(setupEintrag).optional(),
      /** Runde 4: eigener Kasten „Laufende Betreuung“ */
      betreuung: z.array(z.string()).optional(),
    })
  ),
  disclaimer: z.string(),
  vergleich: z
    .array(
      z.object({
        titel: z.string(),
        /** Piktogramme in den Gruppenköpfen entfallen seit 22.09.2026 */
        icon: z.string().optional(),
        zeilen: z.array(
          z.object({ label: z.string(), tipp: z.string().optional(), info: z.boolean().optional(), werte: z.array(z.string()) })
        ),
      })
    )
    .optional(),
});

const preiseAufAnfrage = z.object({
  typ: z.literal("preiseAufAnfrage"),
  ...kopf,
  punkte: z.array(z.string()),
  cta: z.string(),
});

const faq = z.object({
  typ: z.literal("faq"),
  ...kopf,
  fragen: z.array(z.object({ frage: z.string(), antwort: z.string() })),
});

const einsatzszenarien = z.object({
  typ: z.literal("einsatzszenarien"),
  ...kopf,
  hub: z.string(),
  knoten: z.array(
    z.object({
      pos: z.enum(["tl", "tr", "bl", "br"]),
      tag: z.string(),
      titel: z.string(),
      titelLang: z.string(),
      kurz: z.string(),
      lang: z.string(),
      icon: z.string(),
    })
  ),
});

const bildText = z.object({
  typ: z.literal("bildText"),
  ...kopf,
  absaetze: z.array(z.string()),
  bildLabel: z.string().default(""),
  bild: z.string().optional(),
  bildRechts: z.boolean().optional(),
  ctaText: z.string().optional(),
});

const featureGrid = z.object({
  typ: z.literal("featureGrid"),
  ...kopf,
  karten: z.array(
    z.object({ icon: z.string(), titel: z.string(), text: z.string(), highlight: z.boolean().optional(), tag: z.string().optional() })
  ),
});

const toolGrid = z.object({
  typ: z.literal("toolGrid"),
  ...kopf,
  karten: z.array(z.object({ icon: z.string(), titel: z.string(), text: z.string() })),
});

const kreislauf = z.object({
  typ: z.literal("kreislauf"),
  ...kopf,
  hubTitel: z.string(),
  hubText: z.string(),
  phasen: z.array(z.object({ nummer: z.string(), titel: z.string(), text: z.string(), legende: z.string(), frequenz: z.string() })),
  hinweis: z.string().optional(),
});

const kostenvergleich = z.object({
  typ: z.literal("kostenvergleich"),
  ...kopf,
  spalten: z.tuple([z.string(), z.string()]),
  kurzLabels: z.tuple([z.string(), z.string()]),
  zeilen: z.array(z.object({ label: z.string(), links: z.string(), rechts: z.string() })),
  fazit: z.string(),
});

const ersparnisRechner = z.object({
  typ: z.literal("ersparnisRechner"),
  ...kopf,
  hinweis: z.string(),
});

const branchen = z.object({
  typ: z.literal("branchen"),
  ...kopf,
  reihen: z.array(z.array(z.object({ icon: z.string(), label: z.string() }))),
});

const konversation = z.object({
  typ: z.literal("konversation"),
  eyebrow: z.string(),
  titelVor: z.string(),
  akzent: z.string(),
  titelNach: z.string(),
  intro: z.string(),
  schritte: z.array(
    z.object({
      icon: z.string(),
      titel: z.string(),
      text: z.string(),
      kern: z.boolean().optional(),
      tag: z.string().optional(),
      chips: z.array(z.string()).optional(),
    })
  ),
  abschluss: z.object({ icon: z.string(), titel: z.string(), text: z.string() }),
});

const anwendungsfaelle = z.object({
  typ: z.literal("anwendungsfaelle"),
  ...kopf,
  karten: z.array(z.object({ nummer: z.string(), icon: z.string(), titel: z.string(), text: z.string() })),
});

const ebenen = z.object({
  typ: z.literal("ebenen"),
  ...kopf,
  hinweis: z.string(),
  ebenen: z.array(
    z.object({ tag: z.string(), titel: z.string(), sub: z.string(), text: z.string(), stats: z.array(z.string()) })
  ),
});

const praxisbeispiele = z.object({
  typ: z.literal("praxisbeispiele"),
  titel: z.string(),
  intro: z.string().optional(),
  beispiele: z.array(z.object({ bild: z.string(), alt: z.string(), titel: z.string(), text: z.string() })),
});

const kennzahlen = z.object({
  typ: z.literal("kennzahlen"),
  titel: z.string(),
  intro: z.string().optional(),
  quelle: z.string().optional(),
  zahlen: z.array(z.object({ wert: z.string(), label: z.string() })),
});

const kontakt = z.object({ typ: z.literal("kontakt") });
const wissenTeaser = z.object({ typ: z.literal("wissenTeaser") });

export const sektion = z.discriminatedUnion("typ", [
  problemLoesung,
  trustbar,
  zeitstrahl,
  pricingPakete,
  pricingSetup,
  preiseAufAnfrage,
  faq,
  einsatzszenarien,
  bildText,
  featureGrid,
  toolGrid,
  kreislauf,
  kostenvergleich,
  ersparnisRechner,
  branchen,
  konversation,
  anwendungsfaelle,
  ebenen,
  kennzahlen,
  praxisbeispiele,
  kontakt,
  wissenTeaser,
]);

const leistungen = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/leistungen" }),
  schema: z.object({
    titel: z.string(),
    kategorie: z.enum(["it-infrastruktur", "ki-kommunikation", "webseiten"]),
    kategorieLabel: z.string(),
    reihenfolge: z.number(),
    kurz: z.string(),
    seo: z.object({ titel: z.string(), beschreibung: z.string() }),
    hero: z.object({
      headline: z.string(),
      subline: z.string(),
      zitat: z.string().optional(),
      cta: z.string().default("Anfragen"),
      visualLabel: z.string(),
    }),
    kontaktVorauswahl: z.object({ thema: z.string(), option: z.string().optional() }),
    wissenArtikel: z.array(z.string()).min(1),
    sektionen: z.array(sektion),
  }),
});

const seiten = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/seiten" }),
  schema: z.record(z.string(), z.any()),
});

const wissen = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/wissen" }),
  schema: z.object({
    titel: z.string(),
    seoTitel: z.string(),
    beschreibung: z.string(),
    teaser: z.string(),
    standfirst: z.string(),
    kategorie: z.string(),
    lesezeit: z.number(),
    datum: z.coerce.date(),
    icon: z.string(),
    featured: z.boolean().default(false),
    reihenfolge: z.number(),
    leistungen: z.array(z.string()).default([]),
    faq: z.array(z.object({ frage: z.string(), antwort: z.string() })),
    cta: z.object({ titel: z.string(), text: z.string(), link: z.string() }),
  }),
});

export const collections = { leistungen, seiten, wissen };
