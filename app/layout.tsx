import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://buildora.co"),
  title: "Buildora | Technology. Strategy. Execution.",
  description: "Buildora is a founder-led technology agency helping startups and businesses scale through software engineering, AI automation, cybersecurity, product strategy, and digital transformation solutions.",
  keywords: "technology agency, software engineering, AI automation, cybersecurity, product strategy, digital transformation, startup, SaaS",
  icons: {
    icon: "/Buildora.png",
    apple: "/Buildora.png",
    shortcut: "/Buildora.png",
  },
  openGraph: {
    title: "Buildora | Technology. Strategy. Execution.",
    description: "Founder-led technology agency built to help startups and businesses scale.",
    type: "website",
    images: [{ url: "/Buildora.png", width: 1024, height: 1024, alt: "Buildora" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
