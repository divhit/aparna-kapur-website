import type { Metadata } from "next";
import {
  Raleway,
  Cormorant_Garamond,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SiteIdentitySchema } from "@/components/seo/JsonLd";
import ChatWidget from "@/components/chat/ChatWidget";
import ExitIntentPopup from "@/components/lead-capture/ExitIntentPopup";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

const raleway = Raleway({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aparnakapur.com"),
  alternates: {
    canonical: "./",
  },
  // No "%s | Aparna Kapur" template: it added 15 characters to every title and
  // pushed 97 of them past the ~60 characters Google displays. The site name is
  // published separately in the WebSite schema, which is what search engines
  // now use to label the source.
  title: "Aparna Kapur | Oakridge Vancouver Real Estate | Oakwyn Realty",
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
  other: {
    "geo.region": "CA-BC",
    "geo.placename": "Vancouver",
    "geo.position": "49.2488;-123.1275",
    ICBM: "49.2488, -123.1275",
  },
  verification: {
    google: "92v2XTbnirJ_PGqJk6MoYNA3_7Da5XqY-nELvtykEao",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-CA"
      className={`${raleway.variable} ${cormorant.variable} ${playfair.variable}`}
    >
      <body className="font-sans antialiased">
        <GoogleAnalytics />
        <SiteIdentitySchema />
        <div data-site-chrome="header">
          <Header />
        </div>
        <main>{children}</main>
        <div data-site-chrome="footer">
          <Footer />
        </div>
        <div data-site-chrome="chat">
          <ChatWidget />
        </div>
        <div data-site-chrome="popup">
          <ExitIntentPopup />
        </div>
      </body>
    </html>
  );
}
