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

## Start

```bash
docker compose up --build
```

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
