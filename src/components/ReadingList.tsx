import ExpandableList from "@/components/ExpandableList";
import LinkedInPostLink from "@/components/LinkedInPostLink";
import reading from "@/data/reading.json";

interface Book {
  title: string;
  author: string;
  status: "reading" | "completed" | "to-read";
  notes: string;
  link: string;
  linkedinPost?: string;
}

const statusLabel: Record<string, string> = {
  reading: "Reading",
  completed: "Done",
  "to-read": "To Read",
};

function ReadingItem({ b }: { b: Book }) {
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
          [{statusLabel[b.status]}]
        </span>
      </div>
      {b.notes && (
        <p className="text-muted text-xs mt-0.5">{b.notes}</p>
      )}
      <LinkedInPostLink href={b.linkedinPost} />
    </div>
  );
}

export default function ReadingList() {
  const order: Record<string, number> = { reading: 0, completed: 1, "to-read": 2 };
  const sorted = [...(reading as Book[])].sort(
    (a, b) => (order[a.status] ?? 3) - (order[b.status] ?? 3)
  );

  return (
    <ExpandableList
      className="space-y-3"
      items={sorted.map((b) => (
        <ReadingItem key={b.title} b={b} />
      ))}
    />
  );
}
