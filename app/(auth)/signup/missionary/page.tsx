import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import {
  canStartApplication,
  currentApplication,
} from "@/lib/missionary-application";
import { resumeParam } from "../schema";
import { MissionarySignupFlow } from "./_components/MissionarySignupFlow";
import { carriedOver, resumeStep, toApplicationDraft } from "./schema";

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
        select: {
          emailVerified: true,
          phone: true,
          country: true,
          missionaryApplications: currentApplication,
        },
      })
    : null;
  const [application] = user?.missionaryApplications ?? [];
  const startingNew = application?.status === "REJECTED";
  if (
    application &&
    application.status !== "DRAFT" &&
    !canStartApplication(application)
  )
    redirect(
      application.status === "REJECTED"
        ? "/dashboard"
        : `/dashboard/applications/${application.id}`,
    );

  const saved = toApplicationDraft(application ?? null, user);
  const draft = startingNew ? carriedOver(saved) : saved;

  return (
    // Keyed so signing in to an existing account remounts the flow at its resume step.
    <MissionarySignupFlow
      key={session?.user.id ?? "guest"}
      resumed={Boolean(session) && (await searchParams)[resumeParam] === "1"}
      initialAccount={
        session && user
          ? {
              name: session.user.name,
              email: session.user.email,
              emailVerified: user.emailVerified,
            }
          : null
      }
      initialDraft={draft}
      initialStep={
        startingNew ? "contact" : resumeStep(Boolean(session), draft)
      }
    />
  );
}
