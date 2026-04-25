export const locales = ["en", "vi"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(s: string): s is Locale {
  return (locales as readonly string[]).includes(s);
}
