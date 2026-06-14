# Undivided One

Static bilingual Nuxt 3 website for **Undivided One — The One God Made Visible**.

The site presents the essay and confession as readable web content, with downloadable PDFs, Dutch/English language routes, local Markdown content, and static output suitable for GitHub Pages. There is no CMS, Payload, server runtime, or database.

## Live Site

This repository is intended to be published with GitHub Pages, using the custom domain:

```text
undivided.one
```

## What Is Included

- Dutch and English landing pages
- Full essay as HTML web content
- Full confession as HTML web content
- Confession introduction integrated into both languages
- Downloadable PDFs for essay and confession
- Footnotes with hover popovers and backlinks
- Scripture reference hover popovers using local SV/KJV text data
- Static generation with `nuxi generate`
- GitHub Actions deployment to GitHub Pages

## Tech Stack

- Nuxt 3
- Vue
- Tailwind CSS
- Local Markdown content
- Static GitHub Pages output

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Nuxt will print the local URL, usually:

```text
http://localhost:3000
```

## Static Build

Generate the static site:

```bash
npm run generate
```

The output is written to:

```text
.output/public
```

That directory can be hosted without a server-side runtime.

## Preview Static Output

After generating:

```bash
npm run preview
```

## Routes

- `/`
- `/nl`
- `/en`
- `/nl/essay`
- `/en/essay`
- `/nl/confession`
- `/en/confession`

## Project Structure

```text
assets/css/main.css          Global styling
components/                  Vue components
content/nl/                  Dutch Markdown content
content/en/                  English Markdown content
pages/                       Nuxt routes
public/downloads/            Downloadable PDFs
utils/markdown.ts            Markdown parsing/rendering
utils/scripture.ts           Local SV/KJV scripture hover data
.github/workflows/pages.yml  GitHub Pages deployment
```

## Editing Content

Main content files:

```text
content/nl/essay.md
content/en/essay.md
content/nl/confession.md
content/en/confession.md
```

The essay content was extracted from the source PDFs and cleaned into Markdown while preserving the introduction, prologue, chapters, conclusion, and footnotes.

## Replacing PDFs

Downloadable PDFs live in:

```text
public/downloads/undivided-essay-nl.pdf
public/downloads/undivided-essay-en.pdf
public/downloads/undivided-confession-nl.pdf
public/downloads/undivided-confession-en.pdf
```

Files in `public` are served from the site root, so their public URLs are:

```text
/downloads/undivided-essay-nl.pdf
/downloads/undivided-essay-en.pdf
/downloads/undivided-confession-nl.pdf
/downloads/undivided-confession-en.pdf
```

## Scripture Popovers

Inline Bible references can show subtle hover/focus popovers. The text is local and static:

- Dutch: Statenvertaling (`SV`)
- English: King James Version (`KJV`)

The data and reference matching live in:

```text
utils/scripture.ts
```

## GitHub Pages Deployment

The workflow in `.github/workflows/pages.yml` deploys on every push to `main`.

It performs:

1. Install dependencies with `npm ci`
2. Generate the static site with `npm run generate`
3. Publish `.output/public` to GitHub Pages

In the GitHub repository settings:

1. Open **Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. Push to `main`

## Custom Domain

`public/CNAME` is included for:

```text
undivided.one
```

Configure DNS according to GitHub Pages custom-domain documentation. For an apex/root domain, GitHub Pages typically requires `A` records pointing to GitHub Pages IPs, and optionally an `AAAA` set for IPv6.

## Repository Path Deployments

If this repository is deployed under a GitHub Pages project path instead of a root/custom domain, set `NUXT_APP_BASE_URL` in the workflow.

Example:

```yaml
NUXT_APP_BASE_URL: /undivided-one/
```

For `undivided.one`, keep the base URL as `/`.

## Verification

Useful checks:

```bash
npm run test
npm run typecheck
npm run generate
```

## Issues

This is a public repository. Issues are welcome for:

- typos
- broken links
- rendering problems
- accessibility problems
- PDF download issues
- content corrections or translation suggestions

Please keep issues specific and include the affected route, language, and a short description of what should change.
