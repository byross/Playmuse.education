import type { Metadata } from "next";
import { Cause, Chiron_GoRound_TC } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";

// Hand-drawn display face — matches the painted PlayMuse wordmark.
const gooddog = localFont({
  src: "../../public/font/gooddognew.ttf",
  variable: "--font-gooddog",
  display: "swap",
  weight: "400",
});

// Rounded UI face for headings, nav and buttons.
const arialRounded = localFont({
  src: "../../public/font/Arial Rounded Bold.ttf",
  variable: "--font-arial-rounded",
  display: "swap",
  weight: "700",
});

// Traditional Chinese display face.
const yapi = localFont({
  src: "../../public/font/yapi-tc.woff2",
  variable: "--font-yapi",
  display: "swap",
  weight: "400",
});

const cause = Cause({
  subsets: ["latin"],
  variable: "--font-cause",
  display: "swap",
});

const chiron = Chiron_GoRound_TC({
  weight: ["400", "500", "700"],
  variable: "--font-chiron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PlayMuse Education — Thoughtful, joyful digital learning",
  description:
    "PlayMuse Education Limited develops interactive learning experiences with a focus on playful music education for children and families.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${gooddog.variable} ${arialRounded.variable} ${yapi.variable} ${cause.variable} ${chiron.variable}`}
    >
      <body>
        <LanguageProvider>
          <NavBar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
