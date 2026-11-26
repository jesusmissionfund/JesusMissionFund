import { createMessage, type Transport } from "@upyo/core";
import { SmtpTransport } from "@upyo/smtp";

export type Email = { to: string; subject: string; html: string; text: string };

// The only provider-specific code.
function createTransport(): Transport | null {
  const host = process.env.EMAIL_HOST;
  if (!host) return null;
  return new SmtpTransport({
    host,
    port: Number(process.env.EMAIL_PORT || 465),
    auth: {
      user: process.env.EMAIL_USER ?? "",
      pass: process.env.EMAIL_PASSWORD ?? "",
    },
  });
}

let transport: Transport | null | undefined;

export async function sendEmail({ to, subject, html, text }: Email) {
  if (transport === undefined) transport = createTransport();

  if (!transport) {
    if (process.env.NODE_ENV === "production")
      throw new Error("Email is not configured: set EMAIL_HOST.");
    console.info(`[email] to ${to}: ${subject}\n${text}`);
    return;
  }

  const from = process.env.EMAIL_FROM || process.env.EMAIL_USER || "";
  const receipt = await transport.send(
    createMessage({ from, to, subject, content: { html, text } }),
  );
  if (!receipt.successful)
    throw new Error(
      `Email to ${to} failed: ${receipt.errorMessages.join("; ")}`,
    );
}
