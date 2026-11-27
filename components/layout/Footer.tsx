import Image from "next/image";
import Link from "next/link";
import { Instagram, LinkedinIcon, Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/site/layout";
import { logoSrc, siteLinks, siteName } from "@/lib/site";

const footerLinks = [...siteLinks, { name: "Volunteer", href: "/volunteer" }];

const socialLinks = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/jesusmissionfund/?hl=en",
    label: "Instagram",
  },
  {
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/in/jesus-mission-fund-9100a43a1/",
    label: "LinkedIn",
  },
];

const headingClass =
  "mb-6 text-xs font-bold uppercase tracking-[0.16em] text-inverse-foreground/85";
const linkClass =
  "text-inverse-foreground/65 transition-colors hover:text-inverse-foreground";
const iconClass = "size-5 shrink-0 text-inverse-muted";

export default function Footer() {
  return (
    <footer className="bg-inverse text-inverse-foreground">
      <Container className="py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Image
              src={logoSrc}
              alt={siteName}
              width={48}
              height={48}
              className="mb-5"
            />
            <p className="mb-6 max-w-md leading-7 text-inverse-foreground/65">
              Practical support for missionaries serving their communities.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-10 items-center justify-center border border-inverse-foreground/20 text-inverse-foreground/75 transition-colors hover:bg-card/10"
                >
                  <Icon aria-hidden="true" className="size-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className={headingClass}>Quick Links</h2>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={headingClass}>Contact Us</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin aria-hidden="true" className={`${iconClass} mt-1`} />
                <span className="text-inverse-foreground/65">
                  Community 8<br />
                  Adjacent Deks Educational Institute, Tema
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone aria-hidden="true" className={iconClass} />
                <a className={linkClass} href="tel:+233547537888">
                  +233 54 753 7888
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail aria-hidden="true" className={iconClass} />
                <a
                  className={linkClass}
                  href="mailto:Jesusmissionfund@gmail.com"
                >
                  Jesusmissionfund@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-inverse-foreground/15 pt-7 text-xs text-inverse-foreground/50">
          © {new Date().getFullYear()} {siteName}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
