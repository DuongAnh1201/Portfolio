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
    <div className="text-sm">
      <div className="flex items-baseline gap-2">
        {b.link ? (
          <a
            href={b.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline font-medium"
          >
            {b.title}
          </a>
        ) : (
          <span className="font-medium">{b.title}</span>
        )}
        <span className="text-xs text-muted">
          — {b.author}
        </span>
        <span className="text-xs text-muted/60">
          [{statusLabel(b.status, messages)}]
        </span>
      </div>
      {b.notes && (
        <p className="text-muted text-xs mt-0.5">{b.notes}</p>
      )}
      <LinkedInPostLink
        href={b.linkedinPost}
        linkText={messages.linkedinPost}
      />
    </div>
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
      className="space-y-3"
      showLess={expand.showLess}
      seeMoreTemplate={expand.seeMore}
      items={sorted.map((b) => (
        <ReadingItem key={b.title} b={b} messages={messages} />
      ))}
    />
  );
}
