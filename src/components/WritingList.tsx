import Image from "next/image";
import ExpandableList from "@/components/ExpandableList";
import LinkedInPostLink from "@/components/LinkedInPostLink";
import { getMessages } from "@/lib/messages";
import { getWriting } from "@/lib/content";
import type { Locale } from "@/lib/locale";

interface Article {
  title: string;
  date: string;
  link: string;
  image?: string;
  summary: string;
  linkedinPost?: string;
}

function WritingItem({
  w,
  linkText,
}: {
  w: Article;
  linkText: string;
}) {
  const href = w.link?.trim();
  return (
    <article className="entry">
      {w.image && (
        <figure className="figure">
          <Image src={w.image} alt={w.title} width={1120} height={560} />
        </figure>
      )}
      <p className="when">
        <time dateTime={w.date}>{w.date}</time>
      </p>
      <h3>{href ? <a href={href}>{w.title}</a> : w.title}</h3>
      {w.summary && <p className="desc">{w.summary}</p>}
      <LinkedInPostLink href={w.linkedinPost} linkText={linkText} />
    </article>
  );
}

export default function WritingList({ locale }: { locale: Locale }) {
  const writing = getWriting(locale) as Article[];
  const messages = getMessages(locale);
  const linkText = messages.linkedinPost;
  const expand = messages.expandable;

  const sorted = [...writing].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <ExpandableList
      showLess={expand.showLess}
      seeMoreTemplate={expand.seeMore}
      items={sorted.map((w) => (
        <WritingItem key={w.title} w={w} linkText={linkText} />
      ))}
    />
  );
}
