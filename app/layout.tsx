import type { Metadata } from "next";
import { Big_Shoulders_Display, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const display = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://soiglobal.in"),
  title: "Supervisors On India | Launching Soon",
  description:
    "Where construction projects meet trusted professionals. Hire verified supervisors, engineers, architects, project managers, and construction experts across India.",
  openGraph: {
    title: "Supervisors On India",
    description:
      "Where construction projects meet trusted professionals — hire verified supervisors, engineers, architects, project managers, and construction experts across India.",
    url: "https://soiglobal.in",
    siteName: "Supervisors On India",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
