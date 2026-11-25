import Link from "next/link";
import { ArrowLeft, Bell, ChevronRight } from "lucide-react";

type DashboardLink = { label: string; href: string };

export default function DashboardShell({
  role,
  name,
  title,
  subtitle,
  links,
  children,
}: {
  role: "Missionary" | "Administrator" | "Giving partner";
  name: string;
  title: string;
  subtitle: string;
  links: DashboardLink[];
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f4f6f1] text-[#1c2c22]">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-[#e2e8df] bg-white px-5 py-6 lg:flex">
        <Link href="/" className="flex items-center gap-3 font-semibold"><span className="flex h-10 w-10 items-center justify-center bg-[#e8eee5] text-sm text-[#315b42]">JM</span><span>Jesus&apos; Mission Fund</span></Link>
        <div className="mt-10 border-y border-[#e8ece6] py-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8a978b]">{role} portal</p>
          <p className="mt-2 text-sm font-semibold">{name}</p>
        </div>
        <nav aria-label={`${role} dashboard`} className="mt-5 grid gap-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="flex min-h-11 items-center justify-between px-3 text-sm font-medium text-[#52645a] transition-colors hover:bg-[#f1f4ef] hover:text-[#174b35]">
              {link.label}<ChevronRight aria-hidden="true" className="h-4 w-4 text-[#a1ada1]" />
            </Link>
          ))}
        </nav>
        <Link href="/" className="mt-auto inline-flex items-center gap-2 px-3 py-3 text-sm text-[#66746a] hover:text-[#174b35]"><ArrowLeft aria-hidden="true" className="h-4 w-4" />Back to website</Link>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-[#e2e8df] bg-white/95 backdrop-blur-sm">
          <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
            <div><p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#708073]">{role} dashboard</p><p className="mt-1 text-sm font-semibold">{name}</p></div>
            <div className="flex items-center gap-4"><button type="button" aria-label="Notifications (preview)" className="flex h-10 w-10 items-center justify-center border border-[#e2e8df] text-[#52645a]"><Bell aria-hidden="true" className="h-4 w-4" /></button><Link href="/sign-in" className="text-sm font-semibold text-[#315b42]">Sign in</Link></div>
          </div>
          <nav aria-label="Dashboard sections" className="flex gap-1 overflow-x-auto border-t border-[#eef1ec] px-5 py-2 lg:hidden">
            {links.map((link) => <Link key={link.href} href={link.href} className="shrink-0 px-3 py-2 text-xs font-medium text-[#52645a]">{link.label}</Link>)}
          </nav>
        </header>

        <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
          <div className="mb-7 border border-[#d8e2d4] bg-[#edf3e9] px-4 py-3 text-xs leading-5 text-[#52645a]">
            <span className="font-semibold text-[#315b42]">UI preview.</span> Sample information only; sign-in, saving, and notifications are not connected yet.
          </div>
          <div className="mb-8"><h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-[#66746a]">{subtitle}</p></div>
          {children}
        </main>
      </div>
    </div>
  );
}
