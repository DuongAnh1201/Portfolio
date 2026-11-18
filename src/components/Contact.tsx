import LinkedInPostLink from "@/components/LinkedInPostLink";
import type { ContactData } from "@/lib/content";
import type { Messages } from "@/lib/messages";

export default function Contact({
  contact,
  messages,
}: {
  contact: ContactData;
  messages: Messages;
}) {
  return (
    <div className="text-center">
      <p className="prose">{contact.intro}</p>
      <div className="btn-row">
        <a className="btn" href={`mailto:${contact.email}`}>
          {contact.email}
        </a>
        {contact.links.map((l) => {
          const openInNewTab = l.url.startsWith("http");
          return (
            <a
              key={l.label}
              className="btn btn-line"
              href={l.url}
              {...(openInNewTab ? { target: "_blank" as const, rel: "noopener noreferrer" } : {})}
            >
              {l.label}
            </a>
          );
        })}
      </div>
      <LinkedInPostLink href={contact.linkedinPost} linkText={messages.linkedinPost} />
    </div>
  );
}
