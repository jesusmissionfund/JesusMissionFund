import { sendEmailAfterResponse, type Email } from "./email";
import { prisma } from "./prisma";

export async function emailAdmins(message: Omit<Email, "to">) {
  const admins = await prisma.user.findMany({
    where: { role: "admin", banned: false },
    select: { email: true },
  });
  for (const { email } of admins)
    sendEmailAfterResponse({ to: email, ...message });
}
