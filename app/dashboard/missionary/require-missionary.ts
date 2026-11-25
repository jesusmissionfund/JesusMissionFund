import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/session";

export async function requireMissionary() {
  const session = await requireRole("missionary");
  const application = await prisma.missionaryApplication.findUnique({
    where: { userId: session.user.id },
    select: { status: true, submittedAt: true },
  });
  // Missionaries with an unfinished application are sent back into the sign-up flow to resume it.
  if (!application || application.status === "DRAFT") redirect("/signup/missionary");

  return { session, application };
}
