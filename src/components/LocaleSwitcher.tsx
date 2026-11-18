"use client";

import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/locale";
import { getMessages } from "@/lib/messages";

export default function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const t = getMessages(locale).langSwitcher;
  const parts = pathname.split("/").filter(Boolean);
  const hasLocale = locales.includes(parts[0] as Locale);
  const rest = hasLocale ? parts.slice(1) : parts;
  const pathWithoutLocale = rest.length > 0 ? `/${rest.join("/")}` : "";

  return (
    <span className="locale" role="group" aria-label={t.label}>
      {locales.map((l) => (
        <a
          key={l}
          href={`/${l}${pathWithoutLocale}`}
          aria-current={l === locale ? "true" : undefined}
          hrefLang={l}
          lang={l}
        >
          {l === "en" ? "EN" : "VI"}
        </a>
      ))}
    </span>
  );
}
