# Undivided One

This repository contains a Payload CMS + Next.js website. The frontend and the Payload admin run in the same app, and the project uses PostgreSQL as its database.

## Stack

- Payload CMS 3
- Next.js 15
- React 19
- PostgreSQL via `@payloadcms/db-postgres`
- Tailwind CSS
- Payload plugins for SEO, redirects, search, nested categories, and form builder

## What is in this project

### Collections

- `pages`: draft-enabled pages with hero content, flexible layout blocks, and SEO fields
- `posts`: draft-enabled posts with hero image, rich text content, related posts, authors, categories, and SEO fields
- `media`: uploads stored in `public/media`
- `categories`: nested categories for posts
- `users`: admin users who can log in to Payload

### Globals

- `header`
- `footer`
- `siteSettings`

### Features

- Payload admin at `/admin`
- Live preview and draft preview
- Redirect management
- Search indexing for posts
- Form builder plugin
- Frontend routes for pages, posts, search, sitemap, and preview flows

## Local development

### Without Docker

Requirements:

- Node.js 20+
- pnpm 9 or 10
- a local PostgreSQL instance

Steps:

1. Run the setup command:

   ```bash
   ./setup
   ```

   This creates `.env` from `.env.example` and generates `PAYLOAD_SECRET`, `PREVIEW_SECRET`, and `CRON_SECRET` automatically.

2. Set `DATABASE_URL` in `.env` to your local PostgreSQL instance if it differs from the default.

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Run the Payload migrations:

   ```bash
   pnpm payload migrate
   ```

5. Optional: bootstrap a dev login and demo content on an empty database:

   ```bash
   pnpm dev:bootstrap
   ```

6. Start the development server:

   ```bash
   pnpm dev
   ```

7. Open `http://localhost:3000/admin`.

If `pnpm payload migrate` warns that the database was already changed in dev mode, use `pnpm dev` for day-to-day local development and only run migrations against a clean local database.

If you skip `pnpm dev:bootstrap`, you still need to create your first admin user manually and `/` may remain empty until you add or seed content.

## Local development with Docker

The Docker setup in this repo starts both the app and a local PostgreSQL database. This is the fastest way to get the project running without installing PostgreSQL on your machine.

Steps:

1. Run the setup command:

   ```bash
   ./setup
   ```

   This creates `.env` and generates the required secrets automatically.

2. Start the containers:

   ```bash
   docker compose up --build
   ```

3. Open `http://127.0.0.1:3001/admin` and log in with:

   - email: `dev@undivided.local`
   - password: `devpassword`

4. Open `http://127.0.0.1:3001/` to view the seeded site.

   If port `3001` is already in use on your machine, change `APP_PORT` in `.env` before starting the stack.

The shortest Docker workflow is therefore:

```bash
./setup
docker compose up --build
```

What the Docker setup does:

- starts an internal PostgreSQL container for Payload
- starts the Payload/Next.js app on `http://127.0.0.1:3001`
- builds a dev image with the project dependencies
- runs `pnpm dev:bootstrap`
- creates a dev admin user on an empty database
- seeds demo content on an empty database
- starts the dev server inside the container

Notes:

- For the default Docker workflow, `docker-compose.yml` injects its own internal `DATABASE_URL` that points to the `postgres` service. You do not need to change `DATABASE_URL` just to use Docker.
- The Docker Postgres service is not exposed on a host port. That avoids conflicts with an already running local PostgreSQL instance.
- The app binds to `APP_PORT`, which defaults to `3001`.
- Host-based commands like `pnpm payload migrate` read `.env`, so keep your local PostgreSQL connection string there.
- The bootstrap only seeds an empty database. Once content exists, later restarts leave your data alone.
- Stop the stack with `docker compose down`.
- Remove the database volume too with `docker compose down -v`.

## Seed demo content

After logging in to the admin panel, you can use the `Seed Database` button on the dashboard.

This will add demo pages, posts, media, forms, and navigation items. It also creates a demo author:

- email: `demo-author@example.com`
- password: `password`

The seed process is destructive for the seeded collections and is meant for a fresh local environment.

## Useful commands

```bash
./setup
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm generate:types
pnpm generate:importmap
pnpm payload migrate
pnpm exec tsc --noEmit
```

## Project notes

- Run `pnpm generate:types` after changing collections, globals, or fields.
- Run `pnpm generate:importmap` after creating or changing Payload admin components.
- Validate TypeScript after code changes with `pnpm exec tsc --noEmit`.
- PostgreSQL migrations live in `src/migrations`.
