import Image from "next/image";
import ExpandableList from "@/components/ExpandableList";
import LinkedInPostLink from "@/components/LinkedInPostLink";

export interface TimelineEntry {
  title: string;
  organization: string;
  start: string;
  end: string;
  description: string;
  tags: string[];
  /** School/org mark — shown left of the organization name (e.g. `/images/education/sfbu-logo.png`) */
  logo?: string;
  /** Photo strip under the entry */
  images?: string[];
  /** Link to a related LinkedIn post */
  linkedinPost?: string;
}

function formatDate(d: string): string {
  if (!d) return "Present";
  const [year, month] = d.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
}

function formatDateRange(start: string, end: string): string {
  const sameMonth = start === end;
  if (sameMonth) return formatDate(start);
  return `${formatDate(start)} — ${formatDate(end)}`;
}

function TimelineItem({ entry }: { entry: TimelineEntry }) {
  const isCurrent = !entry.end;
  const dateRange = formatDateRange(entry.start, entry.end);
  const gallery = (entry.images ?? []).filter(Boolean);

  return (
    <div className="relative pl-6">
      <div
        className={`absolute left-0 top-[7px] h-2 w-2 rounded-full ${
          isCurrent ? "bg-accent" : "bg-muted/40"
        }`}
      />
      <div className="absolute left-[3px] top-[15px] bottom-0 w-px bg-border" />

      <p className="text-xs text-muted">{dateRange}</p>
      <p className="font-medium text-sm mt-0.5">{entry.title}</p>

      <div className="flex items-center gap-2.5 mt-0.5 min-h-[1.25rem]">
        {entry.logo ? (
          <Image
            src={entry.logo}
            alt={`${entry.organization} logo`}
            width={28}
            height={28}
            className="rounded object-contain shrink-0 border border-border bg-background"
          />
        ) : null}
        <p className="text-sm text-muted">{entry.organization}</p>
      </div>

      {entry.description && (
        <p className="text-xs text-muted/80 mt-1 leading-relaxed">{entry.description}</p>
      )}
      {entry.tags.length > 0 && (
        <p className="text-xs text-muted/60 mt-1">{entry.tags.join(" · ")}</p>
      )}

      {gallery.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {gallery.map((src, i) => (
            <Image
              key={`${src}-${i}`}
              src={src}
              alt={`${entry.organization} — photo ${i + 1}`}
              width={176}
              height={110}
              className="rounded border border-border object-cover w-44 h-[6.875rem]"
            />
          ))}
        </div>
      )}
      <LinkedInPostLink href={entry.linkedinPost} />
    </div>
  );
}

interface TimelineProps {
  entries: TimelineEntry[];
}

export default function Timeline({ entries }: TimelineProps) {
  const sorted = [...entries].sort((a, b) => {
    const aEnd = a.end || "9999-12";
    const bEnd = b.end || "9999-12";
    if (aEnd !== bEnd) return bEnd.localeCompare(aEnd);
    return b.start.localeCompare(a.start);
  });

  return (
    <ExpandableList
      className="space-y-6"
      items={sorted.map((entry) => (
        <TimelineItem key={`${entry.title}-${entry.start}`} entry={entry} />
      ))}
    />
  );
}
