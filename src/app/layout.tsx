import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Supervisors of India | Connect • Collaborate • Construct",
  description:
    "India's premier marketplace connecting construction professionals with clients. Hire verified Site Supervisors, Civil Engineers, Architects, and more.",
  keywords: [
    "construction professionals",
    "site supervisors",
    "civil engineers",
    "architects",
    "India",
    "builders",
    "contractors",
  ],
  openGraph: {
    title: "Supervisors of India",
    description: "Connect • Collaborate • Construct",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-manrope">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}