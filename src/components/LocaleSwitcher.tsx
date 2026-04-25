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
    <div className="flex items-center gap-2 text-xs text-muted">
      <span className="sr-only">{t.label}</span>
      {locales.map((l) => {
        const href = `/${l}${pathWithoutLocale || ""}`;
        const active = l === locale;
        return (
          <a
            key={l}
            href={href}
            className={
              active
                ? "text-foreground font-medium"
                : "hover:text-foreground transition-colors duration-150"
            }
            hrefLang={l}
            lang={l}
          >
            {l === "en" ? t.en : t.vi}
          </a>
        );
      })}
    </div>
  );
}
