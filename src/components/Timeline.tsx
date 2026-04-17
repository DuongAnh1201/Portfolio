import ExpandableList from "@/components/ExpandableList";

export interface TimelineEntry {
  title: string;
  organization: string;
  start: string;
  end: string;
  description: string;
  tags: string[];
}

function formatDate(d: string): string {
  if (!d) return "Present";
  const [year, month] = d.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

function TimelineItem({ entry }: { entry: TimelineEntry }) {
  const isCurrent = !entry.end;
  const sameMonth = entry.start === entry.end;
  const dateRange = sameMonth
    ? formatDate(entry.start)
    : `${formatDate(entry.start)} — ${formatDate(entry.end)}`;

  return (
    <div className="relative pl-6">
      {/* Dot */}
      <div
        className={`absolute left-0 top-[7px] h-2 w-2 rounded-full ${
          isCurrent ? "bg-accent" : "bg-muted/40"
        }`}
      />
      {/* Vertical line segment */}
      <div className="absolute left-[3px] top-[15px] bottom-0 w-px bg-border" />

      <p className="text-xs text-muted">{dateRange}</p>
      <p className="font-medium text-sm mt-0.5">{entry.title}</p>
      <p className="text-sm text-muted">{entry.organization}</p>
      {entry.description && (
        <p className="text-xs text-muted/80 mt-1 leading-relaxed">{entry.description}</p>
      )}
      {entry.tags.length > 0 && (
        <p className="text-xs text-muted/60 mt-1">{entry.tags.join(" · ")}</p>
      )}
    </div>
  );
}

interface TimelineProps {
  entries: TimelineEntry[];
}

export default function Timeline({ entries }: TimelineProps) {
  const sorted = [...entries].sort(
    (a, b) => {
      const aEnd = a.end || "9999-12";
      const bEnd = b.end || "9999-12";
      if (aEnd !== bEnd) return bEnd.localeCompare(aEnd);
      return b.start.localeCompare(a.start);
    }
  );

  return (
    <ExpandableList
      className="space-y-6"
      items={sorted.map((entry) => (
        <TimelineItem key={`${entry.title}-${entry.start}`} entry={entry} />
      ))}
    />
  );
}
