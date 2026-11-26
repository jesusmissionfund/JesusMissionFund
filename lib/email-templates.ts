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

export function passwordResetEmail(name: string, url: string): Template {
  const paragraphs = [
    `Hello ${name},`,
    "We received a request to reset the password for your Jesus' Mission Fund account. The link below is valid for one hour.",
    "If you didn't ask for this, you can ignore this email and your password will stay the same.",
  ];
  return {
    subject: "Reset your password",
    html: layout(paragraphs, { label: "Reset password", url }),
    text: `${paragraphs.join("\n\n")}\n\nReset your password: ${url}`,
  };
}
