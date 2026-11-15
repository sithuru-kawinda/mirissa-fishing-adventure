import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Poppins } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { EmailButton } from "@/components/layout/EmailButton";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import "./globals.css";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Fishing Trips in Mirissa, Sri Lanka`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Mirissa fishing",
    "fishing trips Sri Lanka",
    "deep sea fishing Mirissa",
    "Sri Lanka fishing adventure",
    "Mirissa tours",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    title: `${site.name} | Fishing Trips in Mirissa, Sri Lanka`,
    description: site.description,
    images: [{ url: images.hero, width: 1800, height: 1200, alt: "Fishing boats off the coast of Mirissa" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0f2a1d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <EmailButton />
      </body>
    </html>
  );
}
