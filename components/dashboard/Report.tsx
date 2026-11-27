import { formatDate } from "@/lib/format";
import { isOverdue } from "@/lib/report-request";

export function ReportRequestNote({
  request,
  waiting = false,
}: {
  request: {
    title: string;
    body: string;
    dueDate: Date | null;
    createdAt: Date;
  };
  waiting?: boolean;
}) {
  return (
    <section className="border-l-2 border-brand-muted bg-muted px-5 py-4">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-muted">
        Requested by Jesus&apos; Mission Fund
      </p>
      <h2 className="mt-2 font-semibold">{request.title}</h2>
      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-muted-foreground">
        {request.body}
      </p>
      <p className="mt-3 text-xs text-subtle-foreground">
        Requested {formatDate(request.createdAt)}
        {request.dueDate && ` · Due ${formatDate(request.dueDate)}`}
        {waiting && isOverdue(request) && (
          <span className="font-semibold text-destructive"> · Overdue</span>
        )}
      </p>
    </section>
  );
}

export function ReportBody({ children }: { children: string }) {
  return (
    <article className="whitespace-pre-line border border-border bg-card p-6 text-sm leading-7 sm:p-8">
      {children}
    </article>
  );
}
