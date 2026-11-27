import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { plainLinkClass } from "@/components/styles";

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className={plainLinkClass}>
      <ArrowLeft aria-hidden="true" className="size-4" />
      {label}
    </Link>
  );
}
