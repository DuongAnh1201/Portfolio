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
import about from "@/data/about.json";
import experience from "@/data/experience.json";
import education from "@/data/education.json";
import other from "@/data/other.json";

function aboutSocialHref(url: string, label: string): string {
  if (url.startsWith("http") || url.startsWith("mailto:")) return url;
  if (label === "Email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(url)) {
    return `mailto:${url}`;
  }
  return url;
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="max-w-2xl mx-auto px-6 py-16 space-y-14">
        {/* Header */}
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
            <Navbar />
          </div>
        </header>

        {/* About */}
        <Section id="about" title="About">
          <div className="space-y-3 text-sm leading-relaxed text-foreground/85">
            {about.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            {about.links.map((l) => {
              const href = aboutSocialHref(l.url, l.label);
              const openInNewTab = href.startsWith("http");
              return (
                <a
                  key={l.label}
                  href={href}
                  {...(openInNewTab
                    ? { target: "_blank" as const, rel: "noopener noreferrer" }
                    : {})}
                  className="text-muted hover:text-foreground transition-colors duration-150"
                  aria-label={l.label}
                >
                  <SocialIcon label={l.label} />
                </a>
              );
            })}
          </div>
          <LinkedInPostLink href={about.linkedinPost} />
        </Section>

        {/* Experience */}
        <Section id="experience" title="Experience">
          <Timeline entries={experience} />
        </Section>

        {/* Education */}
        <Section id="education" title="Education">
          <Timeline entries={education} />
        </Section>

        {/* Projects */}
        <Section id="projects" title="Projects">
          <ProjectList />
        </Section>

        {/* Writing */}
        <Section id="writing" title="Writing">
          <WritingList />
        </Section>

        {/* Reading */}
        <Section id="reading" title="Reading">
          <ReadingList />
        </Section>

        {/* Other */}
        <Section id="other" title="Other">
          <Timeline entries={other} />
        </Section>

        {/* Updates / Now */}
        <Section id="updates" title="Now">
          <UpdatesList />
        </Section>

        {/* Contact */}
        <Section id="contact" title="Contact">
          <Contact />
        </Section>

        {/* Footer */}
        <footer className="border-t border-border pt-6 text-xs text-muted">
          <p>Built with simplicity in mind.</p>
        </footer>
      </main>
    </div>
  );
}
