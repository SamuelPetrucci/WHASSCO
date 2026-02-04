import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WHAASCO - West Hartford African American Social & Cultural Organization",
  description: "WHAASCO empowers families, supports youth, and celebrates African American culture through education, connection, and community engagement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Suspense fallback={<header className="bg-white shadow-md sticky top-0 z-50 border-b-4 border-african-gold-500 h-28" />}>
          <Header />
        </Suspense>
        <main className="min-h-screen animate-fade-in">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
