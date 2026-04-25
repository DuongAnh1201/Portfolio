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
  return (
    <>
      {w.image && (
        <a href={w.link}>
          <Image
            src={w.image}
            alt={w.title}
            width={680}
            height={340}
            className="rounded mb-2 w-full h-auto object-cover"
          />
        </a>
      )}
      <div className="flex items-baseline justify-between gap-4">
        <a
          href={w.link}
          className="text-accent hover:underline font-medium"
        >
          {w.title}
        </a>
        <time className="text-xs text-muted shrink-0">{w.date}</time>
      </div>
      <p className="text-sm text-muted mt-0.5">{w.summary}</p>
      <LinkedInPostLink href={w.linkedinPost} linkText={linkText} />
    </>
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
      className="space-y-5"
      showLess={expand.showLess}
      seeMoreTemplate={expand.seeMore}
      items={sorted.map((w) => (
        <WritingItem key={w.title} w={w} linkText={linkText} />
      ))}
    />
  );
}
