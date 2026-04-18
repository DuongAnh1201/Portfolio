import ExpandableList from "@/components/ExpandableList";
import LinkedInPostLink from "@/components/LinkedInPostLink";
import updates from "@/data/updates.json";

interface Update {
  date: string;
  content: string;
  linkedinPost?: string;
}

function UpdateItem({ u }: { u: Update }) {
  return (
    <div className="text-sm">
      <time className="text-xs text-muted">{u.date}</time>
      <p className="text-foreground mt-0.5">{u.content}</p>
      <LinkedInPostLink href={u.linkedinPost} />
    </div>
  );
}

export default function UpdatesList() {
  const sorted = [...(updates as Update[])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <ExpandableList
      className="space-y-3"
      items={sorted.map((u, i) => (
        <UpdateItem key={i} u={u} />
      ))}
    />
  );
}
