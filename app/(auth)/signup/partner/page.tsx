import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";
import { PartnerSignupFlow } from "./_components/PartnerSignupFlow";

export const metadata: Metadata = {
  title: "Partner sign-up",
  description: "Create your account and stand with missionaries as a giving partner of Jesus' Mission Fund.",
};

export default async function PartnerSignupPage() {
  const session = await getSession();
  if (session?.user.role === "admin") redirect("/admin");
  // Partner details are filled in from the dashboard, where a draft partnership is the next step shown.
  if (session) redirect("/dashboard");

  return <PartnerSignupFlow />;
}
