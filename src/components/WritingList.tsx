import Image from "next/image";
import ExpandableList from "@/components/ExpandableList";
import LinkedInPostLink from "@/components/LinkedInPostLink";
import writing from "@/data/writing.json";

interface Article {
  title: string;
  date: string;
  link: string;
  image?: string;
  summary: string;
  linkedinPost?: string;
}

function WritingItem({ w }: { w: Article }) {
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
      <LinkedInPostLink href={w.linkedinPost} />
    </>
  );
}

export default function WritingList() {
  const sorted = [...(writing as Article[])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <ExpandableList
      className="space-y-5"
      items={sorted.map((w) => (
        <WritingItem key={w.title} w={w} />
      ))}
    />
  );
}
