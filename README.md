# Jesus' Mission Fund

Website and member platform for Jesus' Mission Fund. Missionaries apply for support and send reports, partners register to give, and JMF staff run it from `/admin`.

## Setup

```bash
pnpm install --frozen-lockfile   # also generates the Prisma client
cp .env.example .env             # fill it in
pnpm prisma migrate dev
pnpm tsx scripts/create-admin.ts --email you@example.org --password '...'
pnpm dev
```

Prisma 7 doesn't regenerate the client after `migrate`, so run `npx prisma generate` after schema changes.

## Deploying

- Run `npx prisma migrate deploy` before starting a new version.
- Rate limits trust `X-Forwarded-For`, which Vercel sets. On other hosting, set `advanced.ipAddress` in `lib/auth.ts`.

## Docs

- [docs/architecture.md](docs/architecture.md): the rules behind roles, applications and reports that aren't obvious from the code.
- [docs/conventions.md](docs/conventions.md): where shared pieces live, and the rules for changing things.
