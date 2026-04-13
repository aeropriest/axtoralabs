import type { Metadata } from "next";
import { Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Manrope({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://axtoralabs.com"),
  title: "Axtora Labs | Tokenizing Context-Aware Conversational AI on Virtuals Protocol",
  description: "Axtora Labs is launching its Initial Agent Offering (IAO) on Virtuals Protocol. Own $AXTORA - the patented, context-aware conversational AI agent tokenized on-chain. Patent No. HK30101316.",
  keywords: [
    "Axtora Labs",
    "AXTORA",
    "$AXTORA",
    "IAO",
    "Initial Agent Offering",
    "Virtuals Protocol",
    "AI Agent",
    "Conversational AI",
    "Tokenized AI",
    "On-chain AI",
    "Web3 AI",
    "Crypto AI",
    "Patented AI",
    "Context-aware AI",
    "Hong Kong Patent",
  ],
  authors: [{ name: "Axtora Labs", url: "https://axtoralabs.com" }],
  creator: "Axtora Labs",
  publisher: "Axtora Labs",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://axtoralabs.com",
    siteName: "Axtora Labs",
    title: "Axtora Labs | Tokenizing Context-Aware Conversational AI",
    description: "Join the $AXTORA Initial Agent Offering on Virtuals Protocol. Patented AI technology, tokenized for the future.",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "Axtora Labs - Tokenizing the Future of Conversational AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@axtoralabs",
    creator: "@axtoralabs",
    title: "Axtora Labs | $AXTORA IAO on Virtuals Protocol",
    description: "Patented context-aware conversational AI, now tokenized. Join the IAO.",
    images: ["/banner.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png", sizes: "512x512" }],
    shortcut: [{ url: "/logo.png", type: "image/png" }],
    apple: [{ url: "/logo.png", sizes: "512x512", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Axtora Labs",
              url: "https://axtoralabs.com",
              logo: "https://axtoralabs.com/logo.png",
              sameAs: [
                "https://x.com/axtoralabs",
                "https://t.me/axtoralabs",
                "https://discord.gg/axtoralabs",
              ],
              description: "Axtora Labs - Tokenizing context-aware conversational AI agents on Virtuals Protocol. Patent No. HK30101316.",
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
