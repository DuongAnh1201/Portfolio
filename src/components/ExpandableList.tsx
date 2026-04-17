"use client";

import { useState } from "react";

const INITIAL_COUNT = 5;

interface ExpandableListProps {
  items: React.ReactNode[];
  className?: string;
}

export default function ExpandableList({ items, className = "space-y-4" }: ExpandableListProps) {
  const [expanded, setExpanded] = useState(false);
  const needsToggle = items.length > INITIAL_COUNT;
  const visible = expanded ? items : items.slice(0, INITIAL_COUNT);

  return (
    <>
      <ul className={className}>
        {visible.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      {needsToggle && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-3 text-sm text-accent hover:underline cursor-pointer"
        >
          {expanded ? "show less" : `see more... (${items.length - INITIAL_COUNT} more)`}
        </button>
      )}
    </>
  );
}
