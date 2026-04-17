const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "writing", label: "Writing" },
  { id: "reading", label: "Reading" },
  { id: "other", label: "Other" },
  { id: "updates", label: "Now" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <nav className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="hover:text-foreground transition-colors duration-150"
        >
          {s.label}
        </a>
      ))}
    </nav>
  );
}
