"use client";

import { useState, useTransition } from "react";

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
import { setReapplyAfter } from "../actions";
import { compactInputClass } from "@/components/styles";

export function ReapplyControl({
  applicationId,
  applicantName,
  minReapplyDate,
  reapplyAfter,
  label,
}: {
  applicationId: string;
  applicantName: string;
  minReapplyDate: string;
  reapplyAfter: string | undefined;
  label: string;
}) {
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [date, setDate] = useState(reapplyAfter ?? "");

  function save(value: string | undefined) {
    setError("");
    startTransition(async () => {
      const result = await setReapplyAfter(applicationId, value);
      if (result.error) setError(result.error);
      setOpen(false);
    });
  }

  return (
    <div className="flex flex-col items-start gap-2 sm:items-end">
      <p className="text-sm text-muted-foreground">{label}</p>
      <AlertDialog
        open={open}
        onOpenChange={(next) => {
          if (next) setDate(reapplyAfter ?? "");
          setOpen(next);
        }}
      >
        <AlertDialogTrigger
          render={
            <Button
              variant="outline"
              disabled={pending}
              className="px-3 text-xs font-semibold"
            />
          }
        >
          Change
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              When can {applicantName} apply again?
            </AlertDialogTitle>
            <AlertDialogDescription>
              The application stays rejected. This only changes when the Apply
              again option appears on their dashboard. They aren&apos;t told the
              date.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <label className="grid gap-1.5 text-sm">
            <span>Can apply again from</span>
            <input
              type="date"
              min={minReapplyDate}
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className={compactInputClass}
            />
          </label>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="outline"
              disabled={pending}
              onClick={() => save(undefined)}
            >
              Allow now
            </Button>
            <AlertDialogAction
              disabled={pending || !date}
              onClick={() => save(date)}
            >
              Save date
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {error && (
        <p role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
