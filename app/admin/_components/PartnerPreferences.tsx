import type { PartnerProfile } from "@/app/generated/prisma/client";
import { formatDate } from "@/lib/format";

export function PartnerPreferences({
  partner,
}: {
  partner: Pick<
    PartnerProfile,
    "frequency" | "amount" | "supportInterest" | "message" | "updatedAt"
  >;
}) {
  return (
    <>
      <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-3">
        {[
          ["Frequency", partner.frequency],
          ["Amount", partner.amount],
          ["Support", partner.supportInterest],
        ].map(([label, value]) => (
          <div key={label}>
            <dt className="inline text-muted-foreground">{label}: </dt>
            <dd className="inline">{value ?? "—"}</dd>
          </div>
        ))}
      </dl>
      {partner.message && (
        <p className="mt-3 whitespace-pre-line border-l-2 border-border pl-3 text-sm text-muted-foreground">
          {partner.message}
        </p>
      )}
      <p className="mt-3 text-xs text-subtle-foreground">
        Updated {formatDate(partner.updatedAt)}
      </p>
    </>
  );
}
