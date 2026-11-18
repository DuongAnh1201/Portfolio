import ExpandableList from "@/components/ExpandableList";
import LinkedInPostLink from "@/components/LinkedInPostLink";
import { getReading } from "@/lib/content";
import type { Locale } from "@/lib/locale";
import type { Messages } from "@/lib/messages";

interface Book {
  title: string;
  author: string;
  status: "reading" | "completed" | "to-read";
  notes: string;
  link: string;
  linkedinPost?: string;
}

function statusLabel(
  status: Book["status"],
  messages: Messages
): string {
  const s = messages.readingStatus;
  if (status === "reading") return s.reading;
  if (status === "completed") return s.completed;
  return s["to-read"];
}

function ReadingItem({
  b,
  messages,
}: {
  b: Book;
  messages: Messages;
}) {
  return (
    <article className="entry">
      <p className="when">{statusLabel(b.status, messages)}</p>
      <h3>
        {b.link ? (
          <a href={b.link} target="_blank" rel="noopener noreferrer">
            {b.title}
          </a>
        ) : (
          b.title
        )}
      </h3>
      <p className="org">{b.author}</p>
      {b.notes && <p className="desc">{b.notes}</p>}
      <LinkedInPostLink href={b.linkedinPost} linkText={messages.linkedinPost} />
    </article>
  );
}

export default function ReadingList({
  locale,
  messages,
}: {
  locale: Locale;
  messages: Messages;
}) {
  const reading = getReading(locale) as Book[];
  const expand = messages.expandable;

  const order: Record<string, number> = { reading: 0, completed: 1, "to-read": 2 };
  const sorted = [...reading].sort(
    (a, b) => (order[a.status] ?? 3) - (order[b.status] ?? 3)
  );

  return (
    <ExpandableList
      showLess={expand.showLess}
      seeMoreTemplate={expand.seeMore}
      items={sorted.map((b) => (
        <ReadingItem key={b.title} b={b} messages={messages} />
      ))}
    />
  );
}
