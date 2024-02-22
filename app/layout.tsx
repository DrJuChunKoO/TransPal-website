import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TransPal",
  description: "會議記錄網站",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>
        <div>
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}
