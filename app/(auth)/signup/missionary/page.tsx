import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { resumeParam } from "../schema";
import { MissionarySignupFlow } from "./_components/MissionarySignupFlow";
import { resumeStep, toApplicationDraft } from "./schema";

export const metadata: Metadata = {
  title: "Missionary application",
  description:
    "Create your account and apply for missionary support from Jesus' Mission Fund.",
};

export default async function MissionarySignupPage({
  searchParams,
}: PageProps<"/signup/missionary">) {
  const session = await getSession();
  if (session?.user.role === "admin") redirect("/admin");

  const user = session
    ? await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { phone: true, country: true, missionaryApplication: true },
      })
    : null;
  const application = user?.missionaryApplication;
  if (application && application.status !== "DRAFT") redirect("/dashboard");

  const draft = toApplicationDraft(application ?? null, user);

  return (
    // Keyed so signing in to an existing account remounts the flow at its resume step.
    <MissionarySignupFlow
      key={session?.user.id ?? "guest"}
      resumed={Boolean(session) && (await searchParams)[resumeParam] === "1"}
      initialAccount={
        session ? { name: session.user.name, email: session.user.email } : null
      }
      initialDraft={draft}
      initialStep={resumeStep(Boolean(session), draft)}
    />
  );
}
