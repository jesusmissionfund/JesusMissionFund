# Jesus' Mission Fund

The public website for Jesus' Mission Fund, built with Next.js, React, and Tailwind CSS. Better Auth and Prisma dependencies are retained in the project setup.

## Run locally

Use pnpm for dependency management. The pnpm lockfile is the project's source of truth.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

The development server starts at [http://localhost:3000](http://localhost:3000).

## Other commands

```bash
pnpm lint
pnpm build
pnpm start
```

Environment variables belong in `.env` and should not be committed. Prisma client output is generated under `app/generated/prisma`; update it through the Prisma schema and generator configuration rather than editing generated files directly.

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for the source tree and conventions.
