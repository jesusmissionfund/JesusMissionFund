import { answerSections } from "@/app/(auth)/signup/missionary/schema";

export function ApplicationAnswers({
  answers,
}: {
  answers: Parameters<typeof answerSections>[0];
}) {
  return (
    <div className="space-y-5">
      {answerSections(answers).map((section) => (
        <section key={section.step} className="border border-border bg-card">
          <h2 className="border-b border-border bg-muted px-5 py-3 text-sm font-semibold sm:px-6">
            {section.title}
          </h2>
          <dl className="divide-y divide-border">
            {section.rows.map(([label, value]) => (
              <div
                key={label}
                className="grid gap-1 px-5 py-3 sm:grid-cols-[0.9fr_1.1fr] sm:px-6"
              >
                <dt className="text-sm text-muted-foreground">{label}</dt>
                <dd className="whitespace-pre-line text-sm">{value ?? "—"}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
