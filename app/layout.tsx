import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import PlausibleProvider from "next-plausible";
import { Analytics } from "@vercel/analytics/react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LibSwitch",
  description: "Seamlessly Convert Code Between Libraries",
  manifest: "/manifest.json",
  themeColor: "#3b82f6",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  icons: [
    { rel: "icon", url: "/favicon.ico", sizes: "32x32" },
    { rel: "icon", url: "/favicon-16x16.ico", sizes: "16x16" },
    { rel: "apple-touch-icon", url: "/icon-192x192.png" },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
  },
  openGraph: {
    type: "website",
    url: "https://libswitch.dev",
    title: "LibSwitch",
    description: "Seamlessly Convert Code Between Libraries",
    images: [{ url: "/og-image.jpg" }],
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
        <PlausibleProvider domain="libswitch.dev" />
        <script
          defer
          data-website-id="6750f258f5c8b04bddb07acf"
          data-domain="libswitch.dev"
          src="https://datafa.st/js/script.js"
        ></script>
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
