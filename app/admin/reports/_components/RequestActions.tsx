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
import { remindReportRequest, withdrawReportRequest } from "../actions";

export function RequestActions({
  requestId,
  missionaryName,
}: {
  requestId: string;
  missionaryName: string;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function run(action: (id: string) => Promise<{ error?: string }>) {
    setError("");
    startTransition(async () => {
      const result = await action(requestId);
      if (result.error) setError(result.error);
    });
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex gap-2">
        <AlertDialog>
          <AlertDialogTrigger
            render={
              <Button
                variant="outline"
                disabled={pending}
                className="px-3 text-xs font-semibold"
              />
            }
          >
            Remind
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remind {missionaryName}?</AlertDialogTitle>
              <AlertDialogDescription>
                They will be emailed a reminder about this request.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                disabled={pending}
                onClick={() => run(remindReportRequest)}
              >
                Send reminder
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger
            render={
              <Button
                variant="outline"
                disabled={pending}
                className="border-destructive/30 px-3 text-xs font-semibold text-destructive"
              />
            }
          >
            Withdraw
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Withdraw this request?</AlertDialogTitle>
              <AlertDialogDescription>
                It will be removed from {missionaryName}&apos;s dashboard.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                disabled={pending}
                onClick={() => run(withdrawReportRequest)}
              >
                Withdraw
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
