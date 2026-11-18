interface SectionProps {
  id: string;
  title: string;
  /** Alternate background band, as in the Sciencefolio layout */
  tint?: boolean;
  children: React.ReactNode;
}

export default function Section({ id, title, tint = false, children }: SectionProps) {
  const headingId = `${id}-h`;
  return (
    <section id={id} className={`section${tint ? " tint" : ""}`} aria-labelledby={headingId}>
      <div className="wrap">
        <div className="section-head">
          <h2 id={headingId}>{title}</h2>
          <hr className="short-rule" />
        </div>
        {children}
      </div>
    </section>
  );
}
