import Image from "next/image";
import ExpandableList from "@/components/ExpandableList";
import LinkedInPostLink from "@/components/LinkedInPostLink";
import type { Messages } from "@/lib/messages";
import type { Locale } from "@/lib/locale";

export interface TimelineEntry {
  title: string;
  organization: string;
  start: string;
  end: string;
  /** Plain paragraph (e.g. education). Use string[] for resume-style bullets (experience, other). */
  description: string | string[];
  tags: string[];
  /** School/org mark — shown left of the organization name (e.g. `/images/education/sfbu-logo.png`) */
  logo?: string;
  /** Photo strip under the entry */
  images?: string[];
  /** Link to a related LinkedIn post */
  linkedinPost?: string;
}

function formatDate(
  d: string,
  locale: Locale,
  presentLabel: string
): string {
  if (!d) return presentLabel;
  if (!/^\d{4}-\d{2}$/.test(d)) {
    if (d.includes("Estimated") && locale === "vi") {
      return d.replace("Estimated", "Dự kiến");
    }
    return d;
  }
  const [year, month] = d.split("-");
  const m = parseInt(month, 10);
  if (Number.isNaN(m) || m < 1 || m > 12) return d;
  const date = new Date(Number(year), m - 1, 1);
  return date.toLocaleString(locale === "vi" ? "vi-VN" : "en-US", {
    month: "short",
    year: "numeric",
  });
}

function formatDateRange(
  start: string,
  end: string,
  locale: Locale,
  presentLabel: string
): string {
  const same = start === end;
  if (same) return formatDate(start, locale, presentLabel);
  return `${formatDate(start, locale, presentLabel)} — ${formatDate(end, locale, presentLabel)}`;
}

function TimelineItem({
  entry,
  locale,
  messages,
}: {
  entry: TimelineEntry;
  locale: Locale;
  messages: Messages;
}) {
  const isCurrent = !entry.end;
  const presentLabel = messages.timeline.present;
  const dateRange = formatDateRange(entry.start, entry.end, locale, presentLabel);
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

      {typeof entry.description === "string" ? (
        entry.description ? (
          <p className="text-xs text-muted/80 mt-1 leading-relaxed">{entry.description}</p>
        ) : null
      ) : (
        entry.description.length > 0 && (
          <ul className="mt-1.5 list-disc list-outside pl-5 space-y-1 text-xs text-muted/80 leading-relaxed marker:text-muted">
            {entry.description.map((line, i) => (
              <li key={i} className="pl-0.5">
                {line}
              </li>
            ))}
          </ul>
        )
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
      <LinkedInPostLink
        href={entry.linkedinPost}
        linkText={messages.linkedinPost}
      />
    </div>
  );
}

interface TimelineProps {
  entries: TimelineEntry[];
  locale: Locale;
  messages: Messages;
}

export default function Timeline({ entries, locale, messages }: TimelineProps) {
  const sorted = [...entries].sort((a, b) => {
    const aEnd = a.end || "9999-12";
    const bEnd = b.end || "9999-12";
    if (aEnd !== bEnd) return bEnd.localeCompare(aEnd);
    return b.start.localeCompare(a.start);
  });
  const expand = messages.expandable;

  return (
    <ExpandableList
      className="space-y-6"
      showLess={expand.showLess}
      seeMoreTemplate={expand.seeMore}
      items={sorted.map((entry) => (
        <TimelineItem
          key={`${entry.title}-${entry.start}`}
          entry={entry}
          locale={locale}
          messages={messages}
        />
      ))}
    />
  );
}
