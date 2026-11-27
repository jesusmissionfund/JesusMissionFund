# Architecture

The decisions behind how the platform works, which the code alone doesn't explain.

## Roles

- **Only two roles: `user` and `admin`.** Admins are JMF work accounts that never take part. Staff who want to take part register a separate personal account.
  - Admins are created only with `scripts/create-admin.ts` or from Admin → Users. Nothing promotes an existing account.
- **Missionary and partner aren't roles; they come from records.** A missionary is someone with an `APPROVED` `MissionaryApplication`, and a partner has an `ACTIVE` `PartnerProfile`. One person can be both.
- **Every page and server action checks access itself** with the guards in `lib/session.ts`. `proxy.ts` only redirects signed-out visitors away from `/dashboard` early.
- **`requireAdmin()` returns a 404,** not a redirect, so the admin area isn't revealed to anyone else.

## Missionary applications

- **At most one open application per person.** A partial unique index on `status <> 'REJECTED'` enforces it.
- **The "current" application** is the open one, or else the newest rejection (`currentApplication` in `lib/missionary-application.ts`).
  - This relies on the declaration order of the `ApplicationStatus` enum. A new open status must be added `BEFORE 'REJECTED'`.
- **Every application is new.** A new one copies only the stable details and references from the previous one (`carriedOver`), and old applications stay as history.
- **After a rejection,** an admin may set a "can apply again from" date. The applicant never sees it; the "Apply again" link just appears once the date passes.
- **Submitting** needs a verified email.
- **Decisions are final** and recorded in the activity log.

## Reports

- **One request row per missionary.** A request sent to everyone creates a `ReportRequest` for each approved missionary who isn't banned, so each can answer theirs.
- **A report answers at most one request.** Missionaries can also send reports without one.
- **Admins send reminders** from the Requests tab or the person's page. "Overdue" is worked out when the page loads (`lib/report-request.ts`).

## Email

- **Changing an email address** sends a link to the new address. The email changes only once that link is opened.
- **Admins are emailed** when an application is submitted or a report is sent.
- **Provider:** `createTransport()` in `lib/email.ts` is the only provider-specific code.
