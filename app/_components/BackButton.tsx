"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { outlineButtonClass } from "@/components/styles";
import { cn } from "cn";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() =>
        window.history.length > 1 ? router.back() : router.push("/")
      }
      className={cn(outlineButtonClass, "bg-card hover:bg-accent")}
    >
      <ArrowLeft aria-hidden="true" className="size-4" />
      Go back
    </button>
  );
}
