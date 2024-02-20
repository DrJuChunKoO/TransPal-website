import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TransPal",
  description: "會議記錄網站",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
}
