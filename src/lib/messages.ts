import type { Locale } from "./locale";
import en from "@/messages/en.json";
import vi from "@/messages/vi.json";

export type Messages = typeof en;

const map: Record<Locale, Messages> = { en, vi };

export function getMessages(locale: Locale): Messages {
  return map[locale] ?? en;
}
