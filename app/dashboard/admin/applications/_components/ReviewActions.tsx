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

export function ReviewActions({ applicationId, applicantName }: { applicationId: string; applicantName: string }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [confirmingReject, setConfirmingReject] = useState(false);

  function decide(decision: "APPROVED" | "REJECTED") {
    setError("");
    startTransition(async () => {
      const result = await reviewApplication(applicationId, decision);
      if (result.error) setError(result.error);
      setConfirmingReject(false);
    });
  }

  return (
    <div className="flex flex-col items-start gap-2 sm:items-end">
      <div className="flex gap-2">
        <Button onClick={() => decide("APPROVED")} disabled={pending} className="gap-2 bg-primary px-3 text-xs font-semibold hover:bg-primary-hover">
          <Check aria-hidden="true" className="size-3.5" />
          Approve
        </Button>
        <AlertDialog open={confirmingReject} onOpenChange={setConfirmingReject}>
          <AlertDialogTrigger render={<Button variant="outline" disabled={pending} className="border-destructive/30 px-3 text-xs font-semibold text-destructive" />}>
            Reject
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reject {applicantName}&apos;s application?</AlertDialogTitle>
              <AlertDialogDescription>They will see that their application was not approved.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive" disabled={pending} onClick={() => decide("REJECTED")}>Reject</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      {error && <p role="alert" className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
