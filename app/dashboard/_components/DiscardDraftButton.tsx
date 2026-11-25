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
import { cn } from "cn";
import { discardDraft } from "../actions";

export function DiscardDraftButton({
  kind,
  what,
  className,
}: {
  kind: "missionary" | "partner";
  what: string;
  className?: string;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  return (
    <AlertDialog>
      <AlertDialogTrigger
        disabled={pending}
        className={cn(
          "text-sm font-medium underline underline-offset-4 disabled:opacity-50",
          className,
        )}
      >
        Discard
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Discard {what}?</AlertDialogTitle>
          <AlertDialogDescription>
            Anything you&apos;ve filled in so far will be deleted. You can start
            again at any time.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={pending}
            onClick={() =>
              startTransition(async () => {
                const result = await discardDraft(kind);
                if (result.error) setError(result.error);
              })
            }
          >
            Discard
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
