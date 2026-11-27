"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { buttonClass } from "@/components/styles";

type Field = {
  name: string;
  label: string;
  type?: "email" | "tel" | "select" | "textarea";
  options?: string[];
};

const sections: { title: string; description?: string; fields: Field[] }[] = [
  {
    title: "Your contact details",
    fields: [
      { name: "fullName", label: "Full name" },
      { name: "email", label: "Email address", type: "email" },
      { name: "phone", label: "Phone number", type: "tel" },
      { name: "location", label: "Where are you based?" },
    ],
  },
  {
    title: "How you’d like to help",
    description:
      "This helps us match your interests and availability with current needs.",
    fields: [
      {
        name: "interest",
        label: "Area of interest",
        type: "select",
        options: [
          "Events and outreach",
          "Communications and media",
          "Administration",
          "Fundraising",
          "Prayer support",
          "Other",
        ],
      },
      {
        name: "skills",
        label: "Skills or experience you’d like to offer",
        type: "textarea",
      },
      {
        name: "availability",
        label: "Availability",
        type: "select",
        options: [
          "A few hours each week",
          "A few hours each month",
          "For specific events",
          "Flexible",
        ],
      },
      {
        name: "motivation",
        label: "Why would you like to volunteer with us?",
        type: "textarea",
      },
    ],
  },
];

const controlClass =
  "border border-input bg-card font-normal text-foreground placeholder:text-subtle-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/10";

export function VolunteerForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted)
    return (
      <section
        role="status"
        className="mt-10 border border-input bg-card p-7 sm:p-10"
      >
        <CheckCircle2 aria-hidden="true" className="size-8 text-brand" />
        <h2 className="mt-5 text-2xl font-semibold text-foreground">
          Thanks for offering to help.
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
          In the connected version, your volunteer details will be sent to the
          team for review.
        </p>
        <p className="mt-5 text-xs text-subtle-foreground">
          Prototype preview: this form is not yet connected to a database.
        </p>
      </section>
    );

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-6">
      {sections.map((section, index) => (
        <fieldset
          key={section.title}
          className="border border-border bg-card p-6 sm:p-8"
        >
          <legend className="sr-only">{section.title}</legend>
          <div className="mb-6 border-b border-border pb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted/70">
              Step {index + 1}
            </p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">
              {section.title}
            </h2>
            {section.description && (
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {section.description}
              </p>
            )}
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {section.fields.map((field) => (
              <label
                key={field.name}
                className={`grid gap-2 text-sm font-medium text-foreground/85 ${field.type === "textarea" ? "sm:col-span-2" : ""}`}
              >
                <span>
                  {field.label}
                  <span aria-hidden="true" className="text-destructive">
                    {" "}
                    *
                  </span>
                </span>
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    required
                    rows={4}
                    maxLength={1500}
                    className={`${controlClass} p-3`}
                  />
                ) : field.type === "select" ? (
                  <select
                    name={field.name}
                    required
                    defaultValue=""
                    className={`${controlClass} min-h-12 px-3`}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {field.options?.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    name={field.name}
                    type={field.type ?? "text"}
                    required
                    maxLength={200}
                    className={`${controlClass} min-h-12 px-3`}
                  />
                )}
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      <label className="flex items-start gap-3 px-1 text-sm leading-6 text-muted-foreground">
        <input
          type="checkbox"
          required
          className="mt-1 size-4 accent-primary"
        />
        I confirm these details are accurate and agree that Jesus&apos; Mission
        Fund may contact me about this submission.
      </label>
      <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-subtle-foreground">
          Prototype preview: your information will not be saved yet.
        </p>
        <button type="submit" className={buttonClass}>
          Send volunteer interest
          <ArrowRight aria-hidden="true" className="size-4" />
        </button>
      </div>
    </form>
  );
}
