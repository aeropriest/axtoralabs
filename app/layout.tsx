import type { Metadata } from "next";
import { Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { TranslationsProvider } from "@/components/translations-context";
import { AuthProvider } from "@/contexts/auth-context";
import { WalletProvider } from "@/contexts/wallet-context";
import { ExtensionErrorSilencer } from "@/components/extension-error-silencer";

const manrope = Manrope({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://axtoralabs.com"),
  title:
    "Axtora Labs | Tokenizing Context-Aware Conversational AI on Virtuals Protocol",
  description:
    "Axtora Labs is launching its Initial Agent Offering (IAO) on Virtuals Protocol. Own $AXTORA - the patented, context-aware conversational AI agent tokenized on-chain. Patent No. HK30101316.",
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
    "Voice AI",
    "Robot personas",
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
    description:
      "Join the $AXTORA Initial Agent Offering on Virtuals Protocol. Patented AI technology, tokenized for the future.",
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
    description:
      "Patented context-aware conversational AI, now tokenized. Join the IAO.",
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
    icon: [{ url: "/logo-old.png", type: "image/png", sizes: "512x512" }],
    shortcut: [{ url: "/logo-old.png", type: "image/png" }],
    apple: [{ url: "/logo-old.png", sizes: "512x512", type: "image/png" }],
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
      suppressHydrationWarning
      className={`${manrope.variable} ${geistMono.variable} h-full antialiased`}
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
              logo: "https://axtoralabs.com/logo-old.png",
              sameAs: [
                "https://x.com/axtoralabs",
                "https://t.me/axtoralabs",
                "https://discord.gg/axtoralabs",
              ],
              description:
                "Axtora Labs - Tokenizing context-aware conversational AI agents on Virtuals Protocol. Patent No. HK30101316.",
            }),
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-dvh bg-background font-sans antialiased",
          manrope.variable
        )}
      >
        {/* Silences ethereum-injection collisions thrown by other wallet
            extensions before Next.js's dev overlay shows them. Mounted
            as early as possible (right inside <body>). */}
        <ExtensionErrorSilencer />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <WalletProvider>
              <TranslationsProvider>
                <div className="relative flex min-h-dvh flex-col bg-background">
                  <main className="flex flex-1 flex-col">{children}</main>
                </div>
                <Toaster />
              </TranslationsProvider>
            </WalletProvider>
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
