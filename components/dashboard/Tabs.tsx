import Link from "next/link";

import { cn } from "cn";

export function Tabs({
  label,
  tabs,
  current,
}: {
  label: string;
  tabs: readonly { href: string; label: string; id: string }[];
  current: string;
}) {
  return (
    <nav aria-label={label} className="flex gap-1">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={tab.href}
          aria-current={tab.id === current ? "page" : undefined}
          className={cn(
            "-mb-px border-b-2 px-4 py-2.5 text-sm font-medium",
            tab.id === current
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:text-foreground",
          )}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
