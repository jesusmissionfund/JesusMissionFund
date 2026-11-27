import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteName, siteUrl } from "@/lib/site";
import { cn } from "cn";
import { Toaster } from "@/components/ui/toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteName, template: `%s · ${siteName}` },
  description:
    "We help missionaries stay focused on sharing the Gospel by bringing practical support and committed partners alongside them.",
  openGraph: { type: "website", siteName },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
