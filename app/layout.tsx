import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { Analytics } from "@vercel/analytics/next"

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
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
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
