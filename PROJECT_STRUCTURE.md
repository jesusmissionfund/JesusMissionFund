# Project structure

```text
.
├── app/                         # Next.js App Router routes and global setup
│   ├── about/page.tsx
│   ├── missionary/page.tsx
│   ├── missionary/apply/page.tsx
│   ├── partner/page.tsx
│   ├── partner/join/page.tsx
│   ├── volunteer/page.tsx
│   ├── dashboard/               # Missionary, partner, and admin UI previews
│   │   ├── missionary/page.tsx
│   │   ├── missionary/reports/new/page.tsx
│   │   ├── partner/page.tsx
│   │   └── admin/page.tsx
│   ├── sign-in/page.tsx
│   ├── sign-up/page.tsx
│   ├── success-stories/page.tsx
│   ├── page.tsx                 # Home route
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── api/                     # API routes
│   └── generated/prisma/        # Generated Prisma client; keep generator output in sync
├── components/                  # Reusable UI, grouped by purpose
│   ├── about/
│   ├── auth/
│   ├── errors/
│   ├── forms/                    # Reusable intake form UI
│   ├── dashboard/                # Shared dashboard shell and previews
│   ├── home/
│   ├── layout/                  # Navbar, footer, breadcrumbs
│   ├── missionary/
│   ├── partners/                 # Partnership page and request form
│   ├── stories/
│   └── ui/                      # Shared primitives such as Button
├── lib/                         # Shared helpers and auth client
├── public/                      # Static images, video, and icons
├── package.json
├── pnpm-lock.yaml
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── tsconfig.json
```

## Conventions

- Keep route entry points and route-specific files inside `app/`.
- Put reusable interface components in `components/`, grouped by feature or role.
- Keep shared helpers in `lib/` and static assets in `public/`.
- `app/generated/prisma/` contains generated files. Do not hand-edit them; update the Prisma schema and generator configuration instead.
- Auth-related generated files were left in place during the component reorganization.
