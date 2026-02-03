# Local Docker Development

## Prerequisites
- Docker Desktop (macOS)

## Setup
1. Copy the env template:

```bash
cp .env.example .env.local
```

2. Set `PAYLOAD_SECRET` (required). You can generate one with:

```bash
openssl rand -base64 48
```

## Start (development)

```bash
docker compose up --build
```

Notes:
- Uses Turbopack for faster local development
- Webpack fallback: change the `command` in `docker-compose.yml` to `pnpm dev:webpack -- --hostname 0.0.0.0`

## Open
- App: http://localhost:3000
- Payload Admin: http://localhost:3000/admin

## Logs

```bash
docker compose logs -f
```

## Reset the Database

```bash
docker compose down -v
```

This removes the Postgres volume and all local data.
