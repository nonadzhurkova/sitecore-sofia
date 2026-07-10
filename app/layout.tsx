import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { Analytics } from "@vercel/analytics/next"

const GTM_ID = "GTM-T5QVDQB8";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sitecore Sofia User Group",
  description: "Join our community of Sitecore developers, architects, and enthusiasts in Sofia, Bulgaria.",
  metadataBase: new URL('https://sitecore-sofia.vercel.app'),
  openGraph: {
    title: "Sitecore Sofia User Group",
    description: "Join our community of Sitecore developers, architects, and enthusiasts in Sofia, Bulgaria.",
    url: 'https://sitecore-sofia.vercel.app',
    siteName: 'Sitecore Sofia User Group',
    images: [
      {
        url: '/sofia.jpg',
        width: 1200,
        height: 630,
        alt: 'Sitecore Sofia User Group'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sitecore Sofia User Group',
    description: 'Join our community of Sitecore developers, architects, and enthusiasts in Sofia, Bulgaria.',
    images: ['/sofia.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "teqRgAWMHjlsdVgeqzIIDqXgcPjNMORgTt7OQLplvR0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Analytics/>
      </body>
    </html>
  );
}
