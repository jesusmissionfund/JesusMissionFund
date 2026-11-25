"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronDown, HandHeart, UserRound } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const accountTypes = [
  {
    href: "/signup/partner",
    icon: HandHeart,
    title: "As a partner",
    description: "Give to and stand with missionaries",
  },
  {
    href: "/signup/missionary",
    icon: UserRound,
    title: "As a missionary",
    description: "Apply for support in your ministry",
  },
];

export function CreateAccountMenu({
  children = "Create account",
  className,
  align = "end",
}: {
  children?: ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn("inline-flex items-center gap-1 outline-none", className)}>
        {children}
        <ChevronDown aria-hidden="true" className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-72 p-1">
        {accountTypes.map(({ href, icon: Icon, title, description }) => (
          <DropdownMenuItem key={href} render={<Link href={href} />} className="items-start gap-3 px-3 py-3">
            <span className="flex size-9 shrink-0 items-center justify-center bg-secondary text-secondary-foreground">
              <Icon aria-hidden="true" className="size-4" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-foreground">{title}</span>
              <span className="block text-xs text-muted-foreground">{description}</span>
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
