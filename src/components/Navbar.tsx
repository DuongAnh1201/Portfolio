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
  const labelById: Record<(typeof sectionIds)[number], string> = {
    about: nav.about,
    experience: nav.experience,
    education: nav.education,
    projects: nav.projects,
    writing: nav.writing,
    reading: nav.reading,
    other: nav.other,
    updates: nav.updates,
    contact: nav.contact,
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <nav className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
        {sectionIds.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className="hover:text-foreground transition-colors duration-150"
          >
            {labelById[id]}
          </a>
        ))}
      </nav>
      <LocaleSwitcher locale={locale} />
    </div>
  );
}
