# Personal Site

A minimal, text-first personal website inspired by Andrej Karpathy.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing Content

All content lives in `src/data/` as JSON files. Edit these to update the site — no UI code changes needed.

| File | What it controls |
|---|---|
| `about.json` | Name, avatar, tagline, bio, social links; optional `linkedinPost` (About-related LinkedIn URL) |
| `projects.json` | Projects: titles, links, images, tags, featured; optional `linkedinPost` per project |
| `writing.json` | Posts: dates, summaries, links, images; optional `linkedinPost` per post |
| `reading.json` | Reading list; optional `linkedinPost` per book/paper |
| `updates.json` | "Now" updates; optional `linkedinPost` per update |
| `contact.json` | Email, links; optional `linkedinPost` |
| `education.json`, `experience.json`, `other.json` | Timeline: optional `logo`, `images`, and `linkedinPost` per entry (`public/images/education|experience|other/`) |

## Adding a New Project

Open `src/data/projects.json` and add an entry:

```json
{
  "title": "Project Name",
  "description": "What it does",
  "link": "https://github.com/...",
  "image": "/images/my-project.png",
  "tags": ["tag1", "tag2"],
  "featured": false,
  "linkedinPost": "https://www.linkedin.com/feed/update/..."
}
```

Featured projects sort to the top and display a star.

## Images

All image fields are **optional**. Leave them as `""` for a text-only look.

- **Avatar** — set `avatar` in `about.json` to a path like `/images/avatar.jpg` or a URL
- **Project screenshots** — set `image` on any project entry
- **Writing cover images** — set `image` on any writing entry

Local images go in `public/images/` and are referenced as `/images/filename.png`. Remote URLs (GitHub, Unsplash, etc.) work too.

## Tech Stack

- **Next.js 16** (App Router)
- **Tailwind CSS 4**
- **TypeScript**
- JSON data files for content

## Deploy

```bash
npm run build
npm start
```

Or deploy to Vercel with zero config.
