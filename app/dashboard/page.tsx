import { redirect } from "next/navigation";

import { isRole } from "@/lib/permissions";
import { getSession } from "@/lib/session";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session || !isRole(session.user.role)) redirect("/signin");

  redirect(`/dashboard/${session.user.role}`);
}
