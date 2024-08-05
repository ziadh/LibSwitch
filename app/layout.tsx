import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CompSwitch",
  description: "A tool to help you convert components between frameworks",
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
    statusBarStyle: 'default',
  },
  openGraph: {
    type: 'website',
    url: 'https://your-domain.com',
    title: 'CompSwitch',
    description: 'A tool to help you convert components between frameworks',
    images: [{ url: '/og-image.jpg' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
