import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HandHeart, HeartHandshake, UserRound } from "lucide-react";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { formatDate } from "@/lib/format";
import { resumeStep, steps as missionarySteps, toApplicationDraft } from "@/app/(auth)/signup/missionary/schema";
import { steps as partnerSteps } from "@/app/(auth)/signup/partner/schema";
import { NextStepPanel } from "./_components/NextStepPanel";
import { requirePerson } from "./person";

export const metadata: Metadata = { title: "Dashboard" };

const linkClass = "inline-flex items-center gap-2 text-sm font-semibold text-brand";
const eyebrowClass = "text-xs font-bold uppercase tracking-[0.16em] text-brand-muted";

type Todo = { title: string; href: string; action: string };

export default async function DashboardPage() {
  const { session, details, application, partner, links } = await requirePerson();

  const todos: Todo[] = details.phone ? [] : [{ title: "Add your phone number", href: "/dashboard/details", action: "Add" }];
  const missionaryStep =
    application?.status === "DRAFT" ? missionarySteps.findIndex(({ id }) => id === resumeStep(true, toApplicationDraft(application, details))) : -1;

  const preferences = Object.entries({
    "Preferred frequency": partner?.frequency,
    "Preferred amount": partner?.amount,
    Supporting: partner?.supportInterest,
  }).filter((row): row is [string, string] => Boolean(row[1]));

  return (
    <DashboardShell label="My dashboard" user={session.user} title={`Welcome, ${session.user.name}.`} subtitle="Your account with Jesus' Mission Fund." links={links}>
      <div className="space-y-5">
        {missionaryStep >= 0 && (
          <NextStepPanel
            label="Missionary application"
            steps={missionarySteps}
            current={missionaryStep}
            href="/signup/missionary"
            action="Continue your application"
            discard={{ kind: "missionary", what: "your missionary application" }}
          />
        )}
        {partner?.status === "DRAFT" && (
          <NextStepPanel
            label="Giving partner registration"
            steps={partnerSteps}
            current={1}
            href="/dashboard/partnership"
            action="Set up your partnership"
            discard={{ kind: "partner", what: "your partnership" }}
          />
        )}

        {todos.length > 0 && (
          <section aria-labelledby="todo-heading" className="border border-border bg-card">
            <h2 id="todo-heading" className="border-b border-border p-5 text-xl font-semibold sm:px-6">To do</h2>
            <ul className="divide-y divide-border">
              {todos.map((todo) => (
                <li key={todo.title} className="flex flex-wrap items-center justify-between gap-3 p-5 sm:px-6">
                  <p className="font-medium">{todo.title}</p>
                  <Link href={todo.href} className={linkClass}>
                    {todo.action} <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            {application && application.status !== "DRAFT" && (
              <section className="border border-border bg-card p-6 sm:p-8">
                <p className={eyebrowClass}>Missionary application</p>
                {application.status === "SUBMITTED" && (
                  <>
                    <h2 className="mt-3 text-2xl font-semibold">Under review</h2>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      Our team will review your application and follow up. Approved missionaries receive access to their portal.
                    </p>
                    {application.submittedAt && <p className="mt-4 text-xs text-subtle-foreground">Submitted {formatDate(application.submittedAt)}</p>}
                  </>
                )}
                {application.status === "APPROVED" && (
                  <>
                    <h2 className="mt-3 text-2xl font-semibold">Approved missionary</h2>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">Tell us what happened in the field, what changed, and where you need prayer.</p>
                    <Link href="/dashboard/reports/new" className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary-hover">
                      Submit a ministry report <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                  </>
                )}
                {application.status === "REJECTED" && <h2 className="mt-3 text-2xl font-semibold">Not approved</h2>}
              </section>
            )}

            {partner?.status === "ACTIVE" && (
              <section className="border border-border bg-card p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className={eyebrowClass}>Partner status</p>
                    <h2 className="mt-3 text-2xl font-semibold">Giving partner</h2>
                    <p className="mt-2 text-sm text-muted-foreground">Together, we help practical support reach missionaries.</p>
                  </div>
                  <HeartHandshake aria-hidden="true" className="size-6 text-brand" />
                </div>
                <dl className="mt-6 grid gap-4 border-t border-border pt-5 sm:grid-cols-3">
                  {preferences.map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-xs uppercase tracking-[0.12em] text-subtle-foreground">{label}</dt>
                      <dd className="mt-2 font-semibold">{value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 border-t border-border pt-5 text-sm leading-6 text-muted-foreground">
                  Use the mobile money menu to make or manage your recurring gift. The team can help with questions.
                </p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                  <Link href="/partner#mobile-money" className={linkClass}>
                    View giving steps <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                  <Link href="/dashboard/partnership" className={linkClass}>
                    Edit partnership <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </div>
              </section>
            )}

            {!application && (
              <JoinCard icon={UserRound} title="Apply for support in your ministry" href="/signup/missionary" action="Apply as a missionary" />
            )}
            {!partner && (
              <JoinCard icon={HandHeart} title="Give to and stand with missionaries" href="/dashboard/partnership" action="Become a partner" />
            )}
          </div>

          <aside className="space-y-5">
            <section className="border border-border bg-card p-6">
              <p className={eyebrowClass}>Profile</p>
              <h2 className="mt-2 text-xl font-semibold">Your details</h2>
              <dl className="mt-4 space-y-3 text-sm">
                {Object.entries({ Email: session.user.email, Phone: details.phone, Country: details.country }).map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4">
                    <dt className="text-subtle-foreground">{label}</dt>
                    <dd className="text-right">{value ?? "—"}</dd>
                  </div>
                ))}
              </dl>
              <Link href="/dashboard/details" className={`${linkClass} mt-5`}>
                Edit details <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </section>
          </aside>
        </div>
      </div>
    </DashboardShell>
  );
}

function JoinCard({ icon: Icon, title, href, action }: { icon: typeof UserRound; title: string; href: string; action: string }) {
  return (
    <section className="flex flex-wrap items-center justify-between gap-4 border border-border bg-card p-6">
      <div className="flex items-center gap-4">
        <span className="flex size-10 shrink-0 items-center justify-center bg-secondary text-brand"><Icon aria-hidden="true" className="size-5" /></span>
        <h2 className="font-semibold">{title}</h2>
      </div>
      <Link href={href} className={linkClass}>
        {action} <ArrowRight aria-hidden="true" className="size-4" />
      </Link>
    </section>
  );
}
