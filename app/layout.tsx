import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { twMerge } from "tailwind-merge";
const inter = Inter({ subsets: ["latin"] });
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "TransPal",
  description: "會議記錄網站",
  icons: {
    icon: "/icon.png",
  },
  metadataBase: new URL(`https://transpal.juchunko.com/`),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={twMerge(inter.className, "dark:bg-[#1C1C1C]")}>
        <div className="dark:text-gray-50">
          <Nav />
          {children}
        </div>
      </body>
      <GoogleAnalytics gaId="G-N8CTYQPL0W" />
    </html>
  );
}
