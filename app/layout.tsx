import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Badrul Hanif",
  description:
    "Creative strategist helping brands craft engaging digital experiences.",
  keywords: [
    "Badrul Hanif",
    "UI/UX Design",
    "Branding",
    "Marketing",
    "Web Design",
    "Web Development",
    "Mobile App Design",
    "E-commerce Solutions",
  ],
  metadataBase: new URL("https://badrulhanif.com"),
  robots: "index, follow",
  authors: [{ name: "Badrul Hanif", url: "https://badrulhanif.com" }],
  creator: "Badrul Hanif",
  publisher: "Badrul Hanif",
  alternates: {
    canonical: "https://badrulhanif.com",
  },
  openGraph: {
    title: "Badrul Hanif",
    description:
      "Creative strategist helping brands craft engaging digital experiences.",
    url: "https://badrulhanif.com",
    siteName: "Badrul Hanif",
    images: [
      {
        url: "https://badrulhanif.com/Images/banner.png",
        width: 1200,
        height: 630,
        alt: "Badrul Hanif",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Badrul Hanif",
    description:
      "Creative strategist helping brands craft engaging digital experiences.",
    images: ["https://badrulhanif.com/Images/banner.png"],
    creator: "@bbadrulhanif",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9CQTTCVFLQ"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-9CQTTCVFLQ');
  `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
