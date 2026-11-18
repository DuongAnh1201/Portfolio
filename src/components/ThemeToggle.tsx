"use client";

import { useSyncExternalStore } from "react";

/** The theme lives on <html data-theme>, set before paint by the script in the root layout. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const isDark = () => document.documentElement.dataset.theme === "dark";

export default function ThemeToggle({ darkLabel, lightLabel }: { darkLabel: string; lightLabel: string }) {
  const dark = useSyncExternalStore(subscribe, isDark, () => false);

  function toggle() {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  return (
    <button type="button" className="toggle" aria-pressed={dark} onClick={toggle}>
      <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M8 1.5a6.5 6.5 0 0 0 0 13z" fill="currentColor" />
      </svg>
      {dark ? lightLabel : darkLabel}
    </button>
  );
}
