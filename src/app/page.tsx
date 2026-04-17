import Image from "next/image";
import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import Timeline from "@/components/Timeline";
import ProjectList from "@/components/ProjectList";
import WritingList from "@/components/WritingList";
import ReadingList from "@/components/ReadingList";
import UpdatesList from "@/components/UpdatesList";
import Contact from "@/components/Contact";
import about from "@/data/about.json";
import experience from "@/data/experience.json";
import education from "@/data/education.json";
import other from "@/data/other.json";

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
          <div className="flex gap-4 mt-4 text-sm">
            {about.links.map((l) => (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                {l.label}
              </a>
            ))}
          </div>
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
