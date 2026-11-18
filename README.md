# Tom Nguyen — Portfolio

One-page bilingual portfolio (English at `/`, Vietnamese at `/vi`).

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Where things are

| Path | What it is |
|---|---|
| `public/index.html` | The English page (markup, styles and script in one file) |
| `public/vi.html` | The Vietnamese page, same markup. **Edit both** when you change content. |
| `public/assets/` | Images: project demos, company logos |
| `content/content.{en,vi}.json` | All page copy as data, kept in step with the HTML |
| `design/` | Original Claude Design handoff (reference only) |
| `next.config.ts` | Routes `/` and `/vi` to the two pages; redirects the old `/en` URLs |

Next.js only hosts the static pages, so deploying works the same as before.
