/** Plain, dot-separated labels. Boxes are reserved for things you can click. */
export default function Tags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <div className="tags">
      {tags.map((t, i) => (
        <span key={`${t}-${i}`} className="tag">
          {t}
        </span>
      ))}
    </div>
  );
}
