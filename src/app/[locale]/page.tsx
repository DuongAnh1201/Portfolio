import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import ThemeToggle from "@/components/ThemeToggle";
import LocaleSwitcher from "@/components/LocaleSwitcher";
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
    <>
      <Navbar locale={locale} messages={messages} />

      <main>
        <header className="hero">
          {about.avatar && (
            <figure className="portrait">
              <Image
                src={about.avatar}
                alt={`Portrait of ${about.name}`}
                width={304}
                height={304}
                priority
              />
            </figure>
          )}
          <h1>{about.name}</h1>
          <p className="kicker">{about.tagline}</p>
          <hr className="short-rule" />
          <p className="statement">
            {about.statement} <strong>{about.statementEmphasis}</strong>
          </p>
          <ul className="profile-links">
            {about.links.map((le) => {
              const href = aboutSocialHref(le.url, le.label);
              const openInNewTab = href.startsWith("http");
              return (
                <li key={le.label}>
                  <a
                    href={href}
                    {...(openInNewTab
                      ? { target: "_blank" as const, rel: "noopener noreferrer" }
                      : {})}
                  >
                    {le.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </header>

        <Section id="about" title={nav.about}>
          <div className="prose">
            {about.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <LinkedInPostLink href={about.linkedinPost} linkText={messages.linkedinPost} />
        </Section>

        <Section id="experience" title={nav.experience} tint>
          <Timeline entries={experience} locale={locale} messages={messages} />
        </Section>

        <Section id="education" title={nav.education}>
          <Timeline entries={education} locale={locale} messages={messages} />
        </Section>

        <Section id="projects" title={nav.projects} tint>
          <ProjectList locale={locale} />
        </Section>

        <Section id="writing" title={nav.writing}>
          <WritingList locale={locale} />
        </Section>

        <Section id="reading" title={nav.reading} tint>
          <ReadingList locale={locale} messages={messages} />
        </Section>

        <Section id="other" title={nav.other}>
          <Timeline entries={other} locale={locale} messages={messages} />
        </Section>

        <Section id="updates" title={nav.updates} tint>
          <UpdatesList locale={locale} messages={messages} />
        </Section>

        <Section id="contact" title={nav.contact}>
          <Contact contact={contact} messages={messages} />
        </Section>
      </main>

      <footer className="foot">
        <a href="#">© {new Date().getFullYear()} {about.name}</a>
        <ThemeToggle darkLabel={messages.theme.dark} lightLabel={messages.theme.light} />
        <LocaleSwitcher locale={locale} />
        <span>{messages.footer}</span>
      </footer>
    </>
  );
}
