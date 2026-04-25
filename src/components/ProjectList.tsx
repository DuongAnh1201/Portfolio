import Image from "next/image";
import ExpandableList from "@/components/ExpandableList";
import LinkedInPostLink from "@/components/LinkedInPostLink";
import { getMessages } from "@/lib/messages";
import { getProjects } from "@/lib/content";
import type { Locale } from "@/lib/locale";

interface Project {
  title: string;
  description: string;
  link: string;
  image?: string;
  tags: string[];
  featured: boolean;
  linkedinPost?: string;
}

function ProjectItem({
  p,
  linkText,
}: {
  p: Project;
  linkText: string;
}) {
  return (
    <>
      {p.image && (
        <a href={p.link} target="_blank" rel="noopener noreferrer">
          <Image
            src={p.image}
            alt={p.title}
            width={680}
            height={340}
            className="rounded mb-2 w-full h-auto object-cover"
          />
        </a>
      )}
      <div className="flex items-baseline gap-2">
        <a
          href={p.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline font-medium"
        >
          {p.title}
        </a>
        {p.featured && (
          <span className="text-xs text-muted">★</span>
        )}
      </div>
      <p className="text-sm text-muted mt-0.5">{p.description}</p>
      {p.tags.length > 0 && (
        <p className="text-xs text-muted/70 mt-1">
          {p.tags.join(" · ")}
        </p>
      )}
      <LinkedInPostLink href={p.linkedinPost} linkText={linkText} />
    </>
  );
}

export default function ProjectList({ locale }: { locale: Locale }) {
  const projects = getProjects(locale) as Project[];
  const messages = getMessages(locale);
  const linkText = messages.linkedinPost;
  const expand = messages.expandable;

  const sorted = [...projects].sort(
    (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
  );

  return (
    <ExpandableList
      className="space-y-5"
      showLess={expand.showLess}
      seeMoreTemplate={expand.seeMore}
      items={sorted.map((p) => (
        <ProjectItem key={p.title} p={p} linkText={linkText} />
      ))}
    />
  );
}
