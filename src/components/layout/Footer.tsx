import { Mail, MapPin } from "lucide-react";
import { FOOTER_LINKS } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center">
                <Image
                  src="https://res.cloudinary.com/qii92ztd/image/upload/v1786942606/file_000000002058720688cf7bdd4213f595.png"
                  alt="Supervisors of India"
                  width={56}
                  height={56}
                  className="h-12 w-12 object-contain"
                />
              </div>

              <div>
                <h3 className="text-lg font-extrabold">
                  SUPERVISORS OF INDIA
                </h3>

                <p className="text-xs text-white/50 tracking-widest uppercase">
                  Connect • Collaborate • Construct
                </p>
              </div>
            </div>

            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-sm">
              India's most trusted marketplace connecting construction
              professionals with clients. Building the future, one project at
              a time.
            </p>

            <div className="space-y-3">
              {/* Email */}
              <a
                href="mailto:info@soiglobal.in"
                className="flex items-center gap-3 text-sm text-white/60 hover:text-accent transition-colors"
              >
                <Mail className="h-4 w-4 text-accent shrink-0" />
                <span>info@soiglobal.in</span>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919315902661?text=Hello%20Supervisors%20of%20India%2C%20I%20would%20like%20to%20get%20in%20touch%20regarding%20your%20construction%20professional%20services.%20Please%20share%20more%20information.%20Thank%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-white/60 hover:text-accent transition-colors"
              >
                {/* WhatsApp SVG Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4 text-accent shrink-0"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12.004 2C6.479 2 1.988 6.49 1.988 12.016c0 1.772.464 3.503 1.345 5.027L2 22l5.102-1.31a9.95 9.95 0 0 0 4.902 1.286h.004c5.522 0 10.012-4.49 10.012-10.016C22.02 6.49 17.53 2 12.004 2zm0 18.292h-.003a8.27 8.27 0 0 1-4.215-1.154l-.302-.18-3.028.777.808-2.95-.197-.303a8.29 8.29 0 1 1 6.937 3.81z" />
                </svg>

                <span>+91 9315902661</span>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3 text-sm text-white/60">
                <MapPin className="h-4 w-4 text-accent shrink-0" />
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
              <h4 className="font-bold mb-1">
                Subscribe to our newsletter
              </h4>

              <p className="text-sm text-white/50">
                Get the latest updates on construction trends and
                professionals.
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
            © {new Date().getFullYear()} Supervisors of India. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}