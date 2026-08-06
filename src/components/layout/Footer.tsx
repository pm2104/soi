import { HardHat, Mail, Phone, MapPin } from "lucide-react";
import { FOOTER_LINKS } from "@/lib/constants";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white/10 p-2 rounded-xl">
                <HardHat className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold">SUPERVISORS OF INDIA</h3>
                <p className="text-xs text-white/50 tracking-widest uppercase">
                  Connect • Collaborate • Construct
                </p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
              India's most trusted marketplace connecting construction professionals
              with clients. Building the future, one project at a time.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Mail className="h-4 w-4 text-accent" />
                <span>contact@supervisorsofindia.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Phone className="h-4 w-4 text-accent" />
                <span>+91 1800-XXX-XXXX</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <MapPin className="h-4 w-4 text-accent" />
                <span>Pan India Operations</span>
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.platform.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-3 mb-8">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">
              Social
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.social.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-bold mb-1">Subscribe to our newsletter</h4>
              <p className="text-sm text-white/50">
                Get the latest updates on construction trends and professionals.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-accent transition-colors"
              />
              <button className="px-6 py-3 bg-accent hover:bg-accent-600 text-white font-semibold rounded-2xl transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Supervisors of India. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}