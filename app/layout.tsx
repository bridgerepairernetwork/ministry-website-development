import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Ekklesia Elite Evangelical Ministry",
  description:
    "Nurturing the next generation of Christian leaders and changemakers",
  generator: "hayotunday",
  applicationName: "Ekklesia Elite Evangelical Ministry",
  icons: {
    icon: [
      {
        url: "/imgs/ekklisa-elite.jpeg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/imgs/ekklisa-elite.jpeg",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
  keywords: [
    "ekklesia",
    "ekklesia elite evangelical ministry",
    "ekklesia elite",
    "repairer of the breach",
    "Christian leadership",
    "evangelical ministry",
    "youth ministry",
    "spiritual growth",
    "community outreach",
    "Mojisola Olawale",
    "JFFX+2QC, Lagos Rd, Ikorodu, 104101, Lagos, Nigeria",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
