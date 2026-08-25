import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Inter is the only typeface used across the MyLocalGuide UI kit (see
// Typography foundations in Figma). Weights loaded match what the type
// scale actually uses: Regular/Medium/Semi Bold/Bold.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MyLocalGuide Design System",
  description: "MyLocalGuide token-driven design system demo (light mode).",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
