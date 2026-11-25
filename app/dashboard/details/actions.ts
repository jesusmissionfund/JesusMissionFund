"use server";

import { revalidatePath } from "next/cache";

import { invalidInput, signedOut, type ActionResult } from "@/lib/action-result";
import { prisma } from "@/lib/prisma";
import { getUserSession } from "@/lib/session";
import { detailsSchema, type DetailsInput } from "./schema";

export async function saveDetails(input: DetailsInput): Promise<ActionResult> {
  const session = await getUserSession();
  if (!session) return signedOut;
  const parsed = detailsSchema.safeParse(input);
  if (!parsed.success) return invalidInput;

  const { phone, country } = parsed.data;
  await prisma.user.update({ where: { id: session.user.id }, data: { phone: phone || null, country: country || null } });
  revalidatePath("/dashboard", "layout");
  return {};
}
