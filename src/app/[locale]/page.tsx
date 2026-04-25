import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import SocialIcon from "@/components/SocialIcon";
import Timeline from "@/components/Timeline";
import ProjectList from "@/components/ProjectList";
import WritingList from "@/components/WritingList";
import ReadingList from "@/components/ReadingList";
import UpdatesList from "@/components/UpdatesList";
import Contact from "@/components/Contact";
import LinkedInPostLink from "@/components/LinkedInPostLink";
import {
  getAbout,
  getContact,
  getEducation,
  getExperience,
  getOther,
} from "@/lib/content";
import { getMessages } from "@/lib/messages";
import { isLocale, type Locale } from "@/lib/locale";

function aboutSocialHref(url: string, label: string): string {
  if (url.startsWith("http") || url.startsWith("mailto:")) return url;
  if (label === "Email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(url)) {
    return `mailto:${url}`;
  }
  return url;
}

type PageProps = { params: Promise<{ locale: string }> };

export default async function Home({ params }: PageProps) {
  const { locale: l } = await params;
  if (!isLocale(l)) {
    notFound();
  }
  const locale = l as Locale;
  const about = getAbout(locale);
  const experience = getExperience(locale);
  const education = getEducation(locale);
  const other = getOther(locale);
  const contact = getContact(locale);
  const messages = getMessages(locale);
  const nav = messages.nav;

  return (
    <div className="min-h-screen">
      <main className="max-w-2xl mx-auto px-6 py-16 space-y-14">
        <header>
          <div className="flex items-center gap-4">
            {about.avatar && (
              <Image
                src={about.avatar}
                alt={about.name}
                width={56}
                height={56}
                className="rounded-full object-cover"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{about.name}</h1>
              <p className="text-muted mt-1 text-sm">{about.tagline}</p>
            </div>
          </div>
          <div className="mt-4">
            <Navbar locale={locale} messages={messages} />
          </div>
        </header>

        <Section id="about" title={nav.about}>
          <div className="space-y-3 text-sm leading-relaxed text-foreground/85">
            {about.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            {about.links.map((le) => {
              const href = aboutSocialHref(le.url, le.label);
              const openInNewTab = href.startsWith("http");
              return (
                <a
                  key={le.label}
                  href={href}
                  {...(openInNewTab
                    ? { target: "_blank" as const, rel: "noopener noreferrer" }
                    : {})}
                  className="text-muted hover:text-foreground transition-colors duration-150"
                  aria-label={le.label}
                >
                  <SocialIcon label={le.label} />
                </a>
              );
            })}
          </div>
          <LinkedInPostLink href={about.linkedinPost} linkText={messages.linkedinPost} />
        </Section>

        <Section id="experience" title={nav.experience}>
          <Timeline entries={experience} locale={locale} messages={messages} />
        </Section>

        <Section id="education" title={nav.education}>
          <Timeline entries={education} locale={locale} messages={messages} />
        </Section>

        <Section id="projects" title={nav.projects}>
          <ProjectList locale={locale} />
        </Section>

        <Section id="writing" title={nav.writing}>
          <WritingList locale={locale} />
        </Section>

        <Section id="reading" title={nav.reading}>
          <ReadingList locale={locale} messages={messages} />
        </Section>

        <Section id="other" title={nav.other}>
          <Timeline entries={other} locale={locale} messages={messages} />
        </Section>

        <Section id="updates" title={nav.updates}>
          <UpdatesList locale={locale} messages={messages} />
        </Section>

        <Section id="contact" title={nav.contact}>
          <Contact contact={contact} messages={messages} />
        </Section>

        <footer className="border-t border-border pt-6 text-xs text-muted">
          <p>{messages.footer}</p>
        </footer>
      </main>
    </div>
  );
}
