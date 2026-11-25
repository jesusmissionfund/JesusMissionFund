import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { MissionarySignupFlow } from "./_components/MissionarySignupFlow";
import { ministryFocusOptions, resumeStep, type ApplicationDraft } from "./schema";

export const metadata: Metadata = {
  title: "Missionary application",
  description: "Create your account and apply for missionary support from Jesus' Mission Fund.",
};

export default async function MissionarySignupPage() {
  const session = await getSession();
  if (session && session.user.role !== "missionary") redirect("/dashboard");

  const application = session
    ? await prisma.missionaryApplication.findUnique({ where: { userId: session.user.id } })
    : null;
  if (application && application.status !== "DRAFT") redirect("/dashboard/missionary");

  const draft: ApplicationDraft = {
    phone: application?.phone ?? undefined,
    country: application?.country ?? undefined,
    region: application?.region ?? undefined,
    church: application?.church ?? undefined,
    yearsServing: application?.yearsServing?.toString(),
    ministryFocus: ministryFocusOptions.find((option) => option === application?.ministryFocus),
  };

  return (
    <MissionarySignupFlow
      initialAccount={session ? { name: session.user.name, email: session.user.email } : null}
      initialDraft={draft}
      initialStep={resumeStep(Boolean(session), draft)}
    />
  );
}
