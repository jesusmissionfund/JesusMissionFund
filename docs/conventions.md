# Conventions

## Single source of truth

Anything used in more than one place is defined once and imported. Check here before writing something new:

| What                                                                | Where                                                           |
| ------------------------------------------------------------------- | --------------------------------------------------------------- |
| Colours and radius                                                  | `app/globals.css` tokens. Never hex or rgb in classes           |
| Site name, logo, nav links, site URL                                | `lib/site.ts`                                                   |
| Button, link and input classes                                      | `components/styles.ts`                                          |
| Public page width, spacing, headings, labels, fade-in, closing band | `components/site/`                                              |
| Form fields, alerts, submit button                                  | `components/forms/fields.tsx`                                   |
| Field rules (name, email, password, phone, country, date)           | `lib/validation.ts`                                             |
| Action results, shared messages; auth call errors                   | `lib/action-result.ts`; `authErrorOf` in `lib/auth-client.ts`   |
| Date formatting                                                     | `lib/format.ts`                                                 |
| Access guards                                                       | `lib/session.ts`                                                |
| Current application, approved missionary, can apply again           | `lib/missionary-application.ts`                                 |
| Waiting and overdue requests                                        | `lib/report-request.ts`                                         |
| Application steps, fields, labels, what carries over                | `app/(auth)/signup/missionary/schema.ts`                        |
| Email wording; sending to every admin                               | `lib/email-templates.ts`; `lib/notify-admins.ts`                |
| Dashboard shell, badge, tabs, pagination, back link                 | `components/layout/DashboardShell.tsx`, `components/dashboard/` |

## Rules

- **Pages are server components** with `metadata`.
- **Components used by one route** live in that route's `_components/`. Shared ones live in `components/`.
- **Imports and exports:** named exports, and `@/` imports outside the route.
- **Tailwind v4 canonical class names:** `aspect-4/3`, not `aspect-[4/3]`.
- **Server actions:**
  1. Check access first.
  2. Parse with the same zod schema as the form.
  3. Return an `ActionResult`.
  4. Call `revalidatePath` after writing.
  5. Admin actions also call `recordAudit` inside the same transaction.
- **Never rename or edit a migration** that has been applied or committed.
- **Comments only** for what the code can't say: an outside constraint, a security reason or a workaround.
- **Format files you change** with Prettier.

## Changes that touch several places

- **A question on the missionary application:**
  1. Add the column (nullable) and a migration.
  2. In `schema.ts`: add it to the step's schema, `toApplicationDraft` and `answerSections`, and to `carriedOverFields` if it should carry into a new application.
  3. Add the input to the step's component and its save action.
- **An activity log action:** add the enum value in `audit.prisma` with a migration, then its label in `app/admin/audit.ts`.
- **The logo:** update `logoSrc` in `lib/site.ts`, then regenerate `app/favicon.ico`, `app/icon.png` and `app/apple-icon.png`.
- **Theme colours:** emails can't read CSS variables, so copy any colour change into `lib/email-templates.ts`.
