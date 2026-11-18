import type { Messages } from "@/lib/messages";
import type { Locale } from "@/lib/locale";
import LocaleSwitcher from "@/components/LocaleSwitcher";

const sectionIds = [
  "about",
  "experience",
  "education",
  "projects",
  "writing",
  "reading",
  "other",
  "updates",
  "contact",
] as const;

export default function Navbar({ locale, messages }: { locale: Locale; messages: Messages }) {
  const nav = messages.nav;
  return (
    <nav className="nav" aria-label="Main">
      {sectionIds.map((id) => (
        <a key={id} href={`#${id}`}>
          {nav[id]}
        </a>
      ))}
      <LocaleSwitcher locale={locale} />
    </nav>
  );
}
