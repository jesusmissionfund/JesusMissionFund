// components/Footer.tsx
import Link from 'next/link';
import { Instagram, LinkedinIcon, Phone, MapPin, Mail } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Success stories', href: '/success-stories' },
    { name: 'Partnership', href: '/partner'},
    { name: 'Missionary', href: '/missionary' },
    { name: 'Volunteer', href: '/volunteer' },
  ];

  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, href: 'https://www.instagram.com/jesusmissionfund/?hl=en', label: 'Instagram' },
    { icon: <LinkedinIcon className="w-5 h-5" />, href: 'https://www.linkedin.com/in/jesus-mission-fund-9100a43a1/', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-inverse text-inverse-foreground">
      <div className="max-w-7xl mx-auto px-6 py-14 md:py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand & Description */}
          <div>
            {/* Logo */}
            <img
              src="/JMF_Logo-Green_NoBG.png"
              alt="Logo"
            className="h-12 w-12 mb-5"
            />
            
            <p className="text-inverse-foreground/65 mb-6 max-w-md leading-7">
              Practical support for missionaries serving their communities.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 border border-inverse-foreground/20 rounded-sm flex items-center justify-center text-inverse-foreground/75 hover:bg-card/10 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] mb-6 text-inverse-foreground/85">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-inverse-foreground/65 hover:text-inverse-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] mb-6 text-inverse-foreground/85">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-inverse-muted mr-3 mt-1 flex-shrink-0" />
                <span className="text-inverse-foreground/65">
                  Community 8<br />
                 Adjacent Deks Educational Institute ,Tema
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-inverse-muted mr-3" />
                  <a className="text-inverse-foreground/65 hover:text-inverse-foreground" href="tel:+233547537888">+233 54 753 7888</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-inverse-muted mr-3" />
                  <a className="text-inverse-foreground/65 hover:text-inverse-foreground" href="mailto:Jesusmissionfund@gmail.com">Jesusmissionfund@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-7 border-t border-inverse-foreground/15 text-left">
          <p className="text-inverse-foreground/50 text-xs">
            © {new Date().getFullYear()} Jesus&apos; Mission Fund. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
