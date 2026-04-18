import LinkedInPostLink from "@/components/LinkedInPostLink";
import contact from "@/data/contact.json";

export default function Contact() {
  return (
    <div>
      <p className="text-sm text-muted mb-3">{contact.intro}</p>
      <p className="text-sm">
        <a href={`mailto:${contact.email}`} className="text-accent hover:underline">
          {contact.email}
        </a>
      </p>
      <div className="flex gap-4 mt-3 text-sm">
        {contact.links.map((l) => {
          const openInNewTab = l.url.startsWith("http");
          return (
            <a
              key={l.label}
              href={l.url}
              {...(openInNewTab
                ? { target: "_blank" as const, rel: "noopener noreferrer" }
                : {})}
              className="text-accent hover:underline"
            >
              {l.label}
            </a>
          );
        })}
      </div>
      <LinkedInPostLink href={contact.linkedinPost} />
    </div>
  );
}
