/** Verbindet Klassenlisten, überspringt falsy-Werte. Bewusst ohne externe Abhängigkeit (clsx). */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

const datumFormatter = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export function formatiereDatum(datum: Date): string {
  return datumFormatter.format(datum);
}

export function euro(betrag: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(betrag);
}
