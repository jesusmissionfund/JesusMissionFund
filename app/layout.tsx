import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const siteName = "Jesus' Mission Fund";
const description =
  "Jesus' Mission Fund gives missionaries practical support and connects them with partners who give and pray for their work.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3009"),
  title: { default: siteName, template: `%s · ${siteName}` },
  description,
  applicationName: siteName,
  openGraph: { type: "website", siteName, title: siteName, description, locale: "en" },
  twitter: { card: "summary_large_image", title: siteName, description },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
