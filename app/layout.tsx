import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import MegaFooter from "@/components/layout/Footer";
import { CookieNotice } from "@/components/layout/CookieNotice";
import { FloatingActionButton } from "@/components/layout/FloatingActionButton";
import { Providers } from "./Providers";
import { Toaster } from "react-hot-toast";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Exottica Travels - Flights & Holiday Packages",
  description:
    "Book flights and incredible holiday specials. Sun City, Mozambique cruises, Zanzibar, Mauritius and more."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${dmSans.variable} min-h-screen flex flex-col`}>
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <MegaFooter />
          <CookieNotice />
          <FloatingActionButton />
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}