import Link from "next/link";
import { ArrowRight, HandHeart, UserRound, Users } from "lucide-react";

const pathways = [
  { icon: UserRound, title: "I’m a missionary", description: "Apply for practical ministry support. Approved missionaries receive access to their portal.", href: "/missionary/apply", action: "Start application" },
  { icon: HandHeart, title: "I want to become a partner", description: "Register your interest and preferred giving frequency, then continue to mobile money giving.", href: "/partner/join", action: "Join as a partner" },
  { icon: Users, title: "I want to volunteer", description: "Tell us about your skills and availability so we can follow up about opportunities.", href: "/volunteer", action: "Register to volunteer" },
];

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm font-semibold text-brand">Jesus&apos; Mission Fund</Link>
        <div className="mt-12 max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-muted">Get started</p><h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Choose your path.</h1><p className="mt-4 text-base leading-7 text-muted-foreground">Tell us how you’d like to take part. Each pathway begins with a short form on this site.</p></div>
        <div className="mt-9 grid gap-4 md:grid-cols-3">{pathways.map(({ icon: Icon, title, description, href, action }) => <article key={title} className="flex flex-col border border-border bg-card p-6 sm:p-7"><span className="flex h-10 w-10 items-center justify-center bg-secondary text-brand"><Icon aria-hidden="true" className="h-5 w-5" /></span><h2 className="mt-5 text-xl font-semibold text-foreground">{title}</h2><p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{description}</p><Link href={href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand underline decoration-brand/40 underline-offset-4">{action}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></article>)}</div>
        <section className="mt-7 border border-border bg-accent p-5 sm:p-6"><h2 className="font-semibold text-foreground">Administrator access</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Admin accounts are created by invitation to keep application and report data protected.</p><Link href="/sign-in" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand">Administrator sign in<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></section>
        <p className="mt-8 text-sm text-muted-foreground">Already have an account? <Link href="/sign-in" className="font-semibold text-brand underline">Sign in</Link></p>
        <p className="mt-7 text-center text-xs text-subtle-foreground">Prototype preview: registration is not connected to accounts or a database yet.</p>
      </div>
    </main>
  );
}
