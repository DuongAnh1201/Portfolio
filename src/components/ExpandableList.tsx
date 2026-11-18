"use client";

import { useState } from "react";

const INITIAL_COUNT = 5;

interface ExpandableListProps {
  items: React.ReactNode[];
  className?: string;
  showLess: string;
  /** Template with `{n}` for the number of additional items. */
  seeMoreTemplate: string;
}

export default function ExpandableList({
  items,
  className = "entries",
  showLess,
  seeMoreTemplate,
}: ExpandableListProps) {
  const [expanded, setExpanded] = useState(false);
  const needsToggle = items.length > INITIAL_COUNT;
  const visible = expanded ? items : items.slice(0, INITIAL_COUNT);
  const moreCount = items.length - INITIAL_COUNT;
  const seeMoreLabel = seeMoreTemplate.replace("{n}", String(moreCount));

  return (
    <>
      <ul className={className}>
        {visible.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      {needsToggle && (
        <div className="more">
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="box-btn"
            aria-expanded={expanded}
          >
            {expanded ? showLess : seeMoreLabel}
          </button>
        </div>
      )}
    </>
  );
}
