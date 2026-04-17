interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export default function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-8">
      <h2 className="text-lg font-semibold mb-4 text-foreground">{title}</h2>
      {children}
    </section>
  );
}
