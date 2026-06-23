# Portfolio Site & Profile README — Design

**Date:** 2026-06-23
**Repo:** `joaopabdala/joaopabdala` (GitHub profile repo — its `README.md` renders on the GitHub profile page)
**Owner:** João Paulo Abdala Bohaczk

## Goal

Turn the profile repo into a portfolio that publishes a résumé, key links, and
articles. Deliver two coordinated things from this single repo:

1. A **profile README** that acts as a front door on the GitHub profile page.
2. A **hosted Astro website** published via GitHub Pages.

## Decisions (locked)

| Topic | Decision |
| --- | --- |
| Format | Polished README front door **+** full hosted site |
| Site engine | **Astro** (static output) |
| Styling | **Tailwind CSS** |
| Visual style | Clean, book-like, Rust-docs-inspired; light + dark mode |
| Languages | **Bilingual EN + PT** with a header language toggle; default English |
| Blog | **Native Markdown blog**, seeded with the two existing Substack posts |
| Hosting | GitHub Pages at `https://joaopabdala.github.io/joaopabdala/` |
| 3D contrib | **Removed** — delete `profile-3d-contrib/` and `.github/workflows/blank.yml` |

## Hosting & URLs

- Project-repo Pages serves under a base path. Site config:
  - `site: https://joaopabdala.github.io`
  - `base: /joaopabdala`
- All internal links must respect `base` (use Astro's `<base>`-aware helpers /
  `import.meta.env.BASE_URL`).
- Custom domain can be added later (out of scope now).
- Manual one-time step by the owner: repo **Settings → Pages → Source = "GitHub
  Actions"**. Provide exact instructions; optionally run via `gh` if authenticated.

## Site structure

Bilingual via Astro i18n routing. Every page exists at `/en/…` and `/pt/…`.
Default locale English; site root redirects to the default locale.

### Pages

- **Home** (`/en/`, `/pt/`)
  - Name, tagline ("Full Stack Developer"), short bio.
  - Featured links: GitHub, LinkedIn, email, Substack.
  - Three showcase projects: Cinemarchives, challenge-backend-laravel-php, tiko.
  - Latest articles list (most recent N).
- **Resume** (`/en/resume`, `/pt/resume`)
  - Full résumé rendered cleanly: summary, experience, education, certifications,
    technical skills, showcase projects, languages.
  - **"Download PDF"** button linking to the matching-language PDF.
- **Articles index** (`/en/articles`, `/pt/articles`)
  - List of blog posts (title, date, description) for the active locale.
- **Article page** (`/en/articles/<slug>`, `/pt/articles/<slug>`)
  - Individual styled post rendered from Markdown.

### Shared layout

- Header: site name/home link · Resume · Articles · language toggle · theme toggle.
- Footer: key links + copyright.
- One base layout component used by all pages so nav/design changes happen once.

## Content model

- **Articles:** Markdown files in `src/content/blog/` using an Astro content
  collection with a typed schema. Frontmatter: `title`, `date`, `description`,
  `lang` (`en` | `pt`), `slug` (optional). Seed with the two Substack posts:
  - "Cinemarchives" (introduction)
  - "Cinemarchives: idea, architecture, deploy" (technical decisions)
  - Each seeded in both languages where source text exists; English at minimum.
- **Profile data (bio, links, resume):** a small structured data module
  (e.g. `src/data/`) holding EN + PT fields side by side so translations stay in
  sync and pages stay declarative.
- **PDFs:** existing EN/PT résumé PDFs moved into `public/` for direct download.

## Profile README (front door)

- Short intro (name + tagline + one-line bio).
- Prominent link to the live site.
- Key links: GitHub, LinkedIn, email, Substack.
- Clean text/links; keep at most one tasteful GitHub stats card (optional).
- **Remove** the 3D contribution graph and its embed.

## Deployment

- A single GitHub Actions workflow builds the Astro site on push to `main` and
  deploys to GitHub Pages using Astro's official Pages deploy flow
  (`withastro/action` or `actions/upload-pages-artifact` + `actions/deploy-pages`).
- Delete the legacy `blank.yml` 3D-contrib workflow.

## Project layout (proposed)

```
/
├── README.md                     # profile front door
├── astro.config.mjs              # site + base + i18n + tailwind
├── package.json
├── public/
│   ├── resume-en.pdf
│   └── resume-pt.pdf
├── src/
│   ├── layouts/BaseLayout.astro
│   ├── components/                # Header, Footer, LanguageToggle, ThemeToggle, etc.
│   ├── data/                      # bio, links, resume (EN + PT)
│   ├── content/blog/              # Markdown articles
│   └── pages/
│       ├── index.astro            # redirect to default locale
│       ├── en/ ...
│       └── pt/ ...
└── docs/superpowers/specs/        # this design
```

## Testing & verification

- `npm run build` succeeds with no broken internal links (base path respected).
- Local preview (`npm run preview`) renders Home, Resume, Articles index, and an
  article page in both EN and PT; language + theme toggles work.
- Résumé PDF links resolve.
- Pages deploy succeeds and the live URL serves the site.

## Out of scope (for now)

Comments, analytics, contact forms, CMS, on-site search, custom domain.
