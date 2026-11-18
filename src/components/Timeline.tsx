import Image from "next/image";
import ExpandableList from "@/components/ExpandableList";
import LinkedInPostLink from "@/components/LinkedInPostLink";
import Description from "@/components/Description";
import Tags from "@/components/Tags";
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
  const presentLabel = messages.timeline.present;
  const dateRange = formatDateRange(entry.start, entry.end, locale, presentLabel);
  const gallery = (entry.images ?? []).filter(Boolean);

  return (
    <article className="entry">
      <p className="when">{dateRange}</p>
      <h3>{entry.title}</h3>
      <p className="org">
        {entry.logo ? (
          <Image
            src={entry.logo}
            alt={`${entry.organization} logo`}
            width={28}
            height={28}
          />
        ) : null}
        <span>{entry.organization}</span>
      </p>
      <Description value={entry.description} />
      <Tags tags={entry.tags} />
      {gallery.length > 0 && (
        <div className="gallery">
          {gallery.map((src, i) => (
            <Image
              key={`${src}-${i}`}
              src={src}
              alt={`${entry.organization} — photo ${i + 1}`}
              width={352}
              height={220}
            />
          ))}
        </div>
      )}
      <LinkedInPostLink href={entry.linkedinPost} linkText={messages.linkedinPost} />
    </article>
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
