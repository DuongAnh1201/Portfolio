import Image from "next/image";
import ExpandableList from "@/components/ExpandableList";
import Description from "@/components/Description";
import Tags from "@/components/Tags";
import type { Messages } from "@/lib/messages";
import { getMessages } from "@/lib/messages";
import { getProjects } from "@/lib/content";
import type { Locale } from "@/lib/locale";

interface Project {
  title: string;
  description: string | string[];
  link: string;
  image?: string;
  tags: string[];
  featured: boolean;
  linkedinPost?: string;
}

function ProjectItem({
  p,
  messages,
}: {
  p: Project;
  messages: Messages;
}) {
  const href = p.link?.trim();
  const post = p.linkedinPost?.trim();
  return (
    <article className="entry">
      {p.image && (
        <figure className="figure">
          <Image src={p.image} alt={p.title} width={1120} height={560} />
        </figure>
      )}
      <p className="when">
        {p.featured ? `★ ${messages.featured} · ` : ""}
        {messages.project}
      </p>
      <h3>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {p.title}
          </a>
        ) : (
          p.title
        )}
      </h3>
      <Description value={p.description} />
      <Tags tags={p.tags} />
      {(href || post) && (
        <div className="links">
          {href && (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {href.includes("github.com") ? "Code" : messages.view}
            </a>
          )}
          {post && (
            <a href={post} target="_blank" rel="noopener noreferrer">
              {messages.linkedinPost}
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export default function ProjectList({ locale }: { locale: Locale }) {
  const projects = getProjects(locale) as Project[];
  const messages = getMessages(locale);
  const expand = messages.expandable;

  const sorted = [...projects].sort(
    (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
  );

  return (
    <ExpandableList
      showLess={expand.showLess}
      seeMoreTemplate={expand.seeMore}
      items={sorted.map((p) => (
        <ProjectItem key={p.title} p={p} messages={messages} />
      ))}
    />
  );
}
