import ExpandableList from "@/components/ExpandableList";
import LinkedInPostLink from "@/components/LinkedInPostLink";
import { getUpdates } from "@/lib/content";
import type { Locale } from "@/lib/locale";
import type { Messages } from "@/lib/messages";

interface Update {
  date: string;
  content: string;
  linkedinPost?: string;
}

function UpdateItem({
  u,
  linkText,
}: {
  u: Update;
  linkText: string;
}) {
  return (
    <div className="text-sm">
      <time className="text-xs text-muted">{u.date}</time>
      <p className="text-foreground mt-0.5">{u.content}</p>
      <LinkedInPostLink href={u.linkedinPost} linkText={linkText} />
    </div>
  );
}

export default function UpdatesList({
  locale,
  messages,
}: {
  locale: Locale;
  messages: Messages;
}) {
  const updates = getUpdates(locale) as Update[];
  const linkText = messages.linkedinPost;
  const expand = messages.expandable;

  const sorted = [...updates].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <ExpandableList
      className="space-y-3"
      showLess={expand.showLess}
      seeMoreTemplate={expand.seeMore}
      items={sorted.map((u, i) => (
        <UpdateItem key={i} u={u} linkText={linkText} />
      ))}
    />
  );
}
