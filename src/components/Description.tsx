/** A paragraph, or resume-style bullets when given an array. */
export default function Description({ value }: { value: string | string[] }) {
  if (typeof value === "string") {
    return value ? <p className="desc">{value}</p> : null;
  }
  if (value.length === 0) return null;
  return (
    <ul className="bullets">
      {value.map((line, i) => (
        <li key={i}>{line}</li>
      ))}
    </ul>
  );
}
