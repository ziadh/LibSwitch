import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CompSwitch",
  description: "A tool to help you convert components between frameworks",
  icons: [
    { rel: "icon", url: "/favicon.ico", sizes: "32x32" },
    { rel: "icon", url: "/favicon-16x16.ico", sizes: "16x16" },
  ],
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
