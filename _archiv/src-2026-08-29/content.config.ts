import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const featureItem = z.object({
  text: z.string(),
  status: z.enum(["ja", "nein", "text"]),
  wert: z.string().optional(),
});

const pricingTier = z.object({
  name: z.string(),
  variante: z.enum(["neutral", "beliebt", "premium"]),
  badge: z.string().optional(),
  zielgruppe: z.string().optional(),
  claim: z.string(),
  preis_haupt: z.string(),
  preis_zusatz: z.string().optional(),
  preis_jaehrlich: z.string().optional(),
  reaktionszeit: z.string().optional(),
  support_kanal: z.string().optional(),
  laufzeit: z.string().optional(),
  features: z.array(featureItem).default([]),
  cta_text: z.string().default("Jetzt anfragen"),
});

const zeitstrahlSchritt = z.object({
  nummer: z.string().optional(),
  titel: z.string(),
  beschreibung: z.string(),
  rhythmus: z.string().optional(),
});

const addon = z.object({
  titel: z.string(),
  badge: z.string().optional(),
  claim: z.string(),
  features: z.array(z.string()).default([]),
  cta_text: z.string().default("Jetzt anfragen"),
});

const roiRechner = z.object({
  einheit_label: z.string(),
  einheit_default: z.number(),
  einheit_min: z.number(),
  einheit_max: z.number(),
  dauer_label: z.string(),
  dauer_default: z.number(),
  dauer_min: z.number(),
  dauer_max: z.number(),
  anteil_label: z.string(),
  anteil_default: z.number(),
  stundenlohn_label: z.string(),
  stundenlohn_default: z.number(),
  fusszeile: z.string().optional(),
});

const stufe = z.object({ titel: z.string(), beschreibung: z.string() });

const leistungen = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/leistungen" }),
  schema: z.object({
    titel: z.string(),
    kategorie: z.enum(["it-managed-services", "cloud-sicherheit", "digitalisierung", "ki-assistenten"]),
    reihenfolge: z.number(),
    kurz: z.string(),
    seo_title: z.string(),
    seo_description: z.string(),
    seo_keywords: z.array(z.string()).default([]),

    hero_headline: z.string().optional(),
    hero_zitat: z.string().optional(),
    hero_audio: z.boolean().default(false),
    hero_audio_transkript: z.array(z.object({ sprecher: z.enum(["anrufer", "assistent"]), text: z.string() })).optional(),
    hero_mockup_chat: z.array(z.object({ von: z.enum(["kunde", "bot"]), text: z.string() })).optional(),

    zeitstrahl: z
      .object({
        typ: z.enum(["linear", "zyklisch"]),
        tag: z.string(),
        titel: z.string(),
        untertitel: z.string().optional(),
        schritte: z.array(zeitstrahlSchritt),
      })
      .optional(),

    pricing: z
      .object({
        tiers: z.array(pricingTier),
        einrichtungsgebuehr: z.string().optional(),
        monatlich_jaehrlich_umschalter: z.boolean().default(false),
        jaehrlich_rabatt_hinweis: z.string().optional(),
      })
      .optional(),

    pricing_hinweis: z.string().optional(),

    addons: z.array(addon).default([]),

    vergleich: z
      .object({
        ohne_titel: z.string(),
        ohne_punkte: z.array(z.string()),
        mit_titel: z.string(),
        mit_punkte: z.array(z.string()),
      })
      .optional(),

    kennzahlen: z.array(z.object({ zahl: z.string(), beschreibung: z.string() })).optional(),

    statistik_sektion: z
      .object({
        titel: z.string(),
        quelle: z.string(),
        kennzahlen: z.array(z.object({ zahl: z.string(), beschreibung: z.string() })),
        methoden: z.array(z.object({ label: z.string(), anteil: z.string() })).optional(),
      })
      .optional(),

    ablauf_sektion: z.object({ titel: z.string(), schritte: z.array(stufe) }).optional(),

    anwendungsfaelle: z.array(stufe).optional(),
    anwendungen: z.array(stufe).optional(),
    was_wird_gesichert: z.array(stufe).optional(),

    detail_tabelle: z
      .array(z.object({ bereich: z.string(), uebernehmen: z.string(), ergebnis: z.string() }))
      .optional(),

    kostenvergleich_tabelle: z
      .object({
        spalte_links: z.string(),
        spalte_rechts: z.string(),
        zeilen: z.array(z.object({ label: z.string(), links: z.string(), rechts: z.string() })),
        claim: z.string().optional(),
      })
      .optional(),

    geo_sektion: z.object({ titel: z.string(), text: z.string() }).optional(),

    bundle: z.object({ titel: z.string(), beschreibung: z.string(), cta_text: z.string() }).optional(),

    trust_bar: z.array(z.string()).optional(),
    trust_bar_hinweis: z.string().optional(),

    branchen_sektion: z.array(z.string()).default([]),

    roi_rechner: roiRechner.optional(),

    cross_sell: z.object({ text: z.string(), cta_text: z.string(), ziel_slug: z.string() }).optional(),

    lead_magnet: z.object({ typ: z.string(), text: z.string() }).optional(),

    vorteile: z.array(z.string()).default([]),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/faq" }),
  schema: z.object({
    frage: z.string(),
    bereich: z.enum(["startseite", "leistung"]),
    leistung_slug: z.string().optional(),
    reihenfolge: z.number().default(0),
  }),
});

const wissen = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/wissen" }),
  schema: z.object({
    titel: z.string(),
    beschreibung: z.string(),
    datum: z.coerce.date(),
    leistung_slugs: z.array(z.string()).default([]),
    seo_title: z.string(),
    seo_description: z.string(),
  }),
});

const zitate = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/zitate" }),
  schema: z.object({
    leistung_slug: z.string(),
    text: z.string(),
    bestaetigt: z.boolean().default(false),
    kategorie_tag: z.string(),
  }),
});

export const collections = { leistungen, faq, wissen, zitate };
