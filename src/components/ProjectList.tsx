import Image from "next/image";
import ExpandableList from "@/components/ExpandableList";
import LinkedInPostLink from "@/components/LinkedInPostLink";
import projects from "@/data/projects.json";

interface Project {
  title: string;
  description: string;
  link: string;
  image?: string;
  tags: string[];
  featured: boolean;
  linkedinPost?: string;
}

function ProjectItem({ p }: { p: Project }) {
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
      <LinkedInPostLink href={p.linkedinPost} />
    </>
  );
}

export default function ProjectList() {
  const sorted = [...(projects as Project[])].sort(
    (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
  );

  return (
    <ExpandableList
      className="space-y-5"
      items={sorted.map((p) => (
        <ProjectItem key={p.title} p={p} />
      ))}
    />
  );
}
