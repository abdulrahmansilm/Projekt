/**
 * Sprachabhängiger Zugriff auf die Content Collections (Runde 8).
 * Fachartikel liegen je Sprache in einer eigenen Collection mit identischen Ids.
 */
import { getCollection, type CollectionEntry } from "astro:content";
import type { Sprache } from "./index";

export type Artikel = CollectionEntry<"wissen"> | CollectionEntry<"wissenEn">;

export async function artikelListe(lang: Sprache): Promise<Artikel[]> {
  const liste: Artikel[] = lang === "en" ? await getCollection("wissenEn") : await getCollection("wissen");
  return [...liste].sort((a, b) => a.data.reihenfolge - b.data.reihenfolge);
}
