import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { RealEstateAgentSchema, WebsiteSchema } from "@/components/seo/JsonLd";
import ChatWidget from "@/components/chat/ChatWidget";
import ExitIntentPopup from "@/components/lead-capture/ExitIntentPopup";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aparnakapur.com"),
  title: {
    default: "Aparna Kapur | Oakridge Vancouver Real Estate | Oakwyn Realty",
    template: "%s | Aparna Kapur, Oakwyn Realty",
  },
  description:
    "Your trusted Oakridge & Vancouver real estate expert. Aparna Kapur with Oakwyn Realty helps buyers and sellers navigate Vancouver's most exciting neighborhoods.",
  keywords: [
    "Oakridge Vancouver real estate",
    "Vancouver realtor",
    "Oakwyn Realty",
    "Oakridge homes for sale",
    "Vancouver real estate agent",
    "Aparna Kapur",
  ],
  authors: [{ name: "Aparna Kapur" }],
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: "Aparna Kapur Real Estate",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aparna Kapur - Oakridge Vancouver Real Estate Expert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <GoogleAnalytics />
        <RealEstateAgentSchema />
        <WebsiteSchema />
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
        <ExitIntentPopup />
      </body>
    </html>
  );
}
