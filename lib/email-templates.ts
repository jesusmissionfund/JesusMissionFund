import type { Email } from "./email";

type Template = Omit<Email, "to">;

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

// Colours are copied from app/globals.css; email clients can't read CSS variables.
function layout(paragraphs: string[], action: { label: string; url: string }) {
  const body = paragraphs
    .map((line) => `<p style="margin:0 0 16px">${escapeHtml(line)}</p>`)
    .join("");
  const url = escapeHtml(action.url);
  return `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#1c2c22;max-width:520px">
${body}<p style="margin:24px 0"><a href="${url}" style="background:#174b35;color:#ffffff;padding:12px 20px;text-decoration:none;display:inline-block">${escapeHtml(action.label)}</a></p>
<p style="margin:0;font-size:13px;color:#66746a">If the button doesn't work, copy this link into your browser:<br>${url}</p>
</div>`;
}

function template(
  subject: string,
  paragraphs: string[],
  action: { label: string; url: string },
): Template {
  return {
    subject,
    html: layout(paragraphs, action),
    text: `${paragraphs.join("\n\n")}\n\n${action.label}: ${action.url}`,
  };
}

export function passwordResetEmail(name: string, url: string) {
  return template(
    "Reset your password",
    [
      `Hello ${name},`,
      "We received a request to reset the password for your Jesus' Mission Fund account. The link below is valid for one hour.",
      "If you didn't ask for this, you can ignore this email and your password will stay the same.",
    ],
    { label: "Reset password", url },
  );
}

export function verificationEmail(name: string, url: string) {
  return template(
    "Verify your email",
    [
      `Hello ${name},`,
      "Please confirm this is the email address for your Jesus' Mission Fund account. The link below is valid for one hour.",
      "If you didn't create an account, you can ignore this email.",
    ],
    { label: "Verify email", url },
  );
}

export function applicationApprovedEmail(name: string, url: string) {
  return template(
    "Your missionary application was approved",
    [
      `Hello ${name},`,
      "Your missionary application to Jesus' Mission Fund has been approved.",
    ],
    { label: "Go to your dashboard", url },
  );
}

export function applicationRejectedEmail(
  name: string,
  reason: string,
  url: string,
) {
  return template(
    "Your missionary application",
    [
      `Hello ${name},`,
      "After review, your missionary application to Jesus' Mission Fund was not approved.",
      `Reason: ${reason}`,
    ],
    { label: "Go to your dashboard", url },
  );
}

export function reportRequestedEmail(
  name: string,
  title: string,
  dueDate: string | null,
  url: string,
) {
  return template(
    `Report requested: ${title}`,
    [
      `Hello ${name},`,
      `Jesus' Mission Fund has asked you for a report: ${title}.`,
      ...(dueDate ? [`Please send it by ${dueDate}.`] : []),
    ],
    { label: "View the request", url },
  );
}
