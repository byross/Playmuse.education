import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PlayMuse Education",
  description: "Official website for PlayMuse Education.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
