import { answerSections } from "@/app/(auth)/signup/missionary/schema";

export function ApplicationAnswers({
  answers,
  summary,
}: {
  answers: Parameters<typeof answerSections>[0];
  summary: string;
}) {
  return (
    <details className="mt-5 border-t border-border pt-4">
      <summary className="cursor-pointer text-sm font-semibold text-brand">
        {summary}
      </summary>
      <div className="mt-4 grid gap-6 md:grid-cols-3">
        {answerSections(answers).map((section) => (
          <section key={section.step}>
            <h3 className="text-sm font-semibold">{section.title}</h3>
            <dl className="mt-2 space-y-2 text-sm">
              {section.rows.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-subtle-foreground">{label}</dt>
                  <dd className="whitespace-pre-line">{value ?? "—"}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </details>
  );
}
