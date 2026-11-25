"use client";

import { useState, useTransition } from "react";
import { MoreHorizontal } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { banUser, removeUser, revokeUserSessions, unbanUser } from "../actions";

type User = { id: string; name: string; banned: boolean };

export function UserActions({ user }: { user: User }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [dialog, setDialog] = useState<"ban" | "remove" | null>(null);
  const [banReason, setBanReason] = useState("");

  function run(action: () => Promise<{ error?: string }>) {
    setError("");
    startTransition(async () => {
      const result = await action();
      if (result.error) setError(result.error);
      setDialog(null);
    });
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label={`Actions for ${user.name}`}
          disabled={pending}
          className="flex size-9 items-center justify-center text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
        >
          <MoreHorizontal aria-hidden="true" className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => run(() => revokeUserSessions(user.id))}>Sign out everywhere</DropdownMenuItem>
          <DropdownMenuSeparator />
          {user.banned ? (
            <DropdownMenuItem onClick={() => run(() => unbanUser(user.id))}>Unban</DropdownMenuItem>
          ) : (
            <DropdownMenuItem variant="destructive" onClick={() => setDialog("ban")}>Ban</DropdownMenuItem>
          )}
          <DropdownMenuItem variant="destructive" onClick={() => setDialog("remove")}>Delete user</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={dialog === "ban"} onOpenChange={(open) => !open && setDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ban {user.name}?</AlertDialogTitle>
            <AlertDialogDescription>They will be signed out and can&apos;t sign in until unbanned.</AlertDialogDescription>
          </AlertDialogHeader>
          <Input value={banReason} onChange={(event) => setBanReason(event.target.value)} placeholder="Reason (optional)" aria-label="Ban reason" />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" disabled={pending} onClick={() => run(() => banUser(user.id, banReason))}>Ban</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={dialog === "remove"} onOpenChange={(open) => !open && setDialog(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {user.name}?</AlertDialogTitle>
            <AlertDialogDescription>This permanently deletes the account and everything linked to it, including any missionary application or partnership.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" disabled={pending} onClick={() => run(() => removeUser(user.id))}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {error && <p role="alert" className="max-w-56 text-right text-xs text-destructive">{error}</p>}
    </div>
  );
}
