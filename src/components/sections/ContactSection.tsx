"use client";

import { FormEvent, ReactNode, useState } from "react";

type Status = {
  type: "success" | "error" | null;
  message: string;
};

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<Status>({
    type: null,
    message: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);

    setStatus({
      type: null,
      message: "",
    });

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const message = String(formData.get("message") || "").trim();

    // Basic client-side validation
    if (!name || !email || !phone || !message) {
      setStatus({
        type: "error",
        message: "Please fill in all required fields.",
      });

      setIsSubmitting(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });

      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Something went wrong.");
      }

      setStatus({
        type: "success",
        message:
          "Thank you! Your message has been sent successfully. Our team will get back to you soon.",
      });

      form.reset();
    } catch (error) {
      console.error("Contact form error:", error);

      setStatus({
        type: "error",
        message:
          "Something went wrong while sending your message. Please try again or contact us directly at info@soiglobal.in.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="bg-[#f8f9fb] px-6 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
        {/* ================================================================
            LEFT — CONTACT INFORMATION
        ================================================================ */}

        <div className="pt-1">
          <h2 className="text-3xl font-bold tracking-tight text-[#0d1b41] sm:text-4xl">
            Get in Touch
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[#536b8a]">
            Have questions about joining Supervisors of India? Need help
            posting a project? Our team is ready to assist you.
          </p>

          <div className="mt-10 space-y-7">
            {/* ============================================================
                OFFICE ADDRESS
            ============================================================ */}

            <ContactInfo
              icon={<LocationIcon />}
              title="Office Address"
              content={
                <>
                  123 Construction Hub, Sector 45
                  <br />
                  New Delhi, India 110001
                </>
              }
            />

            {/* ============================================================
                WHATSAPP
            ============================================================ */}

            <ContactInfo
              icon={<WhatsAppIcon />}
              title="WhatsApp"
              content="+91 98765 43210"
              href="https://wa.me/919876543210?text=Hello%20SOI%2C%20I%20would%20like%20to%20know%20more%20about%20Supervisors%20of%20India."
              external
            />

            {/* ============================================================
                EMAIL
            ============================================================ */}

            <ContactInfo
              icon={<EmailIcon />}
              title="Email"
              content="info@soiglobal.in"
              href="mailto:info@soiglobal.in"
            />
          </div>
        </div>

        {/* ================================================================
            RIGHT — CONTACT FORM
        ================================================================ */}

        <div className="rounded-2xl border border-[#e5e8ee] bg-white p-7 shadow-sm sm:p-9 lg:p-10">
          <h2 className="text-3xl font-bold tracking-tight text-[#0d1b41]">
            Send a Message
          </h2>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* ==========================================================
                FULL NAME
            ========================================================== */}

            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-[#0d1b41]"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                autoComplete="name"
                required
                disabled={isSubmitting}
                maxLength={100}
                className="w-full rounded-xl border border-[#dfe4eb] bg-white px-5 py-4 text-[#0d1b41] outline-none transition placeholder:text-[#91a0b5] focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 disabled:cursor-not-allowed disabled:bg-gray-50"
              />
            </div>

            {/* ==========================================================
                EMAIL
            ========================================================== */}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#0d1b41]"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                required
                disabled={isSubmitting}
                maxLength={150}
                className="w-full rounded-xl border border-[#dfe4eb] bg-white px-5 py-4 text-[#0d1b41] outline-none transition placeholder:text-[#91a0b5] focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 disabled:cursor-not-allowed disabled:bg-gray-50"
              />
            </div>

            {/* ==========================================================
                PHONE
            ========================================================== */}

            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-semibold text-[#0d1b41]"
              >
                Phone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                autoComplete="tel"
                required
                disabled={isSubmitting}
                maxLength={20}
                className="w-full rounded-xl border border-[#dfe4eb] bg-white px-5 py-4 text-[#0d1b41] outline-none transition placeholder:text-[#91a0b5] focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 disabled:cursor-not-allowed disabled:bg-gray-50"
              />
            </div>

            {/* ==========================================================
                MESSAGE
            ========================================================== */}

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-semibold text-[#0d1b41]"
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="How can we help you?"
                required
                disabled={isSubmitting}
                maxLength={2000}
                className="w-full resize-none rounded-xl border border-[#dfe4eb] bg-white px-5 py-4 text-[#0d1b41] outline-none transition placeholder:text-[#91a0b5] focus:border-[#4caf50] focus:ring-2 focus:ring-[#4caf50]/20 disabled:cursor-not-allowed disabled:bg-gray-50"
              />
            </div>

            {/* ==========================================================
                SUCCESS / ERROR MESSAGE
            ========================================================== */}

            {status.type && (
              <div
                role="alert"
                aria-live="polite"
                className={`rounded-xl px-4 py-3 text-sm leading-6 ${
                  status.type === "success"
                    ? "border border-green-200 bg-green-50 text-green-700"
                    : "border border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {status.message}
              </div>
            )}

            {/* ==========================================================
                SUBMIT BUTTON
            ========================================================== */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#4caf50] px-6 py-4 text-base font-bold text-white transition hover:bg-[#43a047] focus:outline-none focus:ring-2 focus:ring-[#4caf50] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ========================================================================
   CONTACT INFORMATION COMPONENT
======================================================================== */

function ContactInfo({
  icon,
  title,
  content,
  href,
  external = false,
}: {
  icon: ReactNode;
  title: string;
  content: ReactNode;
  href?: string;
  external?: boolean;
}) {
  return (
    <div className="flex items-start gap-5">
      {/* Icon */}

      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#0d1b41] text-[#4caf50]">
        {icon}
      </div>

      {/* Content */}

      <div className="pt-1">
        <h3 className="text-lg font-bold text-[#0d1b41]">
          {title}
        </h3>

        <div className="mt-1 text-base leading-7 text-[#5f7592]">
          {href ? (
            <a
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="transition-colors hover:text-[#43a047] hover:underline"
            >
              {content}
            </a>
          ) : (
            content
          )}
        </div>
      </div>
    </div>
  );
}

/* ========================================================================
   LOCATION ICON
======================================================================== */

function LocationIcon() {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

/* ========================================================================
   WHATSAPP ICON
======================================================================== */

function WhatsAppIcon() {
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.372-.01-.57-.01-.198 0-.52.075-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982 1-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.437-9.884 9.893-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.002 5.45-4.436 9.884-9.892 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.89c0 2.096.547 4.142 1.588 5.946L.057 24l6.304-1.654a11.89 11.89 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.89a11.84 11.84 0 0 0-3.478-8.416" />
    </svg>
  );
}

/* ========================================================================
   EMAIL ICON
======================================================================== */

function EmailIcon() {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}