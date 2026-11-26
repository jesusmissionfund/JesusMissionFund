"use client";

import { useState, useTransition } from "react";
import { Check } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { reviewApplication } from "../actions";
import { inputClass } from "./input-class";

export function ReviewActions({
  applicationId,
  applicantName,
  minReapplyDate,
}: {
  applicationId: string;
  applicantName: string;
  minReapplyDate: string;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [dialog, setDialog] = useState<"approve" | "reject" | null>(null);
  const [reason, setReason] = useState("");
  const [reapplyAfter, setReapplyAfter] = useState("");

  function decide(decision: Parameters<typeof reviewApplication>[1]) {
    setError("");
    startTransition(async () => {
      const result = await reviewApplication(applicationId, decision);
      if (result.error) setError(result.error);
      setDialog(null);
    });
  }

  return (
    <div className="flex flex-col items-start gap-2 sm:items-end">
      <div className="flex gap-2">
        <AlertDialog
          open={dialog === "approve"}
          onOpenChange={(open) => setDialog(open ? "approve" : null)}
        >
          <AlertDialogTrigger
            render={
              <Button
                disabled={pending}
                className="gap-2 bg-primary px-3 text-xs font-semibold hover:bg-primary-hover"
              />
            }
          >
            <Check aria-hidden="true" className="size-3.5" />
            Approve
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Approve {applicantName}&apos;s application?
              </AlertDialogTitle>
              <AlertDialogDescription>
                They will be emailed that it was approved. A decision can&apos;t
                be changed afterwards.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                disabled={pending}
                onClick={() => decide({ status: "APPROVED" })}
              >
                Approve
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog
          open={dialog === "reject"}
          onOpenChange={(open) => setDialog(open ? "reject" : null)}
        >
          <AlertDialogTrigger
            render={
              <Button
                variant="outline"
                disabled={pending}
                className="border-destructive/30 px-3 text-xs font-semibold text-destructive"
              />
            }
          >
            Reject
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Reject {applicantName}&apos;s application?
              </AlertDialogTitle>
              <AlertDialogDescription>
                They will be emailed that it was not approved, with this reason.
                It also shows on their dashboard. A decision can&apos;t be
                changed afterwards.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <textarea
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              rows={4}
              maxLength={1000}
              aria-label="Reason for rejection"
              placeholder="Reason"
              className={inputClass}
            />
            <label className="grid gap-1.5 text-sm">
              <span>Can apply again from (optional)</span>
              <input
                type="date"
                min={minReapplyDate}
                value={reapplyAfter}
                onChange={(event) => setReapplyAfter(event.target.value)}
                className={inputClass}
              />
              <span className="text-xs text-muted-foreground">
                Not shown to the applicant. Leave empty to let them apply again
                straight away.
              </span>
            </label>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                disabled={pending || !reason.trim()}
                onClick={() =>
                  decide({
                    status: "REJECTED",
                    reason,
                    reapplyAfter: reapplyAfter || undefined,
                  })
                }
              >
                Reject
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      {error && (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
