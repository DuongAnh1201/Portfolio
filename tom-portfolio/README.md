# Tom Nguyen — Portfolio (design handoff)

One-page personal portfolio in a premium product-launch style: restrained, centered, lots of space. EN/VI bilingual.

## What's in here

```
site/            Working static site. Open site/index.html in a browser — no build step.
  index.html       English
  index-vi.html    Vietnamese (the EN/VI switch links between the two)
content/
  content.en.json  All page copy + data (projects, experience, awards, writing, now, footer)
  content.vi.json  Same structure, Vietnamese
design/          Source from the Claude Design canvas (reference only)
  Main.dc.html     Desktop/fluid page as a Design Component (template + data in the <script>)
  Mobile.dc.html   390px frame that imports Main
  canvas.json      Canvas layout
```

`site/` is the source of truth for how it should look and behave. `design/*.dc.html` uses a proprietary runtime (`support.js`) that is NOT included, so those files won't render on their own.

## Suggested task for Claude Code

> Rebuild `site/index.html` as a maintainable project (Astro or Next.js static export, my choice: ___). Keep the look pixel-close to `site/index.html` at 1440px and 390px. Drive all copy from `content/content.{en,vi}.json` with routes `/` and `/vi`. Split each project demo into its own component. Then deploy to ___ (GitHub Pages / Vercel).

## Design tokens

- Font: `-apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif`; mono demos: `ui-monospace, "SF Mono", Menlo, monospace`
- Headlines 48–96px, weight 600, letter-spacing −0.02 to −0.03em; body 17–21px
- Text `#1d1d1f` · secondary `#6e6e73` (on black `#a1a1a6`) · light tile `#f5f5f7` · white `#fff` · dark tile `#000`
- Blue: buttons `#0071e3`; link text `#0066cc` on light, `#2997ff` on dark (contrast-safe)
- Tiles stacked full-width with 12px white gaps; content max-width 980px
- Cards: 18px radius, shadow `0 4px 24px rgba(0,0,0,.07), 0 1px 2px rgba(0,0,0,.04)`, 2 columns → 1 on mobile
- Pills: 980px radius, min-height 44px; solid blue "Learn more" + outlined "GitHub ›"
- Nav: sticky 44px, `rgba(251,251,253,.8)` + `backdrop-filter: saturate(180%) blur(20px)`, 12px links, EN/VI switch
- Responsive scale uses container query units (`cqi`) on the root; grids use `repeat(auto-fit, minmax(min(100%, 400px), 1fr))`

## Motion

- Scroll reveal: CSS scroll-driven animation (`animation-timeline: view()`, class `.reveal`); no JS. Browsers without support show content statically.
- Project demos are pure CSS keyframe loops (`tv*` Tomville, `ds*` Desir, `tt*` TTorch, `em*` emotion, `mz*` maze). The maze is generated + solved with BFS in JS (see `maze()` in `design/Main.dc.html`); a small script replays it every 9s.
- `prefers-reduced-motion: reduce` disables all of it.

## Still to fill in (placeholders)

- Links: every GitHub / LinkedIn / email / "Learn more" / "Read" `href` is `#`
- Email address
- Experience bullets — bracketed `[…]` prompts in `content/*.json`
- Writing: 2 article titles, dates, summaries
- Now: the top (current month) entry; "See more ›" target
- More projects: model/stack/latency and algorithms covered
- Award placing for HackHayward 2026 (card currently shows "2026"); NVIDIA cert badge text ("NCP")
- Logos: monogram tiles (SFBU, Q, SE, LHP) — swap for real SVG logos
- Demos are dummy animations with made-up data. Replace each with a real screen recording when ready: muted, looping, autoplay `<video>` (MP4/WebM, ~1600×1000, 5–15s) inside the existing window frame.
